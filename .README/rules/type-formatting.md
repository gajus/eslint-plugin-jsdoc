# `type-formatting`

Formats JSDoc type values.

Note that this rule should be considered **experimental**. The stringification
might not preserve other aspects of your original formatting and there could be
errors.

Currently offers the following options for formatting types.

## Options

{"gitdown": "options"}

|||
|---|---|
|Context|everywhere|
|Tags|`param`, `property`, `returns`, `this`, `throws`, `type`, `typedef`, `yields`|
|Recommended|false|
|Settings|`mode`|
|Options|`arrayBrackets`, `enableFixer`, `genericDot`, `objectFieldIndent`, `objectFieldQuote`, `objectFieldSeparator`, `objectFieldSeparatorOptionalLinebreak`, `objectFieldSeparatorTrailingPunctuation`, `separatorForSingleObjectField`, `stringQuotes`, `typeBracketSpacing`, `unionSpacing`|

## Failing examples

<!-- assertions-failing typeFormatting -->

## Passing examples

<!-- assertions-passing typeFormatting -->
