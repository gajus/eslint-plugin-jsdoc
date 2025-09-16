### `no-bad-blocks`

{"gitdown": "contents", "rootId": "no-bad-blocks"}

This rule checks for multi-line-style comments which fail to meet the
criteria of a JSDoc block, namely that it should begin with two and only two
asterisks, but which appear to be intended as JSDoc blocks due to the presence
of whitespace followed by whitespace or asterisks, and
an at-sign (`@`) and some non-whitespace (as with a JSDoc block tag).

Exceptions are made for ESLint directive comments (which may use `@` in
rule names).

## Fixer

Repairs badly-formed blocks missing two initial asterisks.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|Everywhere|
|Tags|N/A|
|Recommended|false|
|Options|`ignore`, `preventAllMultiAsteriskBlocks`|

## Failing examples

<!-- assertions-failing noBadBlocks -->

## Passing examples

<!-- assertions-passing noBadBlocks -->
