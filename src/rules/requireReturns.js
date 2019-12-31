import iterateJsdoc from '../iterateJsdoc';
import warnRemovedSettings from '../warnRemovedSettings';

/**
 * We can skip checking for a return value, in case the documentation is inherited
 * or the method is either a constructor or an abstract method.
 *
 * In either of these cases the return value is optional or not defined.
 *
 * @param {*} utils
 *   a reference to the utils which are used to probe if a tag is present or not.
 * @returns {boolean}
 *   true in case deep checking can be skipped; otherwise false.
 */
const canSkip = (utils) => {
  return utils.hasATag([
    // inheritdoc implies that all documentation is inherited
    // see https://jsdoc.app/tags-inheritdoc.html
    //
    // Abstract methods are by definition incomplete,
    // so it is not an error if it declares a return value but does not implement it.
    'abstract',
    'virtual',

    // Constructors do not have a return value by definition (https://jsdoc.app/tags-class.html)
    // So we can bail out here, too.
    'class',
    'constructor',

    // Return type is specified by type in @type
    'type',

    // This seems to imply a class as well
    'interface',
  ]) ||
    utils.isConstructor() ||

    // Though ESLint avoided getters: https://github.com/eslint/eslint/blob/master/lib/rules/valid-jsdoc.js#L435
    //  ... getters seem that they should, unlike setters, always return:
    utils.isSetter() ||
    utils.avoidDocs();
};

export default iterateJsdoc(({
  report,
  utils,
  node,
  context,
  iteratingAll,
}) => {
  warnRemovedSettings(context, 'require-returns');

  // A preflight check. We do not need to run a deep check
  // in case the @returns comment is optional or undefined.
  if (canSkip(utils)) {
    return;
  }

  const {
    forceRequireReturn = false,
    forceReturnsWithAsync = false,
  } = context.options[0] || {};

  const tagName = utils.getPreferredTagName({tagName: 'returns'});
  if (!tagName) {
    return;
  }
  const tags = utils.getTags(tagName);

  if (tags.length > 1) {
    report(`Found more than one @${tagName} declaration.`);
  }

  const iteratingFunction = !iteratingAll || [
    'ArrowFunctionExpression',
    'FunctionDeclaration',
    'FunctionExpression',
  ].includes(node.type);

  // In case the code returns something, we expect a return value in JSDoc.
  const [tag] = tags;
  const missingReturnTag = typeof tag === 'undefined' || tag === null;

  const shouldReport = () => {
    if (!missingReturnTag) {
      return false;
    }

    if (forceRequireReturn && (
      iteratingFunction || utils.hasATag(['callback', 'function', 'func', 'method'])
    )) {
      return true;
    }

    const isAsync = !iteratingFunction && utils.hasTag('async') ||
      iteratingFunction && (utils.hasTag('async') || utils.isAsync());

    if (forceReturnsWithAsync && isAsync) {
      return true;
    }

    return !isAsync && iteratingFunction && utils.hasReturnValue();
  };

  if (shouldReport()) {
    report(`Missing JSDoc @${tagName} declaration.`);
  }
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
          exemptedBy: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          forceRequireReturn: {
            default: false,
            type: 'boolean',
          },
          forceReturnsWithAsync: {
            default: false,
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
