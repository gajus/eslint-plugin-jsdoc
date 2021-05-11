import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  context,
  jsdoc,
  utils,
}) => {
  const [
    alwaysNever = 'never',
    {
      count = 1,
      noEndLine = false,
    } = {},
  ] = context.options;

  if (alwaysNever === 'never') {
    jsdoc.tags.some((tg, tagIdx) => {
      return tg.source.some(({tokens: {tag, name, type, description, end}}, idx) => {
        const fixer = () => {
          utils.removeTagItem(tagIdx, idx);
        };
        if (!tag && !name && !type && !description && !end) {
          utils.reportJSDoc(
            'Expected no lines between tags',
            {line: tg.source[0].number + 1},
            fixer,
            true,
          );

          return true;
        }

        return false;
      });
    });

    return;
  }

  (noEndLine ? jsdoc.tags.slice(0, -1) : jsdoc.tags).some((tg, tagIdx) => {
    const lines = [];

    tg.source.forEach(({number, tokens: {tag, name, type, description, end}}, idx) => {
      if (!tag && !name && !type && !description && !end) {
        lines.push({idx, number});
      }
    });
    if (lines.length < count) {
      const fixer = () => {
        utils.addLines(tagIdx, lines[lines.length - 1]?.idx || 1, count - lines.length);
      };
      utils.reportJSDoc(
        `Expected ${count} line${count === 1 ? '' : 's'} between tags but found ${lines.length}`,
        {line: lines[lines.length - 1]?.number || tg.source[0].number},
        fixer,
        true,
      );

      return true;
    }

    return false;
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Enforces lines (or no lines) between tags.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-tag-lines',
    },
    fixable: true,
    schema: [
      {
        enum: ['always', 'never'],
        type: 'string',
      },
      {
        additionalProperies: false,
        properties: {
          count: {
            type: 'integer',
          },
          noEndLine: {
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
