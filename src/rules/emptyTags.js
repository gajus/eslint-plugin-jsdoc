import iterateJsdoc from '../iterateJsdoc';

const defaultEmptyTags = [
  'abstract', 'async', 'generator', 'global', 'hideconstructor',
  'ignore', 'inheritdoc', 'inner', 'instance', 'override', 'readonly',
];

const emptyIfNotClosure = [
  'package', 'private', 'protected', 'public', 'static',
];

export default iterateJsdoc(({
  settings,
  jsdoc,
  utils,
}) => {
  if (!jsdoc.tags) {
    return;
  }
  const emptyTags = utils.filterTags(({tag: tagName}) => {
    return defaultEmptyTags.includes(tagName) ||
      utils.hasOptionTag(tagName) && jsdoc.tags.some(({tag}) => {
        return tag === tagName;
      }) ||
      settings.mode !== 'closure' && emptyIfNotClosure.includes(tagName);
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
  checkPrivate: true,
  iterateAllJsdocs: true,
  meta: {
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
