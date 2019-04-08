import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report,
  utils
}) => {
  if (utils.hasATag([
    // inheritdoc implies that all documentation is inherited
    // see http://usejsdoc.org/tags-inheritdoc.html
    //
    // As we do not know the parent method, we cannot perform any checks.
    'inheritdoc',
    'override',

    // A constructor function is assumed to return a class instance
    'constructor'
  ])) {
    return;
  }

  if (utils.isConstructor()) {
    return;
  }

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
