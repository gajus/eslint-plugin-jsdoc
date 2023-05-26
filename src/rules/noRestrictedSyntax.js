import iterateJsdoc from '../iterateJsdoc';
import esquery from 'esquery';

export default iterateJsdoc(({
  node,
  context,
  info: {
    comment,
  },
  sourceCode,
  report,
}) => {
  if (!context.options.length) {
    report('Rule `no-restricted-syntax` is missing a `contexts` option.');

    return;
  }

  const {
    contexts,
  } = context.options[0];

  const foundContext = contexts.find(
    /**
     * @param {string|{context: string, comment: string}} cntxt
     * @returns {boolean}
     */
    (cntxt) => {
      return typeof cntxt === 'string' ?
        esquery.matches(
          /** @type {import('../iterateJsdoc.js').Node} */ (node),
          esquery.parse(cntxt),
          undefined,
          {
            visitorKeys: sourceCode.visitorKeys,
          },
        ) :
        (!cntxt.context || cntxt.context === 'any' ||
          esquery.matches(
            /** @type {import('../iterateJsdoc.js').Node} */ (node),
            esquery.parse(cntxt.context),
            undefined,
            {
              visitorKeys: sourceCode.visitorKeys,
            },
          )) &&
          comment === cntxt.comment;
    },
  );

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

  report(message, null, null, comment ? {
    comment,
    context: contextStr,
  } : {
    context: contextStr,
  });
}, {
  contextSelected: true,
  meta: {
    docs: {
      description: 'Reports when certain comment structures are present.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-restricted-syntax.md#repos-sticky-header',
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
  nonGlobalSettings: true,
});
