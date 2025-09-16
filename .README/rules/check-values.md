# `check-values`

{"gitdown": "contents", "rootId": "check-values"}

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
7. `@import` - For TypeScript `mode` only. Enforces valid ES import syntax.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`@version`, `@since`, `@kind`, `@license`, `@author`, `@variation`|
|Recommended|true|
|Options|`allowedAuthors`, `allowedLicenses`, `licensePattern`, `numericOnlyVariation`|
|Settings|`tagNamePreference`|

## Failing examples

<!-- assertions-failing checkValues -->

## Passing examples

<!-- assertions-passing checkValues -->
