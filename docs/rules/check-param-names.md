<a name="user-content-check-param-names"></a>
<a name="check-param-names"></a>
# <code>check-param-names</code>

* [Fixer](#user-content-check-param-names-fixer)
* [Destructuring](#user-content-check-param-names-destructuring)
* [Options](#user-content-check-param-names-options)
    * [`checkRestProperty`](#user-content-check-param-names-options-checkrestproperty)
    * [`checkTypesPattern`](#user-content-check-param-names-options-checktypespattern)
    * [`enableFixer`](#user-content-check-param-names-options-enablefixer)
    * [`allowExtraTrailingParamDocs`](#user-content-check-param-names-options-allowextratrailingparamdocs)
    * [`checkDestructured`](#user-content-check-param-names-options-checkdestructured)
    * [`useDefaultObjectProperties`](#user-content-check-param-names-options-usedefaultobjectproperties)
    * [`disableExtraPropertyReporting`](#user-content-check-param-names-options-disableextrapropertyreporting)
* [Context and settings](#user-content-check-param-names-context-and-settings)
* [Failing examples](#user-content-check-param-names-failing-examples)
* [Passing examples](#user-content-check-param-names-passing-examples)


Ensures that parameter names in JSDoc are matched by corresponding items in
the function declaration.

<a name="user-content-check-param-names-fixer"></a>
<a name="check-param-names-fixer"></a>
## Fixer

(Todo)

<a name="user-content-check-param-names-destructuring"></a>
<a name="check-param-names-destructuring"></a>
## Destructuring

Note that by default the rule will not report parameters present on the docs
but non-existing on the function signature when an object rest property is part
of that function signature since the seemingly non-existing properties might
actually be a part of the object rest property.

```js
/**
 * @param options
 * @param options.foo
 */
function quux ({foo, ...extra}) {}
```

To require that `extra` be documented--and that any extraneous properties
get reported--e.g., if there had been a `@param options.bar` above--you
can use the `checkRestProperty` option which insists that the rest
property be documented (and that there be no other implicit properties).
Note, however, that jsdoc [does not appear](https://github.com/jsdoc/jsdoc/issues/1773)
to currently support syntax or output to distinguish rest properties from
other properties, so in looking at the docs alone without looking at the
function signature, the disadvantage of enabling this option is that it
may appear that there is an actual property named `extra`.

<a name="user-content-check-param-names-options"></a>
<a name="check-param-names-options"></a>
## Options

<a name="user-content-check-param-names-options-checkrestproperty"></a>
<a name="check-param-names-options-checkrestproperty"></a>
### <code>checkRestProperty</code>

See the "Destructuring" section. Defaults to `false`.

<a name="user-content-check-param-names-options-checktypespattern"></a>
<a name="check-param-names-options-checktypespattern"></a>
### <code>checkTypesPattern</code>

See `require-param` under the option of the same name.

<a name="user-content-check-param-names-options-enablefixer"></a>
<a name="check-param-names-options-enablefixer"></a>
### <code>enableFixer</code>

Set to `true` to auto-remove `@param` duplicates (based on identical
names).

Note that this option will remove duplicates of the same name even if
the definitions do not match in other ways (e.g., the second param will
be removed even if it has a different type or description).

<a name="user-content-check-param-names-options-allowextratrailingparamdocs"></a>
<a name="check-param-names-options-allowextratrailingparamdocs"></a>
### <code>allowExtraTrailingParamDocs</code>

If set to `true`, this option will allow extra `@param` definitions (e.g.,
representing future expected or virtual params) to be present without needing
their presence within the function signature. Other inconsistencies between
`@param`'s and present function parameters will still be reported.

<a name="user-content-check-param-names-options-checkdestructured"></a>
<a name="check-param-names-options-checkdestructured"></a>
### <code>checkDestructured</code>

Whether to check destructured properties. Defaults to `true`.

<a name="user-content-check-param-names-options-usedefaultobjectproperties"></a>
<a name="check-param-names-options-usedefaultobjectproperties"></a>
### <code>useDefaultObjectProperties</code>

Set to `true` if you wish to avoid reporting of child property documentation
where instead of destructuring, a whole plain object is supplied as default
value but you wish its keys to be considered as signalling that the properties
are present and can therefore be documented. Defaults to `false`.

<a name="user-content-check-param-names-options-disableextrapropertyreporting"></a>
<a name="check-param-names-options-disableextrapropertyreporting"></a>
### <code>disableExtraPropertyReporting</code>

Whether to check for extra destructured properties. Defaults to `false`. Change
to `true` if you want to be able to document properties which are not actually
destructured. Keep as `false` if you expect properties to be documented in
their own types. Note that extra properties will always be reported if another
item at the same level is destructured as destructuring will prevent other
access and this option is only intended to permit documenting extra properties
that are available and actually used in the function.

<a name="user-content-check-param-names-context-and-settings"></a>
<a name="check-param-names-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Options|`allowExtraTrailingParamDocs`, `checkDestructured`, `checkRestProperty`, `checkTypesPattern`, `disableExtraPropertyReporting`, `enableFixer`, `useDefaultObjectProperties`|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Recommended|true|

<a name="user-content-check-param-names-failing-examples"></a>
<a name="check-param-names-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @param Foo
 */
function quux (foo = 'FOO') {

}
// Message: Expected @param names to be "foo". Got "Foo".

/**
 * @arg Foo
 */
function quux (foo = 'FOO') {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}
// Message: Expected @arg names to be "foo". Got "Foo".

/**
 * @param Foo
 */
function quux (foo) {

}
// Message: Expected @param names to be "foo". Got "Foo".

/**
 * @param Foo.Bar
 */
function quux (foo) {

}
// Message: @param path declaration ("Foo.Bar") appears before any real parameter.

/**
 * @param foo
 * @param Foo.Bar
 */
function quux (foo) {

}
// Message: @param path declaration ("Foo.Bar") root node name ("Foo") does not match previous real parameter name ("foo").

/**
 * Assign the project to a list of employees.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].department - The employee's department.
 */
function assign (employees) {

};
// Message: @param path declaration ("employees[].name") appears before any real parameter.

/**
 * Assign the project to a list of employees.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].name - The employee's department.
 */
function assign (employees) {

};
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @param "employees[].name"

/**
 * @param foo
 * @param foo.bar
 * @param bar
 */
function quux (bar, foo) {

}
// Message: Expected @param names to be "bar, foo". Got "foo, bar".

/**
 * @param foo
 * @param bar
 */
function quux (foo) {

}
// Message: @param "bar" does not match an existing function parameter.

/**
 * @param foo
 * @param foo
 */
function quux (foo) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @param "foo"

class bar {
    /**
     * @param foo
     * @param foo
     */
    quux (foo) {

    }
}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @param "foo"

/**
 * @param foo
 * @param foo
 */
function quux (foo, bar) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @param "foo"

/**
 * @param foo
 * @param foo
 */
function quux (foo, foo) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @param "foo"

/**
 * @param cfg
 * @param cfg.foo
 * @param cfg.foo
 */
function quux ({foo}) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @param "cfg.foo"

/**
 * @param cfg
 * @param cfg.foo
 * @param cfg.foo
 */
function quux ({foo}) {

}
// Message: Duplicate @param "cfg.foo"

/**
 * @param cfg
 * @param cfg.foo
 */
function quux ({foo, bar}) {

}
// Message: Missing @param "cfg.bar"

/**
 * @param cfg
 * @param cfg.foo
 * @param [cfg.foo]
 * @param baz
 */
function quux ({foo}, baz) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @param "cfg.foo"

/**
 * @param cfg
 * @param cfg.foo
 * @param [cfg.foo="with a default"]
 * @param baz
 */
function quux ({foo, bar}, baz) {

}
// Message: Missing @param "cfg.bar"

/**
 * @param cfg
 * @param cfg.foo
 * @param [cfg.foo="with a default"]
 * @param baz
 */
function quux ({foo}, baz) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @param "cfg.foo"

/**
 * @param cfg
 * @param [cfg.foo="with a default"]
 * @param baz
 */
function quux ({foo, bar}, baz) {

}
// Message: Missing @param "cfg.bar"

/**
 * @param args
 */
function quux ({a, b}) {

}
// Message: Missing @param "args.a"

/**
 * @param args
 */
function quux ({a, b} = {}) {

}
// Message: Missing @param "args.a"

export class SomeClass {
  /**
   * @param prop
   */
  constructor(private property: string) {}
}
// Message: Expected @param names to be "property". Got "prop".

export class SomeClass {
  /**
   * @param prop
   * @param prop.foo
   */
  constructor(prop: { foo: string, bar: string }) {}
}
// Message: Missing @param "prop.bar"

export class SomeClass {
  /**
   * @param prop
   * @param prop.foo
   * @param prop.bar
   */
  constructor(options: { foo: string, bar: string }) {}
}
// Message: @param "prop" does not match parameter name "options"

export class SomeClass {
  /**
   * @param options
   * @param options.foo
   * @param options.bar
   */
  constructor(options: { foo: string }) {}
}
// Message: @param "options.bar" does not exist on options

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`

/**
 * @param {Error} error Exit code
 * @param {number} [code = 1] Exit code
 */
function quux (error, cde = 1) {
};
// Message: Expected @param names to be "error, cde". Got "error, code".

/**
 * @param foo
 */
function quux ([a, b] = []) {

}
// Message: Missing @param "foo."0""

/**
 * @param options
 * @param options.foo
 */
function quux ({foo, ...extra}) {
}
// "jsdoc/check-param-names": ["error"|"warn", {"checkRestProperty":true}]
// Message: Missing @param "options.extra"

/**
 * @param cfg
 * @param cfg.foo
 * @param cfg.bar
 * @param cfg.extra
 */
function quux ({foo, ...extra}) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"checkRestProperty":true}]
// Message: @param "cfg.bar" does not exist on cfg

/**
 * Converts an SVGRect into an object.
 * @param {SVGRect} bbox - a SVGRect
 */
const bboxToObj = function ({x, y, width, height}) {
  return {x, y, width, height};
};
// "jsdoc/check-param-names": ["error"|"warn", {"checkTypesPattern":"SVGRect"}]
// Message: Missing @param "bbox.x"

/**
 * Converts an SVGRect into an object.
 * @param {object} bbox - a SVGRect
 */
const bboxToObj = function ({x, y, width, height}) {
  return {x, y, width, height};
};
// Message: Missing @param "bbox.x"

module.exports = class GraphQL {
  /**
   * @param fetchOptions
   * @param cacheKey
   */
  fetch = ({ url, ...options }, cacheKey) => {
  }
};
// "jsdoc/check-param-names": ["error"|"warn", {"checkRestProperty":true}]
// Message: Missing @param "fetchOptions.url"

/**
 * Testing
 *
 * @param options
 * @param options.one One
 * @param options.two Two
 * @param options.four Four
 */
function testingEslint(options: {
  one: string;
  two: string;
  three: string;
}): string {
  return one + two + three;
}
// Message: Missing @param "options.three"

/**
 *
 */
function quux() {

}
// Settings: {"jsdoc":{"structuredTags":{"see":{"name":false,"required":["name"]}}}}
// Message: Cannot add "name" to `require` with the tag's `name` set to `false`

/**
 * @param root
 * @param foo
 */
function quux ({foo, bar}, baz) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"checkDestructured":false}]
// Message: Expected @param names to be "root, baz". Got "root, foo".

/**
 * Description.
 * @param {Object} options
 * @param {FooBar} foo
 */
function quux ({ foo: { bar } }) {}
// Message: Missing @param "options.foo"

/**
 * Description.
 * @param {Object} options
 * @param options.foo
 */
function quux ({ foo: { bar } }) {}
// Message: Missing @param "options.foo.bar"

/**
 * Description.
 * @param {object} options Options.
 * @param {object} options.foo A description.
 * @param {object} options.foo.bar
 */
function foo({ foo: { bar: { baz } }}) {}
// Message: Missing @param "options.foo.bar.baz"

/**
* Returns a number.
* @param {Object} props Props.
* @param {Object} props.prop Prop.
* @param {string} props.prop.a String.
* @param {string} props.prop.b String.
* @return {number} A number.
*/
export function testFn1 ({ prop = { a: 1, b: 2 } }) {
}
// "jsdoc/check-param-names": ["error"|"warn", {"useDefaultObjectProperties":false}]
// Message: @param "props.prop.a" does not exist on props

/**
 * @param {object} cfg
 * @param {string} cfg.foo
 * @param {string} cfg.bar
 * @param {object} cfg.extra
 */
function quux ({foo}) {

}
// Message: @param "cfg.bar" does not exist on cfg

/**
 * @param {object} cfg
 * @param {string} cfg.foo
 * @param {string} cfg.bar
 * @param {object} cfg.extra
 */
function quux ({foo}) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"disableExtraPropertyReporting":true}]
// Message: @param "cfg.bar" does not exist on cfg

/**
 * @param {object} root
 * @param {object} root.cfg
 * @param {object} root.cfg.a
 * @param {string} root.cfg.a.foo
 * @param {string} root.cfg.a.bar
 * @param {object} root.cfg.a.extra
 */
function quux ({cfg: {a: {foo}}}) {

}
// Message: @param "root.cfg.a.bar" does not exist on root

/**
 * @param {object} root
 * @param {object} root.cfg
 * @param {object} root.cfg.a
 * @param {string} root.cfg.a.foo
 * @param {string} root.cfg.a.bar
 * @param {object} root.cfg.a.extra
 */
function quux ({cfg: {a: {foo}}}) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"disableExtraPropertyReporting":true}]
// Message: @param "root.cfg.a.bar" does not exist on root

/**
 * @param {object} root
 * @param {object} root.cfg
 * @param {string} root.cfg.foo
 * @param {string} root.cfg.bar
 * @param {object} root.cfg.extra
 */
function quux ({cfg}) {

}
// Message: @param "root.cfg.foo" does not exist on root

/**
 * @param foo
 * @param foo
 *   on another line
 */
function quux (foo) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @param "foo"

/**
 * @param barr This is the description of bar. Oops, we misspelled "bar" as "barr".
 */
declare function foo(bar: number) {}
// Message: Expected @param names to be "bar". Got "barr".
````



<a name="user-content-check-param-names-passing-examples"></a>
<a name="check-param-names-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 *
 */
function quux (foo) {

}

/**
 * @param foo
 */
function quux (foo) {

}

/**
 * @param foo
 * @param bar
 */
function quux (foo, bar) {

}

/**
 * @param foo
 * @param bar
 */
function quux (foo, bar, baz) {

}

/**
 * @param foo
 * @param foo.foo
 * @param bar
 */
function quux (foo, bar) {

}

/**
 * @param args
 */
function quux (...args) {

}

/**
 * @param foo
 * @param foo.a
 * @param foo.b
 */
function quux ({a, b}) {

}

/**
 * @param foo
 * @param foo.a
 * @param foo.b
 */
function quux ({"a": A, b}) {

}

/**
 * @param foo
 * @param foo."a"
 * @param foo.b
 */
function quux ({a: A, b}) {

}

/**
 * @param foo
 * @param foo."a-b"
 * @param foo.b
 */
function quux ({"a-b": A, b}) {

}

/**
 * @param foo
 * @param foo.bar
 * @param foo.baz
 * @param bar
 */
function quux (foo, bar) {

}

/**
 * Assign the project to a list of employees.
 * @param {object[]} employees - The employees who are responsible for the project.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].department - The employee's department.
 */
function assign (employees) {

};

export class SomeClass {
  /**
   * @param property
   */
  constructor(private property: string) {}
}

export class SomeClass {
  /**
   * @param options
   * @param options.foo
   * @param options.bar
   */
  constructor(options: { foo: string, bar: string }) {}
}

export class SomeClass {
  /**
   * @param options
   * @param options.foo
   * @param options.bar
   */
  constructor({ foo, bar }: { foo: string, bar: string }) {}
}

export class SomeClass {
  /**
   * @param options
   * @param options.foo
   * @param options.bar
   */
  constructor({ foo, bar }: { foo: string, bar: string }) {}
}

/**
 * @param {Error} error Exit code
 * @param {number} [code = 1] Exit code
 */
function quux (error, code = 1) {
};

/**
 * @param foo
 * @param bar
 */
function quux (foo) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"allowExtraTrailingParamDocs":true}]

/**
 * @param cfg
 * @param cfg.foo
 * @param baz
 */
function quux ({foo}, baz) {

}

/**
 * @param cfg
 * @param cfg.foo
 * @param cfg2
 */
function quux ({foo}, cfg2) {

}

/**
 * @param cfg
 * @param cfg.foo
 * @param baz
 * @param baz.cfg
 */
function quux ({foo}, {cfg}) {

}

/**
 * @param options
 * @param options.foo
 */
function quux ({foo, ...extra}) {
}

/**
 * @param foo
 * @param bar
 */
function quux (foo, bar, ...extra) {

}

/**
* Converts an SVGRect into an object.
* @param {SVGRect} bbox - a SVGRect
*/
const bboxToObj = function ({x, y, width, height}) {
  return {x, y, width, height};
};

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
// "jsdoc/check-param-names": ["error"|"warn", {"checkTypesPattern":"SVGRect"}]

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
 * Logs a string.
 *
 * @param input - String to output.
 */
export default function (input: {
  [foo: string]: { a: string; b: string };
}): void {
  input;
}

export class Thing {
  foo: any;

  /**
   * @param {} C
   */
  constructor(C: { new (): any }) {
    this.foo = new C();
  }
}

/**
 * @param foo
 * @param root
 */
function quux (foo, {bar}) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"checkDestructured":false}]

class A {
  /**
   * Show a prompt.
   * @param hideButton true if button should be hidden, false otherwise
   * @param onHidden delegate to call when the prompt is hidden
   */
  public async showPrompt(hideButton: boolean, onHidden: {(): void}): Promise<void>
  {
  }
}

/**
 * Description.
 * @param {Object} options Options.
 * @param {FooBar} options.foo foo description.
 */
function quux ({ foo: { bar }}) {}

/**
 * Description.
 * @param {FooBar} options
 * @param {Object} options.foo
 */
function quux ({ foo: { bar } }) {}
// "jsdoc/check-param-names": ["error"|"warn", {"checkTypesPattern":"FooBar"}]

/**
 * Description.
 * @param {Object} options
 * @param {FooBar} options.foo
 * @param {FooBar} options.baz
 */
function quux ({ foo: { bar }, baz: { cfg } }) {}

/**
 * Item
 *
 * @param {object} props
 * @param {object} props.data - case data
 * @param {string} props.data.className - additional css class
 * @param props.val
 */
export default function Item({
  data: {
    className,
  } = {},
  val = 4
}) {
}

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
* @param {string} props.prop.a String.
* @param {string} props.prop.b String.
* @return {number} A number.
*/
export function testFn1 ({ prop = { a: 1, b: 2 } }) {
}
// "jsdoc/check-param-names": ["error"|"warn", {"useDefaultObjectProperties":true}]

/**
 * @param {object} root
 * @param {object} root.cfg
 * @param {string} root.cfg.foo
 * @param {string} root.cfg.bar
 * @param {object} root.cfg.extra
 */
function quux ({cfg}) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"disableExtraPropertyReporting":true}]

class A {
    /**
     * @param cfg
     * @param cfg.abc
     */
    constructor({
        [new.target.prop]: cX,
        abc
    }) {
    }
}

/**
 * @param root
 * @param root."0" Ignored
 * @param root."1" Our "b"
 */
const foo = ([, b]) => b;

/**
 * @param arg1 This is the description for arg1.
 */
function foo(this: void, arg1: number): void;

declare global {
  /**
   * @param arg1 This is the number for foo.
   */
  function foo(this: void, arg1: number): void;
}

declare global {
  /**
   * @param r Range is 0-1.
   * @param g Range is 0-1.
   * @param b Range is 0-1.
   */
  function Color(
    this: void,
    r: float,
    g: float,
    b: float,
  ): Color;
}

/**
 * @param this desc
 * @param bar number to return
 * @returns number returned back to caller
 */
function foo(this: T, bar: number): number {
  console.log(this.name);
  return bar;
}
````

