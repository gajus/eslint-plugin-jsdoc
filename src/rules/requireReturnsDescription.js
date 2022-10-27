import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  report,
  utils,
}) => {
  utils.forEachPreferredTag('returns', (jsdocTag, targetTagName) => {
    const type = jsdocTag.type && jsdocTag.type.trim();

    if ([
      'void', 'undefined', 'Promise<void>', 'Promise<undefined>',
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
      description: 'Requires that the `@returns` tag has a `description` value.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-returns-description',
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
          publicOnly: {
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
