import iterateJsdoc from '../iterateJsdoc';

const prefixMatch = /^(\s+)(?:\*( ?))?/u;
const validPrefix = /^\s+\*(?:\/?$| )/u;

export default iterateJsdoc(({
  sourceCode,
  jsdocNode,
  report,
}) => {
  const fix = (fixer) => {
    const replacement = sourceCode.getText(jsdocNode).split('\n')
      .map((line, index) => {
        return index && !validPrefix.test(line) ? line.replace(prefixMatch, (_, $1, $2) => {
          return `${$1}*${$2 || ' '}`;
        }) : line;
      })
      .join('\n');

    return fixer.replaceText(jsdocNode, replacement);
  };

  sourceCode.getText(jsdocNode).split('\n').some((line, index) => {
    const lineNum = Number.parseInt(index, 10);
    if (lineNum && !validPrefix.test(line)) {
      report('Expected JSDoc block to have the prefix.', fix, {
        line: lineNum,
      });

      return true;
    }

    return false;
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    fixable: 'code',
    type: 'layout',
  },
});
