<a name="user-content-no-types"></a>
<a name="no-types"></a>
# <code>no-types</code>

* [Fixer](#user-content-no-types-fixer)
* [Options](#user-content-no-types-options)
    * [`contexts`](#user-content-no-types-options-contexts)
* [Context and settings](#user-content-no-types-context-and-settings)
* [Failing examples](#user-content-no-types-failing-examples)
* [Passing examples](#user-content-no-types-passing-examples)


This rule reports types being used on `@param` or `@returns`.

The rule is intended to prevent the indication of types on tags where
the type information would be redundant with TypeScript.

<a name="user-content-no-types-fixer"></a>
<a name="no-types-fixer"></a>
## Fixer

(TODO)

<a name="user-content-no-types-options"></a>
<a name="no-types-options"></a>
## Options

<a name="user-content-no-types-options-contexts"></a>
<a name="no-types-options-contexts"></a>
### <code>contexts</code>

Set this to an array of strings representing the AST context (or an object with
`context` and `comment` properties) where you wish the rule to be applied.
Overrides the default contexts (see below). Set to `"any"` if you want
the rule to apply to any jsdoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., `@callback` or `@function` (or its aliases `@func` or
`@method`) (including those associated with an `@interface`).

See the ["AST and Selectors"](#user-content-eslint-plugin-jsdoc-advanced-ast-and-selectors)
section of our README for more on the expected format.

<a name="user-content-no-types-context-and-settings"></a>
<a name="no-types-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`param`, `returns`|
|Aliases|`arg`, `argument`, `return`|
|Recommended|false|
|Options|`contexts`|

<a name="user-content-no-types-failing-examples"></a>
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

class quux {
  /**
   * @param {number} foo
   */
  bar (foo) {

  }
}
// Message: Types are not permitted on @param.

/**
 * @param {number} foo
 */
function quux (foo) {

}
// "jsdoc/no-types": ["error"|"warn", {"contexts":["any"]}]
// Message: Types are not permitted on @param.

class quux {
  /**
   * @param {number} foo
   */
  quux (foo) {

  }
}
// "jsdoc/no-types": ["error"|"warn", {"contexts":["any"]}]
// Message: Types are not permitted on @param.

/**
 * @function
 * @param {number} foo
 */
// "jsdoc/no-types": ["error"|"warn", {"contexts":["any"]}]
// Message: Types are not permitted on @param.

/**
 * @callback
 * @param {number} foo
 */
// "jsdoc/no-types": ["error"|"warn", {"contexts":["any"]}]
// Message: Types are not permitted on @param.

/**
 * @returns {number}
 */
function quux () {

}
// Message: Types are not permitted on @returns.

/**
 * Beep
 * Boop
 *
 * @returns {number}
 */
function quux () {

}
// Message: Types are not permitted on @returns.
````



<a name="user-content-no-types-passing-examples"></a>
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
// "jsdoc/no-types": ["error"|"warn", {"contexts":["any"]}]

/**
 * @function
 * @param {number} foo
 */

/**
 * @callback
 * @param {number} foo
 */

/*** Oops that's too many asterisks by accident **/
function a () {}
````

