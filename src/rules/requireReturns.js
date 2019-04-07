import iterateJsdoc from '../iterateJsdoc';

const LOOP_STATEMENTS = ['WhileStatement', 'DoWhileStatement', 'ForStatement', 'ForInStatement', 'ForOfStatement'];

const STATEMENTS_WITH_CHILDREN = [
  '@loop',
  'SwitchStatement',
  'IfStatement',
  'BlockStatement',
  'TryStatement'
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
  'ExpressionStatement'
];

const ENTRY_POINTS = ['FunctionDeclaration', 'ArrowFunctionExpression', 'FunctionExpression'];

/* eslint-disable sort-keys */
const lookupTable = {
  ReturnStatement: {
    is (node) {
      return node.type === 'ReturnStatement';
    },
    check (node) {
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
  IfStatement: {
    is (node) {
      return node.type === 'IfStatement';
    },
    check (node) {
      if (!lookupTable.IfStatement.is(node)) {
        return false;
      }

      if (lookupTable['@default'].check(node.consequent)) {
        return true;
      }

      if (node.alternate && lookupTable['@default'].check(node.alternate)) {
        return true;
      }

      return false;
    }
  },
  '@loop': {
    is (node) {
      return LOOP_STATEMENTS.indexOf(node.type) !== -1;
    },
    check (node) {
      return lookupTable['@default'].check(node.body);
    }
  },
  SwitchStatement: {
    is (node) {
      return node.type === 'SwitchStatement';
    },
    check (node) {
      for (const item of node.cases) {
        for (const statement of item.consequent) {
          if (lookupTable['@default'].check(statement)) {
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
    check (node) {
      if (!lookupTable.TryStatement.is(node)) {
        return false;
      }

      if (lookupTable.BlockStatement.check(node.block)) {
        return true;
      }

      if (node.handler && node.handler.block) {
        if (lookupTable['@default'].check(node)) {
          return true;
        }
      }

      if (lookupTable.BlockStatement.check(node.finalizer)) {
        return true;
      }

      return false;
    }
  },
  BlockStatement: {
    is (node) {
      return node.type === 'BlockStatement';
    },
    check (node, context) {
      // E.g. the catch block statement is optional.
      if (typeof node === 'undefined' || node === null) {
        return false;
      }

      if (!lookupTable.BlockStatement.is(node)) {
        return false;
      }

      for (const item of node.body) {
        if (lookupTable['@default'].check(item, context)) {
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
    check (node, context) {
      return lookupTable.BlockStatement.check(node.body, context);
    }
  },
  ArrowFunctionExpression: {
    is (node) {
      return node.type === 'ArrowFunctionExpression';
    },
    check (node, context) {
      // An expression always has a return value.
      return node.expression ||
        lookupTable.BlockStatement.check(node.body, context);
    }
  },
  FunctionDeclaration: {
    is (node) {
      return node.type === 'FunctionDeclaration';
    },
    check (node, context) {
      return lookupTable.BlockStatement.check(node.body, context);
    }
  },
  '@default': {
    check (node, context) {
      // In case it is a `ReturnStatement`, we found what we were looking for
      if (lookupTable.ReturnStatement.is(node)) {
        return lookupTable.ReturnStatement.check(node, context);
      }

      // In case the element has children, we need to traverse them.
      // Examples are BlockStatement, Choices, TryStatement, Loops, ...
      for (const item of STATEMENTS_WITH_CHILDREN) {
        if (lookupTable[item].is(node)) {
          return lookupTable[item].check(node, context);
        }
      }

      // Everything else cannot return anything.
      if (RETURNFREE_STATEMENTS.indexOf(node.type) !== -1) {
        return false;
      }

      // If we end up here, we stumbled upon an unknown elements
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
 * @param {Object} node
 *   the node which should be checked.
 * @returns {boolean}
 *   true in case the code returns a return value
 */
const hasReturnValue = (node, context) => {
  // Loop through all of our entry points
  for (const item of ENTRY_POINTS) {
    if (lookupTable[item].is(node)) {
      return lookupTable[item].check(node, context);
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
 *   true in case a return value is declared; otherwise false.
 */
const hasReturnTag = (tag) => {
  // The function should not continue in the event @returns is not defined...
  if (typeof tag === 'undefined' || tag === null) {
    return false;
  }

  // .. same applies if it declares `@returns {undefined}` or `@returns {void}`
  if (tag.type === 'undefined' || tag.type === 'void') {
    return false;
  }

  // In any other case, something must be returned, and
  // a return statement is expected
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
 *   true in case deep checking can be skipped; otherwise false.
 */
const canSkip = (utils) => {
  if (utils.hasATag([
    // inheritdoc implies that all documentation is inherited
    // see http://usejsdoc.org/tags-inheritdoc.html
    //
    // As we do not know the parent method, we cannot perform any checks.
    'inheritdoc',
    'override',

    // Different Tag similar story. Abstract methods are by definition incomplete,
    // so it is not an error if it declares a return value but does not implement it.
    'abstract',
    'virtual',

    // Constructors do not have a return value by definition (http://usejsdoc.org/tags-class.html)
    // So we can bail out here, too.
    'class',
    'constructor'
  ])) {
    return true;
  }

  if (utils.isConstructor()) {
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
  // in case the @returns comment is optional or undefined.
  if (canSkip(utils)) {
    return;
  }

  const tagName = utils.getPreferredTagName('returns');
  const tags = getTags(jsdoc, tagName);

  if (tags.length > 1) {
    report('Found more than one  @' + tagName + ' declaration.');
  }

  // In case a return value is declared in JSDoc we also expect one in the code.
  if (hasReturnTag(tags[0], functionNode) && !hasReturnValue(functionNode, context)) {
    report('Unexpected JSDoc @' + tagName + ' declaration.');
  }

  // In case the code returns something, we expect a return value in JSDoc.
  if (!hasReturnTag(tags[0], functionNode) && (
    utils.isForceRequireReturn() || hasReturnValue(functionNode, context)
  )) {
    report('Missing JSDoc @' + tagName + ' declaration.');
  }
});
