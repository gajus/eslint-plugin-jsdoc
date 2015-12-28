import _ from 'lodash';
import jsdocUtils from './../jsdocUtils';
import iterateJsdoc from './../iterateJsdoc';

export default iterateJsdoc((functionNode, jsdocNode, jsdoc, report) => {
    let functionParameterNames,
        jsdocParameterNames;

    functionParameterNames = _.map(functionNode.params, 'name');
    jsdocParameterNames = jsdocUtils.getJsdocParameterNames(jsdoc);

    _.some(functionParameterNames, (functionParameterName, i) => {
        let jsdocParameterName;

        jsdocParameterName = jsdocParameterNames[i];

        if (!jsdocParameterName) {
            report('Missing JSDoc @param "' + functionParameterName + '" declaration.');

            return true;
        }
    });
});
