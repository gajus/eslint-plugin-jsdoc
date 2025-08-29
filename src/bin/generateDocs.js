import decamelize from 'decamelize';
import fs from 'fs';
import Gitdown from 'gitdown';
import {
  glob,
} from 'glob';
/**
 * This script is used to inline assertions into the README.md documents.
 */
import path from 'path';

const dirname = import.meta.dirname;

/**
 * @param {string} code
 * @returns {string}
 */
const trimCode = (code) => {
  let lines = code.replace(/^\n/v, '').trimEnd().split('\n');

  const firsLineIndentation = lines[0].match(/^\s+/v);
  const lastLineIndentation = lines[lines.length - 1].match(/^\s+/v);

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

/**
 * @param {import('eslint').RuleTester.InvalidTestCase|import('eslint').RuleTester.ValidTestCase} setup
 * @param {string} ruleName
 * @returns {string}
 */
const formatCodeSnippet = (setup, ruleName) => {
  const paragraphs = [];

  paragraphs.push(trimCode(setup.code));

  if (setup.settings) {
    paragraphs.push(`// Settings: ${JSON.stringify(setup.settings)}`);
  }

  if (setup.options) {
    paragraphs.push(`// "jsdoc/${ruleName}": ["error"|"warn", ${JSON.stringify(setup.options).slice(1)}`);
  }

  if ('errors' in setup) {
    paragraphs.push(`// Message: ${
      /** @type {Array<import('eslint').RuleTester.TestCaseError>} */ (
        setup.errors
      )[0].message}`);
  }

  return paragraphs.join('\n');
};

const getAssertions = async () => {
  const assertionFiles = (await glob(path.resolve(dirname, '../../test/rules/assertions/*.js'))).filter((file) => {
    return !file.includes('flatConfig');
  }).toReversed();

  const assertionNames = assertionFiles.map((filePath) => {
    return path.basename(filePath, '.js');
  });

  const assertionCodes = await Promise.all(assertionFiles.map(async (filePath, idx) => {
    /**
     * @type {{
     *   invalid: (import('eslint').RuleTester.InvalidTestCase & {ignoreReadme?: true})[],
     *   valid: (import('eslint').RuleTester.ValidTestCase & {ignoreReadme?: true})[]
     * }}
     */
    const codes = (await import(filePath)).default;

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
  }));

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
  const gitConfig = fs.readFileSync(path.join(dirname, '../../.git/config')).toString();
  const [
    , branch,
  ] = /\[branch "([^"]+)"\]/v.exec(gitConfig) || [];

  return branch;
};

// Scan the directory for these instead?
const extraFiles = [
  'settings.md',
  'advanced.md',
  'processors.md',
  'README.md',
];

const otherPaths = extraFiles.map((extraFile) => {
  return path.join(dirname, '..', '..', '.README', extraFile);
});

const generateDocs = async () => {
  const {
    assertionNames,
    assertions,
  } = await getAssertions();

  const docContents = await Promise.all([
    ...assertionNames.map((assertionName) => {
      return path.join(
        dirname, '..', '..', '.README', 'rules', decamelize(assertionName, {
          separator: '-',
        }) + '.md',
      );
    }),
    ...otherPaths,
  ].map(async (docPath) => {
    const gitdown = await Gitdown.readFile(docPath);

    gitdown.setConfig({
      gitinfo: {
        defaultBranchName: getSomeBranch() || 'master',
        gitPath: path.join(dirname, '../../.git'),
      },
    });

    return gitdown.get();
  }));

  return docContents.map((docContent) => {
    return docContent.replaceAll(
      /<!-- assertions-(passing|failing) ([a-z]+?) -->/gvi,
      /**
       * @param {string} _assertionsBlock
       * @param {string} passingFailing
       * @param {string} ruleName
       * @returns {string}
       */
      (_assertionsBlock, passingFailing, ruleName) => {
        const ruleAssertions = assertions[ruleName];

        if (!ruleAssertions) {
          throw new Error(`No assertions available for rule "${ruleName}".`);
        }

        return passingFailing === 'failing' ?
          'The following patterns are considered problems:\n\n````ts\n' +
            ruleAssertions.invalid.join('\n\n') + '\n````\n\n' :
          'The following patterns are not considered problems:\n\n````ts\n' +
            ruleAssertions.valid.join('\n\n') + '\n````\n';
      },
    // Allow relative paths in source for #902 but generate compiled file in
    //   manner compatible with GitHub and npmjs.com
    ).replaceAll('(../#', '(#user-content-eslint-plugin-jsdoc-');
  });
};

/**
 * @returns {string[]}
 */
const getDocPaths = () => {
  const basePath = path.join(dirname, '..', '..', '.README');
  const writeBasePath = path.join(dirname, '..', '..', 'docs');
  const docPaths = /** @type {string[]} */ (fs.readdirSync(basePath).flatMap((docFile) => {
    if (extraFiles.includes(docFile)) {
      // Will get path separately below
      return null;
    }

    if (docFile === '.DS_Store') {
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
      }).sort((a, b) => {
        const newA = a.replace(/\.md/v, '');
        const newB = b.replace(/\.md/v, '');
        return newA < newB ? -1 : (newB > newA ? 1 : 0);
      });
    }

    return null;
  }).filter(Boolean));

  return [
    ...docPaths,
    ...extraFiles.slice(0, -1).map((extraFile) => {
      return path.join(dirname, '..', '..', 'docs', extraFile);
    }),
    path.join(dirname, '..', '..', 'README.md'),
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
      throw new Error('Docs are not up to date, please run `pnpm run create-docs` to update it.');
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
