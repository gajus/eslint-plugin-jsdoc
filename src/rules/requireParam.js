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
    type: 'suggestion'
  }
});
