import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  report,
  utils
}) => {
  if (
    utils.hasATag([
      'class',
      'constructor'
    ]) ||
    utils.isConstructor()
  ) {
    return;
  }

  utils.forEachPreferredTag('implements', (tag) => {
    report('@implements used on a non-constructor function', null, tag);
  });
}, {
  meta: {
    type: 'suggestion'
  }
});
