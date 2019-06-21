import iterateJsdoc from '../iterateJsdoc';

// eslint-disable-next-line complexity
export default iterateJsdoc(({
  report,
  utils
}) => {
  const functionParameterNames = utils.getFunctionParameterNames();
  const jsdocParameterNames = utils.getJsdocParameterNames();

  if (utils.avoidDocs('param')) {
    return;
  }

  // Param type is specified by type in @type
  if (utils.hasTag('type')) {
    return;
  }

  functionParameterNames.some((functionParameterName, index) => {
    const jsdocParameterName = jsdocParameterNames[index];

    if (!jsdocParameterName) {
      report('Missing JSDoc @' + utils.getPreferredTagName('param') + ' "' + functionParameterName + '" declaration.');

      return true;
    }

    return false;
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
