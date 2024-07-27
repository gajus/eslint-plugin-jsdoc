<a name="user-content-check-template-names"></a>
<a name="check-template-names"></a>
# <code>check-template-names</code>

Checks that any `@template` names are actually used in the connected
`@typedef` or type alias.

Currently checks `FunctionDeclaration`, `TSInterfaceDeclaration` or
`TSTypeAliasDeclaration` such as:

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

/**
 * @template D
 * @template V
 * @typedef Pairs
 * @property {V} foo
 */
// Message: @template D not in use

/**
 * @template D
 * @template V
 */
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}
// Message: @template D not in use

/**
 * @template D
 * @template V
 */
export interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}
// Message: @template D not in use

/**
 * @template D
 * @template V
 */
export default interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}
// Message: @template D not in use

/**
 * @template D
 * @template V
 */
function identity<Type>(arg: Type): Type {
  return arg;
}
// Message: @template D not in use

/**
 * @template D
 * @template V
 */
export function identity<Type>(arg: Type): Type {
  return arg;
}
// Message: @template D not in use

/**
 * @template D
 * @template V
 */
export default function identity<Type>(arg: Type): Type {
  return arg;
}
// Message: @template D not in use
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

/**
 * @typedef Foo
 * @prop {string} bar
 */

/**
 * @template D
 * @template V
 * @typedef Pairs
 * @property {D} foo
 * @property {V} bar
 */

/**
 * @template Type
 */
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

/**
 * @template Type
 */
export interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

/**
 * @template Type
 */
export default interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

/**
 * @template Type
 */
function identity<Type>(arg: Type): Type {
  return arg;
}

/**
 * @template Type
 */
export function identity<Type>(arg: Type): Type {
  return arg;
}

/**
 * @template Type
 */
export default function identity<Type>(arg: Type): Type {
  return arg;
}
````

