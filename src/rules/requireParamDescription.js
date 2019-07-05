import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  report,
  utils
}) => {
  utils.forEachPreferredTag('param', (jsdocParameter, targetTagName) => {
    if (!jsdocParameter.description) {
      report('Missing JSDoc @' + targetTagName + ' "' + jsdocParameter.name + '" description.', null, jsdocParameter);
    }
  });
}, {
  meta: {
    type: 'suggestion'
  }
});
