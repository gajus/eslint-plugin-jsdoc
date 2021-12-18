import esquery from 'esquery';
import iterateJsdoc from '../iterateJsdoc';

const setDefaults = (state) => {
  if (!state.selectorMap) {
    state.selectorMap = {};
  }
};

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
  info: {comment},
  state,
}) => {
  if (!context.options[0]) {
    // Handle error later
    return;
  }

  const {contexts} = context.options[0];

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

  setDefaults(state);

  incrementSelector(state, contextStr, comment);
}, {
  contextSelected: true,
  exit ({
    context, state,
  }) {
    if (!context.options.length) {
      context.report({
        loc: {
          start: {
            column: 1,
            line: 1,
          },
        },
        message: 'Rule `no-missing-syntax` is missing a `context` option.',
      });

      return;
    }

    setDefaults(state);

    const {
      contexts,
    } = context.options[0];

    // Report when MISSING
    contexts.some((cntxt) => {
      const contextStr = typeof cntxt === 'object' ? cntxt.context ?? 'any' : cntxt;
      const comment = cntxt?.comment ?? '';

      const contextKey = contextStr === 'any' ? undefined : contextStr;

      if (
        (!state.selectorMap[contextKey] ||
        !state.selectorMap[contextKey][comment] ||
        state.selectorMap[contextKey][comment] < (cntxt?.minimum ?? 1)) &&
        (contextStr !== 'any' || Object.values(state.selectorMap).every((cmmnt) => {
          return !cmmnt[comment] || cmmnt[comment] < (cntxt?.minimum ?? 1);
        }))
      ) {
        const message = cntxt?.message ?? 'Syntax is required: {{context}}' +
          (comment ? ' with {{comment}}' : '');
        context.report({
          data: {
            comment,
            context: contextStr,
          },
          loc: {
            end: {line: 1},
            start: {line: 1},
          },
          message,
        });

        return true;
      }

      return false;
    });
  },
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
