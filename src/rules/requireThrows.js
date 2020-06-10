import iterateJsdoc from '../iterateJsdoc';

/**
 * We can skip checking for a throws value, in case the documentation is inherited
 * or the method is either a constructor or an abstract method.
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
    // so it is not necessary to document that they throw an error.
    'abstract',
    'virtual',
  ]) ||
    utils.avoidDocs();
};

export default iterateJsdoc(({
  report,
  utils,
}) => {
  // A preflight check. We do not need to run a deep check for abstract functions.
  if (canSkip(utils)) {
    return;
  }

  const tagName = utils.getPreferredTagName({tagName: 'throws'});
  if (!tagName) {
    return;
  }

  const tags = utils.getTags(tagName);
  const iteratingFunction = utils.isIteratingFunction();

  // In case the code returns something, we expect a return value in JSDoc.
  const [tag] = tags;
  const missingThrowsTag = typeof tag === 'undefined' || tag === null;

  const shouldReport = () => {
    if (!missingThrowsTag) {
      return false;
    }

    return iteratingFunction && utils.hasThrowValue();
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
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
