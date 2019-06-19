import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  utils,
  report
}) => {
  const tags = utils.getPresentTags(['param', 'arg', 'argument', 'returns', 'return']);

  tags.forEach((tag) => {
    if (tag.type) {
      report(`Types are not permitted on @${tag.tag}.`, null, tag);
    }
  });
});
