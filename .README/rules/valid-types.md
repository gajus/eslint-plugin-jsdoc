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
|Tags|`param`, `returns`|

<!-- assertions validTypes -->
