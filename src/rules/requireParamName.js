import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  report,
  utils,
}) => {
  utils.forEachPreferredTag('param', (jsdocParameter, targetTagName) => {
    if (jsdocParameter.tag && jsdocParameter.name === '') {
      report(
        `There must be an identifier after @${targetTagName} ${jsdocParameter.type === '' ? 'type' : 'tag'}.`,
        null,
        jsdocParameter,
      );
    }
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
