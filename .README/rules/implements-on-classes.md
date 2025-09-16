# `implements-on-classes`

{"gitdown": "contents", "rootId": "implements-on-classes"}

Reports an issue with any non-constructor function using `@implements`.

Constructor functions, whether marked with `@class`, `@constructs`, or being
an ES6 class constructor, will not be flagged.

To indicate that a function follows another function's signature, one might
instead use `@type` to indicate the `@function` or `@callback` to which the
function is adhering.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`implements` (prevented)|
|Recommended|true|
|Options|`contexts`|

## Failing examples

<!-- assertions-failing implementsOnClasses -->

## Passing examples

<!-- assertions-passing implementsOnClasses -->
