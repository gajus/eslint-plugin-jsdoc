/**
 * This script is used to inline assertions into the documents.
 */
const fs = require('fs');
const path = require('path');
const decamelize = require('decamelize');
const glob = require('glob');

const trimCode = (code) => {
  let lines = code.replace(/^\n/u, '').trimEnd()
    .split('\n');

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
  const assertionFiles = glob.sync(path.resolve(__dirname, '../test/rules/assertions/*.js').replaceAll('\\', '/'));

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

  return Object.fromEntries(assertionNames.map((assertionName, index) => {
    return [
      assertionName, assertionCodes[index],
    ];
  }));
};

module.exports = getAssertions;
