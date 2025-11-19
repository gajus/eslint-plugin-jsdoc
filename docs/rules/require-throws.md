<a name="user-content-require-throws"></a>
<a name="require-throws"></a>
# <code>require-throws</code>

* [Options](#user-content-require-throws-options)
    * [`contexts`](#user-content-require-throws-options-contexts)
    * [`exemptedBy`](#user-content-require-throws-options-exemptedby)
* [Context and settings](#user-content-require-throws-context-and-settings)
* [Failing examples](#user-content-require-throws-failing-examples)
* [Passing examples](#user-content-require-throws-passing-examples)


Requires that throw statements are documented.

See
[this discussion](https://stackoverflow.com/questions/50071115/typescript-promise-rejection-type)
on why TypeScript doesn't offer such a feature.

Note that since throw statements within async functions end up as rejected
`Promise`'s, they are not considered as throw statements for the purposes of
this rule. See the `require-rejects` rule for a non-standard way to document
`Promise` rejections.

<a name="user-content-require-throws-options"></a>
<a name="require-throws-options"></a>
## Options

A single options object has the following properties.

<a name="user-content-require-throws-options-contexts"></a>
<a name="require-throws-options-contexts"></a>
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
`@method`) (including those associated with an `@interface`).

<a name="user-content-require-throws-options-exemptedby"></a>
<a name="require-throws-options-exemptedby"></a>
### <code>exemptedBy</code>

Array of tags (e.g., `['type']`) whose presence on the
document block avoids the need for a `@throws`. Defaults to an array
with `inheritdoc`. If you set this array, it will overwrite the default,
so be sure to add back `inheritdoc` if you wish its presence to cause
exemption of the rule.


<a name="user-content-require-throws-context-and-settings"></a>
<a name="require-throws-context-and-settings"></a>
## Context and settings

| | |
| -------- | --- |
| Context  | `ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled |
| Tags     | `throws` |
| Aliases  | `exception` |
|Recommended|false|
| Options  |`contexts`, `exemptedBy`|
| Settings | `ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs` |

<a name="user-content-require-throws-failing-examples"></a>
<a name="require-throws-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 *
 */
function quux (foo) {
  throw new Error('err')
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
const quux = function (foo) {
  throw new Error('err')
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
const quux = (foo) => {
  throw new Error('err')
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  while(true) {
    throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  do {
    throw new Error('err')
  } while(true)
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  for(var i = 0; i <= 10; i++) {
    throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  for(num in [1,2,3]) {
    throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  for(const num of [1,2,3]) {
    throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  for(const index in [1,2,3]) {
    throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  with(foo) {
    throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  if (true) {
    throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  if (false) {
    // do nothing
  } else {
    throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  try {
    throw new Error('err')
  } catch(e) {
    throw new Error(e.message)
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  try {
    // do nothing
  } finally {
    throw new Error(e.message)
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 *
 */
function quux (foo) {
  const a = 'b'
  switch(a) {
    case 'b':
      throw new Error('err')
  }
}
// Message: Missing JSDoc @throws declaration.

/**
 * @throws
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"throws":false}}}
// Message: Unexpected tag `@throws`

/**
 *
 */
const directThrowAfterArrow = (b) => {
  const a = () => {};
  if (b) {
    throw new Error('oops')
  }
  return a;
};
// Message: Missing JSDoc @throws declaration.

/**
 * @throws {never}
 */
function quux (foo) {
  throw new Error('err')
}
// Message: JSDoc @throws declaration set to "never" but throw value found.
````



<a name="user-content-require-throws-passing-examples"></a>
<a name="require-throws-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @throws An error.
 */
function quux () {
  throw new Error('err')
}

/**
 *
 */
function quux (foo) {
  try {
    throw new Error('err')
  } catch(e) {}
}

/**
 * @throws {object}
 */
function quux (foo) {
  throw new Error('err')
}

/**
 * @inheritdoc
 */
function quux (foo) {
  throw new Error('err')
}

/**
 * @abstract
 */
function quux (foo) {
  throw new Error('err')
}

/**
 *
 */
function quux (foo) {
}

/**
 * @type {MyCallback}
 */
function quux () {
  throw new Error('err')
}
// "jsdoc/require-throws": ["error"|"warn", {"exemptedBy":["type"]}]

/**
 *
 */
const itself = (n) => n;

/**
 * Not tracking on nested function
 */
const nested = () => () => {throw new Error('oops');};

/**
 */
async function foo() {
  throw Error("bar");
}

/**
 * @throws {never}
 */
function quux (foo) {
}
````

