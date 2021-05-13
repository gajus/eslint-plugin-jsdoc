### `check-line-alignment`

Reports invalid alignment of JSDoc block lines. This is a
[standard recommended to WordPress code](https://make.wordpress.org/core/handbook/best-practices/inline-documentation-standards/javascript/#aligning-comments),
for example.

#### Options

This rule allows one optional string argument. If it is `"always"` then a
problem is raised when the lines are not aligned. If it is `"never"` then
a problem should be raised when there is more than one space between each
line's parts. Defaults to `"never"`.

Note that in addition to alignment, both options will ensure at least one
space is present after the asterisk delimiter.

After the string, an options object is allowed with the following properties.

##### `tags`

Use this to change the tags which are sought for alignment changes. *Currently*
*only works with the "never" option.* Defaults to an array of
`['param', 'arg', 'argument', 'property', 'prop', 'returns', 'return']`.

|||
|---|---|
|Context|everywhere|
|Options|(a string matching `"always" or "never"` and optional object with `tags`)|
|Tags|`param`, `property`, `returns` and others added by `tags`|
|Aliases|`arg`, `argument`, `prop`, `return`|
|Recommended|false|

<!-- assertions checkLineAlignment -->
