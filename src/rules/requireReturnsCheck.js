import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report,
  functionNode,
  utils
}) => {
  // Implicit return like `() => foo` is ok
  if (functionNode.type === 'ArrowFunctionExpression' && functionNode.expression) {
    return;
  }

  // Async function always returns a promise
  if (functionNode.async) {
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

  // An abstract function is by definition incomplete
  // so it is perfectly fine if the return is missing
  // a subclass may inherits the doc an implements the
  // missing return.
  const isAbstract = jsdoc.tags.some((item) => {
    return item.tag === utils.getPreferredTagName('abstract');
  });

  if (isAbstract) {
    return;
  }

  const sourcecode = utils.getFunctionSourceCode();

  if (sourcecode.indexOf('return') === -1) {
    report('Present JSDoc @' + targetTagName + ' declaration but not available return expression in function.');
  }
});
