<a name="require-jsdoc"></a>
# <code>require-jsdoc</code>

* [`require-jsdoc`](#require-jsdoc)
    * [Options](#require-jsdoc-options)
    * [Fixer](#require-jsdoc-fixer)
    * [Context and settings](#require-jsdoc-context-and-settings)
    * [Failing examples](#require-jsdoc-failing-examples)
    * [Passing examples](#require-jsdoc-passing-examples)


Checks for presence of jsdoc comments, on class declarations as well as
functions.

<a name="require-jsdoc-options"></a>
## Options

Accepts one optional options object with the following optional keys.

- `publicOnly` - This option will insist that missing jsdoc blocks are
  only reported for function bodies / class declarations that are exported
  from the module. May be a boolean or object. If set to `true`, the defaults
  below will be used. If unset, jsdoc block reporting will not be limited to
  exports.

  This object supports the following optional boolean keys (`false` unless
  otherwise noted):

  - `ancestorsOnly` - Only check node ancestors to check if node is exported
  - `esm` - ESM exports are checked for JSDoc comments (Defaults to `true`)
  - `cjs` - CommonJS exports are checked for JSDoc comments  (Defaults to `true`)
  - `window` - Window global exports are checked for JSDoc comments

- `require` - An object with the following optional boolean keys which all
    default to `false` except as noted, indicating the contexts where the rule
    will apply:

  - `ArrowFunctionExpression`
  - `ClassDeclaration`
  - `ClassExpression`
  - `FunctionDeclaration` (defaults to `true`)
  - `FunctionExpression`
  - `MethodDefinition`

- `contexts` - Set this to an array of strings representing the additional
  AST contexts where you wish the rule to be applied (e.g., `Property` for
  properties). Defaults to an empty array.

- `exemptEmptyFunctions` (default: false) - When `true`, the rule will not report
  missing jsdoc blocks above functions/methods with no parameters or return values
  (intended where variable names are sufficient for themselves as documentation).

<a name="require-jsdoc-fixer"></a>
## Fixer

(Todo)

<a name="require-jsdoc-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `ClassDeclaration`, `ClassExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|N/A|
|Options|`publicOnly`, `require`, `contexts`, `exemptEmptyFunctions`|

<a name="require-jsdoc-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
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

export var test = function () {

};
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

function test () {

}
export var test2 = test;
// Options: [{"publicOnly":true,"require":{"FunctionDeclaration":true}}]
// Message: Missing JSDoc comment.

export const test = () => {

};
// Options: [{"publicOnly":true,"require":{"ArrowFunctionExpression":true}}]
// Message: Missing JSDoc comment.

export let test = class {

};
// Options: [{"publicOnly":true,"require":{"ClassExpression":true}}]
// Message: Missing JSDoc comment.

export default function () {}
// Options: [{"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"FunctionDeclaration":true}}]
// Message: Missing JSDoc comment.

export default () => {}
// Options: [{"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"ArrowFunctionExpression":true}}]
// Message: Missing JSDoc comment.

export default (function () {})
// Options: [{"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export default class {}
// Options: [{"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"ClassDeclaration":true}}]
// Message: Missing JSDoc comment.

function quux (foo) {

}
// Message: Missing JSDoc comment.


// Settings: {"jsdoc":{"exemptEmptyFunctions":true}}
// Message: `settings.jsdoc.exemptEmptyFunctions` has been removed, use options in the rule `require-jsdoc` instead.

function quux (foo) {

}
// Options: [{"exemptEmptyFunctions":true}]
// Message: Missing JSDoc comment.

function quux (foo) {

}
// Settings: {"jsdoc":{"minLines":2}}
// Options: [{"exemptEmptyFunctions":true}]
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
// Options: [{"require":{"ClassDeclaration":true,"MethodDefinition":true}}]
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
// Options: [{"require":{"ClassDeclaration":true,"MethodDefinition":true}}]
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
// Options: [{"require":{"ClassDeclaration":true,"MethodDefinition":true}}]
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
// Options: [{"require":{"ClassDeclaration":true,"MethodDefinition":true}}]
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
// Options: [{"require":{"ClassDeclaration":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

var myFunction = () => {}
// Options: [{"require":{"ArrowFunctionExpression":true}}]
// Message: Missing JSDoc comment.

var myFunction = () => () => {}
// Options: [{"require":{"ArrowFunctionExpression":true}}]
// Message: Missing JSDoc comment.

var foo = function() {}
// Options: [{"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

const foo = {bar() {}}
// Options: [{"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

var foo = {bar: function() {}}
// Options: [{"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

function foo (abc) {}
// Options: [{"exemptEmptyFunctions":false}]
// Message: Missing JSDoc comment.

function foo () {
  return true;
}
// Options: [{"exemptEmptyFunctions":false}]
// Message: Missing JSDoc comment.

module.exports = function quux () {

}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

module.exports = function quux () {

}
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

module.exports = {
  method: function() {

  }
}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

module.exports = {
  test: {
    test2: function() {

    }
  }
}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

module.exports = {
  test: {
    test2: function() {

    }
  }
}
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

const test = module.exports = function () {

}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

/**
*
*/
const test = module.exports = function () {

}

test.prototype.method = function() {}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

const test = function () {

}
module.exports = {
  test: test
}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

const test = () => {

}
module.exports = {
  test: test
}
// Options: [{"publicOnly":true,"require":{"ArrowFunctionExpression":true}}]
// Message: Missing JSDoc comment.

class Test {
    method() {

    }
}
module.exports = Test;
// Options: [{"publicOnly":true,"require":{"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

export default function quux () {

}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export default function quux () {

}
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

function quux () {

}
export default quux;
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export function test() {

}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export function test() {

}
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

var test = function () {

}
var test2 = 2;
export { test, test2 }
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

var test = function () {

}
export { test as test2 }
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export default class A {

}
// Options: [{"publicOnly":true,"require":{"ClassDeclaration":true}}]
// Message: Missing JSDoc comment.

export default class A {

}
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"ClassDeclaration":true}}]
// Message: Missing JSDoc comment.

var test = function () {

}
// Options: [{"publicOnly":{"window":true},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

window.test = function () {

}
// Options: [{"publicOnly":{"window":true},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

function test () {

}
// Options: [{"publicOnly":{"window":true}}]
// Message: Missing JSDoc comment.

module.exports = function() {

}
// Options: [{"publicOnly":{"cjs":true,"esm":false,"window":false},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export function someMethod() {

}
// Options: [{"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"FunctionDeclaration":true}}]
// Message: Missing JSDoc comment.

export function someMethod() {

}
// Options: [{"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"FunctionDeclaration":true}}]
// Message: Missing JSDoc comment.

const myObject = {
  myProp: true
};
// Options: [{"contexts":["Property"]}]
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
// Options: [{"contexts":["TSMethodSignature"]}]
// Message: Missing JSDoc comment.
````


<a name="require-jsdoc-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
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
// Options: [{"require":{"ClassDeclaration":true,"FunctionDeclaration":false,"MethodDefinition":true}}]

var myFunction = function() {}
// Options: [{"require":{"ClassDeclaration":true,"FunctionDeclaration":false,"MethodDefinition":true}}]

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
// Options: [{"require":{"ClassDeclaration":true,"MethodDefinition":true}}]

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
// Options: [{"require":{"ClassDeclaration":true,"MethodDefinition":true}}]

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
// Options: [{"require":{"ClassDeclaration":true,"MethodDefinition":true}}]

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
// Options: [{"require":{"ClassDeclaration":true,"MethodDefinition":true}}]

class A {
    constructor(xs) {
        this.a = xs;
    }
}
// Options: [{"require":{"ClassDeclaration":false,"MethodDefinition":false}}]

/**
* Function doing something
*/
var myFunction = () => {}
// Options: [{"require":{"ArrowFunctionExpression":true}}]

/**
* Function doing something
*/
var myFunction = function () {}
// Options: [{"require":{"ArrowFunctionExpression":true}}]

/**
* Function doing something
*/
var myFunction = () => {}
// Options: [{"require":{"ArrowFunctionExpression":false}}]

/**
 Function doing something
*/
var myFunction = () => () => {}
// Options: [{"require":{"ArrowFunctionExpression":true}}]

setTimeout(() => {}, 10);
// Options: [{"require":{"ArrowFunctionExpression":true}}]

/**
JSDoc Block
*/
var foo = function() {}
// Options: [{"require":{"FunctionExpression":true}}]

const foo = {/**
JSDoc Block
*/
bar() {}}
// Options: [{"require":{"FunctionExpression":true}}]

var foo = {/**
JSDoc Block
*/
bar: function() {}}
// Options: [{"require":{"FunctionExpression":true}}]

var foo = { [function() {}]: 1 };
// Options: [{"require":{"FunctionExpression":true}}]

function foo () {}
// Options: [{"exemptEmptyFunctions":true}]

function foo () {
  return;
}
// Options: [{"exemptEmptyFunctions":true}]

const test = {};
/**
 * test
 */
 test.method = function () {

}
module.exports = {
  prop: { prop2: test.method }
}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
function test() {

}

module.exports = {
  prop: { prop2: test }
}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
test = function() {

}

module.exports = {
  prop: { prop2: test }
}
// Options: [{"publicOnly":{"cjs":true,"esm":false,"window":false},"require":{"FunctionExpression":true}}]

/**
 *
 */
test = function() {

}

exports.someMethod = {
  prop: { prop2: test }
}
// Options: [{"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"FunctionExpression":true}}]

/**
 *
 */
const test = () => {

}

module.exports = {
prop: { prop2: test }
}
// Options: [{"publicOnly":true,"require":{"ArrowFunctionExpression":true}}]

const test = () => {

}
module.exports = {
  prop: { prop2: test }
}
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"ArrowFunctionExpression":true}}]

/**
 *
 */
window.test = function() {

}

module.exports = {
prop: window
}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

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
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

test = function() {

}

test = 2;

module.exports = {
prop: { prop2: test }
}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

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
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

class Test {
  /**
   * Test
   */
  method() {

  }
}
module.exports = Test;
// Options: [{"publicOnly":true,"require":{"MethodDefinition":true}}]

/**
 *
 */
export default function quux () {

}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
export default function quux () {

}
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]

/**
 *
 */
function quux () {

}
export default quux;
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

function quux () {

}
export default quux;
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]

/**
 *
 */
export function test() {

}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
export function test() {

}
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]

/**
 *
 */
var test = function () {

}
var test2 = 2;
export { test, test2 }
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
var test = function () {

}
export { test as test2 }
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
export default class A {

}
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"ClassDeclaration":true}}]

/**
 *
 */
var test = function () {

}
// Options: [{"publicOnly":{"window":true},"require":{"FunctionExpression":true}}]

let test = function () {

}
// Options: [{"publicOnly":{"window":true},"require":{"FunctionExpression":true}}]

let test = class {

}
// Options: [{"publicOnly":true,"require":{"ClassExpression":false}}]

/**
 *
 */
let test = class {

}
// Options: [{"publicOnly":true,"require":{"ClassExpression":true}}]

export function someMethod() {

}
// Options: [{"publicOnly":{"cjs":true,"esm":false,"window":false},"require":{"FunctionDeclaration":true}}]

export function someMethod() {

}
// Options: [{"publicOnly":{"cjs":true,"esm":false,"window":false},"require":{"FunctionDeclaration":true}}]

exports.someMethod = function() {

}
// Options: [{"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"FunctionExpression":true}}]

const myObject = {
  myProp: true
};
// Options: [{"contexts":[]}]

function bear() {}
/**
 *
 */
function quux () {
}
export default quux;
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 * This example interface is great!
 */
export interface Example {
  /**
   * My super test string!
   */
  test: string
}
// Options: [{"contexts":["TSInterfaceDeclaration"]}]

/**
 * This example interface is great!
 */
interface Example {
  /**
   * My super test string!
   */
  test: string
}
// Options: [{"contexts":["TSInterfaceDeclaration"]}]

/**
 * This example type is great!
 */
export type Example = {
  /**
   * My super test string!
   */
  test: string
};
// Options: [{"contexts":["TSTypeAliasDeclaration"]}]

/**
 * This example type is great!
 */
type Example = {
  /**
   * My super test string!
   */
  test: string
};
// Options: [{"contexts":["TSTypeAliasDeclaration"]}]

/**
 * This example enum is great!
 */
export enum Example {
  /**
   * My super test enum!
   */
  test = 123
}
// Options: [{"contexts":["TSEnumDeclaration"]}]

/**
 * This example enum is great!
 */
enum Example {
  /**
   * My super test enum!
   */
  test = 123
}
// Options: [{"contexts":["TSEnumDeclaration"]}]

const foo = {...{}};
function bar() {}
// Options: [{"exemptEmptyFunctions":false,"publicOnly":true,"require":{"ArrowFunctionExpression":true,"ClassDeclaration":true,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":false,"MethodDefinition":true}}]

/**
 * Class documentation
 */
 @logged
export default class Foo {
 // ....
}
// Options: [{"exemptEmptyFunctions":false,"require":{"ClassDeclaration":true}}]

const a = {};
const b = {
  ...a
};

export default b;
// Options: [{"contexts":["ObjectExpression"],"exemptEmptyFunctions":false,"publicOnly":true}]

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
// Options: [{"contexts":["TSMethodSignature"]}]
````

