/**
 * This script is used to inline assertions into the README.md documents.
 */
import fs from 'fs';
import path from 'path';
import decamelize from 'decamelize';
import Gitdown from 'gitdown';
import glob from 'glob';

const trimCode = (code) => {
  let lines = code.replace(/^\n/u, '').trimEnd().split('\n');

  const firsLineIndentation = lines[0].match(/^\s+/u);
  const lastLineIndentation = lines[lines.length - 1].match(/^\s+/u);

  const firstIndentSize = firsLineIndentation ? firsLineIndentation[0].length : 0;
  const lastIndentSize = lastLineIndentation ? lastLineIndentation[0].length : 0;

  lines = lines.map((line, index) => {
    const lineIndentSize = firstIndentSize !== 0 || index === 0 ?
      Math.min(firstIndentSize, lastIndentSize) :
      lastIndentSize;

    return line.slice(lineIndentSize);
  });

  return lines.join('\n').replaceAll('\r', '\\r');
};

const formatCodeSnippet = (setup, ruleName) => {
  const paragraphs = [];

  paragraphs.push(trimCode(setup.code));

  if (setup.settings) {
    paragraphs.push(`// Settings: ${JSON.stringify(setup.settings)}`);
  }

  if (setup.options) {
    paragraphs.push(`// "jsdoc/${ruleName}": ["error"|"warn", ${JSON.stringify(setup.options).slice(1)}`);
  }

  if (setup.errors) {
    paragraphs.push(`// Message: ${setup.errors[0].message}`);
  }

  return paragraphs.join('\n');
};

const getAssertions = () => {
  const assertionFiles = glob.sync(path.resolve(__dirname, '../../test/rules/assertions/*.js')).filter((file) => {
    return !file.includes('flatConfig');
  });

  const assertionNames = assertionFiles.map((filePath) => {
    return path.basename(filePath, '.js');
  });

  const assertionCodes = assertionFiles.map((filePath, idx) => {
    // eslint-disable-next-line import/no-dynamic-require
    const codes = require(filePath);

    const ruleName = decamelize(assertionNames[idx], {
      separator: '-',
    });

    return {
      invalid: codes.invalid.filter(({
        ignoreReadme,
      }) => {
        return !ignoreReadme;
      }).map((setup) => {
        return formatCodeSnippet(setup, ruleName);
      }),
      valid: codes.valid.filter(({
        ignoreReadme,
      }) => {
        return !ignoreReadme;
      }).map((setup) => {
        return formatCodeSnippet(setup, ruleName);
      }),
    };
  });

  return {
    assertionNames,
    assertions: Object.fromEntries(assertionNames.map((assertionName, index) => {
      return [
        assertionName, assertionCodes[index],
      ];
    })),
  };
};

const getSomeBranch = () => {
  const gitConfig = fs.readFileSync(path.join(__dirname, '../../.git/config')).toString();
  const [
    , branch,
  ] = /\[branch "([^"]+)"\]/u.exec(gitConfig) || [];

  return branch;
};

// Scan the directory for these instead?
const extraFiles = [
  'settings.md',
  'advanced.md',
  'README.md',
];

const otherPaths = extraFiles.map((extraFile) => {
  return path.join(__dirname, '..', '..', '.README', extraFile);
});

const generateDocs = async () => {
  const {
    assertions,
    assertionNames,
  } = getAssertions();

  const docContents = await Promise.all([
    ...assertionNames.map((assertionName) => {
      return path.join(
        __dirname, '..', '..', '.README', 'rules', decamelize(assertionName, {
          separator: '-',
        }) + '.md',
      );
    }),
    ...otherPaths,
  ].map((docPath) => {
    const gitdown = Gitdown.readFile(docPath);

    gitdown.setConfig({
      gitinfo: {
        defaultBranchName: getSomeBranch() || 'master',
        gitPath: path.join(__dirname, '../../.git'),
      },
    });

    return gitdown.get();
  }));

  return docContents.map((docContent) => {
    return docContent.replace(
      /<!-- assertions-(passing|failing) ([a-z]+?) -->/gui,
      (assertionsBlock, passingFailing, ruleName) => {
        const ruleAssertions = assertions[ruleName];

        if (!ruleAssertions) {
          throw new Error(`No assertions available for rule "${ruleName}".`);
        }

        return passingFailing === 'failing' ?
          'The following patterns are considered problems:\n\n````js\n' +
            ruleAssertions.invalid.join('\n\n') + '\n````\n\n' :
          'The following patterns are not considered problems:\n\n````js\n' +
            ruleAssertions.valid.join('\n\n') + '\n````\n';
      },
    // Allow relative paths in source for #902 but generate compiled file in
    //   manner compatible with GitHub and npmjs.com
    ).replace(/\(\.\.\/#/gu, '(#user-content-eslint-plugin-jsdoc-');
  });
};

const getDocPaths = () => {
  const basePath = path.join(__dirname, '..', '..', '.README');
  const writeBasePath = path.join(__dirname, '..', '..', 'docs');
  const docPaths = fs.readdirSync(basePath).flatMap((docFile) => {
    if (extraFiles.includes(docFile)) {
      // Will get path separately below
      return null;
    }

    const innerBasePath = path.join(basePath, docFile);
    const writeInnerBasePath = path.join(writeBasePath, docFile);
    const stat = fs.statSync(innerBasePath);
    if (stat.isFile()) {
      // Currently settings and advanced
      return writeInnerBasePath;
    }

    if (stat.isDirectory()) {
      return fs.readdirSync(innerBasePath).map((innerDocFile) => {
        return path.join(writeInnerBasePath, innerDocFile);
      });
    }

    return null;
  }).filter((file) => {
    return file;
  });

  return [
    ...docPaths,
    ...extraFiles.slice(0, -1).map((extraFile) => {
      return path.join(__dirname, '..', '..', 'docs', extraFile);
    }),
    path.join(__dirname, '..', '..', 'README.md'),
  ];
};

const generateDocsAndWriteToDisk = async () => {
  const [
    docContents,
    docPaths,
  ] = await Promise.all([
    generateDocs(), getDocPaths(),
  ]);
  for (const [
    idx,
    docContent,
  ] of docContents.entries()) {
    const destPath = docPaths[idx];
    fs.writeFileSync(destPath, docContent);
  }
};

const assertDocsAreUpToDate = async () => {
  const [
    docContents,
    docPaths,
  ] = await Promise.all([
    generateDocs(), getDocPaths(),
  ]);
  for (const [
    idx,
    docContent,
  ] of docContents.entries()) {
    const docPath = docPaths[idx];
    const isUpToDate = fs.readFileSync(docPath, 'utf8') === docContent;

    if (!isUpToDate) {
      throw new Error('Readme is not up to date, please run `npm run create-readme` to update it.');
    }
  }
};

const main = async () => {
  try {
    const hasCheckFlag = process.argv.includes('--check');

    if (hasCheckFlag) {
      await assertDocsAreUpToDate();
    } else {
      await generateDocsAndWriteToDisk();
    }
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);

    process.exit(1);
  }
};

main();

export default generateDocs;
