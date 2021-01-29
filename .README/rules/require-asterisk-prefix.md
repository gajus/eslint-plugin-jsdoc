### `require-asterisk-prefix`

Requires that each JSDoc line starts with an `*`.

#### Options

This rule allows one optional string argument. If it is `"always"` then a
problem is raised when there is no asterisk prefix on a given jsdoc line. If
it is `"never"` then a problem is raised when there is an asterisk present.
The default value is `"always"`.

|||
|---|---|
|Context|everywhere|
|Tags|N/A (doc block)|
|Options|(a string matching `"always"|"never"`)|
