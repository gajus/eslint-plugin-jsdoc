# `no-restricted-syntax`

{"gitdown": "contents", "rootId": "no-restricted-syntax"}

Reports when certain comment structures are present.

Note that this rule differs from ESLint's [no-restricted-syntax](https://eslint.org/docs/rules/no-restricted-syntax)
rule in expecting values within a single options object's
`contexts` property, and with the property `context` being used in place of
`selector` (as well as allowing for `comment`). The format also differs from
the format expected by [`eslint-plugin-query`](https://github.com/brettz9/eslint-plugin-query).

Unlike those rules, this is specific to finding comments attached to
structures, (whether or not you add a specific `comment` condition).

Note that if your parser supports comment AST (as [jsdoc-eslint-parser](https://github.com/brettz9/jsdoc-eslint-parser)
is designed to do), you can just use ESLint's rule.

## Options

### `contexts`

Set this to an array of strings representing the AST context (or an object with
`context` and `comment` properties) where you wish the rule to be applied.

Use the `message` property to indicate the specific error to be shown when an
error is reported for that context being found.

Set to `"any"` if you want the rule to apply to any jsdoc block throughout
your files (as is necessary for finding function blocks not attached to a
function declaration or expression, i.e., `@callback` or `@function` (or its
aliases `@func` or `@method`) (including those associated with an `@interface`).

See the ["AST and Selectors"](../#advanced-ast-and-selectors)
section of our README for more on the expected format.

## Context and settings

|||
|---|---|
|Context|None except those indicated by `contexts`|
|Tags|Any if indicated by AST|
|Recommended|false|
|Options|`contexts`|

## Failing examples

<!-- assertions-failing noRestrictedSyntax -->

## Passing examples

<!-- assertions-passing noRestrictedSyntax -->
