import _ from 'lodash';

let getFunctionParameterNames,
    getJsdocParameterNames,
    getJsdocParameterNamesDeep;

getFunctionParameterNames = (functionNode) => {
    return _.map(functionNode.params, (param) => {
        if (_.has(param, 'name')) {
            return param.name;
        }

        if (_.has(param, 'left.name')) {
            return param.left.name;
        }

        throw new Error('Unsupported function signature format.');
    });
};

getJsdocParameterNamesDeep = (jsdoc) => {
    let jsdocParameterNames;

    jsdocParameterNames = _.filter(jsdoc.tags, {
        tag: 'param'
    });

    jsdocParameterNames = _.map(jsdocParameterNames, 'name');

    return jsdocParameterNames;
};

getJsdocParameterNames = (jsdoc) => {
    let jsdocParameterNames;

    jsdocParameterNames = getJsdocParameterNamesDeep(jsdoc);

    jsdocParameterNames = _.filter(jsdocParameterNames, (name) => {
        return name.indexOf('.') === -1;
    });

    return jsdocParameterNames;
};

export default {
    getFunctionParameterNames,
    getJsdocParameterNames,
    getJsdocParameterNamesDeep
};
