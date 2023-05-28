<a name="user-content-require-yields"></a>
<a name="require-yields"></a>
# <code>require-yields</code>

* [Options](#user-content-require-yields-options)
* [Context and settings](#user-content-require-yields-context-and-settings)
* [Failing examples](#user-content-require-yields-failing-examples)
* [Passing examples](#user-content-require-yields-passing-examples)


Requires that yields are documented.

Will also report if multiple `@yields` tags are present.

See the `next`, `forceRequireNext`, and `nextWithGeneratorTag` options for an
option to expect a non-standard `@next` tag.

<a name="user-content-require-yields-options"></a>
<a name="require-yields-options"></a>
## Options

- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the
    document block avoids the need for a `@yields`. Defaults to an array
    with `inheritdoc`. If you set this array, it will overwrite the default,
    so be sure to add back `inheritdoc` if you wish its presence to cause
    exemption of the rule.
- `forceRequireYields` - Set to `true` to always insist on
    `@yields` documentation for generators even if there are only
    expressionless `yield` statements in the function. May be desired to flag
    that a project is aware of an `undefined`/`void` yield. Defaults to
    `false`.
- `contexts` - Set this to an array of strings representing the AST context
    (or an object with `context` and `comment` properties) where you wish
    the rule to be applied.
    Overrides the default contexts (see below). Set to `"any"` if you want
    the rule to apply to any jsdoc block throughout your files (as is necessary
    for finding function blocks not attached to a function declaration or
    expression, i.e., `@callback` or `@function` (or its aliases `@func` or
    `@method`) (including those associated with an `@interface`). This
    rule will only apply on non-default contexts when there is such a tag
    present and the `forceRequireYields` option is set or if the
    `withGeneratorTag` option is set with a present `@generator` tag
    (since we are not checking against the actual `yield` values in these
    cases).
- `withGeneratorTag` - If a `@generator` tag is present on a block, require
    `@yields`/`@yield`. Defaults to `true`. See `contexts` to `any` if you want
    to catch `@generator` with `@callback` or such not attached to a function.
- `next` - If `true`, this option will insist that any use of a `yield` return
    value (e.g., `const rv = yield;` or `const rv = yield value;`) has a
    (non-standard) `@next` tag (in addition to any `@yields` tag) so as to be
    able to document the type expected to be supplied into the iterator
    (the `Generator` iterator that is returned by the call to the generator
    function) to the iterator (e.g., `it.next(value)`). The tag will not be
    expected if the generator function body merely has plain `yield;` or
    `yield value;` statements without returning the values. Defaults to
    `false`.
- `forceRequireNext` - Set to `true` to always insist on
    `@next` documentation even if there are no `yield` statements in the
    function or none return values. May be desired to flag that a project is
    aware of the expected yield return being `undefined`. Defaults to `false`.
- `nextWithGeneratorTag` - If a `@generator` tag is present on a block, require
    (non-standard ) `@next` (see `next` option). This will require using `void`
    or `undefined` in cases where generators do not use the `next()`-supplied
    incoming `yield`-returned value. Defaults to `false`. See `contexts` to
    `any` if you want to catch `@generator` with `@callback` or such not
    attached to a function.

<a name="user-content-require-yields-context-and-settings"></a>
<a name="require-yields-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|Generator functions (`FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled)|
|Tags|`yields`|
|Aliases|`yield`|
|Recommended|true|
| Options  |`contexts`, `exemptedBy`, `forceRequireNext`, `forceRequireYields`, `next`, `nextWithGeneratorTag`, `withGeneratorTag`|
| Settings | `ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs` |

<a name="user-content-require-yields-failing-examples"></a>
<a name="require-yields-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 *
 */
function * quux (foo) {

  yield foo;
}
// Message: Missing JSDoc @yields declaration.

/**
 * @yields
 */
function * quux (foo) {

  const retVal = yield foo;
}
// "jsdoc/require-yields": ["error"|"warn", {"next":true}]
// Message: Missing JSDoc @next declaration.

/**
 * @yields
 */
function * quux (foo) {

  const retVal = yield;
}
// "jsdoc/require-yields": ["error"|"warn", {"next":true}]
// Message: Missing JSDoc @next declaration.

/**
 * @yields {void}
 */
function * quux () {
}
// "jsdoc/require-yields": ["error"|"warn", {"forceRequireNext":true}]
// Message: Missing JSDoc @next declaration.

/**
 * @yields {void}
 */
function * quux () {
  yield;
}
// "jsdoc/require-yields": ["error"|"warn", {"forceRequireNext":true}]
// Message: Missing JSDoc @next declaration.

/**
 *
 */
function * quux (foo) {

  const a = yield foo;
}
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
function * quux (foo) {
  yield foo;
}
// Settings: {"jsdoc":{"tagNamePreference":{"yields":"yield"}}}
// Message: Missing JSDoc @yield declaration.

/**
 * @yields
 */
function * quux (foo) {
  const val = yield foo;
}
// Settings: {"jsdoc":{"tagNamePreference":{"next":"yield-returns"}}}
// "jsdoc/require-yields": ["error"|"warn", {"next":true}]
// Message: Missing JSDoc @yield-returns declaration.

/**
 * @yields
 * @next
 */
function * quux () {
  const ret = yield 5;
}
// Settings: {"jsdoc":{"tagNamePreference":{"next":false}}}
// "jsdoc/require-yields": ["error"|"warn", {"next":true}]
// Message: Unexpected tag `@next`

/**
 *
 */
function * quux() {
  yield 5;
}
// "jsdoc/require-yields": ["error"|"warn", {"forceRequireYields":true}]
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
function * quux() {
  yield;
}
// "jsdoc/require-yields": ["error"|"warn", {"forceRequireYields":true}]
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
const quux = async function * () {
  yield;
}
// "jsdoc/require-yields": ["error"|"warn", {"forceRequireYields":true}]
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
async function * quux () {
  yield;
}
// "jsdoc/require-yields": ["error"|"warn", {"forceRequireYields":true}]
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
function * quux () {
  yield;
}
// "jsdoc/require-yields": ["error"|"warn", {"contexts":["any"],"forceRequireYields":true}]
// Message: Missing JSDoc @yields declaration.

/**
 * @function
 * @generator
 */
// "jsdoc/require-yields": ["error"|"warn", {"contexts":["any"],"forceRequireYields":true}]
// Message: Missing JSDoc @yields declaration.

/**
 * @callback
 * @generator
 */
// "jsdoc/require-yields": ["error"|"warn", {"contexts":["any"],"forceRequireYields":true}]
// Message: Missing JSDoc @yields declaration.

/**
 * @yields {undefined}
 * @yields {void}
 */
function * quux (foo) {

  return foo;
}
// Message: Found more than one @yields declaration.

/**
 * @yields
 */
function * quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"yields":false}}}
// Message: Unexpected tag `@yields`

/**
 * @param foo
 */
function * quux (foo) {
  yield 'bar';
}
// "jsdoc/require-yields": ["error"|"warn", {"exemptedBy":["notPresent"]}]
// Message: Missing JSDoc @yields declaration.

/**
 * @param {array} a
 */
async function * foo(a) {
  return;
}
// "jsdoc/require-yields": ["error"|"warn", {"forceRequireYields":true}]
// Message: Missing JSDoc @yields declaration.

/**
 * @param {array} a
 */
async function * foo(a) {
  yield Promise.all(a);
}
// "jsdoc/require-yields": ["error"|"warn", {"forceRequireYields":true}]
// Message: Missing JSDoc @yields declaration.

class quux {
  /**
   *
   */
  * quux () {
    yield;
  }
}
// "jsdoc/require-yields": ["error"|"warn", {"contexts":["any"],"forceRequireYields":true}]
// Message: Missing JSDoc @yields declaration.

/**
 * @param {array} a
 */
async function * foo(a) {
  yield Promise.all(a);
}
// Message: Missing JSDoc @yields declaration.

/**
 * @generator
 */
// "jsdoc/require-yields": ["error"|"warn", {"contexts":["any"],"withGeneratorTag":true}]
// Message: Missing JSDoc @yields declaration.

/**
 * @generator
 * @yields
 */
// "jsdoc/require-yields": ["error"|"warn", {"contexts":["any"],"nextWithGeneratorTag":true}]
// Message: Missing JSDoc @next declaration.

/**
 *
 */
function * quux () {
  if (true) {
    yield;
  }
  yield true;
}
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
function * quux () {
  try {
    yield true;
  } catch (err) {
  }
  yield;
}
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
function * quux () {
  try {
  } finally {
    yield true;
  }
  yield;
}
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
function * quux () {
  try {
    yield;
  } catch (err) {
  }
  yield true;
}
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
function * quux () {
  try {
    something();
  } catch (err) {
    yield true;
  }
  yield;
}
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
function * quux () {
  switch (true) {
  case 'abc':
    yield true;
  }
  yield;
}
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
function * quux () {
  switch (true) {
  case 'abc':
    yield;
  }
  yield true;
}
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
function * quux () {
  for (const i of abc) {
    yield true;
  }
  yield;
}
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
function * quux () {
  for (const a in b) {
    yield true;
  }
}
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
function * quux () {
  for (let i=0; i<n; i+=1) {
    yield true;
  }
}
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
function * quux () {
  while(true) {
    yield true
  }
}
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
function * quux () {
  do {
    yield true
  }
  while(true)
}
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
function * quux () {
  if (true) {
    yield;
  }
  yield true;
}
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
function * quux () {
  if (true) {
    yield true;
  }
}
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
function * quux () {
  var a = {};
  with (a) {
    yield true;
  }
}
// Message: Missing JSDoc @yields declaration.

/**
 *
 */
function * quux () {
  if (true) {
    yield;
  } else {
    yield true;
  }
  yield;
}
// Message: Missing JSDoc @yields declaration.
````



<a name="user-content-require-yields-passing-examples"></a>
<a name="require-yields-passing-examples"></a>
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
 * @yields Foo.
 */
function * quux () {

  yield foo;
}
// "jsdoc/require-yields": ["error"|"warn", {"contexts":["any"]}]

/**
 *
 */
function * quux () {
}

/**
 *
 */
function * quux () {
  yield;
}

/**
 *
 */
function quux (bar) {
  bar.doSomething(function * (baz) {
    yield baz.corge();
  })
}

/**
 * @yields {Array}
 */
function * quux (bar) {
  yield bar.doSomething(function * (baz) {
    yield baz.corge();
  })
}

/**
 * @inheritdoc
 */
function * quux (foo) {
}

/**
 * @override
 */
function * quux (foo) {
}

/**
 * @constructor
 */
function * quux (foo) {
}

/**
 * @implements
 */
function * quux (foo) {
  yield;
}

/**
 * @override
 */
function * quux (foo) {

  yield foo;
}

/**
 * @class
 */
function * quux (foo) {
  yield foo;
}

/**
 * @constructor
 */
function * quux (foo) {
}

/**
 * @yields {object}
 */
function * quux () {

  yield {a: foo};
}

/**
 * @yields {void}
 */
function * quux () {
}

/**
 * @yields {undefined}
 */
function * quux () {
}

/**
 *
 */
function * quux () {
}

/**
 * @yields {void}
 */
function quux () {
}
// "jsdoc/require-yields": ["error"|"warn", {"forceRequireYields":true}]

/**
 * @yields {void}
 * @next {void}
 */
function * quux () {
}
// "jsdoc/require-yields": ["error"|"warn", {"forceRequireNext":true}]

/**
 * @yields {void}
 */
function * quux () {
  yield undefined;
}

/**
 * @yields {void}
 */
function * quux () {
  yield undefined;
}
// "jsdoc/require-yields": ["error"|"warn", {"forceRequireYields":true}]

/**
 * @yields {void}
 */
function * quux () {
  yield;
}

/**
 * @yields {void}
 */
function * quux () {
}
// "jsdoc/require-yields": ["error"|"warn", {"forceRequireYields":true}]

/**
 * @yields {void}
 */
function * quux () {
  yield;
}
// "jsdoc/require-yields": ["error"|"warn", {"forceRequireYields":true}]

/** @type {SpecialIterator} */
function * quux () {
  yield 5;
}

/**
 * @yields {Something}
 */
async function * quux () {
}
// "jsdoc/require-yields": ["error"|"warn", {"forceRequireYields":true}]

/**
 *
 */
async function * quux () {}

/**
 *
 */
const quux = async function * () {}

/**
 * @type {MyCallback}
 */
function * quux () {
  yield;
}
// "jsdoc/require-yields": ["error"|"warn", {"exemptedBy":["type"]}]

/**
 * @param {array} a
 */
async function * foo (a) {
  yield;
}

/**
 *
 */
// "jsdoc/require-yields": ["error"|"warn", {"contexts":["any"]}]

/**
 * @function
 */
// "jsdoc/require-yields": ["error"|"warn", {"contexts":["any"]}]

/**
 * @function
 */
// "jsdoc/require-yields": ["error"|"warn", {"forceRequireYields":true}]

/**
 * @callback
 */
// "jsdoc/require-yields": ["error"|"warn", {"forceRequireYields":true}]

/**
 * @generator
 */
// "jsdoc/require-yields": ["error"|"warn", {"withGeneratorTag":true}]

/**
 * @generator
 */
// "jsdoc/require-yields": ["error"|"warn", {"nextWithGeneratorTag":true}]

/**
 * @generator
 * @yields
 */
// "jsdoc/require-yields": ["error"|"warn", {"contexts":["any"],"withGeneratorTag":true}]

/**
 * @generator
 * @yields
 * @next
 */
// "jsdoc/require-yields": ["error"|"warn", {"contexts":["any"],"nextWithGeneratorTag":true}]

/**
 * @generator
 */
// "jsdoc/require-yields": ["error"|"warn", {"contexts":["any"],"withGeneratorTag":false}]

/**
 * @generator
 * @yields
 */
// "jsdoc/require-yields": ["error"|"warn", {"contexts":["any"],"nextWithGeneratorTag":false}]

/**
 * @yields
 */
function * quux (foo) {

  const a = yield foo;
}

/**
 * @yields
 * @next
 */
function * quux (foo) {
  let a = yield;
}
// "jsdoc/require-yields": ["error"|"warn", {"next":true}]

/**
 * @yields
 * @next
 */
function * quux (foo) {
  const a = yield foo;
}
// "jsdoc/require-yields": ["error"|"warn", {"next":true}]

/**
 *
 */
// "jsdoc/require-yields": ["error"|"warn", {"contexts":["any"],"nextWithGeneratorTag":true}]

/**
 *
 */
// "jsdoc/require-yields": ["error"|"warn", {"contexts":["any"],"next":true}]

/**
 *
 */
function quux () {}
// "jsdoc/require-yields": ["error"|"warn", {"contexts":["any"],"next":true}]

/**
 * @yields {void}
 */
function * quux () {
  yield;
}
// "jsdoc/require-yields": ["error"|"warn", {"next":true}]

/**
 *
 */
function * quux (foo) {
  const a = function * bar () {
    yield foo;
  }
}
````

