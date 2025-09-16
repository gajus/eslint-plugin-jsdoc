# `match-description`

{"gitdown": "contents", "rootId": "match-description"}

Enforces a regular expression pattern on descriptions.

The default is this basic expression to match English sentences (Support
for Unicode upper case may be added in a future version when it can be handled
by our supported Node versions):

``^\n?([A-Z`\\d_][\\s\\S]*[.?!`\\p{RGI_Emoji}]\\s*)?$``

Applies by default to the JSDoc block description and to the following tags:

- `@description`/`@desc`
- `@summary`
- `@file`/`@fileoverview`/`@overview`
- `@classdesc`

In addition, the `tags` option (see below) may be used to match other tags.

The default (and all regex options) defaults to using (only) the `v` flag, so
to add your own flags, encapsulate your expression as a string, but like a
literal, e.g., `/[A-Z].*\\./vi`.

Note that `/` delimiters are optional, but necessary to add flags (besides
`v`).

Also note that the default or optional regular expressions is *not*
case-insensitive unless one opts in to add the `i` flag.

You can add the `s` flag if you want `.` to match newlines. Note, however,
that the trailing newlines of a description will not be matched.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|docblock and `@description` by default but more with `tags`|
|Aliases|`@desc`|
|Recommended|false|
|Settings||
|Options|`contexts`, `mainDescription`, `matchDescription`, `message`, `nonemptyTags`, `tags`|

## Failing examples

<!-- assertions-failing matchDescription -->

## Passing examples

<!-- assertions-passing matchDescription -->
