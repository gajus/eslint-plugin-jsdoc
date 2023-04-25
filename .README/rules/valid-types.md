# `valid-types`

{"gitdown": "contents", "rootId": "valid-types"}

Requires all types/namepaths to be valid JSDoc, Closure compiler, or
TypeScript types (configured by `settings.jsdoc.mode`).

Note that what determines a valid type is handled by
our type parsing engine, [jsdoc-type-pratt-parser](https://github.com/jsdoc-type-pratt-parser/jsdoc-type-pratt-parser),
using [`settings.jsdoc.mode`](../#settings-mode) to
determine whether to use jsdoc-type-pratt-parser's "permissive" parsing or
the stricter "jsdoc", "typescript", "closure" modes.

The following tags have their "type" portions (the segment within brackets)
checked (though those portions may sometimes be confined to namepaths,
e.g., `@modifies`):

1. Tags with required types: `@type`, `@implements`
1. Tags with required types in Closure or TypeScript: `@this`,
    `@define` (Closure only)
1. Tags with optional types: `@enum`, `@member` (`@var`), `@typedef`,
  `@augments` (or `@extends`), `@class` (or `@constructor`), `@constant`
  (or `@const`), `@module` (module paths are not planned for TypeScript),
  `@namespace`, `@throws`, `@exception`, `@yields` (or `@yield`),
  `@modifies` (undocumented jsdoc); `@param` (`@arg`, `@argument`),
  `@property` (`@prop`), and `@returns` (`@return`) also fall into this
  category, but while this rule will check their type validity, we leave
  the requiring of the type portion to the rules `require-param-type`,
  `require-property-type`, and `require-returns-type`, respectively.
1. Tags with types that are available optionally in Closure: `@export`,
    `@package`, `@private`, `@protected`, `@public`, `@static`;
    `@template` (TypeScript also)
1. Tags with optional types that may take free text instead: `@throws`

The following tags have their name/namepath portion (the non-whitespace
text after the tag name) checked:

1. Name(path)-defining tags requiring namepath: `@event`, `@callback`,
    `@exports` (JSDoc only),
    `@external`, `@host`, `@name`, `@typedef` (JSDoc only), and `@template`
    (TypeScript/Closure only); `@param` (`@arg`, `@argument`) and `@property`
    (`@prop`) also fall into this category, but while this rule will check
    their namepath validity, we leave the requiring of the name portion
    to the rules `require-param-name` and `require-property-name`,
    respectively.
1. Name(path)-defining tags (which may have value without namepath or their
    namepath can be expressed elsewhere on the block):
    `@class`, `@constructor`, `@constant`, `@const`, `@function`, `@func`,
    `@method`, `@interface` (non-Closure only), `@member`, `@var`,
    `@mixin`, `@namespace`, `@module` (module paths are not planned for
    TypeScript)
1. Name(path)-pointing tags requiring namepath: `@alias`, `@augments`,
    `@extends` (JSDoc only), `@lends`, `@memberof`, `@memberof!`, `@mixes`, `@requires`, `@this`
    (jsdoc only)
1. Name(path)-pointing tags (which may have value without namepath or their
    namepath can be expressed elsewhere on the block): `@listens`, `@fires`,
    `@emits`.
1. Name(path)-pointing tags which may have free text or a namepath: `@see`
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

If you define your own tags, `settings.jsdoc.structuredTags` will allow
these custom tags to be checked, with the name portion of tags checked for
valid namepaths (based on the tag's `name` value), their type portions checked
for valid types (based on the tag's `type` value), and either portion checked
for presence (based on `false` `name` or `type` values or their `required`
value). See the setting for more details.

## Options

- `allowEmptyNamepaths` (default: true) - Set to `false` to bulk disallow
  empty name paths with namepath groups 2 and 4 (these might often be
  expected to have an accompanying name path, though they have some
  indicative value without one; these may also allow names to be defined
  in another manner elsewhere in the block); you can use
  `settings.jsdoc.structuredTags` with the `required` key set to "name" if you
  wish to require name paths on a tag-by-tag basis.

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|For name only unless otherwise stated: `alias`, `augments`, `borrows`, `callback`, `class` (for name and type), `constant` (for name and type), `enum` (for type), `event`, `external`, `fires`, `function`, `implements` (for type), `interface`, `lends`, `listens`, `member` (for name and type),  `memberof`, `memberof!`, `mixes`, `mixin`, `modifies`, `module` (for name and type), `name`, `namespace` (for name and type), `param` (for name and type), `property` (for name and type), `returns` (for type), `see` (optionally for name), `this`, `throws` (for type), `type` (for type), `typedef` (for name and type), `yields` (for type)|
|Aliases|`extends`, `constructor`, `const`, `host`, `emits`, `func`, `method`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|For type only: `package`, `private`, `protected`, `public`, `static`|
|Recommended|true|
|Options|`allowEmptyNamepaths`|
|Settings|`mode`, `structuredTags`|

## Failing examples

<!-- assertions-failing validTypes -->

## Passing examples

<!-- assertions-passing validTypes -->
