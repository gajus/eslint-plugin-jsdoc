import iterateJsdoc from '../iterateJsdoc';

const maskExamples = (str) => {
  const regExamples = /([ \t]+\*)[ \t]@example(?=[ \n])([\w|\W]*?\n)(?=[ \t]*\*(?:[ \t]*@|\/))/g;

  return str.replace(regExamples, (match, margin, code) => {
    return (new Array(code.match(/\n/g).length + 1)).join(margin + '\n');
  });
};

export default iterateJsdoc(({
  sourceCode,
  jsdocNode,
  report,
  context,
}) => {
  const options = context.options[0] || {};
  const {
    excludeExamples = false,
  } = options;

  const reg = new RegExp(/^(?:\/?\**|[ \t]*)\*[ \t]{2}/gm);
  const text = excludeExamples ? maskExamples(sourceCode.getText(jsdocNode)) : sourceCode.getText(jsdocNode);

  if (reg.test(text)) {
    const lineBreaks = text.slice(0, reg.lastIndex).match(/\n/g) || [];
    report('There must be no indentation.', null, {
      line: lineBreaks.length,
    });
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    schema: [{
      additionalProperties: false,
      properties: {
        excludeExamples: {
          default: false,
          type: 'boolean',
        },
      },
      type: 'object',
    }],
    type: 'layout',
  },
});
