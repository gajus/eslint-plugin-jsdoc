import _ from 'lodash';
import iterateJsdoc from './../iterateJsdoc';

export default iterateJsdoc(({
    report,
    utils
}) => {
    let functionParameterNames,
        jsdocParameterNames;

    functionParameterNames = utils.getFunctionParameterNames();
    jsdocParameterNames = utils.getJsdocParameterNames();

    _.some(functionParameterNames, (functionParameterName, index) => {
        let jsdocParameterName;

        jsdocParameterName = jsdocParameterNames[index];

        if (!jsdocParameterName) {
            report('Missing JSDoc @' + utils.getPreferredTagName('param') + ' "' + functionParameterName + '" declaration.');

            return true;
        }
    });
});
