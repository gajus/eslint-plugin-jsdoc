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
required due to special characters within the field). Digits will be kept as is,
regardless of setting (they can either represent a digit or a string digit).

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

Defaults to `"comma"`.

### `objectFieldSeparatorOptionalLinebreak`

Whether `objectFieldSeparator` set to `"semicolon-and-linebreak"` or
`"comma-and-linebreak"` should be allowed to optionally drop the linebreak.

Defaults to `true`.

### `objectFieldIndent`

A string indicating the whitespace to be added on each line preceding an
object property-value field. Defaults to the empty string.

### `objectFieldSeparatorTrailingPunctuation`

If `separatorForSingleObjectField` is not in effect (i.e., if it is `false`
or there are multiple property-value object fields present), this property
will determine whether to add punctuation corresponding to the
`objectFieldSeparator` (e.g., a semicolon) to the final object field.
Defaults to `false`.

### `separatorForSingleObjectField`

Whether to apply the `objectFieldSeparator` (e.g., a semicolon) when there
is only one property-value object field present. Defaults to `false`.

### `typeBracketSpacing`

A string of spaces that will be added immediately after the type's initial
curly bracket and immediately before its ending curly bracket. Defaults
to the empty string.

### `unionSpacing`

Determines the spacing to add to unions (`|`). Defaults to a single space (`" "`).

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
