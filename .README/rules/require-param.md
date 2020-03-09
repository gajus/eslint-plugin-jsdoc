### `require-param`

{"gitdown": "contents", "rootId": "require-param"}

Requires that all function parameters are documented.

#### Options

An options object accepts one optional property:

- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the document
    block avoids the need for a `@param`. Defaults to an empty array.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Options|`exemptedBy`|
|Settings|`overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

<!-- assertions requireParam -->
