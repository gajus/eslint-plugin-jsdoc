<a name="user-content-require-param-name"></a>
<a name="require-param-name"></a>
# <code>require-param-name</code>

* [Options](#user-content-require-param-name-options)
    * [`contexts`](#user-content-require-param-name-options-contexts)
* [Context and settings](#user-content-require-param-name-context-and-settings)
* [Failing examples](#user-content-require-param-name-failing-examples)
* [Passing examples](#user-content-require-param-name-passing-examples)


Requires that all `@param` tags have names.

> The `@param` tag requires you to specify the name of the parameter you are documenting. You can also include the parameter's type, enclosed in curly brackets, and a description of the parameter.
>
> [JSDoc](https://jsdoc.app/tags-param.html#overview)

<a name="user-content-require-param-name-options"></a>
<a name="require-param-name-options"></a>
## Options

<a name="user-content-require-param-name-options-contexts"></a>
<a name="require-param-name-options-contexts"></a>
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

<a name="user-content-require-param-name-context-and-settings"></a>
<a name="require-param-name-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Recommended|true|
|Options|`contexts`|

<a name="user-content-require-param-name-failing-examples"></a>
<a name="require-param-name-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @param
 */
function quux (foo) {

}
// Message: There must be an identifier after @param type.

/**
 * @param {string}
 */
function quux (foo) {

}
// Message: There must be an identifier after @param tag.

/**
 * @param {string}
 */
function quux (foo) {

}
// "jsdoc/require-param-name": ["error"|"warn", {"contexts":["any"]}]
// Message: There must be an identifier after @param tag.

/**
 * @function
 * @param {string}
 */
// "jsdoc/require-param-name": ["error"|"warn", {"contexts":["any"]}]
// Message: There must be an identifier after @param tag.

/**
 * @callback
 * @param {string}
 */
// "jsdoc/require-param-name": ["error"|"warn", {"contexts":["any"]}]
// Message: There must be an identifier after @param tag.

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`
````



<a name="user-content-require-param-name-passing-examples"></a>
<a name="require-param-name-passing-examples"></a>
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
function quux (foo) {

}
// "jsdoc/require-param-name": ["error"|"warn", {"contexts":["any"]}]

/**
 * @param {string} foo
 */
function quux (foo) {

}

/**
 * @function
 * @param
 */

/**
 * @callback
 * @param
 */

/**
 * @param {Function} [processor=data => data] A function to run
 */
function processData(processor) {
  return processor(data)
}

/** Example with multi-line param type.
*
* @param {function(
*   number
* )} cb Callback.
*/
function example(cb) {
  cb(42);
}
````

