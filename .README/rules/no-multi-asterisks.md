### `no-multi-asterisks`

{"gitdown": "contents", "rootId": "no-multi-asterisks"}

Prevents use of multiple asterisks at the beginning of lines.

Note that if you wish to prevent multiple asterisks at the very beginning of
the JSDoc block, you should use `no-bad-blocks` (as that is not proper jsdoc
and that rule is for catching blocks which only seem like jsdoc).

## Fixer

Removes multiple asterisks on middle or end lines.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|(Any)|
|Recommended|true|
|Settings||
|Options|`allowWhitespace`, `preventAtEnd`, `preventAtMiddleLines`|

## Failing examples

<!-- assertions-failing noMultiAsterisks -->

## Passing examples

<!-- assertions-passing noMultiAsterisks -->
