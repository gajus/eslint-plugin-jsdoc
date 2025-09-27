<a name="user-content-type-formatting"></a>
<a name="type-formatting"></a>
# <code>type-formatting</code>

Formats JSDoc type values.

Note that this rule should be considered **experimental**. The stringification
might not preserve other aspects of your original formatting and there could be
errors.

Currently offers the following options for formatting types.

<a name="user-content-type-formatting-options"></a>
<a name="type-formatting-options"></a>
## Options

A single options object has the following properties.

<a name="user-content-type-formatting-options-arraybrackets"></a>
<a name="type-formatting-options-arraybrackets"></a>
### <code>arrayBrackets</code>

Determines how array generics are represented. Set to `angle` for the style `Array<type>` or `square` for the style `type[]`. Defaults to "square".

<a name="user-content-type-formatting-options-enablefixer"></a>
<a name="type-formatting-options-enablefixer"></a>
### <code>enableFixer</code>

Whether to enable the fixer. Defaults to `true`.

<a name="user-content-type-formatting-options-genericdot"></a>
<a name="type-formatting-options-genericdot"></a>
### <code>genericDot</code>

Boolean value of whether to use a dot before the angled brackets of a generic (e.g., `SomeType.<AnotherType>`). Defaults to `false`.

<a name="user-content-type-formatting-options-objectfieldindent"></a>
<a name="type-formatting-options-objectfieldindent"></a>
### <code>objectFieldIndent</code>

A string indicating the whitespace to be added on each line preceding an
object property-value field. Defaults to the empty string.

<a name="user-content-type-formatting-options-objectfieldquote"></a>
<a name="type-formatting-options-objectfieldquote"></a>
### <code>objectFieldQuote</code>

Whether and how object field properties should be quoted (e.g., `{"a": string}`).
Set to `single`, `double`, or `null`. Defaults to `null` (no quotes unless
required due to special characters within the field). Digits will be kept as is,
regardless of setting (they can either represent a digit or a string digit).

<a name="user-content-type-formatting-options-objectfieldseparator"></a>
<a name="type-formatting-options-objectfieldseparator"></a>
### <code>objectFieldSeparator</code>

For object properties, specify whether a "semicolon", "comma", "linebreak",
"semicolon-and-linebreak", or "comma-and-linebreak" should be used after
each object property-value pair.

Defaults to `"comma"`.

<a name="user-content-type-formatting-options-objectfieldseparatoroptionallinebreak"></a>
<a name="type-formatting-options-objectfieldseparatoroptionallinebreak"></a>
### <code>objectFieldSeparatorOptionalLinebreak</code>

Whether `objectFieldSeparator` set to `"semicolon-and-linebreak"` or
`"comma-and-linebreak"` should be allowed to optionally drop the linebreak.

Defaults to `true`.

<a name="user-content-type-formatting-options-objectfieldseparatortrailingpunctuation"></a>
<a name="type-formatting-options-objectfieldseparatortrailingpunctuation"></a>
### <code>objectFieldSeparatorTrailingPunctuation</code>

If `separatorForSingleObjectField` is not in effect (i.e., if it is `false`
or there are multiple property-value object fields present), this property
will determine whether to add punctuation corresponding to the
`objectFieldSeparator` (e.g., a semicolon) to the final object field.
Defaults to `false`.

<a name="user-content-type-formatting-options-separatorforsingleobjectfield"></a>
<a name="type-formatting-options-separatorforsingleobjectfield"></a>
### <code>separatorForSingleObjectField</code>

Whether to apply the `objectFieldSeparator` (e.g., a semicolon) when there
is only one property-value object field present. Defaults to `false`.

<a name="user-content-type-formatting-options-stringquotes"></a>
<a name="type-formatting-options-stringquotes"></a>
### <code>stringQuotes</code>

How string literals should be quoted (e.g., `"abc"`). Set to `single`
or `double`. Defaults to 'single'.

<a name="user-content-type-formatting-options-typebracketspacing"></a>
<a name="type-formatting-options-typebracketspacing"></a>
### <code>typeBracketSpacing</code>

A string of spaces that will be added immediately after the type's initial
curly bracket and immediately before its ending curly bracket. Defaults
to the empty string.

<a name="user-content-type-formatting-options-unionspacing"></a>
<a name="type-formatting-options-unionspacing"></a>
### <code>unionSpacing</code>

Determines the spacing to add to unions (`|`). Defaults to a single space (`" "`).


|||
|---|---|
|Context|everywhere|
|Tags|`param`, `property`, `returns`, `this`, `throws`, `type`, `typedef`, `yields`|
|Recommended|false|
|Settings|`mode`|
|Options|`arrayBrackets`, `enableFixer`, `genericDot`, `objectFieldIndent`, `objectFieldQuote`, `objectFieldSeparator`, `objectFieldSeparatorOptionalLinebreak`, `objectFieldSeparatorTrailingPunctuation`, `separatorForSingleObjectField`, `stringQuotes`, `typeBracketSpacing`, `unionSpacing`|

<a name="user-content-type-formatting-failing-examples"></a>
<a name="type-formatting-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param {{a: string; b: number; c: boolean,}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"semicolon"}]
// Message: Inconsistent semicolon separator usage

/**
 * @param {{a: string; b: number; c: boolean,}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"semicolon","objectFieldSeparatorTrailingPunctuation":true}]
// Message: Inconsistent semicolon separator usage

/**
 * @param {{a: string; b: number; c: boolean,}} cfg
 */
// Settings: {"jsdoc":{"mode":"permissive"}}
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"semicolon"}]
// Message: Inconsistent semicolon separator usage

/**
 * @param {{a: string; b: number; c: boolean,}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"enableFixer":false,"objectFieldSeparator":"semicolon"}]
// Message: Inconsistent semicolon separator usage

/**
 * @param {{a: string, b: number; c: boolean;}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"comma"}]
// Message: Inconsistent comma separator usage

/**
 * @param {{a: string, b: number; c: boolean,}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"linebreak"}]
// Message: Inconsistent linebreak separator usage

/**
 * @param {{
 *   a: string,
 *   b: number;
 *   c: boolean,
 * }} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"linebreak"}]
// Message: Inconsistent linebreak separator usage

/**
 * @param {'abc'} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"stringQuotes":"double"}]
// Message: Inconsistent double string quotes usage

/**
 * @param {Array<string>} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"arrayBrackets":"square"}]
// Message: Array bracket style should be square

/**
 * @param {SomeType<string>} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"genericDot":true}]
// Message: Dot usage should be true

/**
 * @param {{a: string}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldQuote":"double"}]
// Message: Inconsistent object field quotes double

/**
 * @param {{"a": string}} cfg
 */
// Message: Inconsistent object field quotes null

/**
 * @param {{a: string}} cfg A long
 *   description
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"semicolon","separatorForSingleObjectField":true}]
// Message: Inconsistent semicolon separator usage

/** @param {{a: string, b: number; c: boolean,}} cfg */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"linebreak"}]
// Message: Inconsistent linebreak separator usage

/**
 * @param {{a: string, b: number; c: boolean,}} cfg */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"linebreak"}]
// Message: Inconsistent linebreak separator usage

/** @param {{a: string, b: number; c: boolean,}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"linebreak"}]
// Message: Inconsistent linebreak separator usage

/**
 * @param {{
 *   a: string,
 *   b: number
 * }} cfg A long
 *   description
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"semicolon-and-linebreak"}]
// Message: Inconsistent semicolon-and-linebreak separator usage

/**
 * @param {{
 *   a: string,
 *   b: number
 * }} cfg A long
 *   description
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"semicolon-and-linebreak","objectFieldSeparatorTrailingPunctuation":true}]
// Message: Inconsistent semicolon-and-linebreak separator usage

/**
 * @param {ab | cd} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"unionSpacing":""}]
// Message: Inconsistent "" union spacing usage

/**
 * Due to jsdoc-type-pratt-parser not consuming whitespace, the exact
 *   error will not be reported.
 * @param {ab|cd} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"unionSpacing":" "}]
// Message: There was an error with type formatting

/**
 * Due to jsdoc-type-pratt-parser representing the separator at the
 *   object level, the exact error will not be reported.
 * @param {{a: string, b: number; c: boolean,}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"comma"}]
// Message: There was an error with type formatting

/**
 * @type {string}
 */
// "jsdoc/type-formatting": ["error"|"warn", {"typeBracketSpacing":" "}]
// Message: Must have initial and final " " spacing

/**
 * @type { string }
 */
// "jsdoc/type-formatting": ["error"|"warn", {"typeBracketSpacing":""}]
// Message: Must have no initial spacing

/**
 * @param {{a: string, b: number}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"semicolon-and-linebreak","objectFieldSeparatorOptionalLinebreak":true}]
// Message: Inconsistent semicolon-and-linebreak separator usage

/**
 * @param {{
 *   a: string,
 *   b: number
 * }} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"semicolon-and-linebreak","objectFieldSeparatorOptionalLinebreak":true}]
// Message: Inconsistent semicolon-and-linebreak separator usage
````



<a name="user-content-type-formatting-passing-examples"></a>
<a name="type-formatting-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {{a: string; b: number; c: boolean}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"semicolon"}]

/**
 * @param {"abc"} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"stringQuotes":"double"}]

/**
 * @param {string[]} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"arrayBrackets":"square"}]

/**
 * @param {SomeType.<string>} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"genericDot":true}]

/**
 * @param {A<} badParam
 */

/**
 * @param {{"a bc": string}} quotedKeyParam
 */

/**
 * @param {{55: string}} quotedKeyParam
 */

/**
 * @param {{"a-b-c": string}} quotedKeyParam
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldQuote":null}]

/**
 * @param {{55: string}} quotedKeyParam
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldQuote":"double"}]

/**
 * @param {ab | cd} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"unionSpacing":" "}]

/**
 * @param {ab|cd} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"unionSpacing":""}]

/**
 * @param cfg
 */

/**
 * @param {{a: string; b: number}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"semicolon-and-linebreak","objectFieldSeparatorOptionalLinebreak":true}]

/**
 * @param {{
 *   a: string;
 *   b: number
 * }} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"semicolon-and-linebreak","objectFieldSeparatorOptionalLinebreak":true}]
````

