### `tag-lines`

Enforces lines (or no lines) between tags.

#### Options

The first option is a single string set to "always" or "never" (defaults to
"never").

The second option is an object with the following optional properties.

##### `count` (defaults to 1)

Use with "always" to indicate the number of lines to require be present.

##### `noEndLine` (defaults to `false`)

Use with "always" to indicate the normal lines after tags should not be
added after the final tag.

|||
|---|---|
|Context|everywhere|
|Tags|Any|
|Recommended|false|
|Settings|N/A|
|Options|(a string matching `"always" or "never"` and optional object with `count` and `noEndLine`)|

<!-- assertions tagLines -->
