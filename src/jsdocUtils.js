import _ from 'lodash';
import {jsdocTags, closureTags, typeScriptTags} from './tagNames';
import WarnSettings from './WarnSettings';

type ParserMode = "jsdoc"|"typescript"|"closure";

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
) : string => {
  const prefValues = _.values(tagPreference);
  if (prefValues.includes(name) || prefValues.some((prefVal) => {
    return prefVal && typeof prefVal === 'object' && prefVal.replacement === name;
  })) {
    return name;
  }

  if (_.has(tagPreference, name)) {
    return tagPreference[name];
  }

  const tagNames = getTagNamesForMode(mode, context);

  const preferredTagName = _.findKey(tagNames, (aliases) => {
    return aliases.includes(name);
  });
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

// Todo: These type and namepath tag listings currently look
//   at tags with `{...}` as being a type, but jsdoc may
//   allow some namepaths only within brackets as well

const tagsWithMandatoryType = [
  // These both show curly brackets in the doc signature and examples
  // "typeExpression"
  'implements',

  // "typeName"
  'type',
];

// All of these have a signature with "type" except for
//  `augments`/`extends` ("namepath")
//  `param`/`arg`/`argument` (no signature)
//  `property`/`prop` (no signature)
// `modifies` (undocumented)
const tagsWithOptionalType = [
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
];

const tagsWithOptionalTypeClosure = [
  ...tagsWithOptionalType,

  // Shows the signature with curly brackets but not in the example
  // "typeExpression"
  'package',
  'private',
  'protected',

  // These do not show a signature nor show curly brackets in the example
  'public',
  'static',
];

// None of these show as having curly brackets for their name/namepath
const namepathDefiningTags = [
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
  //  this block impacts `no-undefined-types` and `valid-types` (search for "isNamepathDefiningTag|tagMightHaveNamepath|tagMightHaveEitherTypeOrNamepath")

  // These seem to all require a "namepath" in their signatures (with no counter-examples)
  'name',
  'typedef',
  'callback',
];

// The following do not seem to allow curly brackets in their doc
//  signature or examples (besides `modifies`)
const tagsWithOptionalNamepath = [
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
];

// Todo: `@link` seems to require a namepath OR URL and might be checked as such.

// The doc signature of `event` seems to require a "name"
const tagsWithMandatoryNamepath = [
  // "name" (and a special syntax for the `external` name)
  'external', 'host',

  // "namepath"
  'callback',
  'name',
  'typedef',
];

const tagsWithMandatoryTypeOrNamepath = [
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
];

const isNamepathDefiningTag = (tagName) => {
  return namepathDefiningTags.includes(tagName);
};

const tagMightHaveAType = (mode, tag) => {
  return tagsWithMandatoryType.includes(tag) || (mode === 'closure' ?
    tagsWithOptionalTypeClosure.includes(tag) :
    tagsWithOptionalType.includes(tag));
};

const tagMustHaveType = (tag) => {
  return tagsWithMandatoryType.includes(tag);
};

const tagMightHaveNamepath = (tag) => {
  return tagsWithOptionalNamepath.includes(tag);
};

const tagMustHaveNamepath = (tag) => {
  return tagsWithMandatoryNamepath.includes(tag);
};

const tagMightHaveEitherTypeOrNamepath = (mode, tag) => {
  return tagMightHaveAType(mode, tag) || tagMightHaveNamepath(tag);
};

const tagMustHaveEitherTypeOrNamepath = (tag) => {
  return tagsWithMandatoryTypeOrNamepath.includes(tag);
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

const getTagsByType = (context, mode, tags, tagPreference) => {
  const descName = getPreferredTagName(context, mode, 'description', tagPreference);
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
  isValidTag,
  parseClosureTemplateTag,
  tagMightHaveAType,
  tagMightHaveEitherTypeOrNamepath,
  tagMightHaveNamepath,
  tagMustHaveEitherTypeOrNamepath,
  tagMustHaveNamepath,
  tagMustHaveType,
};
