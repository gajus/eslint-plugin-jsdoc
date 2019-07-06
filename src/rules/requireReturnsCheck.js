import iterateJsdoc from '../iterateJsdoc';

const canSkip = (utils) => {
  return utils.hasATag([
    // An abstract function is by definition incomplete
    // so it is perfectly fine if a return is documented but
    // not present within the function.
    // A subclass may inherit the doc and implement the
    // missing return.
    'abstract',
    'virtual',

    // A constructor function returns `this` by default, so may be `@returns`
    //   tag indicating this but no explicit return
    'class',
    'constructor',
    'interface'
  ]) || utils.isConstructor() || utils.classHasTag('interface');
};

export default iterateJsdoc(({
  report,
  utils
}) => {
  if (canSkip(utils)) {
    return;
  }

  const tagName = utils.getPreferredTagName('returns');
  if (!tagName) {
    return;
  }
  const tags = utils.getTags(tagName);

  if (tags.length === 0) {
    return;
  }

  if (tags.length > 1) {
    report(`Found more than one @${tagName} declaration.`);

    return;
  }

  // In case a return value is declared in JSDoc, we also expect one in the code.
  if (utils.hasDefinedTypeReturnTag(tags[0]) && !utils.hasReturnValue()) {
    report(`JSDoc @${tagName} declaration present but return expression not available in function.`);
  }
}, {
  meta: {
    type: 'suggestion'
  }
});
