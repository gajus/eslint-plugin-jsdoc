<a name="user-content-valid-types"></a>
<a name="valid-types"></a>
# <code>valid-types</code>

* [Options](#user-content-valid-types-options)
* [Context and settings](#user-content-valid-types-context-and-settings)
* [Failing examples](#user-content-valid-types-failing-examples)
* [Passing examples](#user-content-valid-types-passing-examples)


Requires all types/namepaths to be valid JSDoc, Closure compiler, or
TypeScript types (configured by `settings.jsdoc.mode`).

Note that what determines a valid type is handled by
our type parsing engine, [jsdoc-type-pratt-parser](https://github.com/jsdoc-type-pratt-parser/jsdoc-type-pratt-parser),
using [`settings.jsdoc.mode`](#user-content-eslint-plugin-jsdoc-settings-mode) to
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

<a name="user-content-valid-types-options"></a>
<a name="valid-types-options"></a>
## Options

- `allowEmptyNamepaths` (default: true) - Set to `false` to bulk disallow
  empty name paths with namepath groups 2 and 4 (these might often be
  expected to have an accompanying name path, though they have some
  indicative value without one; these may also allow names to be defined
  in another manner elsewhere in the block); you can use
  `settings.jsdoc.structuredTags` with the `required` key set to "name" if you
  wish to require name paths on a tag-by-tag basis.

<a name="user-content-valid-types-context-and-settings"></a>
<a name="valid-types-context-and-settings"></a>
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

<a name="user-content-valid-types-failing-examples"></a>
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
 * @param someParam<~
 */
function quux() {

}
// Message: Syntax error in namepath: someParam<~

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
// Settings: {"jsdoc":{"structuredTags":{"see":{"name":"namepath-referencing","required":["name"]}}}}
// Message: Syntax error in namepath: foo%

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
// "jsdoc/valid-types": ["error"|"warn", {"allowEmptyNamepaths":false}]
// Message: Tag @callback must have a name/namepath.

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
 * @this
 */
 class Bar {};
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// "jsdoc/valid-types": ["error"|"warn", {"allowEmptyNamepaths":false}]
// Message: Tag @this must have either a type or namepath in "jsdoc" mode.

/**
 * @aCustomTag
 */
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"required":["typeOrNameRequired"]}}}}
// "jsdoc/valid-types": ["error"|"warn", {"allowEmptyNamepaths":false}]
// Message: Tag @aCustomTag must have either a type or namepath.

/**
 * @type
 */
 let foo;
// Message: Tag @type must have a type.

/**
 * @modifies {bar | foo<}
 */
function quux (foo, bar, baz) {}
// Message: Syntax error in type: bar | foo<

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
// Message: Tag @define must have a type in "closure" mode.

/**
 * @this
 */
 let foo;
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Tag @this must have a type in "closure" mode.

/**
 * Foo function.
 *
 * @param {[number, string]} bar - The bar array.
 */
function foo(bar) {}
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: Syntax error in type: [number, string]

/**
 * @interface name<
 */
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: Syntax error in namepath: name<

/**
 * @module name<
 */
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: Syntax error in namepath: name<

/**
 * @module module:name<
 */
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: Syntax error in namepath: module:name<

/**
 * @interface name
 */
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: @interface should not have a name in "closure" mode.

/**
 * @aCustomTag name
 */
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"name":false}}}}
// Message: @aCustomTag should not have a name.

/**
 * @typedef {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// "jsdoc/valid-types": ["error"|"warn", {"allowEmptyNamepaths":false}]
// Message: Tag @typedef must have a name/namepath in "jsdoc" mode.

/**
 * @private {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: @private should not have a bracketed type in "jsdoc" mode.

/**
 * @aCustomTag {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":false}}}}
// Message: @aCustomTag should not have a bracketed type.

/**
 * @see foo%
 */
function quux() {

}
// Settings: {"jsdoc":{"structuredTags":{"see":{"name":false,"required":["name"]}}}}
// Message: Cannot add "name" to `require` with the tag's `name` set to `false`

/**
 * @see foo%
 */
function quux() {

}
// Settings: {"jsdoc":{"structuredTags":{"see":{"required":["type"],"type":false}}}}
// Message: Cannot add "type" to `require` with the tag's `type` set to `false`

/**
 * @see foo%
 */
function quux() {

}
// Settings: {"jsdoc":{"structuredTags":{"see":{"name":false,"required":["typeOrNameRequired"]}}}}
// Message: Cannot add "typeOrNameRequired" to `require` with the tag's `name` set to `false`

/**
 * @see foo%
 */
function quux() {

}
// Settings: {"jsdoc":{"structuredTags":{"see":{"required":["typeOrNameRequired"],"type":false}}}}
// Message: Cannot add "typeOrNameRequired" to `require` with the tag's `type` set to `false`

/**
 * @template T<~, R
 * @param {function(!T): !R} parser
 * @return {function(!Array<!T>): !Array<!R>}
 */
parseArray = function(parser) {
    return function(array) {
        return array.map(parser);
    };
};
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Syntax error in namepath: T<~

/**
 * @template T, R<~
 * @param {function(!T): !R} parser
 * @return {function(!Array<!T>): !Array<!R>}
 */
parseArray = function(parser) {
    return function(array) {
        return array.map(parser);
    };
};
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Syntax error in namepath: R<~

/**
 * @template    T, R<~
 * @param {function(!T): !R} parser
 * @return {function(!Array<!T>): !Array<!R>}
 */
parseArray = function(parser) {
    return function(array) {
        return array.map(parser);
    };
};
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Syntax error in namepath: R<~

/**
 * @suppress
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Tag @suppress must have a type in "closure" mode.

/**
 * @suppress {visibility} sth
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: @suppress should not have a name in "closure" mode.

/**
 * @suppress {visibility|blah}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Syntax error in suppress type: blah

/**
 * @param {Object[]} employees
 * @param {string} employees[.name - The name of an employee.
 */
function quux () {}
// Message: Invalid name: unpaired brackets

/**
 * @param {Object[]} employees
 * @param {string} [] - The name of an employee.
 */
function quux () {}
// Message: Invalid name: empty name

/**
 * @param {Object[]} employees
 * @param {string} [] - The name of an employee.
 */
function quux () {}
// Message: Invalid name: empty name

/**
 * @param {string} [name=] - The name of an employee.
 */
function quux () {}
// Message: Invalid name: empty default value

/**
 * @param {string} [name==] - The name of an employee.
 */
function quux () {}
// Message: Invalid name: invalid default value syntax

/**
 * @type {{message: string?}}
 */
function quux (items) {
}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Syntax error in type: JsdocTypeNullable

/**
 * @type {[message: string?]}
 */
function quux (items) {
}
// Settings: {"jsdoc":{"mode":"typescript"}}
// Message: Syntax error in type: JsdocTypeNullable

/**
 * An inline {@link} tag without content.
 */
// Message: Inline tag "link" missing content

/**
 * An inline {@tutorial} tag without content.
 */
// Message: Inline tag "tutorial" missing content

/**
 * @param {SomeType} aName An inline {@link} tag without content.
 */
// Message: Inline tag "link" missing content
````



<a name="user-content-valid-types-passing-examples"></a>
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
// "jsdoc/valid-types": ["error"|"warn", {"allowEmptyNamepaths":true}]

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
// Settings: {"jsdoc":{"structuredTags":{"see":{"name":"namepath-referencing","required":["name"]}}}}

/**
 *
 * @fires module:namespace.SomeClass#event:ext_anevent
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
 * @aCustomTag
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
 * @extends Foo<String>
 */
 class Bar {};

/**
 * @extends {Foo<String>}
 */
 class Bar {};
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @typedef {number | string} UserDefinedType
 */

/**
 * @typedef {number | string}
 */
let UserDefinedGCCType;
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @modifies {foo | bar}
 */
function quux (foo, bar, baz) {}

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

/**
 * Foo function.
 *
 * @interface foo
 */
function foo(bar) {}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * Foo function.
 *
 * @param {[number, string]} bar - The bar array.
 */
function foo(bar) {}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * Foo function.
 *
 * @param {[number, string]} bar - The bar array.
 */
function foo(bar) {}

/**
 * Foo function.
 *
 * @param {[number, string]} bar - The bar array.
 */
function foo(bar) {}
// Settings: {"jsdoc":{"mode":"permissive"}}

/**
 * @typedef {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}
// "jsdoc/valid-types": ["error"|"warn", {"allowEmptyNamepaths":false}]

/**
 * @private {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @param
 */
function quux() {

}
// "jsdoc/valid-types": ["error"|"warn", {"allowEmptyNamepaths":false}]

/**
 * @see
 */
function quux() {

}
// Settings: {"jsdoc":{"structuredTags":{"see":{"name":"namepath-referencing"}}}}

/**
 * @template T, R
 * @param {function(!T): !R} parser
 * @return {function(!Array<!T>): !Array<!R>}
 */
parseArray = function(parser) {
    return function(array) {
        return array.map(parser);
    };
};
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @template T, R<~
 * @param {function(!T): !R} parser
 * @return {function(!Array<!T>): !Array<!R>}
 */
parseArray = function(parser) {
    return function(array) {
        return array.map(parser);
    };
};
// Settings: {"jsdoc":{"mode":"jsdoc"}}

/**
 * @template {string} K - K must be a string or string literal
 * @template {{ serious: string }} Seriousalizable - must have a serious property
 * @param {K} key
 * @param {Seriousalizable} object
 */
function seriousalize(key, object) {
  // ????
}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @module foo/bar
 */

/**
 * @module module:foo/bar
 */

/**
 * @template invalid namepath,T Description
 */
function f() {}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * Description of complicated type.
 *
 * @template T Description of the T type parameter.
 * @template U - Like other tags, this can have an optional hyphen before the description.
 * @template V,W More parameters
 * @template W,X - Also with a hyphen
 */
type ComplicatedType<T, U, V, W, X> = never

/** Multi-line typedef for an options object type.
 *
 * @typedef {{
 *   prop: number
 * }} MyOptions
 */

/**
 * @extends {SomeType}
 */
class quux {}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @suppress {visibility|underscore}
 */
function quux() {
}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @param {string} id
 * @param {Object} options
 * @param {boolean} options.isSet
 * @param {string} options.module
 */
function quux ( id, options ) {
}


/**
 * Assign the project to a list of employees.
 * @param {Object[]} employees - The employees who are responsible for the project.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].department - The employee's department.
 */
function assign(employees) {
  // ...
}
// "jsdoc/valid-types": ["error"|"warn", {"allowEmptyNamepaths":true}]

/**
 * @param {typeof obj["level1"]["level2"]} foo
 * @param {Parameters<testFunc>[0]} ghi
 * @param {{[key: string]: string}} hjk
 */
function quux() {

}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @returns {Promise<{publicKey, privateKey}>} - The public and private key
 */

/**
 * Some other {@inline} tag.
 */

/**
 * @param {SomeType} aName An inline {@link text} tag with content.
 */

/**
 * An inline {@link text} tag with content.
 */
````

