<a name="user-content-require-template"></a>
<a name="require-template"></a>
# <code>require-template</code>

Checks to see that `@template` tags are present for any detected type
parameters.

Currently checks `ClassDeclaration`, `FunctionDeclaration`, `TSDeclareFunction`,
`TSInterfaceDeclaration` or `TSTypeAliasDeclaration` such as:

```ts
export type Pairs<D, V> = [D, V | undefined];
```

or

```js
/**
 * @typedef {[D, V | undefined]} Pairs
 */
```

Note that in the latter TypeScript-flavor JavaScript example, there is no way
for us to firmly distinguish between `D` and `V` as type parameters or as some
other identifiers, so we use an algorithm that assumes that any single capital
letters are templates.

<a name="user-content-require-template-options"></a>
<a name="require-template-options"></a>
## Options

A single options object has the following properties.

<a name="user-content-require-template-options-exemptedby"></a>
<a name="require-template-options-exemptedby"></a>
### <code>exemptedBy</code>

Array of tags (e.g., `['type']`) whose presence on the document
block avoids the need for a `@template`. Defaults to an array with
`inheritdoc`. If you set this array, it will overwrite the default,
so be sure to add back `inheritdoc` if you wish its presence to cause
exemption of the rule.

<a name="user-content-require-template-options-requireseparatetemplates"></a>
<a name="require-template-options-requireseparatetemplates"></a>
### <code>requireSeparateTemplates</code>

Requires that each template have its own separate line, i.e., preventing
templates of this format:

```js
/**
 * @template T, U, V
 */
```

Defaults to `false`.


|||
|---|---|
|Context|everywhere|
|Tags|`template`|
|Recommended|false|
|Settings||
|Options|`exemptedBy`, `requireSeparateTemplates`|

<a name="user-content-require-template-failing-examples"></a>
<a name="require-template-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 *
 */
type Pairs<D, V> = [D, V | undefined];
// Message: Missing @template D

/**
 *
 */
export type Pairs<D, V> = [D, V | undefined];
// Message: Missing @template D

/**
 * @typedef {[D, V | undefined]} Pairs
 */
// Message: Missing @template D

/**
 * @typedef {[D, V | undefined]} Pairs
 */
// Settings: {"jsdoc":{"mode":"permissive"}}
// Message: Missing @template D

/**
 * @template D, U
 */
export type Extras<D, U, V> = [D, U, V | undefined];
// Message: Missing @template V

/**
 * @template D, U
 * @typedef {[D, U, V | undefined]} Extras
 */
// Message: Missing @template V

/**
 * @template D, V
 */
export type Pairs<D, V> = [D, V | undefined];
// "jsdoc/require-template": ["error"|"warn", {"requireSeparateTemplates":true}]
// Message: Missing separate @template for V

/**
 * @template D, V
 * @typedef {[D, V | undefined]} Pairs
 */
// "jsdoc/require-template": ["error"|"warn", {"requireSeparateTemplates":true}]
// Message: Missing separate @template for V

/**
 * @template X
 * @typedef {object} Pairs
 * @property {D} foo
 * @property {X} bar
 */
// Message: Missing @template D

/**
 *
 */
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}
// Message: Missing @template Type

/**
 *
 */
export interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}
// Message: Missing @template Type

/**
 *
 */
export default interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}
// Message: Missing @template Type

/**
 *
 */
function identity<Type>(arg: Type): Type {
  return arg;
}
// Message: Missing @template Type

/**
 *
 */
export function identity<Type>(arg: Type): Type {
  return arg;
}
// Message: Missing @template Type

/**
 *
 */
export default function identity<Type>(arg: Type): Type {
  return arg;
}
// Message: Missing @template Type

/**
 *
 */
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
// Message: Missing @template NumType

/**
 *
 */
export class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
// Message: Missing @template NumType

/**
 *
 */
export default class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
// Message: Missing @template NumType

/**
 *
 */
export default class <NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
// Message: Missing @template NumType

/**
 * @callback
 * @param {[D, V | undefined]} someParam
 */
// Message: Missing @template D

/**
 * @callback
 * @returns {[D, V | undefined]}
 */
// Message: Missing @template D

/**
 * @param bar
 * @param baz
 * @returns
 */
function foo<T>(bar: T, baz: number): T;
function foo<T>(bar: T, baz: boolean): T;
function foo<T>(bar: T, baz: number | boolean): T {
  return bar;
}
// Message: Missing @template T

/**
 * @template
 */
// Settings: {"jsdoc":{"tagNamePreference":{"template":false}}}
// Message: Unexpected tag `@template`
````



<a name="user-content-require-template-passing-examples"></a>
<a name="require-template-passing-examples"></a>
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
 * @typedef {object} Pairs
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
 * @callback
 * @template D
 * @template V
 * @param {[D, V | undefined]} someParam
 */

/**
 * @callback
 * @template D
 * @template V
 * @returns {[D, V | undefined]}
 */

/**
 * @callback
 * @returns {[Something | undefined]}
 */

/**
 * @template {string | Buffer} [T=string, U=number]
 * @typedef {object} Dirent
 * @property {T} name name
 * @property {U} aNumber number
 * @property {string} parentPath path
 */

/**
 * @type {Something}
 */
type Pairs<D, V> = [D, V | undefined];
// "jsdoc/require-template": ["error"|"warn", {"exemptedBy":["type"]}]

/**
 * @inheritdoc
 * @typedef {[D, V | undefined]} Pairs
 */
// "jsdoc/require-template": ["error"|"warn", {"exemptedBy":["inheritdoc"]}]

/**
 * Test interface for type definitions.
 *
 * @typeParam Foo - dummy type param
 */
export interface Test<Foo extends string> {
  /**
   *
   */
  bar: Foo;
}
// Settings: {"jsdoc":{"tagNamePreference":{"template":"typeParam"}}}

/**
 * @template T
 * @typedef {T extends Record<string, Record<string, infer F>> ? F : never} ExtractFunction
 */
````

