# `require-hyphen-before-param-description`

{"gitdown": "contents"}

Requires a hyphen before the `@param` description.

## Options

This rule takes one optional string argument and an optional options object.

If the string is `"always"` then a problem is raised when there is no hyphen
before the description. If it is `"never"` then a problem is raised when there
is a hyphen before the description. The default value is `"always"`.

The options object may have the following properties:

- `checkProperties` - Boolean on whether to also apply the rule to `@property`
  tags.

## Fixer

(Todo)

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`param` and optionally `property`|
|Aliases|`arg`, `argument`; optionally `prop`|
|Options|(a string matching `"always"|"never"`) and an optional object with a `checkProperties` property|

## Failing examples

<!-- assertions-failing requireHyphenBeforeParamDescription -->

## Passing examples

<!-- assertions-passing requireHyphenBeforeParamDescription -->
