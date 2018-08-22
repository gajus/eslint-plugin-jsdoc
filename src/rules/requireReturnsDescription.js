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

  _.forEach(jsdocTags, (jsdocTag) => {
    if (!jsdocTag.description) {
      report(`Missing JSDoc @${targetTagName} description.`);
    }
  });
});
