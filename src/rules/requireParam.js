import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  report,
  utils
}) => {
  const functionParameterNames = utils.getFunctionParameterNames();
  const jsdocParameterNames = utils.getJsdocParameterNames();

  // inheritdoc implies that all documentation is inherited; see http://usejsdoc.org/tags-inheritdoc.html
  if (utils.hasTag('inheritdoc')) {
    return;
  }

  // When settings.jsdoc.allowOverrideWithoutParam is true, override implies that all documentation is inherited.
  // See https://github.com/gajus/eslint-plugin-jsdoc/issues/73
  if (utils.hasTag('override') && utils.isOverrideAllowedWithoutParam()) {
    return;
  }

  _.some(functionParameterNames, (functionParameterName, index) => {
    const jsdocParameterName = jsdocParameterNames[index];

    if (!jsdocParameterName) {
      report('Missing JSDoc @' + utils.getPreferredTagName('param') + ' "' + functionParameterName + '" declaration.');

      return true;
    }

    return false;
  });
});
