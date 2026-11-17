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
    defaultDestructuredRootDescription = 'The root object',
    publicOnly = false,
    setDefaultDestructuredRootDescription = false,
  } = context.options[0] || {};

  if (exportParser.isSkippedAsNotPublic(publicOnly, node, sourceCode, settings)) {
    return;
  }

  const functionParameterNames = utils.getFunctionParameterNames();

  let rootCount = -1;
  utils.forEachPreferredTag('param', (jsdocParameter, targetTagName) => {
    rootCount += jsdocParameter.name.includes('.') ? 0 : 1;
    if (!jsdocParameter.description.trim()) {
      if (Array.isArray(functionParameterNames[rootCount])) {
        if (settings.exemptDestructuredRootsFromChecks) {
          return;
        }

        if (setDefaultDestructuredRootDescription) {
          utils.reportJSDoc(`Missing root description for @${targetTagName}.`, jsdocParameter, () => {
            utils.changeTag(jsdocParameter, {
              description: defaultDestructuredRootDescription,
              postName: ' ',
            });
          });
          return;
        }
      }

      report(
        `Missing JSDoc @${targetTagName} "${jsdocParameter.name}" description.`,
        null,
        jsdocParameter,
      );
    }
  });
}, {
  contextDefaults: true,
  meta: {
    docs: {
      description: 'Requires that each `@param` tag has a `description` value.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param-description.md#repos-sticky-header',
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
          defaultDestructuredRootDescription: {
            description: `The description string to set by default for destructured roots. Defaults to
"The root object".`,
            type: 'string',
          },
          publicOnly: {
            description: `This option will insist that missing \`@param\` descriptions are only reported
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
          setDefaultDestructuredRootDescription: {
            description: `Whether to set a default destructured root description. For example, you may
wish to avoid manually having to set the description for a \`@param\`
corresponding to a destructured root object as it should always be the same
type of object. Uses \`defaultDestructuredRootDescription\` for the description
string. Defaults to \`false\`.`,
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
