import _ from 'lodash';
import {jsdocTags, closureTags, typeScriptTags} from './tagNames';
import WarnSettings from './WarnSettings';
import getDefaultTagStructureForMode from './getDefaultTagStructureForMode';

type ParserMode = "jsdoc"|"typescript"|"closure";

let tagStructure;

const setTagStructure = (mode) => {
  tagStructure = getDefaultTagStructureForMode(mode);
};

// Given a nested array of property names, reduce them to a single array,
// appending the name of the root element along the way if present.
const flattenRoots = (params, root = '') => {
  let hasRestElement = false;
  let hasPropertyRest = false;
  const rests = [];

  // eslint-disable-next-line unicorn/no-reduce
  const names = params.reduce((acc, cur) => {
    if (Array.isArray(cur)) {
      let nms;
      if (Array.isArray(cur[1])) {
        nms = cur[1];
      } else {
        if (cur[1].hasRestElement) {
          hasRestElement = true;
        }
        if (cur[1].hasPropertyRest) {
          hasPropertyRest = true;
        }
        nms = cur[1].names;
      }

      const flattened = flattenRoots(nms, root ? `${root}.${cur[0]}` : cur[0]);
      if (flattened.hasRestElement) {
        hasRestElement = true;
      }
      if (flattened.hasPropertyRest) {
        hasPropertyRest = true;
      }
      const inner = [
        root ? `${root}.${cur[0]}` : cur[0],
        ...flattened.names,
      ].filter(Boolean);
      rests.push(false, ...flattened.rests);

      return acc.concat(inner);
    }
    if (typeof cur === 'object') {
      if (cur.isRestProperty) {
        hasPropertyRest = true;
        rests.push(true);
      } else {
        rests.push(false);
      }
      if (cur.restElement) {
        hasRestElement = true;
      }
      acc.push(root ? `${root}.${cur.name}` : cur.name);
    } else if (typeof cur !== 'undefined') {
      rests.push(false);
      acc.push(root ? `${root}.${cur}` : cur);
    }

    return acc;
  }, []);

  return {
    hasPropertyRest,
    hasRestElement,
    names,
    rests,
  };
};

type T = string | [?string, T];
const getPropertiesFromPropertySignature = (propSignature): T => {
  if (propSignature.type === 'TSIndexSignature' || propSignature.type === 'TSConstructSignatureDeclaration') {
    return undefined;
  }
  if (propSignature.typeAnnotation && propSignature.typeAnnotation.typeAnnotation.type === 'TSTypeLiteral') {
    return [propSignature.key.name, propSignature.typeAnnotation.typeAnnotation.members.map((member) => {
      return getPropertiesFromPropertySignature(member);
    })];
  }

  return propSignature.key.name;
};

const getFunctionParameterNames = (functionNode : Object) : Array<T> => {
  // eslint-disable-next-line complexity
  const getParamName = (param, isProperty) => {
    if (_.has(param, 'typeAnnotation') || _.has(param, 'left.typeAnnotation')) {
      const typeAnnotation = _.has(param, 'left.typeAnnotation') ? param.left.typeAnnotation : param.typeAnnotation;
      if (typeAnnotation.typeAnnotation.type === 'TSTypeLiteral') {
        const propertyNames = typeAnnotation.typeAnnotation.members.map((member) => {
          return getPropertiesFromPropertySignature(member);
        });
        const flattened = {
          ...flattenRoots(propertyNames),
          annotationParamName: param.name,
        };
        if (_.has(param, 'name') || _.has(param, 'left.name')) {
          return [_.has(param, 'left.name') ? param.left.name : param.name, flattened];
        }

        return [undefined, flattened];
      }
    }

    if (_.has(param, 'name')) {
      return param.name;
    }

    if (_.has(param, 'left.name')) {
      return param.left.name;
    }

    if (param.type === 'ObjectPattern' || param.left?.type === 'ObjectPattern') {
      const properties = param.properties || param.left?.properties;
      const roots = properties.map((prop) => {
        return getParamName(prop, true);
      });

      return [undefined, flattenRoots(roots)];
    }

    if (param.type === 'Property') {
      if (param.value.type === 'ObjectPattern') {
        return [param.key.name, param.value.properties.map((prop) => {
          return getParamName(prop, isProperty);
        })];
      }

      // As function parameters, these do not allow dynamic properties, etc.
      /* istanbul ignore else */
      if (param.key.type === 'Identifier') {
        return param.key.name;
      }

      // The key of an object could also be a string or number
      /* istanbul ignore else */
      if (param.key.type === 'Literal') {
        return param.key.raw ||
          // istanbul ignore next -- `raw` may not be present in all parsers
          param.key.value;
      }
    }

    if (param.type === 'ArrayPattern' || param.left?.type === 'ArrayPattern') {
      const elements = param.elements || param.left?.elements;
      const roots = elements.map((prop, idx) => {
        return {
          name: idx,
          restElement: prop.type === 'RestElement',
        };
      });

      return [undefined, flattenRoots(roots)];
    }

    if (['RestElement', 'ExperimentalRestProperty'].includes(param.type)) {
      return {
        isRestProperty: isProperty,
        name: param.argument.name,
        restElement: true,
      };
    }

    if (param.type === 'TSParameterProperty') {
      return getParamName(param.parameter, true);
    }

    throw new Error('Unsupported function signature format.');
  };

  return functionNode.params.map((param) => {
    return getParamName(param);
  });
};

/**
 * Gets all names of the target type, including those that refer to a path, e.g.
 * "@param foo; @param foo.bar".
 */
const getJsdocTagsDeep = (jsdoc : Object, targetTagName : string) : Array<Object> => {
  const ret = [];
  (jsdoc.tags || []).forEach(({name, tag, type}, idx) => {
    if (tag !== targetTagName) {
      return;
    }
    ret.push({
      idx,
      name,
      type,
    });
  });

  return ret;
};

const modeWarnSettings = WarnSettings();

const getTagNamesForMode = (mode, context) => {
  switch (mode) {
  case 'jsdoc':
    return jsdocTags;
  case 'typescript':
    return typeScriptTags;
  case 'closure': case 'permissive':
    return closureTags;
  default:
    if (!modeWarnSettings.hasBeenWarned(context, 'mode')) {
      context.report({
        loc: {
          start: {
            column: 1,
            line: 1,
          },
        },
        message: `Unrecognized value \`${mode}\` for \`settings.jsdoc.mode\`.`,
      });
      modeWarnSettings.markSettingAsWarned(context, 'mode');
    }

    // We'll avoid breaking too many other rules
    return jsdocTags;
  }
};

const getPreferredTagName = (
  context,
  mode : ParserMode,
  name : string,
  tagPreference : Object = {},
) : string|Object => {
  const prefValues = Object.values(tagPreference);
  if (prefValues.includes(name) || prefValues.some((prefVal) => {
    return prefVal && typeof prefVal === 'object' && prefVal.replacement === name;
  })) {
    return name;
  }

  // Allow keys to have a 'tag ' prefix to avoid upstream bug in ESLint
  // that disallows keys that conflict with Object.prototype,
  // e.g. 'tag constructor' for 'constructor':
  // https://github.com/eslint/eslint/issues/13289
  // https://github.com/gajus/eslint-plugin-jsdoc/issues/537
  const tagPreferenceFixed = _.mapKeys(tagPreference, (value, key) => {
    return key.replace('tag ', '');
  });

  if (_.has(tagPreferenceFixed, name)) {
    return tagPreferenceFixed[name];
  }

  const tagNames = getTagNamesForMode(mode, context);

  const preferredTagName = Object.entries(tagNames).find(([, aliases]) => {
    return aliases.includes(name);
  })?.[0];
  if (preferredTagName) {
    return preferredTagName;
  }

  return name;
};

const isValidTag = (
  context,
  mode : ParserMode,
  name : string,
  definedTags : Array,
) : boolean => {
  const tagNames = getTagNamesForMode(mode, context);
  const validTagNames = Object.keys(tagNames).concat(_.flatten(Object.values(tagNames)));
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

const ensureMap = (map, tag) => {
  if (!map.has(tag)) {
    map.set(tag, new Map());
  }

  return map.get(tag);
};

const overrideTagStructure = (structuredTags, tagMap = tagStructure) => {
  Object.entries(structuredTags).forEach(([tag, {
    name, type, required = [],
  }]) => {
    const tagStruct = ensureMap(tagMap, tag);

    tagStruct.set('nameContents', name);
    tagStruct.set('typeAllowed', type);

    const requiredName = required.includes('name');
    if (requiredName && name === false) {
      throw new Error('Cannot add "name" to `require` with the tag\'s `name` set to `false`');
    }
    tagStruct.set('nameRequired', requiredName);

    const requiredType = required.includes('type');
    if (requiredType && type === false) {
      throw new Error('Cannot add "type" to `require` with the tag\'s `type` set to `false`');
    }
    tagStruct.set('typeRequired', requiredType);

    const typeOrNameRequired = required.includes('typeOrNameRequired');
    if (typeOrNameRequired && name === false) {
      throw new Error('Cannot add "typeOrNameRequired" to `require` with the tag\'s `name` set to `false`');
    }
    if (typeOrNameRequired && type === false) {
      throw new Error('Cannot add "typeOrNameRequired" to `require` with the tag\'s `type` set to `false`');
    }
    tagStruct.set('typeOrNameRequired', typeOrNameRequired);
  });
};

const getTagStructureForMode = (mode, structuredTags) => {
  const tagStruct = getDefaultTagStructureForMode(mode);

  try {
    overrideTagStructure(structuredTags, tagStruct);
  } catch {
    //
  }

  return tagStruct;
};

const isNamepathDefiningTag = (tag, tagMap = tagStructure) => {
  const tagStruct = ensureMap(tagMap, tag);

  return tagStruct.get('nameContents') === 'namepath-defining';
};

const tagMustHaveTypePosition = (tag, tagMap = tagStructure) => {
  const tagStruct = ensureMap(tagMap, tag);

  return tagStruct.get('typeRequired');
};

const tagMightHaveTypePosition = (tag, tagMap = tagStructure) => {
  if (tagMustHaveTypePosition(tag, tagMap)) {
    return true;
  }

  const tagStruct = ensureMap(tagMap, tag);

  const ret = tagStruct.get('typeAllowed');

  return ret === undefined ? true : ret;
};

const namepathTypes = new Set([
  'namepath-defining', 'namepath-referencing',
]);

const tagMightHaveNamePosition = (tag, tagMap = tagStructure) => {
  const tagStruct = ensureMap(tagMap, tag);

  const ret = tagStruct.get('nameContents');

  return ret === undefined ? true : Boolean(ret);
};

const tagMightHaveNamepath = (tag, tagMap = tagStructure) => {
  const tagStruct = ensureMap(tagMap, tag);

  return namepathTypes.has(tagStruct.get('nameContents'));
};

const tagMustHaveNamePosition = (tag, tagMap = tagStructure) => {
  const tagStruct = ensureMap(tagMap, tag);

  return tagStruct.get('nameRequired');
};

const tagMightHaveEitherTypeOrNamePosition = (tag, tagMap) => {
  return tagMightHaveTypePosition(tag, tagMap) || tagMightHaveNamepath(tag, tagMap);
};

const tagMustHaveEitherTypeOrNamePosition = (tag, tagMap) => {
  const tagStruct = ensureMap(tagMap, tag);

  return tagStruct.get('typeOrNameRequired');
};

const tagMissingRequiredTypeOrNamepath = (tag, tagMap = tagStructure) => {
  const mustHaveTypePosition = tagMustHaveTypePosition(tag.tag, tagMap);
  const mightHaveTypePosition = tagMightHaveTypePosition(tag.tag, tagMap);
  const hasTypePosition = mightHaveTypePosition && Boolean(tag.type);
  const hasNameOrNamepathPosition = (
    tagMustHaveNamePosition(tag.tag, tagMap) ||
    tagMightHaveNamepath(tag.tag, tagMap)
  ) && Boolean(tag.name);
  const mustHaveEither = tagMustHaveEitherTypeOrNamePosition(tag.tag, tagMap);
  const hasEither = tagMightHaveEitherTypeOrNamePosition(tag.tag, tagMap) &&
    (hasTypePosition || hasNameOrNamepathPosition);

  return mustHaveEither && !hasEither && !mustHaveTypePosition;
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
      },
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

/**
 * Checks if a node has a throws statement.
 *
 * @param {object} node
 * @param {boolean} innerFunction
 * @returns {boolean}
 */
const hasThrowValue = (node, innerFunction) => {
  if (!node) {
    return false;
  }
  switch (node.type) {
  case 'FunctionExpression':
  case 'FunctionDeclaration':
  case 'ArrowFunctionExpression': {
    return !innerFunction && hasThrowValue(node.body, true);
  }
  case 'BlockStatement': {
    return node.body.some((bodyNode) => {
      return bodyNode.type !== 'FunctionDeclaration' && hasThrowValue(bodyNode);
    });
  }
  case 'WhileStatement':
  case 'DoWhileStatement':
  case 'ForStatement':
  case 'ForInStatement':
  case 'ForOfStatement':
  case 'WithStatement': {
    return hasThrowValue(node.body);
  }
  case 'IfStatement': {
    return hasThrowValue(node.consequent) || hasThrowValue(node.alternate);
  }

  // We only consider it to throw an error if the catch or finally blocks throw an error.
  case 'TryStatement': {
    return hasThrowValue(node.handler && node.handler.body) ||
        hasThrowValue(node.finalizer);
  }
  case 'SwitchStatement': {
    return node.cases.some(
      (someCase) => {
        return someCase.consequent.some(hasThrowValue);
      },
    );
  }
  case 'ThrowStatement': {
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
  return /^(@link|@linkcode|@linkplain|@tutorial) /u.test(tag);
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
  return (tag.name + ' ' + tag.description)
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
  const properties = {};

  contexts.forEach((prop) => {
    if (typeof prop === 'object') {
      properties[prop.context] = checkJsdoc;
    } else {
      properties[prop] = checkJsdoc;
    }
  });

  return properties;
};

const filterTags = (tags = [], filter) => {
  return tags.filter(filter);
};

const tagsWithNamesAndDescriptions = new Set([
  'param', 'arg', 'argument', 'property', 'prop',

  // These two are parsed by our custom parser as though having a `name`
  'returns', 'return',
]);

const getTagsByType = (context, mode, tags, tagPreference) => {
  const descName = getPreferredTagName(context, mode, 'description', tagPreference);
  const tagsWithoutNames = [];
  const tagsWithNames = filterTags(tags, (tag) => {
    const {tag: tagName} = tag;
    const tagWithName = tagsWithNamesAndDescriptions.has(tagName);
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

const getIndent = (sourceCode) => {
  let indent = sourceCode.text.match(/^\n*([ \t]+)/u);
  indent = indent ? indent[1] + ' ' : ' ';

  return indent;
};

const isConstructor = (node) => {
  return node?.type === 'MethodDefinition' && node.kind === 'constructor' ||
    node?.parent?.kind === 'constructor';
};

const isGetter = (node) => {
  return node && node.parent.kind === 'get';
};

const isSetter = (node) => {
  return node && node.parent.kind === 'set';
};

const exemptSpeciaMethods = (jsdoc, node, context, schema) => {
  const hasSchemaOption = (prop) => {
    const schemaProperties = schema[0].properties;

    return context.options[0]?.[prop] ??
      (schemaProperties[prop] && schemaProperties[prop].default);
  };

  return !hasSchemaOption('checkConstructors') &&
    (
      isConstructor(node) ||
      hasATag(jsdoc, [
        'class',
        'constructor',
      ])) ||
  !hasSchemaOption('checkGetters') &&
    isGetter(node) ||
  !hasSchemaOption('checkSetters') &&
    isSetter(node);
};

/**
 * Since path segments may be unquoted (if matching a reserved word,
 * identifier or numeric literal) or single or double quoted, in either
 * the `@param` or in source, we need to strip the quotes to give a fair
 * comparison.
 *
 * @param {string} str
 * @returns {string}
 */
const dropPathSegmentQuotes = (str) => {
  return str.replace(/\.(['"])(.*)\1/gu, '.$2');
};

const comparePaths = (name) => {
  return (otherPathName) => {
    return otherPathName === name ||
      dropPathSegmentQuotes(otherPathName) === dropPathSegmentQuotes(name);
  };
};

export default {
  comparePaths,
  dropPathSegmentQuotes,
  enforcedContexts,
  exemptSpeciaMethods,
  filterTags,
  flattenRoots,
  getContextObject,
  getFunctionParameterNames,
  getIndent,
  getJsdocTagsDeep,
  getPreferredTagName,
  getTagsByType,
  getTagStructureForMode,
  hasATag,
  hasDefinedTypeReturnTag,
  hasReturnValue,
  hasTag,
  hasThrowValue,
  isConstructor,
  isGetter,
  isNamepathDefiningTag,
  isSetter,
  isValidTag,
  overrideTagStructure,
  parseClosureTemplateTag,
  setTagStructure,
  tagMightHaveNamepath,
  tagMightHaveNamePosition,
  tagMightHaveTypePosition,
  tagMissingRequiredTypeOrNamepath,
  tagMustHaveNamePosition,
  tagMustHaveTypePosition,
};
