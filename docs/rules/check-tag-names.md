<a name="user-content-check-tag-names"></a>
<a name="check-tag-names"></a>
# <code>check-tag-names</code>

* [Fixer](#user-content-check-tag-names-fixer)
* [Options](#user-content-check-tag-names-options)
    * [`definedTags`](#user-content-check-tag-names-options-definedtags)
    * [`enableFixer`](#user-content-check-tag-names-options-enablefixer)
    * [`jsxTags`](#user-content-check-tag-names-options-jsxtags)
    * [`typed`](#user-content-check-tag-names-options-typed)
* [Context and settings](#user-content-check-tag-names-context-and-settings)
* [Failing examples](#user-content-check-tag-names-failing-examples)
* [Passing examples](#user-content-check-tag-names-passing-examples)


Reports invalid block tag names.

Valid [JSDoc 3 Block Tags](https://jsdoc.app/#block-tags) are:

```
abstract
access
alias
async
augments
author
borrows
callback
class
classdesc
constant
constructs
copyright
default
deprecated
description
enum
event
example
exports
external
file
fires
function
generator
global
hideconstructor
ignore
implements
inheritdoc
inner
instance
interface
kind
lends
license
listens
member
memberof
memberof!
mixes
mixin
module
name
namespace
override
package
param
private
property
protected
public
readonly
requires
returns
see
since
static
summary
this
throws
todo
tutorial
type
typedef
variation
version
yields
```

`modifies` is also supported (see [source](https://github.com/jsdoc/jsdoc/blob/master/packages/jsdoc/lib/jsdoc/tag/dictionary/definitions.js#L594))
but is undocumented.

The following synonyms are also recognized if you set them in
`tagNamePreference` as a key (or replacement):

```
arg
argument
const
constructor
defaultvalue
desc
emits
exception
extends
fileoverview
func
host
method
overview
prop
return
var
virtual
yield
```

If you wish to allow in certain cases both a primary tag name and its
alias(es), you can set a normally non-preferred tag name to itself to indicate
that you want to allow both the default tag (in this case `@returns`) and a
non-default (in this case `return`):

```js
"tagNamePreference": {
    "return": "return",
}
```

Because the tags indicated as replacements in
`settings.jsdoc.tagNamePreference` will automatically be considered as valid,
the above works.

Likewise are the tag keys of `settings.jsdoc.structuredTags` automatically
considered as valid (as their defining an expected structure for tags implies
the tags may be used).

For [TypeScript](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html#supported-jsdoc)
(or Closure), when `settings.jsdoc.mode` is set to `typescript` or `closure`,
one may also use the following:

```
template
```

And for [Closure](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler),
when `settings.jsdoc.mode` is set to `closure`, one may use the following (in
addition to the jsdoc and TypeScript tags–though replacing `returns` with
`return`):

```
define (synonym of `const` per jsdoc source)
dict
export
externs
final
implicitCast (casing distinct from that recognized by jsdoc internally)
inheritDoc (casing distinct from that recognized by jsdoc internally)
noalias
nocollapse
nocompile
noinline
nosideeffects
polymer
polymerBehavior
preserve
record (synonym of `interface` per jsdoc source)
struct
suppress
unrestricted
```

...and these undocumented tags which are only in [source](https://github.com/google/closure-compiler/blob/master/src/com/google/javascript/jscomp/parsing/Annotation.java):

```
closurePrimitive
customElement
expose
hidden
idGenerator
meaning
mixinClass
mixinFunction
ngInject
owner
typeSummary
wizaction
```

If you instead wish to reject a normally valid tag, e.g., `@todo`, one may set the
tag to `false`:

```json
{
    "rules": {},
    "settings": {
        "jsdoc": {
            "tagNamePreference": {
                "todo": false
            }
        }
    }
}
```

<a name="user-content-check-tag-names-fixer"></a>
<a name="check-tag-names-fixer"></a>
## Fixer

(Todo)

<a name="user-content-check-tag-names-options"></a>
<a name="check-tag-names-options"></a>
## Options

<a name="user-content-check-tag-names-options-definedtags"></a>
<a name="check-tag-names-options-definedtags"></a>
### <code>definedTags</code>

Use an array of `definedTags` strings to configure additional, allowed tags.
The format is as follows:

```json
{
  "definedTags": ["note", "record"]
}
```

<a name="user-content-check-tag-names-options-enablefixer"></a>
<a name="check-tag-names-options-enablefixer"></a>
### <code>enableFixer</code>

Set to `false` to disable auto-removal of types that are redundant with the [`typed` option](#user-content-typed).

<a name="user-content-check-tag-names-options-jsxtags"></a>
<a name="check-tag-names-options-jsxtags"></a>
### <code>jsxTags</code>

If this is set to `true`, all of the following tags used to control JSX output are allowed:

```
jsx
jsxFrag
jsxImportSource
jsxRuntime
```

For more information, see the [babel documentation](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx).

<a name="user-content-check-tag-names-options-typed"></a>
<a name="check-tag-names-options-typed"></a>
### <code>typed</code>

If this is set to `true`, additionally checks for tag names that are redundant when using a type checker such as TypeScript.

These tags are always unnecessary when using TypeScript or similar:

```
augments
callback
class
enum
implements
private
property
protected
public
readonly
this
type
typedef
```

These tags are unnecessary except when inside a TypeScript `declare` context:

```
abstract
access
class
constant
constructs
default
enum
export
exports
function
global
inherits
instance
interface
member
memberof
memberOf
method
mixes
mixin
module
name
namespace
override
property
requires
static
this
```

<a name="user-content-check-tag-names-context-and-settings"></a>
<a name="check-tag-names-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|true|
|Options|`definedTags`, `enableFixer`, `jsxTags`, `typed`|
|Settings|`tagNamePreference`, `mode`|

<a name="user-content-check-tag-names-failing-examples"></a>
<a name="check-tag-names-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/** @type {string} */let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@type' is redundant when using a type system.

/** @type {string} */let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"enableFixer":false,"typed":true}]
// Message: '@type' is redundant when using a type system.

/** @type {string} */ let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@type' is redundant when using a type system.

/** @type {string} */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@type' is redundant when using a type system.

/** @type {string} */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@type' is redundant when using a type system.

/** @type {string} - extra info */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@type' is redundant when using a type system.

/**
 * Existing comment.
 *  @type {string}
 */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@type' is redundant when using a type system.

/** @abstract */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@abstract' is redundant outside of ambient (`declare`/`.d.ts`) contexts when using a type system.

/** @abstract */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"enableFixer":false,"typed":true}]
// Message: '@abstract' is redundant outside of ambient (`declare`/`.d.ts`) contexts when using a type system.

const a = {
  /** @abstract */
  b: true,
};
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@abstract' is redundant outside of ambient (`declare`/`.d.ts`) contexts when using a type system.

/** @template */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@template' without a name is redundant when using a type system.

/**
 * Prior description.
 *
 * @template
 */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@template' without a name is redundant when using a type system.

/** @typoo {string} */
let a;
// Message: Invalid JSDoc tag name "typoo".

/** @typoo {string} */
let a;
// Settings: {"jsdoc":{"structuredTags":{"parameter":{"name":"namepath-referencing","required":["type","name"],"type":true}}}}
// Message: Invalid JSDoc tag name "typoo".

/**
 * @Param
 */
function quux () {

}
// Message: Invalid JSDoc tag name "Param".

/**
 * @foo
 */
function quux () {

}
// Message: Invalid JSDoc tag name "foo".

/**
 * @arg foo
 */
function quux (foo) {

}
// Message: Invalid JSDoc tag (preference). Replace "arg" JSDoc tag with "param".

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}
// Message: Invalid JSDoc tag (preference). Replace "param" JSDoc tag with "arg".

/**
 * @constructor foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"tag constructor":"cons"}}}
// Message: Invalid JSDoc tag (preference). Replace "constructor" JSDoc tag with "cons".

/**
 * @arg foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"arg":"somethingDifferent"}}}
// Message: Invalid JSDoc tag (preference). Replace "arg" JSDoc tag with "somethingDifferent".

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"parameter"}}}
// Message: Invalid JSDoc tag (preference). Replace "param" JSDoc tag with "parameter".

/**
 * @bar foo
 */
function quux (foo) {

}
// Message: Invalid JSDoc tag name "bar".

/**
 * @baz @bar foo
 */
function quux (foo) {

}
// "jsdoc/check-tag-names": ["error"|"warn", {"definedTags":["bar"]}]
// Message: Invalid JSDoc tag name "baz".

/**
 * @bar
 * @baz
 */
function quux (foo) {

}
// "jsdoc/check-tag-names": ["error"|"warn", {"definedTags":["bar"]}]
// Message: Invalid JSDoc tag name "baz".

/**
 * @todo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"todo":false}}}
// Message: Blacklisted tag found (`@todo`)

/**
 * @todo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"todo":{"message":"Please resolve to-dos or add to the tracker"}}}}
// Message: Please resolve to-dos or add to the tracker

/**
 * @todo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"todo":{"message":"Please use x-todo instead of todo","replacement":"x-todo"}}}}
// Message: Please use x-todo instead of todo

/**
 * @todo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"todo":{"message":"Please use x-todo instead of todo","replacement":"x-todo"}}}}
// Message: Please use x-todo instead of todo

/**
 * @todo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"todo":55}}}
// Message: Invalid `settings.jsdoc.tagNamePreference`. Values must be falsy, a string, or an object.

/**
 * @property {object} a
 * @prop {boolean} b
 */
function quux () {

}
// Message: Invalid JSDoc tag (preference). Replace "prop" JSDoc tag with "property".

/**
 * @abc foo
 * @abcd bar
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"abc":"abcd"}}}
// "jsdoc/check-tag-names": ["error"|"warn", {"definedTags":["abcd"]}]
// Message: Invalid JSDoc tag (preference). Replace "abc" JSDoc tag with "abcd".

/**
 * @abc
 * @abcd
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"abc":"abcd"}}}
// Message: Invalid JSDoc tag (preference). Replace "abc" JSDoc tag with "abcd".

/**
 * @returns
 */
function quux (foo) {}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Invalid JSDoc tag (preference). Replace "returns" JSDoc tag with "return".

/** 
 * @modifies
 * @abstract
 * @access
 * @alias
 * @async
 * @augments
 * @author
 * @borrows
 * @callback
 * @class
 * @classdesc
 * @constant
 * @constructs
 * @copyright
 * @default
 * @deprecated
 * @description
 * @enum
 * @event
 * @example
 * @exports
 * @external
 * @file
 * @fires
 * @function
 * @generator
 * @global
 * @hideconstructor
 * @ignore
 * @implements
 * @inheritdoc
 * @inheritDoc
 * @inner
 * @instance
 * @interface
 * @kind
 * @lends
 * @license
 * @listens
 * @member
 * @memberof
 * @memberof!
 * @mixes
 * @mixin
 * @module
 * @name
 * @namespace
 * @override
 * @package
 * @param
 * @private
 * @property
 * @protected
 * @public
 * @readonly
 * @requires
 * @returns
 * @see
 * @since
 * @static
 * @summary
 * @this
 * @throws
 * @todo
 * @tutorial
 * @type
 * @typedef
 * @variation
 * @version
 * @yields
 */
function quux (foo) {}
// Settings: {"jsdoc":{"mode":"badMode"}}
// Message: Unrecognized value `badMode` for `settings.jsdoc.mode`.

/** 
 * @modifies
 * @abstract
 * @access
 * @alias
 * @async
 * @augments
 * @author
 * @borrows
 * @callback
 * @class
 * @classdesc
 * @constant
 * @constructs
 * @copyright
 * @default
 * @deprecated
 * @description
 * @enum
 * @event
 * @example
 * @exports
 * @external
 * @file
 * @fires
 * @function
 * @generator
 * @global
 * @hideconstructor
 * @ignore
 * @implements
 * @inheritdoc
 * @inheritDoc
 * @inner
 * @instance
 * @interface
 * @kind
 * @lends
 * @license
 * @listens
 * @member
 * @memberof
 * @memberof!
 * @mixes
 * @mixin
 * @module
 * @name
 * @namespace
 * @override
 * @package
 * @param
 * @private
 * @property
 * @protected
 * @public
 * @readonly
 * @requires
 * @returns
 * @see
 * @since
 * @static
 * @summary
 * @this
 * @throws
 * @todo
 * @tutorial
 * @type
 * @typedef
 * @variation
 * @version
 * @yields
 * @internal
 * @overload
 * @satisfies
 * @template
 */
function quux (foo) {}
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: Invalid JSDoc tag name "internal".

/** 
 * @externs
 */
function quux (foo) {}
// Message: Invalid JSDoc tag name "externs".

/** @jsx h */
/** @jsxFrag Fragment */
/** @jsxImportSource preact */
/** @jsxRuntime automatic */
// Message: Invalid JSDoc tag name "jsx".

/**
 * @constructor
 */
function Test() {
  this.works = false;
}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":"return"}}}
// Message: Invalid JSDoc tag (preference). Replace "constructor" JSDoc tag with "class".

/** @typedef {Object} MyObject
 * @property {string} id - my id
 */
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@typedef' is redundant when using a type system.

/**
 * @property {string} id - my id
 */
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@property' is redundant when using a type system.

/** @typedef {Object} MyObject */
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@typedef' is redundant when using a type system.

/** @typedef {Object} MyObject
 */
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@typedef' is redundant when using a type system.

/**
 * @todo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"todo":{"message":"Please don't use todo"}}}}
// Message: Please don't use todo
````



<a name="user-content-check-tag-names-passing-examples"></a>
<a name="check-tag-names-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/** @default 0 */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/** @default 0 */
declare let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/** @abstract */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/** @abstract */
declare let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/** @abstract */
{ declare let a; }
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

function test() {
  /** @abstract */
  declare let a;
}
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/** @template name */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/** @param param - takes information */
function takesOne(param) {}
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/**
 * @param foo
 */
function quux (foo) {

}

/**
 * @memberof! foo
 */
function quux (foo) {

}

/**
 * @arg foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}

/**
 * @parameter foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"structuredTags":{"parameter":{"name":"namepath-referencing","required":["type","name"],"type":true}}}}

/**
 * @bar foo
 */
function quux (foo) {

}
// "jsdoc/check-tag-names": ["error"|"warn", {"definedTags":["bar"]}]

/**
 * @baz @bar foo
 */
function quux (foo) {

}
// "jsdoc/check-tag-names": ["error"|"warn", {"definedTags":["baz","bar"]}]

/**
 * @baz @bar foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"baz","returns":{"message":"Prefer `bar`","replacement":"bar"},"todo":false}}}

/**
 * @returns
 */
function quux (foo) {}

/**
 * @return
 */
function quux (foo) {}
// Settings: {"jsdoc":{"mode":"closure"}}

/** 
 * @modifies
 * @abstract
 * @access
 * @alias
 * @async
 * @augments
 * @author
 * @borrows
 * @callback
 * @class
 * @classdesc
 * @constant
 * @constructs
 * @copyright
 * @default
 * @deprecated
 * @description
 * @enum
 * @event
 * @example
 * @exports
 * @external
 * @file
 * @fires
 * @function
 * @generator
 * @global
 * @hideconstructor
 * @ignore
 * @implements
 * @inheritdoc
 * @inheritDoc
 * @inner
 * @instance
 * @interface
 * @kind
 * @lends
 * @license
 * @listens
 * @member
 * @memberof
 * @memberof!
 * @mixes
 * @mixin
 * @module
 * @name
 * @namespace
 * @override
 * @package
 * @param
 * @private
 * @property
 * @protected
 * @public
 * @readonly
 * @requires
 * @returns
 * @see
 * @since
 * @static
 * @summary
 * @this
 * @throws
 * @todo
 * @tutorial
 * @type
 * @typedef
 * @variation
 * @version
 * @yields
 */
function quux (foo) {}

/** 
 * @modifies
 * @abstract
 * @access
 * @alias
 * @async
 * @augments
 * @author
 * @borrows
 * @callback
 * @class
 * @classdesc
 * @constant
 * @constructs
 * @copyright
 * @default
 * @deprecated
 * @description
 * @enum
 * @event
 * @example
 * @exports
 * @external
 * @file
 * @fires
 * @function
 * @generator
 * @global
 * @hideconstructor
 * @ignore
 * @implements
 * @inheritdoc
 * @inheritDoc
 * @inner
 * @instance
 * @interface
 * @kind
 * @lends
 * @license
 * @listens
 * @member
 * @memberof
 * @memberof!
 * @mixes
 * @mixin
 * @module
 * @name
 * @namespace
 * @override
 * @package
 * @param
 * @private
 * @property
 * @protected
 * @public
 * @readonly
 * @requires
 * @returns
 * @see
 * @since
 * @static
 * @summary
 * @this
 * @throws
 * @todo
 * @tutorial
 * @type
 * @typedef
 * @variation
 * @version
 * @yields
 * @internal
 * @overload
 * @satisfies
 * @template
 */
function quux (foo) {}
// Settings: {"jsdoc":{"mode":"typescript"}}

/** 
 * @externs
 */
function quux (foo) {}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 *
 */
function quux (foo) {

}

/**
 * @todo
 */
function quux () {

}

/**
 * @extends Foo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"augments":{"message":"@extends is to be used over @augments.","replacement":"extends"}}}}

/**
 * (Set tag name preference to itself to get aliases to
 *   work along with main tag name.)
 * @augments Bar
 * @extends Foo
 */
function quux () {
}
// Settings: {"jsdoc":{"tagNamePreference":{"extends":"extends"}}}

/**
 * Registers the `target` class as a transient dependency; each time the dependency is resolved a new instance will be created.
 *
 * @param target - The class / constructor function to register as transient.
 *
 * @example ```ts
@transient()
class Foo { }
```
 * @param Time for a new tag
 */
export function transient<T>(target?: T): T {
  // ...
}

/** @jsx h */
/** @jsxFrag Fragment */
/** @jsxImportSource preact */
/** @jsxRuntime automatic */
// "jsdoc/check-tag-names": ["error"|"warn", {"jsxTags":true}]

/**
 * @internal
 */
// Settings: {"jsdoc":{"mode":"typescript"}}

interface WebTwain {
  /**
   * Converts the images specified by the indices to base64 synchronously.
   * @function WebTwain#ConvertToBase64
   * @returns {Base64Result}

  ConvertToBase64(): Base64Result;
  */

  /**
   * Converts the images specified by the indices to base64 asynchronously.
   * @function WebTwain#ConvertToBase64
   * @returns {boolean}
   */
  ConvertToBase64(): boolean;
}

/**
 * @overload
 * @satisfies
 */
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @module
 * A comment related to the module
 */
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
````

