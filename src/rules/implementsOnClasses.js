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

  if (utils.hasTag('implements')) {
    report('@implements used on a non-constructor function');
  }
}, {
  meta: {
    type: 'suggestion'
  }
});
