<a name="user-content-require-returns"></a>
<a name="require-returns"></a>
# <code>require-returns</code>

* [Fixer](#user-content-require-returns-fixer)
* [Options](#user-content-require-returns-options)
    * [`checkConstructors`](#user-content-require-returns-options-checkconstructors)
    * [`checkGetters`](#user-content-require-returns-options-checkgetters)
    * [`contexts`](#user-content-require-returns-options-contexts)
    * [`enableFixer`](#user-content-require-returns-options-enablefixer)
    * [`exemptedBy`](#user-content-require-returns-options-exemptedby)
    * [`forceRequireReturn`](#user-content-require-returns-options-forcerequirereturn)
    * [`forceReturnsWithAsync`](#user-content-require-returns-options-forcereturnswithasync)
    * [`publicOnly`](#user-content-require-returns-options-publiconly)
* [Context and settings](#user-content-require-returns-context-and-settings)
* [Failing examples](#user-content-require-returns-failing-examples)
* [Passing examples](#user-content-require-returns-passing-examples)


Requires that return statements are documented.

Will also report if multiple `@returns` tags are present.

<a name="user-content-require-returns-fixer"></a>
<a name="require-returns-fixer"></a>
## Fixer

Adds a blank `@returns`.

<a name="user-content-require-returns-options"></a>
<a name="require-returns-options"></a>
## Options

A single options object has the following properties.

<a name="user-content-require-returns-options-checkconstructors"></a>
<a name="require-returns-options-checkconstructors"></a>
### <code>checkConstructors</code>

A value indicating whether `constructor`s should
be checked for `@returns` tags. Defaults to `false`.

<a name="user-content-require-returns-options-checkgetters"></a>
<a name="require-returns-options-checkgetters"></a>
### <code>checkGetters</code>

Boolean to determine whether getter methods should
be checked for `@returns` tags. Defaults to `true`.

<a name="user-content-require-returns-options-contexts"></a>
<a name="require-returns-options-contexts"></a>
### <code>contexts</code>

Set this to an array of strings representing the AST context
(or objects with optional `context` and `comment` properties) where you wish
the rule to be applied.

`context` defaults to `any` and `comment` defaults to no specific comment context.

Overrides the default contexts (`ArrowFunctionExpression`, `FunctionDeclaration`,
`FunctionExpression`). Set to `"any"` if you want
the rule to apply to any JSDoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., `@callback` or `@function` (or its aliases `@func` or
`@method`) (including those associated with an `@interface`). This
rule will only apply on non-default contexts when there is such a tag
present and the `forceRequireReturn` option is set or if the
`forceReturnsWithAsync` option is set with a present `@async` tag
(since we are not checking against the actual `return` values in these
cases).

<a name="user-content-require-returns-options-enablefixer"></a>
<a name="require-returns-options-enablefixer"></a>
### <code>enableFixer</code>

Whether to enable the fixer to add a blank `@returns`.
Defaults to `false`.

<a name="user-content-require-returns-options-exemptedby"></a>
<a name="require-returns-options-exemptedby"></a>
### <code>exemptedBy</code>

Array of tags (e.g., `['type']`) whose presence on the
document block avoids the need for a `@returns`. Defaults to an array
with `inheritdoc`. If you set this array, it will overwrite the default,
so be sure to add back `inheritdoc` if you wish its presence to cause
exemption of the rule.

<a name="user-content-require-returns-options-forcerequirereturn"></a>
<a name="require-returns-options-forcerequirereturn"></a>
### <code>forceRequireReturn</code>

Set to `true` to always insist on
`@returns` documentation regardless of implicit or explicit `return`'s
in the function. May be desired to flag that a project is aware of an
`undefined`/`void` return. Defaults to `false`.

<a name="user-content-require-returns-options-forcereturnswithasync"></a>
<a name="require-returns-options-forcereturnswithasync"></a>
### <code>forceReturnsWithAsync</code>

By default `async` functions that do not explicitly
return a value pass this rule as an `async` function will always return a
`Promise`, even if the `Promise` resolves to void. You can force all
`async` functions (including ones with an explicit `Promise` but no
detected non-`undefined` `resolve` value) to require `@return`
documentation by setting `forceReturnsWithAsync` to `true` on the options
object. This may be useful for flagging that there has been consideration
of return type. Defaults to `false`.

<a name="user-content-require-returns-options-publiconly"></a>
<a name="require-returns-options-publiconly"></a>
### <code>publicOnly</code>

This option will insist that missing `@returns` are only reported for
function bodies / class declarations that are exported from the module.
May be a boolean or object. If set to `true`, the defaults below will be
used. If unset, `@returns` reporting will not be limited to exports.

This object supports the following optional boolean keys (`false` unless
otherwise noted):

- `ancestorsOnly` - Optimization to only check node ancestors to check if node is exported
- `esm` - ESM exports are checked for `@returns` JSDoc comments (Defaults to `true`)
- `cjs` - CommonJS exports are checked for `@returns` JSDoc comments  (Defaults to `true`)
- `window` - Window global exports are checked for `@returns` JSDoc comments


<a name="user-content-require-returns-context-and-settings"></a>
<a name="require-returns-context-and-settings"></a>
## Context and settings

|          |         |
| -------- | ------- |
| Context  | `ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled |
| Tags     | `returns` |
| Aliases  | `return` |
|Recommended|true|
| Options  |`checkConstructors`, `checkGetters`, `contexts`, `enableFixer`, `exemptedBy`, `forceRequireReturn`, `forceReturnsWithAsync`, `publicOnly`|
| Settings | `ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs` |

<a name="user-content-require-returns-failing-examples"></a>
<a name="require-returns-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 *
 */
function quux (foo) {

  return foo;
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux (foo) {

  return foo;
}
// "jsdoc/require-returns": ["error"|"warn", {"enableFixer":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const foo = () => ({
  bar: 'baz'
})
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const foo = bar=>({ bar })
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const foo = bar => bar.baz()
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux (foo) {

  return foo;
}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":"return"}}}
// Message: Missing JSDoc @return declaration.

/**
 *
 */
async function quux() {
}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const quux = async function () {}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const quux = async () => {}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
async function quux () {}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
}
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"],"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @function
 */
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"],"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @callback
 */
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"],"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

const language = {
  /**
   * @param {string} name
   */
  get name() {
    return this._name;
  }
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
async function quux () {
}
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @function
 * @async
 */
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"],"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @callback
 * @async
 */
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"],"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @returns {undefined}
 * @returns {void}
 */
function quux (foo) {

  return foo;
}
// Message: Found more than one @returns declaration.

/**
 * @returns
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":false}}}
// Message: Unexpected tag `@returns`

/**
 * @param foo
 */
function quux (foo) {
  return 'bar';
}
// "jsdoc/require-returns": ["error"|"warn", {"exemptedBy":["notPresent"]}]
// Message: Missing JSDoc @returns declaration.

/**
 * @param {array} a
 */
async function foo(a) {
  return;
}
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @param {array} a
 */
async function foo(a) {
  return Promise.all(a);
}
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

class foo {
  /** gets bar */
  get bar() {
    return 0;
  }
}
// "jsdoc/require-returns": ["error"|"warn", {"checkGetters":true}]
// Message: Missing JSDoc @returns declaration.

class TestClass {
  /**
   *
   */
  constructor() {
    return new Map();
  }
}
// "jsdoc/require-returns": ["error"|"warn", {"checkConstructors":true}]
// Message: Missing JSDoc @returns declaration.

class TestClass {
  /**
   *
   */
  get Test() {
    return 0;
  }
}
// "jsdoc/require-returns": ["error"|"warn", {"checkGetters":true}]
// Message: Missing JSDoc @returns declaration.

class quux {
  /**
   *
   */
  quux () {
  }
}
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"],"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux (foo) {

  return new Promise(function (resolve, reject) {
    resolve(foo);
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux (foo) {

  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(true);
    });
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux (foo) {

  return new Promise(function (resolve, reject) {
    foo(resolve);
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    while(true) {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    do {
      resolve(true);
    }
    while(true)
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    if (true) {
      resolve(true);
    }
    return;
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    if (true) {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  var a = {};
  return new Promise((resolve, reject) => {
    with (a) {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  var a = {};
  return new Promise((resolve, reject) => {
    try {
      resolve(true);
    } catch (err) {}
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  var a = {};
  return new Promise((resolve, reject) => {
    try {
    } catch (err) {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  var a = {};
  return new Promise((resolve, reject) => {
    try {
    } catch (err) {
    } finally {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  var a = {};
  return new Promise((resolve, reject) => {
    switch (a) {
    case 'abc':
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    if (true) {
      resolve();
    } else {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < 5 ; i++) {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    for (const i of obj) {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    for (const i in obj) {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    if (true) {
      return;
    } else {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    function a () {
      resolve(true);
    }
    a();
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise();
}
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
async function quux () {
  return new Promise();
}
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
async function quux () {
  return new Promise((resolve, reject) => {});
}
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

export class A {
  /**
   * Description.
   */
  public f(): string {
    return "";
  }
}

export interface B {
  /**
   * Description.
   */
  f(): string;

  /**
   * Description.
   */
  g: () => string;

  /**
   * Description.
   */
  h(): void;

  /**
   * Description.
   */
  i: () => void;
}

/**
 * Description.
 */
export function f(): string {
  return "";
}
// "jsdoc/require-returns": ["error"|"warn", {"contexts":[":not(BlockStatement) > FunctionDeclaration","MethodDefinition","TSMethodSignature","TSPropertySignature > TSTypeAnnotation > TSFunctionType"]}]
// Message: Missing JSDoc @returns declaration.

/**
 * @param ms time in millis
 */
export const sleep = (ms: number) =>
  new Promise<string>((res) => setTimeout(res, ms));
// Message: Missing JSDoc @returns declaration.

/**
 * @param ms time in millis
 */
export const sleep = (ms: number) => {
  return new Promise<string>((res) => setTimeout(res, ms));
};
// Message: Missing JSDoc @returns declaration.

/**
 * Reads a test fixture.
 */
export function readFixture(path: string): Promise<Buffer>;
// Message: Missing JSDoc @returns declaration.

/**
 * Reads a test fixture.
 */
export function readFixture(path: string): void;
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * Reads a test fixture.
 */
export function readFixture(path: string);
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @param {array} a
 */
async function foo(a) {
  return Promise.all(a);
}
// Message: Missing JSDoc @returns declaration.

/**
 * Description.
 */
export default async function demo() {
  return true;
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {}

class Test {
  /**
   *
   */
  abstract Test(): string;
}
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["FunctionDeclaration",{"context":"TSEmptyBodyFunctionExpression","forceRequireReturn":true}]}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
module.exports = function quux (foo) {

  return foo;
}
// "jsdoc/require-returns": ["error"|"warn", {"publicOnly":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const a = function quux (foo) {

  return foo;
};

export default a;
// "jsdoc/require-returns": ["error"|"warn", {"publicOnly":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
export default function quux (foo) {

  return foo;
};
// "jsdoc/require-returns": ["error"|"warn", {"publicOnly":{"ancestorsOnly":true,"esm":true}}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
exports.quux = function quux (foo) {

  return foo;
};
// "jsdoc/require-returns": ["error"|"warn", {"publicOnly":{"cjs":true}}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
window.quux = function quux (foo) {

  return foo;
};
// "jsdoc/require-returns": ["error"|"warn", {"publicOnly":{"window":true}}]
// Message: Missing JSDoc @returns declaration.
````



<a name="user-content-require-returns-passing-examples"></a>
<a name="require-returns-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @returns Foo.
 */
function quux () {

  return foo;
}

/**
 * @returns Foo.
 */
function quux () {

  return foo;
}
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"]}]

/**
 *
 */
function quux () {
}

/**
 *
 */
function quux (bar) {
  bar.filter(baz => {
    return baz.corge();
  })
}

/**
 * @returns Array
 */
function quux (bar) {
  return bar.filter(baz => {
    return baz.corge();
  })
}

/**
 * @returns Array
 */
const quux = (bar) => bar.filter(({ corge }) => corge())

/**
 * @inheritdoc
 */
function quux (foo) {
}

/**
 * @override
 */
function quux (foo) {
}

/**
 * @constructor
 */
function quux (foo) {
  return true;
}

/**
 * @implements
 */
function quux (foo) {
  return true;
}

/**
 * @override
 */
function quux (foo) {

  return foo;
}

/**
 * @class
 */
function quux (foo) {
  return true;
}

/**
 * @constructor
 */
function quux (foo) {

}

/**
 * @returns {object}
 */
function quux () {

  return {a: foo};
}

/**
 * @returns {object}
 */
const quux = () => ({a: foo});

/**
 * @returns {object}
 */
const quux = () => {
  return {a: foo}
};

/**
 * @returns {void}
 */
function quux () {
}

/**
 * @returns {void}
 */
const quux = () => {

}

/**
 * @returns {undefined}
 */
function quux () {
}

/**
 * @returns {undefined}
 */
const quux = () => {

}

/**
 *
 */
const quux = () => {

}

class Foo {
  /**
   *
   */
  constructor () {
  }
}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]

const language = {
  /**
   * @param {string} name
   */
  set name(name) {
    this._name = name;
  }
}

/**
 * @returns {void}
 */
function quux () {
}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]

/**
 * @returns {void}
 */
function quux () {
  return undefined;
}

/**
 * @returns {void}
 */
function quux () {
  return undefined;
}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]

/**
 * @returns {void}
 */
function quux () {
  return;
}

/**
 * @returns {void}
 */
function quux () {
  return;
}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]

/** @type {RequestHandler} */
function quux (req, res , next) {
  return;
}

/**
 * @returns {Promise}
 */
async function quux () {
}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]

/**
 * @returns {Promise}
 */
async function quux () {
}
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]

/**
 *
 */
async function quux () {}

/**
 *
 */
const quux = async function () {}

/**
 *
 */
const quux = async () => {}

/** foo class */
class foo {
  /** foo constructor */
  constructor () {
    // =>
    this.bar = true;
  }
}

export default foo;

/**
 *
 */
function quux () {
}
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]

/**
 * @type {MyCallback}
 */
function quux () {

}
// "jsdoc/require-returns": ["error"|"warn", {"exemptedBy":["type"]}]

/**
 * @param {array} a
 */
async function foo(a) {
  return;
}

/**
 *
 */
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"]}]

/**
 * @async
 */
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"]}]

/**
 * @function
 */
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]

/**
 * @callback
 */
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]

/**
 * @function
 * @async
 */
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]

/**
 * @callback
 * @async
 */
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]

/**
 * @function
 */
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"],"forceReturnsWithAsync":true}]

/**
 * @callback
 */
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"],"forceReturnsWithAsync":true}]

class foo {
  get bar() {
    return 0;
  }
}
// "jsdoc/require-returns": ["error"|"warn", {"checkGetters":false}]

class foo {
  /** @returns zero */
  get bar() {
    return 0;
  }
}
// "jsdoc/require-returns": ["error"|"warn", {"checkGetters":true}]

class foo {
  /** @returns zero */
  get bar() {
    return 0;
  }
}
// "jsdoc/require-returns": ["error"|"warn", {"checkGetters":false}]

class TestClass {
  /**
   *
   */
  constructor() { }
}

class TestClass {
  /**
   * @returns A map.
   */
  constructor() {
    return new Map();
  }
}

class TestClass {
  /**
   *
   */
  constructor() { }
}
// "jsdoc/require-returns": ["error"|"warn", {"checkConstructors":false}]

class TestClass {
  /**
   *
   */
  get Test() { }
}

class TestClass {
  /**
   * @returns A number.
   */
  get Test() {
    return 0;
  }
}

class TestClass {
  /**
   *
   */
  get Test() {
    return 0;
  }
}
// "jsdoc/require-returns": ["error"|"warn", {"checkGetters":false}]

/**
 *
 */
function quux (foo) {

  return new Promise(function (resolve, reject) {
    resolve();
  });
}

/**
 *
 */
function quux (foo) {

  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve();
    });
  });
}

/**
 *
 */
function quux (foo) {

  return new Promise(function (resolve, reject) {
    foo();
  });
}

/**
 *
 */
function quux (foo) {

  return new Promise(function (resolve, reject) {
    abc((resolve) => {
      resolve(true);
    });
  });
}

/**
 *
 */
function quux (foo) {

  return new Promise(function (resolve, reject) {
    abc(function (resolve) {
      resolve(true);
    });
  });
}

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    if (true) {
      resolve();
    }
  });
  return;
}

/**
 *
 */
function quux () {
  return new Promise();
}

/**
 * Description.
 */
async function foo() {
  return new Promise(resolve => resolve());
}

/**
 * @param ms time in millis
 */
export const sleep = (ms: number) =>
  new Promise<void>((res) => setTimeout(res, ms));

/**
 * @param ms time in millis
 */
export const sleep = (ms: number) => {
  return new Promise<void>((res) => setTimeout(res, ms));
};

/**
 * Reads a test fixture.
 *
 * @returns The file contents as buffer.
 */
export function readFixture(path: string): Promise<Buffer>;

/**
 * Reads a test fixture.
 *
 * @returns {void}.
 */
export function readFixture(path: string): void;

/**
 * Reads a test fixture.
 */
export function readFixture(path: string): void;

/**
 * Reads a test fixture.
 */
export function readFixture(path: string);

/**
 *
 */
function quux () {}

class Test {
  /**
   * @returns {string} The test value
   */
  abstract Test(): string;
}
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["FunctionDeclaration",{"context":"TSEmptyBodyFunctionExpression","forceRequireReturn":true}]}]

/**
 *
 */
function quux (foo) {

  return foo;
}
// "jsdoc/require-returns": ["error"|"warn", {"publicOnly":true}]
````

