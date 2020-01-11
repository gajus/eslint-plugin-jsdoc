import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  sourceCode,
  utils,
  report,
  context,
  jsdocNode,
}) => {
  const [circumstance, {checkProperties} = {}] = context.options;
  const always = !circumstance || circumstance === 'always';

  const checkHyphens = (jsdocTag, targetTagName) => {
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
            .slice(0, descriptionIndex) + '- ' + description;
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
  };

  utils.forEachPreferredTag('param', checkHyphens);
  if (checkProperties) {
    utils.forEachPreferredTag('property', checkHyphens);
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    fixable: 'code',
    schema: [
      {
        enum: ['always', 'never'],
        type: 'string',
      },
      {
        additionalProperties: false,
        properties: {
          checkProperties: {
            default: false,
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'layout',
  },
});
