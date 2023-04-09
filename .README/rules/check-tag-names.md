### `check-tag-names`

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

#### Options

##### `definedTags`

Use an array of `definedTags` strings to configure additional, allowed tags.
The format is as follows:

```json
{
  "definedTags": ["note", "record"]
}
```

##### `enableFixer`

Set to `false` to disable auto-removal of types that are redundant with the [`typed` option](#typed).

#### `jsxTags`

If this is set to `true`, all of the following tags used to control JSX output are allowed:

```
jsx
jsxFrag
jsxImportSource
jsxRuntime
```

For more information, see the [babel documentation](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx).

#### `typed`

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

Additionally, for `@param` and `@return` tags, the rule will flag unnecessary type descriptions (e.g. `@param {string}`).

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|true|
|Options|`definedTags`|
|Settings|`tagNamePreference`, `mode`|

<!-- assertions checkTagNames -->
