### `check-line-alignment`

Reports invalid alignment of JSDoc block lines. This is a
[standard recommended to WordPress code](https://make.wordpress.org/core/handbook/best-practices/inline-documentation-standards/javascript/#aligning-comments),
for example.

#### Options

This rule allows one optional string argument. If it is `"always"` then a
problem is raised when the lines are not aligned. If it is `"never"` then
a problem should be raised when there is more than one space between each
line's parts. Defaults to `"never"`.

|||
|---|---|
|Context|everywhere|
|Options|(a string matching `"always"|"never"`)|
|Tags|`param`, `property`|
|Aliases|`arg`, `argument`, `prop`|
|Recommended|false|

<!-- assertions checkLineAlignment -->
