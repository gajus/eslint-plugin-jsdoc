import iterateJsdoc from '../iterateJsdoc';

const defaultEmptyTags = new Set([
  'abstract', 'async', 'generator', 'global', 'hideconstructor',
  'ignore', 'inner', 'instance', 'override', 'readonly',

  // jsdoc doesn't use this form in its docs, but allow for compatibility with
  //  TypeScript which allows and Closure which requires
  'inheritDoc',

  // jsdoc doesn't use but allow for TypeScript
  'internal',
]);

const emptyIfNotClosure = new Set([
  'package', 'private', 'protected', 'public', 'static',

  // Closure doesn't allow with this casing
  'inheritdoc',
]);

export default iterateJsdoc(({
  settings,
  jsdoc,
  utils,
}) => {
  if (!jsdoc.tags) {
    return;
  }
  const emptyTags = utils.filterTags(({tag: tagName}) => {
    return defaultEmptyTags.has(tagName) ||
      utils.hasOptionTag(tagName) && jsdoc.tags.some(({tag}) => {
        return tag === tagName;
      }) ||
      settings.mode !== 'closure' && emptyIfNotClosure.has(tagName);
  });
  emptyTags.forEach((tag) => {
    const fix = () => {
      tag.name = '';
      tag.description = '';
      tag.type = '';
      tag.optional = false;
      tag.default = undefined;
    };
    const content = tag.name || tag.description || tag.type;
    if (content) {
      utils.reportJSDoc(`@${tag.tag} should be empty.`, tag, fix);
    }
  });
}, {
  checkInternal: true,
  checkPrivate: true,
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Expects specific tags to be empty of any content.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-empty-tags',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          tags: {
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
