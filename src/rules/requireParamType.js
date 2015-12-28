import _ from 'lodash';
import iterateJsdoc from './../iterateJsdoc';

export default iterateJsdoc((functionNode, jsdocNode, jsdoc, report) => {
    let jsdocParameters;

    jsdocParameters = _.filter(jsdoc.tags, {
        tag: 'param'
    });

    _.forEach(jsdocParameters, (jsdocParameter) => {
        if (!jsdocParameter.type) {
            report('Missing JSDoc @param "' + jsdocParameter.name + '" type.');
        }
    });
});
