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

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|false|

## Failing examples

<!-- assertions-failing checkSyntax -->

## Passing examples

<!-- assertions-passing checkSyntax -->
