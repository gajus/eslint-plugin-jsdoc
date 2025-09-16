### `match-name`

{"gitdown": "contents", "rootId": "match-name"}

Reports the name portion of a JSDoc tag if matching or not matching
a given regular expression.

Note that some tags do not possess names and anything appearing to be a
name will actually be part of the description (e.g., for
`@returns {type} notAName`). If you are defining your own tags, see the
`structuredTags` setting (if `name: false`, this rule will not apply to
that tag).

## Fixer

Will replace `disallowName` with `replacement` if these are provided.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|(The tags specified by `tags`, including any tag if `*` is set)|
|Recommended|false|
|Settings|`structuredTags`|
|Options|`match`|

## Failing examples

<!-- assertions-failing matchName -->

## Passing examples

<!-- assertions-passing matchName -->
