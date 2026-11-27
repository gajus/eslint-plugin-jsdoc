import iterateJsdoc from '../iterateJsdoc.js';

export default iterateJsdoc(({
  context,
  utils,
}) => {
  const propertyAssociatedTags = utils.filterTags(({
    tag,
  }) => {
    return [
      'namespace', 'typedef',
    ].includes(tag);
  });
  if (!propertyAssociatedTags.length) {
    return;
  }

  const targetTagName = /** @type {string} */ (utils.getPreferredTagName({
    tagName: 'property',
  }));

  if (!targetTagName) {
    context.report({
      loc: {
        end: {
          column: 1,
          line: 1,
        },
        start: {
          column: 1,
          line: 1,
        },
      },
      message: 'Cannot prohibit `@property` in the `tagNamePreference` setting while using the `require-property` rule.',
    });
    return;
  }

  // A tag written with an alias (`@prop`) is a property too;
  //   `check-tag-names` reports the alias
  if (utils.hasATag([
    targetTagName,
  ]) || utils.filterTags(({
    tag,
  }) => {
    const preferred = utils.getPreferredTagNameObject({
      tagName: tag,
    });
    return (typeof preferred === 'object' ?
      /** @type {{replacement?: string}} */ (preferred).replacement :
      preferred) === targetTagName;
  }).length) {
    return;
  }

  for (const propertyAssociatedTag of propertyAssociatedTags) {
    if (![
      'object', 'Object', 'PlainObject',
    ].includes(propertyAssociatedTag.type)) {
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
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property.md#repos-sticky-header',
    },
    fixable: 'code',
    type: 'suggestion',
  },
});
