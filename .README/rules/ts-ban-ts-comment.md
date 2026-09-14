# `ts-ban-ts-comment`

Disallows `@ts-<directive>` comments (`@ts-expect-error`, `@ts-ignore`,
`@ts-nocheck`, `@ts-check`) or requires that they be accompanied by a
description, mirroring the behavior of
[`@typescript-eslint/ban-ts-comment`](https://typescript-eslint.io/rules/ban-ts-comment/).

This rule is only recommended for `typescript-flavor` configs (i.e., those
using TypeScript-style JSDoc without an actual TypeScript compiler), since
`typescript` configs are expected to already have `typescript-eslint`
enabled, which offers its own `@typescript-eslint/ban-ts-comment` rule for
this purpose.

Note that when `ts-ignore` is banned (the default), this rule always
suggests replacing `@ts-ignore` with `@ts-expect-error`, since the latter
will itself report an error if the following line turns out not to need
suppressing. However, `@ts-expect-error` requires the following line to
*always* error, so it is unsuitable if, e.g., a codebase is type-checked
against multiple TypeScript versions and the line only errors under some
of them; in that scenario, `@ts-ignore` remains the appropriate choice.
Since the rule cannot detect this (it does not run the type checker), such
codebases should instead configure `ts-ignore` as `false` or
`"allow-with-description"` so the necessary `@ts-ignore` comments are not
reported.

## Options

{"gitdown": "options"}

|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|false, but recommended for `typescript-flavor` configs|
|Settings||

## Failing examples

<!-- assertions-failing tsBanTsComment -->

## Passing examples

<!-- assertions-passing tsBanTsComment -->
