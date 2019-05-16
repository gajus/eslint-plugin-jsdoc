### `no-undefined-types`

Checks that types in jsdoc comments are defined. This can be used to check
unimported types.

When enabling this rule, types in jsdoc comments will resolve as used
variables, i.e. will not be marked as unused by `no-unused-vars`.

The following tags will be checked for name(paths) definitions to also serve
as a potential "type" for checking the tag types in the table below:

`callback`, `class` (or `constructor`), `constant` (or `const`), `event`, `external` (or `host`), `function` (or `func` or `method`), `interface`, `member` (or `var`), `mixin`, `name`, `namespace`, `typedef`.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`class`, `constant`, `enum`, `implements`, `member`, `module`, `namespace`, `param`, `property`, `returns`, `throws`, `type`, `typedef`, `yields`|
|Aliases|`constructor`, `const`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|`package`, `private`, `protected`, `public`, `static`|
<!-- assertions noUndefinedTypes -->
