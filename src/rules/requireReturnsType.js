import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  report,
  utils,
}) => {
  utils.forEachPreferredTag('returns', (jsdocTag, targetTagName) => {
    if (!jsdocTag.type) {
      report(`Missing JSDoc @${targetTagName} type.`, null, jsdocTag);
    }
  });
}, {
  meta: {
    type: 'suggestion',
  },
});
