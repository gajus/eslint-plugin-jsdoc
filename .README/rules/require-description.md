### `require-description`

Requires that all functions have a description.

* All functions must have a `@description` tag.
* Every description tag must have a non-empty description that explains the purpose of the method.

#### Options

An options object may have any of the following properties:

- `contexts` - Set to a string or array of strings representing the AST context
  where you wish the rule to be applied (e.g., `ClassDeclaration` for ES6 classes).
  Overrides the defaults.
- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the document
    block avoids the need for a `@description`.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`description`|
|Aliases|`desc`|
|Options|`contexts`, `exemptedBy`|

<!-- assertions requireDescription -->
