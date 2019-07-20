import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  utils,
  report,
  jsdocNode,
  sourceCode
}) => {
  const tags = utils.getPresentTags(['param', 'arg', 'argument', 'returns', 'return']);

  tags.forEach((tag) => {
    if (tag.type) {
      const fix = (fixer) => {
        const lines = sourceCode.getText(jsdocNode).split('\n');
        const replacement = lines.map((line) => {
          const reg = new RegExp(`\\s{${tag.type}}`);

          return line.replace(reg, '');
        })
          .join('\n');

        return fixer.replaceText(jsdocNode, replacement);
      };
      report(`Types are not permitted on @${tag.tag}.`, fix, tag);
    }
  });
}, {
  meta: {
    fixable: 'code',
    type: 'suggestion'
  }
});
