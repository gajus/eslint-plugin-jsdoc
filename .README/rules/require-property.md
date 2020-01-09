# `require-property`

{"gitdown": "contents"}

Requires that all `@typedef` and `@namespace` tags have `@property`
tags when their type is a plain `object`, `Object`, or `PlainObject`.

Note that if any other type, including a subtype of object such as
`object<string, string>`, will not be reported.

## Fixer

The fixer for `require-example` will add an empty `@property`.

## Context and settings

|||
|---|---|
|Context|Everywhere|
|Tags|`property` (relates to presence of `typedef` or `namespace`)|
|Aliases|`prop`|

## Failing examples

<!-- assertions-failing requireProperty -->

## Passing examples

<!-- assertions-passing requireProperty -->
