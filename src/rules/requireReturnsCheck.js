import iterateJsdoc from '../iterateJsdoc';

const canSkip = (utils, node) => {
  return utils.hasATag([
    // An abstract function is by definition incomplete
    // so it is perfectly fine if the return is missing.
    // A subclass may inherit the doc and implement the
    // missing return.
    'abstract',
    'virtual',

    // A constructor function returns `this` by default
    'constructor'
  ]) ||

    utils.isConstructor() ||

    // Implicit return like `() => foo` is ok
    utils.isArrowExpression() ||

    // Async function always returns a `Promise`
    node.async;
};

export default iterateJsdoc(({
  report,
  node,
  utils
}) => {
  if (canSkip(utils, node)) {
    return;
  }

  const tagName = utils.getPreferredTagName('returns');
  const tags = utils.getTags(tagName);

  if (tags.length === 0) {
    return;
  }

  if (tags.length > 1) {
    report('Found more than one @' + tagName + ' declaration.');

    return;
  }

  // In case a return value is declared in JSDoc, we also expect one in the code.
  if (utils.hasDefinedTypeReturnTag(tags[0]) && !utils.hasReturnValue()) {
    report('JSDoc @' + tagName + ' declaration present but return expression not available in function.');
  }
});
