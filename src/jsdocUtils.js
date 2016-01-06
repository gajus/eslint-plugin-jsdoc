import _ from 'lodash';
import tagNames from './tagNames';

let getFunctionParameterNames,
    getJsdocParameterNames,
    getJsdocParameterNamesDeep,
    getPreferredTagName,
    isValidTag;

getFunctionParameterNames = (functionNode : Object) : Array<string> => {
    return _.map(functionNode.params, (param) => {
        if (_.has(param, 'name')) {
            return param.name;
        }

        if (_.has(param, 'left.name')) {
            return param.left.name;
        }

        if (param.type === 'ObjectPattern') {
            return '<ObjectPattern>';
        }

        throw new Error('Unsupported function signature format.');
    });
};

/**
 * Gets all parameter names, including those that refer to a path, e.g. "@param foo; @param foo.bar".
 */
getJsdocParameterNamesDeep = (jsdoc : Object, targetTagName : string) : Array<string> => {
    let jsdocParameterNames;

    jsdocParameterNames = _.filter(jsdoc.tags, {
        tag: targetTagName
    });

    jsdocParameterNames = _.map(jsdocParameterNames, 'name');

    return jsdocParameterNames;
};

getJsdocParameterNames = (jsdoc : Object, targetTagName : string) : Array<string> => {
    let jsdocParameterNames;

    jsdocParameterNames = getJsdocParameterNamesDeep(jsdoc, targetTagName);

    jsdocParameterNames = _.filter(jsdocParameterNames, (name) => {
        return name.indexOf('.') === -1;
    });

    return jsdocParameterNames;
};

getPreferredTagName = (name : string, tagPreference : Object = {}) : string => {
    let preferredTagName;

    if (_.includes(_.values(tagPreference), name)) {
        return name;
    }

    preferredTagName = _.findKey(tagNames, (aliases) => {
        return _.includes(aliases, name);
    });

    if (preferredTagName) {
        return preferredTagName;
    }

    return _.has(tagPreference, name) ? tagPreference[name] : name;
};

isValidTag = (name : string) : boolean => {
    let validTagNames;

    validTagNames = _.keys(tagNames).concat(_.flatten(_.values(tagNames)));

    return _.includes(validTagNames, name);
};

export default {
    getFunctionParameterNames,
    getJsdocParameterNames,
    getJsdocParameterNamesDeep,
    getPreferredTagName,
    isValidTag
};
