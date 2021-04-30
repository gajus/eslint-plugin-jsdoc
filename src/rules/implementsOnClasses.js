import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  report,
  utils,
}) => {
  const iteratingFunction = utils.isIteratingFunction();

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
    report('@implements used on a non-constructor function', null, tag);
  });
}, {
  contextDefaults: true,
  meta: {
    docs: {
      description: 'Reports an issue with any non-constructor function using `@implements`.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-implements-on-classes',
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
