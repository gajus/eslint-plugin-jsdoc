import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  utils,
}) => {
  const tags = utils.getPresentTags(['param', 'arg', 'argument', 'returns', 'return']);

  tags.forEach((tag) => {
    if (tag.type) {
      utils.reportJSDoc(`Types are not permitted on @${tag.tag}.`, tag, () => {
        tag.type = '';
      });
    }
  });
}, {
  meta: {
    fixable: true,
    type: 'suggestion',
  },
});
