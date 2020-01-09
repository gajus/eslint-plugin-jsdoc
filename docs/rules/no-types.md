<a name="no-types"></a>
# <code>no-types</code>

* [`no-types`](#no-types)
    * [Options](#no-types-options)
        * [`contexts`](#no-types-options-contexts)
    * [Fixer](#no-types-fixer)
    * [Context and settings](#no-types-context-and-settings)
    * [Failing examples](#no-types-failing-examples)
    * [Passing examples](#no-types-passing-examples)


This rule reports types being used on `@param` or `@returns`.

The rule is intended to prevent the indication of types on tags where
the type information would be redundant with TypeScript.

<a name="no-types-options"></a>
## Options

<a name="no-types-options-contexts"></a>
### <code>contexts</code>

Set this to an array of strings representing the AST context
where you wish the rule to be applied.
Overrides the default contexts (see below). Set to `"any"` if you want
the rule to apply to any jsdoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., `@callback` or `@function` (or its aliases `@func` or
`@method`) (including those associated with an `@interface`).

<a name="no-types-fixer"></a>
## Fixer

(Todo)

<a name="no-types-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`param`, `returns`|
|Aliases|`arg`, `argument`, `return`|
|Options|`contexts`|

<a name="no-types-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @param {number} foo
 */
function quux (foo) {

}
// Message: Types are not permitted on @param.

/**
 * @param {number} foo
 */
function quux (foo) {

}
// Options: [{"contexts":["any"]}]
// Message: Types are not permitted on @param.

/**
 * @function
 * @param {number} foo
 */
// Options: [{"contexts":["any"]}]
// Message: Types are not permitted on @param.

/**
 * @callback
 * @param {number} foo
 */
// Options: [{"contexts":["any"]}]
// Message: Types are not permitted on @param.

/**
 * @returns {number}
 */
function quux () {

}
// Message: Types are not permitted on @returns.
````


<a name="no-types-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @param foo
 */
function quux (foo) {

}

/**
 * @param foo
 */
// Options: [{"contexts":["any"]}]

/**
 * @function
 * @param {number} foo
 */

/**
 * @callback
 * @param {number} foo
 */
````

