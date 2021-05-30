import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  context,
  info: {selector, comment},
  report,
}) => {
  if (!context.options.length) {
    report('Rule `no-restricted-syntax` is missing a `context` option.');

    return;
  }
  const {contexts} = context.options[0];

  const foundContext = contexts.find((cntxt) => {
    return cntxt === selector ||
      typeof cntxt === 'object' &&
      (cntxt.context === 'any' || selector === cntxt.context) &&
        comment === cntxt.comment;
  });

  const contextStr = typeof foundContext === 'object' ?
    foundContext.context :
    foundContext;
  const message = foundContext?.message ??
    'Syntax is restricted: {{context}}.';

  report(message, null, null, {
    context: contextStr,
  });
}, {
  contextSelected: true,
  meta: {
    docs: {
      description: 'Reports when certain comment structures are present.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-no-restricted-syntax',
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
                    message: {
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
        required: ['contexts'],
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
