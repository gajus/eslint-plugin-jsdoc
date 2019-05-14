import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report,
  utils
}) => {
  const targetTagName = utils.getPreferredTagName('example');

  const functionExamples = _.filter(jsdoc.tags, {
    tag: targetTagName
  });

  if (utils.hasATag([
    'inheritdoc',
    'override'
  ])) {
    return;
  }

  if (utils.avoidExampleOnConstructors() && (
    utils.hasATag([
      'class',
      'constructor'
    ]) ||
    utils.isConstructor()
  )) {
    return;
  }

  if (_.isEmpty(functionExamples)) {
    report('Missing JSDoc @' + targetTagName + ' declaration.');

    return;
  }

  _.forEach(functionExamples, (example) => {
    const exampleContent = _.compact((example.name + ' ' + example.description).trim().split('\n'));

    if (_.isEmpty(exampleContent)) {
      report('Missing JSDoc @' + targetTagName + ' description.');
    }
  });
});
