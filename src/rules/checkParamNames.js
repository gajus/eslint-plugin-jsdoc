import _ from 'lodash';
import jsdocUtils from './../jsdocUtils';
import iterateJsdoc from './../iterateJsdoc';

export default iterateJsdoc((functionNode, jsdocNode, jsdoc, report) => {
    let functionParameterNames,
        jsdocParameterNames;

    functionParameterNames = _.map(functionNode.params, 'name');
    jsdocParameterNames = jsdocUtils.getJsdocParameterNames(jsdoc);

    _.some(jsdocParameterNames, (jsdocParameterName, i) => {
        let functionParameterName;

        functionParameterName = functionParameterNames[i];

        if (!functionParameterName) {
            report('Redundant JSDoc @param "' + jsdocParameterName + '".');

            return true;
        }

        if (functionParameterName !== jsdocParameterName) {
            report('Expected JSDoc @param names to be "' + functionParameterNames.join(', ') + '". Got "' + jsdocParameterNames.join(', ') + '".');

            return true;
        }
    });
});
