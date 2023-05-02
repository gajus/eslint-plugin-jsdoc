import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(() => {}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Marks all types referenced in {@link} tags as used',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-mark-used',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {},
      },
    ],
    type: 'suggestion',
  },
});
