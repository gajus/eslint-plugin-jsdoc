<a name="user-content-require-param-type"></a>
<a name="require-param-type"></a>
# <code>require-param-type</code>

* [Options](#user-content-require-param-type-options)
    * [`setDefaultDestructuredRootType`](#user-content-require-param-type-options-setdefaultdestructuredroottype)
    * [`defaultDestructuredRootType`](#user-content-require-param-type-options-defaultdestructuredroottype)
    * [`contexts`](#user-content-require-param-type-options-contexts)
* [Context and settings](#user-content-require-param-type-context-and-settings)
* [Failing examples](#user-content-require-param-type-failing-examples)
* [Passing examples](#user-content-require-param-type-passing-examples)


Requires that each `@param` tag has a `type` value (within curly brackets).

Will exempt destructured roots and their children if
`settings.exemptDestructuredRootsFromChecks` is set to `true` (e.g.,
`@param props` will be exempted from requiring a type given
`function someFunc ({child1, child2})`).

<a name="user-content-require-param-type-options"></a>
<a name="require-param-type-options"></a>
## Options

<a name="user-content-require-param-type-options-setdefaultdestructuredroottype"></a>
<a name="require-param-type-options-setdefaultdestructuredroottype"></a>
### <code>setDefaultDestructuredRootType</code>

Whether to set a default destructured root type. For example, you may wish
to avoid manually having to set the type for a `@param`
corresponding to a destructured root object as it is always going to be an
object. Uses `defaultDestructuredRootType` for the type string. Defaults to
`false`.

<a name="user-content-require-param-type-options-defaultdestructuredroottype"></a>
<a name="require-param-type-options-defaultdestructuredroottype"></a>
### <code>defaultDestructuredRootType</code>

The type string to set by default for destructured roots. Defaults to "object".

<a name="user-content-require-param-type-options-contexts"></a>
<a name="require-param-type-options-contexts"></a>
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

<a name="user-content-require-param-type-context-and-settings"></a>
<a name="require-param-type-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Recommended|true|
|Options|`contexts`, `defaultDestructuredRootType`, `setDefaultDestructuredRootType`|
|Settings|`exemptDestructuredRootsFromChecks`|

<a name="user-content-require-param-type-failing-examples"></a>
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
 * @param {a xxx
 */
function quux () {
}
// Message: Missing JSDoc @param "" type.

/**
 * @param foo
 */
function quux (foo) {

}
// "jsdoc/require-param-type": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @param "foo" type.

/**
 * @function
 * @param foo
 */
// "jsdoc/require-param-type": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @param "foo" type.

/**
 * @callback
 * @param foo
 */
// "jsdoc/require-param-type": ["error"|"warn", {"contexts":["any"]}]
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

/**
 * @param {number} foo
 * @param root
 * @param {boolean} baz
 */
function quux (foo, {bar}, baz) {

}
// "jsdoc/require-param-type": ["error"|"warn", {"setDefaultDestructuredRootType":true}]
// Message: Missing root type for @param.

/**
 * @param {number} foo
 * @param root
 * @param {boolean} baz
 */
function quux (foo, {bar}, baz) {

}
// "jsdoc/require-param-type": ["error"|"warn", {"defaultDestructuredRootType":"Object","setDefaultDestructuredRootType":true}]
// Message: Missing root type for @param.

/**
 * @param {number} foo
 * @param root
 * @param {boolean} baz
 */
function quux (foo, {bar}, baz) {

}
// "jsdoc/require-param-type": ["error"|"warn", {"setDefaultDestructuredRootType":false}]
// Message: Missing JSDoc @param "root" type.
````



<a name="user-content-require-param-type-passing-examples"></a>
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
// "jsdoc/require-param-type": ["error"|"warn", {"contexts":["any"]}]

/**
 * @function
 * @param foo
 */

/**
 * @callback
 * @param foo
 */

/**
 * @param {number} foo
 * @param root
 * @param {boolean} baz
 */
function quux (foo, {bar}, baz) {

}
// Settings: {"jsdoc":{"exemptDestructuredRootsFromChecks":true}}

/**
 * @param {number} foo
 * @param root
 * @param root.bar
 */
function quux (foo, {bar: {baz}}) {

}
// Settings: {"jsdoc":{"exemptDestructuredRootsFromChecks":true}}
````

