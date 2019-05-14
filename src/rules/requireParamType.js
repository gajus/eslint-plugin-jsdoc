import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  report,
  utils
}) => {
  const targetTagName = utils.getPreferredTagName('param');

  utils.forEachTag(targetTagName, (jsdocParameter) => {
    if (!jsdocParameter.type) {
      report('Missing JSDoc @' + targetTagName + ' "' + jsdocParameter.name + '" type.', null, jsdocParameter);
    }
  });
});
