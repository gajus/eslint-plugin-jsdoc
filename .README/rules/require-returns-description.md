# `require-returns-description`

{"gitdown": "contents", "rootId": "require-returns-description"}

Requires that the `@returns` tag has a `description` value. The error
will not be reported if the return value is `void` or `undefined`
or if it is `Promise<void>` or `Promise<undefined>`.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`returns`|
|Aliases|`return`|
|Recommended|true|
|Options|`contexts`|

## Failing examples

<!-- assertions-failing requireReturnsDescription -->

## Passing examples

<!-- assertions-passing requireReturnsDescription -->
