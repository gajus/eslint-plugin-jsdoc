import iterateJsdoc from '../iterateJsdoc';
import esquery from 'esquery';

/**
 * @typedef {{
 *   comment: string,
 *   context: string,
 *   message: string,
 *   minimum: import('../iterateJsdoc.js').Integer
 * }} ContextObject
 */

/**
 * @typedef {string|ContextObject} Context
 */

/**
 * @param {import('../iterateJsdoc.js').StateObject} state
 * @returns {void}
 */
const setDefaults = (state) => {
  if (!state.selectorMap) {
    state.selectorMap = {};
  }
};

/**
 * @param {import('../iterateJsdoc.js').StateObject} state
 * @param {string} selector
 * @param {string} comment
 * @returns {void}
 */
const incrementSelector = (state, selector, comment) => {
  if (!state.selectorMap[selector]) {
    state.selectorMap[selector] = {};
  }

  if (!state.selectorMap[selector][comment]) {
    state.selectorMap[selector][comment] = 0;
  }

  state.selectorMap[selector][comment]++;
};

export default iterateJsdoc(({
  context,
  node,
  info: {
    comment,
  },
  sourceCode,
  state,
}) => {
  if (!context.options[0]) {
    // Handle error later
    return;
  }

  /**
   * @type {Context[]}
   */
  const contexts = context.options[0].contexts;

  const foundContext = contexts.find((cntxt) => {
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
      )) && comment === cntxt.comment;
  });

  const contextStr = typeof foundContext === 'object' ?
    foundContext.context ?? 'any' :
    String(foundContext);

  setDefaults(state);

  incrementSelector(state, contextStr, String(comment));
}, {
  contextSelected: true,
  exit ({
    context,
    settings,
    state,
  }) {
    if (!context.options.length && !settings.contexts) {
      context.report({
        loc: {
          end: {
            column: 1,
            line: 1,
          },
          start: {
            column: 1,
            line: 1,
          },
        },
        message: 'Rule `no-missing-syntax` is missing a `contexts` option.',
      });

      return;
    }

    setDefaults(state);

    /**
     * @type {Context[]}
     */
    const contexts = (context.options[0] ?? {}).contexts ?? settings?.contexts;

    // Report when MISSING
    contexts.some((cntxt) => {
      const contextStr = typeof cntxt === 'object' ? cntxt.context ?? 'any' : cntxt;
      const comment = typeof cntxt === 'string' ? '' : cntxt?.comment;

      const contextKey = contextStr === 'any' ? 'undefined' : contextStr;

      if (
        (!state.selectorMap[contextKey] ||
        !state.selectorMap[contextKey][comment] ||
        state.selectorMap[contextKey][comment] < (
          // @ts-expect-error comment would need an object, not string
          cntxt?.minimum ?? 1
        )) &&
        (contextStr !== 'any' || Object.values(state.selectorMap).every((cmmnt) => {
          return !cmmnt[comment] || cmmnt[comment] < (
            // @ts-expect-error comment would need an object, not string
            cntxt?.minimum ?? 1
          );
        }))
      ) {
        const message = typeof cntxt === 'string' ?
          'Syntax is required: {{context}}' :
          cntxt?.message ?? ('Syntax is required: {{context}}' +
            (comment ? ' with {{comment}}' : ''));
        context.report({
          data: {
            comment,
            context: contextStr,
          },
          loc: {
            end: {
              column: 1,
              line: 1,
            },
            start: {
              column: 1,
              line: 1,
            },
          },
          message,
        });

        return true;
      }

      return false;
    });
  },
  matchContext: true,
  meta: {
    docs: {
      description: 'Reports when certain comment structures are always expected.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-no-missing-syntax',
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
                    minimum: {
                      type: 'integer',
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
