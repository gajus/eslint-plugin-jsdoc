import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({ // eslint-disable-line complexity
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
  if ((utils.hasTag('override') || utils.classHasTag('override')) && utils.isOverrideAllowedWithoutParam()) {
    return;
  }

  // When settings.jsdoc.allowImplementsWithoutParam is true, implements implies that all documentation is inherited.
  // See https://github.com/gajus/eslint-plugin-jsdoc/issues/100
  if ((utils.hasTag('implements') || utils.classHasTag('implements')) && utils.isImplementsAllowedWithoutParam()) {
    return;
  }

  // When settings.jsdoc.allowAugmentsExtendsWithoutParam is true, augments or extends implies that all documentation is inherited.
  // See https://github.com/gajus/eslint-plugin-jsdoc/issues/100
  if ((utils.hasTag('augments') || utils.hasTag('extends') ||
    utils.classHasTag('augments') || utils.classHasTag('extends')) && utils.isAugmentsExtendsAllowedWithoutParam()) {
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
