# `require-yields-check`

{"gitdown": "contents", "rootId": "require-yields-check"}

Ensures that if a `@yields` is present that a `yield` (or `yield` with a
value) is present in the function body (or that if a `@next` is present that
there is a `yield` with a return value present).

Please also note that JavaScript does allow generators not to have `yield`
(e.g., with just a return or even no explicit return), but if you want to
enforce that all generators (except wholly empty ones) have a `yield` in the
function body, you can use the ESLint
[`require-yield`](https://eslint.org/docs/rules/require-yield) rule. In
conjunction with this, you can also use the `checkGeneratorsOnly` option
as an optimization so that this rule won't need to do its own checking within
function bodies.

Will also report if multiple `@yields` tags are present.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`yields`|
|Aliases|`yield`|
|Recommended|true|
|Options|`checkGeneratorsOnly`, `contexts`, `next`|

## Failing examples

<!-- assertions-failing requireYieldsCheck -->

## Passing examples

<!-- assertions-passing requireYieldsCheck -->
