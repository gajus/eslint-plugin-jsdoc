import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report,
  node,
  utils
}) => {
  if (utils.hasATag([
    // An abstract function is by definition incomplete
    // so it is perfectly fine if the return is missing.
    // A subclass may inherit the doc and implement the
    // missing return.
    'abstract',
    'virtual',

    // A constructor function returns `this` by default
    'constructor'
  ])) {
    return;
  }

  if (utils.isConstructor()) {
    return;
  }

  // Implicit return like `() => foo` is ok
  if (utils.isArrowExpression()) {
    return;
  }

  // Async function always returns a `Promise`
  if (node.async) {
    return;
  }

  const targetTagName = utils.getPreferredTagName('returns');

  // We can skip in case there are no tags defined...
  if (typeof jsdoc.tags === 'undefined') {
    return;
  }

  const jsdocTags = jsdoc.tags.filter((item) => {
    return item.tag === targetTagName;
  });

  if (jsdocTags.length === 0) {
    return;
  }

  if (jsdocTags.length > 1) {
    report('Found more than one @' + targetTagName + ' declaration.');

    return;
  }

  const returnsTagType = jsdocTags[0].type && jsdocTags[0].type.trim();

  if (returnsTagType === 'void' || returnsTagType === 'undefined') {
    return;
  }

  const sourcecode = utils.getFunctionSourceCode();

  if (!_.includes(sourcecode, 'return')) {
    report('JSDoc @' + targetTagName + ' declaration present but return expression not available in function.');
  }
});
