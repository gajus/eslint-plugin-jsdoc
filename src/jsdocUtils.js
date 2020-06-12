import _ from 'lodash';
import {jsdocTags, closureTags, typeScriptTags} from './tagNames';
import WarnSettings from './WarnSettings';

type ParserMode = "jsdoc"|"typescript"|"closure";

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
        const flattened = flattenRoots(propertyNames);
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
  case 'closure':
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
  // e.g. 'tag constructor' for 'constructor' (#537)
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

const tagsWithMandatoryTypePosition = new Set([
  // These both show curly brackets in the doc signature and examples
  // "typeExpression"
  'implements',

  // "typeName"
  'type',
]);

const tagsWithMandatoryTypePositionClosure = new Set([
  ...tagsWithMandatoryTypePosition,
  'this',
  'define',
]);

// All of these have a signature with "type" except for
//  `augments`/`extends` ("namepath")
//  `param`/`arg`/`argument` (no signature)
//  `property`/`prop` (no signature)
// `modifies` (undocumented)
const tagsWithOptionalTypePosition = new Set([
  // These have the example showing curly brackets but not in their doc signature, e.g.: https://jsdoc.app/tags-enum.html
  'enum',
  'member', 'var',

  'typedef',

  // These do not show curly brackets in either the signature or examples
  'augments', 'extends',

  'class', 'constructor',
  'constant', 'const',

  // These show the signature with curly brackets but not in the example
  'module',
  'namespace',

  // These have no formal signature in the docs but show curly brackets
  //   in the examples
  'param', 'arg', 'argument',
  'property', 'prop',

  // These show curly brackets in the signature and in the examples
  'returns', 'return',
  'throws', 'exception',
  'yields', 'yield',

  // Has no documentation, but test example has curly brackets, and
  //  "name" would be suggested rather than "namepath" based on example; not
  //  sure if name is required
  'modifies',
]);

const tagsWithOptionalTypePositionClosure = new Set([
  ...tagsWithOptionalTypePosition,

  'export',

  // Shows the signature with curly brackets but not in the example
  // "typeExpression"
  'package',
  'private',
  'protected',

  // These do not show a signature nor show curly brackets in the example
  'public',
  'static',
]);

// None of these show as having curly brackets for their name/namepath
const namepathDefiningTags = new Set([
  // These appear to require a "name" in their signature, albeit these
  //  are somewhat different from other "name"'s (including as described
  // at https://jsdoc.app/about-namepaths.html )
  'external', 'host',
  'event',

  // These allow for "name"'s in their signature, but indicate as optional
  'class', 'constructor',
  'constant', 'const',
  'function', 'func', 'method',
  'interface',
  'member', 'var',
  'mixin',
  'namespace',

  // Todo: Should add `module` here (with optional "name" and no curly brackets);
  //  this block impacts `no-undefined-types` and `valid-types` (search for
  //  "isNamepathDefiningTag|tagMightHaveNamePosition|tagMightHaveEitherTypeOrNamePosition")

  // These seem to all require a "namepath" in their signatures (with no counter-examples)
  'name',
  'typedef',
  'callback',
]);

// The following do not seem to allow curly brackets in their doc
//  signature or examples (besides `modifies`)
const tagsWithOptionalNamePosition = new Set([
  ...namepathDefiningTags,

  // `borrows` has a different format, however, so needs special parsing;
  //   seems to require both, and as "namepath"'s
  'borrows',

  // Signature seems to require a "name" (of an event) and no counter-examples
  'emits', 'fires',
  'listens',

  // Signature seems to require a "namepath" (and no counter-examples)
  'alias',
  'augments', 'extends',
  'lends',
  'this',

  // Signature seems to require a "namepath" (and no counter-examples),
  //  though it allows an incomplete namepath ending with connecting symbol
  'memberof', 'memberof!',

  // Signature seems to require a "OtherObjectPath" with no counter-examples
  'mixes',

  // Signature allows for "namepath" or text
  'see',
]);

// Todo: `@link` seems to require a namepath OR URL and might be checked as such.

// The doc signature of `event` seems to require a "name"
const tagsWithMandatoryNamePosition = new Set([
  // "name" (and a special syntax for the `external` name)
  'external', 'host',

  // "namepath"
  'callback',
  'name',
  'typedef',
]);

const tagsWithMandatoryTypeOrNamePosition = new Set([
  // "namepath"
  'alias',
  'augments', 'extends',
  'borrows',
  'lends',
  'memberof', 'memberof!',
  'name',
  'this',
  'typedef',

  // "name"
  'external', 'host',

  // "OtherObjectPath"
  'mixes',
]);

const isNamepathDefiningTag = (tagName) => {
  return namepathDefiningTags.has(tagName);
};

const tagMightHaveTypePosition = (mode, tag) => {
  if (mode === 'closure') {
    return tagsWithMandatoryTypePositionClosure.has(tag) ||
      tagsWithOptionalTypePositionClosure.has(tag);
  }

  return tagsWithMandatoryTypePosition.has(tag) ||
    tagsWithOptionalTypePosition.has(tag);
};

const tagMustHaveTypePosition = (mode, tag) => {
  if (mode === 'closure') {
    return tagsWithMandatoryTypePositionClosure.has(tag);
  }

  return tagsWithMandatoryTypePosition.has(tag);
};

const tagMightHaveNamePosition = (tag) => {
  return tagsWithOptionalNamePosition.has(tag);
};

const tagMustHaveNamePosition = (tag) => {
  return tagsWithMandatoryNamePosition.has(tag);
};

const tagMightHaveEitherTypeOrNamePosition = (mode, tag) => {
  return tagMightHaveTypePosition(mode, tag) || tagMightHaveNamePosition(tag);
};

const tagMustHaveEitherTypeOrNamePosition = (tag) => {
  return tagsWithMandatoryTypeOrNamePosition.has(tag);
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
  indent = indent ? indent[1] + indent[1].charAt() : ' ';

  return indent;
};

export default {
  enforcedContexts,
  filterTags,
  flattenRoots,
  getContextObject,
  getFunctionParameterNames,
  getIndent,
  getJsdocTagsDeep,
  getPreferredTagName,
  getTagsByType,
  hasATag,
  hasDefinedTypeReturnTag,
  hasReturnValue,
  hasTag,
  isNamepathDefiningTag,
  isValidTag,
  parseClosureTemplateTag,
  tagMightHaveEitherTypeOrNamePosition,
  tagMightHaveNamePosition,
  tagMightHaveTypePosition,
  tagMustHaveEitherTypeOrNamePosition,
  tagMustHaveNamePosition,
  tagMustHaveTypePosition,
};
