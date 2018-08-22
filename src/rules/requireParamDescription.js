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
    if (!jsdocParameter.description) {
      report(`Missing JSDoc @${targetTagName} "${jsdocParameter.name}" description.`);
    }
  });
});
