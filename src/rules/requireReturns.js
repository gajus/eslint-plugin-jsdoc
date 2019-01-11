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

  if (JSON.stringify(jsdocTags) === '[]' && sourcecode.indexOf('return') >= 1) {
    report('Missing JSDoc @' + targetTagName + ' declaration.');
  }
});
