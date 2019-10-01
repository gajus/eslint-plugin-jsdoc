import iterateJsdoc from '../iterateJsdoc';

const maskExcludedContent = (str, excludeTags) => {
  const regContent = new RegExp(`([ \\t]+\\*)[ \\t]@(?:${excludeTags.join('|')})(?=[ \\n])([\\w|\\W]*?\\n)(?=[ \\t]*\\*(?:[ \\t]*@|\\/))`, 'g');

  return str.replace(regContent, (match, margin, code) => {
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
    excludeTags = ['example'],
  } = options;

  const reg = new RegExp(/^(?:\/?\**|[ \t]*)\*[ \t]{2}/gm);
  const text = excludeTags.length ? maskExcludedContent(sourceCode.getText(jsdocNode), excludeTags) : sourceCode.getText(jsdocNode);

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
        excludeTags: {
          items: {
            type: 'string',
          },
          type: 'array',
        },
      },
      type: 'object',
    }],
    type: 'layout',
  },
});
