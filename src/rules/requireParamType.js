import _ from 'lodash';
import iterateJsdoc from './../iterateJsdoc';

export default iterateJsdoc(({
    jsdoc,
    report,
    utils
}) => {
    let jsdocParameters,
        targetTagName;

    targetTagName = utils.getPreferredTagName('param');

    jsdocParameters = _.filter(jsdoc.tags, {
        tag: targetTagName
    });

    _.forEach(jsdocParameters, (jsdocParameter) => {
        if (!jsdocParameter.type) {
            report('Missing JSDoc @' + targetTagName + ' "' + jsdocParameter.name + '" type.');
        }
    });
});
