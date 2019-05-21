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

  report('@implements used on a non-constructor function');
}, {
  meta: {
    type: 'suggestion'
  }
});
