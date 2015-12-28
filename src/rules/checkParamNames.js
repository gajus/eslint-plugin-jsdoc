import _ from 'lodash';
import jsdocUtils from './../jsdocUtils';
import iterateJsdoc from './../iterateJsdoc';

let validateParameterNames,
    validateParameterNamesDeep;

validateParameterNames = (functionParameterNames, jsdoc, report) => {
    let jsdocParameterNames;

    jsdocParameterNames = jsdocUtils.getJsdocParameterNames(jsdoc);

    return _.some(jsdocParameterNames, (jsdocParameterName, index) => {
        let functionParameterName;

        functionParameterName = functionParameterNames[index];

        if (!functionParameterName) {
            report('@param "' + jsdocParameterName + '" does not match an existing function parameter.');

            return true;
        }

        if (functionParameterName !== jsdocParameterName) {
            report('Expected @param names to be "' + functionParameterNames.join(', ') + '". Got "' + jsdocParameterNames.join(', ') + '".');

            return true;
        }
    });
};

validateParameterNamesDeep = (functionParameterNames, jsdoc, report) => {
    let jsdocParameterNamesDeep,
        lastRealParameter;

    jsdocParameterNamesDeep = jsdocUtils.getJsdocParameterNamesDeep(jsdoc);

    return _.some(jsdocParameterNamesDeep, (jsdocParameterName) => {
        let isPropertyPath;

        isPropertyPath = _.includes(jsdocParameterName, '.');

        if (isPropertyPath) {
            let pathRootNodeName;

            if (!lastRealParameter) {
                report('@param path declaration ("' + jsdocParameterName + '") appears before any real parameter.');

                return true;
            }

            pathRootNodeName = jsdocParameterName.slice(0, jsdocParameterName.indexOf('.'));

            if (pathRootNodeName !== lastRealParameter) {
                report('@param path declaration ("' + jsdocParameterName + '") root node name ("' + pathRootNodeName + '") does not match previous real parameter name ("' + lastRealParameter + '").');

                return true;
            }
        } else {
            lastRealParameter = jsdocParameterName;
        }
    });
};

export default iterateJsdoc((functionNode, jsdocNode, jsdoc, report) => {
    let functionParameterNames,
        isError;

    functionParameterNames = jsdocUtils.getFunctionParameterNames(functionNode);

    isError = validateParameterNames(functionParameterNames, jsdoc, report);

    if (isError) {
        return;
    }

    validateParameterNamesDeep(functionParameterNames, jsdoc, report);
});
