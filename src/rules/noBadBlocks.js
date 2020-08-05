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
    docs: {
      description: 'This rule checks for multi-line-style comments which fail to meet the criteria of a jsdoc block.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-no-bad-blocks',
    },
    fixable: 'code',
    type: 'layout',
  },
});
