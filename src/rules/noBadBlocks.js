import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  context,
  sourceCode,
  allComments,
  makeReport,
}) => {
  const nonJsdocNodes = allComments.filter((comment) => {
    return (/^\/\*(?!\*)[\s*]*@\w/).test(sourceCode.getText(comment));
  });
  if (!nonJsdocNodes.length) {
    return;
  }

  nonJsdocNodes.forEach((node) => {
    const report = makeReport(context, node);

    const fix = (fixer) => {
      const text = sourceCode.getText(node);

      return fixer.replaceText(node, text.replace('/*', '/**'));
    };
    report('Expected JSDoc-like comment to begin with two asterisks.', fix);
  });
}, {
  checkFile: true,
  meta: {
    fixable: 'code',
    type: 'layout',
  },
});
