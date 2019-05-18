### `implements-on-classes`

Reports an issue with any non-constructor function using `@implements`.

Constructor functions, whether marked with `@class`, `@constructs`, or being
an ES6 class constructor, will not be flagged.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`implements` (prevented)|

<!-- assertions implementsOnClasses -->
