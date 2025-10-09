<a name="user-content-ts-prefer-function-type"></a>
<a name="ts-prefer-function-type"></a>
# <code>ts-prefer-function-type</code>

Inspired by `typescript-eslint`'s [prefer-function-type](https://typescript-eslint.io/rules/prefer-function-type/) rule.

Chooses the more succinct function property over a call signature if there are
no other properties on the signature.

<a name="user-content-ts-prefer-function-type-options"></a>
<a name="ts-prefer-function-type-options"></a>
## Options

A single options object has the following properties.

<a name="user-content-ts-prefer-function-type-options-enablefixer"></a>
<a name="ts-prefer-function-type-options-enablefixer"></a>
### <code>enableFixer</code>

Whether to enable the fixer or not


|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|false|
|Settings||
|Options|`enableFixer`|

<a name="user-content-ts-prefer-function-type-failing-examples"></a>
<a name="ts-prefer-function-type-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param {{
 *   (arg: string): void;
 * }} someName
 */
// Message: Call signature found; function type preferred.

/**
 * @param {{
 *   (arg: string): void;
 * }} someName
 */
// "jsdoc/ts-prefer-function-type": ["error"|"warn", {"enableFixer":false}]
// Message: Call signature found; function type preferred.

/**
 * @param {(string | {
 *   (arg: string): void;
 * })} someName
 */
// Message: Call signature found; function type preferred.
````



<a name="user-content-ts-prefer-function-type-passing-examples"></a>
<a name="ts-prefer-function-type-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {() => number} someName
 */

/**
 * @param {{
 *   (arg: string): void;
 *   abc: number;
 * }} someName
 */

/**
 * @param {{
 *   (data: string): number;
 *   (id: number): string;
 * }} someName
 */

/**
 * @param {BadType<} someName
 */
````

