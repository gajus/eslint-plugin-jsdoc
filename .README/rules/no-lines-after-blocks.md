# `no-lines-after-blocks`

Reports extra lines between functions (and other language structures) and their
JSDoc blocks.

Standalone comments such as `@typedef` and `@callback` will not be reported even
if they are followed by a language structure.

## Fixer

Removes extra lines between functions (and other language structures) and their
JSDoc blocks. Uses the `maxLines` setting to determine whether to remove lines.

## Options

{"gitdown": "options"}

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|false|
|Settings|`maxLines`, `minLines`|
|Options|`contexts`, `enableFixer`, `exemptedBy`, `overrideDefaultExemptions`, `preferMinLines`|

## Failing examples

<!-- assertions-failing noLinesAfterBlocks -->

## Passing examples

<!-- assertions-passing noLinesAfterBlocks -->
