<a name="user-content-require-asterisk-prefix"></a>
<a name="require-asterisk-prefix"></a>
### <code>require-asterisk-prefix</code>

Requires that each JSDoc line starts with an `*`.

<a name="user-content-require-asterisk-prefix-options"></a>
<a name="require-asterisk-prefix-options"></a>
#### Options

This rule allows an optional string argument. If it is `"always"` then a
problem is raised when there is no asterisk prefix on a given jsdoc line. If
it is `"never"` then a problem is raised when there is an asterisk present.
The default value is `"always"`. You may also set the default to `"any"`
and use the `tags` option to apply to specific tags only.

After the string option, one may add an object with the following.

<a name="user-content-require-asterisk-prefix-options-tags"></a>
<a name="require-asterisk-prefix-options-tags"></a>
##### <code>tags</code>

If you want different values to apply to specific tags, you may use
the `tags` option object. The keys are `always`, `never`, or `any` and
the values are arrays of tag names or the special value `*description`
which applies to the main jsdoc block description.

```js
{
  'jsdoc/require-asterisk-prefix': ['error', 'always', {
    tags: {
      always: ['*description'],
      any: ['example', 'license'],
      never: ['copyright']
    }
  }]
}
```

|||
|---|---|
|Context|everywhere|
|Tags|All or as limited by the `tags` option|
|Options|(a string matching `"always"|"never"` and optional object with `tags`)|

## Failing examples

The following patterns are considered problems:

````js

/**
 @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// Message: Expected JSDoc line to have the prefix.


/**
 @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "any",{"tags":{"always":["param"]}}]
// Message: Expected JSDoc line to have the prefix.


/**
 * Desc

 */
function quux (foo) {
  // with spaces
}
// Message: Expected JSDoc line to have the prefix.


/**
 *
 Desc
 */
function quux (foo) {
  // with spaces
}
// Message: Expected JSDoc line to have the prefix.


/**
 * Desc
 *
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "never"]
// Message: Expected JSDoc line to have no prefix.


/**
 @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "always",{"tags":{"any":["someOtherTag"]}}]
// Message: Expected JSDoc line to have the prefix.


/**
 * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "never",{"tags":{"always":["someOtherTag"]}}]
// Message: Expected JSDoc line to have no prefix.


/**
 * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "always",{"tags":{"never":["param"]}}]
// Message: Expected JSDoc line to have no prefix.


/**
 @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "never",{"tags":{"always":["param"]}}]
// Message: Expected JSDoc line to have the prefix.

/**
  @param {Number} foo
 */function quux (foo) {
  // with spaces
}
// Message: Expected JSDoc line to have the prefix.


/**
 * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "never"]
// Message: Expected JSDoc line to have no prefix.

/**
  *@param {Number} foo
 */function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "never"]
// Message: Expected JSDoc line to have no prefix.
````

## Passing examples

The following patterns are not considered problems:

````js
/**
 * Desc
 *
 * @param {Number} foo
 *   This is more comment.
 */
function quux (foo) {

}

/**
 * Desc
 *
 * @param {{
 * foo: Bar,
 * bar: Baz
 * }} foo
 *
 */
function quux (foo) {

}

/*  <- JSDoc must start with 2 stars.
 So this is unchecked.
 */
function quux (foo) {}

/** @param {Number} foo */
function quux (foo) {
  // with spaces
}


/**
 @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "always",{"tags":{"any":["param"]}}]


/**
 * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "never",{"tags":{"always":["param"]}}]


/**
 * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "always",{"tags":{"never":["someOtherTag"]}}]


/**
 @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "always",{"tags":{"never":["param"]}}]


/**
 @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "never",{"tags":{"always":["someOtherTag"]}}]


/**
 * Desc
 *
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "never",{"tags":{"any":["*description"]}}]


/**
 * Desc

 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "always",{"tags":{"any":["*description"]}}]


/**
 @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "any",{"tags":{"always":["someOtherTag"]}}]
````

