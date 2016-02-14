import _ from 'lodash';
import iterateJsdoc from './../iterateJsdoc';

export default iterateJsdoc(({
    report,
    utils
}) => {
    const functionParameterNames = utils.getFunctionParameterNames();
    const jsdocParameterNames = utils.getJsdocParameterNames();

    _.some(functionParameterNames, (functionParameterName, index) => {
        const jsdocParameterName = jsdocParameterNames[index];

        if (!jsdocParameterName) {
            report('Missing JSDoc @' + utils.getPreferredTagName('param') + ' "' + functionParameterName + '" declaration.');

            return true;
        }

        return false;
    });
});
