import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
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

  propertyAssociatedTags.forEach((propertyAssociatedTag) => {
    if (!['object', 'Object', 'PlainObject'].includes(propertyAssociatedTag.type)) {
      return;
    }
    utils.reportJSDoc(`Missing JSDoc @${targetTagName}.`, null, () => {
      const line = jsdoc.tags[jsdoc.tags.length - 1].line + 1;
      jsdoc.tags.push({
        description: '',
        line,
        name: '',
        optional: false,
        tag: targetTagName,
        type: '',
      });
    });
  });
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
