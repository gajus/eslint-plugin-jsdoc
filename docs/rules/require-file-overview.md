<a name="user-content-require-file-overview"></a>
<a name="require-file-overview"></a>
# <code>require-file-overview</code>

* [Options](#user-content-require-file-overview-options)
    * [`tags`](#user-content-require-file-overview-options-tags)
* [Context and settings](#user-content-require-file-overview-context-and-settings)
* [Failing examples](#user-content-require-file-overview-failing-examples)
* [Passing examples](#user-content-require-file-overview-passing-examples)


Checks that:

1. All files have a `@file`, `@fileoverview`, or `@overview` tag.
2. Duplicate file overview tags within a given file will be reported
3. File overview tags will be reported which are not, as per
  [the docs](https://jsdoc.app/tags-file.html), "at the beginning of
  the file"–where beginning of the file is interpreted in this rule
  as being when the overview tag is not preceded by anything other than
  a comment.

<a name="user-content-require-file-overview-options"></a>
<a name="require-file-overview-options"></a>
## Options

<a name="user-content-require-file-overview-options-tags"></a>
<a name="require-file-overview-options-tags"></a>
### <code>tags</code>

The keys of this object are tag names, and the values are configuration
objects indicating what will be checked for these whole-file tags.

Each configuration object has the following boolean keys (which default
to `false` when this option is supplied): `mustExist`, `preventDuplicates`,
`initialCommentsOnly`. These correspond to the three items above.

When no `tags` is present, the default is:

```json
{
  "file": {
    "initialCommentsOnly": true,
    "mustExist": true,
    "preventDuplicates": true,
  }
}
```

You can add additional tag names and/or override `file` if you supply this
option, e.g., in place of or in addition to `file`, giving other potential
file global tags like `@license`, `@copyright`, `@author`, `@module` or
`@exports`, optionally restricting them to a single use or preventing them
from being preceded by anything besides comments.

For example:

```js
{
  "license": {
    "mustExist": true,
    "preventDuplicates": true,
  }
}
```

This would require one and only one `@license` in the file, though because
`initialCommentsOnly` is absent and defaults to `false`, the `@license`
can be anywhere.

In the case of `@license`, you can use this rule along with the
`check-values` rule (with its `allowedLicenses` or `licensePattern` options),
to enforce a license whitelist be present on every JS file.

Note that if you choose to use `preventDuplicates` with `license`, you still
have a way to allow multiple licenses for the whole page by using the SPDX
"AND" expression, e.g., `@license (MIT AND GPL-3.0)`.

Note that the tag names are the main jsdoc tag name, so you should use `file`
in this configuration object regardless of whether you have configured
`fileoverview` instead of `file` on `tagNamePreference` (i.e., `fileoverview`
will be checked, but you must use `file` on the configuration object).

<a name="user-content-require-file-overview-context-and-settings"></a>
<a name="require-file-overview-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|Everywhere|
|Tags|`file`; others when `tags` set|
|Aliases|`fileoverview`, `overview`|
|Recommended|false|
|Options|`tags`|

<a name="user-content-require-file-overview-failing-examples"></a>
<a name="require-file-overview-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js

// Message: Missing @file


// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"file":{"initialCommentsOnly":true,"mustExist":true,"preventDuplicates":true}}}]
// Message: Missing @file


// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"file":{"mustExist":true}}}]
// Message: Missing @file


// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"author":{"initialCommentsOnly":false,"mustExist":true,"preventDuplicates":false}}}]
// Message: Missing @author

/**
 *
 */
// Message: Missing @file

/**
 *
 */
function quux () {}
// Message: Missing @file

/**
 *
 */
function quux () {}
// Settings: {"jsdoc":{"tagNamePreference":{"file":"fileoverview"}}}
// Message: Missing @fileoverview

/**
 *
 */
function quux () {}
// Settings: {"jsdoc":{"tagNamePreference":{"file":"overview"}}}
// Message: Missing @overview

/**
 *
 */
function quux () {}
// Settings: {"jsdoc":{"tagNamePreference":{"file":false}}}
// Message: `settings.jsdoc.tagNamePreference` cannot block @file for the `require-file-overview` rule

/**
 *
 */
function quux () {}
// Settings: {"jsdoc":{"tagNamePreference":{"file":false}}}
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"file":{"initialCommentsOnly":false,"mustExist":true,"preventDuplicates":false}}}]
// Message: `settings.jsdoc.tagNamePreference` cannot block @file for the `require-file-overview` rule

/**
 *
 */
function quux () {}
// Settings: {"jsdoc":{"tagNamePreference":{"file":{"message":"Don't use file"}}}}
// Message: `settings.jsdoc.tagNamePreference` cannot block @file for the `require-file-overview` rule

/**
 * @param a
 */
function quux (a) {}
// Message: Missing @file

/**
 * @param a
 */
function quux (a) {}

/**
 * @param b
 */
function bar (b) {}
// Message: Missing @file

/**
 * @file
 */

 /**
  * @file
  */
// Message: Duplicate @file

/**
 * @copyright
 */

 /**
  * @copyright
  */
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"copyright":{"initialCommentsOnly":false,"mustExist":false,"preventDuplicates":true}}}]
// Message: Duplicate @copyright

function quux () {
}
/**
 * @file
 */
// Message: @file should be at the beginning of the file

function quux () {
}
/**
 * @license
 */
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"license":{"initialCommentsOnly":true,"mustExist":false,"preventDuplicates":false}}}]
// Message: @license should be at the beginning of the file

function quux () {
}
/**
 * @license
 */
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"license":{"initialCommentsOnly":true}}}]
// Message: @license should be at the beginning of the file

/**
 * @file
 */

/**
 * @file
 */
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"file":{"initialCommentsOnly":true,"preventDuplicates":true}}}]
// Message: Duplicate @file

/**
 *
 */
function quux () {}
// Settings: {"jsdoc":{"tagNamePreference":{"file":{"replacement":"fileoverview"}}}}
// Message: Missing @fileoverview
````



<a name="user-content-require-file-overview-passing-examples"></a>
<a name="require-file-overview-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @file
 */

/**
 * @file
 */

/**
 * @file
 */
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"license":{"initialCommentsOnly":true,"preventDuplicates":true}}}]

// Ok preceded by comment
/**
 * @file
 */

/**
 * @fileoverview
 */
// Settings: {"jsdoc":{"tagNamePreference":{"file":"fileoverview"}}}

/**
 * @overview
 */
// Settings: {"jsdoc":{"tagNamePreference":{"file":"overview"}}}

/**
 * @file Description of file
 */

/**
 * @file Description of file
 */
function quux () {
}

/**
 *
 */

function quux () {
}
/**
 *
 */
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"license":{"initialCommentsOnly":true,"mustExist":false,"preventDuplicates":false}}}]

function quux () {
}
/**
 *
 */
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"license":{"initialCommentsOnly":false,"mustExist":false,"preventDuplicates":false}}}]

function quux () {
}
/**
 *
 */
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"license":{"initialCommentsOnly":false,"mustExist":false,"preventDuplicates":true}}}]

/**
 * @license MIT
 */

 var a

 /**
  * @type {Array}
  */
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"license":{"initialCommentsOnly":true,"mustExist":false,"preventDuplicates":false}}}]
````

