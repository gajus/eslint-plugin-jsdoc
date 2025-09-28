# `require-returns-check`

{"gitdown": "contents", "rootId": "require-returns-check"}

Requires a return statement (or non-`undefined` Promise resolve value)
be present in a
function body if a `@returns` tag (without a `void` or `undefined` type)
is specified in the function's JSDoc comment block.

Will also report `@returns {void}` and `@returns {undefined}` if `exemptAsync`
is set to `false` and a non-`undefined` value is returned or a resolved value
is found. Also reports if `@returns {never}` is discovered with a return value.

Will report if native types are specified for `@returns` on an async function.

Will also report if multiple `@returns` tags are present.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`returns`|
|Aliases|`return`|
|Options|`exemptAsync`, `exemptGenerators`, `noNativeTypes`, `reportMissingReturnForUndefinedTypes`|
|Recommended|true|

## Failing examples

<!-- assertions-failing requireReturnsCheck -->

## Passing examples

<!-- assertions-passing requireReturnsCheck -->
