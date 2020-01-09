/**
 * This script is used to inline assertions into the README.md documents.
 */
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import glob from 'glob';
import Gitdown from 'gitdown';

const camelCaseToHyphens = (str) => {
  return str
    .replace(/(^[A-Z])/, ([first]) => {
      return first.toLowerCase();
    })
    .replace(/([A-Z])/g, ([letter]) => {
      return `-${letter.toLowerCase()}`;
    });
};

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

  return lines.join('\n');
};

const formatCodeSnippet = (setup) => {
  const paragraphs = [];

  paragraphs.push(trimCode(setup.code));

  if (setup.settings) {
    paragraphs.push(`// Settings: ${JSON.stringify(setup.settings)}`);
  }

  if (setup.options) {
    paragraphs.push(`// Options: ${JSON.stringify(setup.options)}`);
  }

  if (setup.errors) {
    paragraphs.push(`// Message: ${setup.errors[0].message}`);
  }

  return paragraphs.join('\n');
};

const getAssertions = () => {
  const assertionFiles = glob.sync(path.resolve(__dirname, '../../test/rules/assertions/*.js'));

  const assertionNames = assertionFiles.map((filePath) => {
    return path.basename(filePath, '.js');
  });

  const assertionCodes = assertionFiles.map((filePath) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const codes = require(filePath);

    return {
      invalid: _.map(codes.invalid, formatCodeSnippet),
      valid: _.map(codes.valid, formatCodeSnippet),
    };
  });

  return {
    assertionNames,
    assertions: _.zipObject(assertionNames, assertionCodes),
  };
};

const getSomeBranch = () => {
  const gitConfig = fs.readFileSync(path.join(__dirname, '../../.git/config')).toString();
  const [, branch] = /\[branch "([^"]+)"\]/u.exec(gitConfig) || [];

  return branch;
};

const generateDocContents = async () => {
  const {assertions, assertionNames} = getAssertions();

  const otherPaths = [
    // Scan the directory for these instead?
    path.join(__dirname, '..', '..', '.README', 'settings.md'),
    path.join(__dirname, '..', '..', '.README', 'README.md'),
  ];

  const docContents = await Promise.all([
    ...assertionNames.map((assertionName) => {
      return path.join(
        __dirname, '..', '..', '.README', 'rules',

        camelCaseToHyphens(assertionName) + '.md',
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
      (assertionsBlock, passFail, ruleName) => {
        const ruleAssertions = assertions[ruleName];

        if (!ruleAssertions) {
          throw new Error(`No assertions available for rule "${ruleName}".`);
        }

        return passFail === 'failing' ?
          'The following patterns are considered problems:\n\n````js\n' +
              ruleAssertions.invalid.join('\n\n') + '\n````\n' :
          'The following patterns are not considered problems:\n\n````js\n' +
              ruleAssertions.valid.join('\n\n') + '\n````\n';
      },
    );
  });
};

const getDocPaths = () => {
  const basePath = path.join(__dirname, '..', '..', '.README');
  const writeBasePath = path.join(__dirname, '..', '..', 'docs');
  const docPaths = _(fs.readdirSync(basePath)).flatMap((docFile) => {
    if (docFile === 'README.md') {
      // Will get path separately below
      return null;
    }
    const innerBasePath = path.join(basePath, docFile);
    const writeInnerBasePath = path.join(writeBasePath, docFile);
    const stat = fs.statSync(innerBasePath);
    if (stat.isFile()) {
      // Currently just settings
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
    path.join(__dirname, '..', '..', 'README.md'),
  ];
};

const generateDocsAndWriteToDisk = async () => {
  const [docContents, docPaths] = await Promise.all([generateDocContents(), getDocPaths()]);
  docContents.forEach((docContent, idx) => {
    const destPath = docPaths[idx];
    fs.writeFileSync(destPath, docContent);
  });
};

const assertDocsAreUpToDate = async () => {
  const [docContents, docPaths] = await Promise.all([generateDocContents(), getDocPaths()]);
  docContents.forEach((docContent, idx) => {
    const docPath = docPaths[idx];
    const isUpToDate = fs.readFileSync(docPath, 'utf8') === docContent;

    if (!isUpToDate) {
      throw new Error('Readme is not up to date, please run `npm run create-readme` to update it.');
    }
  });
};

const main = async () => {
  try {
    const hasCheckFlag = process.argv.some((arg) => {
      return arg === '--check';
    });

    if (hasCheckFlag) {
      await assertDocsAreUpToDate();
    } else {
      await generateDocsAndWriteToDisk();
    }
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    /* eslint-disable-next-line no-process-exit */
    process.exit(1);
  }
};

main();

export default generateDocContents;
