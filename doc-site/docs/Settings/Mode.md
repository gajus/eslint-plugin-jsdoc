---
sidebar_position: 3
---

- `settings.jsdoc.mode` - Set to `typescript`, `closure`, or `jsdoc` (the
  default unless the `@typescript-eslint` parser is in use in which case
  `typescript` will be the default).

Note that if you do not wish to use separate `.eslintrc.*` files for a
project containing both JavaScript and TypeScript, you can also use
[`overrides`](https://eslint.org/docs/user-guide/configuring). You may also
set to `"permissive"` to try to be as accommodating to any of the styles,
but this is not recommended.

Currently is used for the following:

  - `check-tag-names`: Determine valid tags and aliases
  - `no-undefined-types`: Only check `@template` for types in "closure" and
    "typescript" modes
  - `check-syntax`: determines aspects that may be enforced
  - `valid-types`: in non-Closure mode, `@extends`, `@package` and access tags
     (e.g., `@private`) with a bracketed type are reported as are missing
     names with `@typedef`
  - For type/namepath-checking rules, determine which tags will be checked for
    types/namepaths (Closure allows types on some tags which the others do not,
    so these tags will additionally be checked in "closure" mode)
  - For type-checking rules, impacts parsing of types (through
    [jsdoc-type-pratt-parser](https://github.com/simonseyock/jsdoc-type-pratt-parser)
    dependency)
  - Check preferred tag names
  - Disallows namepath on `@interface` for "closure" mode in `valid-types` (and
      avoids checking in other rules)
