<a name="user-content-require-returns"></a>
<a name="require-returns"></a>
# <code>require-returns</code>

* [Options](#user-content-require-returns-options)
* [Context and settings](#user-content-require-returns-context-and-settings)
* [Failing examples](#user-content-require-returns-failing-examples)
* [Passing examples](#user-content-require-returns-passing-examples)


Requires that return statements are documented.

Will also report if multiple `@returns` tags are present.

<a name="user-content-require-returns-options"></a>
<a name="require-returns-options"></a>
## Options

- `checkConstructors` - A value indicating whether `constructor`s should
    be checked for `@returns` tags. Defaults to `false`.
- `checkGetters` - Boolean to determine whether getter methods should
    be checked for `@returns` tags. Defaults to `true`.
- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the
    document block avoids the need for a `@returns`. Defaults to an array
    with `inheritdoc`. If you set this array, it will overwrite the default,
    so be sure to add back `inheritdoc` if you wish its presence to cause
    exemption of the rule.
- `forceRequireReturn` - Set to `true` to always insist on
    `@returns` documentation regardless of implicit or explicit `return`'s
    in the function. May be desired to flag that a project is aware of an
    `undefined`/`void` return. Defaults to `false`.
- `forceReturnsWithAsync` - By default `async` functions that do not explicitly
    return a value pass this rule as an `async` function will always return a
    `Promise`, even if the `Promise` resolves to void. You can force all
    `async` functions (including ones with an explicit `Promise` but no
    detected non-`undefined` `resolve` value) to require `@return`
    documentation by setting `forceReturnsWithAsync` to `true` on the options
    object. This may be useful for flagging that there has been consideration
    of return type. Defaults to `false`.
- `contexts` - Set this to an array of strings representing the AST context
    (or an object with `context` and `comment` properties) where you wish
    the rule to be applied.
    Overrides the default contexts (see below). Set to `"any"` if you want
    the rule to apply to any jsdoc block throughout your files (as is necessary
    for finding function blocks not attached to a function declaration or
    expression, i.e., `@callback` or `@function` (or its aliases `@func` or
    `@method`) (including those associated with an `@interface`). This
    rule will only apply on non-default contexts when there is such a tag
    present and the `forceRequireReturn` option is set or if the
    `forceReturnsWithAsync` option is set with a present `@async` tag
    (since we are not checking against the actual `return` values in these
    cases).

<a name="user-content-require-returns-context-and-settings"></a>
<a name="require-returns-context-and-settings"></a>
## Context and settings

|          |         |
| -------- | ------- |
| Context  | `ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled |
| Tags     | `returns` |
| Aliases  | `return` |
|Recommended|true|
| Options  |`checkConstructors`, `checkGetters`, `contexts`, `exemptedBy`, `forceRequireReturn`, `forceReturnsWithAsync`|
| Settings | `ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs` |

<a name="user-content-require-returns-failing-examples"></a>
<a name="require-returns-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
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
````



<a name="user-content-require-returns-passing-examples"></a>
<a name="require-returns-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
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
function quux () {
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
}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]

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
````

