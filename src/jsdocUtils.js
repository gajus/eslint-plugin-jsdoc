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
    tag: targetTagName
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
  if (_.values(tagPreference).includes(name)) {
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
  'namespace'
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
  'listens'
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
  'listens', 'fires', 'emits'
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
  'yields'
];

const closureTagsWithTypes = [
  'package', 'private', 'protected', 'public', 'static'
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
  'yield'
];

tagsWithTypes = tagsWithTypes.concat(tagsWithTypesAliases, closureTagsWithTypes);

const isTagWithType = (tagName) => {
  return tagsWithTypes.includes(tagName);
};

const LOOP_STATEMENTS = ['WhileStatement', 'DoWhileStatement', 'ForStatement', 'ForInStatement', 'ForOfStatement'];

const STATEMENTS_WITH_CHILDREN = [
  '@loop',
  'SwitchStatement',
  'IfStatement',
  'BlockStatement',
  'TryStatement',
  'ExpressionStatement',
  'WithStatement'
];

const RETURNFREE_STATEMENTS = [
  'VariableDeclaration',
  'ThrowStatement',
  'FunctionDeclaration',
  'BreakStatement',
  'ContinueStatement',
  'LabeledStatement',
  'DebuggerStatement',
  'EmptyStatement',
  'ThrowStatement'
];

const ENTRY_POINTS = ['FunctionDeclaration', 'ArrowFunctionExpression', 'FunctionExpression'];

/* eslint-disable sort-keys */
const lookupTable = {
  ReturnStatement: {
    is (node) {
      return node.type === 'ReturnStatement';
    },
    check (node) {
      /* istanbul ignore next */
      if (!lookupTable.ReturnStatement.is(node)) {
        return false;
      }

      // A return without any arguments just exits the function
      // and is typically not documented at all in jsdoc.
      if (node.argument === null) {
        return false;
      }

      return true;
    }
  },
  WithStatement: {
    is (node) {
      return node.type === 'WithStatement';
    },
    check (node, context, {yieldAsReturn}) {
      return lookupTable.BlockStatement.check(node.body, context, {yieldAsReturn});
    }
  },
  IfStatement: {
    is (node) {
      return node.type === 'IfStatement';
    },
    check (node, context, options) {
      /* istanbul ignore next */
      if (!lookupTable.IfStatement.is(node)) {
        return false;
      }

      if (lookupTable['@default'].check(node.consequent, context, options)) {
        return true;
      }

      if (node.alternate && lookupTable['@default'].check(node.alternate, context, options)) {
        return true;
      }

      return false;
    }
  },
  '@loop': {
    is (node) {
      return LOOP_STATEMENTS.includes(node.type);
    },
    check (node, context, options) {
      return lookupTable['@default'].check(node.body, context, options);
    }
  },
  SwitchStatement: {
    is (node) {
      return node.type === 'SwitchStatement';
    },
    check (node, context, options) {
      for (const item of node.cases) {
        for (const statement of item.consequent) {
          if (lookupTable['@default'].check(statement, context, options)) {
            return true;
          }
        }
      }

      return false;
    }
  },
  TryStatement: {
    is (node) {
      return node.type === 'TryStatement';
    },
    check (node, context, options) {
      /* istanbul ignore next */
      if (!lookupTable.TryStatement.is(node)) {
        return false;
      }

      if (lookupTable.BlockStatement.check(node.block, context, options)) {
        return true;
      }

      if (node.handler && node.handler.body) {
        if (lookupTable['@default'].check(node.handler.body, context, options)) {
          return true;
        }
      }
      if (lookupTable.BlockStatement.check(node.finalizer, context, options)) {
        return true;
      }

      return false;
    }
  },
  BlockStatement: {
    is (node) {
      return node.type === 'BlockStatement';
    },
    check (node, context, options) {
      // E.g. the catch block statement is optional.
      /* istanbul ignore next */
      if (typeof node === 'undefined' || node === null) {
        return false;
      }

      /* istanbul ignore next */
      if (!lookupTable.BlockStatement.is(node)) {
        return false;
      }

      for (const item of node.body) {
        if (lookupTable['@default'].check(item, context, options)) {
          return true;
        }
      }

      return false;
    }
  },
  FunctionExpression: {
    is (node) {
      return node.type === 'FunctionExpression';
    },
    check (node, context, {ignoreAsync, yieldAsReturn}) {
      return !ignoreAsync && node.async || lookupTable.BlockStatement.check(node.body, context, {yieldAsReturn});
    }
  },
  ArrowFunctionExpression: {
    is (node) {
      return node.type === 'ArrowFunctionExpression';
    },
    check (node, context, {ignoreAsync, yieldAsReturn}) {
      // An expression always has a return value.
      return node.expression ||
        !ignoreAsync && node.async ||
        lookupTable.BlockStatement.check(node.body, context, {yieldAsReturn});
    }
  },
  FunctionDeclaration: {
    is (node) {
      return node.type === 'FunctionDeclaration';
    },
    check (node, context, {ignoreAsync, yieldAsReturn}) {
      return !ignoreAsync && node.async || lookupTable.BlockStatement.check(node.body, context, {yieldAsReturn});
    }
  },
  YieldExpression: {
    is (node) {
      return node.type === 'YieldExpression';
    },
    check (node, context, {yieldAsReturn}) {
      if (!lookupTable.YieldExpression.is(node)) {
        return false;
      }

      return yieldAsReturn === 'always' ||
        yieldAsReturn === 'argument' && node.argument;
    }
  },
  ExpressionStatement: {
    is (node) {
      return node.type === 'ExpressionStatement';
    },
    check (node, context, options) {
      return lookupTable.YieldExpression.check(node.expression, context, options);
    }
  },
  '@default': {
    check (node, context, options) {
      // In case it is a `ReturnStatement`, we found what we were looking for
      if (lookupTable.ReturnStatement.is(node)) {
        return lookupTable.ReturnStatement.check(node, context, options);
      }

      // In case the element has children, we need to traverse them.
      // Examples are BlockStatement, Choices, TryStatement, Loops, ...
      for (const item of STATEMENTS_WITH_CHILDREN) {
        if (lookupTable[item].is(node)) {
          return lookupTable[item].check(node, context, options);
        }
      }

      if (options.yieldAsReturn &&
        node.type === 'VariableDeclaration' &&
        node.declarations
      ) {
        for (const declaration of node.declarations) {
          if (lookupTable.YieldExpression.is(declaration.init)) {
            return lookupTable.YieldExpression.check(declaration.init, context, options);
          }
        }
      }

      // Everything else cannot return anything.
      /* istanbul ignore next */
      if (RETURNFREE_STATEMENTS.includes(node.type)) {
        return false;
      }

      /* istanbul ignore next */
      // If we end up here, we stumbled upon an unknown element.
      // Most likely it is enough to add it to the blacklist.
      //
      // throw new Error('Unknown node type: ' + node.type);
      return false;
    }
  }
};

/**
 * Checks if the source code returns a return value.
 * It traverses the parsed source code and returns as
 * soon as it stumbles upon the first return statement.
 *
 * @param {object} node
 *   the node which should be checked.
 * @param {object} context
 * @param {object} options
 * @param {"always"|"argument"} [options.yieldAsReturn]
 * @param {boolean} options.ignoreAsync
 *   ignore implicit async return.
 * @returns {boolean}
 *   true in case the code returns a return value
 */
const hasReturnValue = (node, context, {ignoreAsync, yieldAsReturn} = {}) => {
  // Loop through all of our entry points
  for (const item of ENTRY_POINTS) {
    if (lookupTable[item].is(node)) {
      return lookupTable[item].check(node, context, {
        ignoreAsync,
        yieldAsReturn
      });
    }
  }
  /* istanbul ignore next */
  throw new Error(`Unknown element ${node.type}`);
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
      'FunctionExpression'
    ] : defaultContexts
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
  'returns', 'return'
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
    tagsWithoutNames,
    tagsWithNames
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
  parseClosureTemplateTag
};
