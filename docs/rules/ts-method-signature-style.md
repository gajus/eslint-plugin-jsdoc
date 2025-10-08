<a name="user-content-ts-method-signature-style"></a>
<a name="ts-method-signature-style"></a>
# <code>ts-method-signature-style</code>

Inspired by `typescript-eslint`'s [method-signature-style](https://typescript-eslint.io/rules/method-signature-style/) rule.

See that rule for the rationale behind preferring the function
property.

<a name="user-content-ts-method-signature-style-options"></a>
<a name="ts-method-signature-style-options"></a>
## Options

The first option is a string with the following possible values: "method", "property".


The next option is an object with the following properties.

<a name="user-content-ts-method-signature-style-options-enablefixer"></a>
<a name="ts-method-signature-style-options-enablefixer"></a>
### <code>enableFixer</code>

Whether to enable the fixer. Defaults to `true`.


|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|false|
|Settings||
|Options|string ("method", "property") followed by object with `enableFixer`|

<a name="user-content-ts-method-signature-style-failing-examples"></a>
<a name="ts-method-signature-style-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param {{
 *   func(arg: string): number
 * }} someName
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "property"]
// Message: Found method signature; prefer function property.

/**
 * @param {{
 *   func(arg: string): number
 * }} someName
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "property",{"enableFixer":false}]
// Message: Found method signature; prefer function property.

/**
 * @param {{
 *   func(arg: number): void
 *   func(arg: string): void
 *   func(arg: boolean): void
 * }} someName
 */
// Message: Found method signature; prefer function property.

/**
 * @param {{
 *   func: (arg: string) => number
 * }} someName
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "method"]
// Message: Found function property; prefer method signature.

/**
 * @param {{
 *   func: (arg: string) => number
 * }} someName
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "method",{"enableFixer":false}]
// Message: Found function property; prefer method signature.

/**
 * @type {{
 *   func: ((arg: number) => void) &
 *     ((arg: string) => void) &
 *     ((arg: boolean) => void)
 * }}
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "method"]
// Message: Found function property; prefer method signature.

/**
 * @param {{
 *   func: ((arg: number) => void) &
 *     ((arg: string) => void) &
 *     ((arg: boolean) => void)
 * }} someName
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "method",{"enableFixer":false}]
// Message: Found function property; prefer method signature.

/**
 * @param {{
 *   "func"(arg: string): number
 * }} someName
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "property"]
// Message: Found method signature; prefer function property.

/**
 * @param {{
 *   'func': (arg: string) => number
 * }} someName
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "method"]
// Message: Found function property; prefer method signature.

/** @type {{
 *   func: ((arg: number) => void) &
 *     ((arg: string) => void) &
 *     ((arg: boolean) => void)
 * }}
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "method"]
// Message: Found function property; prefer method signature.
````



<a name="user-content-ts-method-signature-style-passing-examples"></a>
<a name="ts-method-signature-style-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {{
 *   func: (arg: string) => number
 * }}
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "property"]

/**
 * @param {{
 *   func: ((arg: number) => void) &
 *     ((arg: string) => void) &
 *     ((arg: boolean) => void)
 * }}
 */

/**
 * @param {abc<}
 */

/**
 * @param {{
 *   func: ((arg: number) => void) & (SomeType)
 * }}
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "method"]
````

