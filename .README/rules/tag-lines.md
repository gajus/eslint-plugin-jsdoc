### `tag-lines`

Enforces lines (or no lines) between tags.

If you only want lines preceding all tags or after all tags, you can use
the "any" option along with `startLines` and/or `endLines`.

The "always" or "never" options of this rule should not
be used with the linebreak-setting options of the `sort-tags` rule as both
may try to impose a conflicting number of lines.

#### Options

The first option is a single string set to "always", "never", or "any"
(defaults to "never").

"any" is only useful with `tags` (allowing non-enforcement of lines except
for particular tags) or with `startLines` or `endLines`. It is also
necessary if using the linebreak-setting options of the `sort-tags` rule
so that the two rules won't conflict in both attempting to set lines
between tags.

The second option is an object with the following optional properties.

##### `count` (defaults to 1)

Use with "always" to indicate the number of lines to require be present.

##### `applyToEndTag` (defaults to `true`)

Set to `false` and use with "always" to indicate the normal lines to be
added after tags should not be added after the final tag.

##### `startLines` (defaults to `0`)

If not set to `null`, will enforce end lines to the given count before the
first tag only, unless there is only whitespace content, in which case,
a line count will not be enforced.

##### `endLines` (defaults to `0`)

If not set to `null`, will enforce end lines to the given count on the
final tag only.

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
|Options|(a string matching `"always"`, `"never"`, or `"any"` and optional object with `count`, `applyToEndTag`, `startLines`, `endLines`)|

<!-- assertions tagLines -->
