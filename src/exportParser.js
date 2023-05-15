import {
  findJSDocComment,
} from '@es-joy/jsdoccomment';
import debugModule from 'debug';

const debug = debugModule('requireExportJsdoc');

/**
 * @returns {{
 *   props: object
 * }}
 */
const createNode = function () {
  return {
    props: {},
  };
};

/**
 * @param {} symbol
 * @returns {null}
 */
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

/**
 *
 * @param {} node
 * @param {} globals
 * @param {} scope
 * @param {} opts
 * @returns {}
 */
const getIdentifier = function (node, globals, scope, opts) {
  if (opts.simpleIdentifier) {
    // Type is Identier for noncomputed properties
    const identifierLiteral = createNode();
    identifierLiteral.type = 'literal';
    identifierLiteral.value = {
      value: node.name,
    };

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

/* eslint-disable complexity -- Temporary */

/**
 *
 * @param {} node
 * @param {} globals
 * @param {} scope
 * @param {} opt
 * @returns {}
 */
const getSymbol = function (node, globals, scope, opt) {
  /* eslint-enable complexity -- Temporary */
  const opts = opt || {};
  /* istanbul ignore next */
  // eslint-disable-next-line default-case
  switch (node.type) {
  case 'Identifier': {
    return getIdentifier(node, globals, scope, opts);
  }

  case 'MemberExpression': {
    const obj = getSymbol(node.object, globals, scope, opts);
    const propertySymbol = getSymbol(node.property, globals, scope, {
      simpleIdentifier: !node.computed,
    });
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

  case 'ClassExpression': {
    return getSymbol(node.body, globals, scope, opts);
  }

  case 'TSTypeAliasDeclaration':
  case 'TSEnumDeclaration': case 'TSInterfaceDeclaration':
  case 'ClassDeclaration':
  case 'FunctionExpression': case 'FunctionDeclaration':
  case 'ArrowFunctionExpression': {
    const val = createNode();
    val.props.prototype = createNode();
    val.props.prototype.type = 'object';
    val.type = 'object';
    val.value = node;

    return val;
  }

  case 'AssignmentExpression': {
    return createSymbol(node.left, globals, node.right, scope, opts);
  }

  case 'ClassBody': {
    const val = createNode();
    for (const method of node.body) {
      val.props[method.key.name] = createNode();
      val.props[method.key.name].type = 'object';
      val.props[method.key.name].value = method.value;
    }

    val.type = 'object';
    val.value = node.parent;

    return val;
  }

  case 'ObjectExpression': {
    const val = createNode();
    val.type = 'object';
    for (const prop of node.properties) {
      if ([
        // @typescript-eslint/parser, espree, acorn, etc.
        'SpreadElement',

        // @babel/eslint-parser
        'ExperimentalSpreadProperty',
      ].includes(prop.type)) {
        continue;
      }

      const propVal = getSymbol(prop.value, globals, scope, opts);
      /* istanbul ignore next */
      if (propVal) {
        val.props[prop.key.name] = propVal;
      }
    }

    return val;
  }

  case 'Literal': {
    const val = createNode();
    val.type = 'literal';
    val.value = node;

    return val;
  }
  }

  /* istanbul ignore next */
  return null;
};

/**
 *
 * @param {} block
 * @param {} name
 * @param {} value
 * @param {} globals
 * @param {} isGlobal
 * @returns {void}
 */
const createBlockSymbol = function (block, name, value, globals, isGlobal) {
  block.props[name] = value;
  if (isGlobal && globals.props.window && globals.props.window.special) {
    globals.props.window.props[name] = value;
  }
};

/**
 *
 * @param {} node
 * @param {} globals
 * @param {} value
 * @param {} scope
 * @param {} isGlobal
 * @returns {null}
 */
createSymbol = function (node, globals, value, scope, isGlobal) {
  const block = scope || globals;
  let symbol;
  // eslint-disable-next-line default-case
  switch (node.type) {
  case 'FunctionDeclaration':
  /* istanbul ignore next */
  // Fall through
  case 'TSEnumDeclaration': case 'TSInterfaceDeclaration':
  /* istanbul ignore next */
  // Fall through
  case 'TSTypeAliasDeclaration': case 'ClassDeclaration': {
    /* istanbul ignore next */
    if (node.id && node.id.type === 'Identifier') {
      return createSymbol(node.id, globals, node, globals);
    }

    /* istanbul ignore next */
    break;
  }

  case 'Identifier': {
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
  }

  case 'MemberExpression': {
    symbol = getSymbol(node.object, globals, block);

    const propertySymbol = getSymbol(node.property, globals, block, {
      simpleIdentifier: !node.computed,
    });
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

/**
 * Creates variables from variable definitions
 *
 * @param {} node
 * @param {} globals
 * @param {} opts
 * @returns {}
 */
const initVariables = function (node, globals, opts) {
  // eslint-disable-next-line default-case
  switch (node.type) {
  case 'Program': {
    for (const childNode of node.body) {
      initVariables(childNode, globals, opts);
    }

    break;
  }

  case 'ExpressionStatement': {
    initVariables(node.expression, globals, opts);
    break;
  }

  case 'VariableDeclaration': {
    for (const declaration of node.declarations) {
      // let and const
      const symbol = createSymbol(declaration.id, globals, null, globals);
      if (opts.initWindow && node.kind === 'var' && globals.props.window) {
        // If var, also add to window
        globals.props.window.props[declaration.id.name] = symbol;
      }
    }

    break;
  }

  case 'ExportNamedDeclaration': {
    if (node.declaration) {
      initVariables(node.declaration, globals, opts);
    }

    break;
  }
  }
};

/* eslint-disable complexity -- Temporary */

/**
 * Populates variable maps using AST
 *
 * @param {} node
 * @param {} globals
 * @param {} opt
 * @param {} isExport
 * @returns {boolean}
 */
const mapVariables = function (node, globals, opt, isExport) {
  /* eslint-enable complexity -- Temporary */
  /* istanbul ignore next */
  const opts = opt || {};
  /* istanbul ignore next */
  switch (node.type) {
  case 'Program': {
    if (opts.ancestorsOnly) {
      return false;
    }

    for (const childNode of node.body) {
      mapVariables(childNode, globals, opts);
    }

    break;
  }

  case 'ExpressionStatement': {
    mapVariables(node.expression, globals, opts);
    break;
  }

  case 'AssignmentExpression': {
    createSymbol(node.left, globals, node.right);
    break;
  }

  case 'VariableDeclaration': {
    for (const declaration of node.declarations) {
      const isGlobal = opts.initWindow && node.kind === 'var' && globals.props.window;
      const symbol = createSymbol(declaration.id, globals, declaration.init, globals, isGlobal);
      if (symbol && isExport) {
        symbol.exported = true;
      }
    }

    break;
  }

  case 'FunctionDeclaration': {
    /* istanbul ignore next */
    if (node.id.type === 'Identifier') {
      createSymbol(node.id, globals, node, globals, true);
    }

    break;
  }

  case 'ExportDefaultDeclaration': {
    const symbol = createSymbol(node.declaration, globals, node.declaration);
    if (symbol) {
      symbol.exported = true;
    } else if (!node.id) {
      globals.ANONYMOUS_DEFAULT = node.declaration;
    }

    break;
  }

  case 'ExportNamedDeclaration': {
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

    for (const specifier of node.specifiers) {
      mapVariables(specifier, globals, opts);
    }

    break;
  }

  case 'ExportSpecifier': {
    const symbol = getSymbol(node.local, globals, globals);
    /* istanbul ignore next */
    if (symbol) {
      symbol.exported = true;
    }

    break;
  }

  case 'ClassDeclaration': {
    createSymbol(node.id, globals, node.body, globals);
    break;
  }

  default: {
    /* istanbul ignore next */
    return false;
  }
  }

  return true;
};

/**
 *
 * @param {} node
 * @param {} block
 * @param {} cache
 * @returns {boolean}
 */
const findNode = function (node, block, cache) {
  let blockCache = cache || [];
  /* istanbul ignore next */
  if (!block || blockCache.includes(block)) {
    return false;
  }

  blockCache = blockCache.slice();
  blockCache.push(block);

  if (
    (block.type === 'object' || block.type === 'MethodDefinition') &&
    block.value === node
  ) {
    return true;
  }

  const {
    props = block.body,
  } = block;
  for (const propval of Object.values(props || {})) {
    if (Array.isArray(propval)) {
      /* istanbul ignore if */
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

const exportTypes = new Set([
  'ExportNamedDeclaration', 'ExportDefaultDeclaration',
]);
const ignorableNestedTypes = new Set([
  'FunctionDeclaration', 'ArrowFunctionExpression', 'FunctionExpression',
]);

/**
 * @param {} nde
 * @returns {}
 */
const getExportAncestor = function (nde) {
  let node = nde;
  let idx = 0;
  const ignorableIfDeep = ignorableNestedTypes.has(nde?.type);
  while (node) {
    // Ignore functions nested more deeply than say `export default function () {}`
    if (idx >= 2 && ignorableIfDeep) {
      break;
    }

    if (exportTypes.has(node.type)) {
      return node;
    }

    node = node.parent;
    idx++;
  }

  return false;
};

const canBeExportedByAncestorType = new Set([
  'TSPropertySignature',
  'TSMethodSignature',
  'ClassProperty',
  'PropertyDefinition',
  'Method',
]);

const canExportChildrenType = new Set([
  'TSInterfaceBody',
  'TSInterfaceDeclaration',
  'TSTypeLiteral',
  'TSTypeAliasDeclaration',
  'ClassDeclaration',
  'ClassBody',
  'ClassDefinition',
  'ClassExpression',
  'Program',
]);

/**
 * @param {} nde
 * @returns {}
 */
const isExportByAncestor = function (nde) {
  if (!canBeExportedByAncestorType.has(nde.type)) {
    return false;
  }

  let node = nde.parent;
  while (node) {
    if (exportTypes.has(node.type)) {
      return node;
    }

    if (!canExportChildrenType.has(node.type)) {
      return false;
    }

    node = node.parent;
  }

  return false;
};

/**
 *
 * @param {} block
 * @param {} node
 * @param {} cache
 * @returns {boolean}
 */
const findExportedNode = function (block, node, cache) {
  /* istanbul ignore next */
  if (block === null) {
    return false;
  }

  const blockCache = cache || [];
  const {
    props,
  } = block;
  for (const propval of Object.values(props)) {
    blockCache.push(propval);
    if (propval.exported && (node === propval.value || findNode(node, propval.value))) {
      return true;
    }

    // No need to check `propval` for exported nodes as ESM
    //  exports are only global
  }

  return false;
};

/**
 *
 * @param {} node
 * @param {} globals
 * @param {} opt
 * @returns {boolean}
 */
const isNodeExported = function (node, globals, opt) {
  const moduleExports = globals.props.module?.props?.exports;
  if (
    opt.initModuleExports && moduleExports && findNode(node, moduleExports)
  ) {
    return true;
  }

  if (opt.initWindow && globals.props.window && findNode(node, globals.props.window)) {
    return true;
  }

  if (opt.esm && findExportedNode(globals, node)) {
    return true;
  }

  return false;
};

/**
 *
 * @param {} node
 * @param {} globalVars
 * @param {} opts
 * @returns {boolean}
 */
const parseRecursive = function (node, globalVars, opts) {
  // Iterate from top using recursion - stop at first processed node from top
  if (node.parent && parseRecursive(node.parent, globalVars, opts)) {
    return true;
  }

  return mapVariables(node, globalVars, opts);
};

/**
 *
 * @param {} ast
 * @param {} node
 * @param {} opt
 * @returns {{
 *   globalVars: {
 *     props: {};
 *   };
 * }}
 */
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

/**
 *
 * @param {} node
 * @param {} sourceCode
 * @param {} opt
 * @param {} settings
 * @returns {boolean}
 */
const isUncommentedExport = function (node, sourceCode, opt, settings) {
  // console.log({node});
  // Optimize with ancestor check for esm
  if (opt.esm) {
    const exportNode = getExportAncestor(node);

    // Is export node comment
    if (exportNode && !findJSDocComment(exportNode, sourceCode, settings)) {
      return true;
    }

    /**
     * Some typescript types are not in variable map, but inherit exported (interface property and method)
     */
    if (
      isExportByAncestor(node) &&
      !findJSDocComment(node, sourceCode, settings)
    ) {
      return true;
    }
  }

  const parseResult = parse(sourceCode.ast, node, opt);

  return isNodeExported(node, parseResult.globalVars, opt);
};

export default {
  isUncommentedExport,
  parse,
};
