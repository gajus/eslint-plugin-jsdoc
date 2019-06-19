### `require-jsdoc`

Checks for presence of jsdoc comments, on class declarations as well as
functions.

#### Options

Accepts one optional options object, with two optional keys, `publicOnly`
for confining JSDoc comments to be checked to exported functions (with "exported"
allowing for ESM exports, CJS exports, or browser window global export)
in `require-jsdoc`, and `require` for limiting the contexts which are to
be checked by the rule.

- `publicOnly` - Missing jsdoc blocks are only reported for function
  bodies / class declarations that are exported from the module.
  May be a boolean or object. If set to `true`, the defaults below will
  be used.

  This object supports the following optional boolean keys (`false` unless
  otherwise noted):

  - `ancestorsOnly` - Only check node ancestors to check if node is exported
  - `esm` - ESM exports are checked for JSDoc comments (Defaults to `true`)
  - `cjs` - CommonJS exports are checked for JSDoc comments  (Defaults to `true`)
  - `browserEnv` - Window global exports are checked for JSDoc comments

- `require` - An object with the following optional boolean keys which all
    default to `false` except as noted:

  - `ArrowFunctionExpression`
  - `ClassDeclaration`
  - `FunctionDeclaration` (defaults to `true`)
  - `FunctionExpression`
  - `MethodDefinition`

|||
|---|---|
|Context|`ArrowFunctionExpression`, `ClassDeclaration`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|N/A|
|Options|`publicOnly`|
|Settings|`exemptEmptyFunctions`|

<!-- assertions requireJsdoc -->
