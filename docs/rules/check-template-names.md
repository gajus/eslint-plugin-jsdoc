<a name="user-content-check-template-names"></a>
<a name="check-template-names"></a>
# <code>check-template-names</code>

Checks that any `@template` names are actually used in the connected
`@typedef`, `@callback`, `@function` or type structure.

Currently checks `ClassDeclaration`, `FunctionDeclaration`,
`TSInterfaceDeclaration` or `TSTypeAliasDeclaration` such as:

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

````ts
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

/**
 * @template D
 * @template V
 */
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
// Message: @template D not in use

/**
 * @template D
 * @template V
 */
export class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
// Message: @template D not in use

/**
 * @template D
 * @template V
 */
export default class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
// Message: @template D not in use

/**
 * @template D
 * @template V
 */
export default class <NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
// Message: @template D not in use

/**
 * @template D
 * @template V
 * @callback
 * @returns {[X, Y | undefined]}
 */
// Message: @template D not in use

/**
 * @template D
 * @template V
 * @function
 * @returns {[X, Y | undefined]}
 */
// Message: @template D not in use

/**
 * @template D
 * @template V
 * @function
 * @param {[X, Y | undefined]} someParam
 */
// Message: @template D not in use

/**
 * @template
 */
// Settings: {"jsdoc":{"tagNamePreference":{"template":false}}}
// Message: Unexpected tag `@template`
````



<a name="user-content-check-template-names-passing-examples"></a>
<a name="check-template-names-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
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

/**
 * @template NumType
 */
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

/**
 * @template NumType
 */
export class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

/**
 * @template NumType
 */
export default class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

/**
 * @template NumType
 */
export default class <NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

/**
 * Uses the provided callback to group the given array into the keys of a map.
 * Based on the array grouping proposal: https://github.com/tc39/proposal-array-grouping/
 *
 * @template T
 * @param {T[]} array
 * @param {(value: T, index: number) => string} callbackFn
 * @returns {Map<string, T[]>}
 */
export function mapGroupBy(array, callbackFn) {
}

/**
 * @template D
 * @template V
 * @callback
 * @returns {[D, V | undefined]}
 */

/**
 * @template D
 * @template V
 * @function
 * @returns {[D, V | undefined]}
 */

/**
 * @template D
 * @template V
 * @function
 * @param {[D, V | undefined]} someParam
 */

/**
 * @template {string} U
 */
export class User {
  /**
   * @type {U}
   */
  name;
}

/**
 * @template {string} U
 */
export class User {
  /**
   * @param {U} name
   */
  constructor(name) {
    this.name = name;
  }
  methodToIgnore() {}
}

/**
 * @template [ChannelDataType=undefined]
 * @param {string} messageType - A key used for sending and receiving messages.
 * @returns {MessageChannel<ChannelDataType>} A channel that can create messages of its
 * own type.
 */
export function createMessageChannel(messageType) {
  // Note: It should also infer the type if the new channel is returned
  // directly rather than returned as a typed variable.

  /** @type {MessageChannel<ChannelDataType>} */
  const messageChannel = new MessageChannel(messageType);

  return messageChannel;
}
````

