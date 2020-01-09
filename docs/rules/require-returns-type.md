<a name="require-returns-description"></a>
# <code>require-returns-description</code>

* [`require-returns-description`](#require-returns-description)
    * [Options](#require-returns-description-options)
        * [`contexts`](#require-returns-description-options-contexts)
    * [Context and settings](#require-returns-description-context-and-settings)
    * [Failing examples](#require-returns-description-failing-examples)
    * [Passing examples](#require-returns-description-passing-examples)


Requires that the `@returns` tag has a `description` value. The error
will not be reported if the return value is `void` or `undefined`.

<a name="require-returns-description-options"></a>
## Options

<a name="require-returns-description-options-contexts"></a>
### <code>contexts</code>

Set this to an array of strings representing the AST context
where you wish the rule to be applied.
Overrides the default contexts (see below). Set to `"any"` if you want
the rule to apply to any jsdoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., `@callback` or `@function` (or its aliases `@func` or
`@method`) (including those associated with an `@interface`).

<a name="require-returns-description-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`returns`|
|Aliases|`return`|
|Options|`contexts`|

<a name="require-returns-description-failing-examples"></a>
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
// Options: [{"contexts":["any"]}]
// Message: Missing JSDoc @returns description.

/**
 * @function
 * @returns {string}
 */
// Options: [{"contexts":["any"]}]
// Message: Missing JSDoc @returns description.

/**
 * @callback
 * @returns {string}
 */
// Options: [{"contexts":["any"]}]
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


<a name="require-returns-description-passing-examples"></a>
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
// Options: [{"contexts":["any"]}]

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
 * @function
 * @returns
 */

/**
 * @callback
 * @returns
 */
````

