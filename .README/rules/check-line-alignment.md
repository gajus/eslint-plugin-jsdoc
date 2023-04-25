# `check-line-alignment`

{"gitdown": "contents", "rootId": "check-line-alignment"}

Reports invalid alignment of JSDoc block lines. This is a
[standard recommended to WordPress code](https://make.wordpress.org/core/handbook/best-practices/inline-documentation-standards/javascript/#aligning-comments),
for example.

## Fixer

(TODO)

## Options

This rule allows one optional string argument. If it is `"always"` then a
problem is raised when the lines are not aligned. If it is `"never"` then
a problem should be raised when there is more than one space between each
line's parts. If it is `"any"`, no alignment is made. Defaults to `"never"`.

Note that in addition to alignment, the "never" and "always" options will both
ensure that at least one space is present after the asterisk delimiter.

After the string, an options object is allowed with the following properties.

### `tags`

Use this to change the tags which are sought for alignment changes. Defaults to an array of
`['param', 'arg', 'argument', 'property', 'prop', 'returns', 'return']`.

### `customSpacings`

An object with any of the following keys set to an integer. Affects spacing:

- `postDelimiter` - after the asterisk (e.g., `*   @param`)
- `postTag` - after the tag (e.g., `* @param  `)
- `postType` - after the type (e.g., `* @param {someType}   `)
- `postName` - after the name (e.g., `* @param {someType} name   `)
- `postHyphen` - after any hyphens in the description (e.g., `* @param {someType} name -  A description`)

If a spacing is not defined, it defaults to one.

### `preserveMainDescriptionPostDelimiter`

A boolean to determine whether to preserve the post-delimiter spacing of the
main description. If `false` or unset, will be set to a single space.

### `wrapIndent`

The indent that will be applied for tag text after the first line.
Default to the empty string (no indent).

## Context and settings

|||
|---|---|
|Context|everywhere|
|Options|(a string matching `"always"`, `"never"`, or `"any"` and optional object with `tags`, `customSpacings`, `preserveMainDescriptionPostDelimiter`, and `wrapIndent`)|
|Tags|`param`, `property`, `returns` and others added by `tags`|
|Aliases|`arg`, `argument`, `prop`, `return`|
|Recommended|false|

## Failing examples

<!-- assertions-failing checkLineAlignment -->

## Passing examples

<!-- assertions-passing checkLineAlignment -->
