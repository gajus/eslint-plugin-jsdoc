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
      noEndLines = false,
      tags = {},
    } = {},
  ] = context.options;

  jsdoc.tags.some((tg, tagIdx) => {
    let lastTag;

    return tg.source.some(({tokens: {tag, name, type, description, end}}, idx) => {
      const fixer = () => {
        utils.removeTagItem(tagIdx, idx);
      };
      if (lastTag && tags[lastTag.slice(1)]?.lines === 'always') {
        return false;
      }

      if (
        !tag && !name && !type && !description && !end &&
        (alwaysNever === 'never' ||
          lastTag && tags[lastTag.slice(1)]?.lines === 'never'
        )
      ) {
        utils.reportJSDoc(
          'Expected no lines between tags',
          {line: tg.source[0].number + 1},
          fixer,
        );

        return true;
      }

      lastTag = tag;

      return false;
    });
  });

  (noEndLines ? jsdoc.tags.slice(0, -1) : jsdoc.tags).some((tg, tagIdx) => {
    const lines = [];

    let currentTag;
    tg.source.forEach(({number, tokens: {tag, name, type, description, end}}, idx) => {
      if (tag) {
        currentTag = tag;
      }
      if (!tag && !name && !type && !description && !end) {
        lines.push({idx, number});
      }
    });

    const currentTg = currentTag && tags[currentTag.slice(1)];
    const tagCount = currentTg?.count;

    const defaultAlways = alwaysNever === 'always' && currentTg?.lines !== 'never' &&
      currentTg?.lines !== 'any' && lines.length < count;

    let overrideAlways;
    let fixCount = count;
    if (!defaultAlways) {
      fixCount = typeof tagCount === 'number' ? tagCount : count;
      overrideAlways = currentTg?.lines === 'always' &&
        lines.length < fixCount;
    }

    if (defaultAlways || overrideAlways) {
      const fixer = () => {
        utils.addLines(tagIdx, lines[lines.length - 1]?.idx || 1, fixCount - lines.length);
      };
      const line = lines[lines.length - 1]?.number || tg.source[0].number;
      utils.reportJSDoc(
        `Expected ${fixCount} line${fixCount === 1 ? '' : 's'} between tags but found ${lines.length}`,
        {
          line,
        },
        fixer,
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
    fixable: 'code',
    schema: [
      {
        enum: ['always', 'any', 'never'],
        type: 'string',
      },
      {
        additionalProperies: false,
        properties: {
          count: {
            type: 'integer',
          },
          noEndLines: {
            type: 'boolean',
          },
          tags: {
            properties: {
              patternProperties: {
                '.*': {
                  additionalProperties: false,
                  properties: {
                    count: {
                      type: 'integer',
                    },
                    lines: {
                      enum: ['always', 'never'],
                      type: 'string',
                    },
                  },
                },
              },
            },
            type: 'object',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
