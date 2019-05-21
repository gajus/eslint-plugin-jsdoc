import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  sourceCode,
  jsdocNode,
  report,
  indent
}) => {
  // `indent` is whitespace from line 1 (`/**`), so slice and account for "/".
  const indentLevel = indent.length + 1;
  const sourceLines = sourceCode.getText(jsdocNode).split('\n')
    .slice(1)
    .map((line) => {
      return line.split('*')[0];
    })
    .filter((line) => {
      return !line.trim().length;
    });

  for (const line of sourceLines) {
    if (line.length !== indentLevel) {
      report('Expected JSDoc block to be aligned.');
      break;
    }
  }
}, {
  meta: {
    type: 'layout'
  }
});
