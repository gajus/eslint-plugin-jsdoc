### `multiline-blocks`

{"gitdown": "contents", "rootId": "multiline-blocks"}

Controls how and whether JSDoc blocks can be expressed as single or multiple
line blocks.

Note that if you set `noSingleLineBlocks` and `noMultilineBlocks` to `true`
and configure them in a certain manner, you might effectively be prohibiting
all JSDoc blocks!

Also allows for preventing text at the very beginning or very end of blocks.

## Fixer

Optionally converts single line blocks to multiline ones and vice versa.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|Any (though `singleLineTags` and `multilineTags` control the application)|
|Recommended|true|
|Settings||
|Options|`allowMultipleTags`, `minimumLengthForMultiline`, `multilineTags`, `noFinalLineText`, `noMultilineBlocks`, `noSingleLineBlocks`, `noZeroLineText`, `requireSingleLineUnderCount`, `singleLineTags`|

## Failing examples

<!-- assertions-failing multilineBlocks -->

## Passing examples

<!-- assertions-passing multilineBlocks -->
