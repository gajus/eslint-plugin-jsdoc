# `require-returns-type`

{"gitdown": "contents", "rootId": "require-returns-type"}

Requires that `@returns` tag has a `type` value (in curly brackets).

## Options

### `contexts`

Set this to an array of strings representing the AST context (or an object with
`context` and `comment` properties) where you wish the rule to be applied.
Overrides the default contexts (see below). Set to `"any"` if you want
the rule to apply to any jsdoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., `@callback` or `@function` (or its aliases `@func` or
`@method`) (including those associated with an `@interface`).

See the ["AST and Selectors"](../#advanced-ast-and-selectors)
section of our README for more on the expected format.

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`returns`|
|Aliases|`return`|
|Recommended|true|
|Options|`contexts`|

## Failing examples

<!-- assertions-failing requireReturnsType -->

## Passing examples

<!-- assertions-passing requireReturnsType -->
