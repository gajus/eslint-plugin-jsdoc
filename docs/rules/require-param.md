<a name="require-param-type"></a>
# <code>require-param-type</code>

* [`require-param-type`](#require-param-type)
    * [Options](#require-param-type-options)
        * [`contexts`](#require-param-type-options-contexts)
    * [Context and settings](#require-param-type-context-and-settings)
    * [Failing examples](#require-param-type-failing-examples)
    * [Passing examples](#require-param-type-passing-examples)


Requires that each `@param` tag has a type value (within curly brackets).

<a name="require-param-type-options"></a>
## Options

<a name="require-param-type-options-contexts"></a>
### <code>contexts</code>

Set this to an array of strings representing the AST context
where you wish the rule to be applied.
Overrides the default contexts (see below). Set to `"any"` if you want
the rule to apply to any jsdoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., `@callback` or `@function` (or its aliases `@func` or
`@method`) (including those associated with an `@interface`).

<a name="require-param-type-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Options|`contexts`|

<a name="require-param-type-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @param foo
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" type.

/**
 * @param foo
 */
function quux (foo) {

}
// Options: [{"contexts":["any"]}]
// Message: Missing JSDoc @param "foo" type.

/**
 * @function
 * @param foo
 */
// Options: [{"contexts":["any"]}]
// Message: Missing JSDoc @param "foo" type.

/**
 * @callback
 * @param foo
 */
// Options: [{"contexts":["any"]}]
// Message: Missing JSDoc @param "foo" type.

/**
 * @arg foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}
// Message: Missing JSDoc @arg "foo" type.

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`
````


<a name="require-param-type-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 *
 */
function quux (foo) {

}

/**
 * @param {number} foo
 */
function quux (foo) {

}

/**
 * @param {number} foo
 */
function quux (foo) {

}
// Options: [{"contexts":["any"]}]

/**
 * @function
 * @param foo
 */

/**
 * @callback
 * @param foo
 */
````

