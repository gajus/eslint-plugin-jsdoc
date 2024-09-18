# `text-escaping`

{"gitdown": "contents", "rootId": "text-escaping"}

This rule can auto-escape certain characters that are input within block and
tag descriptions.

This rule may be desirable if your text is known not to contain HTML or
Markdown and you therefore do not wish for it to be accidentally interpreted
as such by the likes of Visual Studio Code or if you wish to view it escaped
within it or your documentation.

## Fixer

(TODO)

## Options

### `escapeHTML`

This option escapes all `<` and `&` characters (except those followed by
whitespace which are treated as literals by Visual Studio Code). Defaults to
`false`.

### `escapeMarkdown`

This option escapes the first backtick (`` ` ``) in a paired sequence.
Defaults to `false`.

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|false|
|Settings||
|Options|`escapeHTML`, `escapeMarkdown`|

## Failing examples

<!-- assertions-failing textEscaping -->

## Passing examples

<!-- assertions-passing textEscaping -->
