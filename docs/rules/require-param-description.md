<a name="user-content-require-param-description"></a>
<a name="require-param-description"></a>
# <code>require-param-description</code>

* [Options](#user-content-require-param-description-options)
    * [`setDefaultDestructuredRootDescription`](#user-content-require-param-description-options-setdefaultdestructuredrootdescription)
    * [`defaultDestructuredRootDescription`](#user-content-require-param-description-options-defaultdestructuredrootdescription)
    * [`contexts`](#user-content-require-param-description-options-contexts)
* [Context and settings](#user-content-require-param-description-context-and-settings)
* [Failing examples](#user-content-require-param-description-failing-examples)
* [Passing examples](#user-content-require-param-description-passing-examples)


Requires that each `@param` tag has a `description` value.

Will exempt destructured roots and their children if
`settings.exemptDestructuredRootsFromChecks` is set to `true` (e.g.,
`@param {object} props` will be exempted from requiring a description given
`function someFunc ({child1, child2})`).

<a name="user-content-require-param-description-options"></a>
<a name="require-param-description-options"></a>
## Options

<a name="user-content-require-param-description-options-setdefaultdestructuredrootdescription"></a>
<a name="require-param-description-options-setdefaultdestructuredrootdescription"></a>
### <code>setDefaultDestructuredRootDescription</code>

Whether to set a default destructured root description. For example, you may
wish to avoid manually having to set the description for a `@param`
corresponding to a destructured root object as it should always be the same
type of object. Uses `defaultDestructuredRootDescription` for the description
string. Defaults to `false`.

<a name="user-content-require-param-description-options-defaultdestructuredrootdescription"></a>
<a name="require-param-description-options-defaultdestructuredrootdescription"></a>
### <code>defaultDestructuredRootDescription</code>

The description string to set by default for destructured roots. Defaults to
"The root object".

<a name="user-content-require-param-description-options-contexts"></a>
<a name="require-param-description-options-contexts"></a>
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

<a name="user-content-require-param-description-context-and-settings"></a>
<a name="require-param-description-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Recommended|true|
|Options|`contexts`, `defaultDestructuredRootDescription`, `setDefaultDestructuredRootDescription`|
|Settings|`exemptDestructuredRootsFromChecks`|

<a name="user-content-require-param-description-failing-examples"></a>
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
// "jsdoc/require-param-description": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @param "foo" description.

/**
 * @function
 * @param foo
 */
// "jsdoc/require-param-description": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @param "foo" description.

/**
 * @callback
 * @param foo
 */
// "jsdoc/require-param-description": ["error"|"warn", {"contexts":["any"]}]
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

/**
 * @param foo
 */
function quux (foo) {

}
// "jsdoc/require-param-description": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag:not([name=props]))","context":"FunctionDeclaration"}]}]
// Message: Missing JSDoc @param "foo" description.

/**
 * @param {number} foo Foo description
 * @param {object} root
 * @param {boolean} baz Baz description
 */
function quux (foo, {bar}, baz) {

}
// "jsdoc/require-param-description": ["error"|"warn", {"setDefaultDestructuredRootDescription":true}]
// Message: Missing root description for @param.

/**
 * @param {number} foo Foo description
 * @param {object} root
 * @param {boolean} baz Baz description
 */
function quux (foo, {bar}, baz) {

}
// "jsdoc/require-param-description": ["error"|"warn", {"defaultDestructuredRootDescription":"Root description","setDefaultDestructuredRootDescription":true}]
// Message: Missing root description for @param.

/**
 * @param {number} foo Foo description
 * @param {object} root
 * @param {boolean} baz Baz description
 */
function quux (foo, {bar}, baz) {

}
// "jsdoc/require-param-description": ["error"|"warn", {"setDefaultDestructuredRootDescription":false}]
// Message: Missing JSDoc @param "root" description.
````



<a name="user-content-require-param-description-passing-examples"></a>
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
// "jsdoc/require-param-description": ["error"|"warn", {"contexts":["any"]}]

/**
 * @function
 * @param foo
 */

/**
 * @callback
 * @param foo
 */

/**
 * @param props
 */
function quux (props) {

}
// "jsdoc/require-param-description": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag:not([name=props]))","context":"FunctionDeclaration"}]}]

/**
 * @param {number} foo Foo description
 * @param {object} root
 * @param {boolean} baz Baz description
 */
function quux (foo, {bar}, baz) {

}
// Settings: {"jsdoc":{"exemptDestructuredRootsFromChecks":true}}

/**
 * @param {number} foo Foo description
 * @param {object} root
 * @param {object} root.bar
 */
function quux (foo, {bar: {baz}}) {

}
// Settings: {"jsdoc":{"exemptDestructuredRootsFromChecks":true}}
````

