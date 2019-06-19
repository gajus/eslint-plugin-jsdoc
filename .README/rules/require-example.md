### `require-example`

Requires that all functions have examples.

* All functions must have one or more `@example` tags.
* Every example tag must have a non-empty description that explains the method's usage.

#### Options

Has an object option with one optional property:

- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the document
  block avoids the need for an `@example`.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`example`|
|Options|`exemptedBy`|
|Settings|`avoidExampleOnConstructors`|

<!-- assertions requireExample -->
