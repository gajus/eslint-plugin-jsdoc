### `valid-types`

Requires all types to be valid JSDoc, Closure, or TypeScript compiler types
without syntax errors. Note that what determines a valid type is handled by
our type parsing engine, [jsdoctypeparser](https://github.com/jsdoctypeparser/jsdoctypeparser),
using [`settings.jsdoc.mode`](#eslint-plugin-jsdoc-settings-mode) to
determine whether to use jsdoctypeparser's "permissive" mode or the stricter
"jsdoc", "typescript", "closure" modes.

Also impacts behaviors on namepath (or event)-defining and pointing tags:

1. Name(path)-defining tags requiring namepath: `@external`, `@host`,
    `@name`, `@typedef`; `@param` (`@arg`, `@argument`) and `@property`
    (`@prop`) also fall into this category, but while this rule will check
    their namepath validity, we leave the requiring of the name portion
    to the rules `require-param-name` and `require-property-name`,
    respectively.
1. Name(path)-defining tags (which may have value without namepath or their
    namepath can be expressed elsewhere on the block): `@event`, `@callback`,
    `@class`, `@constructor`, `@constant`, `@const`,
    `@function`, `@func`, `@method`, `@interface`, `@member`, `@var`,
    `@mixin`, `@namespace`, `@module`
1. Name(path)-pointing tags requiring namepath: `@alias`, `@augments`,
    `@extends`, `@lends`, `@memberof`, `@memberof!`, `@mixes`, `@this`
1. Name(path)-pointing tags (which may have value without namepath or their
    namepath can be expressed elsewhere on the block): `@listens`, `@fires`,
    `@emits`, and `@modifies` (an undocumented jsdoc tag)
1. Name(path)-pointing tags which may have free text or a namepath:
    `@throws`, `@see`
1. Name(path)-pointing tags (multiple names in one): `@borrows`

...with the following applying to the above sets:

- Expect tags in set 1-4 to have a valid namepath if present
- Prevent sets 2 and 4 from being empty by setting `allowEmptyNamepaths` to
  `false` as these tags might have some indicative value without a path
  or may allow a name expressed elsewhere on the block (but sets 1 and 3 will
  always fail if empty)
- For the special case of set 6, i.e.,
  `@borrows <that namepath> as <this namepath>`,
  check that both namepaths are present and valid and ensure there is an `as `
  between them. In the case of `<this namepath>`, it can be preceded by
  one of the name path operators, `#`, `.`, or `~`.
- For the special case of `@memberof` and `@memberof!` (part of set 3), as
   per the [specification](https://jsdoc.app/tags-memberof.html), they also
   allow `#`, `.`, or `~` at the end (which is not allowed at the end of
   normal paths).

#### Options

- `allowEmptyNamepaths` (default: true) - Set to `false` to disallow
  empty name paths with groups 2 and 4 (these might often be expected to have
  an accompanying name path, though they have some indicative value without
  one; these may also allow names to be defined in another manner elsewhere
  in the block)
- `checkSeesForNamepaths` (default: false) - Set this to `true` to insist
  that `@see` only use name paths (the tag is normally permitted to
  allow other text)

|||
|---|---|
|Context|everywhere|
|Tags|For name only unless otherwise stated: `alias`, `augments`, `borrows`, `callback`, `class` (for name and type), `constant` (for name and type), `enum` (for type), `event`, `external`, `fires`, `function`, `implements` (for type), `interface`, `lends`, `listens`, `member` (for name and type),  `memberof`, `memberof!`, `mixes`, `mixin`, `modifies`, `module` (for name and type), `name`, `namespace` (for name and type), `param` (for name and type), `property` (for name and type), `returns` (for type), `see` (optionally for name), `this`, `throws` (for type), `type` (for type), `typedef` (for name and type), `yields` (for type)|
|Aliases|`extends`, `constructor`, `const`, `host`, `emits`, `func`, `method`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|For type only: `package`, `private`, `protected`, `public`, `static`|
|Options|`allowEmptyNamepaths`, `checkSeesForNamepaths`|
|Settings|`mode`|

<!-- assertions validTypes -->
