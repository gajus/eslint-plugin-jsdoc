### `require-description`

Requires that all functions have a description.

* All functions must have a `@description` tag.
* Every description tag must have a non-empty description that explains the purpose of the method.

#### Options

An options object may have any of the following properties:

- `contexts` - Set to a string or array of strings representing the AST context
  where you wish the rule to be applied (e.g., `ClassDeclaration` for ES6 classes).
- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the document
    block avoids the need for a `@description`.
- `noDefaults` - By default, `contexts` will permit `ArrowFunctionExpression`,
  `FunctionDeclaration`, and `FunctionExpression`. Set this instead to `true` to
  have `contexts` override these.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`description`|
|Aliases|`desc`|
|Options|`contexts`, `exemptedBy`, `noDefaults`|

<!-- assertions requireDescription -->
