/**
 * This script is used to inline assertions into the README.md documents.
 */
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import glob from 'glob';

const trimCode = (code) => {
  let lines = code.replace(/^\n|\s+$/, '').split('\n');

  const firsLineIndentation = lines[0].match(/^\s+/);
  const lastLineIndentation = lines[lines.length - 1].match(/^\s+/);

  const firstIndentSize = firsLineIndentation ? firsLineIndentation[0].length : 0;
  const lastIndentSize = lastLineIndentation ? lastLineIndentation[0].length : 0;

  lines = lines.map((line, index) => {
    if (index === 0) {
      return line.slice(Math.min(firstIndentSize, lastIndentSize));
    }

    return line.slice(lastIndentSize);
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
      valid: _.map(codes.valid, formatCodeSnippet)
    };
  });

  return _.zipObject(assertionNames, assertionCodes);
};

const updateDocuments = (assertions) => {
  const readmeDocumentPath = path.join(__dirname, '../../README.md');

  let documentBody = fs.readFileSync(readmeDocumentPath, 'utf8');

  documentBody = documentBody.replace(/<!-- assertions ([a-z]+?) -->/ig, (assertionsBlock) => {
    const ruleName = assertionsBlock.match(/assertions ([a-z]+)/i)[1];
    const ruleAssertions = assertions[ruleName];

    if (!ruleAssertions) {
      throw new Error(`No assertions available for rule "${ruleName}".`);
    }

    return 'The following patterns are considered problems:\n\n````js\n' + ruleAssertions.invalid.join('\n\n') +
      '\n````\n\nThe following patterns are not considered problems:\n\n````js\n' + ruleAssertions.valid.join('\n\n') + '\n````\n';
  });

  fs.writeFileSync(readmeDocumentPath, documentBody);
};

updateDocuments(getAssertions());
