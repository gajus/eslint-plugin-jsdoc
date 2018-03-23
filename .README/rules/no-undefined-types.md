### `no-undefined-types`

Checks that types in jsdoc comments are defined. This can be used to check unimported types.

When enabling this rule, types in jsdoc comments will resolve as used variables, i.e. will not be marked as unused by `no-unused-vars`.


|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`param`, `returns`|

<!-- assertions noUndefinedTypes -->
