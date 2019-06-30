import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  report,
  utils
}) => {
  const targetTagName = utils.getPreferredTagName('param');
  if (!targetTagName) {
    return;
  }

  utils.forEachTag(targetTagName, (jsdocParameter) => {
    if (!jsdocParameter.description) {
      report('Missing JSDoc @' + targetTagName + ' "' + jsdocParameter.name + '" description.', null, jsdocParameter);
    }
  });
}, {
  meta: {
    type: 'suggestion'
  }
});
