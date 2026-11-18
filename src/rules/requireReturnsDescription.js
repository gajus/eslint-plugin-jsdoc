import exportParser from '../exportParser.js';
import iterateJsdoc from '../iterateJsdoc.js';

export default iterateJsdoc(({
  context,
  node,
  report,
  settings,
  sourceCode,
  utils,
}) => {
  const {
    publicOnly = false,
  } = context.options[0] || {};

  if (exportParser.isSkippedAsNotPublic(publicOnly, node, sourceCode, settings)) {
    return;
  }

  utils.forEachPreferredTag('returns', (jsdocTag, targetTagName) => {
    const type = jsdocTag.type && jsdocTag.type.trim();

    if ([
      'Promise<undefined>', 'Promise<void>', 'undefined', 'void',
    ].includes(type)) {
      return;
    }

    if (!jsdocTag.description.trim()) {
      report(`Missing JSDoc @${targetTagName} description.`, null, jsdocTag);
    }
  });
}, {
  contextDefaults: true,
  meta: {
    docs: {
      description: 'Requires that the `@returns` tag has a `description` value (not including `void`/`undefined` type returns).',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns-description.md#repos-sticky-header',
    },
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
          publicOnly: {
            description: `This option will insist that missing \`@returns\` descriptions are only reported
for functions that are exported from the module.
May be a boolean or object. If set to \`true\`, the defaults below will be
used. If unset, reporting will not be limited to exports.

This object supports the following optional boolean keys (\`false\` unless
otherwise noted):

- \`ancestorsOnly\` - Optimization to only check node ancestors to check if node is exported
- \`esm\` - ESM exports are checked (Defaults to \`true\`)
- \`cjs\` - CommonJS exports are checked (Defaults to \`true\`)
- \`window\` - Window global exports are checked`,
            oneOf: [
              {
                default: false,
                type: 'boolean',
              },
              {
                additionalProperties: false,
                default: {},
                properties: {
                  ancestorsOnly: {
                    type: 'boolean',
                  },
                  cjs: {
                    type: 'boolean',
                  },
                  esm: {
                    type: 'boolean',
                  },
                  window: {
                    type: 'boolean',
                  },
                },
                type: 'object',
              },
            ],
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
