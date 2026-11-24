<a name="user-content-ts-no-unnecessary-template-expression"></a>
<a name="ts-no-unnecessary-template-expression"></a>
# <code>ts-no-unnecessary-template-expression</code>

Catches unnecessary template expressions such as string expressions within
a template literal.

<a name="user-content-ts-no-unnecessary-template-expression-options"></a>
<a name="ts-no-unnecessary-template-expression-options"></a>
## Options

A single options object has the following properties.

<a name="user-content-ts-no-unnecessary-template-expression-options-enablefixer"></a>
<a name="ts-no-unnecessary-template-expression-options-enablefixer"></a>
### <code>enableFixer</code>

Whether to enable the fixer. Defaults to `true`.


|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|false|
|Settings||
|Options|`enableFixer`|

<a name="user-content-ts-no-unnecessary-template-expression-failing-examples"></a>
<a name="ts-no-unnecessary-template-expression-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @type {`A${'B'}`}
 */
// Message: Found an unnecessary string literal within a template.

/**
 * @type {`A${'B'}`}
 */
// "jsdoc/ts-no-unnecessary-template-expression": ["error"|"warn", {"enableFixer":false}]
// Message: Found an unnecessary string literal within a template.

/**
 * @type {(`A${'B'}`)}
 */
// Message: Found an unnecessary string literal within a template.

/**
 * @type {`A${'B'}`|SomeType}
 */
// Message: Found an unnecessary string literal within a template.

/**
 * @type {`${B}`}
 */
// Message: Found a lone template expression within a template.

/**
 * @type {`${B}`}
 */
// "jsdoc/ts-no-unnecessary-template-expression": ["error"|"warn", {"enableFixer":false}]
// Message: Found a lone template expression within a template.

/**
 * @type {`A${'B'}${'C'}`}
 */
// Message: Found an unnecessary string literal within a template.

/**
 * @type {`A${'B'}C`}
 */
// Message: Found an unnecessary string literal within a template.

/**
 * @type {`${'B'}`}
 */
// Message: Found an unnecessary string literal within a template.

/**
 * @type {(`${B}`)}
 */
// Message: Found a lone template expression within a template.

/**
 * @type {`${B}` | number}
 */
// Message: Found a lone template expression within a template.

/**
 * @type {`${A | B}` & C}
 */
// Message: Found a lone template expression within a template.

/**
 * @type {`${T extends U ? A : B}`[]}
 */
// Message: Found a lone template expression within a template.

/**
 * @type {`${T extends U ? A : B}` | C}
 */
// Message: Found a lone template expression within a template.

/**
 * @type {Record<`${A | B}`, string>}
 */
// Message: Found a lone template expression within a template.

/**
 * @type {`${A | B}` | C}
 */
// Message: Found a lone template expression within a template.

/**
 * @type {(`${A | B}`)}
 */
// Message: Found a lone template expression within a template.
````



<a name="user-content-ts-no-unnecessary-template-expression-passing-examples"></a>
<a name="ts-no-unnecessary-template-expression-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @type {`AB`}
 */

/**
 * @type {`A${C}B`}
 */

/**
 * @param {BadType<} someName
 */

/**
 * @param {`A${'B'}`} someName
 */
// Settings: {"jsdoc":{"mode":"jsdoc"}}

/**
 * @typedef {object} NumericStrings
 * @property {`${number}`} a
 * @property {Record<`${bigint}`, string>} b
 * @property {`${1}`} c
 * @property {`${null}`} d
 * @property {`${undefined}`} e
 * @property {`${boolean}`} f
 * @property {`${true}`} g
 * @property {`${any}`} h
 * @property {`${keyof T}`} i
 * @property {`${number | B}`} j
 */
````

