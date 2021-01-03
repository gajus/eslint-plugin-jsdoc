import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  sourceCode,
  utils,
  report,
  context,
  jsdoc,
  jsdocNode,
}) => {
  const [mainCircumstance, {tags} = {}] = context.options;

  const checkHyphens = (jsdocTag, targetTagName, circumstance = mainCircumstance) => {
    const always = !circumstance || circumstance === 'always';
    if (!jsdocTag.description) {
      return;
    }

    const startsWithHyphen = (/^\s*-/u).test(jsdocTag.description);
    if (always) {
      if (!startsWithHyphen) {
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
    } else if (startsWithHyphen) {
      report(`There must be no hyphen before @${targetTagName} description.`, (fixer) => {
        const [unwantedPart] = /^\s*-\s*/u.exec(jsdocTag.description);

        const replacement = sourceCode
          .getText(jsdocNode)
          .replace(jsdocTag.description, jsdocTag.description.slice(unwantedPart.length));

        return fixer.replaceText(jsdocNode, replacement);
      }, jsdocTag);
    }
  };

  utils.forEachPreferredTag('param', checkHyphens);
  if (tags) {
    const tagEntries = Object.entries(tags);
    tagEntries.forEach(([tagName, circumstance]) => {
      if (tagName === '*') {
        const preferredParamTag = utils.getPreferredTagName({tagName: 'param'});
        (jsdoc.tags || []).forEach(({tag}) => {
          if (tag === preferredParamTag || tagEntries.some(([tagNme]) => {
            return tagNme !== '*' && tagNme === tag;
          })) {
            return;
          }
          utils.forEachPreferredTag(tag, (jsdocTag, targetTagName) => {
            checkHyphens(jsdocTag, targetTagName, circumstance);
          });
        });

        return;
      }
      utils.forEachPreferredTag(tagName, (jsdocTag, targetTagName) => {
        checkHyphens(jsdocTag, targetTagName, circumstance);
      });
    });
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Requires a hyphen before the `@param` description.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-hyphen-before-param-description',
    },
    fixable: 'code',
    schema: [
      {
        enum: ['always', 'never'],
        type: 'string',
      },
      {
        additionalProperties: false,
        properties: {
          tags: {
            anyOf: [
              {
                patternProperties: {
                  '.*': {
                    enum: ['always', 'never'],
                    type: 'string',
                  },
                },
                type: 'object',
              },
              {
                enum: ['any'],
                type: 'string',
              },
            ],
          },
        },
        type: 'object',
      },
    ],
    type: 'layout',
  },
});
