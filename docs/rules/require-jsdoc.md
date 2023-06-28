<a name="user-content-require-jsdoc"></a>
<a name="require-jsdoc"></a>
# <code>require-jsdoc</code>

* [Fixer](#user-content-require-jsdoc-fixer)
* [Options](#user-content-require-jsdoc-options)
    * [`publicOnly`](#user-content-require-jsdoc-options-publiconly)
    * [`require`](#user-content-require-jsdoc-options-require)
    * [`contexts`](#user-content-require-jsdoc-options-contexts)
    * [`exemptEmptyConstructors`](#user-content-require-jsdoc-options-exemptemptyconstructors)
    * [`exemptEmptyFunctions`](#user-content-require-jsdoc-options-exemptemptyfunctions)
    * [`checkConstructors`](#user-content-require-jsdoc-options-checkconstructors)
    * [`checkGetters`](#user-content-require-jsdoc-options-checkgetters)
    * [`checkSetters`](#user-content-require-jsdoc-options-checksetters)
    * [`enableFixer`](#user-content-require-jsdoc-options-enablefixer)
    * [`minLineCount`](#user-content-require-jsdoc-options-minlinecount)
* [Context and settings](#user-content-require-jsdoc-context-and-settings)
* [Failing examples](#user-content-require-jsdoc-failing-examples)
* [Passing examples](#user-content-require-jsdoc-passing-examples)


Checks for presence of jsdoc comments, on class declarations as well as
functions.

<a name="user-content-require-jsdoc-fixer"></a>
<a name="require-jsdoc-fixer"></a>
## Fixer

Adds an empty JSDoc block unless `enableFixer` is set to `false`. See
the `contexts` option for how `inlineCommentBlock` can control the style
of the generated JSDoc block.

<a name="user-content-require-jsdoc-options"></a>
<a name="require-jsdoc-options"></a>
## Options

Accepts one optional options object with the following optional keys.

<a name="user-content-require-jsdoc-options-publiconly"></a>
<a name="require-jsdoc-options-publiconly"></a>
### <code>publicOnly</code>

This option will insist that missing jsdoc blocks are only reported for
function bodies / class declarations that are exported from the module.
May be a boolean or object. If set to `true`, the defaults below will be
used. If unset, jsdoc block reporting will not be limited to exports.

This object supports the following optional boolean keys (`false` unless
otherwise noted):

- `ancestorsOnly` - Only check node ancestors to check if node is exported
- `esm` - ESM exports are checked for JSDoc comments (Defaults to `true`)
- `cjs` - CommonJS exports are checked for JSDoc comments  (Defaults to `true`)
- `window` - Window global exports are checked for JSDoc comments

<a name="user-content-require-jsdoc-options-require"></a>
<a name="require-jsdoc-options-require"></a>
### <code>require</code>

An object with the following optional boolean keys which all default to
`false` except as noted, indicating the contexts where the rule will apply:

- `ArrowFunctionExpression`
- `ClassDeclaration`
- `ClassExpression`
- `FunctionDeclaration` (defaults to `true`)
- `FunctionExpression`
- `MethodDefinition`

<a name="user-content-require-jsdoc-options-contexts"></a>
<a name="require-jsdoc-options-contexts"></a>
### <code>contexts</code>

Set this to an array of strings or objects representing the additional AST
contexts where you wish the rule to be applied (e.g., `Property` for
properties). If specified as an object, it should have a `context` property
and can have an `inlineCommentBlock` property which, if set to `true`, will
add an inline `/** */` instead of the regular, multi-line, indented jsdoc
block which will otherwise be added. Defaults to an empty array. Contexts
may also have their own `minLineCount` property.

Note that you may need to disable `require` items (e.g., `MethodDefinition`)
if you are specifying a more precise form in `contexts` (e.g., `MethodDefinition:not([accessibility="private"] > FunctionExpression`).

See the ["AST and Selectors"](#user-content-eslint-plugin-jsdoc-advanced-ast-and-selectors)
section of our README for more on the expected format.

<a name="user-content-require-jsdoc-options-exemptemptyconstructors"></a>
<a name="require-jsdoc-options-exemptemptyconstructors"></a>
### <code>exemptEmptyConstructors</code>

Default: true

When `true`, the rule will not report missing jsdoc blocks above constructors
with no parameters or return values (this is enabled by default as the class
name or description should be seen as sufficient to convey intent).

<a name="user-content-require-jsdoc-options-exemptemptyfunctions"></a>
<a name="require-jsdoc-options-exemptemptyfunctions"></a>
### <code>exemptEmptyFunctions</code>

Default: false.

When `true`, the rule will not report missing jsdoc blocks above
functions/methods with no parameters or return values (intended where
function/method names are sufficient for themselves as documentation).

<a name="user-content-require-jsdoc-options-checkconstructors"></a>
<a name="require-jsdoc-options-checkconstructors"></a>
### <code>checkConstructors</code>

A value indicating whether `constructor`s should be checked. Defaults to
`true`. When `true`, `exemptEmptyConstructors` may still avoid reporting when
no parameters or return values are found.

<a name="user-content-require-jsdoc-options-checkgetters"></a>
<a name="require-jsdoc-options-checkgetters"></a>
### <code>checkGetters</code>

A value indicating whether getters should be checked. Besides setting as a
boolean, this option can be set to the string `"no-setter"` to indicate that
getters should be checked but only when there is no setter. This may be useful
if one only wishes documentation on one of the two accessors. Defaults to
`false`.

<a name="user-content-require-jsdoc-options-checksetters"></a>
<a name="require-jsdoc-options-checksetters"></a>
### <code>checkSetters</code>

A value indicating whether setters should be checked. Besides setting as a
boolean, this option can be set to the string `"no-getter"` to indicate that
setters should be checked but only when there is no getter. This may be useful
if one only wishes documentation on one of the two accessors. Defaults to
`false`.

<a name="user-content-require-jsdoc-options-enablefixer"></a>
<a name="require-jsdoc-options-enablefixer"></a>
### <code>enableFixer</code>

A boolean on whether to enable the fixer (which adds an empty jsdoc block).
Defaults to `true`.

<a name="user-content-require-jsdoc-options-minlinecount"></a>
<a name="require-jsdoc-options-minlinecount"></a>
### <code>minLineCount</code>

An integer to indicate a minimum number of lines expected for a node in order
for it to require documentation. Defaults to `undefined`. This option will
apply to any context; see `contexts` for line counts per context.

<a name="user-content-require-jsdoc-context-and-settings"></a>
<a name="require-jsdoc-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `ClassDeclaration`, `ClassExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|N/A|
|Recommended|true|
|Options|`publicOnly`, `require`, `contexts`, `exemptEmptyConstructors`, `exemptEmptyFunctions`, `enableFixer`, `minLineCount`|

<a name="user-content-require-jsdoc-failing-examples"></a>
<a name="require-jsdoc-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/** This is comment */
export interface Foo {
  /** This is comment x2 */
  tom: string;
  catchJerry(): boolean;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSInterfaceDeclaration","TSMethodSignature","TSPropertySignature"],"publicOnly":{"ancestorsOnly":true},"require":{"ClassDeclaration":true,"ClassExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

/** This is comment */
export interface Foo {
  /** This is comment x2 */
  tom: string;
  jerry: number;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSInterfaceDeclaration","TSMethodSignature","TSPropertySignature"],"publicOnly":{"ancestorsOnly":true},"require":{"ClassDeclaration":true,"ClassExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

/** This is comment */
export interface Foo {
  bar(): string;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSInterfaceDeclaration","TSMethodSignature","TSPropertySignature"],"publicOnly":{"ancestorsOnly":true}}]
// Message: Missing JSDoc comment.

/** This is comment */
export interface Foo {
  bar: string;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSInterfaceDeclaration","TSMethodSignature","TSPropertySignature"],"publicOnly":{"ancestorsOnly":true,"esm":true}}]
// Message: Missing JSDoc comment.

/**
 * Foo interface documentation.
 */
export interface Foo extends Bar {
  /**
   * baz method documentation.
   */
  baz(): void;

  meow(): void;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSMethodSignature"],"publicOnly":{"ancestorsOnly":true}}]
// Message: Missing JSDoc comment.

function quux (foo) {

}
// Message: Missing JSDoc comment.

/**
 * @func myFunction
 */
function myFunction() {

}
// Settings: {"jsdoc":{"maxLines":3,"minLines":2}}
// Message: Missing JSDoc comment.

/**
 * @func myFunction
 */


function myFunction() {

}
// Settings: {"jsdoc":{"maxLines":2}}
// Message: Missing JSDoc comment.

/** @func myFunction */ function myFunction() {

}
// Settings: {"jsdoc":{"minLines":1}}
// Message: Missing JSDoc comment.

function myFunction() {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"enableFixer":false}]
// Message: Missing JSDoc comment.

export var test = function () {

};
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

function test () {

}
export var test2 = test;
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionDeclaration":true}}]
// Message: Missing JSDoc comment.

export const test = () => {

};
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"ArrowFunctionExpression":true}}]
// Message: Missing JSDoc comment.

export const test = () => {

};
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["ArrowFunctionExpression"],"publicOnly":true}]
// Message: Missing JSDoc comment.

export const test = () => {

};
// Settings: {"jsdoc":{"contexts":["ArrowFunctionExpression"]}}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true}]
// Message: Missing JSDoc comment.

export const test = () => {

};
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":[{"context":"ArrowFunctionExpression"}],"publicOnly":true}]
// Message: Missing JSDoc comment.

export let test = class {

};
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"ClassExpression":true}}]
// Message: Missing JSDoc comment.

export default function () {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"FunctionDeclaration":true}}]
// Message: Missing JSDoc comment.

export default () => {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"ArrowFunctionExpression":true}}]
// Message: Missing JSDoc comment.

export default (function () {})
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export default class {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"ClassDeclaration":true}}]
// Message: Missing JSDoc comment.

function quux (foo) {

}
// Message: Missing JSDoc comment.

function quux (foo) {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"exemptEmptyFunctions":true}]
// Message: Missing JSDoc comment.

function quux (foo) {

}
// Settings: {"jsdoc":{"minLines":2}}
// "jsdoc/require-jsdoc": ["error"|"warn", {"exemptEmptyFunctions":true}]
// Message: Missing JSDoc comment.

function myFunction() {}
// Message: Missing JSDoc comment.

/**
 * Description for A.
 */
class A {
   constructor(xs) {
        this.a = xs;
   }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ClassDeclaration":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

class A {
    /**
     * Description for constructor.
     * @param {object[]} xs - xs
     */
    constructor(xs) {
        this.a = xs;
    }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ClassDeclaration":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

class A extends B {
    /**
     * Description for constructor.
     * @param {object[]} xs - xs
     */
    constructor(xs) {
        this.a = xs;
    }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ClassDeclaration":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

export class A extends B {
    /**
     * Description for constructor.
     * @param {object[]} xs - xs
     */
    constructor(xs) {
        this.a = xs;
    }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ClassDeclaration":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

export default class A extends B {
    /**
     * Description for constructor.
     * @param {object[]} xs - xs
     */
    constructor(xs) {
        this.a = xs;
    }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ClassDeclaration":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

var myFunction = () => {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ArrowFunctionExpression":true}}]
// Message: Missing JSDoc comment.

var myFunction = () => () => {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ArrowFunctionExpression":true}}]
// Message: Missing JSDoc comment.

var foo = function() {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

const foo = {bar() {}}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

var foo = {bar: function() {}}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

function foo (abc) {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"exemptEmptyFunctions":false}]
// Message: Missing JSDoc comment.

function foo () {
  return true;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"exemptEmptyFunctions":false}]
// Message: Missing JSDoc comment.

module.exports = function quux () {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

module.exports = function quux () {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

module.exports = {
  method: function() {

  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

module.exports = {
  test: {
    test2: function() {

    }
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

module.exports = {
  test: {
    test2: function() {

    }
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

const test = module.exports = function () {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

/**
*
*/
const test = module.exports = function () {

}

test.prototype.method = function() {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

const test = function () {

}
module.exports = {
  test: test
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

const test = () => {

}
module.exports = {
  test: test
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"ArrowFunctionExpression":true}}]
// Message: Missing JSDoc comment.

class Test {
    method() {

    }
}
module.exports = Test;
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

export default function quux () {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export default function quux () {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

function quux () {

}
export default quux;
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export function test() {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export function test() {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

var test = function () {

}
var test2 = 2;
export { test, test2 }
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

var test = function () {

}
export { test as test2 }
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export default class A {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"ClassDeclaration":true}}]
// Message: Missing JSDoc comment.

export default class A {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"ancestorsOnly":true},"require":{"ClassDeclaration":true}}]
// Message: Missing JSDoc comment.

var test = function () {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"window":true},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

window.test = function () {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"window":true},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

function test () {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"window":true}}]
// Message: Missing JSDoc comment.

module.exports = function() {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"cjs":true,"esm":false,"window":false},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export function someMethod() {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"FunctionDeclaration":true}}]
// Message: Missing JSDoc comment.

export function someMethod() {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"FunctionDeclaration":true}}]
// Message: Missing JSDoc comment.

const myObject = {
  myProp: true
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["Property"]}]
// Message: Missing JSDoc comment.

/**
 * Foo interface documentation.
 */
export interface Foo extends Bar {
  /**
   * baz method documentation.
   */
  baz(): void;

  meow(): void;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSMethodSignature"]}]
// Message: Missing JSDoc comment.

class MyClass {
  someProperty: boolean; // Flow type annotation.
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"exemptEmptyFunctions":true,"require":{"ClassDeclaration":true}}]
// Message: Missing JSDoc comment.

export default class Test {
  constructor(a) {
    this.a = a;
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"ArrowFunctionExpression":false,"ClassDeclaration":false,"ClassExpression":false,"FunctionDeclaration":false,"FunctionExpression":false,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

export default class Test {
  constructor(a) {
    this.a = a;
  }
  private abc(a) {
    this.a = a;
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["MethodDefinition > FunctionExpression"],"publicOnly":true,"require":{"ArrowFunctionExpression":false,"ClassDeclaration":false,"ClassExpression":false,"FunctionDeclaration":false,"FunctionExpression":false,"MethodDefinition":false}}]
// Message: Missing JSDoc comment.

e = function () {
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"FunctionDeclaration":false,"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

/**
 *
 */
export class Class {
    test = 1;

    foo() {
        this.test = 2;
    }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"FunctionDeclaration":false,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

class Dog {
  eat() {

  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"FunctionDeclaration":false,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

const hello = name => {
  document.body.textContent = "Hello, " + name + "!";
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ArrowFunctionExpression":true,"FunctionDeclaration":false}}]
// Message: Missing JSDoc comment.

export const loginSuccessAction = (): BaseActionPayload => ({ type: LOGIN_SUCCESSFUL });
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ArrowFunctionExpression":true,"FunctionDeclaration":false}}]
// Message: Missing JSDoc comment.

export type Container = {
  constants?: ObjByString;
  enums?: { [key in string]: TypescriptEnum };
  helpers?: { [key in string]: AnyFunction };
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSTypeAliasDeclaration",{"context":"TSPropertySignature","inlineCommentBlock":true}]}]
// Message: Missing JSDoc comment.

class Foo {
    constructor() {}

    bar() {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["MethodDefinition[key.name!=\"constructor\"]"],"require":{"ClassDeclaration":true}}]
// Message: Missing JSDoc comment.

class Example extends React.PureComponent {
  componentDidMount() {}

  render() {}

  someOtherMethod () {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["MethodDefinition:not([key.name=\"componentDidMount\"]):not([key.name=\"render\"])"],"require":{"ClassDeclaration":true}}]
// Message: Missing JSDoc comment.

function foo(arg: boolean): boolean {
  return arg;
}

function bar(arg: true): true;
function bar(arg: false): false;
function bar(arg: boolean): boolean {
  return arg;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSDeclareFunction:not(TSDeclareFunction + TSDeclareFunction)","FunctionDeclaration:not(TSDeclareFunction + FunctionDeclaration)"],"require":{"FunctionDeclaration":false}}]
// Message: Missing JSDoc comment.

export function foo(arg: boolean): boolean {
  return arg;
}

export function bar(arg: true): true;
export function bar(arg: false): false;
export function bar(arg: boolean): boolean {
  return arg;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["ExportNamedDeclaration[declaration.type=\"TSDeclareFunction\"]:not(ExportNamedDeclaration[declaration.type=\"TSDeclareFunction\"] + ExportNamedDeclaration[declaration.type=\"TSDeclareFunction\"])","ExportNamedDeclaration[declaration.type=\"FunctionDeclaration\"]:not(ExportNamedDeclaration[declaration.type=\"TSDeclareFunction\"] + ExportNamedDeclaration[declaration.type=\"FunctionDeclaration\"])"],"require":{"FunctionDeclaration":false}}]
// Message: Missing JSDoc comment.

module.exports.foo = (bar) => {
  return bar + "biz"
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":false,"require":{"ArrowFunctionExpression":true,"FunctionDeclaration":true,"FunctionExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

class Animal {

  #name: string;

  private species: string;

  public color: string;

  @SomeAnnotation('optionalParameter')
  tail: boolean;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["PropertyDefinition"]}]
// Message: Missing JSDoc comment.

@Entity('users')
export class User {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ClassDeclaration":true}}]
// Message: Missing JSDoc comment.

/**
 *
 */
class Foo {
    constructor() {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"exemptEmptyConstructors":false,"require":{"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

/**
 *
 */
class Foo {
    constructor(notEmpty) {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"exemptEmptyConstructors":true,"require":{"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

/**
 *
 */
class Foo {
    constructor() {
        const notEmpty = true;
        return notEmpty;
    }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"exemptEmptyConstructors":true,"require":{"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

/**
 *
 */
function quux() {

}
// Settings: {"jsdoc":{"structuredTags":{"see":{"name":false,"required":["name"]}}}}
// Message: Cannot add "name" to `require` with the tag's `name` set to `false`

class Test {
  aFunc() {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkConstructors":false,"require":{"ArrowFunctionExpression":true,"ClassDeclaration":false,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

class Test {
  aFunc = () => {}
  anotherFunc() {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ArrowFunctionExpression":true,"ClassDeclaration":false,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

export enum testEnum {
  A, B
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSEnumDeclaration"],"publicOnly":true}]
// Message: Missing JSDoc comment.

export interface Test {
  aFunc: () => void;
  aVar: string;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSInterfaceDeclaration"],"publicOnly":true}]
// Message: Missing JSDoc comment.

export type testType = string | number;
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSTypeAliasDeclaration"],"publicOnly":true}]
// Message: Missing JSDoc comment.

export interface Foo {
    bar: number;
    baz: string;
    quux(): void;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSPropertySignature","TSMethodSignature"],"publicOnly":true}]
// Message: Missing JSDoc comment.

export class MyComponentComponent {
  @Output()
  public changed = new EventEmitter();

  public test = 'test';

  @Input()
  public value = new EventEmitter();
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["PropertyDefinition > Decorator[expression.callee.name=\"Input\"]"]}]
// Message: Missing JSDoc comment.

requestAnimationFrame(draw)

function bench() {
}
// Message: Missing JSDoc comment.

class Foo {
  set aName (val) {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkSetters":"no-getter","contexts":["MethodDefinition > FunctionExpression"]}]
// Message: Missing JSDoc comment.

class Foo {
  get aName () {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkGetters":"no-setter","contexts":["MethodDefinition > FunctionExpression"]}]
// Message: Missing JSDoc comment.

const obj = {
  get aName () {},
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkGetters":"no-setter","contexts":["Property > FunctionExpression"]}]
// Message: Missing JSDoc comment.

function comment () {
  return "comment";
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"enableFixer":true,"fixerMessage":" TODO: add comment"}]
// Message: Missing JSDoc comment.

function comment () {
  return "comment";
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["any",{"context":"FunctionDeclaration","inlineCommentBlock":true}],"fixerMessage":"TODO: add comment "}]
// Message: Missing JSDoc comment.

function comment () {
  return "comment";
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"enableFixer":false,"fixerMessage":" TODO: add comment"}]
// Message: Missing JSDoc comment.

export class InovaAutoCompleteComponent {
  public disabled = false;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["PropertyDefinition"],"publicOnly":true}]
// Message: Missing JSDoc comment.

export default (arg) => arg;
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"ArrowFunctionExpression":true,"ClassDeclaration":true,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

export function outer() {
    function inner() {
        console.log('foo');
    }

    inner();
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"ArrowFunctionExpression":true,"ClassDeclaration":true,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

export const outer = () => {
    const inner = () => {
        console.log('foo');
    };

    inner();
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"ArrowFunctionExpression":true,"ClassDeclaration":true,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

/**
 *
 */
export class InovaAutoCompleteComponent {
  public disabled = false;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["PropertyDefinition"],"publicOnly":true}]
// Message: Missing JSDoc comment.

/**
* Some comment.
*/
export class Component {
    public foo?: number;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkConstructors":false,"contexts":["PropertyDefinition"],"publicOnly":true}]
// Message: Missing JSDoc comment.

class Utility {
    /**
     *
     */
    mthd() {
        return false;
    }
}

module.exports = Utility;
// "jsdoc/require-jsdoc": ["error"|"warn", {"enableFixer":false,"publicOnly":true,"require":{"ArrowFunctionExpression":true,"ClassDeclaration":true,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

/**
 *
 */
module.exports = class Utility {
  mthd() {
    return false;
  }
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"enableFixer":false,"publicOnly":true,"require":{"ArrowFunctionExpression":true,"ClassDeclaration":true,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

function quux () {
  return 3;
}

function b () {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"minLineCount":2}]
// Message: Missing JSDoc comment.

function quux () {
  return 3;
}

var a = {};
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":[{"context":"FunctionDeclaration","minLineCount":2},{"context":"VariableDeclaration","minLineCount":2}],"require":{"FunctionDeclaration":false}}]
// Message: Missing JSDoc comment.

function quux () {
  return 3;
}

var a = {
  b: 1,
  c: 2
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":[{"context":"FunctionDeclaration","minLineCount":4},{"context":"VariableDeclaration","minLineCount":2}],"require":{"FunctionDeclaration":false}}]
// Message: Missing JSDoc comment.

class A {
  setId(newId: number): void {
    this.id = id;
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":[{"context":"MethodDefinition","minLineCount":3}],"require":{"ClassDeclaration":false,"FunctionExpression":false,"MethodDefinition":false}}]
// Message: Missing JSDoc comment.

export class MyClass {

  public myPublicProperty: number = 1;
      /* ^ Missing JSDoc comment. eslint(jsdoc/require-jsdoc) - expected ✅ */

  private myPrivateProp: number = -1;
      /* ^ Missing JSDoc comment. eslint(jsdoc/require-jsdoc) - unexpected ❌ */

  // ...
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["PropertyDefinition"],"publicOnly":true}]
// Message: Missing JSDoc comment.
````



<a name="user-content-require-jsdoc-passing-examples"></a>
<a name="require-jsdoc-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
interface FooBar {
  fooBar: string;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSInterfaceDeclaration","TSMethodSignature","TSPropertySignature"],"publicOnly":{"ancestorsOnly":true}}]

/** This is comment */
interface FooBar {
  fooBar: string;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSInterfaceDeclaration","TSMethodSignature","TSPropertySignature"],"publicOnly":{"ancestorsOnly":true}}]

/** This is comment */
export class Foo {
  someMethod() {
    interface FooBar {
      fooBar: string;
    }
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSInterfaceDeclaration","TSMethodSignature","TSPropertySignature"],"publicOnly":{"ancestorsOnly":true}}]

/** This is comment */
function someFunction() {
  interface FooBar {
    fooBar: string;
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSInterfaceDeclaration","TSMethodSignature","TSPropertySignature"],"publicOnly":{"ancestorsOnly":true}}]

/** This is comment */
export function foo() {
  interface bar {
    fooBar: string;
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSInterfaceDeclaration","TSMethodSignature","TSPropertySignature"],"publicOnly":{"ancestorsOnly":true}}]

/**
 *
 */

var array = [1,2,3];
array.forEach(function() {});

/**
 * @class MyClass
 **/
function MyClass() {}

/**
 Function doing something
 */
function myFunction() {}
/**
 Function doing something
 */
var myFunction = function() {};
/**
 Function doing something
 */
Object.myFunction = function () {};
var obj = {
   /**
    *  Function doing something
    **/
    myFunction: function () {} };

/**
 @func myFunction
 */
function myFunction() {}
/**
 @method myFunction
 */
function myFunction() {}
/**
 @function myFunction
 */
function myFunction() {}

/**
 @func myFunction
 */
var myFunction = function () {}
/**
 @method myFunction
 */
var myFunction = function () {}
/**
 @function myFunction
 */
var myFunction = function () {}

/**
 @func myFunction
 */
Object.myFunction = function() {}
/**
 @method myFunction
 */
Object.myFunction = function() {}
/**
 @function myFunction
 */
Object.myFunction = function() {}
(function(){})();

var object = {
  /**
   *  @func myFunction - Some function
   */
  myFunction: function() {} }
var object = {
  /**
   *  @method myFunction - Some function
   */
  myFunction: function() {} }
var object = {
  /**
   *  @function myFunction - Some function
   */
  myFunction: function() {} }

var array = [1,2,3];
array.filter(function() {});
Object.keys(this.options.rules || {}).forEach(function(name) {}.bind(this));
var object = { name: 'key'};
Object.keys(object).forEach(function() {})

/**
 * @func myFunction
 */

function myFunction() {

}
// Settings: {"jsdoc":{"maxLines":2,"minLines":0}}

/**
 * @func myFunction
 */


function myFunction() {

}
// Settings: {"jsdoc":{"maxLines":3,"minLines":0}}

/** @func myFunction */  function myFunction() {

}
// Settings: {"jsdoc":{"maxLines":0,"minLines":0}}

/**
 * @func myFunction
 */

function myFunction() {

}
// Settings: {"jsdoc":{"maxLines":3,"minLines":2}}

function myFunction() {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ClassDeclaration":true,"FunctionDeclaration":false,"MethodDefinition":true}}]

var myFunction = function() {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ClassDeclaration":true,"FunctionDeclaration":false,"MethodDefinition":true}}]

/**
 * Description for A.
 */
class A {
    /**
     * Description for constructor.
     * @param {object[]} xs - xs
     */
    constructor(xs) {
        this.a = xs;
    }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ClassDeclaration":true,"MethodDefinition":true}}]

/**
 * Description for A.
 */
class App extends Component {
    /**
     * Description for constructor.
     * @param {object[]} xs - xs
     */
    constructor(xs) {
        this.a = xs;
    }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ClassDeclaration":true,"MethodDefinition":true}}]

/**
 * Description for A.
 */
export default class App extends Component {
    /**
     * Description for constructor.
     * @param {object[]} xs - xs
     */
    constructor(xs) {
        this.a = xs;
    }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ClassDeclaration":true,"MethodDefinition":true}}]

/**
 * Description for A.
 */
export class App extends Component {
    /**
     * Description for constructor.
     * @param {object[]} xs - xs
     */
    constructor(xs) {
        this.a = xs;
    }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ClassDeclaration":true,"MethodDefinition":true}}]

class A {
    constructor(xs) {
        this.a = xs;
    }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ClassDeclaration":false,"MethodDefinition":false}}]

/**
* Function doing something
*/
var myFunction = () => {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ArrowFunctionExpression":true}}]

/**
* Function doing something
*/
var myFunction = function () {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ArrowFunctionExpression":true}}]

/**
* Function doing something
*/
var myFunction = () => {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ArrowFunctionExpression":false}}]

/**
 Function doing something
*/
var myFunction = () => () => {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ArrowFunctionExpression":true}}]

setTimeout(() => {}, 10);
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ArrowFunctionExpression":true}}]

/**
JSDoc Block
*/
var foo = function() {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"FunctionExpression":true}}]

const foo = {/**
JSDoc Block
*/
bar() {}}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"FunctionExpression":true}}]

var foo = {/**
JSDoc Block
*/
bar: function() {}}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"FunctionExpression":true}}]

var foo = { [function() {}]: 1 };
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"FunctionExpression":true}}]

function foo () {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"exemptEmptyFunctions":true}]

function foo () {
  return;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"exemptEmptyFunctions":true}]

const test = {};
/**
 * test
 */
 test.method = function () {

}
module.exports = {
  prop: { prop2: test.method }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
function test() {

}

module.exports = {
  prop: { prop2: test }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
test = function() {

}

module.exports = {
  prop: { prop2: test }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"cjs":true,"esm":false,"window":false},"require":{"FunctionExpression":true}}]

/**
 *
 */
test = function() {

}

exports.someMethod = {
  prop: { prop2: test }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"FunctionExpression":true}}]

/**
 *
 */
const test = () => {

}

module.exports = {
prop: { prop2: test }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"ArrowFunctionExpression":true}}]

const test = () => {

}
module.exports = {
  prop: { prop2: test }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"ancestorsOnly":true},"require":{"ArrowFunctionExpression":true}}]

/**
 *
 */
window.test = function() {

}

module.exports = {
prop: window
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]

test = function() {

}

/**
 *
 */
test = function() {

}

module.exports = {
prop: { prop2: test }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]

test = function() {

}

test = 2;

module.exports = {
prop: { prop2: test }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
function test() {

}

/**
 *
 */
test.prototype.method = function() {

}

module.exports = {
prop: { prop2: test }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]

class Test {
  /**
   * Test
   */
  method() {

  }
}
module.exports = Test;
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"MethodDefinition":true}}]

/**
 *
 */
export default function quux () {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
export default function quux () {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]

/**
 *
 */
function quux () {

}
export default quux;
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]

function quux () {

}
export default quux;
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]

/**
 *
 */
export function test() {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
export function test() {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]

/**
 *
 */
var test = function () {

}
var test2 = 2;
export { test, test2 }
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
var test = function () {

}
export { test as test2 }
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
export default class A {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"ancestorsOnly":true},"require":{"ClassDeclaration":true}}]

/**
 *
 */
var test = function () {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"window":true},"require":{"FunctionExpression":true}}]

let test = function () {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"window":true},"require":{"FunctionExpression":true}}]

let test = class {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"ClassExpression":false}}]

/**
 *
 */
let test = class {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"ClassExpression":true}}]

export function someMethod() {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"cjs":true,"esm":false,"window":false},"require":{"FunctionDeclaration":true}}]

export function someMethod() {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"cjs":true,"esm":false,"window":false},"require":{"FunctionDeclaration":true}}]

exports.someMethod = function() {

}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"FunctionExpression":true}}]

const myObject = {
  myProp: true
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":[]}]

function bear() {}
/**
 *
 */
function quux () {
}
export default quux;
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 * This example interface is great!
 */
export interface Example {
  /**
   * My super test string!
   */
  test: string
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSInterfaceDeclaration"]}]

/**
 * This example interface is great!
 */
interface Example {
  /**
   * My super test string!
   */
  test: string
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSInterfaceDeclaration"]}]

/**
 * This example type is great!
 */
export type Example = {
  /**
   * My super test string!
   */
  test: string
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSTypeAliasDeclaration"]}]

/**
 * This example type is great!
 */
type Example = {
  /**
   * My super test string!
   */
  test: string
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSTypeAliasDeclaration"]}]

/**
 * This example enum is great!
 */
export enum Example {
  /**
   * My super test enum!
   */
  test = 123
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSEnumDeclaration"]}]

/**
 * This example enum is great!
 */
enum Example {
  /**
   * My super test enum!
   */
  test = 123
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSEnumDeclaration"]}]

const foo = {...{}};
function bar() {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"exemptEmptyFunctions":false,"publicOnly":true,"require":{"ArrowFunctionExpression":true,"ClassDeclaration":true,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":false,"MethodDefinition":true}}]

/**
 * Class documentation
 */
 @logged
export default class Foo {
 // ....
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"exemptEmptyFunctions":false,"require":{"ClassDeclaration":true}}]

const a = {};
const b = {
  ...a
};

export default b;
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["ObjectExpression"],"exemptEmptyFunctions":false,"publicOnly":true}]

/**
 * Foo interface documentation.
 */
export interface Foo extends Bar {
  /**
   * baz method documentation.
   */
  baz(): void;

  /**
   * meow method documentation.
   */
  meow(): void;
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSMethodSignature"]}]

export default class Test {
  private abc(a) {
    this.a = a;
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["MethodDefinition > FunctionExpression"],"publicOnly":true,"require":{"ArrowFunctionExpression":false,"ClassDeclaration":false,"ClassExpression":false,"FunctionDeclaration":false,"FunctionExpression":false,"MethodDefinition":false}}]

/**
 * Basic application controller.
 */
@Controller()
export class AppController {
  /**
   * Returns the application information.
   *
   * @returns ...
   */
  @Get('/info')
  public getInfo(): string {
    return 'OK';
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ArrowFunctionExpression":false,"ClassDeclaration":true,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":false,"MethodDefinition":true}}]

/**
 * Entity to represent a user in the system.
 */
@Entity('users')
export class User {
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ArrowFunctionExpression":false,"ClassDeclaration":true,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":false,"MethodDefinition":true}}]

/**
 * Entity to represent a user in the system.
 */
@Entity('users', getVal())
export class User {
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ArrowFunctionExpression":false,"ClassDeclaration":true,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":false,"MethodDefinition":true}}]

/**
 *
 */
class Foo {
    constructor() {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"exemptEmptyConstructors":true,"require":{"MethodDefinition":true}}]

/**
 *
 */
class Foo {
    constructor() {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkConstructors":false,"require":{"MethodDefinition":true}}]

class Foo {
  get aName () {}
  set aName (val) {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkGetters":"no-setter","checkSetters":false,"contexts":["MethodDefinition > FunctionExpression"]}]

const obj = {
  get aName () {},
  set aName (val) {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkGetters":"no-setter","checkSetters":false,"contexts":["Property > FunctionExpression"]}]

class Foo {
  set aName (val) {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkSetters":false,"contexts":["MethodDefinition > FunctionExpression"]}]

class Foo {
  get aName () {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkGetters":false,"contexts":["MethodDefinition > FunctionExpression"]}]

class Foo {
  /**
   *
   */
  set aName (val) {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkSetters":"no-getter","contexts":["MethodDefinition > FunctionExpression"]}]

class Foo {
  /**
   *
   */
  get aName () {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkGetters":"no-setter","contexts":["MethodDefinition > FunctionExpression"]}]

class Foo {
  get aName () {}
  set aName (val) {}
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"checkGetters":false,"checkSetters":"no-getter","contexts":["MethodDefinition > FunctionExpression"]}]

class Base {
  constructor() {
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["MethodDefinition"],"exemptEmptyConstructors":true}]

/**
 * This is a text.
 */
export function a(); // Reports an error
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["TSDeclareFunction"],"require":{"FunctionDeclaration":true}}]

/**
 * Foo
 */
export function foo(): void {
  function bar(): void {
    console.log('bar');
  }

  console.log('foo');
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true}]

const foo = {
  bar: () => {
    // ...
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":[":not(Property) > ArrowFunctionExpression"],"require":{"ArrowFunctionExpression":false,"ClassDeclaration":true,"ClassExpression":true}}]

/** Defines the current user's settings. */
@Injectable({
  providedIn: 'root',
})
@State<Partial<UserSettingsStateModel>>
({
  name: 'userSettings',
  defaults: {
    isDev: !environment.production,
  },
})
export class UserSettingsState { }
// "jsdoc/require-jsdoc": ["error"|"warn", {"require":{"ClassDeclaration":true}}]

/**
 * Entity to represent a user in the system.
 */
@Entity('users')
export class User {
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["Decorator"],"require":{"FunctionDeclaration":false}}]

  function quux () {
  return 3;
}

function b () {}
// "jsdoc/require-jsdoc": ["error"|"warn", {"minLineCount":4}]

function quux () {
  return 3;
}

var a = {
  b: 1,
  c: 2
};
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":["ClassDeclaration",{"context":"FunctionDeclaration","minLineCount":4},{"context":"VariableDeclaration","minLineCount":5}],"require":{"FunctionDeclaration":false}}]

class A {
  setId(newId: number): void {
    this.id = id;
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"contexts":[{"context":"MethodDefinition","minLineCount":4}],"require":{"ClassDeclaration":false,"FunctionExpression":false,"MethodDefinition":false}}]

export default class Test {
  private abc(a) {
    this.a = a;
  }
}
// "jsdoc/require-jsdoc": ["error"|"warn", {"publicOnly":true,"require":{"ArrowFunctionExpression":false,"ClassDeclaration":false,"ClassExpression":false,"FunctionDeclaration":false,"FunctionExpression":false,"MethodDefinition":true}}]
````

