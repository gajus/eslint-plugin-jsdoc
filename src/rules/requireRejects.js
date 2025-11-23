import iterateJsdoc from '../iterateJsdoc.js';

/**
 * Checks if a node or its children contain Promise rejection patterns
 * @param {import('eslint').Rule.Node} node
 * @param {boolean} [innerFunction]
 * @param {boolean} [isAsync]
 * @returns {boolean}
 */
// eslint-disable-next-line complexity -- Temporary
const hasRejectValue = (node, innerFunction, isAsync) => {
  if (!node) {
    return false;
  }

  switch (node.type) {
    case 'ArrowFunctionExpression':
    case 'FunctionDeclaration':
    case 'FunctionExpression': {
      // For inner functions in async contexts, check if they throw
      // (they could be called and cause rejection)
      if (innerFunction) {
        // Check inner functions for throws - if called from async context, throws become rejections
        const innerIsAsync = node.async;
        // Pass isAsync=true if the inner function is async OR if we're already in an async context
        return hasRejectValue(/** @type {import('eslint').Rule.Node} */ (node.body), false, innerIsAsync || isAsync);
      }

      // This is the top-level function we're checking
      return hasRejectValue(/** @type {import('eslint').Rule.Node} */ (node.body), true, node.async);
    }

    case 'BlockStatement': {
      return node.body.some((bodyNode) => {
        return hasRejectValue(/** @type {import('eslint').Rule.Node} */ (bodyNode), innerFunction, isAsync);
      });
    }

    case 'CallExpression': {
      // Check for Promise.reject()
      if (node.callee.type === 'MemberExpression' &&
          node.callee.object.type === 'Identifier' &&
          node.callee.object.name === 'Promise' &&
          node.callee.property.type === 'Identifier' &&
          node.callee.property.name === 'reject') {
        return true;
      }

      // Check for reject() call (in Promise executor context)
      if (node.callee.type === 'Identifier' && node.callee.name === 'reject') {
        return true;
      }

      // Check if this is calling an inner function that might reject
      if (innerFunction && node.callee.type === 'Identifier') {
        // We found a function call inside - check if it could be calling a function that rejects
        // We'll handle this in function body traversal
        return false;
      }

      return false;
    }

    case 'DoWhileStatement':
    case 'ForInStatement':
    case 'ForOfStatement':
    case 'ForStatement':
    case 'LabeledStatement':
    case 'WhileStatement':

    case 'WithStatement': {
      return hasRejectValue(/** @type {import('eslint').Rule.Node} */ (node.body), innerFunction, isAsync);
    }

    case 'ExpressionStatement': {
      return hasRejectValue(/** @type {import('eslint').Rule.Node} */ (node.expression), innerFunction, isAsync);
    }

    case 'IfStatement': {
      return hasRejectValue(/** @type {import('eslint').Rule.Node} */ (node.consequent), innerFunction, isAsync) || hasRejectValue(/** @type {import('eslint').Rule.Node} */ (node.alternate), innerFunction, isAsync);
    }

    case 'NewExpression': {
      // Check for new Promise((resolve, reject) => { reject(...) })
      if (node.callee.type === 'Identifier' && node.callee.name === 'Promise' && node.arguments.length > 0) {
        const executor = node.arguments[0];
        if (executor.type === 'ArrowFunctionExpression' || executor.type === 'FunctionExpression') {
          // Check if the executor has reject() calls
          return hasRejectValue(/** @type {import('eslint').Rule.Node} */ (executor.body), false, false);
        }
      }

      return false;
    }

    case 'ReturnStatement': {
      if (node.argument) {
        return hasRejectValue(/** @type {import('eslint').Rule.Node} */ (node.argument), innerFunction, isAsync);
      }

      return false;
    }

    case 'SwitchStatement': {
      return node.cases.some(
        (someCase) => {
          return someCase.consequent.some((nde) => {
            return hasRejectValue(/** @type {import('eslint').Rule.Node} */ (nde), innerFunction, isAsync);
          });
        },
      );
    }

    // Throw statements in async functions become rejections
    case 'ThrowStatement': {
      return isAsync === true;
    }

    case 'TryStatement': {
      return hasRejectValue(/** @type {import('eslint').Rule.Node} */ (node.handler && node.handler.body), innerFunction, isAsync) ||
        hasRejectValue(/** @type {import('eslint').Rule.Node} */ (node.finalizer), innerFunction, isAsync);
    }

    default: {
      return false;
    }
  }
};

/**
 * We can skip checking for a rejects value, in case the documentation is inherited
 * or the method is abstract.
 * @param {import('../iterateJsdoc.js').Utils} utils
 * @returns {boolean}
 */
const canSkip = (utils) => {
  return utils.hasATag([
    'abstract',
    'virtual',
    'type',
  ]) ||
    utils.avoidDocs();
};

export default iterateJsdoc(({
  node,
  report,
  utils,
}) => {
  if (canSkip(utils)) {
    return;
  }

  const tagName = /** @type {string} */ (utils.getPreferredTagName({
    tagName: 'rejects',
  }));
  if (!tagName) {
    return;
  }

  const tags = utils.getTags(tagName);
  const iteratingFunction = utils.isIteratingFunction();

  const [
    tag,
  ] = tags;
  const missingRejectsTag = typeof tag === 'undefined' || tag === null;

  const shouldReport = () => {
    if (!missingRejectsTag) {
      return false;
    }

    // Check if this is an async function or returns a Promise
    const isAsync = utils.isAsync();
    if (!isAsync && !iteratingFunction) {
      return false;
    }

    // For async functions, check for throw statements
    // For regular functions, check for Promise.reject or reject calls
    return hasRejectValue(/** @type {import('eslint').Rule.Node} */ (node));
  };

  if (shouldReport()) {
    report('Promise-rejecting function requires `@reject` tag');
  }
}, {
  contextDefaults: true,
  meta: {
    docs: {
      description: 'Requires that Promise rejections are documented with `@rejects` tags.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-rejects.md#repos-sticky-header',
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          contexts: {
            description: `Set this to an array of strings representing the AST context
(or objects with optional \`context\` and \`comment\` properties) where you wish
the rule to be applied.

\`context\` defaults to \`any\` and \`comment\` defaults to no specific comment context.

Overrides the default contexts (\`ArrowFunctionExpression\`, \`FunctionDeclaration\`,
\`FunctionExpression\`).`,
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
          exemptedBy: {
            description: `Array of tags (e.g., \`['type']\`) whose presence on the
document block avoids the need for a \`@rejects\`. Defaults to an array
with \`abstract\`, \`virtual\`, and \`type\`. If you set this array, it will overwrite the default,
so be sure to add back those tags if you wish their presence to cause
exemption of the rule.`,
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
