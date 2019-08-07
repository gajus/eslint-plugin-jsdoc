/**
 * This script is used to inline assertions into the README.md documents.
 */
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import glob from 'glob';
import Gitdown from 'gitdown';

const trimCode = (code) => {
  let lines = code.replace(/^\n/, '').trimEnd().split('\n');

  const firsLineIndentation = lines[0].match(/^\s+/);
  const lastLineIndentation = lines[lines.length - 1].match(/^\s+/);

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

  return _.zipObject(assertionNames, assertionCodes);
};

const getSomeBranch = () => {
  const gitConfig = fs.readFileSync(path.join(__dirname, '../../.git/config')).toString();
  const [, branch] = /\[branch "([^"]+)"\]/.exec(gitConfig) || [];

  return branch;
};

const generateReadme = async () => {
  const assertions = getAssertions();
  const gitdown = Gitdown.readFile(path.join(__dirname, '../../.README/README.md'));

  gitdown.setConfig({
    gitinfo: {
      defaultBranchName: getSomeBranch() || 'master',
      gitPath: path.join(__dirname, '../../.git'),
    },
  });
  let documentBody = await gitdown.get();

  documentBody = documentBody.replace(/<!-- assertions ([a-z]+?) -->/ig, (assertionsBlock) => {
    const ruleName = assertionsBlock.match(/assertions ([a-z]+)/i)[1];
    const ruleAssertions = assertions[ruleName];

    if (!ruleAssertions) {
      throw new Error(`No assertions available for rule "${ruleName}".`);
    }

    return 'The following patterns are considered problems:\n\n````js\n' + ruleAssertions.invalid.join('\n\n') +
      '\n````\n\nThe following patterns are not considered problems:\n\n````js\n' + ruleAssertions.valid.join('\n\n') + '\n````\n';
  });

  return documentBody;
};

const generateReadmeAndWriteToDisk = async () => {
  const readme = await generateReadme();
  const dist = path.join(__dirname, '..', '..', 'README.md');
  fs.writeFileSync(dist, readme);
};

const assertReadmeIsUpToDate = async () => {
  const readme = await generateReadme();
  const readmePath = path.join(__dirname, '..', '..', 'README.md');

  const isUpToDate = fs.readFileSync(readmePath).toString() === readme;

  if (!isUpToDate) {
    throw new Error('Readme is not up to date, please run `npm run create-readme` to update it.');
  }
};

const main = async () => {
  try {
    const hasCheckFlag = process.argv.some((arg) => {
      return arg === '--check';
    });

    if (hasCheckFlag) {
      await assertReadmeIsUpToDate();
    } else {
      await generateReadmeAndWriteToDisk();
    }
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    /* eslint-disable-next-line no-process-exit */
    process.exit(1);
  }
};

main();

export default generateReadme;
