import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  context,
  jsdoc,
  utils,
}) => {
  if (jsdoc.tags.length) {
    return;
  }

  const {
    description,
    lastDescriptionLine,
  } = utils.getDescription();
  if (description.trim()) {
    return;
  }

  const {
    enableFixer,
  } = context.options[0] || {};

  utils.reportJSDoc(
    'No empty blocks',
    {
      line: lastDescriptionLine,
    },
    enableFixer ? () => {
      jsdoc.source.splice(0, jsdoc.source.length);
    } : null,
  );
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Removes empty blocks with nothing but possibly line breaks',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-no-blank-blocks',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          enableFixer: {
            type: 'boolean',
          },
        },
      },
    ],
    type: 'suggestion',
  },
});
