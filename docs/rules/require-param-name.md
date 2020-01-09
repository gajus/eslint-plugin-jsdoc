<a name="require-param-description"></a>
# <code>require-param-description</code>

* [`require-param-description`](#require-param-description)
    * [Options](#require-param-description-options)
        * [`contexts`](#require-param-description-options-contexts)
    * [Context and settings](#require-param-description-context-and-settings)
    * [Failing examples](#require-param-description-failing-examples)
    * [Passing examples](#require-param-description-passing-examples)


Requires that each `@param` tag has a `description` value.

<a name="require-param-description-options"></a>
## Options

<a name="require-param-description-options-contexts"></a>
### <code>contexts</code>

Set this to an array of strings representing the AST context
where you wish the rule to be applied.
Overrides the default contexts (see below). Set to `"any"` if you want
the rule to apply to any jsdoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., `@callback` or `@function` (or its aliases `@func` or
`@method`) (including those associated with an `@interface`).

<a name="require-param-description-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Options|`contexts`|

<a name="require-param-description-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @param foo
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" description.

/**
 * @param foo
 */
function quux (foo) {

}
// Options: [{"contexts":["any"]}]
// Message: Missing JSDoc @param "foo" description.

/**
 * @function
 * @param foo
 */
// Options: [{"contexts":["any"]}]
// Message: Missing JSDoc @param "foo" description.

/**
 * @callback
 * @param foo
 */
// Options: [{"contexts":["any"]}]
// Message: Missing JSDoc @param "foo" description.

/**
 * @arg foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}
// Message: Missing JSDoc @arg "foo" description.

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`
````


<a name="require-param-description-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 *
 */
function quux (foo) {

}

/**
 * @param foo Foo.
 */
function quux (foo) {

}

/**
 * @param foo Foo.
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

