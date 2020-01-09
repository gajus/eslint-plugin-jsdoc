<a name="valid-types"></a>
# <code>valid-types</code>

* [`valid-types`](#valid-types)
    * [Options](#valid-types-options)
    * [Context and settings](#valid-types-context-and-settings)
    * [Failing examples](#valid-types-failing-examples)
    * [Passing examples](#valid-types-passing-examples)


Requires all types/namepaths to be valid JSDoc, Closure compiler, or TypeScript types
(configured by `settings.jsdoc.mode`).

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
    `@emits`, and `@modifies`
1. Name(path)-pointing tags (multiple names in one): `@borrows`

...with the following applying to the above sets:

- Expect tags in set 1-4 to have a valid namepath if present
- Prevent sets 2 and 4 from being empty by setting `allowEmptyNamepaths` to
  `false` as these tags might have some indicative value without a path
  or may allow a name expressed elsewhere on the block (but sets 1 and 3 will
  always fail if empty)
- For the special case of set 5, i.e., `@borrows <that namepath> as <this namepath>`,
  check that both namepaths are present and valid and ensure there is an `as `
  between them. In the case of `<this namepath>`, it can be preceded by
  one of the name path operators, `#`, `.`, or `~`.
- For the special case of `@memberof` and `@memberof!` (part of set 3), as
   per the [specification](https://jsdoc.app/tags-memberof.html), they also
   allow `#`, `.`, or `~` at the end (which is not allowed at the end of
   normal paths).

<a name="valid-types-options"></a>
## Options

- `allowEmptyNamepaths` (default: true) - Set to `false` to disallow
  empty name paths with `@callback`, `@event`, `@class`, `@constructor`,
  `@constant`, `@const`, `@function`, `@func`, `@method`, `@interface`,
  `@member`, `@var`, `@mixin`, `@namespace`, `@listens`, `@fires`,
  `@modifies`, or `@emits` (these might often be expected to have an
  accompanying name path, though they have some indicative value without
  one; these may also allow names to be defined in another manner elsewhere
  in the block)
- `checkSeesForNamepaths` (default: false) - Set this to `true` to insist
  that `@see` only use name paths (the tag is normally permitted to
  allow other text)

<a name="valid-types-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|For name only unless otherwise stated: `alias`, `augments`, `borrows`, `callback`, `class` (for name and type), `constant` (for name and type), `enum` (for type), `event`, `external`, `fires`, `function`, `implements` (for type), `interface`, `lends`, `listens`, `member` (for name and type),  `memberof`, `memberof!`, `mixes`, `mixin`, `modifies`, `module` (for name and type), `name`, `namespace` (for name and type), `param` (for name and type), `property` (for name and type), `returns` (for type), `this`, `throws` (for type), `type` (for type), `typedef` (for name and type), `yields` (for type)|
|Aliases|`extends`, `constructor`, `const`, `host`, `emits`, `func`, `method`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|For type only: `package`, `private`, `protected`, `public`, `static`|
|Options|`allowEmptyNamepaths`, `checkSeesForNamepaths`|
|Settings|`mode`|

<a name="valid-types-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @param {Array<string} foo
 */
function quux() {

}
// Message: Syntax error in type: Array<string

/**
 * @memberof module:namespace.SomeClass<~
 */
function quux() {

}
// Message: Syntax error in namepath: module:namespace.SomeClass<~

/**
 * @memberof module:namespace.SomeClass~<
 */
function quux() {

}
// Message: Syntax error in namepath: module:namespace.SomeClass~<

/**
 * @borrows foo% as bar
 */
function quux() {

}
// Message: Syntax error in namepath: foo%

/**
 * @borrows #foo as bar
 */
function quux() {

}
// Message: Syntax error in namepath: #foo

/**
 * @borrows foo as bar%
 */
function quux() {

}
// Message: Syntax error in namepath: bar%

/**
 * @borrows foo
 */
function quux() {

}
// Message: @borrows must have an "as" expression. Found ""

/**
 * @see foo%
 */
function quux() {

}
// Options: [{"checkSeesForNamepaths":true}]
// Message: Syntax error in namepath: foo%

/** */
function foo() {}
// Settings: {"jsdoc":{"allowEmptyNamepaths":true,"checkSeesForNamepaths":true}}
// Message: `settings.jsdoc.allowEmptyNamepaths` has been removed, use options in the rule `valid-types` instead.

/**
 * @alias module:abc#event:foo-bar
 */
function quux() {

}
// Message: Syntax error in namepath: module:abc#event:foo-bar

/**
 * @mixes module:namespace.SomeClass~
 */
function quux() {

}
// Message: Syntax error in namepath: module:namespace.SomeClass~

/**
 * @callback
 */
function quux() {

}
// Options: [{"allowEmptyNamepaths":false}]
// Message: Tag @callback must have a name/namepath

/**
 * @constant {str%ng}
 */
 const FOO = 'foo';
// Message: Syntax error in type: str%ng

/**
 * @typedef {str%ng} UserString
 */
// Message: Syntax error in type: str%ng

/**
 * @typedef {string} UserStr%ng
 */
// Message: Syntax error in namepath: UserStr%ng

/**
 * @extends
 */
 class Bar {};
// Message: Tag @extends must have either a type or namepath

/**
 * @type
 */
 let foo;
// Message: Tag @type must have a type

/**
 * @modifies {bar|foo<}
 */
function quux (foo, bar, baz) {}
// Message: Syntax error in type: bar|foo<

/**
 * @private {BadTypeChecked<}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Syntax error in type: BadTypeChecked<

/**
 * @this {BadTypeChecked<}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Syntax error in type: BadTypeChecked<

/**
 * @define
 */
 function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Tag @define must have a type

/**
 * @this
 */
 let foo;
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Tag @this must have a type
````


<a name="valid-types-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @param {Array<string>} foo
 */
function quux() {

}

/**
 * @param {string} foo
 */
function quux() {

}

/**
 * @param foo
 */
function quux() {

}

/**
 * @borrows foo as bar
 */
function quux() {

}

/**
 * @borrows foo as #bar
 */
function quux() {

}

/**
 * @see foo%
 */
function quux() {

}

/**
 * @alias module:namespace.SomeClass#event:ext_anevent
 */
function quux() {

}

/**
 * @callback foo
 */
function quux() {

}

/**
 * @callback
 */
function quux() {

}
// Options: [{"allowEmptyNamepaths":true}]

/**
 * @class
 */
function quux() {

}

/**
 * @see {@link foo}
 */
function quux() {

}
// Options: [{"checkSeesForNamepaths":true}]

/**
 *
 * @fires {module:namespace.SomeClass#event:ext_anevent}
 */
function quux() {

}

/**
 * @memberof module:namespace.SomeClass~
 */
function quux() {

}

/**
 * @memberof! module:namespace.SomeClass.
 */
function quux() {

}

/**
 *
 */
function quux() {

}

/**
 * @constant {string}
 */
 const FOO = 'foo';

/**
 * @constant {string} FOO
 */
 const FOO = 'foo';

/**
 * @extends Foo
 */
 class Bar {};

/**
 * @extends {Foo<String>}
 */
 class Bar {};

/**
 * @typedef {number|string} UserDefinedType
 */

/**
 * @typedef {number|string}
 */
let UserDefinedGCCType;

/**
 * @modifies {foo|bar}
 */
function quux (foo, bar, baz) {}

/**
 * @private {BadTypeNotCheckedInJsdoc<}
 */
function quux () {}

/**
 * @this {Navigator}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @export {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @define {boolean}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @define
 */
 function quux () {}
````

