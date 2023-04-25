# `require-property`

{"gitdown": "contents", "rootId": "require-property"}

Requires that all `@typedef` and `@namespace` tags have `@property`
tags when their type is a plain `object`, `Object`, or `PlainObject`.

Note that any other type, including a subtype of object such as
`object<string, string>`, will not be reported.

## Fixer

The fixer for `require-property` will add an empty `@property`.

## Context and settings

|||
|---|---|
|Context|Everywhere|
|Tags|`typedef`, `namespace`|
|Recommended|true|

## Failing examples

<!-- assertions-failing requireProperty -->

## Passing examples

<!-- assertions-passing requireProperty -->
