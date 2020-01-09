<a name="check-values"></a>
# <code>check-values</code>

* [`check-values`](#check-values)
    * [Options](#check-values-options)
        * [`allowedAuthors`](#check-values-options-allowedauthors)
        * [`allowedLicenses`](#check-values-options-allowedlicenses)
        * [`licensePattern`](#check-values-options-licensepattern)
    * [Context and settings](#check-values-context-and-settings)
    * [Failing examples](#check-values-failing-examples)
    * [Passing examples](#check-values-passing-examples)


This rule checks the values for a handful of tags:

1. `@version` - Checks that there is a present and valid
    [semver](https://semver.org/) version value.
2. `@since` - As with `@version`
3. `@license` - Checks that there is a present and valid SPDX identifier
    or is present within an `allowedLicenses` option.
4. `@author` - Checks there is a value present, and if the option
    `allowedAuthors` is present, ensure that the author value is one
    of these array items.

<a name="check-values-options"></a>
## Options

<a name="check-values-options-allowedauthors"></a>
### <code>allowedAuthors</code>

An array of allowable author values. If absent, only non-whitespace will
be checked for.

<a name="check-values-options-allowedlicenses"></a>
### <code>allowedLicenses</code>

An array of allowable license values or `true` to allow any license text.
If present as an array, will be used in place of SPDX identifiers.

<a name="check-values-options-licensepattern"></a>
### <code>licensePattern</code>

A string to be converted into a `RegExp` (with `u` flag) and whose first
parenthetical grouping, if present, will match the portion of the license
description to check (if no grouping is present, then the whole portion
matched will be used). Defaults to `([^\n]*)`, i.e., the SPDX expression
is expected before any line breaks.

<a name="check-values-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`@version`, `@since`, `@license`, `@author`|
|Options|`allowedAuthors`, `allowedLicenses`, `licensePattern`|
|Settings|`tagNamePreference`|

<a name="check-values-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @version
 */
function quux (foo) {

}
// Message: Missing JSDoc @version.

/**
 * @version 3.1
 */
function quux (foo) {

}
// Message: Invalid JSDoc @version: "3.1".

/**
 * @since
 */
function quux (foo) {

}
// Message: Missing JSDoc @since.

/**
 * @since 3.1
 */
function quux (foo) {

}
// Message: Invalid JSDoc @since: "3.1".

/**
 * @license
 */
function quux (foo) {

}
// Message: Missing JSDoc @license.

/**
 * @license FOO
 */
function quux (foo) {

}
// Message: Invalid JSDoc @license: "FOO"; expected SPDX expression: https://spdx.org/licenses/.

/**
 * @license FOO
 */
function quux (foo) {

}
// Options: [{"allowedLicenses":["BAR","BAX"]}]
// Message: Invalid JSDoc @license: "FOO"; expected one of BAR, BAX.

/**
 * @license MIT-7
 * Some extra text...
 */
function quux (foo) {

}
// Message: Invalid JSDoc @license: "MIT-7"; expected SPDX expression: https://spdx.org/licenses/.

/**
 * @license (MIT OR GPL-2.5)
 */
function quux (foo) {

}
// Message: Invalid JSDoc @license: "(MIT OR GPL-2.5)"; expected SPDX expression: https://spdx.org/licenses/.

/**
 * @license MIT
 * Some extra text
 */
function quux (foo) {

}
// Options: [{"licensePattern":"[\\s\\S]*"}]
// Message: Invalid JSDoc @license: "MIT
Some extra text"; expected SPDX expression: https://spdx.org/licenses/.

/**
 * @author
 */
function quux (foo) {

}
// Message: Missing JSDoc @author.

/**
 * @author Brett Zamir
 */
function quux (foo) {

}
// Options: [{"allowedAuthors":["Gajus Kuizinas","golopot"]}]
// Message: Invalid JSDoc @author: "Brett Zamir"; expected one of Gajus Kuizinas, golopot.
````


<a name="check-values-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @version 3.4.1
 */
function quux (foo) {

}

/**
 * @version      3.4.1
 */
function quux (foo) {

}

/**
 * @since 3.4.1
 */
function quux (foo) {

}

/**
 * @since      3.4.1
 */
function quux (foo) {

}

/**
 * @license MIT
 */
function quux (foo) {

}

/**
 * @license MIT
 * Some extra text...
 */
function quux (foo) {

}

/**
 * @license (MIT OR GPL-2.0)
 */
function quux (foo) {

}

/**
 * @license FOO
 */
function quux (foo) {

}
// Options: [{"allowedLicenses":["FOO","BAR","BAX"]}]

/**
 * @license FOO
 */
function quux (foo) {

}
// Options: [{"allowedLicenses":true}]

/**
 * @license MIT
 * Some extra text
 */
function quux (foo) {

}
// Options: [{"licensePattern":"[^\n]*"}]

/**
 * @author Gajus Kuizinas
 */
function quux (foo) {

}

/**
 * @author Brett Zamir
 */
function quux (foo) {

}
// Options: [{"allowedAuthors":["Gajus Kuizinas","golopot","Brett Zamir"]}]
````

