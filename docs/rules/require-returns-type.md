<a name="user-content-require-returns-description"></a>
<a name="require-returns-description"></a>
### <code>require-returns-description</code>

Requires that the `@returns` tag has a `description` value. The error
will not be reported if the return value is `void` or `undefined`
or if it is `Promise<void>` or `Promise<undefined>`.

<a name="user-content-require-returns-description-options"></a>
<a name="require-returns-description-options"></a>
#### Options

<a name="user-content-require-returns-description-options-contexts"></a>
<a name="require-returns-description-options-contexts"></a>
##### <code>contexts</code>

Set this to an array of strings representing the AST context (or an object with
`context` and `comment` properties) where you wish the rule to be applied.
Overrides the default contexts (see below). Set to `"any"` if you want
the rule to apply to any jsdoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., `@callback` or `@function` (or its aliases `@func` or
`@method`) (including those associated with an `@interface`).

See the ["AST and Selectors"](#user-content-eslint-plugin-jsdoc-advanced-ast-and-selectors)
section of our README for more on the expected format.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`returns`|
|Aliases|`return`|
|Recommended|true|
|Options|`contexts`|

## Failing examples

The following patterns are considered problems:

````js
/**
 * @returns
 */
function quux (foo) {

}
// Message: Missing JSDoc @returns description.

/**
 * @returns {string}
 */
function quux (foo) {

}
// Message: Missing JSDoc @returns description.

/**
 * @returns {string}
 */
function quux (foo) {

}
// "jsdoc/require-returns-description": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @returns description.

/**
 * @function
 * @returns {string}
 */
// "jsdoc/require-returns-description": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @returns description.

/**
 * @callback
 * @returns {string}
 */
// "jsdoc/require-returns-description": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @returns description.

/**
 * @return
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":"return"}}}
// Message: Missing JSDoc @return description.

/**
 * @returns
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":false}}}
// Message: Unexpected tag `@returns`
````

## Passing examples

The following patterns are not considered problems:

````js
/**
 *
 */
function quux () {

}

/**
 * @returns Foo.
 */
function quux () {

}

/**
 * @returns Foo.
 */
function quux () {

}
// "jsdoc/require-returns-description": ["error"|"warn", {"contexts":["any"]}]

/**
 * @returns {undefined}
 */
function quux () {

}

/**
 * @returns {void}
 */
function quux () {

}

/**
 * @returns {Promise<void>}
 */
function quux () {

}

/**
 * @returns {Promise<undefined>}
 */
function quux () {

}

/**
 * @function
 * @returns
 */

/**
 * @callback
 * @returns
 */
````

