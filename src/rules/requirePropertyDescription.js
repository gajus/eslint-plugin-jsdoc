import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  report,
  utils,
}) => {
  utils.forEachPreferredTag('property', (jsdoc, targetTagName) => {
    if (!jsdoc.description) {
      report(
        `Missing JSDoc @${targetTagName} "${jsdoc.name}" description.`,
        null,
        jsdoc,
      );
    }
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Requires that each `@property` tag has a `description` value.',
    },
    type: 'suggestion',
  },
});
