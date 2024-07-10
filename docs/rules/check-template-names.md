<a name="user-content-check-template-names"></a>
<a name="check-template-names"></a>
# <code>check-template-names</code>

Checks that any `@template` names are actually used in the connected
`@typedef` or type alias.

Currently checks `TSTypeAliasDeclaration` such as:

```ts
/**
 * @template D
 * @template V
 */
export type Pairs<D, V> = [D, V | undefined];
```

or

```js
/**
 * @template D
 * @template V
 * @typedef {[D, V | undefined]} Pairs
 */
```

|||
|---|---|
|Context|everywhere|
|Tags|`@template`|
|Recommended|false|
|Settings||
|Options||

<a name="user-content-check-template-names-failing-examples"></a>
<a name="check-template-names-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @template D
 * @template V
 */
type Pairs<X, Y> = [X, Y | undefined];
// Message: @template D not in use

/**
 * @template D
 * @template V
 */
export type Pairs<X, Y> = [X, Y | undefined];
// Message: @template D not in use

/**
 * @template D
 * @template V
 * @typedef {[X, Y | undefined]} Pairs
 */
// Message: @template D not in use

/**
 * @template D
 * @template V
 */
export type Pairs = [number, undefined];
// Message: @template D not in use

/**
 * @template D
 * @template V
 * @typedef {[undefined]} Pairs
 */
// Settings: {"jsdoc":{"mode":"permissive"}}
// Message: @template D not in use

/**
 * @template D, U, V
 */
export type Extras<D, U> = [D, U | undefined];
// Message: @template V not in use

/**
 * @template D, U, V
 * @typedef {[D, U | undefined]} Extras
 */
// Message: @template V not in use
````



<a name="user-content-check-template-names-passing-examples"></a>
<a name="check-template-names-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @template D
 * @template V
 */
export type Pairs<D, V> = [D, V | undefined];

/**
 * @template D
 * @template V
 * @typedef {[D, V | undefined]} Pairs
 */

/**
 * @template D, U, V
 */
export type Extras<D, U, V> = [D, U, V | undefined];

/**
 * @template D, U, V
 * @typedef {[D, U, V | undefined]} Extras
 */

/**
 * @template X
 * @typedef {[D, U, V | undefined]} Extras
 * @typedef {[D, U, V | undefined]} Extras
 */
````

