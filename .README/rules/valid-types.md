### `valid-types`

Requires all types to be valid JSDoc or Closure compiler types without syntax errors.

Also impacts behaviors on namepath (or event)-defining and pointing tags:

1. Name(path)-defining tags: `@class`, `@constructor`, `@constant`, `@const`, `@external`, `@host`, `@function`, `@func`, `@method`, `@interface`, `@member`, `@var`, `@mixin`, `@name`, `@namespace`, `@typedef`
1. Name(path)-pointing tags: `@alias`, `@augments`, `@extends`, `@lends`, `@memberof`, `@memberof!`, `@mixes`, `@this`
1. Name(path)-defining tags (which may have value without namepath): `@callback`, `@event`
1. Name(path)-pointing tags (which may have value without namepath): `@listens`, `@fires`, `@emits`
1. Name(path)-pointing tags (multiple names in one): `@borrows`

...with the following applying to the above sets:

- Expect tags in set 1-4 to have a valid namepath if present
- Prevent sets 3-4 from being empty by setting `allowEmptyNamepaths` to `false` as these tags might have some indicative value without a path (but sets 1-2 will always fail if empty)
- For the special case of set 5, i.e., `@borrows <that namepath> as <this namepath>`, check that both namepaths are present and valid and ensure there is an `as ` between them.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|For name only unless otherwise stated: `alias`, `augments`, `borrows`, `callback`, `class` (for name and type), `constant` (for name and type), `enum` (for type), `event`, `external`, `fires`, `function`, `implements` (for type), `interface`, `lends`, `listens`, `member` (for name and type),  `memberof`, `memberof!`, `mixes`, `mixin`, `module` (for name and type), `name`, `namespace` (for name and type), `param` (for name and type), `property` (for name and type), `returns` (for type), `this`, `throws` (for type), `type` (for type), `typedef` (for name and type), `yields` (for type)|
|Aliases|`extends`, `constructor`, `const`, `host`, `emits`, `func`, `method`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|For type only: `package`, `private`, `protected`, `public`, `static`|
|Settings|`allowEmptyNamepaths`, `checkSeesForNamepaths`|

<!-- assertions validTypes -->
