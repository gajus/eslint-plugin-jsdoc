<a name="user-content-check-types"></a>
<a name="check-types"></a>
# <code>check-types</code>

* [Options](#user-content-check-types-options)
* [Why not capital case everything?](#user-content-check-types-why-not-capital-case-everything)
* [Comparisons](#user-content-check-types-comparisons)
* [Fixer](#user-content-check-types-fixer)
* [Context and settings](#user-content-check-types-context-and-settings)
* [Failing examples](#user-content-check-types-failing-examples)
* [Passing examples](#user-content-check-types-passing-examples)


Reports invalid types.

By default, ensures that the casing of native types is the same as in this
list:

```
undefined
null
boolean
number
bigint
string
symbol
object (For TypeScript's sake, however, using `Object` when specifying child types on it like `Object<string, number>`)
Array
Function
Date
RegExp
```

<a name="user-content-check-types-options"></a>
<a name="check-types-options"></a>
## Options

`check-types` allows one option:

- An option object:
  - with the key `noDefaults` to insist that only the supplied option type
    map is to be used, and that the default preferences (such as "string"
    over "String") will not be enforced. The option's default is `false`.
  - with the key `exemptTagContexts` which will avoid reporting when a
    bad type is found on a specified tag. Set to an array of objects with
    a key `tag` set to the tag to exempt, and a `types` key which can
    either be `true` to indicate that any types on that tag will be allowed,
    or to an array of strings which will only allow specific bad types.
    If an array of strings is given, these must match the type exactly,
    e.g., if you only allow `"object"`, it will not allow
    `"object<string, string>"`. Note that this is different from the
    behavior of `settings.jsdoc.preferredTypes`. This option is useful
    for normally restricting generic types like `object` with
    `preferredTypes`, but allowing `typedef` to indicate that its base
    type is `object`.
  - with the key `unifyParentAndChildTypeChecks` which will treat
    `settings.jsdoc.preferredTypes` keys such as `SomeType` as matching
    not only child types such as an unadorned `SomeType` but also
    `SomeType<aChildType>` and `SomeType.<aChildType>` (and if the type is
    instead `Array` (or `[]`), it will match `aChildType[]`). If this
    option is `false` or
    unset, the former format will only apply to types which are not parent
    types/unions whereas the latter formats will only apply for parent
    types/unions. The special types `[]`, `.<>` (or `.`), and `<>`
    act only as parent types (and will not match a bare child type such as
    `Array` even when unified, though, as mentioned, `Array` will match
    say `string[]` or `Array.<string>` when unified). The special type
    `*` is only a child type. Note that there is no detection of parent
    and child type together, e.g., you cannot specify preferences for
    `string[]` specifically as distinct from say `number[]`, but you can
    target both with `[]` or the child types `number` or `string`.

If a value is present both as a key and as a value, neither the key nor the
value will be reported. Thus one can use this fact to allow both `object`
and `Object`, for example. Note that in "typescript" mode, this is the default
behavior.

See also the documentation on `settings.jsdoc.preferredTypes` which impacts
the behavior of `check-types`.

Note that if there is an error [parsing](https://github.com/jsdoc-type-pratt-parser/jsdoc-type-pratt-parser)
types for a tag, the function will silently ignore that tag, leaving it to
the `valid-types` rule to report parsing errors.

<a name="user-content-check-types-why-not-capital-case-everything"></a>
<a name="check-types-why-not-capital-case-everything"></a>
## Why not capital case everything?

Why are `boolean`, `number` and `string` exempt from starting with a capital
letter? Let's take `string` as an example. In Javascript, everything is an
object. The `String` object has prototypes for string functions such as
`.toUpperCase()`.

Fortunately we don't have to write `new String()` everywhere in our code.
Javascript will automatically wrap string primitives into string Objects when
we're applying a string function to a string primitive. This way the memory
footprint is a tiny little bit smaller, and the
[GC](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)) has
less work to do.

So in a sense, there are two types of strings in Javascript:
1. `{string}` literals, also called primitives
2. `{String}` Objects.

We use the primitives because it's easier to write and uses less memory.
`{String}` and `{string}` are technically both valid, but they are not the same.

```js
new String('lard') // String {0: "l", 1: "a", 2: "r", 3: "d", length: 4}
'lard' // "lard"
new String('lard') === 'lard' // false
```

To make things more confusing, there are also object literals (like `{}`) and
`Object` objects. But object literals are still static `Object`s and `Object`
objects are instantiated objects. So an object primitive is still an `Object`
object.

However, `Object.create(null)` objects are not `instanceof Object`, however, so
in the case of such a plain object we lower-case to indicate possible support
for these objects. Also, nowadays, TypeScript also [discourages](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#:~:text=%E2%9D%8C%20Don't%20ever%20use,used%20appropriately%20in%20JavaScript%20code.)
use of `Object`
as a lone type. However, one additional complexity is that TypeScript allows and
actually [currently requires](https://github.com/microsoft/TypeScript/issues/20555)
`Object` (with the initial upper-case) if used in the syntax
`Object.<keyType, valueType>` or `Object<keyType, valueType`, perhaps to
adhere to that which [JSDoc documents](https://jsdoc.app/tags-type.html).

So, for optimal compatibility with TypeScript (especially since TypeScript
tools can be used on plain JavaScript with JSDoc), we are now requiring this
TypeScript approach by default in non-"typescript" mode (if you set
`object` type `preferredTypes` in TypeScript mode, the defaults will
not apply).

However, for "typescript" mode, a still better choice exists—using index signatures such as `{[key: string]: string}` or using a more precise
shorthand object syntax (e.g., `{a: string, b: number}`). This is superior
for TypeScript because the likes of `Object<string, number>` is not useable
in native TypeScript syntax, even if it is allowed within JSDoc.

Basically, for primitives, we want to define the type as a primitive, because
that's what we use in 99.9% of cases. For everything else, we use the type
rather than the primitive. Otherwise it would all just be `{object}` (with the
additional exception of the special case of `Object.<>` just mentioned).

In short: It's not about consistency, rather about the 99.9% use case. (And
some functions might not even support the objects if they are checking for
identity.)

<a name="user-content-check-types-comparisons"></a>
<a name="check-types-comparisons"></a>
## Comparisons

type name | `typeof` | check-types | testcase
--|--|--|--
**Array** | object | **Array** | `([]) instanceof Array` -> `true`
**Function** | function | **Function** | `(function f () {}) instanceof Function` -> `true`
**Date** | object | **Date** | `(new Date()) instanceof Date` -> `true`
**RegExp** | object | **RegExp** | `(new RegExp(/.+/)) instanceof RegExp` -> `true`
Object | **object** | **object** | `({}) instanceof Object` -> `true` but `Object.create(null) instanceof Object` -> `false`
Boolean | **boolean** | **boolean** | `(true) instanceof Boolean` -> **`false`**
Number | **number** | **number** | `(41) instanceof Number` -> **`false`**
String | **string** | **string** | `("test") instanceof String` -> **`false`**

If you define your own tags and don't wish their bracketed portions checked
for types, you can use `settings.jsdoc.structuredTags` with a tag `type` of
`false`. If you set their `type` to an array, only those values will be
permitted.

<a name="user-content-check-types-fixer"></a>
<a name="check-types-fixer"></a>
## Fixer

(Todo)

<a name="user-content-check-types-context-and-settings"></a>
<a name="check-types-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`augments`, `class`, `constant`, `enum`, `implements`, `member`, `module`, `namespace`, `param`, `property`, `returns`, `throws`, `type`, `typedef`, `yields`|
|Aliases|`constructor`, `const`, `extends`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|`package`, `private`, `protected`, `public`, `static`|
|Recommended|true|
|Options|`exemptTagContexts`, `noDefaults`, `unifyParentAndChildTypeChecks`|
|Settings|`preferredTypes`, `mode`, `structuredTags`|

<a name="user-content-check-types-failing-examples"></a>
<a name="check-types-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @param {abc} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"abc":100}}}
// Message: Invalid `settings.jsdoc.preferredTypes`. Values must be falsy, a string, or an object.

/**
 * @param {Number} foo
 */
function quux (foo) {

}
// Message: Invalid JSDoc @param "foo" type "Number"; prefer: "number".

/**
 * @arg {Number} foo
 */
function quux (foo) {

}
// Message: Invalid JSDoc @arg "foo" type "Number"; prefer: "number".

/**
 * @returns {Number} foo
 * @throws {Number} foo
 */
function quux () {

}
// Message: Invalid JSDoc @returns type "Number"; prefer: "number".

/**
 * @param {(Number | string | Boolean)=} foo
 */
function quux (foo, bar, baz) {

}
// Message: Invalid JSDoc @param "foo" type "Number"; prefer: "number".

/**
 * @param {Array.<Number | String>} foo
 */
function quux (foo, bar, baz) {

}
// Message: Invalid JSDoc @param "foo" type "Number"; prefer: "number".

/**
 * @param {(Number | String)[]} foo
 */
function quux (foo, bar, baz) {

}
// Message: Invalid JSDoc @param "foo" type "Number"; prefer: "number".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":"Abc","string":"Str"}}}
// Message: Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":{"replacement":"Abc"},"string":"Str"}}}
// Message: Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":{"message":"Messed up JSDoc @{{tagName}}{{tagValue}} type \"abc\"; prefer: \"Abc\".","replacement":"Abc"},"string":"Str"}}}
// Message: Messed up JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {abc} foo
 * @param {cde} bar
 * @param {object} baz
 */
function qux(foo, bar, baz) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":{"message":"Messed up JSDoc @{{tagName}}{{tagValue}} type \"abc\"; prefer: \"Abc\".","replacement":"Abc"},"cde":{"message":"More messed up JSDoc @{{tagName}}{{tagValue}} type \"cde\"; prefer: \"Cde\".","replacement":"Cde"},"object":"Object"}}}
// Message: Messed up JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":{"message":"Messed up JSDoc @{{tagName}}{{tagValue}} type \"abc\".","replacement":false},"string":"Str"}}}
// Message: Messed up JSDoc @param "foo" type "abc".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":{"message":"Messed up JSDoc @{{tagName}}{{tagValue}} type \"abc\"."},"string":"Str"}}}
// Message: Messed up JSDoc @param "foo" type "abc".

/**
 * @param {abc} foo
 * @param {Number} bar
 */
function qux(foo, bar) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":"Abc","string":"Str"}}}
// "jsdoc/check-types": ["error"|"warn", {"noDefaults":true}]
// Message: Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {abc} foo
 * @param {Number} bar
 */
function qux(foo, bar) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":"Abc","string":"Str"}}}
// Message: Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":false,"string":"Str"}}}
// Message: Invalid JSDoc @param "foo" type "abc".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":false}}}
// Message: Invalid JSDoc @param "foo" type "abc".

/**
 * @param {*} baz
 */
function qux(baz) {
}
// Settings: {"jsdoc":{"preferredTypes":{"*":false,"abc":"Abc","string":"Str"}}}
// Message: Invalid JSDoc @param "baz" type "*".

/**
 * @param {*} baz
 */
function qux(baz) {
}
// Settings: {"jsdoc":{"preferredTypes":{"*":"aaa","abc":"Abc","string":"Str"}}}
// Message: Invalid JSDoc @param "baz" type "*"; prefer: "aaa".

/**
 * @param {abc} foo
 * @param {Number} bar
 */
function qux(foo, bar) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":"Abc","string":"Str"}}}
// Message: Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {Array} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"GenericArray"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".

/**
 * @param {Array} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"GenericArray","Array.<>":"GenericArray"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".

/**
 * @param {Array.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.<>":"GenericArray"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".

/**
 * @param {Array<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array<>":"GenericArray"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".

/**
 * @param {string[]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"SpecialTypeArray"}}}
// Message: Invalid JSDoc @param "foo" type "[]"; prefer: "SpecialTypeArray".

/**
 * @param {string[]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"SpecialTypeArray"}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "[]"; prefer: "SpecialTypeArray".

/**
 * @param {string[]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"SpecialTypeArray"}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "SpecialTypeArray".

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject","object.<>":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject","object<>":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object.<>":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object<>":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object.<string, number>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object.<>":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object<string, number>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object<>":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":false}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "object".

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":false}}}
// Message: Invalid JSDoc @param "foo" type "object".

/**
 * @param {object.<string, number>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object<string, number>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 *
 * @param {string[][]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"Array."}}}
// Message: Invalid JSDoc @param "foo" type "[]"; prefer: "Array.".

/**
 *
 * @param {string[][]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"Array.<>"}}}
// Message: Invalid JSDoc @param "foo" type "[]"; prefer: "Array.<>".

/**
 *
 * @param {string[][]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"Array<>"}}}
// Message: Invalid JSDoc @param "foo" type "[]"; prefer: "Array<>".

/**
 *
 * @param {object.<string, object.<string, string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object.":"Object"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "Object".

/**
 *
 * @param {object.<string, object.<string, string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object.":"Object<>"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "Object<>".

/**
 *
 * @param {object<string, object<string, string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object<>":"Object."}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "Object.".

/**
 *
 * @param {Array.<Array.<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.":"[]"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "[]".

/**
 *
 * @param {Array.<Array.<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.":"Array<>"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "Array<>".

/**
 *
 * @param {Array.<Array.<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.":"<>"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "<>".

/**
 *
 * @param {Array.<MyArray.<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.":"<>"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "<>".

/**
 *
 * @param {Array.<MyArray.<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"MyArray.":"<>"}}}
// Message: Invalid JSDoc @param "foo" type "MyArray"; prefer: "<>".

/**
 *
 * @param {Array<Array<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"<>":"Array."}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "Array.".

/**
 *
 * @param {Array<Array<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"Array."}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "Array.".

/**
 *
 * @param {Array<Array<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"<>":"[]"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "[]".

/** @typedef {String} foo */
// Message: Invalid JSDoc @typedef "foo" type "String"; prefer: "string".

/**
 * @this {array}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Invalid JSDoc @this type "array"; prefer: "Array".

/**
 * @export {array}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Invalid JSDoc @export type "array"; prefer: "Array".

/**
 * @typedef {object} foo
 * @property {object} bar
 */
// Settings: {"jsdoc":{"preferredTypes":{"object":"Object"}}}
// "jsdoc/check-types": ["error"|"warn", {"exemptTagContexts":[{"tag":"typedef","types":true}]}]
// Message: Invalid JSDoc @property "bar" type "object"; prefer: "Object".

/** @typedef {object} foo */
// Settings: {"jsdoc":{"preferredTypes":{"object":"Object"}}}
// "jsdoc/check-types": ["error"|"warn", {"exemptTagContexts":[{"tag":"typedef","types":["array"]}]}]
// Message: Invalid JSDoc @typedef "foo" type "object"; prefer: "Object".

/**
 * @typedef {object} foo
 * @property {object} bar
 */
// Settings: {"jsdoc":{"preferredTypes":{"object":"Object"}}}
// "jsdoc/check-types": ["error"|"warn", {"exemptTagContexts":[{"tag":"typedef","types":["object"]}]}]
// Message: Invalid JSDoc @property "bar" type "object"; prefer: "Object".

/** @typedef {object<string, string>} foo */
// Settings: {"jsdoc":{"preferredTypes":{"object<>":"Object<>"}}}
// "jsdoc/check-types": ["error"|"warn", {"exemptTagContexts":[{"tag":"typedef","types":["object"]}]}]
// Message: Invalid JSDoc @typedef "foo" type "object"; prefer: "Object<>".

/**
 * @param {Array<number | undefined>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.<>":"[]","Array<>":"[]"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "[]".

/**
 * @typedef {object} foo
 */
function a () {}

/**
 * @typedef {Object<string>} foo
 */
function b () {}
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"object":"Object"}}}
// Message: Invalid JSDoc @typedef "foo" type "object"; prefer: "Object".

/**
 * @aCustomTag {Number} foo
 */
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":true}}}}
// Message: Invalid JSDoc @aCustomTag "foo" type "Number"; prefer: "number".

/**
 * @aCustomTag {Number} foo
 */
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":["otherType","anotherType"]}}}}
// Message: Invalid JSDoc @aCustomTag "foo" type "Number"; prefer: ["otherType","anotherType"].

/**
 * @param {Object[]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"Object":"object"}}}
// Message: Invalid JSDoc @param "foo" type "Object"; prefer: "object".

/**
 * @param {object.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"object.<>":"Object"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "Object".

/**
 * @param {object.<string, number>} foo
 */
function quux (foo) {
}
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"Object":"object","object.<>":"Object<>","Object.<>":"Object<>","object<>":"Object<>"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "Object<>".

/**
 * @param {Object.<string, number>} foo
 */
function quux (foo) {
}
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"Object":"object","object.<>":"Object<>","Object.<>":"Object<>","object<>":"Object<>"}}}
// Message: Invalid JSDoc @param "foo" type "Object"; prefer: "Object<>".

/**
 * @param {object<string, number>} foo
 */
function quux (foo) {
}
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"Object":"object","object.<>":"Object<>","Object.<>":"Object<>","object<>":"Object<>"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "Object<>".

/**
 * @param {object.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"Object":"object","object.<>":"Object<>","Object.<>":"Object<>","object<>":"Object<>"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "Object<>".

/**
 * @param {object.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"mode":"typescript"}}
// Message: Use object shorthand or index signatures instead of `object`, e.g., `{[key: string]: string}`

/**
 *
 * @param {Object} param
 * @return {Object | String}
 */
function abc(param) {
  if (param.a)
    return {};
  return 'abc';
}
// Message: Invalid JSDoc @param "param" type "Object"; prefer: "object".

/**
 * @param {object} root
 * @param {number} root.a
 * @param {object} b
 */
function a () {}
// Settings: {"jsdoc":{"preferredTypes":{"object":{"skipRootChecking":true}}}}
// Message: Invalid JSDoc @param "b" type "object".
````



<a name="user-content-check-types-passing-examples"></a>
<a name="check-types-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @param {number} foo
 * @param {Bar} bar
 * @param {*} baz
 */
function quux (foo, bar, baz) {

}

/**
 * @arg {number} foo
 * @arg {Bar} bar
 * @arg {*} baz
 */
function quux (foo, bar, baz) {

}

/**
 * @param {(number | string | boolean)=} foo
 */
function quux (foo, bar, baz) {

}

/**
 * @param {typeof bar} foo
 */
function qux(foo) {
}

/**
 * @param {import('./foo').bar.baz} foo
 */
function qux(foo) {
}

/**
 * @param {(x: number, y: string) => string} foo
 */
function qux(foo) {
}

/**
 * @param {() => string} foo
 */
function qux(foo) {
}

/**
 * @returns {Number} foo
 * @throws {Number} foo
 */
function quux () {

}
// "jsdoc/check-types": ["error"|"warn", {"noDefaults":true}]

/**
 * @param {Object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"Object"}}}

/**
 * @param {Array} foo
 */
function quux (foo) {

}

/**
 * @param {Array.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"GenericArray"}}}

/**
 * @param {Array<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"GenericArray"}}}

/**
 * @param {string[]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"SpecialTypeArray","Array.<>":"SpecialTypeArray","Array<>":"SpecialTypeArray"}}}

/**
 * @param {string[]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.<>":"SpecialTypeArray","Array<>":"SpecialTypeArray"}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]

/**
 * @param {Array} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"SpecialTypeArray"}}}

/**
 * @param {Array} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"SpecialTypeArray"}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]

/**
 * @param {Array} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.<>":"GenericArray"}}}

/**
 * @param {Array} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array<>":"GenericArray"}}}

/**
 * @param {object} foo
 */
function quux (foo) {

}

/**
 * @param {object.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}

/**
 * @param {object<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}

/**
 * @param {object.<string, number>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}

/**
 * @param {object<string, number>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object.<>":"GenericObject"}}}

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object<>":"GenericObject"}}}

/**
 * @param {Number<} Ignore the error as not a validating rule
 */
function quux (foo) {

}

/** @param {function(...)} callback The function to invoke. */
var subscribe = function(callback) {};

/**
 * @this {Array}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @export {Array}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}

/** @type {new() => EntityBase} */

/** @typedef {object} foo */
// Settings: {"jsdoc":{"preferredTypes":{"object":"Object"}}}
// "jsdoc/check-types": ["error"|"warn", {"exemptTagContexts":[{"tag":"typedef","types":true}]}]

/** @typedef {object<string, string>} foo */
// Settings: {"jsdoc":{"preferredTypes":{"object":"Object"}}}

/** @typedef {object<string, string>} foo */
// Settings: {"jsdoc":{"preferredTypes":{"object<>":"Object<>"}}}
// "jsdoc/check-types": ["error"|"warn", {"exemptTagContexts":[{"tag":"typedef","types":["object<string, string>"]}]}]

/**
 * @typedef {object} foo
 */

 /**
  * @typedef {Object} foo
  */
// Settings: {"jsdoc":{"preferredTypes":{"object":"Object","Object":"object"}}}

/**
 * @typedef {object} foo
 */
function a () {}

/**
 * @typedef {Object} foo
 */
function b () {}
// Settings: {"jsdoc":{"preferredTypes":{"object":"Object","Object":"object"}}}

/**
 * @typedef {object} foo
 */
function a () {}

/**
 * @typedef {{[key: string]: number}} foo
 */
function b () {}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @aCustomTag {Number} foo
 */
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":false}}}}

/**
 * @aCustomTag {otherType} foo
 */
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":["otherType","anotherType"]}}}}

/**
 * @aCustomTag {anotherType|otherType} foo
 */
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":["otherType","anotherType"]}}}}

/**
 * Bad types handled by `valid-types` instead.
 * @param {str(} foo
 */
function quux (foo) {

}

/**
 * @param {{[key: string]: number}} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @typedef {object} foo
 */
function a () {}
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"Object":"object","object.<>":"Object<>","object<>":"Object<>"}}}

/**
 * @typedef {Object<string, number>} foo
 */
function a () {}
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"Object":"object","object.<>":"Object<>","object<>":"Object<>"}}}

/**
 * Does something.
 *
 * @param {Object<string,string>} spec - Foo.
 */
function foo(spec) {
    return spec;
}

foo()
// Settings: {"jsdoc":{"mode":"jsdoc"}}

/**
 * @param {object} root
 * @param {number} root.a
 */
function a () {}
// Settings: {"jsdoc":{"preferredTypes":{"object":{"message":"Won't see this message","skipRootChecking":true}}}}

/**
 * @returns {string | undefined} a string or undefined
 */
function quux () {}
// Settings: {"jsdoc":{"preferredTypes":{"[]":{"message":"Do not use *[], use Array<*> instead","replacement":"Array"}}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
````

