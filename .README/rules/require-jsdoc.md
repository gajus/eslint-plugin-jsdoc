### `require-jsdoc`

{"gitdown": "contents", "rootId": "eslint-plugin-jsdoc-rules-require-jsdoc"}

Checks for presence of jsdoc comments, on class declarations as well as
functions.

#### Options

Accepts one optional options object with the following optional keys.

- `publicOnly` - This option will insist that missing jsdoc blocks are
  only reported for function bodies / class declarations that are exported
  from the module. May be a boolean or object. If set to `true`, the defaults
  below will be used. If unset, jsdoc block reporting will not be limited to
  exports.

  This object supports the following optional boolean keys (`false` unless
  otherwise noted):

  - `ancestorsOnly` - Only check node ancestors to check if node is exported
  - `esm` - ESM exports are checked for JSDoc comments (Defaults to `true`)
  - `cjs` - CommonJS exports are checked for JSDoc comments  (Defaults to `true`)
  - `window` - Window global exports are checked for JSDoc comments

- `require` - An object with the following optional boolean keys which all
    default to `false` except as noted, indicating the contexts where the rule
    will apply:

  - `ArrowFunctionExpression`
  - `ClassDeclaration`
  - `ClassExpression`
  - `FunctionDeclaration` (defaults to `true`)
  - `FunctionExpression`
  - `MethodDefinition`

- `contexts` - Set this to an array of strings representing the additional
  AST contexts where you wish the rule to be applied (e.g., `Property` for
  properties). Defaults to an empty array.

- `exemptEmptyFunctions` (default: false) - When `true`, the rule will not report
  missing jsdoc blocks above functions/methods with no parameters or return values
  (intended where variable names are sufficient for themselves as documentation).

#### Fixer

(Todo)

#### Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `ClassDeclaration`, `ClassExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|N/A|
|Options|`publicOnly`, `require`, `contexts`, `exemptEmptyFunctions`|

#### Failing examples

<!-- assertions-failing requireJsdoc -->

#### Passing examples

<!-- assertions-passing requireJsdoc -->
