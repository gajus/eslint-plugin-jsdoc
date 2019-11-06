import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  sourceCode,
  utils,
  report,
  context,
  jsdocNode,
}) => {
  let always;
  if (_.has(context.options, 0)) {
    always = context.options[0] === 'always';
  } else {
    always = true;
  }

  utils.forEachPreferredTag('param', (jsdocTag, targetTagName) => {
    if (!jsdocTag.description) {
      return;
    }

    if (always) {
      if (!jsdocTag.description.startsWith('-')) {
        report(`There must be a hyphen before @${targetTagName} description.`, (fixer) => {
          const lineIndex = jsdocTag.line;
          const sourceLines = sourceCode.getText(jsdocNode).split('\n');

          // Get start index of description, accounting for multi-line descriptions
          const description = jsdocTag.description.split('\n')[0];
          const descriptionIndex = sourceLines[lineIndex].lastIndexOf(description);

          const replacementLine = sourceLines[lineIndex]
            .substring(0, descriptionIndex) + '- ' + description;
          sourceLines.splice(lineIndex, 1, replacementLine);
          const replacement = sourceLines.join('\n');

          return fixer.replaceText(jsdocNode, replacement);
        }, jsdocTag);
      }
    } else if (jsdocTag.description.startsWith('-')) {
      report(`There must be no hyphen before @${targetTagName} description.`, (fixer) => {
        const [unwantedPart] = /-\s*/u.exec(jsdocTag.description);

        const replacement = sourceCode
          .getText(jsdocNode)
          .replace(jsdocTag.description, jsdocTag.description.slice(unwantedPart.length));

        return fixer.replaceText(jsdocNode, replacement);
      }, jsdocTag);
    }
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    fixable: 'code',
    schema: [
      {
        enum: ['always', 'never'],
        type: 'string',
      },
    ],
    type: 'layout',
  },
});
