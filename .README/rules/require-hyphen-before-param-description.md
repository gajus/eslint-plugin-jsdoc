# `require-hyphen-before-param-description`

{"gitdown": "contents", "rootId": "require-hyphen-before-param-description"}

Requires (or disallows) a hyphen before the `@param` description.

## Fixer

Adds a hyphen for "always" and removes a hyphen for "never".

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`param` and optionally other tags within `tags`|
|Aliases|`arg`, `argument`; potentially `prop` or other aliases|
|Recommended|false|
|Options|string ("always", "never") followed by object with `tags`|

## Failing examples

<!-- assertions-failing requireHyphenBeforeParamDescription -->

## Passing examples

<!-- assertions-passing requireHyphenBeforeParamDescription -->
