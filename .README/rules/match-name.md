### `match-name`

Reports the name portion of a JSDoc tag if matching or not matching
a given regular expression.

Note that some tags do not possess names and anything appearing to be a
name will actually be part of the description (e.g., for
`@returns {type} notAName`). If you are defining your own tags, see the
`structuredTags` setting (if `name: false`, this rule will not apply to
that tag).

#### Options

A single options object with the following properties:

##### `match`

`match` is a required option containing an array of objects which determine
the conditions whereby a name is reported as being problematic.

These objects can have any combination of the following groups of optional
properties, all of which act to confine one another:

- `tags` - This array should include tag names or `*` to indicate the
  match will apply for all tags (except as confined by any context
  properties). If `*` is not used, then these rules will only apply to
  the specified tags. If `tags` is omitted, then `*` is assumed.

- `allowName` - Indicates which names are allowed for the given tag (or `*`).
    Accepts a string regular expression (optionally wrapped between two
    `/` delimiters followed by optional flags) used to match the name.
- `disallowName` - As with `allowName` but indicates names that are not
    allowed.
- `replacement` - If `disallowName` is supplied and this value is present, it
    will replace the matched `disallowName` text.

- `context` - AST to confine the allowing or disallowing to jsdoc blocks
    associated with a particular context. See the
    ["AST and Selectors"](#eslint-plugin-jsdoc-advanced-ast-and-selectors)
    section of our README for more on the expected format.
- `comment` - As with `context` but AST for the JSDoc block comment and types

- `message` - An optional custom message to use when there is a match.

Note that `comment`, even if targeting a specific tag, is used to match the
whole block. So if a `comment` finds its specific tag, it may still apply
fixes found by the likes of `disallowName` even when a different tag has the
disallowed name. An alternative is to ensure that `comment` finds the specific
tag of the desired tag and/or name and no `disallowName` (or `allowName`) is
supplied. In such a case, only one error will be reported, but no fixer will
be applied, however.

|||
|---|---|
|Context|everywhere|
|Tags|(The tags specified by `tags`, including any tag if `*` is set)|
|Recommended|false|
|Settings|`structuredTags`|
|Options|`match`|

<!-- assertions matchName -->
