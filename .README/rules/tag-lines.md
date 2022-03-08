### `tag-lines`

Enforces lines (or no lines) between tags.

#### Options

The first option is a single string set to "always", "never", or "any"
(defaults to "never").

"any" is only useful with `tags` (allowing non-enforcement of lines except
for particular tags) or with `dropEndLines`.

The second option is an object with the following optional properties.

##### `count` (defaults to 1)

Use with "always" to indicate the number of lines to require be present.

##### `noEndLines` (defaults to `false`)

Use with "always" to indicate the normal lines to be added after tags should
not be added after the final tag.

##### `dropEndLines` (defaults to `false`)

If defined, will drop end lines for the final tag only.

##### `tags` (default to empty object)

Overrides the default behavior depending on specific tags.

An object whose keys are tag names and whose values are objects with the
following keys:

1. `lines` - Set to `always`, `never`, or `any` to override.
2. `count` - Overrides main `count` (for "always")

|||
|---|---|
|Context|everywhere|
|Tags|Any|
|Recommended|true|
|Settings|N/A|
|Options|(a string matching `"always" or "never"` and optional object with `count` and `noEndLines`)|

<!-- assertions tagLines -->
