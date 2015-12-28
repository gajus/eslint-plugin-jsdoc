import _ from 'lodash';

let getJsdocParameterNames;

getJsdocParameterNames = (jsdoc) => {
    let jsdocParameterNames;

    jsdocParameterNames = _.filter(jsdoc.tags, {
            tag: 'param'
        });
    jsdocParameterNames = _.map(jsdocParameterNames, 'name');

    jsdocParameterNames = _.filter(jsdocParameterNames, (name) => {
        return name.indexOf('.') === -1;
    });

    return jsdocParameterNames;
};

export default {
    getJsdocParameterNames
};
