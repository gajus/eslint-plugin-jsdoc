import iterateJsdoc from '../iterateJsdoc.js';

/**
 * @param {import('comment-parser').Line} line
 */
const removeType = ({
  tokens,
}) => {
  tokens.postTag = '';
  tokens.type = '';
};

/**
 * @param {import('comment-parser').Tokens} tokens
 * @returns {boolean}
 */
const hasNameOrDescription = ({
  description,
  name,
}) => {
  return Boolean(name || description);
};

/**
 * Removes the type from every line of a tag. A name and description which
 * followed a type spanning lines (or which start on the next line) are moved up
 * to the tag line, and the lines left empty are dropped.
 * @param {import('comment-parser').Block} jsdoc
 * @param {import('comment-parser').Spec} tag
 */
const removeTypes = (jsdoc, tag) => {
  const [
    tagLine,
    ...otherLines
  ] = tag.source;
  removeType(tagLine);

  for (const line of otherLines) {
    const hadType = Boolean(line.tokens.type);
    removeType(line);

    const {
      tokens,
    } = line;
    const movedUp = !hasNameOrDescription(tagLine.tokens) && hasNameOrDescription(tokens);
    if (movedUp) {
      Object.assign(tagLine.tokens, {
        // Drop the space which preceded a closing delimiter on that line
        description: tokens.end ? tokens.description.trimEnd() : tokens.description,
        name: tokens.name,
        postName: tokens.postName,
        postTag: ' ',
      });
      Object.assign(tokens, {
        description: '',
        name: '',
        postName: '',
        postType: '',
      });
    }

    if ((hadType || movedUp) && !hasNameOrDescription(tokens)) {
      if (tokens.end) {
        tokens.delimiter = '';
        tokens.postDelimiter = '';
      } else {
        jsdoc.source = jsdoc.source.filter(({
          number,
        }) => {
          return number !== line.number;
        });
      }
    }

    if (!hadType) {
      break;
    }
  }
};

export default iterateJsdoc(({
  jsdoc,
  node,
  utils,
}) => {
  if (!utils.isIteratingFunctionOrVariable() && !utils.isVirtualFunction()) {
    return;
  }

  const tags = utils.getPresentTags([
    'param', 'arg', 'argument', 'returns', 'return',
  ]);

  for (const tag of tags) {
    if (tag.type) {
      utils.reportJSDoc(`Types are not permitted on @${tag.tag}.`, tag, () => {
        removeTypes(jsdoc, tag);
      });
    }
  }

  if (node?.type === 'ClassDeclaration') {
    const propertyTags = utils.getPresentTags([
      'prop', 'property',
    ]);
    for (const tag of propertyTags) {
      if (tag.type) {
        utils.reportJSDoc(`Types are not permitted on @${tag.tag} in the supplied context.`, tag, () => {
          removeTypes(jsdoc, tag);
        });
      }
    }
  }
}, {
  contextDefaults: [
    'ArrowFunctionExpression', 'FunctionDeclaration', 'FunctionExpression', 'TSDeclareFunction',
    // Add this to above defaults
    'TSMethodSignature', 'ClassDeclaration',
  ],
  meta: {
    docs: {
      description: 'This rule reports types being used on `@param` or `@returns` (redundant with TypeScript).',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-types.md#repos-sticky-header',
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
\`FunctionExpression\`, \`TSDeclareFunction\`, \`TSMethodSignature\`,
\`ClassDeclaration\`). Set to \`"any"\` if you want
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
