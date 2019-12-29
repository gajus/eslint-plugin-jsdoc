import iterateJsdoc from '../iterateJsdoc';

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
        tag.type = '';
      });
    }
  });
}, {
  contextDefaults: true,
  meta: {
    fixable: true,
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
