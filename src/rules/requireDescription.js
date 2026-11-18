import exportParser from '../exportParser.js';
import iterateJsdoc from '../iterateJsdoc.js';

/**
 * @param {string} description
 * @returns {import('../iterateJsdoc.js').Integer}
 */
const checkDescription = (description) => {
  return description
    .trim()
    .split('\n')
    .filter(Boolean)
    .length;
};

export default iterateJsdoc(({
  context,
  jsdoc,
  node,
  report,
  settings,
  sourceCode,
  utils,
}) => {
  if (utils.avoidDocs()) {
    return;
  }

  const {
    descriptionStyle = 'body',
    publicOnly = false,
  } = context.options[0] || {};

  if (exportParser.isSkippedAsNotPublic(publicOnly, node, sourceCode, settings)) {
    return;
  }

  let targetTagName = utils.getPreferredTagName({
    // We skip reporting except when `@description` is essential to the rule,
    //  so user can block the tag and still meaningfully use this rule
    //  even if the tag is present (and `check-tag-names` is the one to
    //  normally report the fact that it is blocked but present)
    skipReportingBlockedTag: descriptionStyle !== 'tag',
    tagName: 'description',
  });
  if (!targetTagName) {
    return;
  }

  const isBlocked = typeof targetTagName === 'object' && 'blocked' in targetTagName && targetTagName.blocked;
  if (isBlocked) {
    targetTagName = /** @type {{blocked: true; tagName: string;}} */ (
      targetTagName
    ).tagName;
  }

  if (descriptionStyle !== 'tag') {
    const {
      description,
    } = utils.getDescription();
    if (checkDescription(description || '')) {
      return;
    }

    if (descriptionStyle === 'body') {
      const descTags = utils.getPresentTags([
        'desc', 'description',
      ]);
      if (descTags.length) {
        const [
          {
            tag: tagName,
          },
        ] = descTags;
        report(`Remove the @${tagName} tag to leave a plain block description or add additional description text above the @${tagName} line.`);
      } else {
        report('Missing JSDoc block description.');
      }

      return;
    }
  }

  const functionExamples = isBlocked ?
    [] :
    jsdoc.tags.filter(({
      tag,
    }) => {
      return tag === targetTagName;
    });

  if (!functionExamples.length) {
    report(
      descriptionStyle === 'any' ?
        `Missing JSDoc block description or @${targetTagName} declaration.` :
        `Missing JSDoc @${targetTagName} declaration.`,
    );

    return;
  }

  for (const example of functionExamples) {
    if (!checkDescription(`${example.name} ${utils.getTagDescription(example)}`)) {
      report(`Missing JSDoc @${targetTagName} description.`, null, example);
    }
  }
}, {
  contextDefaults: true,
  meta: {
    docs: {
      description: 'Requires that all functions (and potentially other contexts) have a description.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-description.md#repos-sticky-header',
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          checkConstructors: {
            default: true,
            description: `A value indicating whether \`constructor\`s should be
checked. Defaults to \`true\`.`,
            type: 'boolean',
          },
          checkGetters: {
            default: true,
            description: `A value indicating whether getters should be checked.
Defaults to \`true\`.`,
            type: 'boolean',
          },
          checkSetters: {
            default: true,
            description: `A value indicating whether setters should be checked.
Defaults to \`true\`.`,
            type: 'boolean',
          },
          contexts: {
            description: `Set to an array of strings representing the AST context
where you wish the rule to be applied (e.g., \`ClassDeclaration\` for ES6
classes).

\`context\` defaults to \`any\` and \`comment\` defaults to no specific comment context.

Overrides the default contexts (\`ArrowFunctionExpression\`,
\`FunctionDeclaration\`, \`FunctionExpression\`). Set to \`"any"\` if you want
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
          descriptionStyle: {
            description: `Whether to accept implicit descriptions (\`"body"\`) or
\`@description\` tags (\`"tag"\`) as satisfying the rule. Set to \`"any"\` to
accept either style. Defaults to \`"body"\`.`,
            enum: [
              'body', 'tag', 'any',
            ],
            type: 'string',
          },
          exemptedBy: {
            description: `Array of tags (e.g., \`['type']\`) whose presence on the
document block avoids the need for a \`@description\`. Defaults to an
array with \`inheritdoc\`. If you set this array, it will overwrite the
default, so be sure to add back \`inheritdoc\` if you wish its presence
to cause exemption of the rule.`,
            items: {
              type: 'string',
            },
            type: 'array',
          },
          publicOnly: {
            description: `This option will insist that a missing description is only reported for
functions / class declarations that are exported from the module.
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
