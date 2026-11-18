# `implements-on-classes`

{"gitdown": "contents", "rootId": "implements-on-classes"}

Reports an issue with any non-constructor function using `@implements`.

Constructor functions, whether marked with `@class`, `@constructs`, or being
an ES6 class constructor, will not be flagged.

To indicate that a function follows another function's signature, one might
instead use `@type` to indicate the `@function` or `@callback` to which the
function is adhering.

## Fixer

With the `fix` option set to `"remove"`, the `@implements` tag is removed; set to
`"type"`, `@implements {Type}` becomes `@type {Type}` (unless the block already has
a `@type` tag or the tag has no type). Without the option, the rule only reports.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`implements` (prevented)|
|Recommended|true|
|Options|`contexts`, `fix`|

## Failing examples

<!-- assertions-failing implementsOnClasses -->

## Passing examples

<!-- assertions-passing implementsOnClasses -->
