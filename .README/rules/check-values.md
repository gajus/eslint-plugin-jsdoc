### `check-values`

{"gitdown": "contents", "rootId": "check-values"}

This rule checks the values for a handful of tags:

1. `@version` - Checks that there is a present and valid
    [semver](https://semver.org/) version value.
2. `@since` - As with `@version`
3. `@license` - Checks that there is a present and valid SPDX identifier
    or is present within an `allowedLicenses` option.
4. `@author` - Checks there is a value present, and if the option
    `allowedAuthors` is present, ensure that the author value is one
    of these array items.

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
matched will be used). Defaults to `([^\n]*)`, i.e., the SPDX expression
is expected before any line breaks.

|||
|---|---|
|Context|everywhere|
|Tags|`@version`, `@since`, `@license`, `@author`|
|Options|`allowedAuthors`, `allowedLicenses`, `licensePattern`|
|Settings|`tagNamePreference`|

<!-- assertions checkValues -->
