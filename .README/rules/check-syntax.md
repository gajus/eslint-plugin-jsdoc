# `check-syntax`

{"gitdown": "contents", "rootId": "check-syntax"}

Reports against syntax not encouraged for the mode (e.g., Google Closure
Compiler in "jsdoc" or "typescript" mode). Note that this rule will not check
for types that are wholly invalid for a given mode, as that is covered by
`valid-types`.

Currently checks against:

- Use of `=` in "jsdoc" or "typescript" mode

Note that "jsdoc" actually allows Closure syntax, but with another
option available for optional parameters (enclosing the name in brackets), the
rule is enforced (except under "permissive" and "closure" modes).

## Fixer

With the `enableFixer` option, the Closure style `{type=}` is fixed:

- On `@param` (`@arg`, `@argument`) and `@property` (`@prop`) tags, `{type=} name`
  becomes `{type} [name]`, which also marks the name optional.
- On other tags (and on those tags when there is no name), the type is joined with
  `undefined`, e.g., `{string=}` becomes `{string|undefined}`, and a type that is
  not a plain name is wrapped in parentheses, e.g., `{() => void=}` becomes
  `{(() => void)|undefined}`.

All the tags of the block are fixed at once, and the problem is reported once
per block.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|false|
|Options|`enableFixer`|

## Failing examples

<!-- assertions-failing checkSyntax -->

## Passing examples

<!-- assertions-passing checkSyntax -->
