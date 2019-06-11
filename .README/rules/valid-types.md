### `valid-types`

Requires all types to be valid JSDoc or Closure compiler types without syntax errors.

Also impacts behaviors on namepath (or event)-defining and pointing tags:

1. Name(path)-defining tags requiring namepath: `@external`, `@host`, `@name`, `@typedef`
1. Name(path)-defining tags (which may have value without namepath or their
    namepath can be expressed elsewhere on the block): `@event`, `@callback`,
    `@class`, `@constructor`, `@constant`, `@const`,
    `@function`, `@func`, `@method`, `@interface`, `@member`, `@var`,
    `@mixin`, `@namespace`
1. Name(path)-pointing tags requiring namepath: `@alias`, `@augments`, `@extends`, `@lends`, `@memberof`, `@memberof!`, `@mixes`, `@this`
1. Name(path)-pointing tags (which may have value without namepath or their
    namepath can be expressed elsewhere on the block): `@listens`, `@fires`,
    `@emits`
1. Name(path)-pointing tags (multiple names in one): `@borrows`

...with the following applying to the above sets:

- Expect tags in set 1-4 to have a valid namepath if present
- Prevent sets 2 and 4 from being empty by setting `allowEmptyNamepaths` to
  `false` as these tags might have some indicative value without a path
  or may allow a name expressed elsewhere on the block (but sets 1 and 3 will
  always fail if empty)
- For the special case of set 5, i.e., `@borrows <that namepath> as <this namepath>`,
  check that both namepaths are present and valid and ensure there is an `as `
  between them.
- For the special case of `@memberof` and `@memberof!` (part of set 3), as
   per the [specification](https://jsdoc.app/tags-memberof.html), they also
   allow `#`, `.`, or `~` at the end (which is not allowed at the end of
   normal paths).

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|For name only unless otherwise stated: `alias`, `augments`, `borrows`, `callback`, `class` (for name and type), `constant` (for name and type), `enum` (for type), `event`, `external`, `fires`, `function`, `implements` (for type), `interface`, `lends`, `listens`, `member` (for name and type),  `memberof`, `memberof!`, `mixes`, `mixin`, `module` (for name and type), `name`, `namespace` (for name and type), `param` (for name and type), `property` (for name and type), `returns` (for type), `this`, `throws` (for type), `type` (for type), `typedef` (for name and type), `yields` (for type)|
|Aliases|`extends`, `constructor`, `const`, `host`, `emits`, `func`, `method`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|For type only: `package`, `private`, `protected`, `public`, `static`|
|Settings|`allowEmptyNamepaths`, `checkSeesForNamepaths`|

<!-- assertions validTypes -->
