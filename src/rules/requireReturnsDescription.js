import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  report,
  utils
}) => {
  const targetTagName = utils.getPreferredTagName('returns');

  utils.forEachTag(targetTagName, (jsdocTag) => {
    const type = jsdocTag.type && jsdocTag.type.trim();

    if (type === 'void' || type === 'undefined') {
      return;
    }

    if (!jsdocTag.description) {
      report('Missing JSDoc @' + targetTagName + ' description.', null, jsdocTag);
    }
  });
}, {
  meta: {
    type: 'suggestion'
  }
});
