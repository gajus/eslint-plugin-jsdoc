<a name="require-returns-type"></a>
# <code>require-returns-type</code>

* [`require-returns-type`](#require-returns-type)
    * [Options](#require-returns-type-options)
        * [`contexts`](#require-returns-type-options-contexts)
    * [Context and settings](#require-returns-type-context-and-settings)
    * [Failing examples](#require-returns-type-failing-examples)
    * [Passing examples](#require-returns-type-passing-examples)


Requires that `@returns` tag has a type value (in curly brackets).

<a name="require-returns-type-options"></a>
## Options

<a name="require-returns-type-options-contexts"></a>
### <code>contexts</code>

Set this to an array of strings representing the AST context
where you wish the rule to be applied.
Overrides the default contexts (see below). Set to `"any"` if you want
the rule to apply to any jsdoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., `@callback` or `@function` (or its aliases `@func` or
`@method`) (including those associated with an `@interface`).

<a name="require-returns-type-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`returns`|
|Aliases|`return`|
|Options|`contexts`|

<a name="require-returns-type-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @returns
 */
function quux () {

}
// Message: Missing JSDoc @returns type.

/**
 * @returns Foo.
 */
function quux () {

}
// Message: Missing JSDoc @returns type.

/**
 * @returns Foo.
 */
function quux () {

}
// Options: [{"contexts":["any"]}]
// Message: Missing JSDoc @returns type.

/**
 * @function
 * @returns Foo.
 */
// Options: [{"contexts":["any"]}]
// Message: Missing JSDoc @returns type.

/**
 * @callback
 * @returns Foo.
 */
// Options: [{"contexts":["any"]}]
// Message: Missing JSDoc @returns type.

/**
 * @return Foo.
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":"return"}}}
// Message: Missing JSDoc @return type.

/**
 * @returns
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":false}}}
// Message: Unexpected tag `@returns`
````


<a name="require-returns-type-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @returns {number}
 */
function quux () {

}

/**
 * @returns {number}
 */
function quux () {

}
// Options: [{"contexts":["any"]}]

/**
 * @function
 * @returns Foo.
 */

/**
 * @callback
 * @returns Foo.
 */
````

