<a name="user-content-require-param"></a>
<a name="require-param"></a>
# <code>require-param</code>

* [Fixer](#user-content-require-param-fixer)
    * [Destructured object and array naming](#user-content-require-param-fixer-destructured-object-and-array-naming)
    * [Missing root fixing](#user-content-require-param-fixer-missing-root-fixing)
    * [Rest Element (`RestElement`) insertions](#user-content-require-param-fixer-rest-element-restelement-insertions)
    * [Object Rest Property insertions](#user-content-require-param-fixer-object-rest-property-insertions)
* [Options](#user-content-require-param-options)
    * [`enableFixer`](#user-content-require-param-options-enablefixer)
    * [`enableRootFixer`](#user-content-require-param-options-enablerootfixer)
    * [`enableRestElementFixer`](#user-content-require-param-options-enablerestelementfixer)
    * [`checkRestProperty`](#user-content-require-param-options-checkrestproperty)
    * [`autoIncrementBase`](#user-content-require-param-options-autoincrementbase)
    * [`unnamedRootBase`](#user-content-require-param-options-unnamedrootbase)
    * [`exemptedBy`](#user-content-require-param-options-exemptedby)
    * [`checkTypesPattern`](#user-content-require-param-options-checktypespattern)
    * [`contexts`](#user-content-require-param-options-contexts)
    * [`checkConstructors`](#user-content-require-param-options-checkconstructors)
    * [`checkGetters`](#user-content-require-param-options-checkgetters)
    * [`checkSetters`](#user-content-require-param-options-checksetters)
    * [`checkDestructured`](#user-content-require-param-options-checkdestructured)
    * [`checkDestructuredRoots`](#user-content-require-param-options-checkdestructuredroots)
    * [`useDefaultObjectProperties`](#user-content-require-param-options-usedefaultobjectproperties)
* [Context and settings](#user-content-require-param-context-and-settings)
* [Failing examples](#user-content-require-param-failing-examples)
* [Passing examples](#user-content-require-param-passing-examples)


Requires that all function parameters are documented.

<a name="user-content-require-param-fixer"></a>
<a name="require-param-fixer"></a>
## Fixer

Adds `@param <name>` for each tag present in the function signature but
missing in the jsdoc. Can be disabled by setting the `enableFixer`
option to `false`.

<a name="user-content-require-param-fixer-destructured-object-and-array-naming"></a>
<a name="require-param-fixer-destructured-object-and-array-naming"></a>
### Destructured object and array naming

When the fixer is applied to destructured objects, only the input name is
used.

So for:

```js
/**
 * @param cfg
 */
function quux ({foo: bar, baz: bax = 5}) {
}
```

...the fixed jsdoc will be:

```js
/**
* @param cfg
* @param cfg.foo
* @param cfg.baz
*/
```

This is because the input to the function is the relevant item for
understanding the function's input, not how the variable is renamed
for internal use (the signature itself documents that).

For destructured arrays, the input name is merely the array index.

So for:

```js
/**
 * @param cfg
 */
function quux ([foo, bar]) {
}
```

..the fixed jsdoc will be:

```js
/**
* @param cfg
* @param cfg."0"
* @param cfg."1"
*/
```

<a name="user-content-require-param-fixer-missing-root-fixing"></a>
<a name="require-param-fixer-missing-root-fixing"></a>
### Missing root fixing

Note that unless `enableRootFixer` (or `enableFixer`) is set to `false`,
missing roots will be added and auto-incremented. The default behavior
is for "root" to be auto-inserted for missing roots, followed by a
0-based auto-incrementing number.

So for:

```js
function quux ({foo}, {bar}, {baz}) {
}
```

...the default jsdoc that would be added if the fixer is enabled would be:

```js
/**
* @param root0
* @param root0.foo
* @param root1
* @param root1.bar
* @param root2
* @param root2.baz
*/
```

The name of "root" can be configured with `unnamedRootBase` (which also allows
cycling through a list of multiple root names before there is need for any
numeric component).

And one can have the count begin at another number (e.g., `1`) by changing
`autoIncrementBase` from the default of `0`.

<a name="user-content-require-param-fixer-rest-element-restelement-insertions"></a>
<a name="require-param-fixer-rest-element-restelement-insertions"></a>
### Rest Element (<code>RestElement</code>) insertions

The fixer will automatically report/insert
[jsdoc repeatable parameters](https://jsdoc.app/tags-param.html#multiple-types-and-repeatable-parameters)
if missing.

```js
/**
  * @param {GenericArray} cfg
  * @param {number} cfg."0"
 */
function baar ([a, ...extra]) {
  //
}
```

..becomes:

```js
/**
  * @param {GenericArray} cfg
  * @param {number} cfg."0"
  * @param {...any} cfg."1"
 */
function baar ([a, ...extra]) {
  //
}
```

Note that the type `any` is included since we don't know of any specific
type to use.

To disable such rest element insertions, set `enableRestElementFixer` to
`false`.

Note too that the following will be reported even though there is an item
corresponding to `extra`:

```js
/**
  * @param {GenericArray} cfg
  * @param {number} cfg."0"
  * @param {any} cfg."1"
 */
function baar ([a, ...extra]) {
  //
}
```

...because it does not use the `...` syntax in the type.

<a name="user-content-require-param-fixer-object-rest-property-insertions"></a>
<a name="require-param-fixer-object-rest-property-insertions"></a>
### Object Rest Property insertions

If the `checkRestProperty` option is set to `true` (`false` by default),
missing rest properties will be reported with documentation auto-inserted:

```js
/**
 * @param cfg
 * @param cfg.num
 */
function quux ({num, ...extra}) {
}
```

...becomes:

```js
/**
 * @param cfg
 * @param cfg.num
 * @param cfg.extra
 */
function quux ({num, ...extra}) {
}
```

You may wish to manually note in your jsdoc for `extra` that this is a
rest property, however, as jsdoc
[does not appear](https://github.com/jsdoc/jsdoc/issues/1773)
to currently support syntax or output to distinguish rest properties from
other properties, so in looking at the docs alone without looking at the
function signature, it may appear that there is an actual property named
`extra`.

<a name="user-content-require-param-options"></a>
<a name="require-param-options"></a>
## Options

An options object accepts the following optional properties:

<a name="user-content-require-param-options-enablefixer"></a>
<a name="require-param-options-enablefixer"></a>
### <code>enableFixer</code>

Whether to enable the fixer. Defaults to `true`.

<a name="user-content-require-param-options-enablerootfixer"></a>
<a name="require-param-options-enablerootfixer"></a>
### <code>enableRootFixer</code>

Whether to enable the auto-adding of incrementing roots (see the "Fixer"
section). Defaults to `true`. Has no effect if `enableFixer` is set to
`false`.

<a name="user-content-require-param-options-enablerestelementfixer"></a>
<a name="require-param-options-enablerestelementfixer"></a>
### <code>enableRestElementFixer</code>

Whether to enable the rest element fixer (see
"Rest Element (`RestElement`) insertions"). Defaults to `true`.

<a name="user-content-require-param-options-checkrestproperty"></a>
<a name="require-param-options-checkrestproperty"></a>
### <code>checkRestProperty</code>

If set to `true`, will report (and add fixer insertions) for missing rest
properties. Defaults to `false`.

If set to `true`, note that you can still document the subproperties of the
rest property using other jsdoc features, e.g., `@typedef`:

```js
/**
 * @typedef ExtraOptions
 * @property innerProp1
 * @property innerProp2
 */

/**
 * @param cfg
 * @param cfg.num
 * @param {ExtraOptions} extra
 */
function quux ({num, ...extra}) {
}
```

Setting this option to `false` (the default) may be useful in cases where
you already have separate `@param` definitions for each of the properties
within the rest property.

For example, with the option disabled, this will not give an error despite
`extra` not having any definition:

```js
/**
 * @param cfg
 * @param cfg.num
 */
function quux ({num, ...extra}) {
}
```

Nor will this:

```js
/**
 * @param cfg
 * @param cfg.num
 * @param cfg.innerProp1
 * @param cfg.innerProp2
 */
function quux ({num, ...extra}) {
}
```

<a name="user-content-require-param-options-autoincrementbase"></a>
<a name="require-param-options-autoincrementbase"></a>
### <code>autoIncrementBase</code>

Numeric to indicate the number at which to begin auto-incrementing roots.
Defaults to `0`.

<a name="user-content-require-param-options-unnamedrootbase"></a>
<a name="require-param-options-unnamedrootbase"></a>
### <code>unnamedRootBase</code>

An array of root names to use in the fixer when roots are missing. Defaults
to `['root']`. Note that only when all items in the array besides the last
are exhausted will auto-incrementing occur. So, with
`unnamedRootBase: ['arg', 'config']`, the following:

```js
function quux ({foo}, [bar], {baz}) {
}
```

...will get the following jsdoc block added:

```js
/**
* @param arg
* @param arg.foo
* @param config0
* @param config0."0" (`bar`)
* @param config1
* @param config1.baz
*/
```

<a name="user-content-require-param-options-exemptedby"></a>
<a name="require-param-options-exemptedby"></a>
### <code>exemptedBy</code>

Array of tags (e.g., `['type']`) whose presence on the document block
avoids the need for a `@param`. Defaults to an array with
`inheritdoc`. If you set this array, it will overwrite the default,
so be sure to add back `inheritdoc` if you wish its presence to cause
exemption of the rule.

<a name="user-content-require-param-options-checktypespattern"></a>
<a name="require-param-options-checktypespattern"></a>
### <code>checkTypesPattern</code>

When one specifies a type, unless it is of a generic type, like `object`
or `array`, it may be considered unnecessary to have that object's
destructured components required, especially where generated docs will
link back to the specified type. For example:

```js
/**
 * @param {SVGRect} bbox - a SVGRect
 */
export const bboxToObj = function ({x, y, width, height}) {
  return {x, y, width, height};
};
```

By default `checkTypesPattern` is set to
`/^(?:[oO]bject|[aA]rray|PlainObject|Generic(?:Object|Array))$/u`,
meaning that destructuring will be required only if the type of the `@param`
(the text between curly brackets) is a match for "Object" or "Array" (with or
without initial caps), "PlainObject", or "GenericObject", "GenericArray" (or
if no type is present). So in the above example, the lack of a match will
mean that no complaint will be given about the undocumented destructured
parameters.

Note that the `/` delimiters are optional, but necessary to add flags.

Defaults to using (only) the `u` flag, so to add your own flags, encapsulate
your expression as a string, but like a literal, e.g., `/^object$/ui`.

You could set this regular expression to a more expansive list, or you
could restrict it such that even types matching those strings would not
need destructuring.

<a name="user-content-require-param-options-contexts"></a>
<a name="require-param-options-contexts"></a>
### <code>contexts</code>

Set this to an array of strings representing the AST context (or an object with
`context` and `comment` properties) where you wish the rule to be applied.
Overrides the default contexts (see below). May be useful for adding such as
`TSMethodSignature` in TypeScript or restricting the contexts
which are checked.

See the ["AST and Selectors"](#user-content-eslint-plugin-jsdoc-advanced-ast-and-selectors)
section of our README for more on the expected format.

<a name="user-content-require-param-options-checkconstructors"></a>
<a name="require-param-options-checkconstructors"></a>
### <code>checkConstructors</code>

A value indicating whether `constructor`s should be checked. Defaults to
`true`.

<a name="user-content-require-param-options-checkgetters"></a>
<a name="require-param-options-checkgetters"></a>
### <code>checkGetters</code>

A value indicating whether getters should be checked. Defaults to `false`.

<a name="user-content-require-param-options-checksetters"></a>
<a name="require-param-options-checksetters"></a>
### <code>checkSetters</code>

A value indicating whether setters should be checked. Defaults to `false`.

<a name="user-content-require-param-options-checkdestructured"></a>
<a name="require-param-options-checkdestructured"></a>
### <code>checkDestructured</code>

Whether to require destructured properties. Defaults to `true`.

<a name="user-content-require-param-options-checkdestructuredroots"></a>
<a name="require-param-options-checkdestructuredroots"></a>
### <code>checkDestructuredRoots</code>

Whether to check the existence of a corresponding `@param` for root objects
of destructured properties (e.g., that for `function ({a, b}) {}`, that there
is something like `@param myRootObj` defined that can correspond to
the `{a, b}` object parameter).

If `checkDestructuredRoots` is `false`, `checkDestructured` will also be
implied to be `false` (i.e., the inside of the roots will not be checked
either, e.g., it will also not complain if `a` or `b` do not have their own
documentation). Defaults to `true`.

<a name="user-content-require-param-options-usedefaultobjectproperties"></a>
<a name="require-param-options-usedefaultobjectproperties"></a>
### <code>useDefaultObjectProperties</code>

Set to `true` if you wish to expect documentation of properties on objects
supplied as default values. Defaults to `false`.

<a name="user-content-require-param-context-and-settings"></a>
<a name="require-param-context-and-settings"></a>
## Context and settings

|          |                      |
| -------- | ----------------------------------------------------------------------------- |
| Context  | `ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled |
| Tags     | `param` |
| Aliases  | `arg`, `argument` |
|Recommended | true|
| Options  |`autoIncrementBase`, `checkConstructors`, `checkDestructured`, `checkDestructuredRoots`, `checkGetters`, `checkRestProperty`, `checkSetters`, `checkTypesPattern`, `contexts`, `enableFixer`, `enableRestElementFixer`, `enableRootFixer`, `exemptedBy`, `unnamedRootBase`, `useDefaultObjectProperties`|
| Settings | `ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

<a name="user-content-require-param-failing-examples"></a>
<a name="require-param-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 *
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 *
 */
function quux (foo) {

}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["FunctionDeclaration"]}]
// Message: Missing JSDoc @param "foo" declaration.

/**
 *
 */
function quux ({foo}) {

}
// Message: Missing JSDoc @param "root0" declaration.

/**
 * @param foo
 */
function quux (foo, bar, {baz}) {

}
// "jsdoc/require-param": ["error"|"warn", {"checkDestructured":false}]
// Message: Missing JSDoc @param "bar" declaration.

/**
 * @param foo
 */
function quux (foo, bar, {baz}) {

}
// "jsdoc/require-param": ["error"|"warn", {"checkDestructuredRoots":false}]
// Message: Missing JSDoc @param "bar" declaration.

/**
 *
 */
function quux ({foo}) {

}
// "jsdoc/require-param": ["error"|"warn", {"enableFixer":false}]
// Message: Missing JSDoc @param "root0" declaration.

/**
 *
 */
function quux ({foo: bar = 5} = {}) {

}
// Message: Missing JSDoc @param "root0" declaration.

/**
 * @param
 */
function quux ({foo}) {

}
// Message: Missing JSDoc @param "root0" declaration.

/**
 * @param
 */
function quux ({foo}) {

}
// "jsdoc/require-param": ["error"|"warn", {"autoIncrementBase":1}]
// Message: Missing JSDoc @param "root1" declaration.

/**
 * @param options
 */
function quux ({foo}) {

}
// Message: Missing JSDoc @param "options.foo" declaration.

/**
 * @param
 */
function quux ({ foo, bar: { baz }}) {

}
// Message: Missing JSDoc @param "root0" declaration.

/**
 *
 */
function quux ({foo}, {bar}) {

}
// "jsdoc/require-param": ["error"|"warn", {"unnamedRootBase":["arg"]}]
// Message: Missing JSDoc @param "arg0" declaration.

/**
 *
 */
function quux ({foo}, {bar}) {

}
// "jsdoc/require-param": ["error"|"warn", {"unnamedRootBase":["arg","config"]}]
// Message: Missing JSDoc @param "arg" declaration.

/**
 *
 */
function quux ({foo}, {bar}) {

}
// "jsdoc/require-param": ["error"|"warn", {"enableRootFixer":false,"unnamedRootBase":["arg","config"]}]
// Message: Missing JSDoc @param "arg" declaration.

/**
 *
 */
function quux (foo, bar) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @param foo
 */
function quux (foo, bar) {

}
// Message: Missing JSDoc @param "bar" declaration.

/**
 * @param bar
 */
function quux (foo, bar, baz) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @param foo
 * @param bar
 */
function quux (foo, bar, baz) {

}
// Message: Missing JSDoc @param "baz" declaration.

/**
 * @param baz
 */
function quux (foo, bar, baz) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @param
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}
// Message: Missing JSDoc @arg "foo" declaration.

/**
 * @param foo
 */
function quux (foo, bar) {

}
// Message: Missing JSDoc @param "bar" declaration.

/**
 * @override
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"overrideReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @ignore
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignoreReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @implements
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"implementsReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @augments
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @extends
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @override
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"overrideReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @ignore
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"ignoreReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @implements
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"implementsReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @augments
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @extends
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Message: Missing JSDoc @param "foo" declaration.

export class SomeClass {
  /**
   * @param property
   */
  constructor(private property: string, private foo: number) {}
}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @param
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`

/**
 *
 */
function quux ({bar, baz}, foo) {
}
// Message: Missing JSDoc @param "root0" declaration.

/**
 *
 */
function quux (foo, {bar, baz}) {
}
// Message: Missing JSDoc @param "foo" declaration.

/**
 *
 */
function quux ([bar, baz], foo) {
}
// Message: Missing JSDoc @param "root0" declaration.

/**
 *
 */
function quux (foo) {
}
// "jsdoc/require-param": ["error"|"warn", {"exemptedBy":["notPresent"]}]
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @inheritdoc
 */
function quux (foo) {

}
// "jsdoc/require-param": ["error"|"warn", {"exemptedBy":[]}]
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @inheritdoc
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * Assign the project to a list of employees.
 * @param {object[]} employees - The employees who are responsible for the project.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].department - The employee's department.
 */
function assign (employees, name) {

};
// Message: Missing JSDoc @param "name" declaration.

interface ITest {
/**
 * Test description.
 */
TestMethod(id: number): void;
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSMethodSignature"]}]
// Message: Missing JSDoc @param "id" declaration.

/**
 * A test class.
 */
abstract class TestClass
{
/**
 * A test method.
 */
abstract TestFunction(id);
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSEmptyBodyFunctionExpression"]}]
// Message: Missing JSDoc @param "id" declaration.

/**
 * A test class.
 */
declare class TestClass
{
/**
 *
 */
TestMethod(id);
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSEmptyBodyFunctionExpression"]}]
// Message: Missing JSDoc @param "id" declaration.

/**
 * A test function.
 */
declare let TestFunction: (id) => void;
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

/**
 * A test function.
 */
let TestFunction: (id) => void;
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

/**
 * A test function.
 */
function test(
  processor: (id: number) => string
) {
  return processor(10);
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

/**
 * A test function.
 */
let test = (processor: (id: number) => string) =>
{
  return processor(10);
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

class TestClass {
  /**
  * A class property.
  */
  public Test: (id: number) => string;
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

class TestClass {
  /**
   * A class method.
   */
  public TestMethod(): (id: number) => string
  {
  }
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

interface TestInterface {
/**
 * An interface property.
 */
public Test: (id: number) => string;
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

interface TestInterface {
  /**
   * An interface method.
   */
  public TestMethod(): (id: number) => string;
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

/**
 * A function with return type
 */
function test(): (id: number) => string;
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

/**
 * A function with return type
 */
let test = (): (id: number) => string =>
{
  return (id) => `${id}`;
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]
// Message: Missing JSDoc @param "id" declaration.

/**
 * @param baz
 * @param options
 */
function quux (baz, {foo: bar}) {

}
// Message: Missing JSDoc @param "options.foo" declaration.

class Client {
  /**
   * Set collection data.
   * @param  {Object}   data                    The collection data object.
   * @param  {number}   data.last_modified
   * @param  {Object}   options            The options object.
   * @param  {Object}   [options.headers]       The headers object option.
   * @param  {Number}   [options.retry=0]       Number of retries to make
   *     when faced with transient errors.
   * @param  {Boolean}  [options.safe]          The safe option.
   * @param  {Boolean}  [options.patch]         The patch option.
   * @param  {Number}   [options.last_modified] The last_modified option.
   * @return {Promise<Object, Error>}
   */
  async setData(
    data: { last_modified?: number },
    options: {
      headers?: Record<string, string>;
      safe?: boolean;
      retry?: number;
      patch?: boolean;
      last_modified?: number;
      permissions?: [];
    } = {}
  ) {}
}
// Message: Missing JSDoc @param "options.permissions" declaration.

/**
 *
 */
function quux (foo) {

}
// "jsdoc/require-param": ["error"|"warn", {"enableFixer":false}]
// Message: Missing JSDoc @param "foo" declaration.

class Client {
  /**
   * Set collection data.
   * @return {Promise<Object, Error>}
   */
  async setData(
    data: { last_modified?: number }
  ) {}
}
// Message: Missing JSDoc @param "data" declaration.

/**
 * @param cfg
 * @param cfg.num
 */
function quux ({num, ...extra}) {
}
// "jsdoc/require-param": ["error"|"warn", {"checkRestProperty":true}]
// Message: Missing JSDoc @param "cfg.extra" declaration.

/**
 * @param cfg
 * @param cfg.opts
 * @param cfg.opts.num
 */
function quux ({opts: {num, ...extra}}) {
}
// "jsdoc/require-param": ["error"|"warn", {"checkRestProperty":true}]
// Message: Missing JSDoc @param "cfg.opts.extra" declaration.

/**
 * @param {GenericArray} cfg
 * @param {number} cfg."0"
 */
function baar ([a, ...extra]) {
  //
}
// Message: Missing JSDoc @param "cfg."1"" declaration.

/**
 * @param a
 */
function baar (a, ...extra) {
  //
}
// Message: Missing JSDoc @param "extra" declaration.

/**
 * Converts an SVGRect into an object.
 * @param {SVGRect} bbox - a SVGRect
 */
const bboxToObj = function ({x, y, width, height}) {
  return {x, y, width, height};
};
// "jsdoc/require-param": ["error"|"warn", {"checkTypesPattern":"SVGRect"}]
// Message: Missing JSDoc @param "bbox.x" declaration.

/**
 * Converts an SVGRect into an object.
 * @param {object} bbox - a SVGRect
 */
const bboxToObj = function ({x, y, width, height}) {
  return {x, y, width, height};
};
// Message: Missing JSDoc @param "bbox.x" declaration.

module.exports = class GraphQL {
  /**
   * @param fetchOptions
   * @param cacheKey
   */
  fetch = ({ url, ...options }, cacheKey) => {
  }
};
// "jsdoc/require-param": ["error"|"warn", {"checkRestProperty":true}]
// Message: Missing JSDoc @param "fetchOptions.url" declaration.

(function() {
	/**
	 * A function.
	 */
	function f(param) {
		return !param;
	}
})();
// Message: Missing JSDoc @param "param" declaration.

/**
 * Description.
 * @param {Object} options
 * @param {Object} options.foo
 */
function quux ({ foo: { bar } }) {}
// Message: Missing JSDoc @param "options.foo.bar" declaration.

/**
 * Description.
 * @param {FooBar} options
 * @param {FooBar} options.foo
 */
function quux ({ foo: { bar } }) {}
// "jsdoc/require-param": ["error"|"warn", {"checkTypesPattern":"FooBar"}]
// Message: Missing JSDoc @param "options.foo.bar" declaration.

/**
 * Description.
 * @param {Object} options
 * @param {FooBar} foo
 */
function quux ({ foo: { bar } }) {}
// Message: Missing JSDoc @param "options.foo" declaration.

/**
 * Description.
 * @param {Object} options
 * @param options.foo
 */
function quux ({ foo: { bar } }) {}
// Message: Missing JSDoc @param "options.foo.bar" declaration.

/**
 * Description.
 * @param {object} options Options.
 * @param {object} options.foo A description.
 * @param {object} options.foo.bar
 */
function foo({ foo: { bar: { baz } }}) {}
// Message: Missing JSDoc @param "options.foo.bar.baz" declaration.

/**
* Returns a number.
* @param {Object} props Props.
* @param {Object} props.prop Prop.
* @return {number} A number.
*/
export function testFn1 ({ prop = { a: 1, b: 2 } }) {
}
// "jsdoc/require-param": ["error"|"warn", {"useDefaultObjectProperties":true}]
// Message: Missing JSDoc @param "props.prop.a" declaration.

/** Foo. */
function foo(a, b, c) {}
// Message: Missing JSDoc @param "a" declaration.

/**
 * @param foo Some number.
 * @param bar Some number.
 */
export function myPublicFunction(foo: number, bar: number, baz: number) {}
// "jsdoc/require-param": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[tag=\"param\"])","context":"FunctionDeclaration"}]}]
// Message: Missing JSDoc @param "baz" declaration.
````



<a name="user-content-require-param-passing-examples"></a>
<a name="require-param-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @param foo
 */
function quux (foo) {

}

/**
 * @param root0
 * @param root0.foo
 */
function quux ({foo}) {

}

/**
 * @param root0
 * @param root0.foo
 * @param root1
 * @param root1.bar
 */
function quux ({foo}, {bar}) {

}

/**
 * @param arg0
 * @param arg0.foo
 * @param arg1
 * @param arg1.bar
 */
function quux ({foo}, {bar}) {

}
// "jsdoc/require-param": ["error"|"warn", {"unnamedRootBase":["arg"]}]

/**
 * @param arg
 * @param arg.foo
 * @param config0
 * @param config0.bar
 * @param config1
 * @param config1.baz
 */
function quux ({foo}, {bar}, {baz}) {

}
// "jsdoc/require-param": ["error"|"warn", {"unnamedRootBase":["arg","config"]}]

/**
 * @inheritdoc
 */
function quux (foo) {

}

/**
 * @inheritDoc
 */
function quux (foo) {

}

/**
 * @arg foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}

/**
 * @override
 * @param foo
 */
function quux (foo) {

}

/**
 * @override
 */
function quux (foo) {

}

/**
 * @override
 */
class A {
  /**
    *
    */
  quux (foo) {

  }
}

/**
 * @override
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"overrideReplacesDocs":true}}

/**
 * @ignore
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignoreReplacesDocs":true}}

/**
 * @implements
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}

/**
 * @implements
 */
function quux (foo) {

}

/**
 * @implements
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"implementsReplacesDocs":true}}

/**
 * @implements
 * @param foo
 */
function quux (foo) {

}

/**
 * @augments
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @augments
 * @param foo
 */
function quux (foo) {

}

/**
 * @extends
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @extends
 * @param foo
 */
function quux (foo) {

}

/**
 * @augments
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @extends
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @override
 */
class A {
  /**
  * @param foo
  */
  quux (foo) {

  }
}

/**
 * @override
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"overrideReplacesDocs":true}}

/**
 * @ignore
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"ignoreReplacesDocs":true}}

/**
 * @implements
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"implementsReplacesDocs":true}}

/**
 * @implements
 */
class A {
  /**
   * @param foo
   */
  quux (foo) {

  }
}

/**
 * @augments
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @augments
 */
class A {
  /**
   * @param foo
   */
  quux (foo) {

  }
}

/**
 * @extends
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @extends
 */
class A {
  /**
   * @param foo
   */
  quux (foo) {

  }
}

/**
 * @augments
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @extends
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @internal
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignoreInternal":true}}

/**
 * @private
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignorePrivate":true}}

/**
 * @access private
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignorePrivate":true}}

// issue 182: optional chaining
/** @const {boolean} test */
const test = something?.find(_ => _)

/** @type {RequestHandler} */
function foo(req, res, next) {}

/**
 * @type {MyCallback}
 */
function quux () {

}
// "jsdoc/require-param": ["error"|"warn", {"exemptedBy":["type"]}]

/**
 * @override
 */
var A = class {
  /**
    *
    */
  quux (foo) {

  }
}

export class SomeClass {
  /**
   * @param property
   */
  constructor(private property: string) {}
}

/**
 * Assign the project to an employee.
 *
 * @param {object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */
function assign({name, department}) {
  // ...
}

export abstract class StephanPlugin<O, D> {

    /**
     * Called right after Stephan loads the plugin file.
     *
     * @example
     *```typescript
     * type Options = {
     *      verbose?: boolean;
     *      token?: string;
     * }
     * ```
     *
     * Note that your Options type should only have optional properties...
     *
     * @param args Arguments compiled and provided by StephanClient.
     * @param args.options The options as provided by the user, or an empty object if not provided.
     * @param args.client The options as provided by the user, or an empty object if not provided.
     * @param defaultOptions The default options as provided by the plugin, or an empty object.
     */
    public constructor({options, client}: {
        options: O;
        client: unknown;
    }, defaultOptions: D) {

    }
}

/**
 *
 */
function quux (foo) {

}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["ArrowFunctionExpression"]}]

/**
* A function with return type
*
* @param id
*/
let test = (): (id: number) => string =>
{
  return (id) => `${id}`;
}
// "jsdoc/require-param": ["error"|"warn", {"contexts":["TSFunctionType"]}]

/** @abstract */
class base {
/** @param {boolean} arg0 */
constructor(arg0) {}
}

class foo extends base {
/** @inheritDoc */
constructor(arg0) {
super(arg0);
this.arg0 = arg0;
}
}
// Settings: {"jsdoc":{"mode":"closure"}}

    export abstract class StephanPlugin<O, D> {

    /**
     * Called right after Stephan loads the plugin file.
     *
     * @example
     *```typescript
     * type Options = {
     *      verbose?: boolean;
     *      token?: string;
     * }
     * ```
     *
     * Note that your Options type should only have optional properties...
     *
     * @param args Arguments compiled and provided by StephanClient.
     * @param args.options The options as provided by the user, or an empty object if not provided.
     * @param args.client The options as provided by the user, or an empty object if not provided.
     * @param args.client.name The name of the client.
     * @param defaultOptions The default options as provided by the plugin, or an empty object.
     */
    public constructor({ options, client: { name } }: {
        options: O;
        client: { name: string };
    }, defaultOptions: D) {

    }
}

/**
* @param {string} cb
*/
function createGetter (cb) {
  return function (...args) {
    cb();
  };
}

/**
 * @param cfg
 * @param cfg.num
 */
function quux ({num, ...extra}) {
}

/**
  * @param {GenericArray} cfg
  * @param {number} cfg."0"
 */
function baar ([a, ...extra]) {
  //
}
// "jsdoc/require-param": ["error"|"warn", {"enableRestElementFixer":false}]

/**
  * @param a
 */
function baar (a, ...extra) {
  //
}
// "jsdoc/require-param": ["error"|"warn", {"enableRestElementFixer":false}]

/**
* Converts an SVGRect into an object.
* @param {SVGRect} bbox - a SVGRect
*/
const bboxToObj = function ({x, y, width, height}) {
  return {x, y, width, height};
};

/**
* Converts an SVGRect into an object.
* @param {object} bbox - a SVGRect
*/
const bboxToObj = function ({x, y, width, height}) {
  return {x, y, width, height};
};
// "jsdoc/require-param": ["error"|"warn", {"checkTypesPattern":"SVGRect"}]

class CSS {
  /**
   * Set one or more CSS properties for the set of matched elements.
   *
   * @param {Object} propertyObject - An object of property-value pairs to set.
   */
  setCssObject(propertyObject: {[key: string]: string | number}): void {
  }
}

/**
 * @param foo
 * @param bar
 * @param cfg
 */
function quux (foo, bar, {baz}) {

}
// "jsdoc/require-param": ["error"|"warn", {"checkDestructured":false}]

/**
 * @param foo
 * @param bar
 */
function quux (foo, bar, {baz}) {

}
// "jsdoc/require-param": ["error"|"warn", {"checkDestructuredRoots":false}]

/**
 * @param root
 * @param root.foo
 */
function quux ({"foo": bar}) {

}

/**
 * @param root
 * @param root."foo"
 */
function quux ({foo: bar}) {

}

/**
 * Description.
 * @param {string} b Description `/**`.
 */
module.exports = function a(b) {
  console.info(b);
};

/**
 * Description.
 * @param {Object} options Options.
 * @param {FooBar} options.foo foo description.
 */
function quux ({ foo: { bar } }) {}

/**
 * Description.
 * @param {FooBar} options
 * @param {Object} options.foo
 */
function quux ({ foo: { bar } }) {}
// "jsdoc/require-param": ["error"|"warn", {"checkTypesPattern":"FooBar"}]

/**
 * @param obj
 * @param obj.data
 * @param obj.data."0"
 * @param obj.data."1"
 * @param obj.data."2"
 * @param obj.defaulting
 * @param obj.defaulting."0"
 * @param obj.defaulting."1"
 */
function Item({
  data: [foo, bar, ...baz],
  defaulting: [quux, xyz] = []
}) {
}

/**
* Returns a number.
* @param {Object} props Props.
* @param {Object} props.prop Prop.
* @return {number} A number.
*/
export function testFn1 ({ prop = { a: 1, b: 2 } }) {
}
// "jsdoc/require-param": ["error"|"warn", {"useDefaultObjectProperties":false}]

/**
 * @param this The this object
 * @param bar number to return
 * @returns number returned back to caller
 */
function foo(this: T, bar: number): number {
  console.log(this.name);
  return bar;
}

/**
 * @param bar number to return
 * @returns number returned back to caller
 */
function foo(this: T, bar: number): number {
  console.log(this.name);
  return bar;
}

/** {@link someOtherval} */
function a (b) {}
// "jsdoc/require-param": ["error"|"warn", {"contexts":[{"comment":"*:not(JsdocBlock:has(JsdocInlineTag[tag=link]))","context":"FunctionDeclaration"}]}]
````

