### `valid-types`

Requires all types to be valid JSDoc or Closure compiler types without syntax errors.

Also impacts behaviors on namepath-pointing or event-pointing tags:

1.  `@alias`, `@augments`, `@extends`, `@lends`, `@memberof`, `@memberof!`, `@mixes`, `@name`, `@this`
1.  `@callback`, `@event`, `@listens`, `@fires`, `@emits`
1.  `@borrows`

The following apply to the above sets:

-   Expect tags in set 1 or 2 to have a valid namepath if present
-   Prevent set 2 from being empty by setting `allowEmptyNamepaths` to `false` as these tags might have some indicative value without a path (but set 1 will always fail if empty)
-   For the special case of set 3, i.e., `@borrows <that namepath> as <this namepath>`, check that both namepaths are present and valid and ensure there is an `as ` between them.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|For name only unless otherwise stated: `alias`, `augments`, `borrows`, `callback`, `class` (for name and type), `constant` (for name and type), `enum` (for type), `event`, `external`, `fires`, `function`, `implements` (for type), `interface`, `lends`, `listens`, `member` (for name and type),  `memberof`, `memberof!`, `mixes`, `mixin`, `module` (for name and type), `name`, `namespace` (for name and type), `param` (for name and type), `property` (for name and type), `returns` (for type), `this`, `throws` (for type), `type` (for type), `typedef` (for name and type), `yields` (for type)|
|Aliases|`extends`, `constructor`, `const`, `host`, `emits`, `func`, `method`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|For type only: `package`, `private`, `protected`, `public`, `static`|
|Settings|`allowEmptyNamepaths`, `checkSeesForNamepaths`|

<!-- assertions validTypes -->
