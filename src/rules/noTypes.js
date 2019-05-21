import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report
}) => {
  const tags = jsdoc.tags.filter((tag) => {
    return ['param', 'arg', 'argument', 'returns', 'return'].includes(tag.tag);
  });
  tags.forEach((tag) => {
    if (tag.type) {
      report(`Types are not permitted on @${tag.tag}.`, null, tag);
    }
  });
});
