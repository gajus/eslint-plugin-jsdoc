import esquery from 'esquery';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  node,
  context,
  info: {
    comment,
  },
  report,
}) => {
  if (!context.options.length) {
    report('Rule `no-restricted-syntax` is missing a `context` option.');

    return;
  }

  const {
    contexts,
  } = context.options[0];

  const foundContext = contexts.find((cntxt) => {
    return typeof cntxt === 'string' ?
      esquery.matches(node, esquery.parse(cntxt)) :
      (!cntxt.context || cntxt.context === 'any' || esquery.matches(node, esquery.parse(cntxt.context))) &&
        comment === cntxt.comment;
  });

  // We are not on the *particular* matching context/comment, so don't assume
  //   we need reporting
  if (!foundContext) {
    return;
  }

  const contextStr = typeof foundContext === 'object' ?
    foundContext.context ?? 'any' :
    foundContext;
  const message = foundContext?.message ??
    'Syntax is restricted: {{context}}' +
      (comment ? ' with {{comment}}' : '');

  report(message, null, null, {
    comment,
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
        required: [
          'contexts',
        ],
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
