# `check-types`

{"gitdown": "contents", "rootId": "check-types"}

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

## Fixer

(Todo)

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`augments`, `class`, `constant`, `enum`, `implements`, `member`, `module`, `namespace`, `param`, `property`, `returns`, `throws`, `type`, `typedef`, `yields`|
|Aliases|`constructor`, `const`, `extends`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|`package`, `private`, `protected`, `public`, `static`|
|Recommended|true|
|Options|`noDefaults`, `exemptTagContexts`, `unifyParentAndChildTypeChecks`|
|Settings|`preferredTypes`, `mode`, `structuredTags`|

## Failing examples

<!-- assertions-failing checkTypes -->

## Passing examples

<!-- assertions-passing checkTypes -->
