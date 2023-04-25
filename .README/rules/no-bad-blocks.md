### `no-bad-blocks`

{"gitdown": "contents", "rootId": "no-bad-blocks"}

This rule checks for multi-line-style comments which fail to meet the
criteria of a jsdoc block, namely that it should begin with two and only two
asterisks, but which appear to be intended as jsdoc blocks due to the presence
of whitespace followed by whitespace or asterisks, and
an at-sign (`@`) and some non-whitespace (as with a jsdoc block tag).

## Fixer

(TODO)

## Options

Takes an optional options object with the following.

### `ignore`

An array of directives that will not be reported if present at the beginning of
a multi-comment block and at-sign `/* @`.

Defaults to `['ts-check', 'ts-expect-error', 'ts-ignore', 'ts-nocheck']`
(some directives [used by TypeScript](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check)).

### `preventAllMultiAsteriskBlocks`

A boolean (defaulting to `false`) which if `true` will prevent all
JSDoc-like blocks with more than two initial asterisks even those without
apparent tag content.

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
