import iterateJsdoc from '../iterateJsdoc.js';

/**
 * @param {string} str
 * @param {string[]} excludeTags
 * @returns {string}
 */
const maskExcludedContent = (str, excludeTags) => {
  const regContent = new RegExp(`([ \\t]+\\*)[ \\t]@(?:${excludeTags.join('|')})(?=[ \\n])([\\w\\|\\W]*?\\n)(?=[ \\t]*\\*(?:[ \\t]*@\\w+\\s|\\/))`, 'gv');

  return str.replace(regContent, (_match, margin, code) => {
    return (margin + '\n').repeat(code.match(/\n/gv).length);
  });
};

/**
 * @param {string} str
 * @returns {string}
 */
const maskCodeBlocks = (str) => {
  const regContent = /([ \t]+\*)[ \t]```[^\n]*?([\w\|\W]*?\n)(?=[ \t]*\*(?:[ \t]*(?:```|@\w+\s)|\/))/gv;

  return str.replaceAll(regContent, (_match, margin, code) => {
    return (margin + '\n').repeat(code.match(/\n/gv).length);
  });
};

/**
 * @param {string[]} lines
 * @param {number} lineIndex
 * @returns {number}
 */
const getLineNumber = (lines, lineIndex) => {
  const precedingText = lines.slice(0, lineIndex).join('\n');
  const lineBreaks = precedingText.match(/\n/gv) || [];
  return lineBreaks.length + 1;
};

export default iterateJsdoc(({
  context,
  jsdocNode,
  report,
  sourceCode,
}) => {
  const options = context.options[0] || {};
  const /** @type {{excludeTags: string[], allowIndentedSections: boolean}} */ {
    allowIndentedSections = false,
    excludeTags = [
      'example',
    ],
  } = options;

  const textWithoutCodeBlocks = maskCodeBlocks(sourceCode.getText(jsdocNode));
  const text = excludeTags.length ? maskExcludedContent(textWithoutCodeBlocks, excludeTags) : textWithoutCodeBlocks;

  if (allowIndentedSections) {
    // When allowIndentedSections is enabled, only check for indentation on tag lines
    // and the very first line of the main description
    const lines = text.split('\n');
    let hasSeenContent = false;
    let currentSectionIndent = null;

    for (const [
      lineIndex,
      line,
    ] of lines.entries()) {
      // Check for indentation (two or more spaces after *)
      const indentMatch = line.match(/^(?:\/?\**|[\t ]*)\*([\t ]{2,})/v);

      if (indentMatch) {
        // Check what comes after the indentation
        const afterIndent = line.slice(indentMatch[0].length);
        const indentAmount = indentMatch[1].length;

        // If this is a tag line with indentation, always report
        if (/^@\w+/v.test(afterIndent)) {
          report('There must be no indentation.', null, {
            line: getLineNumber(lines, lineIndex),
          });
          return;
        }

        // If we haven't seen any content yet (main description first line) and there's content, report
        if (!hasSeenContent && afterIndent.trim().length > 0) {
          report('There must be no indentation.', null, {
            line: getLineNumber(lines, lineIndex),
          });
          return;
        }

        // For continuation lines, check consistency
        if (hasSeenContent && afterIndent.trim().length > 0) {
          if (currentSectionIndent === null) {
            // First indented line in this section, set the indent level
            currentSectionIndent = indentAmount;
          } else if (indentAmount < currentSectionIndent) {
            // Indentation is less than the established level (inconsistent)
            report('There must be no indentation.', null, {
              line: getLineNumber(lines, lineIndex),
            });
            return;
          }
        }
      } else if (/^\s*\*\s+\S/v.test(line)) {
        // No indentation on this line, reset section indent tracking
        // (unless it's just whitespace or a closing comment)
        currentSectionIndent = null;
      }

      // Track if we've seen any content (non-whitespace after the *)
      if (/^\s*\*\s+\S/v.test(line)) {
        hasSeenContent = true;
      }

      // Reset section indent when we encounter a tag
      if (/@\w+/v.test(line)) {
        currentSectionIndent = null;
      }
    }
  } else {
    const reg = /^(?:\/?\**|[ \t]*)\*[ \t]{2}/gmv;
    if (reg.test(text)) {
      const lineBreaks = text.slice(0, reg.lastIndex).match(/\n/gv) || [];
      report('There must be no indentation.', null, {
        line: lineBreaks.length,
      });
    }
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Reports invalid padding inside JSDoc blocks.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-indentation.md#repos-sticky-header',
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          allowIndentedSections: {
            description: 'Allows indentation of nested sections on subsequent lines (like bullet lists)',
            type: 'boolean',
          },
          excludeTags: {
            description: `Array of tags (e.g., \`['example', 'description']\`) whose content will be
"hidden" from the \`check-indentation\` rule. Defaults to \`['example']\`.

By default, the whole JSDoc block will be checked for invalid padding.
That would include \`@example\` blocks too, which can get in the way
of adding full, readable examples of code without ending up with multiple
linting issues.

When disabled (by passing \`excludeTags: []\` option), the following code *will*
report a padding issue:

\`\`\`js
/**
 * @example
 * anArray.filter((a) => {
 *   return a.b;
 * });
 */
\`\`\``,
            items: {
              pattern: '^\\S+$',
              type: 'string',
            },
            type: 'array',
          },
        },
        type: 'object',
      },
    ],
    type: 'layout',
  },
});
