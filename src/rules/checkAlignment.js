import _ from 'lodash';
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

  const fix = (fixer) => {
    const replacement = sourceCode.getText(jsdocNode).split('\n')
      .map((line, index) => {
        // Ignore the first line and all lines not starting with `*`
        const ignored = !index || line.split('*')[0].trim().length;

        return ignored ? line : `${indent} ${_.trimStart(line)}`;
      })
      .join('\n');

    return fixer.replaceText(jsdocNode, replacement);
  };

  sourceLines.some((line, lineNum) => {
    if (line.length !== indentLevel) {
      report('Expected JSDoc block to be aligned.', fix, {
        line: lineNum + 1
      });

      return true;
    }

    return false;
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    fixable: 'code',
    type: 'layout'
  }
});
