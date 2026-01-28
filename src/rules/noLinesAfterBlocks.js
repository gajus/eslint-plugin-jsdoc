import iterateJsdoc from '../iterateJsdoc.js';

export default iterateJsdoc(({
  context,
  indent,
  node,
  settings,
  sourceCode,
  utils,
}) => {
  if (!node) {
    return;
  }

  const {
    enableFixer = true,
    exemptedBy = [],
    overrideDefaultExemptions = false,
    preferMinLines = false,
  } = context.options[0] || {};

  if (utils.hasATag(overrideDefaultExemptions ? exemptedBy : [
    ...exemptedBy,
    'callback',
    'copyright',
    'exports',
    'interface',
    'event',
    'external',
    'file',
    'fileoverview',
    'host',
    'import',
    'license',
    'module',
    'namespace',
    'overview',
    'typedef',
  ])) {
    return;
  }

  const {
    maxLines,
    minLines,
  } = settings;

  const prevToken = sourceCode.getTokenBefore(node, {
    includeComments: true,
  });

  /* c8 ignore next 3 -- TS */
  if (!prevToken) {
    return;
  }

  const interveningRange = /** @type {[number, number]} */ ([
    /** @type {number} */ (prevToken.range?.[1]),
    /** @type {number} */ (node.range?.[0]),
  ]);

  const ws = sourceCode.getText().slice(interveningRange[0], interveningRange[1]);

  const newLines = ws.match(/\n/gv)?.length ?? 0;

  if (newLines <= maxLines) {
    return;
  }

  utils.reportJSDoc(
    'There should be no extra lines above structures with JSDoc blocks',
    null,
    enableFixer ? (fixer) => {
      return fixer.replaceTextRange(
        interveningRange,
        '\n'.repeat(preferMinLines ? minLines : maxLines) + indent,
      );
    } : null,
  );
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Reports extra lines between functions (and other language structures) and their JSDoc blocks.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-lines-after-blocks.md#repos-sticky-header',
    },
    fixable: 'whitespace',
    schema: [
      {
        additionalProperties: false,
        properties: {
          contexts: {
            description: `Set this to an array of strings representing the AST context (or an object with
\`context\` and \`comment\` properties) where you wish the rule to be applied.

\`context\` defaults to \`any\` and \`comment\` defaults to no specific comment context.

Overrides the default contexts (\`ArrowFunctionExpression\`, \`FunctionDeclaration\`,
\`FunctionExpression\`). Setting to \`"any"\` may be problematic if you have
JSDoc-style comments at the top of your files.

See the ["AST and Selectors"](../#advanced-ast-and-selectors)
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
          enableFixer: {
            description: 'Whether to enable the fixer to remove line breaks',
            type: 'boolean',
          },
          exemptedBy: {
            description: `Tag names to be added to those which will exempt reporting for a block. Defaults to:

- 'callback'
- 'copyright'
- 'exports'
- 'interface'
- 'event'
- 'external'
- 'file'
- 'fileoverview'
- 'host'
- 'import'
- 'license'
- 'module'
- 'namespace'
- 'overview'
- 'typedef'
`,
            items: {
              type: 'string',
            },
            type: 'array',
          },
          overrideDefaultExemptions: {
            description: 'Determines whether `exemptedBy` will override the default values. Defaults to `false`.',
            type: 'boolean',
          },
          preferMinLines: {
            description: 'Whether to use the setting `minLines` as the basis for fixing lines going past `maxLines`',
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
  ruleSettings: {
    maxLines: Number.POSITIVE_INFINITY,
  },
});
