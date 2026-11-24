import iterateJsdoc from '../iterateJsdoc.js';

export default iterateJsdoc(({
  context,
  indent,
  jsdocNode,
  report,
  sourceCode,
}) => {
  const {
    ignoreEmptyLines = false,
    innerIndent = 1,
  } = context.options[0] || {};

  const text = sourceCode.getText(jsdocNode);

  // Without the `\r` of CRLF line breaks, which is not indentation
  const lines = text.split(/\r?\n/v);

  // `indent` is whitespace from line 1 (`/**`), so slice and account for "/".
  const indentLevel = indent.length + innerIndent;
  const sourceLines = lines
    .slice(1)
    // Numbered before empty lines may be left out, so that the right line
    //   is reported
    .map((line, number) => {
      return {
        isEmpty: !line.trim(),
        line: line.split('*')[0],
        number,
      };
    })
    .filter(({
      isEmpty,
      line,
    }) => {
      return !(ignoreEmptyLines && isEmpty) && !line.trimStart().length;
    });

  /** @type {import('eslint').Rule.ReportFixer} */
  const fix = (fixer) => {
    const replacement = lines
      .map((line, index) => {
        // Ignore the first line, all lines not starting with `*`, and empty
        //   lines if they are to be ignored
        const ignored = !index || line.split('*')[0].trimStart().length ||
          (ignoreEmptyLines && !line.trim());

        return ignored ? line : `${indent}${''.padStart(innerIndent, ' ')}${line.trimStart()}`;
      })
      .join(text.includes('\r\n') ? '\r\n' : '\n');

    return fixer.replaceText(jsdocNode, replacement);
  };

  sourceLines.some(({
    line,
    number,
  }) => {
    if (line.length !== indentLevel) {
      report('Expected JSDoc block to be aligned.', fix, {
        line: number + 1,
      });

      return true;
    }

    return false;
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Reports invalid alignment of JSDoc block asterisks.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-alignment.md#repos-sticky-header',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          ignoreEmptyLines: {
            description: 'Whether to ignore empty and whitespace-only lines (e.g., to allow a formatter to handle)',
            type: 'boolean',
          },
          innerIndent: {
            default: 1,
            description: `Set to 0 if you wish to avoid the normal requirement for an inner indentation of
one space. Defaults to 1 (one space of normal inner indentation).`,
            type: 'integer',
          },
        },
        type: 'object',
      },
    ],
    type: 'layout',
  },
});
