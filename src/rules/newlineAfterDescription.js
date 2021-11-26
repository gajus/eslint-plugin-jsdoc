import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report,
  context,
  jsdocNode,
  sourceCode,
  indent,
  utils,
}) => {
  let always;

  if (!jsdoc.description.trim() || !jsdoc.tags.length) {
    return;
  }

  if (0 in context.options) {
    always = context.options[0] === 'always';
  } else {
    always = true;
  }

  const {description, lastDescriptionLine} = utils.getDescription();
  const descriptionEndsWithANewline = (/\n\r?$/u).test(description);

  if (always) {
    if (!descriptionEndsWithANewline) {
      const sourceLines = sourceCode.getText(jsdocNode).split('\n');

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
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-newline-after-description',
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
});
