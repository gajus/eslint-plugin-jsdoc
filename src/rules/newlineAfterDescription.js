import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report,
  context,
  jsdocNode,
  sourceCode,
  indent,
}) => {
  let always;

  if (!jsdoc.description.trim() || !jsdoc.tags.length) {
    return;
  }

  if (_.has(context.options, 0)) {
    always = context.options[0] === 'always';
  } else {
    always = true;
  }

  const descriptionEndsWithANewline = (/\n\r?$/).test(jsdoc.description);

  if (always) {
    if (!descriptionEndsWithANewline) {
      const sourceLines = sourceCode.getText(jsdocNode).split('\n');
      const splitDesc = jsdoc.description.split('\n');
      const lastDescriptionLine = splitDesc.length - 1;
      report('There must be a newline after the description of the JSDoc block.', (fixer) => {
        // Add the new line
        const injectedLine = `${indent} *` +
          (sourceLines[lastDescriptionLine].endsWith('\r') ? '\r' : '');
        sourceLines.splice(lastDescriptionLine + 1, 0, injectedLine);

        return fixer.replaceText(jsdocNode, sourceLines.join('\n'));
      }, {
        line: lastDescriptionLine,
      });
    }
  } else if (descriptionEndsWithANewline) {
    const sourceLines = sourceCode.getText(jsdocNode).split('\n');
    const splitDesc = jsdoc.description.split('\n');
    const lastDescriptionLine = splitDesc.length - 1;
    report('There must be no newline after the description of the JSDoc block.', (fixer) => {
      // Remove the extra line
      sourceLines.splice(lastDescriptionLine, 1);

      return fixer.replaceText(jsdocNode, sourceLines.join('\n'));
    }, {
      line: lastDescriptionLine,
    });
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Enforces a consistent padding of the block description.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/newline-after-description.md',
    },
    fixable: 'whitespace',
    schema: [
      {
        enum: ['always', 'never'],
        type: 'string',
      },
    ],
    type: 'layout',
  },
  noTrim: true,
});
