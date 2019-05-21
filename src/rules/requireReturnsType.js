import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  report,
  utils
}) => {
  const targetTagName = utils.getPreferredTagName('returns');

  utils.forEachTag(targetTagName, (jsdocTag) => {
    if (!jsdocTag.type) {
      report('Missing JSDoc @' + targetTagName + ' type.', null, jsdocTag);
    }
  });
}, {
  meta: {
    type: 'suggestion'
  }
});
