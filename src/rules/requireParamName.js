import iterateJsdoc from '../iterateJsdoc.js';

/**
 * Returns the parameter names of the function when they can be matched to
 * the `@param` tags by position: every parameter is a plain identifier (with
 * or without a default) and there are as many tags as parameters.
 * @param {import('../iterateJsdoc.js').Utils} utils
 * @param {import('comment-parser').Spec[]} paramTags
 * @returns {string[]|null}
 */
const getNamesByPosition = (utils, paramTags) => {
  if (!utils.isIteratingFunction()) {
    return null;
  }

  const names = utils.getFunctionParameterNames();
  if (names.length !== paramTags.length || !names.every((name) => {
    return typeof name === 'string' && name !== 'this';
  })) {
    return null;
  }

  return /** @type {string[]} */ (names);
};

export default iterateJsdoc(({
  jsdoc,
  report,
  utils,
}) => {
  utils.forEachPreferredTag('param', (jsdocParameter, targetTagName) => {
    if (jsdocParameter.tag && jsdocParameter.name === '') {
      const message = `There must be an identifier after @${targetTagName} ${jsdocParameter.type === '' ? 'type' : 'tag'}.`;
      const paramTags = jsdoc.tags.filter(({
        tag,
      }) => {
        return tag === targetTagName;
      });
      const name = getNamesByPosition(utils, paramTags)?.[
        paramTags.indexOf(jsdocParameter)
      ];

      if (!name) {
        report(message, null, jsdocParameter);
        return;
      }

      utils.reportJSDoc(message, jsdocParameter, () => {
        const {
          tokens,
        } = jsdocParameter.source[0];
        tokens.name = name;
        if (tokens.type) {
          tokens.postType = ' ';
        } else {
          tokens.postTag = ' ';
        }

        if (tokens.end && !tokens.postName) {
          tokens.postName = ' ';
        }
      });
    }
  });
}, {
  contextDefaults: true,
  meta: {
    docs: {
      description: 'Requires that all `@param` tags have names.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param-name.md#repos-sticky-header',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          contexts: {
            description: `Set this to an array of strings representing the AST context (or an object with
optional \`context\` and \`comment\` properties) where you wish the rule to be applied.

\`context\` defaults to \`any\` and \`comment\` defaults to no specific comment context.

Overrides the default contexts (\`ArrowFunctionExpression\`, \`FunctionDeclaration\`,
\`FunctionExpression\`). Set to \`"any"\` if you want
the rule to apply to any JSDoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., \`@callback\` or \`@function\` (or its aliases \`@func\` or
\`@method\`) (including those associated with an \`@interface\`).

See the ["AST and Selectors"](../advanced.md#ast-and-selectors)
section of our Advanced docs for more on the expected format.`,
            items: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  additionalProperties: false,
                  properties: {
                    comment: {
                      type: 'string',
                    },
                    context: {
                      type: 'string',
                    },
                  },
                  type: 'object',
                },
              ],
            },
            type: 'array',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
