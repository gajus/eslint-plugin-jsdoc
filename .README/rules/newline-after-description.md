### `newline-after-description`

Enforces a consistent padding of the block description.

#### Options

This rule allows one optional string argument. If it is `"always"` then a
problem is raised when there is no newline after the description. If it is
`"never"` then a problem is raised when there is a newline after the
description. The default value is `"always"`.

|||
|---|---|
|Context|everywhere|
|Tags|N/A (doc block)|
|Options|(a string matching `"always"|"never"`)|
|Recommended|true|

<!-- assertions newlineAfterDescription -->
