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
    schema: [
      {
        additionalProperties: false,
        properties: {
          contexts: {
            items: {
              type: 'string',
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
