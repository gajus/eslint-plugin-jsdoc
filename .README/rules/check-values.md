### `check-values`

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

#### Options

##### `allowedAuthors`

An array of allowable author values. If absent, only non-whitespace will
be checked for.

##### `allowedLicenses`

An array of allowable license values or `true` to allow any license text.
If present as an array, will be used in place of SPDX identifiers.

##### `licensePattern`

A string to be converted into a `RegExp` (with `u` flag) and whose first
parenthetical grouping, if present, will match the portion of the license
description to check (if no grouping is present, then the whole portion
matched will be used). Defaults to `/([^\n\r]*)/gu`, i.e., the SPDX expression
is expected before any line breaks.

Note that the `/` delimiters are optional, but necessary to add flags.

Defaults to using the `u` flag, so to add your own flags, encapsulate
your expression as a string, but like a literal, e.g., `/^mit$/ui`.

##### `numericOnlyVariation`

Whether to enable validation that `@variation` must be a number. Defaults to
`false`.

|||
|---|---|
|Context|everywhere|
|Tags|`@version`, `@since`, `@kind`, `@license`, `@author`, `@variation`|
|Recommended|true|
|Options|`allowedAuthors`, `allowedLicenses`, `licensePattern`|
|Settings|`tagNamePreference`|

<!-- assertions checkValues -->
