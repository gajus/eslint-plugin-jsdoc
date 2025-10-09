<a name="user-content-ts-no-empty-object-type"></a>
<a name="ts-no-empty-object-type"></a>
# <code>ts-no-empty-object-type</code>

Warns against use of the empty object type which, in TypeScript,
means "any value that is defined".

<a name="user-content-ts-no-empty-object-type-options"></a>
<a name="ts-no-empty-object-type-options"></a>
## Options



|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|true|
|Settings||
|Options||

<a name="user-content-ts-no-empty-object-type-failing-examples"></a>
<a name="ts-no-empty-object-type-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param {{}} someName
 */
// Message: No empty object type.

/**
 * @param {(string|{})} someName
 */
// Message: No empty object type.
````



<a name="user-content-ts-no-empty-object-type-passing-examples"></a>
<a name="ts-no-empty-object-type-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {{a: string}} someName
 */

/**
 * @param {({a: string} & {b: number})} someName
 */

/**
 * @param {BadType<} someName
 */

/**
 * @param {{}} someName
 */
// Settings: {"jsdoc":{"mode":"jsdoc"}}
````

