import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  sourceCode,
  jsdocNode,
  report,
}) => {
  const reg = new RegExp(/^(?:\/?\**|[ \t]*)\*[ \t]{2}/gm);
  const text = sourceCode.getText(jsdocNode);

  if (reg.test(text)) {
    const lineBreaks = text.slice(0, reg.lastIndex).match(/\n/g) || [];
    report('There must be no indentation.', null, {
      line: lineBreaks.length,
    });
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    type: 'layout',
  },
});
