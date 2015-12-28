import _ from 'lodash';

let getJsdocParameterNames,
    getJsdocParameterNamesDeep;

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
    getJsdocParameterNames,
    getJsdocParameterNamesDeep
};
