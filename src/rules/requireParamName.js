import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report,
  utils
}) => {
  const targetTagName = utils.getPreferredTagName('param');

  const jsdocParameters = _.filter(jsdoc.tags, {
    tag: targetTagName
  });

  _.forEach(jsdocParameters, (jsdocParameter) => {
    if (jsdocParameter.tag && jsdocParameter.name === '') {
      report('There must be an identifier after @param ' + (jsdocParameter.type === '' ? 'type' : 'tag') + '.', null, jsdocParameter);
    }
  });
});
