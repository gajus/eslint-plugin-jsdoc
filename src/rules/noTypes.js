import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  utils,
  report
}) => {
  const tags = utils.filterTags((tag) => {
    return ['param', 'arg', 'argument', 'returns', 'return'].includes(tag.tag);
  });
  tags.forEach((tag) => {
    if (tag.type) {
      report(`Types are not permitted on @${tag.tag}.`, null, tag);
    }
  });
});
