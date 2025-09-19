# `prefer-import-tag`

Prefer `@import` tags to inline `import()` statements.

## Fixer

Creates `@import` tags if an already existing matching `@typedef` or
`@import` is not found.

## Options

{"gitdown": "options"}

|||
|---|---|
|Context|everywhere|
|Tags|`augments`, `class`, `constant`, `enum`, `implements`, `member`, `module`, `namespace`, `param`, `property`, `returns`, `throws`, `type`, `typedef`, `yields`|
|Aliases|`constructor`, `const`, `extends`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|`package`, `private`, `protected`, `public`, `static`|
|Recommended|false|
|Settings|`mode`|
|Options|`enableFixer`, `exemptTypedefs`, `outputType`|

## Failing examples

<!-- assertions-failing preferImportTag -->

## Passing examples

<!-- assertions-passing preferImportTag -->
