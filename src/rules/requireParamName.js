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
    if (jsdocParameter.tag && jsdocParameter.name === '') {
      report('There must be an identifier after @param ' + (jsdocParameter.type === '' ? 'type' : 'tag') + '.', null, jsdocParameter);
    }
  });
}, {
  meta: {
    type: 'suggestion'
  }
});
