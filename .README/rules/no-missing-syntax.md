# `no-missing-syntax`

{"gitdown": "contents", "rootId": "no-missing-syntax"}

This rule lets you report if certain always expected comment structures are
missing.

This (along with `no-restricted-syntax`) is a bit similar to Schematron for
XML or jsontron for JSON--you can validate expectations of there being
arbitrary structures.

This differs from the rule of the same name in
[`eslint-plugin-query`](https://github.com/brettz9/eslint-plugin-query)
in that this rule always looks for a comment above a structure (whether or not
you have a `comment` condition).

This rule might be especially useful with [`overrides`](https://eslint.org/docs/user-guide/configuring/configuration-files#how-do-overrides-work)
where you need only require tags and/or types within specific directories
(e.g., to enforce that a plugins or locale directory always has a certain form
of export and comment therefor).

In addition to being generally useful for precision in requiring contexts,
it is hoped that the ability to specify required tags on structures can
be used for requiring `@type` or other types for a minimalist yet adequate
specification of types which can be used to compile JavaScript+JSDoc (JJ)
to WebAssembly (e.g., by converting it to TypeSscript and then using
AssemblyScript to convert to WebAssembly). (It may be possible that one
will need to require types with certain structures beyond function
declarations and the like, as well as optionally requiring specification
of number types.)

Note that you can use selectors which make use of negators like `:not()`
including with asterisk, e.g., `*:not(FunctionDeclaration)` to indicate types
which are not adequate to satisfy a condition, e.g.,
`FunctionDeclaration:not(FunctionDeclaration[id.name="ignoreMe"])` would
not report if there were only a function declaration of the name "ignoreMe"
(though it would report by function declarations of other names).

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

<!-- assertions-failing noMissingSyntax -->

## Passing examples

<!-- assertions-passing noMissingSyntax -->
