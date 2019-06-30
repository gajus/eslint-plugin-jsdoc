import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  report,
  utils
}) => {
  utils.forEachPreferredTag('param', (jsdocParameter, targetTagName) => {
    if (!jsdocParameter.type) {
      report('Missing JSDoc @' + targetTagName + ' "' + jsdocParameter.name + '" type.', null, jsdocParameter);
    }
  });
}, {
  meta: {
    type: 'suggestion'
  }
});
