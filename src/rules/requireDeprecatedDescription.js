import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  report,
  utils,
}) => {
  utils.forEachPreferredTag('deprecated', (jsdocTag) => {
    if (!jsdocTag.description) {
      report(
        'Missing deprecation description.',
        null,
        jsdocTag,
      );
    }
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    type: 'suggestion',
  },
});
