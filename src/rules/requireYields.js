import iterateJsdoc from '../iterateJsdoc';

/**
 * We can skip checking for a yield value, in case the documentation is inherited
 * or the method has a constructor or abstract tag.
 *
 * In either of these cases the yield value is optional or not defined.
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
    // so it is not an error if it declares a yield value but does not implement it.
    'abstract',
    'virtual',

    // Constructors do not have a yield value
    // so we can bail out here, too.
    'class',
    'constructor',

    // Yield type is specified accompanying the targeted @type
    'type',

    // This seems to imply a class as well
    'interface',
  ]) ||
    utils.avoidDocs();
};

export default iterateJsdoc(({
  report,
  utils,
  context,
}) => {
  const {
    forceRequireYields = false,
    withGeneratorTag = true,
  } = context.options[0] || {};

  // A preflight check. We do not need to run a deep check
  // in case the @yield comment is optional or undefined.
  if (canSkip(utils)) {
    return;
  }

  const tagName = utils.getPreferredTagName({tagName: 'yields'});
  if (!tagName) {
    return;
  }

  const tags = utils.getTags(tagName);

  if (tags.length > 1) {
    report(`Found more than one @${tagName} declaration.`);
  }

  const iteratingFunction = utils.isIteratingFunction();

  // In case the code yields something, we expect a yields value in JSDoc.
  const [tag] = tags;
  const missingYieldTag = typeof tag === 'undefined' || tag === null;

  const shouldReport = () => {
    if (!missingYieldTag) {
      return false;
    }

    if (
      withGeneratorTag && utils.hasTag('generator') ||
      forceRequireYields && iteratingFunction && utils.isGenerator()
    ) {
      return true;
    }

    return iteratingFunction && utils.isGenerator() && utils.hasYieldValue();
  };

  if (shouldReport()) {
    report(`Missing JSDoc @${tagName} declaration.`);
  }
}, {
  contextDefaults: true,
  meta: {
    docs: {
      description: 'Requires yields are documented.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-yields',
    },
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
          forceRequireYields: {
            default: false,
            type: 'boolean',
          },
          withGeneratorTag: {
            default: true,
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
