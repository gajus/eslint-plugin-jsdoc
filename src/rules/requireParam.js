import iterateJsdoc from '../iterateJsdoc';

// eslint-disable-next-line complexity
export default iterateJsdoc(({
  report,
  utils
}) => {
  const functionParameterNames = utils.getFunctionParameterNames();
  const jsdocParameterNames = utils.getJsdocParameterNames();
  if (!jsdocParameterNames) {
    return;
  }

  if (utils.avoidDocs()) {
    return;
  }

  // Param type is specified by type in @type
  if (utils.hasTag('type')) {
    return;
  }

  functionParameterNames.forEach((functionParameterName) => {
    if (['<ObjectPattern>', '<ArrayPattern>'].includes(functionParameterName)) {
      return;
    }
    if (!jsdocParameterNames.includes(functionParameterName)) {
      report(`Missing JSDoc @${utils.getPreferredTagName({tagName: 'param'})} "${functionParameterName}" declaration.`);
    }
  });
}, {
  meta: {
    schema: [
      {
        additionalProperties: false,
        properties: {
          exemptedBy: {
            items: {
              type: 'string'
            },
            type: 'array'
          }
        },
        type: 'object'
      }
    ],
    type: 'suggestion'
  }
});
