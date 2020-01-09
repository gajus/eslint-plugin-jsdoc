# `require-returns-check`

{"gitdown": "contents"}

Requires a return statement be present in a function body if a `@returns`
tag is specified in the jsdoc comment block.

Will also report if multiple `@returns` tags are present.

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`returns`|
|Aliases|`return`|

## Failing examples

<!-- assertions-failing requireReturnsCheck -->

## Passing examples

<!-- assertions-passing requireReturnsCheck -->
