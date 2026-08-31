import iterateJsdoc from '../iterateJsdoc.js';

const anyWhitespaceLine = /^\s*$/v;

export default iterateJsdoc(({
  jsdoc,
  utils,
}) => {
  const hasTags = Boolean(jsdoc.tags.length);

  // Gather the block-description lines (those before the first tag or the
  //   closing delimiter).
  let startIdx = -1;

  /**
   * @type {string[]}
   */
  const descLines = [];
  jsdoc.source.some(({
    tokens: {
      delimiter,
      description,
      end,
      tag,
    },
  }, idx) => {
    if (delimiter === '/**') {
      return false;
    }

    if (tag || end) {
      return true;
    }

    if (startIdx === -1) {
      startIdx = idx;
    }

    descLines.push(description);

    return false;
  });

  if (!descLines.length) {
    return;
  }

  let leadingBlankCount = 0;
  while (
    leadingBlankCount < descLines.length &&
    anyWhitespaceLine.test(descLines[leadingBlankCount])
  ) {
    leadingBlankCount++;
  }

  const allBlank = leadingBlankCount === descLines.length;

  /**
   * Rebuilds the kept description lines after dropping `dropCount` leading
   *   blank lines.
   * @param {import('../iterateJsdoc.js').Integer} dropCount
   * @returns {() => void}
   */
  const dropLeadingBlankLines = (dropCount) => {
    return () => {
      utils.setBlockDescription((info, seedTokens, descriptions, postDelimiters) => {
        return descriptions.slice(dropCount).map((description, idx) => {
          return {
            number: 0,
            source: '',
            tokens: seedTokens({
              ...info,
              description,
              postDelimiter: description ? postDelimiters[idx + dropCount] : '',
            }),
          };
        });
      });
    };
  };

  if (hasTags) {
    if (!leadingBlankCount) {
      return;
    }

    utils.reportJSDoc(
      'There should be no blank lines in block descriptions followed by tags.',
      {
        line: startIdx + leadingBlankCount - 1,
      },
      dropLeadingBlankLines(leadingBlankCount),
    );

    return;
  }

  // Without tags, only the extra (removable) leading blank lines are a problem;
  //   a single leading blank line with no following content is allowed.
  const removeCount = allBlank ? descLines.length - 1 : leadingBlankCount;

  if (removeCount < 1) {
    return;
  }

  utils.reportJSDoc(
    'There should be no extra blank lines in block descriptions not followed by tags.',
    {
      line: startIdx + removeCount,
    },
    dropLeadingBlankLines(removeCount),
  );
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'If tags are present, this rule will prevent empty lines in the block description. If no tags are present, this rule will prevent extra empty lines in the block description.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-blank-block-descriptions.md#repos-sticky-header',
    },
    fixable: 'whitespace',
    schema: [],
    type: 'layout',
  },
});
