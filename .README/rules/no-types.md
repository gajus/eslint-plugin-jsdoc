# `no-types`

{"gitdown": "contents", "rootId": "no-types"}

This rule reports types being used on `@param` or `@returns`.

The rule is intended to prevent the indication of types on tags where
the type information would be redundant with TypeScript.

When `contexts` are supplied, will also strip `@property` when on a
`ClassDeclaration`.

## Fixer

Strips any types that are found.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`param`, `returns`|
|Aliases|`arg`, `argument`, `return`|
|Recommended|false|
|Options|`contexts`|

## Failing examples

<!-- assertions-failing noTypes -->

## Passing examples

<!-- assertions-passing noTypes -->
