import iterateJsdoc from '../iterateJsdoc';

const DEFAULT = '@default';
const LOOP = '@loop';

const RETURN_STATEMENT = 'ReturnStatement';
const IF_STATEMENT = 'IfStatement';
const EXPRESSION_STATEMENT = 'ExpressionStatement';
const SWITCH_STATEMENT = 'SwitchStatement';
const BLOCK_STATEMENT = 'BlockStatement';
const FUNCTION_EXPRESSION = 'FunctionExpression';
const ARROW_FUNCTION_EXPRESSION = 'ArrowFunctionExpression';
const FUNCTION_DECLARATION = 'FunctionDeclaration';
const TRY_STATEMENT = 'TryStatement';

const LOOP_STATEMENTS = ['WhileStatement', 'DoWhileStatement', 'ForStatement', 'ForInStatement', 'ForOfStatement'];

const STATEMENTS_WITH_CHILDREN = [
  LOOP,
  SWITCH_STATEMENT,
  IF_STATEMENT,
  BLOCK_STATEMENT,
  TRY_STATEMENT
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
  'WithStatement',
  'ThrowStatement',
  EXPRESSION_STATEMENT
];

const ENTRY_POINTS = [FUNCTION_DECLARATION, ARROW_FUNCTION_EXPRESSION, FUNCTION_EXPRESSION];

/* eslint-disable sort-keys */
const lookupTable = {
  [RETURN_STATEMENT]: {
    is: (node) => {
      return node.type === RETURN_STATEMENT;
    },
    check: (node) => {
      if (!lookupTable[RETURN_STATEMENT].is(node)) {
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
  [IF_STATEMENT]: {
    is: (node) => {
      return node.type === IF_STATEMENT;
    },
    check: (node) => {
      if (!lookupTable[IF_STATEMENT].is(node)) {
        return false;
      }

      if (lookupTable[DEFAULT].check(node.consequent)) {
        return true;
      }

      if (node.alternate && lookupTable[DEFAULT].check(node.alternate)) {
        return true;
      }

      return false;
    }
  },
  [LOOP]: {
    is: (node) => {
      return LOOP_STATEMENTS.indexOf(node.type) !== -1;
    },
    check: (node) => {
      lookupTable[DEFAULT].check(node.body);
    }
  },
  [SWITCH_STATEMENT]: {
    is: (node) => {
      return node.type === SWITCH_STATEMENT;
    },
    check: (node) => {
      for (const item of node.cases) {
        for (const statement of item.consequent) {
          if (lookupTable[DEFAULT].check(statement)) {
            return true;
          }
        }
      }

      return false;
    }
  },
  [TRY_STATEMENT]: {
    is: (node) => {
      return node.type === TRY_STATEMENT;
    },
    check: (node) => {
      if (!lookupTable[TRY_STATEMENT].is(node)) {
        return false;
      }

      if (lookupTable[BLOCK_STATEMENT].check(node.block)) {
        return true;
      }

      if (node.handler && node.handler.block) {
        if (lookupTable[DEFAULT].check(node)) {
          return true;
        }
      }

      if (lookupTable[BLOCK_STATEMENT].check(node.finalizer)) {
        return true;
      }

      return false;
    }
  },
  [BLOCK_STATEMENT]: {
    is: (node) => {
      return node.type === BLOCK_STATEMENT;
    },
    check: (node, context) => {
      // E.g. the catch block statement is optional.
      if (typeof node === 'undefined' || node === null) {
        return false;
      }

      if (!lookupTable[BLOCK_STATEMENT].is(node)) {
        return false;
      }

      for (const item of node.body) {
        if (lookupTable[DEFAULT].check(item, context)) {
          return true;
        }
      }

      return false;
    }
  },
  [FUNCTION_EXPRESSION]: {
    is: (node) => {
      return node.type === FUNCTION_EXPRESSION;
    },
    check: (node, context) => {
      return lookupTable[BLOCK_STATEMENT].check(node.body, context);
    }
  },
  [ARROW_FUNCTION_EXPRESSION]: {
    is: (node) => {
      return node.type === ARROW_FUNCTION_EXPRESSION;
    },
    check: (node) => {
      // An expression has always a return value.
      return node.expression;
    }
  },
  [FUNCTION_DECLARATION]: {
    is: (node) => {
      return node.type === FUNCTION_DECLARATION;
    },
    check: (node, context) => {
      return lookupTable[BLOCK_STATEMENT].check(node.body, context);
    }
  },
  [DEFAULT]: {
    check: (node) => {
      // In case it is a ReturnStatement we found what we were looking for
      if (lookupTable[RETURN_STATEMENT].is(node)) {
        return lookupTable[RETURN_STATEMENT].check(node);
      }

      // In case the element has children we need to traverse the them.
      // Examples are BlockStatement, Choices, TryStatement, Loops, ...
      for (const item of STATEMENTS_WITH_CHILDREN) {
        if (lookupTable[item].is(node)) {
          return lookupTable[item].check(node);
        }
      }

      // Everything else can not return anything.
      if (RETURNFREE_STATEMENTS.indexOf(node.type) !== -1) {
        return false;
      }

      // If we endup here we stumbled upon an unknown elements
      // Most likely it is enough to add it to the blacklist.
      //
      // throw new Error('Unknown node type: ' + node.type);
      return false;
    }
  }
};

/**
 * Checks if the source code returns a retrun value.
 * It traverse the parsed source code an retruns as
 * soon as it stumbles upon the first return statement.
 *
 * @param {Object} node
 *   the node which should be checked.
 * @returns {boolean}
 *   true in case the code returns a return value
 */
const hasReturnValue = (node) => {
  // Loop through all of our entry points
  for (const item of ENTRY_POINTS) {
    if (lookupTable[item].is(node)) {
      return lookupTable[item].check(node);
    }
  }

  throw new Error('Unknown element ' + node.type);
};

/**
 * Checks if the JSDoc comment declares a return value.
 *
 * @param {JsDocTag} tag
 *   the tag which should be checked.
 * @returns {boolean}
 *   true in case a return value is declared otherwise false.
 */
const hasReturnTag = (tag) => {
  // The function should not return in case not @retruns is defined...
  if (typeof tag === 'undefined' || tag === null) {
    return false;
  }

  // .. same applies if it declares '@returns undefined' or '@returns void'
  if (tag.type === 'undefined' || tag.type === 'void') {
    return false;
  }

  // in any other it has to return something and
  // we have to find a return statement
  return true;
};

const getTags = (jsdoc, tagName) => {
  if (!jsdoc.tags) {
    return [];
  }

  return jsdoc.tags.filter((item) => {
    return item.tag === tagName;
  });
};

/**
 * We can skip checking for a return value, in case the documentation is inherited
 * or the method is either a constructor or an abstract method.
 *
 * In either of these cases the return value is optional or not defined.
 *
 * @param {*} utils
 *   a reference to the utils which are used to probe if a tag is present or not.
 * @returns {boolean}
 *   true in case deep checking can be skipped otherwise false.
 */
const canSkip = (utils) => {
  // Inheritdoc implies all documentation is inherited (see http://usejsdoc.org/tags-inheritdoc.html)
  // same applies to the override tag (http://usejsdoc.org/tags-override.html)
  //
  // But as we do not know the parent method, we cannot perform any checks.
  // So we bail out there instead of returning false positives.
  if (utils.hasTag('inheritdoc') || utils.hasTag('override')) {
    return true;
  }

  // Different Tag similar story. Abstract methods are by definition in complete.
  // So it is not an error if it declares a return value but does not implement it.
  if (utils.hasTag('abstract') || utils.hasTag('virtual')) {
    return true;
  }

  // Constructors do not have a return value by definition (http://usejsdoc.org/tags-class.html)
  // So we can bail out here, too.
  if (utils.hasTag('class') || utils.hasTag('constructor')) {
    return true;
  }

  return false;
};

export default iterateJsdoc(({
  jsdoc,
  report,
  functionNode,
  utils,
  context
}) => {
  // A preflight check. We do not need to run a deep check
  // in case the @retruns comment is optional or undefined.
  if (canSkip(utils)) {
    return;
  }

  const tagName = utils.getPreferredTagName('returns');
  const tags = getTags(jsdoc, tagName);

  if (tags.length > 1) {
    report('Found more than one  @' + tagName + ' declaration.');
  }

  // In case a return value is decleared in JSDoc we also expect one in the code.
  if (hasReturnTag(tags[0], functionNode) && !hasReturnValue(functionNode, context)) {
    report('Unexpected JSDoc @' + tagName + ' declaration.');
  }

  // In case the code retuns something we expect a return value in JSDoc.
  if (!hasReturnTag(tags[0], functionNode) && hasReturnValue(functionNode, context)) {
    report('Missing JSDoc @' + tagName + ' declaration.');
  }
});
