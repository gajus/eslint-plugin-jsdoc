import iterateJsdoc from '../iterateJsdoc.js';

// Closure's `{type=} name` is written `{type} [name]` in JSDoc/TypeScript
const namedTags = new Set([
  'arg', 'argument', 'param', 'prop', 'property',
]);

/**
 * @param {import('comment-parser').Spec} tag
 * @returns {import('comment-parser').Tokens|undefined}
 */
const getFixableTokens = (tag) => {
  if (!namedTags.has(tag.tag)) {
    return undefined;
  }

  const {
    tokens,
  } = tag.source[0];

  if (!tokens.type.endsWith('=}') || !tokens.name || tokens.name.includes('=')) {
    return undefined;
  }

  return tokens;
};

export default iterateJsdoc(({
  context,
  jsdoc,
  report,
  settings,
  utils,
}) => {
  const {
    enableFixer = false,
  } = context.options[0] || {};

  const {
    mode,
  } = settings;

  // Don't check for "permissive" and "closure"
  if (mode === 'jsdoc' || mode === 'typescript') {
    for (const tag of jsdoc.tags) {
      if (tag.type.slice(-1) === '=') {
        const message = 'Syntax should not be Google Closure Compiler style.';
        if (enableFixer && getFixableTokens(tag)) {
          utils.reportJSDoc(message, tag, () => {
            for (const fixableTag of jsdoc.tags) {
              const tokens = getFixableTokens(fixableTag);
              if (tokens) {
                tokens.type = `${tokens.type.slice(0, -2)}}`;
                if (!tokens.name.startsWith('[')) {
                  tokens.name = `[${tokens.name}]`;
                }
              }
            }
          });
        } else {
          report(message, null, tag);
        }

        break;
      }
    }
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Reports against syntax not valid for the mode (e.g., Google Closure Compiler in non-Closure mode).',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-syntax.md#repos-sticky-header',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          enableFixer: {
            description: `Whether to enable the fixer to replace the Closure Compiler style \`{type=}\`
on \`@param\` and \`@property\` tags with the bracketed name \`{type} [name]\`.
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
