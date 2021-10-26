import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  utils,
}) => {
  const propertyAssociatedTags = utils.filterTags(({tag}) => {
    return ['typedef', 'namespace'].includes(tag);
  });
  if (!propertyAssociatedTags.length) {
    return;
  }
  const targetTagName = utils.getPreferredTagName({tagName: 'property'});

  if (utils.hasATag([targetTagName])) {
    return;
  }

  for (const propertyAssociatedTag of propertyAssociatedTags) {
    if (!['object', 'Object', 'PlainObject'].includes(propertyAssociatedTag.type)) {
      continue;
    }
    utils.reportJSDoc(`Missing JSDoc @${targetTagName}.`, null, () => {
      utils.addTag(targetTagName);
    });
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Requires that all `@typedef` and `@namespace` tags have `@property` when their type is a plain `object`, `Object`, or `PlainObject`.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-property',
    },
    fixable: 'code',
    type: 'suggestion',
  },
});
