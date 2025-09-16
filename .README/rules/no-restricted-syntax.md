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

For an alternative to this rule, see the
[Advanced](./docs/advanced.md#forbidding-structures) docs under
creating your own rules and forbidding structures.

## Options

{"gitdown": "options"}

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
