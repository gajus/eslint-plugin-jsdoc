import _ from 'lodash';
import WarnSettings from './WarnSettings';
import getDefaultTagStructureForMode from './getDefaultTagStructureForMode';
import {
  jsdocTags, closureTags, typeScriptTags,
} from './tagNames';

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
  if (
    propSignature.type === 'TSIndexSignature' ||
    propSignature.type === 'TSConstructSignatureDeclaration' ||
    propSignature.type === 'TSCallSignatureDeclaration'
  ) {
    return undefined;
  }
  if (propSignature.typeAnnotation && propSignature.typeAnnotation.typeAnnotation.type === 'TSTypeLiteral') {
    return [propSignature.key.name, propSignature.typeAnnotation.typeAnnotation.members.map((member) => {
      return getPropertiesFromPropertySignature(member);
    })];
  }

  return propSignature.key.name;
};

const getFunctionParameterNames = (
  functionNode : Object, checkDefaultObjects: Boolean,
) : Array<T> => {
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
      if (param.value.type === 'ArrayPattern') {
        return [param.key.name, param.value.elements.map((prop, idx) => {
          return {
            name: idx,
            restElement: prop.type === 'RestElement',
          };
        })];
      }
      if (param.value.type === 'ObjectPattern') {
        return [param.key.name, param.value.properties.map((prop) => {
          return getParamName(prop, isProperty);
        })];
      }
      if (param.value.type === 'AssignmentPattern') {
        switch (param.value.left.type) {
        case 'Identifier':
          // Default parameter
          if (checkDefaultObjects && param.value.right.type === 'ObjectExpression') {
            return [param.key.name, param.value.right.properties.map((prop) => {
              return getParamName(prop, isProperty);
            })];
          }
          break;
        case 'ObjectPattern':
          return [param.key.name, param.value.left.properties.map((prop) => {
            return getParamName(prop, isProperty);
          })];
        case 'ArrayPattern':
          return [param.key.name, param.value.left.elements.map((prop, idx) => {
            return {
              name: idx,
              restElement: prop.type === 'RestElement',
            };
          })];
        }
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

  return (functionNode.params || functionNode.value.params).map((param) => {
    return getParamName(param);
  });
};

const hasParams = (functionNode) => {
  // Should also check `functionNode.value.params` if supporting `MethodDefinition`
  return functionNode.params.length;
};

/**
 * Gets all names of the target type, including those that refer to a path, e.g.
 * "@param foo; @param foo.bar".
 */
const getJsdocTagsDeep = (jsdoc : Object, targetTagName : string) : Array<Object> => {
  const ret = [];
  jsdoc.tags.forEach(({name, tag, type}, idx) => {
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
  const tagPreferenceFixed = _.mapKeys(tagPreference, (_value, key) => {
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
 * Checks if the JSDoc comment declares a defined type.
 *
 * @param {JsDocTag} tag
 *   the tag which should be checked.
 * @returns {boolean}
 *   true in case a defined type is declared; otherwise false.
 */
const hasDefinedTypeTag = (tag) => {
  // The function should not continue in the event the type is not defined...
  if (typeof tag === 'undefined' || tag === null) {
    return false;
  }

  // .. same applies if it declares an `{undefined}` or `{void}` type
  const tagType = tag.type.trim();
  if (tagType === 'undefined' || tagType === 'void') {
    return false;
  }

  // In any other case, a type is present
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
 * Checks if a node is a promise but has no resolve value or an empty value.
 * An `undefined` resolve does not count.
 *
 * @param {object} node
 * @returns {boolean}
 */
const isNewPromiseExpression = (node) => {
  return node.type === 'NewExpression' && node.callee.type === 'Identifier' &&
    node.callee.name === 'Promise';
};

/**
 * Checks if a node has a return statement. Void return does not count.
 *
 * @param {object} node
 * @returns {boolean|Node}
 */
// eslint-disable-next-line complexity
const hasReturnValue = (node, promFilter) => {
  if (!node) {
    return false;
  }
  switch (node.type) {
  case 'FunctionExpression':
  case 'FunctionDeclaration':
  case 'ArrowFunctionExpression': {
    return node.expression || hasReturnValue(node.body, promFilter);
  }
  case 'BlockStatement': {
    return node.body.some((bodyNode) => {
      return bodyNode.type !== 'FunctionDeclaration' && hasReturnValue(bodyNode, promFilter);
    });
  }
  case 'WhileStatement':
  case 'DoWhileStatement':
  case 'ForStatement':
  case 'ForInStatement':
  case 'ForOfStatement':
  case 'WithStatement': {
    return hasReturnValue(node.body, promFilter);
  }
  case 'IfStatement': {
    return hasReturnValue(node.consequent, promFilter) || hasReturnValue(node.alternate, promFilter);
  }
  case 'TryStatement': {
    return hasReturnValue(node.block, promFilter) ||
      hasReturnValue(node.handler && node.handler.body, promFilter) ||
      hasReturnValue(node.finalizer, promFilter);
  }
  case 'SwitchStatement': {
    return node.cases.some(
      (someCase) => {
        return someCase.consequent.some((nde) => {
          return hasReturnValue(nde, promFilter);
        });
      },
    );
  }
  case 'ReturnStatement': {
    // void return does not count.
    if (node.argument === null) {
      return false;
    }

    if (promFilter && isNewPromiseExpression(node.argument)) {
      // Let caller decide how to filter, but this is, at the least,
      //   a return of sorts and truthy
      return promFilter(node.argument);
    }

    return true;
  }
  default: {
    return false;
  }
  }
};

/**
 * Avoids further checking child nodes if a nested function shadows the
 * resolver, but otherwise, if name is used (by call or passed in as an
 * argument to another function), will be considered as non-empty.
 *
 * This could check for redeclaration of the resolver, but as such is
 * unlikely, we avoid the performance cost of checking everywhere for
 * (re)declarations or assignments.
 *
 * @param {AST} node
 * @param {string} resolverName
 * @returns {boolean}
 */
// eslint-disable-next-line complexity
const hasNonEmptyResolverCall = (node, resolverName) => {
  if (!node) {
    return false;
  }

  // Arrow function without block
  switch (node.type) {
  case 'CallExpression':
    return node.callee.name === resolverName && (

      // Implicit or expliit undefined
      node.arguments.length > 1 || node.arguments[0] !== undefined
    ) ||
      node.arguments.some((nde) => {
        // Being passed in to another function (which might invoke it)
        return nde.type === 'Identifier' && nde.name === resolverName ||

          // Handle nested items
          hasNonEmptyResolverCall(nde, resolverName);
      });
  case 'ExpressionStatement':
    return hasNonEmptyResolverCall(node.expression, resolverName);
  case 'BlockStatement':
    return node.body.some((bodyNode) => {
      return hasNonEmptyResolverCall(bodyNode, resolverName);
    });
  case 'FunctionExpression':
  case 'FunctionDeclaration':
  case 'ArrowFunctionExpression': {
    // Shadowing
    if (node.params[0]?.name === resolverName) {
      return false;
    }

    return hasNonEmptyResolverCall(node.body, resolverName);
  }
  case 'WhileStatement':
  case 'DoWhileStatement':
  case 'ForStatement':
  case 'ForInStatement':
  case 'ForOfStatement':
  case 'WithStatement': {
    return hasNonEmptyResolverCall(node.body, resolverName);
  }
  case 'ConditionalExpression':
  case 'IfStatement': {
    return hasNonEmptyResolverCall(node.test, resolverName) ||
      hasNonEmptyResolverCall(node.consequent, resolverName) ||
      hasNonEmptyResolverCall(node.alternate, resolverName);
  }
  case 'TryStatement': {
    return hasNonEmptyResolverCall(node.block, resolverName) ||
      hasNonEmptyResolverCall(node.handler && node.handler.body, resolverName) ||
      hasNonEmptyResolverCall(node.finalizer, resolverName);
  }
  case 'SwitchStatement': {
    return node.cases.some(
      (someCase) => {
        return someCase.consequent.some((nde) => {
          return hasNonEmptyResolverCall(nde, resolverName);
        });
      },
    );
  }

  case 'AssignmentExpression':
  case 'BinaryExpression':
  case 'LogicalExpression': {
    return hasNonEmptyResolverCall(node.left, resolverName) ||
      hasNonEmptyResolverCall(node.right, resolverName);
  }

  // Comma
  case 'SequenceExpression': {
    return node.expressions.some((subExpression) => {
      return hasNonEmptyResolverCall(subExpression, resolverName);
    });
  }

  /*
  case 'ArrayExpression': case 'AssignmentPattern':
  case 'AwaitExpression':
  case 'MemberExpression': case 'OptionalMemberExpression':
  case 'VariableDeclaration':
  case 'OptionalCallExpression':
  case 'TaggedTemplateExpression':
  case 'TemplateElement': case 'TemplateLiteral': case 'UnaryExpression':
  case 'SpreadElement':
  case 'ArrayPattern': case 'ObjectPattern':
  case 'ObjectExpression':
  case 'Property':
  case 'ClassProperty':
  case 'ClassDeclaration': case 'ClassExpression': case 'MethodDefinition':
  case 'Super':
  case 'ExportDefaultDeclaration': case 'ExportNamedDeclaration':
  case 'LabeledStatement':
  case 'Import':
  case 'ImportExpression':
  case 'Decorator':
  case 'YieldExpression':

    // Todo: Add these (and also add to Yield/Throw checks)
    return false;
  */
  case 'ReturnStatement': {
    if (node.argument === null) {
      return false;
    }

    return hasNonEmptyResolverCall(node.argument, resolverName);
  }
  default:
    return false;
  }
};

/**
 * Checks if a Promise executor has no resolve value or an empty value.
 * An `undefined` resolve does not count.
 *
 * @param {object} node
 * @param {boolean} anyPromiseAsReturn
 * @returns {boolean}
 */
const hasValueOrExecutorHasNonEmptyResolveValue = (node, anyPromiseAsReturn) => {
  return hasReturnValue(node, (prom) => {
    if (anyPromiseAsReturn) {
      return true;
    }

    const [{params, body} = {}] = prom.arguments;

    if (!params?.length) {
      return false;
    }

    const [{name: resolverName}] = params;

    return hasNonEmptyResolverCall(body, resolverName);
  });
};

/**
 * Checks if a node has a return statement. Void return does not count.
 *
 * @param {object} node
 * @returns {boolean}
 */
// eslint-disable-next-line complexity
const hasYieldValue = (node, checkYieldReturnValue) => {
  if (!node) {
    return false;
  }
  switch (node.type) {
  case 'FunctionExpression':
  case 'FunctionDeclaration': {
    return node.generator && (
      node.expression || hasYieldValue(node.body, checkYieldReturnValue)
    );
  }
  case 'BlockStatement': {
    return node.body.some((bodyNode) => {
      return bodyNode.type !== 'FunctionDeclaration' && hasYieldValue(
        bodyNode, checkYieldReturnValue,
      );
    });
  }
  case 'ExpressionStatement': {
    return hasYieldValue(node.expression, checkYieldReturnValue);
  }
  case 'WhileStatement':
  case 'DoWhileStatement':
  case 'ForStatement':
  case 'ForInStatement':
  case 'ForOfStatement':
  case 'WithStatement': {
    return hasYieldValue(node.body, checkYieldReturnValue);
  }
  case 'ConditionalExpression':
  case 'IfStatement': {
    return hasYieldValue(node.test, checkYieldReturnValue) ||
      hasYieldValue(node.consequent, checkYieldReturnValue) ||
      hasYieldValue(node.alternate, checkYieldReturnValue);
  }
  case 'TryStatement': {
    return hasYieldValue(node.block, checkYieldReturnValue) ||
      hasYieldValue(node.handler && node.handler.body, checkYieldReturnValue) ||
      hasYieldValue(node.finalizer, checkYieldReturnValue);
  }
  case 'SwitchStatement': {
    return node.cases.some(
      (someCase) => {
        return someCase.consequent.some((nde) => {
          return hasYieldValue(nde, checkYieldReturnValue);
        });
      },
    );
  }
  case 'VariableDeclaration': {
    return node.declarations.some((nde) => {
      return hasYieldValue(nde, checkYieldReturnValue);
    });
  }
  case 'VariableDeclarator': {
    return hasYieldValue(node.init, checkYieldReturnValue);
  }
  case 'YieldExpression': {
    if (checkYieldReturnValue) {
      if (node.parent.type === 'VariableDeclarator') {
        return true;
      }

      return false;
    }

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
        return someCase.consequent.some((nde) => {
          return hasThrowValue(nde);
        });
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
 * @see {https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#template}
 * @param {JsDocTag} tag
 * @returns {Array<string>}
 */
const parseClosureTemplateTag = (tag) => {
  return tag.name
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

const filterTags = (tags, filter) => {
  return tags.filter(filter);
};

const tagsWithNamesAndDescriptions = new Set([
  'param', 'arg', 'argument', 'property', 'prop',
  'template',

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
  return (sourceCode.text.match(/^\n*([ \t]+)/u)?.[1] ?? '') + ' ';
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
  hasDefinedTypeTag,
  hasParams,
  hasReturnValue,
  hasTag,
  hasThrowValue,
  hasValueOrExecutorHasNonEmptyResolveValue,
  hasYieldValue,
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
