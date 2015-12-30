import _ from 'lodash';
import iterateJsdoc from './../iterateJsdoc';

let validateParameterNames,
    validateParameterNamesDeep;

validateParameterNames = (targetTagName : string, functionParameterNames : Array<string>, jsdocParameterNames : Array<string>, report : Function) => {
    return _.some(jsdocParameterNames, (jsdocParameterName, index) => {
        let functionParameterName;

        functionParameterName = functionParameterNames[index];

        if (!functionParameterName) {
            report('@' + targetTagName + ' "' + jsdocParameterName + '" does not match an existing function parameter.');

            return true;
        }

        if (functionParameterName !== jsdocParameterName) {
            report('Expected @' + targetTagName + ' names to be "' + functionParameterNames.join(', ') + '". Got "' + jsdocParameterNames.join(', ') + '".');

            return true;
        }
    });
};

validateParameterNamesDeep = (targetTagName : string, jsdocParameterNames : Array<string>, report : Function) => {
    let lastRealParameter;

    return _.some(jsdocParameterNames, (jsdocParameterName) => {
        let isPropertyPath;

        isPropertyPath = _.includes(jsdocParameterName, '.');

        if (isPropertyPath) {
            let pathRootNodeName;

            if (!lastRealParameter) {
                report('@' + targetTagName + ' path declaration ("' + jsdocParameterName + '") appears before any real parameter.');

                return true;
            }

            pathRootNodeName = jsdocParameterName.slice(0, jsdocParameterName.indexOf('.'));

            if (pathRootNodeName !== lastRealParameter) {
                report('@' + targetTagName + ' path declaration ("' + jsdocParameterName + '") root node name ("' + pathRootNodeName + '") does not match previous real parameter name ("' + lastRealParameter + '").');

                return true;
            }
        } else {
            lastRealParameter = jsdocParameterName;
        }
    });
};

export default iterateJsdoc(({
    report,
    utils
}) => {
    let functionParameterNames,
        isError,
        jsdocParameterNames,
        jsdocParameterNamesDeep,
        targetTagName;

    functionParameterNames = utils.getFunctionParameterNames();
    jsdocParameterNames = utils.getJsdocParameterNames();
    jsdocParameterNamesDeep = utils.getJsdocParameterNamesDeep();
    targetTagName = utils.getPreferredTagName('param');

    isError = validateParameterNames(targetTagName, functionParameterNames, jsdocParameterNames, report);

    if (isError) {
        return;
    }

    validateParameterNamesDeep(targetTagName, jsdocParameterNamesDeep, report);
});
