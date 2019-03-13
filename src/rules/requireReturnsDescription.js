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
    const type = jsdocTag.type && jsdocTag.type.trim();

    if (type === 'void' || type === 'undefined') {
      return;
    }

    if (!jsdocTag.description) {
      report('Missing JSDoc @' + targetTagName + ' description.', null, jsdocTag);
    }
  });
});
