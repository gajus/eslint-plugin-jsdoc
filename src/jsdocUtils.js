import _ from 'lodash';
import tagNames from './tagNames';

const getFunctionParameterName = (param : Object) : string => {
  if (_.has(param, 'name')) {
    return param.name;
  }

  if (_.has(param, 'left.name')) {
    return param.left.name;
  }

  if (param.type === 'ObjectPattern' || _.get(param, 'left.type') === 'ObjectPattern') {
    return '<ObjectPattern>';
  }

  if (param.type === 'RestElement') {
    return param.argument.name;
  }

  if (param.type === 'ObjectPattern' || param.type === 'Property') {
    return param.key.name;
  }

  throw new Error('Unsupported function signature format.');
};

const getFunctionParameterNames = (functionNode : Object) : Array<string> => {
  return _.map(functionNode.params, getFunctionParameterName);
};

/**
 * Gets all parameter names, including those that refer to a path, e.g. "@param foo; @param foo.bar".
 */
const getJsdocParameterNamesDeep = (jsdoc : Object, targetTagName : string) : Array<string> => {
  let jsdocParameterNames;

  jsdocParameterNames = _.filter(jsdoc.tags, {
    tag: targetTagName
  });

  jsdocParameterNames = _.map(jsdocParameterNames, 'name');

  return jsdocParameterNames;
};

const getJsdocParameterNames = (jsdoc : Object, targetTagName : string) : Array<string> => {
  let jsdocParameterNames;

  jsdocParameterNames = getJsdocParameterNamesDeep(jsdoc, targetTagName);

  jsdocParameterNames = _.filter(jsdocParameterNames, (name) => {
    return name.indexOf('.') === -1;
  });

  return jsdocParameterNames;
};

const getPreferredTagName = (name : string, tagPreference : Object = {}) : string => {
  if (_.includes(_.values(tagPreference), name)) {
    return name;
  }

  const preferredTagName = _.findKey(tagNames, (aliases) => {
    return _.includes(aliases, name);
  });

  if (preferredTagName) {
    return preferredTagName;
  }

  return _.has(tagPreference, name) ? tagPreference[name] : name;
};

const isValidTag = (name : string, additionalTagNames : Object) : boolean => {
  const validTagNames = _.keys(tagNames).concat(_.flatten(_.values(tagNames)));
  const additionalTags = additionalTagNames.customTags || [];
  const allTags = validTagNames.concat(additionalTags);

  return _.includes(allTags, name);
};

const hasTag = (jsdoc : Object, targetTagName : string) : boolean => {
  const targetTagLower = targetTagName.toLowerCase();

  return _.some(jsdoc.tags, (doc : Object) => {
    return doc.tag.toLowerCase() === targetTagLower;
  });
};

export default {
  getFunctionParameterName,
  getFunctionParameterNames,
  getJsdocParameterNames,
  getJsdocParameterNamesDeep,
  getPreferredTagName,
  hasTag,
  isValidTag
};
