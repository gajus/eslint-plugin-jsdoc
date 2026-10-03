<a name="user-content-check-syntax"></a>
<a name="check-syntax"></a>
# <code>check-syntax</code>

* [Options](#user-content-check-syntax-options)
    * [`enableFixer`](#user-content-check-syntax-options-enablefixer)
* [Context and settings](#user-content-check-syntax-context-and-settings)
* [Failing examples](#user-content-check-syntax-failing-examples)
* [Passing examples](#user-content-check-syntax-passing-examples)


Reports against syntax not encouraged for the mode (e.g., Google Closure
Compiler in "jsdoc" or "typescript" mode). Note that this rule will not check
for types that are wholly invalid for a given mode, as that is covered by
`valid-types`.

Currently checks against:

- Use of `=` in "jsdoc" or "typescript" mode

Note that "jsdoc" actually allows Closure syntax, but with another
option available for optional parameters (enclosing the name in brackets), the
rule is enforced (except under "permissive" and "closure" modes).

With the `enableFixer` option, `{type=} name` on `@param` and `@property` tags
is fixed to `{type} [name]`.

<a name="user-content-check-syntax-options"></a>
<a name="check-syntax-options"></a>
## Options

A single options object has the following properties.

<a name="user-content-check-syntax-options-enablefixer"></a>
<a name="check-syntax-options-enablefixer"></a>
### <code>enableFixer</code>

Whether to enable the fixer to replace the Closure Compiler style `{type=}`
on `@param` and `@property` tags with the bracketed name `{type} [name]`.
Defaults to `false`.


<a name="user-content-check-syntax-context-and-settings"></a>
<a name="check-syntax-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|false|
|Options|`enableFixer`|

<a name="user-content-check-syntax-failing-examples"></a>
<a name="check-syntax-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param {string=} foo
 */
function quux (foo) {

}
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @param {string=} foo
 */
function quux (foo) {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":false}]
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @param {string=} foo
 */
function quux (foo) {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @param {string=} foo - The foo.
 * @param {number=} bar
 * @param {Array<string>=} [baz]
 * @property {boolean=} qux.quux
 */
function quux (foo, bar, baz) {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @returns {string=}
 */
function quux () {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @param {string=} [foo=bar]
 */
function quux (foo) {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @param {string=}
 */
function quux (foo) {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @param {Array<
 *   string
 * >=} foo
 */
function quux (foo) {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]
// Message: Syntax should not be Google Closure Compiler style.
````



<a name="user-content-check-syntax-passing-examples"></a>
<a name="check-syntax-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {string=} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @param {string} [foo]
 */
function quux (foo) {

}

/**
 * @param {string} [foo]
 */
function quux (foo) {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]

/**
 * @param {string=} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"mode":"closure"}}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]

/**
 *
 */
function quux (foo) {

}
````

