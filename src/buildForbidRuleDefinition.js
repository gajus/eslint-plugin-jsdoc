import iterateJsdoc from './iterateJsdoc.js';

/**
 * @param {{
 *   contexts: (string|{
 *     comment: string,
 *     context: string,
 *     message: string
 *   })[],
 *   description?: string,
 *   contextName?: string
 *   url?: string,
 * }} cfg
 * @returns {import('@eslint/core').RuleDefinition<
 *   import('@eslint/core').RuleDefinitionTypeOptions
 * >}
 */
export const buildForbidRuleDefinition = ({
  contextName,
  contexts,
  description,
  url,
}) => {
  return iterateJsdoc(({
    // context,
    info: {
      comment,
    },
    report,
    utils,
  }) => {
    const {
      contextStr,
      foundContext,
    } = utils.findContext(contexts, comment);

    // We are not on the *particular* matching context/comment, so don't assume
    //   we need reporting
    if (!foundContext) {
      return;
    }

    const message = /** @type {import('./iterateJsdoc.js').ContextObject} */ (
      foundContext
    )?.message ??
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
        description: description ?? contextName ?? 'Reports when certain comment structures are present.',
        url: url ?? 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/advanced.md#user-content-advanced-creating-your-own-rules',
      },
      fixable: 'code',
      schema: [],
      type: 'suggestion',
    },
    modifyContext: (context) => {
      // Reproduce context object with our own `contexts`
      const propertyDescriptors = Object.getOwnPropertyDescriptors(context);
      return Object.create(
        Object.getPrototypeOf(context),
        {
          ...propertyDescriptors,
          options: {
            ...propertyDescriptors.options,
            value: [
              {
                contexts,
              },
            ],
          },
        },
      );
    },
    nonGlobalSettings: true,
  });
};
