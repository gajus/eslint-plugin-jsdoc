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
      dropEndLines = false,
      noEndLines = false,
      tags = {},
    } = {},
  ] = context.options;

  jsdoc.tags.some((tg, tagIdx) => {
    let lastTag;
    let lastEmpty = null;

    let reportIndex = null;
    for (const [
      idx,
      {
        tokens: {
          tag,
          name,
          type,
          description,
          end,
        },
      },
    ] of tg.source.entries()) {
      // May be text after a line break within a tag description
      if (description) {
        reportIndex = null;
      }

      if (lastTag && [
        'any', 'always',
      ].includes(tags[lastTag.slice(1)]?.lines)) {
        continue;
      }

      const empty = !tag && !name && !type && !description;
      if (
        empty && !end &&
        (alwaysNever === 'never' ||
          lastTag && tags[lastTag.slice(1)]?.lines === 'never'
        )
      ) {
        reportIndex = idx;

        continue;
      }

      if (!end) {
        lastEmpty = empty ? idx : null;
      }

      lastTag = tag;
    }

    if (dropEndLines && lastEmpty !== null && tagIdx === jsdoc.tags.length - 1) {
      const fixer = () => {
        utils.removeTag(tagIdx, {
          tagSourceOffset: lastEmpty,
        });
      };

      utils.reportJSDoc(
        'Expected no trailing lines',
        {
          line: tg.source[lastEmpty].number,
        },
        fixer,
      );

      return true;
    }

    if (reportIndex !== null) {
      const fixer = () => {
        utils.removeTag(tagIdx, {
          tagSourceOffset: reportIndex,
        });
      };

      utils.reportJSDoc(
        'Expected no lines between tags',
        {
          line: tg.source[0].number + 1,
        },
        fixer,
      );

      return true;
    }

    return false;
  });

  (noEndLines ? jsdoc.tags.slice(0, -1) : jsdoc.tags).some((tg, tagIdx) => {
    const lines = [];

    let currentTag;
    let tagSourceIdx = 0;
    for (const [
      idx,
      {
        number,
        tokens: {
          tag,
          name,
          type,
          description,
          end,
        },
      },
    ] of tg.source.entries()) {
      if (description) {
        lines.splice(0, lines.length);
        tagSourceIdx = idx;
      }

      if (tag) {
        currentTag = tag;
      }

      if (!tag && !name && !type && !description && !end) {
        lines.push({
          idx,
          number,
        });
      }
    }

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
        utils.addLines(tagIdx, lines[lines.length - 1]?.idx || tagSourceIdx + 1, fixCount - lines.length);
      };

      const line = lines[lines.length - 1]?.number || tg.source[tagSourceIdx].number;
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
        enum: [
          'always', 'any', 'never',
        ],
        type: 'string',
      },
      {
        additionalProperties: false,
        properties: {
          count: {
            type: 'integer',
          },
          dropEndLines: {
            type: 'boolean',
          },
          noEndLines: {
            type: 'boolean',
          },
          tags: {
            patternProperties: {
              '.*': {
                additionalProperties: false,
                properties: {
                  count: {
                    type: 'integer',
                  },
                  lines: {
                    enum: [
                      'always', 'never', 'any',
                    ],
                    type: 'string',
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
