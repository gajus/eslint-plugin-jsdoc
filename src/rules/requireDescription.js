import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report,
  utils
}) => {
  const targetTagName = utils.getPreferredTagName('description');

  const functionExamples = _.filter(jsdoc.tags, {
    tag: targetTagName
  });

  if (_.isEmpty(functionExamples)) {
    return report('Missing JSDoc @' + targetTagName + ' declaration.');
  }

  return _.forEach(functionExamples, (example) => {
    const exampleContent = _.compact((example.name + ' ' + example.description).trim().split('\n'));

    if (_.isEmpty(exampleContent)) {
      report('Missing JSDoc @' + targetTagName + ' description.');
    }
  });
});
