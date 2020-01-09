<a name="require-returns"></a>
# <code>require-returns</code>

* [`require-returns`](#require-returns)
    * [Options](#require-returns-options)
    * [Context and settings](#require-returns-context-and-settings)
    * [Failing examples](#require-returns-failing-examples)
    * [Passing examples](#require-returns-passing-examples)


Requires that return statements are documented.

Will also report if multiple `@returns` tags are present.

<a name="require-returns-options"></a>
## Options

- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the document
    block avoids the need for a `@returns`. Defaults to an empty array.
- `forceRequireReturn` - Set to `true` to always insist on
  `@returns` documentation regardless of implicit or explicit `return`'s
  in the function. May be desired to flag that a project is aware of an
  `undefined`/`void` return. Defaults to `false`.
- `forceReturnsWithAsync` - By default `async` functions that do not explicitly
  return a value pass this rule as an `async` function will always return a
  `Promise`, even if the `Promise` resolves to void. You can force all `async`
  functions to require return statements by setting `forceReturnsWithAsync`
  to `true` on the options object. This may be useful for flagging that there
  has been consideration of return type. Defaults to `false`.
- `contexts` - Set this to an array of strings representing the AST context
  where you wish the rule to be applied.
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

```js
'jsdoc/require-returns': ['error', {forceReturnsWithAsync: true}]
```

<a name="require-returns-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`returns`|
|Aliases|`return`|
|Options|`contexts`, `exemptedBy`, `forceRequireReturn`, `forceReturnsWithAsync`|
|Settings|`overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

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
function foo() {}

/**
 *
 */
function bar() {}
// Settings: {"jsdoc":{"forceRequireReturn":true}}
// Message: `settings.jsdoc.forceRequireReturn` has been removed, use options in the rule `require-returns` instead.

/**
 *
 */
async function quux() {
}
// Options: [{"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const quux = async function () {}
// Options: [{"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const quux = async () => {}
// Options: [{"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
async function quux () {}
// Options: [{"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
}
// Options: [{"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
}
// Options: [{"contexts":["any"],"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @function
 */
// Options: [{"contexts":["any"],"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @callback
 */
// Options: [{"contexts":["any"],"forceRequireReturn":true}]
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
// Options: [{"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @function
 * @async
 */
// Options: [{"contexts":["any"],"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @callback
 * @async
 */
// Options: [{"contexts":["any"],"forceReturnsWithAsync":true}]
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
// Options: [{"exemptedBy":["notPresent"]}]
// Message: Missing JSDoc @returns declaration.

/**
 * @param {array} a
 */
async function foo(a) {
  return;
}
// Options: [{"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @param {array} a
 */
async function foo(a) {
  return Promise.all(a);
}
// Options: [{"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.
````


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
// Options: [{"contexts":["any"]}]

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
}

/**
 * @implements
 */
function quux (foo) {
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
// Options: [{"forceRequireReturn":true}]

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
// Options: [{"forceRequireReturn":true}]

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
// Options: [{"forceRequireReturn":true}]

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
// Options: [{"forceRequireReturn":true}]

/**
 * @returns {void}
 */
function quux () {
  return;
}
// Options: [{"forceRequireReturn":true}]

/** @type {RequestHandler} */
function quux (req, res , next) {
  return;
}

/**
 * @returns {Promise}
 */
async function quux () {
}
// Options: [{"forceRequireReturn":true}]

/**
 * @returns {Promise}
 */
async function quux () {
}
// Options: [{"forceReturnsWithAsync":true}]

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
// Options: [{"forceReturnsWithAsync":true}]

/**
 * @type {MyCallback}
 */
function quux () {

}
// Options: [{"exemptedBy":["type"]}]

/**
 * @param {array} a
 */
async function foo(a) {
  return Promise.all(a);
}

/**
 * @param {array} a
 */
async function foo(a) {
  return;
}

/**
 *
 */
// Options: [{"contexts":["any"]}]

/**
 * @async
 */
// Options: [{"contexts":["any"]}]

/**
 * @function
 */
// Options: [{"forceRequireReturn":true}]

/**
 * @callback
 */
// Options: [{"forceRequireReturn":true}]

/**
 * @function
 * @async
 */
// Options: [{"forceReturnsWithAsync":true}]

/**
 * @callback
 * @async
 */
// Options: [{"forceReturnsWithAsync":true}]

/**
 * @function
 */
// Options: [{"contexts":["any"],"forceReturnsWithAsync":true}]

/**
 * @callback
 */
// Options: [{"contexts":["any"],"forceReturnsWithAsync":true}]
````

