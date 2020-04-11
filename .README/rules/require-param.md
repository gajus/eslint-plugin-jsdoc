### `require-param`

Requires that all function parameters are documented.

#### Options

An options object accepts two optional properties:

##### `exemptedBy`

Array of tags (e.g., `['type']`) whose presence on the document block
avoids the need for a `@param`. Defaults to an empty array.

##### `contexts`

Set this to an array of strings representing the AST context
where you wish the rule to be applied. Overrides the default
contexts (see below). May be useful for adding such as
`TSMethodSignature` in TypeScript or restricting the contexts
which are checked.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Options|`contexts`, `exemptedBy`|
|Settings|`overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

<!-- assertions requireParam -->
