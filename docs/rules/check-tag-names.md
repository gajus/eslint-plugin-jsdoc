<a name="check-tag-names"></a>
# <code>check-tag-names</code>

* [`check-tag-names`](#check-tag-names)
    * [Fixer](#check-tag-names-fixer)
    * [Options](#check-tag-names-options)
        * [`definedTags`](#check-tag-names-options-definedtags)
    * [Context and settings](#check-tag-names-context-and-settings)
    * [Failing examples](#check-tag-names-failing-examples)
    * [Passing examples](#check-tag-names-passing-examples)


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

`modifies` is also supported (see [source](https://github.com/jsdoc/jsdoc/blob/master/packages/jsdoc/lib/jsdoc/tag/dictionary/definitions.js#L594)) but is undocumented.

The following synonyms are also recognized:

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

For [TypeScript](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html#supported-jsdoc)
(or Closure), when `settings.jsdoc.mode` is set to `typescript` or `closure`,
one may also use the following:

```
template
```

And for [Closure](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler),
when `settings.jsdoc.mode` is set to `closure`, one may use the following (in
addition to the jsdoc and TypeScript tags):

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

Note that the tags indicated as replacements in `settings.jsdoc.tagNamePreference` will automatically be considered as valid.

<a name="check-tag-names-fixer"></a>
## Fixer

(Todo)

<a name="check-tag-names-options"></a>
## Options

<a name="check-tag-names-options-definedtags"></a>
### <code>definedTags</code>

Use an array of `definedTags` strings to configure additional, allowed tags.
The format is as follows:

```json
{
  "definedTags": ["note", "record"]
}
```

<a name="check-tag-names-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Options|`definedTags`|
|Settings|`tagNamePreference`, `mode`|

<a name="check-tag-names-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/** @typoo {string} */
let a;
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
// Options: [{"definedTags":["bar"]}]
// Message: Invalid JSDoc tag name "baz".

/**
 * @bar
 * @baz
 */
function quux (foo) {

}
// Options: [{"definedTags":["bar"]}]
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
// Options: [{"definedTags":["abcd"]}]
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
 * @template
 */
function quux (foo) {}
// Message: Invalid JSDoc tag name "template".

/** 
 * @externs
 */
function quux (foo) {}
// Message: Invalid JSDoc tag name "externs".
````


<a name="check-tag-names-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
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
 * @bar foo
 */
function quux (foo) {

}
// Options: [{"definedTags":["bar"]}]

/**
 * @baz @bar foo
 */
function quux (foo) {

}
// Options: [{"definedTags":["baz","bar"]}]

/**
 * @baz @bar foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"baz","returns":{"message":"Prefer `bar`","replacement":"bar"},"todo":false}}}

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
````

