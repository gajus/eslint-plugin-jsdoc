# `require-hyphen-before-param-description`

{"gitdown": "contents", "rootId": "require-hyphen-before-param-description"}

Requires (or disallows) a hyphen before the `@param` description.

## Fixer

(Todo)

## Options

This rule takes one optional string argument and an optional options object.

If the string is `"always"` then a problem is raised when there is no hyphen
before the description. If it is `"never"` then a problem is raised when there
is a hyphen before the description. The default value is `"always"`.

The options object may have the following properties to indicate behavior for
other tags besides the `@param` tag (or the `@arg` tag if so set):

- `tags` - Object whose keys indicate different tags to check for the
  presence or absence of hyphens; the key value should be "always" or "never",
  indicating how hyphens are to be applied, e.g., `{property: 'never'}`
  to ensure `@property` never uses hyphens. A key can also be set as `*`, e.g.,
  `'*': 'always'` to apply hyphen checking to any tag (besides the preferred
  `@param` tag which follows the main string option setting and besides any
  other `tags` entries).

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`param` and optionally other tags within `tags`|
|Aliases|`arg`, `argument`; potentially `prop` or other aliases|
|Recommended|false|
|Options|a string matching `"always" or "never"` followed by an optional object with a `tags` property|

## Failing examples

<!-- assertions-failing requireHyphenBeforeParamDescription -->

## Passing examples

<!-- assertions-passing requireHyphenBeforeParamDescription -->
