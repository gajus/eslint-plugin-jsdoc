import iterateJsdoc from '../iterateJsdoc';

// We could disallow raw gt, quot, and apos, but allow for parity; but we do
//  not allow hex or decimal character references
const htmlRegex = /(<|&(?!(?:amp|lt|gt|quot|apos);))(?=\S)/u;
const markdownRegex = /(?<!\\)(`+)([^`]+)\1(?!`)/u;

const htmlReplacer = (desc) => {
  return desc.replace(new RegExp(htmlRegex, 'gu'), (_) => {
    if (_ === '<') {
      return '&lt;';
    }

    return '&amp;';
  });
};

const markdownReplacer = (desc) => {
  return desc.replace(new RegExp(markdownRegex, 'gu'), (_, backticks, encapsed) => {
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
    if (descriptions.some((desc) => {
      return htmlRegex.test(desc);
    })) {
      const line = utils.setDescriptionLines(htmlRegex, htmlReplacer);
      utils.reportJSDoc('You have unescaped HTML characters < or &', {
        line,
      }, () => {}, true);
      return;
    }

    for (const tag of jsdoc.tags) {
      if (utils.getTagDescription(tag, true).some((desc) => {
        return htmlRegex.test(desc);
      })) {
        const line = utils.setTagDescription(tag, htmlRegex, htmlReplacer) +
          tag.source[0].number;
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
    if (utils.getTagDescription(tag, true).some((desc) => {
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
      description: '',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-text-escaping',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          // Option properties here (or remove the object)
          escapeHTML: {
            type: 'boolean',
          },
          escapeMarkdown: {
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
