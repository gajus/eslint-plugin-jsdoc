import debugModule from 'debug';

const debug = debugModule('requireExportJsdoc');

const createNode = function () {
  return {
    props: {}
  };
};

const getSymbolValue = function (symbol) {
  if (!symbol) {
    return null;
  }
  if (symbol.type === 'literal') {
    return symbol.value.value;
  }

  return null;
};

const getIdentifier = function (node, globals, scope, opts) {
  if (opts.simpleIdentifier) {
    // Type is Identier for noncomputed properties
    const identifierLiteral = createNode();
    identifierLiteral.type = 'literal';
    identifierLiteral.value = {value: node.name};

    return identifierLiteral;
  }

  const block = scope || globals;

  // As scopes are not currently supported, they are not traversed upwards recursively
  if (block.props[node.name]) {
    return block.props[node.name];
  }
  if (globals.props[node.name]) {
    return globals.props[node.name];
  }

  return null;
};

let createSymbol = null;
const getSymbol = function (node, globals, scope, opt) {
  const opts = opt || {};
  let block = scope;
  if (node.type === 'Identifier') {
    return getIdentifier(node, globals, scope, opts);
  } else if (node.type === 'MemberExpression') {
    const obj = getSymbol(node.object, globals, scope, opts);
    const propertySymbol = getSymbol(node.property, globals, scope, {simpleIdentifier: !node.computed});
    const propertyValue = getSymbolValue(propertySymbol);

    if (obj && propertyValue && obj.props[propertyValue]) {
      block = obj.props[propertyValue];

      return block;
    } else if (opts.createMissingProps && propertyValue) {
      obj.props[propertyValue] = createNode();

      return obj.props[propertyValue];
    } else {
      debug('MemberExpression: Missing property ' + node.property.name);

      return null;
    }
  } else if (node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration' || node.type === 'ArrowFunctionExpression') {
    const val = createNode();
    val.props.prototype = createNode();
    val.props.prototype.type = 'object';
    val.type = 'object';
    val.value = node;

    return val;
  } else if (node.type === 'AssignmentExpression') {
    return createSymbol(node.left, globals, node.right, scope, opts);
  } else if (node.type === 'ClassBody') {
    const val = createNode();
    node.body.forEach((method) => {
      val.props[method.key.name] = createNode();
      val.props[method.key.name].type = 'object';
      val.props[method.key.name].value = method.value;
    });
    val.type = 'object';
    val.value = node;

    return val;
  } else if (node.type === 'ObjectExpression') {
    const val = createNode();
    val.type = 'object';
    node.properties.forEach((prop) => {
      const propVal = getSymbol(prop.value, globals, scope, opts);
      if (propVal) {
        val.props[prop.key.name] = propVal;
      }
    });

    return val;
  } else if (node.type === 'Literal') {
    const val = createNode();
    val.type = 'literal';
    val.value = node;

    return val;
  }

  return null;
};

createSymbol = function (node, globals, value, scope) {
  const block = scope || globals;
  let symbol;
  if (node.type === 'Identifier') {
    if (value) {
      const valueSymbol = getSymbol(value, globals, block);
      if (valueSymbol) {
        block.props[node.name] = valueSymbol;

        return block.props[node.name];
      } else {
        debug('Identifier: Missing value symbol for %s', node.name);
      }
    } else {
      block.props[node.name] = createNode();

      return block.props[node.name];
    }
  } else if (node.type === 'MemberExpression') {
    symbol = getSymbol(node.object, globals, block);

    const propertySymbol = getSymbol(node.property, globals, block, {simpleIdentifier: !node.computed});
    const propertyValue = getSymbolValue(propertySymbol);
    if (symbol && propertyValue) {
      symbol.props[propertyValue] = getSymbol(value, globals, block);

      return symbol.props[propertyValue];
    } else {
      debug('MemberExpression: Missing symbol: %s', node.property.name);
    }
  } else if (node.type === 'FunctionDeclaration') {
    if (node.id.type === 'Identifier') {
      return createSymbol(node.id, globals, node, globals);
    }
  }

  return null;
};

// Creates variables from variable definitions
const initVariables = function (node, globals) {
  if (node.type === 'Program') {
    node.body.forEach((childNode) => {
      initVariables(childNode, globals);
    });
  } else if (node.type === 'ExpressionStatement') {
    initVariables(node.expression, globals);
  } else if (node.type === 'VariableDeclaration') {
    node.declarations.forEach((declaration) => {
      // let and const
      const symbol = createSymbol(declaration.id, globals, null, globals);
      if (node.kind === 'var' && globals.props.window) {
        // If var, also add to window
        globals.props.window.props[declaration.id.name] = symbol;
      }
    });
  }
};

// Populates variable maps using AST
const mapVariables = function (node, globals) {
  if (node.type === 'Program') {
    node.body.forEach((childNode) => {
      mapVariables(childNode, globals);
    });
  } else if (node.type === 'ExpressionStatement') {
    mapVariables(node.expression, globals);
  } else if (node.type === 'AssignmentExpression') {
    createSymbol(node.left, globals, node.right);
  } else if (node.type === 'VariableDeclaration') {
    node.declarations.forEach((declaration) => {
      createSymbol(declaration.id, globals, declaration.init);
    });
  } else if (node.type === 'FunctionDeclaration') {
    if (node.id.type === 'Identifier') {
      createSymbol(node.id, globals, node, globals);
    }
  } else if (node.type === 'ExportDefaultDeclaration') {
    const symbol = createSymbol(node.declaration, globals, node.declaration);
    symbol.exported = true;
  } else if (node.type === 'ExportNamedDeclaration') {
    if (node.declaration) {
      const symbol = createSymbol(node.declaration, globals, node.declaration);
      symbol.exported = true;
    }
    node.specifiers.forEach((specifier) => {
      mapVariables(specifier, globals);
    });
  } else if (node.type === 'ExportSpecifier') {
    const symbol = getSymbol(node.local, globals, globals);
    symbol.exported = true;
  } else if (node.type === 'ClassDeclaration') {
    createSymbol(node.id, globals, node.body, globals);
  }
};

const findNode = function (node, block, cache) {
  let blockCache = cache || [];
  if (blockCache.includes(block)) {
    return false;
  }
  blockCache = blockCache.slice();
  blockCache.push(block);

  if (block.type === 'object') {
    if (block.value === node) {
      return true;
    }
  }
  for (const prop in block.props) {
    if (Object.prototype.hasOwnProperty.call(block.props, prop)) {
      const propval = block.props[prop];

      // Only check node if it had resolvable value
      if (propval && findNode(node, propval, blockCache)) {
        return true;
      }
    }
  }

  return false;
};

const findExportedNode = function (block, node, cache) {
  const blockCache = cache || [];
  for (const key in block.props) {
    if (Object.prototype.hasOwnProperty.call(block.props, key)) {
      blockCache.push(block.props[key]);
      if (block.props[key].exported) {
        if (findNode(node, block)) {
          return true;
        }
      }
      if (!blockCache.includes(block.props[key]) && findExportedNode(block.props[key], node, blockCache)) {
        return true;
      }
    }
  }

  return false;
};

const isNodeExported = function (node, globals, opt) {
  if (opt.initModuleExports && globals.props.module && globals.props.module.props.exports) {
    if (findNode(node, globals.props.module.props.exports)) {
      return true;
    }
  }

  if (opt.exports && findExportedNode(globals, node)) {
    return true;
  }

  return false;
};

const parse = function (ast, opt) {
  const opts = opt || {
    exports: true,
    initModuleExports: true,
    initWindow: true
  };
  const globalVars = createNode();
  if (opts.initModuleExports) {
    globalVars.props.module = createNode();
    globalVars.props.module.props.exports = createNode();
    globalVars.props.exports = globalVars.props.module.props.exports;
  }
  if (opts.initWindow) {
    globalVars.props.window = globalVars;
  }
  initVariables(ast, globalVars);
  mapVariables(ast, globalVars);

  return {
    globalVars
  };
};

const isExported = function (node, parseResult, opt) {
  return isNodeExported(node, parseResult.globalVars, opt);
};

export default {
  isExported,
  parse
};
