### `no-undefined-types`

Checks that types in jsdoc comments are defined. This can be used to check
unimported types.

When enabling this rule, types in jsdoc comments will resolve as used
variables, i.e. will not be marked as unused by `no-unused-vars`.

In addition to considering globals found in code (or in ESLint-indicated
`globals`) as defined, the following tags will also be checked for
name(path) definitions to also serve as a potential "type" for checking
the tag types in the table below:

`@callback`, `@class` (or `@constructor`), `@constant` (or `@const`), `@event`, `@external` (or `@host`), `@function` (or `@func` or `@method`), `@interface`, `@member` (or `@var`), `@mixin`, `@name`, `@namespace`, `@template`, `@typedef`.

The following types are always considered defined.

- `null`, `undefined`, `string`, `boolean`, `object`, `function`
- `number`, `NaN`, `Infinity`
- `any`, `*`
- `Array`, `Object`, `RegExp`, `Date`, `Function`

#### Options

An option object may have the following keys:

- `preferredTypesDefined` -  If this option is set to `true` and preferred
  types are indicated within `settings.jsdoc.preferredTypes`, any such
  types will be assumed to be defined as well.
- `definedTypes` - This array can be populated to indicate other types which
  are automatically considered as defined (in addition to globals, etc.)

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`class`, `constant`, `enum`, `implements`, `member`, `module`, `namespace`, `param`, `property`, `returns`, `throws`, `type`, `typedef`, `yields`|
|Aliases|`constructor`, `const`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|`package`, `private`, `protected`, `public`, `static`|
|Options|`preferredTypesDefined`, `definedTypes`|
|Settings|`preferredTypes`|

<!-- assertions noUndefinedTypes -->
