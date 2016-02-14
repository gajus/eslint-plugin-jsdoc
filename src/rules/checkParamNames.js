import _ from 'lodash';
import iterateJsdoc from './../iterateJsdoc';

const validateParameterNames = (targetTagName : string, functionParameterNames : Array<string>, jsdocParameterNames : Array<string>, report : Function) => {
    return _.some(jsdocParameterNames, (jsdocParameterName, index) => {
        const functionParameterName = functionParameterNames[index];

        if (!functionParameterName) {
            report('@' + targetTagName + ' "' + jsdocParameterName + '" does not match an existing function parameter.');

            return true;
        }

        if (functionParameterName === '<ObjectPattern>') {
            return;
        }

        if (functionParameterName !== jsdocParameterName) {
            report('Expected @' + targetTagName + ' names to be "' + functionParameterNames.join(', ') + '". Got "' + jsdocParameterNames.join(', ') + '".');

            return true;
        }

        return false;
    });
};

const validateParameterNamesDeep = (targetTagName : string, jsdocParameterNames : Array<string>, report : Function) => {
    let lastRealParameter;

    return _.some(jsdocParameterNames, (jsdocParameterName) => {
        const isPropertyPath = _.includes(jsdocParameterName, '.');

        if (isPropertyPath) {
            if (!lastRealParameter) {
                report('@' + targetTagName + ' path declaration ("' + jsdocParameterName + '") appears before any real parameter.');

                return true;
            }

            const pathRootNodeName = jsdocParameterName.slice(0, jsdocParameterName.indexOf('.'));

            if (pathRootNodeName !== lastRealParameter) {
                report('@' + targetTagName + ' path declaration ("' + jsdocParameterName + '") root node name ("' + pathRootNodeName + '") does not match previous real parameter name ("' + lastRealParameter + '").');

                return true;
            }
        } else {
            lastRealParameter = jsdocParameterName;
        }

        return false;
    });
};

export default iterateJsdoc(({
    report,
    utils
}) => {
    const functionParameterNames = utils.getFunctionParameterNames();
    const jsdocParameterNames = utils.getJsdocParameterNames();
    const jsdocParameterNamesDeep = utils.getJsdocParameterNamesDeep();
    const targetTagName = utils.getPreferredTagName('param');
    const isError = validateParameterNames(targetTagName, functionParameterNames, jsdocParameterNames, report);

    if (isError) {
        return;
    }

    validateParameterNamesDeep(targetTagName, jsdocParameterNamesDeep, report);
});
