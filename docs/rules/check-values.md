<a name="user-content-check-values"></a>
<a name="check-values"></a>
# <code>check-values</code>

* [Options](#user-content-check-values-options)
    * [`allowedAuthors`](#user-content-check-values-options-allowedauthors)
    * [`allowedLicenses`](#user-content-check-values-options-allowedlicenses)
    * [`licensePattern`](#user-content-check-values-options-licensepattern)
    * [`numericOnlyVariation`](#user-content-check-values-options-numericonlyvariation)
* [Context and settings](#user-content-check-values-context-and-settings)
* [Failing examples](#user-content-check-values-failing-examples)
* [Passing examples](#user-content-check-values-passing-examples)


This rule checks the values for a handful of tags:

1. `@version` - Checks that there is a present and valid
    [semver](https://semver.org/) version value.
2. `@since` - As with `@version`
3. `@license` - Checks that there is a present and valid SPDX identifier
    or is present within an `allowedLicenses` option.
4. `@author` - Checks that there is a value present, and if the option
    `allowedAuthors` is present, ensure that the author value is one
    of these array items.
5. `@variation` - If `numericOnlyVariation` is set, will checks that there
    is a value present, and that it is an integer (otherwise, jsdoc allows any
    value).
6. `@kind` - Insists that it be one of the allowed values: 'class',
    'constant', 'event', 'external', 'file', 'function', 'member', 'mixin',
    'module', 'namespace', 'typedef',

<a name="user-content-check-values-options"></a>
<a name="check-values-options"></a>
## Options

<a name="user-content-check-values-options-allowedauthors"></a>
<a name="check-values-options-allowedauthors"></a>
### <code>allowedAuthors</code>

An array of allowable author values. If absent, only non-whitespace will
be checked for.

<a name="user-content-check-values-options-allowedlicenses"></a>
<a name="check-values-options-allowedlicenses"></a>
### <code>allowedLicenses</code>

An array of allowable license values or `true` to allow any license text.
If present as an array, will be used in place of SPDX identifiers.

<a name="user-content-check-values-options-licensepattern"></a>
<a name="check-values-options-licensepattern"></a>
### <code>licensePattern</code>

A string to be converted into a `RegExp` (with `u` flag) and whose first
parenthetical grouping, if present, will match the portion of the license
description to check (if no grouping is present, then the whole portion
matched will be used). Defaults to `/([^\n\r]*)/gu`, i.e., the SPDX expression
is expected before any line breaks.

Note that the `/` delimiters are optional, but necessary to add flags.

Defaults to using the `u` flag, so to add your own flags, encapsulate
your expression as a string, but like a literal, e.g., `/^mit$/ui`.

<a name="user-content-check-values-options-numericonlyvariation"></a>
<a name="check-values-options-numericonlyvariation"></a>
### <code>numericOnlyVariation</code>

Whether to enable validation that `@variation` must be a number. Defaults to
`false`.

<a name="user-content-check-values-context-and-settings"></a>
<a name="check-values-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`@version`, `@since`, `@kind`, `@license`, `@author`, `@variation`|
|Recommended|true|
|Options|`allowedAuthors`, `allowedLicenses`, `licensePattern`, `numericOnlyVariation`|
|Settings|`tagNamePreference`|

<a name="user-content-check-values-failing-examples"></a>
<a name="check-values-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @version
 */
function quux (foo) {

}
// Message: Missing JSDoc @version value.

/**
 * @version 3.1
 */
function quux (foo) {

}
// Message: Invalid JSDoc @version: "3.1".

/**
 * @kind
 */
function quux (foo) {

}
// Message: Missing JSDoc @kind value.

/**
 * @kind -3
 */
function quux (foo) {

}
// Message: Invalid JSDoc @kind: "-3"; must be one of: class, constant, event, external, file, function, member, mixin, module, namespace, typedef.

/**
 * @variation -3
 */
function quux (foo) {

}
// "jsdoc/check-values": ["error"|"warn", {"numericOnlyVariation":true}]
// Message: Invalid JSDoc @variation: "-3".

/**
 * @since
 */
function quux (foo) {

}
// Message: Missing JSDoc @since value.

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
// Message: Missing JSDoc @license value.

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
// "jsdoc/check-values": ["error"|"warn", {"allowedLicenses":["BAR","BAX"]}]
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
// "jsdoc/check-values": ["error"|"warn", {"licensePattern":"[\\s\\S]*"}]
// Message: Invalid JSDoc @license: "MIT
Some extra text"; expected SPDX expression: https://spdx.org/licenses/.

/**
 * @author
 */
function quux (foo) {

}
// Message: Missing JSDoc @author value.

/**
 * @author Brett Zamir
 */
function quux (foo) {

}
// "jsdoc/check-values": ["error"|"warn", {"allowedAuthors":["Gajus Kuizinas","golopot"]}]
// Message: Invalid JSDoc @author: "Brett Zamir"; expected one of Gajus Kuizinas, golopot.

/**
 * @variation
 */
function quux (foo) {

}
// "jsdoc/check-values": ["error"|"warn", {"numericOnlyVariation":true}]
// Message: Missing JSDoc @variation value.

/**
 * @variation 5.2
 */
function quux (foo) {

}
// "jsdoc/check-values": ["error"|"warn", {"numericOnlyVariation":true}]
// Message: Invalid JSDoc @variation: "5.2".

/**
 * @license license-prefix Oops
 */
function quux (foo) {

}
// "jsdoc/check-values": ["error"|"warn", {"licensePattern":"(?<=license-prefix ).*"}]
// Message: Invalid JSDoc @license: "Oops"; expected SPDX expression: https://spdx.org/licenses/.

/**
 * @license Oops
 * Copyright 2022
 */
function quux (foo) {

}
// "jsdoc/check-values": ["error"|"warn", {"licensePattern":"^([^\n]+)\nCopyright"}]
// Message: Invalid JSDoc @license: "Oops"; expected SPDX expression: https://spdx.org/licenses/.
````



<a name="user-content-check-values-passing-examples"></a>
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
// "jsdoc/check-values": ["error"|"warn", {"allowedLicenses":["FOO","BAR","BAX"]}]

/**
 * @license FOO
 */
function quux (foo) {

}
// "jsdoc/check-values": ["error"|"warn", {"allowedLicenses":true}]

/**
 * @license MIT
 * Some extra text
 */
function quux (foo) {

}
// "jsdoc/check-values": ["error"|"warn", {"licensePattern":"[^\n]*"}]

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
// "jsdoc/check-values": ["error"|"warn", {"allowedAuthors":["Gajus Kuizinas","golopot","Brett Zamir"]}]

/**
 * @variation 3
 */
function quux (foo) {

}
// "jsdoc/check-values": ["error"|"warn", {"numericOnlyVariation":true}]

/**
 * @variation abc
 */
function quux (foo) {

}

/**
 * @module test
 * @license MIT\r
 */
'use strict';

/**
 * @kind function
 */
function quux (foo) {

}

/**
 * @license license-prefix MIT
 */
function quux (foo) {

}
// "jsdoc/check-values": ["error"|"warn", {"licensePattern":"(?<=license-prefix )MIT|GPL3.0"}]

/**
 * @license
 * Copyright 2022
 */
function quux (foo) {

}
// "jsdoc/check-values": ["error"|"warn", {"licensePattern":"^([^\n]+)(?!\nCopyright)"}]

/**
 * @license MIT
 * Copyright 2022
 */
function quux (foo) {

}
// "jsdoc/check-values": ["error"|"warn", {"licensePattern":"^([^\n]+)\nCopyright"}]
````

