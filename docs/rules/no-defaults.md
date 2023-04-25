<a name="user-content-no-defaults"></a>
<a name="no-defaults"></a>
# <code>no-defaults</code>

* [Fixer](#user-content-no-defaults-fixer)
* [Options](#user-content-no-defaults-options)
    * [`noOptionalParamNames`](#user-content-no-defaults-options-nooptionalparamnames)
    * [`contexts`](#user-content-no-defaults-options-contexts)
* [Context and settings](#user-content-no-defaults-context-and-settings)
* [Failing examples](#user-content-no-defaults-failing-examples)
* [Passing examples](#user-content-no-defaults-passing-examples)


This rule reports defaults being used on the relevant portion of `@param`
or `@default`. It also optionally reports the presence of the
square-bracketed optional arguments at all.

The rule is intended to prevent the indication of defaults on tags where
this would be redundant with ES6 default parameters (or for `@default`,
where it would be redundant with the context to which the `@default`
tag is attached).

Unless your `@default` is on a function, you will need to set `contexts`
to an appropriate context, including, if you wish, "any".

<a name="user-content-no-defaults-fixer"></a>
<a name="no-defaults-fixer"></a>
## Fixer

(TODO)

<a name="user-content-no-defaults-options"></a>
<a name="no-defaults-options"></a>
## Options

<a name="user-content-no-defaults-options-nooptionalparamnames"></a>
<a name="no-defaults-options-nooptionalparamnames"></a>
### <code>noOptionalParamNames</code>

Set this to `true` to report the presence of optional parameters. May be
used if the project is insisting on optionality being indicated by
the presence of ES6 default parameters (bearing in mind that such
"defaults" are only applied when the supplied value is missing or
`undefined` but not for `null` or other "falsey" values).

<a name="user-content-no-defaults-options-contexts"></a>
<a name="no-defaults-options-contexts"></a>
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

<a name="user-content-no-defaults-context-and-settings"></a>
<a name="no-defaults-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`param`, `default`|
|Aliases|`arg`, `argument`, `defaultvalue`|
|Recommended|false|
|Options|`contexts`, `noOptionalParamNames`|

<a name="user-content-no-defaults-failing-examples"></a>
<a name="no-defaults-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @param {number} [foo="7"]
 */
function quux (foo) {

}
// Message: Defaults are not permitted on @param.

class Test {
    /**
     * @param {number} [foo="7"]
     */
    quux (foo) {

    }
}
// Message: Defaults are not permitted on @param.

/**
 * @param {number} [foo="7"]
 */
function quux (foo) {

}
// "jsdoc/no-defaults": ["error"|"warn", {"noOptionalParamNames":true}]
// Message: Optional param names are not permitted on @param.

/**
 * @arg {number} [foo="7"]
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}
// Message: Defaults are not permitted on @arg.

/**
 * @param {number} [foo="7"]
 */
function quux (foo) {

}
// "jsdoc/no-defaults": ["error"|"warn", {"contexts":["any"]}]
// Message: Defaults are not permitted on @param.

/**
 * @function
 * @param {number} [foo="7"]
 */
// "jsdoc/no-defaults": ["error"|"warn", {"contexts":["any"]}]
// Message: Defaults are not permitted on @param.

/**
 * @callback
 * @param {number} [foo="7"]
 */
// "jsdoc/no-defaults": ["error"|"warn", {"contexts":["any"]}]
// Message: Defaults are not permitted on @param.

/**
 * @default {}
 */
const a = {};
// "jsdoc/no-defaults": ["error"|"warn", {"contexts":["any"]}]
// Message: Default values are not permitted on @default.

/**
 * @defaultvalue {}
 */
const a = {};
// Settings: {"jsdoc":{"tagNamePreference":{"default":"defaultvalue"}}}
// "jsdoc/no-defaults": ["error"|"warn", {"contexts":["any"]}]
// Message: Default values are not permitted on @defaultvalue.
````



<a name="user-content-no-defaults-passing-examples"></a>
<a name="no-defaults-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @param foo
 */
function quux (foo) {

}

/**
 * @param {number} foo
 */
function quux (foo) {

}

/**
 * @param foo
 */
// "jsdoc/no-defaults": ["error"|"warn", {"contexts":["any"]}]

/**
 * @function
 * @param {number} foo
 */

/**
 * @callback
 * @param {number} foo
 */

/**
 * @param {number} foo
 */
function quux (foo) {

}
// "jsdoc/no-defaults": ["error"|"warn", {"noOptionalParamNames":true}]

/**
 * @default
 */
const a = {};
// "jsdoc/no-defaults": ["error"|"warn", {"contexts":["any"]}]
````

