import iterateJsdoc from '../iterateJsdoc';

const removeType = ({tokens}) => {
  tokens.postTag = '';
  tokens.type = '';
};

export default iterateJsdoc(({
  utils,
}) => {
  if (!utils.isIteratingFunction() && !utils.isVirtualFunction()) {
    return;
  }

  const tags = utils.getPresentTags(['param', 'arg', 'argument', 'returns', 'return']);

  tags.forEach((tag) => {
    if (tag.type) {
      utils.reportJSDoc(`Types are not permitted on @${tag.tag}.`, tag, () => {
        tag.source.forEach(removeType);
      });
    }
  });
}, {
  contextDefaults: true,
  meta: {
    docs: {
      description: 'This rule reports types being used on `@param` or `@returns`.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-no-types',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          contexts: {
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
