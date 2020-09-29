import debugModule from 'debug';

const debug = debugModule('requireExportJsdoc');

const createNode = function () {
  return {
    props: {},
  };
};

const getSymbolValue = function (symbol) {
  /* istanbul ignore next */
  if (!symbol) {
    /* istanbul ignore next */
    return null;
  }
  /* istanbul ignore next */
  if (symbol.type === 'literal') {
    return symbol.value.value;
  }

  /* istanbul ignore next */
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

  /* istanbul ignore next */
  const block = scope || globals;

  // As scopes are not currently supported, they are not traversed upwards recursively
  if (block.props[node.name]) {
    return block.props[node.name];
  }

  // Seems this will only be entered once scopes added and entered
  /* istanbul ignore next */
  if (globals.props[node.name]) {
    return globals.props[node.name];
  }

  return null;
};

let createSymbol = null;
const getSymbol = function (node, globals, scope, opt) {
  const opts = opt || {};
  switch (node.type) {
  case 'Identifier': {
    return getIdentifier(node, globals, scope, opts);
  } case 'MemberExpression': {
    const obj = getSymbol(node.object, globals, scope, opts);
    const propertySymbol = getSymbol(node.property, globals, scope, {simpleIdentifier: !node.computed});
    const propertyValue = getSymbolValue(propertySymbol);

    /* istanbul ignore next */
    if (obj && propertyValue && obj.props[propertyValue]) {
      const block = obj.props[propertyValue];

      return block;
    }

    /*
    if (opts.createMissingProps && propertyValue) {
      obj.props[propertyValue] = createNode();

      return obj.props[propertyValue];
    }
    */
    /* istanbul ignore next */
    debug(`MemberExpression: Missing property ${node.property.name}`);

    /* istanbul ignore next */
    return null;
  }
  case 'TSTypeAliasDeclaration':
  case 'TSEnumDeclaration': case 'TSInterfaceDeclaration':
  case 'ClassDeclaration': case 'ClassExpression':
  case 'FunctionExpression': case 'FunctionDeclaration':
  case 'ArrowFunctionExpression': {
    const val = createNode();
    val.props.prototype = createNode();
    val.props.prototype.type = 'object';
    val.type = 'object';
    val.value = node;

    return val;
  } case 'AssignmentExpression': {
    return createSymbol(node.left, globals, node.right, scope, opts);
  } case 'ClassBody': {
    const val = createNode();
    node.body.forEach((method) => {
      val.props[method.key.name] = createNode();
      val.props[method.key.name].type = 'object';
      val.props[method.key.name].value = method.value;
    });
    val.type = 'object';
    val.value = node;

    return val;
  } case 'ObjectExpression': {
    const val = createNode();
    val.type = 'object';
    node.properties.forEach((prop) => {
      if ([
        // @typescript-eslint/parser, espree, acorn, etc.
        'SpreadElement',

        // babel-eslint
        'ExperimentalSpreadProperty',
      ].includes(prop.type)) {
        return;
      }
      const propVal = getSymbol(prop.value, globals, scope, opts);
      /* istanbul ignore next */
      if (propVal) {
        val.props[prop.key.name] = propVal;
      }
    });

    return val;
  } case 'Literal': {
    const val = createNode();
    val.type = 'literal';
    val.value = node;

    return val;
  }
  }

  /* istanbul ignore next */
  return null;
};

const createBlockSymbol = function (block, name, value, globals, isGlobal) {
  block.props[name] = value;
  if (isGlobal && globals.props.window && globals.props.window.special) {
    globals.props.window.props[name] = value;
  }
};

createSymbol = function (node, globals, value, scope, isGlobal) {
  const block = scope || globals;
  let symbol;
  switch (node.type) {
  case 'TSEnumDeclaration':
  case 'FunctionDeclaration':
  case 'TSInterfaceDeclaration':
  case 'TSTypeAliasDeclaration':

    // Fallthrough
  case 'ClassDeclaration': {
    if (node.id && node.id.type === 'Identifier') {
      return createSymbol(node.id, globals, node, globals);
    }
    break;
  } case 'Identifier': {
    if (value) {
      const valueSymbol = getSymbol(value, globals, block);
      /* istanbul ignore next */
      if (valueSymbol) {
        createBlockSymbol(block, node.name, valueSymbol, globals, isGlobal);

        return block.props[node.name];
      }
      /* istanbul ignore next */
      debug('Identifier: Missing value symbol for %s', node.name);
    } else {
      createBlockSymbol(block, node.name, createNode(), globals, isGlobal);

      return block.props[node.name];
    }
    /* istanbul ignore next */
    break;
  } case 'MemberExpression': {
    symbol = getSymbol(node.object, globals, block);

    const propertySymbol = getSymbol(node.property, globals, block, {simpleIdentifier: !node.computed});
    const propertyValue = getSymbolValue(propertySymbol);
    if (symbol && propertyValue) {
      createBlockSymbol(symbol, propertyValue, getSymbol(value, globals, block), globals, isGlobal);

      return symbol.props[propertyValue];
    }
    /* istanbul ignore next */
    debug('MemberExpression: Missing symbol: %s', node.property.name);
    break;
  }
  }

  return null;
};

// Creates variables from variable definitions
const initVariables = function (node, globals, opts) {
  switch (node.type) {
  case 'Program': {
    node.body.forEach((childNode) => {
      initVariables(childNode, globals, opts);
    });
    break;
  } case 'ExpressionStatement': {
    initVariables(node.expression, globals, opts);
    break;
  } case 'VariableDeclaration': {
    node.declarations.forEach((declaration) => {
      // let and const
      const symbol = createSymbol(declaration.id, globals, null, globals);
      if (opts.initWindow && node.kind === 'var' && globals.props.window) {
        // If var, also add to window
        globals.props.window.props[declaration.id.name] = symbol;
      }
    });
    break;
  } case 'ExportNamedDeclaration': {
    if (node.declaration) {
      initVariables(node.declaration, globals, opts);
    }
    break;
  }
  }
};

// Populates variable maps using AST
const mapVariables = function (node, globals, opt, isExport) {
  /* istanbul ignore next */
  const opts = opt || {};
  /* istanbul ignore next */
  switch (node.type) {
  case 'Program': {
    if (opts.ancestorsOnly) {
      return false;
    }
    node.body.forEach((childNode) => {
      mapVariables(childNode, globals, opts);
    });
    break;
  } case 'ExpressionStatement': {
    mapVariables(node.expression, globals, opts);
    break;
  } case 'AssignmentExpression': {
    createSymbol(node.left, globals, node.right);
    break;
  } case 'VariableDeclaration': {
    node.declarations.forEach((declaration) => {
      const isGlobal = opts.initWindow && node.kind === 'var' && globals.props.window;
      const symbol = createSymbol(declaration.id, globals, declaration.init, globals, isGlobal);
      if (symbol && isExport) {
        symbol.exported = true;
      }
    });
    break;
  } case 'FunctionDeclaration': {
    /* istanbul ignore next */
    if (node.id.type === 'Identifier') {
      createSymbol(node.id, globals, node, globals, true);
    }
    break;
  } case 'ExportDefaultDeclaration': {
    const symbol = createSymbol(node.declaration, globals, node.declaration);
    if (symbol) {
      symbol.exported = true;
    } else if (!node.id) {
      globals.ANONYMOUS_DEFAULT = node.declaration;
    }
    break;
  } case 'ExportNamedDeclaration': {
    if (node.declaration) {
      if (node.declaration.type === 'VariableDeclaration') {
        mapVariables(node.declaration, globals, opts, true);
      } else {
        const symbol = createSymbol(node.declaration, globals, node.declaration);
        /* istanbul ignore next */
        if (symbol) {
          symbol.exported = true;
        }
      }
    }
    node.specifiers.forEach((specifier) => {
      mapVariables(specifier, globals, opts);
    });
    break;
  } case 'ExportSpecifier': {
    const symbol = getSymbol(node.local, globals, globals);
    /* istanbul ignore next */
    if (symbol) {
      symbol.exported = true;
    }
    break;
  } case 'ClassDeclaration': {
    createSymbol(node.id, globals, node.body, globals);
    break;
  } default: {
    /* istanbul ignore next */
    return false;
  }
  }

  return true;
};

const findNode = function (node, block, cache) {
  let blockCache = cache || [];
  /* istanbul ignore next */
  if (!block || blockCache.includes(block)) {
    return false;
  }
  blockCache = blockCache.slice();
  blockCache.push(block);

  if (block.type === 'object' || block.type === 'MethodDefinition') {
    if (block.value === node) {
      return true;
    }
  }

  const {props = block.body} = block;
  for (const propval of Object.values(props || {})) {
    if (Array.isArray(propval)) {
      if (propval.some((val) => {
        return findNode(node, val, blockCache);
      })) {
        return true;
      }
    } else if (findNode(node, propval, blockCache)) {
      return true;
    }
  }

  return false;
};

const findExportedNode = function (block, node, cache) {
  if (block.ANONYMOUS_DEFAULT === node) {
    return true;
  }
  /* istanbul ignore next */
  if (block === null) {
    return false;
  }
  const blockCache = cache || [];
  const {props} = block;
  for (const propval of Object.values(props)) {
    blockCache.push(propval);
    if (propval.exported) {
      if (node === propval.value || findNode(node, propval.value)) {
        return true;
      }
    }

    // No need to check `propval` for exported nodes as ESM
    //  exports are only global
  }

  return false;
};

const isNodeExported = function (node, globals, opt) {
  if (opt.initModuleExports && globals.props.module && globals.props.module.props.exports) {
    if (findNode(node, globals.props.module.props.exports)) {
      return true;
    }
  }

  if (opt.initWindow && globals.props.window) {
    if (findNode(node, globals.props.window)) {
      return true;
    }
  }

  if (opt.esm && findExportedNode(globals, node)) {
    return true;
  }

  return false;
};

const parseRecursive = function (node, globalVars, opts) {
  // Iterate from top using recursion - stop at first processed node from top
  if (node.parent) {
    if (parseRecursive(node.parent, globalVars, opts)) {
      return true;
    }
  }

  return mapVariables(node, globalVars, opts);
};

const parse = function (ast, node, opt) {
  /* istanbul ignore next */
  const opts = opt || {
    ancestorsOnly: false,
    esm: true,
    initModuleExports: true,
    initWindow: true,
  };

  const globalVars = createNode();
  if (opts.initModuleExports) {
    globalVars.props.module = createNode();
    globalVars.props.module.props.exports = createNode();
    globalVars.props.exports = globalVars.props.module.props.exports;
  }
  if (opts.initWindow) {
    globalVars.props.window = createNode();
    globalVars.props.window.special = true;
  }

  if (opts.ancestorsOnly) {
    parseRecursive(node, globalVars, opts);
  } else {
    initVariables(ast, globalVars, opts);
    mapVariables(ast, globalVars, opts);
  }

  return {
    globalVars,
  };
};

const isExported = function (node, parseResult, opt) {
  return isNodeExported(node, parseResult.globalVars, opt);
};

export default {
  isExported,
  parse,
};
