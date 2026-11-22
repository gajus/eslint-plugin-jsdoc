import iterateJsdoc from '../iterateJsdoc.js';

// We could disallow raw gt, quot, and apos, but allow for parity; but we do
//  not allow hex or decimal character references
const htmlRegex = /(<|&(?!(?:amp|lt|gt|quot|apos);))(?=\S)/v;
const markdownRegex = /(?<!\\)(`+)([^`]+)\1(?!`)/v;

// The text of a Markdown code span is shown as is, so it is not escaped (same
//   code span pattern as in `escape-inline-tags`)
const codeSpanRegex = /(?<!\\)(`+)(?!`)[\s\S]*?(?<!`)\1(?!`)/v;
const codeSpanOrHtmlRegex = new RegExp(`${codeSpanRegex.source}|${htmlRegex.source}`, 'gv');

/**
 * @param {string} desc
 * @returns {string}
 */
const htmlReplacer = (desc) => {
  return desc.replaceAll(codeSpanOrHtmlRegex, (_, codeSpanBackticks) => {
    if (codeSpanBackticks) {
      return _;
    }

    if (_ === '<') {
      return '&lt;';
    }

    return '&amp;';
  });
};

/**
 * @param {string} desc
 * @returns {string}
 */
const markdownReplacer = (desc) => {
  return desc.replaceAll(new RegExp(markdownRegex, 'gv'), (_, backticks, encapsed) => {
    const bookend = '`'.repeat(backticks.length);
    return `\\${bookend}${encapsed}${bookend}`;
  });
};

export default iterateJsdoc(({
  context,
  jsdoc,
  utils,
}) => {
  const {
    escapeHTML,
    escapeMarkdown,
  } = context.options[0] || {};

  if (!escapeHTML && !escapeMarkdown) {
    context.report({
      loc: {
        end: {
          column: 1,
          line: 1,
        },
        start: {
          column: 1,
          line: 1,
        },
      },
      message: 'You must include either `escapeHTML` or `escapeMarkdown`',
    });
    return;
  }

  const {
    descriptions,
  } = utils.getDescription();

  if (escapeHTML) {
    // Fenced code (from a line starting with ``` to the next one) is also
    //   shown as is
    /** @type {Set<import('../iterateJsdoc.js').Integer>} */
    const fencedLines = new Set();
    let inFence = false;
    for (const {
      number,
      tokens: {
        description,
      },
    } of jsdoc.source) {
      const isFence = description.startsWith('```');
      if (inFence || isFence) {
        fencedLines.add(number);
      }

      if (isFence) {
        inFence = !inFence;
      }
    }

    /**
     * Escapes the first of the lines that has text to escape.
     * @param {import('comment-parser').Line[]} lines
     * @returns {import('../iterateJsdoc.js').Integer|undefined} The number of
     *   the escaped line
     */
    const escapeFirstLine = (lines) => {
      const line = lines.find(({
        number,
        tokens: {
          description,
        },
      }) => {
        return !fencedLines.has(number) && htmlReplacer(description) !== description;
      });
      if (!line) {
        return undefined;
      }

      line.tokens.description = htmlReplacer(line.tokens.description);
      return line.number;
    };

    /** @type {import('comment-parser').Line[]} */
    const blockDescriptionLines = [];
    for (const [
      idx,
      line,
    ] of jsdoc.source.entries()) {
      if (idx && (line.tokens.tag || line.tokens.end)) {
        break;
      }

      blockDescriptionLines.push(line);
    }

    const blockLine = escapeFirstLine(blockDescriptionLines);
    if (blockLine !== undefined) {
      utils.reportJSDoc('You have unescaped HTML characters < or &', {
        line: blockLine,
      }, () => {}, true);
      return;
    }

    for (const tag of jsdoc.tags) {
      if (tag.tag === 'example') {
        continue;
      }

      const line = escapeFirstLine(tag.source);
      if (line !== undefined) {
        utils.reportJSDoc('You have unescaped HTML characters < or & in a tag', {
          line,
        }, () => {}, true);
      }
    }

    return;
  }

  if (descriptions.some((desc) => {
    return markdownRegex.test(desc);
  })) {
    const line = utils.setDescriptionLines(markdownRegex, markdownReplacer);
    utils.reportJSDoc('You have unescaped Markdown backtick sequences', {
      line,
    }, () => {}, true);
    return;
  }

  for (const tag of jsdoc.tags) {
    if (tag.tag === 'example') {
      continue;
    }

    if (/** @type {string[]} */ (
      utils.getTagDescription(tag, true)
    ).some((desc) => {
      return markdownRegex.test(desc);
    })) {
      const line = utils.setTagDescription(
        tag, markdownRegex, markdownReplacer,
      ) + tag.source[0].number;
      utils.reportJSDoc(
        'You have unescaped Markdown backtick sequences in a tag',
        {
          line,
        },
        () => {},
        true,
      );
    }
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Auto-escape certain characters that are input within block and tag descriptions.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/text-escaping.md#repos-sticky-header',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          escapeHTML: {
            description: `This option escapes all \`<\` and \`&\` characters (except those followed by
whitespace which are treated as literals by Visual Studio Code, and those in
Markdown code spans or fenced code, which are shown as is). Defaults to
\`false\`.`,
            type: 'boolean',
          },
          escapeMarkdown: {
            description: `This option escapes the first backtick (\`\` \` \`\`) in a paired sequence.
Defaults to \`false\`.`,
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
