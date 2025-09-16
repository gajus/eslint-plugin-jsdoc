# `check-line-alignment`

{"gitdown": "contents", "rootId": "check-line-alignment"}

Reports invalid alignment of JSDoc block lines. This is a
[standard recommended to WordPress code](https://make.wordpress.org/core/handbook/best-practices/inline-documentation-standards/javascript/#aligning-comments),
for example.

## Fixer

Will either add alignment between the tag, type, name, and description across
lines of the JSDoc block or remove it.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|everywhere|
|Options|string ("always", "never", "any") followed by object with `customSpacings`, `disableWrapIndent`, `preserveMainDescriptionPostDelimiter`, `tags`, `wrapIndent`|
|Tags|`param`, `property`, `returns` and others added by `tags`|
|Aliases|`arg`, `argument`, `prop`, `return`|
|Recommended|false|

## Failing examples

<!-- assertions-failing checkLineAlignment -->

## Passing examples

<!-- assertions-passing checkLineAlignment -->
