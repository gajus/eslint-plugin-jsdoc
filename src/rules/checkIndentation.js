import iterateJsdoc from '../iterateJsdoc';

const maskExcludedContent = (str, excludeTags) => {
  const regContent = new RegExp(`([ \\t]+\\*)[ \\t]@(?:${excludeTags.join('|')})(?=[ \\n])([\\w|\\W]*?\\n)(?=[ \\t]*\\*(?:[ \\t]*@|\\/))`, 'gu');

  return str.replace(regContent, (_match, margin, code) => {
    return new Array(code.match(/\n/gu).length + 1).join(margin + '\n');
  });
};

const maskCodeBlocks = (str) => {
  const regContent = /([ \t]+\*)[ \t]```[^\n]*?([\w|\W]*?\n)(?=[ \t]*\*(?:[ \t]*(?:```|@\w+\s)|\/))/gu;

  return str.replace(regContent, (_match, margin, code) => {
    return new Array(code.match(/\n/gu).length + 1).join(margin + '\n');
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

  const reg = /^(?:\/?\**|[ \t]*)\*[ \t]{2}/gmu;
  const textWithoutCodeBlocks = maskCodeBlocks(sourceCode.getText(jsdocNode));
  const text = excludeTags.length ? maskExcludedContent(textWithoutCodeBlocks, excludeTags) : textWithoutCodeBlocks;

  if (reg.test(text)) {
    const lineBreaks = text.slice(0, reg.lastIndex).match(/\n/gu) || [];
    report('There must be no indentation.', null, {
      line: lineBreaks.length,
    });
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Reports invalid padding inside JSDoc blocks.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-indentation',
    },
    schema: [{
      additionalProperties: false,
      properties: {
        excludeTags: {
          items: {
            pattern: '^\\S+$',
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
