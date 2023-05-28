<a name="user-content-require-yields-check"></a>
<a name="require-yields-check"></a>
# <code>require-yields-check</code>

* [Options](#user-content-require-yields-check-options)
* [Context and settings](#user-content-require-yields-check-context-and-settings)
* [Failing examples](#user-content-require-yields-check-failing-examples)
* [Passing examples](#user-content-require-yields-check-passing-examples)


Ensures that if a `@yields` is present that a `yield` (or `yield` with a
value) is present in the function body (or that if a `@next` is present that
there is a `yield` with a return value present).

Please also note that JavaScript does allow generators not to have `yield`
(e.g., with just a return or even no explicit return), but if you want to
enforce that all generators (except wholly empty ones) have a `yield` in the
function body, you can use the ESLint
[`require-yield`](https://eslint.org/docs/rules/require-yield) rule. In
conjunction with this, you can also use the `checkGeneratorsOnly` option
as an optimization so that this rule won't need to do its own checking within
function bodies.

Will also report if multiple `@yields` tags are present.

<a name="user-content-require-yields-check-options"></a>
<a name="require-yields-check-options"></a>
## Options

- `checkGeneratorsOnly` - Avoids checking the function body and merely insists
    that all generators have `@yields`. This can be an optimization with the
    ESLint `require-yield` rule, as that rule already ensures a `yield` is
    present in generators, albeit assuming the generator is not empty).
    Defaults to `false`.
- `next` - If `true`, this option will insist that any use of a (non-standard)
    `@next` tag (in addition to any `@yields` tag) will be matched by a `yield`
    which uses a return value in the body of the generator (e.g.,
    `const rv = yield;` or `const rv = yield value;`). This (non-standard)
    tag is intended to be used to indicate a type and/or description of
    the value expected to be supplied by the user when supplied to the iterator
    by its `next` method, as with `it.next(value)` (with the iterator being
    the `Generator` iterator that is returned by the call to the generator
    function). This option will report an error if the generator function body
    merely has plain `yield;` or `yield value;` statements without returning
    the values. Defaults to `false`.

<a name="user-content-require-yields-check-context-and-settings"></a>
<a name="require-yields-check-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`yields`|
|Aliases|`yield`|
|Recommended|true|
|Options|`checkGeneratorsOnly`, `contexts`, `exemptedBy`, `next`|

<a name="user-content-require-yields-check-failing-examples"></a>
<a name="require-yields-check-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @yields
 */
function * quux (foo) {

}
// Message: JSDoc @yields declaration present but yield expression not available in function.

/**
 * @yields
 */
function quux (foo) {

}
// "jsdoc/require-yields-check": ["error"|"warn", {"checkGeneratorsOnly":true}]
// Message: JSDoc @yields declaration present but yield expression not available in function.

/**
 * @next
 */
function quux (foo) {

}
// "jsdoc/require-yields-check": ["error"|"warn", {"checkGeneratorsOnly":true,"next":true}]
// Message: JSDoc @next declaration present but yield expression with return value not available in function.

/**
 * @next {SomeType}
 */
function * quux (foo) {

}
// "jsdoc/require-yields-check": ["error"|"warn", {"next":true}]
// Message: JSDoc @next declaration present but yield expression with return value not available in function.

/**
 * @next {SomeType}
 */
function * quux (foo) {
  yield;
}
// "jsdoc/require-yields-check": ["error"|"warn", {"next":true}]
// Message: JSDoc @next declaration present but yield expression with return value not available in function.

/**
 * @next {SomeType}
 */
function * quux (foo) {
  yield 5;
}
// "jsdoc/require-yields-check": ["error"|"warn", {"next":true}]
// Message: JSDoc @next declaration present but yield expression with return value not available in function.

/**
 * @yield
 */
function * quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"yields":"yield"}}}
// Message: JSDoc @yield declaration present but yield expression not available in function.

/**
 * @yield-returns {Something}
 */
function * quux (foo) {
  yield;
}
// Settings: {"jsdoc":{"tagNamePreference":{"next":"yield-returns"}}}
// "jsdoc/require-yields-check": ["error"|"warn", {"next":true}]
// Message: JSDoc @yield-returns declaration present but yield expression with return value not available in function.

/**
 * @yields {undefined} Foo.
 * @yields {String} Foo.
 */
function * quux () {

  yield foo;
}
// Message: Found more than one @yields declaration.

class Foo {
  /**
   * @yields {string}
   */
  * bar () {
  }
}
// Message: JSDoc @yields declaration present but yield expression not available in function.

/**
 * @yields
 */
function * quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"yields":false}}}
// Message: Unexpected tag `@yields`

/**
 * @next
 */
function * quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"next":false}}}
// "jsdoc/require-yields-check": ["error"|"warn", {"next":true}]
// Message: Unexpected tag `@next`

/**
 * @yields {string}
 */
function * f () {
  function * g() {
    yield 'foo'
  }
}
// Message: JSDoc @yields declaration present but yield expression not available in function.

/**
 * @yields {Promise<void>}
 */
async function * quux() {}
// Message: JSDoc @yields declaration present but yield expression not available in function.

/**
 * @yields {Promise<void>}
 */
const quux = async function * () {}
// Message: JSDoc @yields declaration present but yield expression not available in function.

/**
 * @yields {never} Foo.
 */
function * quux () {
  yield 5;
}
// Message: JSDoc @yields declaration set with "never" but yield expression is present in function.

/**
 * @next {never}
 */
function * quux (foo) {
  const a = yield;
}
// "jsdoc/require-yields-check": ["error"|"warn", {"next":true}]
// Message: JSDoc @next declaration set with "never" but yield expression with return value is present in function.
````



<a name="user-content-require-yields-check-passing-examples"></a>
<a name="require-yields-check-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @yields Foo.
 */
function * quux () {

  yield foo;
}

/**
 * @yields {string} Foo.
 */
function * quux () {

  yield foo;
}

/**
 * @yields {string} Foo.
 */
function * quux () {

  yield foo;
}

/**
 *
 */
function * quux () {
}

/**
 * @yields {undefined} Foo.
 */
function * quux () {}

/**
 * @yields { void } Foo.
 */
function quux () {}

/**
 * @yields Foo.
 * @abstract
 */
function * quux () {
  throw new Error('must be implemented by subclass!');
}

/**
 * @yields Foo.
 * @virtual
 */
function * quux () {
  throw new Error('must be implemented by subclass!');
}

/**
 * @yields Foo.
 * @constructor
 */
function * quux () {
}

/**
 * @interface
 */
class Foo {
  /**
   * @yields {string}
   */
  * bar () {
  }
}

/**
 * @record
 */
class Foo {
  /**
   * @yields {string}
   */
  * bar () {
  }
}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @yields {undefined} Foo.
 */
function * quux () {
}

/**
 * @yields {void} Foo.
 */
function * quux () {
}

/**
 * @yields {never} Foo.
 */
function * quux () {
}

/**
 * @yields {void} Foo.
 */
function * quux () {
  yield undefined;
}

/**
 * @yields {void} Foo.
 */
function * quux () {
  yield;
}

/**
 *
 */
function * quux () {
  yield undefined;
}

/**
 *
 */
function * quux () {
  yield;
}

/**
 * @yields {true}
 */
function * quux () {
  try {
    yield true;
  } catch (err) {
  }
  yield;
}

/**
 * @yields {true}
 */
function * quux () {
  try {
  } finally {
    yield true;
  }
  yield;
}

/**
 * @yields {true}
 */
function * quux () {
  try {
    yield;
  } catch (err) {
  }
  yield true;
}

/**
 * @yields {true}
 */
function * quux () {
  try {
    something();
  } catch (err) {
    yield true;
  }
  yield;
}

/**
 * @yields {true}
 */
function * quux () {
  switch (true) {
  case 'abc':
    yield true;
  }
  yield;
}

/**
 * @yields {true}
 */
function * quux () {
  switch (true) {
  case 'abc':
    yield;
  }
  yield true;
}

/**
 * @yields {true}
 */
function * quux () {
  for (const i of abc) {
    yield true;
  }
  yield;
}

/**
 * @yields {true}
 */
function * quux () {
  for (const a in b) {
    yield true;
  }
}

/**
 * @yields {true}
 */
function * quux () {
  for (let i=0; i<n; i+=1) {
    yield true;
  }
}

/**
 * @yields {true}
 */
function * quux () {
  while(true) {
    yield true
  }
}

/**
 * @yields {true}
 */
function * quux () {
  do {
    yield true
  }
  while(true)
}

/**
 * @yields {true}
 */
function * quux () {
  if (true) {
    yield;
  }
  yield true;
}

/**
 * @yields {true}
 */
function * quux () {
  if (true) {
    yield true;
  }
}

/**
 * @yields {true}
 */
function * quux () {
  var a = {};
  with (a) {
    yield true;
  }
}

/**
 * @yields {true}
 */
function * quux () {
  if (true) {
    yield;
  } else {
    yield true;
  }
  yield;
}

/**
 * @next {void}
 */
function * quux (foo) {

}
// "jsdoc/require-yields-check": ["error"|"warn", {"next":true}]

/**
 * @next {SomeType}
 */
function * quux (foo) {
  const a = yield;
}
// "jsdoc/require-yields-check": ["error"|"warn", {"next":true}]

/**
 * @next {SomeType}
 */
function * quux (foo) {
  const a = yield 5;
}
// "jsdoc/require-yields-check": ["error"|"warn", {"next":true}]

/**
 * @next {never}
 */
function * quux (foo) {

}
// "jsdoc/require-yields-check": ["error"|"warn", {"next":true}]
````

