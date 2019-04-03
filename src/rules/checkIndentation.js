import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  sourceCode,
  jsdocNode,
  report
}) => {
  const reg = new RegExp(/^[ \t]+\*[ \t]{2}/m);
  const text = sourceCode.getText(jsdocNode);
  if (reg.test(text)) {
    report('There must be no indentation.');
  }
});
