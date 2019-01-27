import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report,
  utils
}) => {
  const targetTagName = utils.getPreferredTagName('returns');

  const jsdocTags = _.filter(jsdoc.tags, {
    tag: targetTagName
  });

  const sourcecode = utils.getFunctionSourceCode();

  // build a one-liner to test against
  const flattenedSource = sourcecode.replace(/\r?\n|\r|\s/g, '');

  const startsWithReturn = '(\\)\\s?\\{return)';

  const endsWithReturn = '(return.*\\})';

  const implicitReturn = '(\\s?=>\\s?\\b.*)';

  const implicitObjectReturn = '(\\s?=>\\s?\\(\\{)';

  const matcher = new RegExp([
    startsWithReturn,
    endsWithReturn,
    implicitObjectReturn,
    implicitReturn
  ].join('|'), 'gim');

  const positiveTest = (flattenedSource.match(matcher) || []).length > 0;

  const negativeTest = (flattenedSource.match(/(\{.*\{.*return)/gim) || []).length > 0 &&
    (flattenedSource.match(/(return)/gim) || []).length < 2;

  if (JSON.stringify(jsdocTags) === '[]' && positiveTest && !negativeTest) {
    report('Missing JSDoc @' + targetTagName + ' declaration.');
  }
});
