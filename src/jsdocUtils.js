import _ from 'lodash';
import tagNames from './tagNames';

const getFunctionParameterNames = (functionNode : Object) : Array<string> => {
  const getParamName = (param) => {
    if (_.has(param, 'name')) {
      return param.name;
    }

    if (_.has(param, 'left.name')) {
      return param.left.name;
    }

    if (param.type === 'ObjectPattern' || _.get(param, 'left.type') === 'ObjectPattern') {
      return '<ObjectPattern>';
    }

    if (param.type === 'ArrayPattern' || _.get(param, 'left.type') === 'ArrayPattern') {
      return '<ArrayPattern>';
    }

    if (param.type === 'RestElement') {
      return param.argument.name;
    }

    if (param.type === 'TSParameterProperty') {
      return getParamName(param.parameter);
    }

    throw new Error('Unsupported function signature format.');
  };

  return functionNode.params.map(getParamName);
};

/**
 * Gets all parameter names, including those that refer to a path, e.g. "@param foo; @param foo.bar".
 */
const getJsdocParameterNamesDeep = (jsdoc : Object, targetTagName : string) : Array<string> => {
  let jsdocParameterNames;

  jsdocParameterNames = _.filter(jsdoc.tags, {
    tag: targetTagName,
  });

  jsdocParameterNames = _.map(jsdocParameterNames, 'name');

  return jsdocParameterNames;
};

const getJsdocParameterNames = (jsdoc : Object, targetTagName : string) : Array<string> => {
  let jsdocParameterNames;

  jsdocParameterNames = getJsdocParameterNamesDeep(jsdoc, targetTagName);

  jsdocParameterNames = jsdocParameterNames.filter((name) => {
    return !name.includes('.');
  });

  return jsdocParameterNames;
};

const getPreferredTagName = (name : string, tagPreference : Object = {}) : string => {
  const prefValues = _.values(tagPreference);
  if (prefValues.includes(name) || prefValues.some((prefVal) => {
    return prefVal && typeof prefVal === 'object' && prefVal.replacement === name;
  })) {
    return name;
  }

  if (_.has(tagPreference, name)) {
    return tagPreference[name];
  }

  const preferredTagName = _.findKey(tagNames, (aliases) => {
    return aliases.includes(name);
  });
  if (preferredTagName) {
    return preferredTagName;
  }

  return name;
};

const isValidTag = (name : string, definedTags : Array) : boolean => {
  const validTagNames = _.keys(tagNames).concat(_.flatten(_.values(tagNames)));
  const additionalTags = definedTags;
  const allTags = validTagNames.concat(additionalTags);

  return allTags.includes(name);
};

const hasTag = (jsdoc : Object, targetTagName : string) : boolean => {
  const targetTagLower = targetTagName.toLowerCase();

  return _.some(jsdoc.tags, (doc : Object) => {
    return doc.tag.toLowerCase() === targetTagLower;
  });
};

const hasATag = (jsdoc : Object, targetTagNames : Array) : boolean => {
  return targetTagNames.some((targetTagName) => {
    return hasTag(jsdoc, targetTagName);
  });
};

/**
 * Checks if the JSDoc comment declares a return value.
 *
 * @param {JsDocTag} tag
 *   the tag which should be checked.
 * @returns {boolean}
 *   true in case a return value is declared; otherwise false.
 */
const hasDefinedTypeReturnTag = (tag) => {
  // The function should not continue in the event @returns is not defined...
  if (typeof tag === 'undefined' || tag === null) {
    return false;
  }

  // .. same applies if it declares `@returns {undefined}` or `@returns {void}`
  const tagType = tag.type.trim();
  if (tagType === 'undefined' || tagType === 'void') {
    return false;
  }

  // In any other case, something must be returned, and
  // a return statement is expected
  return true;
};

const namepathDefiningTags = [
  // NOT USEFUL WITHOUT NAMEPATH
  'external', 'host',
  'name',
  'typedef',

  // MAY BE USEFUL WITHOUT NAMEPATH
  'event',

  // MAY BE USEFUL WITHOUT NAMEPATH (OR
  //  BLOCK CAN USE NAMEPATH FROM ELSEWHERE)
  'class', 'constructor',
  'constant', 'const',
  'callback',
  'function', 'func', 'method',
  'interface',
  'member', 'var',
  'mixin',
  'namespace',
];

const namepathPointingTags = [
  // NOT USEFUL WITHOUT NAMEPATH
  'alias',
  'augments', 'extends',

  // `borrows` has a different format, however, so needs special parsing
  'borrows',
  'lends',
  'memberof',
  'memberof!',
  'mixes',
  'this',

  // MAY BE USEFUL WITHOUT NAMEPATH
  'emits',
  'fires',
  'listens',
];

const isNamepathDefiningTag = (tagName) => {
  return namepathDefiningTags.includes(tagName);
};

const isNamepathPointingTag = (tagName, checkSeesForNamepaths) => {
  return namepathPointingTags.includes(tagName) ||
    tagName === 'see' && checkSeesForNamepaths;
};

const isNamepathTag = (tagName, checkSeesForNamepaths) => {
  return isNamepathDefiningTag(tagName) ||
    isNamepathPointingTag(tagName, checkSeesForNamepaths);
};

const potentiallyEmptyNamepathTags = [
  // These may serve some minor purpose when empty or
  //  their namepath can be expressed elsewhere on the block
  'event',
  'callback',
  'class', 'constructor',
  'constant', 'const',
  'function', 'func', 'method',
  'interface',
  'member', 'var',
  'mixin',
  'namespace',
  'listens', 'fires', 'emits',
];

const isPotentiallyEmptyNamepathTag = (tag) => {
  return potentiallyEmptyNamepathTags.includes(tag);
};

let tagsWithTypes = [
  'class',
  'constant',
  'enum',
  'implements',
  'member',
  'module',
  'namespace',
  'param',
  'property',
  'returns',
  'throws',
  'type',
  'typedef',
  'yields',
];

const closureTagsWithTypes = [
  'package', 'private', 'protected', 'public', 'static',
];

const tagsWithTypesAliases = [
  'constructor',
  'const',
  'var',
  'arg',
  'argument',
  'prop',
  'return',
  'exception',
  'yield',
];

tagsWithTypes = tagsWithTypes.concat(tagsWithTypesAliases, closureTagsWithTypes);

const isTagWithType = (tagName) => {
  return tagsWithTypes.includes(tagName);
};

/**
 * Checks if a node has a return statement. Void return does not count.
 *
 * @param {object} node
 * @returns {boolean}
 */
// eslint-disable-next-line complexity
const hasReturnValue = (node) => {
  if (!node) {
    return false;
  }
  switch (node.type) {
  case 'FunctionExpression':
  case 'FunctionDeclaration':
  case 'ArrowFunctionExpression': {
    return node.expression || hasReturnValue(node.body);
  }
  case 'BlockStatement': {
    return node.body.some((bodyNode) => {
      return bodyNode.type !== 'FunctionDeclaration' && hasReturnValue(bodyNode);
    });
  }
  case 'WhileStatement':
  case 'DoWhileStatement':
  case 'ForStatement':
  case 'ForInStatement':
  case 'ForOfStatement':
  case 'WithStatement': {
    return hasReturnValue(node.body);
  }
  case 'IfStatement': {
    return hasReturnValue(node.consequent) || hasReturnValue(node.alternate);
  }
  case 'TryStatement': {
    return hasReturnValue(node.block) ||
      hasReturnValue(node.handler && node.handler.body) ||
      hasReturnValue(node.finalizer);
  }
  case 'SwitchStatement': {
    return node.cases.some(
      (someCase) => {
        return someCase.consequent.some(hasReturnValue);
      }
    );
  }
  case 'ReturnStatement': {
    // void return does not count.
    if (node.argument === null) {
      return false;
    }

    return true;
  }
  default: {
    return false;
  }
  }
};

/** @param {string} tag */
/*
const isInlineTag = (tag) => {
  return /^(@link|@linkcode|@linkplain|@tutorial) /.test(tag);
};
*/

/**
 * Parses GCC Generic/Template types
 *
 * @see {https://github.com/google/closure-compiler/wiki/Generic-Types}
 * @param {JsDocTag} tag
 * @returns {Array<string>}
 */
const parseClosureTemplateTag = (tag) => {
  return tag.source
    .split('@template')[1]
    .split(',')
    .map((type) => {
      return type.trim();
    });
};

/**
 * Checks user option for `contexts` array, defaulting to
 *   contexts designated by the rule. Returns an array of
 *   ESTree AST types, indicating allowable contexts.
 *
 * @param {*} context
 * @param {true|string[]} defaultContexts
 * @returns {string[]}
 */
const enforcedContexts = (context, defaultContexts) => {
  const {
    /* istanbul ignore next */
    contexts = defaultContexts === true ? [
      'ArrowFunctionExpression',
      'FunctionDeclaration',
      'FunctionExpression',
    ] : defaultContexts,
  } = context.options[0] || {};

  return contexts;
};

/**
 * @param {string[]} contexts
 * @param {Function} checkJsdoc
 */
const getContextObject = (contexts, checkJsdoc) => {
  return contexts.reduce((obj, prop) => {
    obj[prop] = checkJsdoc;

    return obj;
  }, {});
};

const filterTags = (tags = [], filter) => {
  return tags.filter(filter);
};

const tagsWithNamesAndDescriptions = [
  'param', 'arg', 'argument', 'property', 'prop',

  // These two are parsed by our custom parser as though having a `name`
  'returns', 'return',
];

const getTagsByType = (tags, tagPreference) => {
  const descName = getPreferredTagName('description', tagPreference);
  const tagsWithoutNames = [];
  const tagsWithNames = filterTags(tags, (tag) => {
    const {tag: tagName} = tag;
    const tagWithName = tagsWithNamesAndDescriptions.includes(tagName);
    if (!tagWithName && tagName !== descName) {
      tagsWithoutNames.push(tag);
    }

    return tagWithName;
  });

  return {
    tagsWithNames,
    tagsWithoutNames,
  };
};

const getAncestor = (sourceCode, nde, depth, idx = 0) => {
  if (idx === depth) {
    return nde;
  }
  const prevToken = sourceCode.getTokenBefore(nde);
  if (prevToken) {
    return getAncestor(sourceCode, prevToken, depth, idx + 1);
  }

  return null;
};

const getIndent = (sourceCode) => {
  let indent = sourceCode.text.match(/^\n*([ \t]+)/);
  /* istanbul ignore next */
  indent = indent ? indent[1] + indent[1].charAt() : ' ';

  return indent;
};

export default {
  enforcedContexts,
  filterTags,
  getAncestor,
  getContextObject,
  getFunctionParameterNames,
  getIndent,
  getJsdocParameterNames,
  getJsdocParameterNamesDeep,
  getPreferredTagName,
  getTagsByType,
  hasATag,
  hasDefinedTypeReturnTag,
  hasReturnValue,
  hasTag,
  isNamepathDefiningTag,
  isNamepathTag,
  isPotentiallyEmptyNamepathTag,
  isTagWithType,
  isValidTag,
  parseClosureTemplateTag,
};
