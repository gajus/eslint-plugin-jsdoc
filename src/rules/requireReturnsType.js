import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  report,
  utils,
}) => {
  utils.forEachPreferredTag('returns', (jsdocTag, targetTagName) => {
    if (!jsdocTag.type) {
      report(`Missing JSDoc @${targetTagName} type.`, null, jsdocTag);
    }
  });
}, {
  contextDefaults: true,
  meta: {
    docs: {
      description: 'Requires that `@returns` tag has `type` value.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-returns-type',
    },
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
