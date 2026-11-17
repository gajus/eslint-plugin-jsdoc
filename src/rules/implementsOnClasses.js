import iterateJsdoc from '../iterateJsdoc.js';

export default iterateJsdoc(({
  context,
  jsdoc,
  report,
  utils,
}) => {
  const {
    fix,
  } = context.options[0] || {};

  const iteratingFunction = utils.isIteratingFunctionOrVariable();

  if (iteratingFunction) {
    if (utils.hasATag([
      'class',
      'constructor',
    ]) ||
      utils.isConstructor()
    ) {
      return;
    }
  } else if (!utils.isVirtualFunction()) {
    return;
  }

  utils.forEachPreferredTag('implements', (tag) => {
    const message = '@implements used on a non-constructor function';
    if (fix === 'remove') {
      utils.reportJSDoc(message, tag, () => {
        utils.removeTag(jsdoc.tags.indexOf(tag), {
          removeEmptyBlock: true,
        });
      }, true);
      return;
    }

    // A second `@type` would conflict with the existing one
    if (fix === 'type' && tag.type && !utils.hasTag('type')) {
      utils.reportJSDoc(message, tag, () => {
        utils.changeTag(tag, {
          tag: '@type',
        });
      }, true);
      return;
    }

    report(message, null, tag);
  });
}, {
  contextDefaults: true,
  meta: {
    docs: {
      description: 'Prohibits use of `@implements` on non-constructor functions (to enforce the tag only being used on classes/constructors).',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/implements-on-classes.md#repos-sticky-header',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          contexts: {
            description: `Set this to an array of strings representing the AST context (or an object with
\`context\` and \`comment\` properties) where you wish the rule to be applied.

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
          fix: {
            description: `Set to \`"remove"\` to have the fixer remove the \`@implements\` tag, or to
\`"type"\` to have it change \`@implements {Type}\` to \`@type {Type}\` (not done
when the block already has a \`@type\` tag or the tag has no type). Not set by
default, so the rule only reports.`,
            enum: [
              'remove',
              'type',
            ],
            type: 'string',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
