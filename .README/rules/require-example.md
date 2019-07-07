### `require-example`

Requires that all functions have examples.

* All functions must have one or more `@example` tags.
* Every example tag must have a non-empty description that explains the method's usage.

#### Options

This rule has an object option:

- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the document
  block avoids the need for an `@example`. Defaults to an empty array.

- `avoidExampleOnConstructors` (default: false) - Set to `true` to avoid the
  need for an example on a constructor (whether indicated as such by a
  jsdoc tag or by being within an ES6 `class`).

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`example`|
|Options|`exemptedBy`, `avoidExampleOnConstructors`|

<!-- assertions requireExample -->
