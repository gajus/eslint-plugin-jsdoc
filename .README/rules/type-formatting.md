# `type-formatting`

Formats JSDoc type values.

Note that this rule should be considered **experimental**. The stringification
might not preserve other aspects of your original formatting and there could be
errors.

Currently offers the following options for formatting types.

## Options

### `arrayBrackets`

Determines how array generics are represented. Set to `angle` for the style `Array<type>` or `square` for the style `type[]`. Defaults to "square".

### `enableFixer`

Whether to enable the fixer. Defaults to `true`.

### `genericDot`

Boolean value of whether to use a dot before the angled brackets of a generic (e.g., `SomeType.<AnotherType>`). Defaults to `false`.

### `objectFieldQuote`

Whether and how object field properties should be quoted (e.g., `{"a": string}`).
Set to `single`, `double`, or `null`. Defaults to `null` (no quotes unless
required due to whitespace within the field).

### `propertyQuotes`

Whether and how namepath properties should be quoted (e.g., `ab."cd"."ef"`).
Set to `single`, `double`, or `null`. Defaults to `null` (no quotes unless
required due to whitespace within the property).

### stringQuotes

How string literals should be quoted (e.g., `"abc"`). Set to `single`
or `double`. Defaults to 'single'.

### `objectFieldSeparator`

For object properties, specify whether a "semicolon", "comma", "linebreak",
"semicolon-and-linebreak", or "comma-and-linebreak" should be used after
each object property-value pair.

Defaults to `null` which is equivalent to "semicolon".

### `objectFieldIndent`

Indicates the whitespace to be added on each line preceding an object
property-value field. Defaults to the empty string.

### `separatorForSingleObjectField`

Whether to apply the `objectFieldSeparator` when there is only one
property-value object field present. Defaults to `false`.

|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|false|
|Settings||
|Options|`arrayBrackets`, `enableFixer`, `genericDot`, `objectFieldIndent`, `objectFieldQuote`, `objectFieldSeparator`, `propertyQuotes`, `separatorForSingleObjectField`, `stringQuotes`|

## Failing examples

<!-- assertions-failing typeFormatting -->

## Passing examples

<!-- assertions-passing typeFormatting -->
