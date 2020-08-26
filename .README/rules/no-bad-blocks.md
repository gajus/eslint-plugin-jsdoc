### `no-bad-blocks`

This rule checks for multi-line-style comments which fail to meet the
criteria of a jsdoc block, namely that it should begin with two asterisks,
but which appear to be intended as jsdoc blocks due to the presence
of whitespace followed by whitespace or asterisks, and
an at-sign (`@`) and some non-whitespace (as with a jsdoc block tag).

#### Options

Takes an optional options object with the following.

##### `ignore`

An array of directives that will not be reported if present at the beginning of
a multi-comment block and at-sign `/* @`.

Defaults to `['ts-check', 'ts-expect-error', 'ts-ignore', 'ts-nocheck']`
(some directives [used by TypeScript](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check)).

|||
|---|---|
|Context|Everywhere|
|Options|`ignore`|
|Tags|N/A|

<!-- assertions noBadBlocks -->
