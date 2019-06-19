### `require-param`

Requires that all function parameters are documented.

#### Options

An options object accepts one optional property:

- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the document
    block avoids the need for a `@param`.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Options|`exemptedBy`|
|Settings|`allowOverrideWithoutParam`, `allowImplementsWithoutParam`, `allowAugmentsExtendsWithoutParam`|

<!-- assertions requireParam -->
