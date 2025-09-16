<a name="user-content-require-hyphen-before-param-description"></a>
<a name="require-hyphen-before-param-description"></a>
# <code>require-hyphen-before-param-description</code>

* [Fixer](#user-content-require-hyphen-before-param-description-fixer)
* [Options](#user-content-require-hyphen-before-param-description-options)
    * [`tags`](#user-content-require-hyphen-before-param-description-options-tags)
* [Context and settings](#user-content-require-hyphen-before-param-description-context-and-settings)
* [Failing examples](#user-content-require-hyphen-before-param-description-failing-examples)
* [Passing examples](#user-content-require-hyphen-before-param-description-passing-examples)


Requires (or disallows) a hyphen before the `@param` description.

<a name="user-content-require-hyphen-before-param-description-fixer"></a>
<a name="require-hyphen-before-param-description-fixer"></a>
## Fixer

Adds a hyphen for "always" and removes a hyphen for "never".

<a name="user-content-require-hyphen-before-param-description-options"></a>
<a name="require-hyphen-before-param-description-options"></a>
## Options

The first option is a string with the following possible values: "always", "never".
If the string is `"always"` then a problem is raised when there is no hyphen
before the description. If it is `"never"` then a problem is raised when there
is a hyphen before the description. The default value is `"always"`.

Even if hyphens are set to "always" appear after the tag name, they will
actually be forbidden in the event that they are followed immediately by
the end of a line (this will otherwise cause Visual Studio Code to display
incorrectly).

The next option is an object with the following properties.

The options object may have the following property to indicate behavior for
other tags besides the `@param` tag (or the `@arg` tag if so set).
<a name="user-content-require-hyphen-before-param-description-options-tags"></a>
<a name="require-hyphen-before-param-description-options-tags"></a>
### <code>tags</code>

Object whose keys indicate different tags to check for the
  presence or absence of hyphens; the key value should be "always" or "never",
  indicating how hyphens are to be applied, e.g., `{property: 'never'}`
  to ensure `@property` never uses hyphens. A key can also be set as `*`, e.g.,
  `'*': 'always'` to apply hyphen checking to any tag (besides the preferred
  `@param` tag which follows the main string option setting and besides any
  other `tags` entries).



<a name="user-content-require-hyphen-before-param-description-context-and-settings"></a>
<a name="require-hyphen-before-param-description-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`param` and optionally other tags within `tags`|
|Aliases|`arg`, `argument`; potentially `prop` or other aliases|
|Recommended|false|
|Options|string ("always", "never") followed by object with `tags`|

<a name="user-content-require-hyphen-before-param-description-failing-examples"></a>
<a name="require-hyphen-before-param-description-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param foo Foo.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always"]
// Message: There must be a hyphen before @param description.

/**
 * @param foo Foo.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"*":"never"}}]
// Message: There must be a hyphen before @param description.

/**
 * @param foo Foo.
 * @returns {SomeType} - Hyphen here.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"*":"never","returns":"always"}}]
// Message: There must be a hyphen before @param description.

/**
 * @param foo Foo.
 */
function quux () {

}
// Message: There must be a hyphen before @param description.

/**
 * @param foo - Foo.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "never"]
// Message: There must be no hyphen before @param description.

/**
 * @param foo    - Foo.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "never"]
// Message: There must be no hyphen before @param description.

/**
 * @param foo - foo
 * @param foo foo
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always"]
// Message: There must be a hyphen before @param description.

/**
 * @param foo foo
 * bar
 * @param bar - bar
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always"]
// Message: There must be a hyphen before @param description.

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`

/**
 * @typedef {SomeType} ATypeDefName
 * @property foo Foo.
 */
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"property":"always"}}]
// Message: There must be a hyphen before @property description.

/**
 * @template TempA, TempB A desc.
 */
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"template":"always"}}]
// Message: There must be a hyphen before @template description.

/**
 * @typedef {SomeType} ATypeDefName
 * @property foo - Foo.
 */
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "never",{"tags":{"property":"never"}}]
// Message: There must be no hyphen before @property description.

/**
 * @param foo Foo.
 * @returns {SomeType} - A description.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"returns":"never"}}]
// Message: There must be a hyphen before @param description.

/**
 * Split a unit to metric prefix and basic unit.
 *
 * @param {string} unit - Unit to split.
 * @param {string} [basicUnit] - Basic unit regardless of the metric prefix.
 *     If omitted, basic unit will be inferred by trying to remove the metric
 *     prefix in `unit`.
 *
 * @returns {{ prefix: string, basicUnit: string }} - Split result.
 *     If `unit` does not have a metric prefix, `''` is returned for `prefix`.
 *     If `unit` does not have a basic unit, `''` is returned for `basicUnit`.
 */
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"*":"never","property":"always"}}]
// Message: There must be no hyphen before @returns description.

/**
 * @returns {{
 *   prefix: string, basicUnit: string
 * }} - Split result.
 */
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"*":"never","property":"always"}}]
// Message: There must be no hyphen before @returns description.

/**
 * @param {(
 *  | string
 *  | number
 * )} input The input value
 */
function test(input) {}
// Message: There must be a hyphen before @param description.

/**
 * @param foo -
 * The possible values for `foo` are as follows.
 * - `"option1"`: Description of option 1.
 * - `"option2"`: Description of option 2.
 */
// Message: There must be no hyphen followed by newline after the @param name.
````



<a name="user-content-require-hyphen-before-param-description-passing-examples"></a>
<a name="require-hyphen-before-param-description-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param foo - Foo.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always"]

/**
 * @param foo     - Foo.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always"]

/**
 * @param foo - Foo.
 * @returns {SomeType} A description.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"returns":"never"}}]

/**
 * @param foo Foo.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "never"]

/**
 * @param foo
 */
function quux () {

}

/**
 *
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"*":"always"}}]

/**
 * @typedef {SomeType} ATypeDefName
 * @property foo - Foo.
 */
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"property":"always"}}]

/**
 * @typedef {SomeType} ATypeDefName
 * @property foo Foo.
 */
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "never",{"tags":{"property":"never"}}]

/**
 * @typedef {SomeType} ATypeDefName
 * @property foo - Foo.
 */
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "never",{"tags":{"*":"always"}}]

/** Entry point for module.
 *
 * @param {!Array<string>} argv Command-line arguments.
 */
function main(argv) {
};
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "never"]

/**
 * @template {any} T - Arg 1
 * @template {string | number} K - Arg 2
 * @template {any} [R=(K extends keyof T ? T[K] : never)] - Arg 3  ->  Errors here
 * @typedef {any} Test
 */
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"template":"always"}}]

/**
 * @param foo - The possible values for `foo` are as follows.
 * - `"option1"`: Description of option 1.
 * - `"option2"`: Description of option 2.
 */

/**
 * @param foo
 * The possible values for `foo` are as follows.
 * - `"option1"`: Description of option 1.
 * - `"option2"`: Description of option 2.
 */

/**
 * @param foo
 * - `"option1"`: Description of option 1.
 * - `"option2"`: Description of option 2.
 */
````

