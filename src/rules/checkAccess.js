import iterateJsdoc from '../iterateJsdoc';

const accessLevels = ['package', 'private', 'protected', 'public'];

export default iterateJsdoc(({
  report,
  utils,
}) => {
  utils.forEachPreferredTag('access', (jsdocParameter, targetTagName) => {
    const desc = targetTagName === 'access' ?
      jsdocParameter.description :
      jsdocParameter.name + ' ' + jsdocParameter.description;

    if (!accessLevels.includes(desc.trim())) {
      report(
        `Missing valid JSDoc @${targetTagName} level.`,
        null,
        jsdocParameter,
      );
    }
  });
  const accessLength = utils.getTags('access').length;
  const individualTagLength = utils.getPresentTags(accessLevels).length;
  if (accessLength && individualTagLength) {
    report(
      'The @access tag may not be used with specific access-control tags (@package, @private, @protected, or @public).',
    );
  }
  if (accessLength > 1 || individualTagLength > 1) {
    report(
      'At most one access-control tag may be present on a jsdoc block.',
    );
  }
}, {
  checkPrivate: true,
  iterateAllJsdocs: true,
  meta: {
    type: 'suggestion',
  },
});
