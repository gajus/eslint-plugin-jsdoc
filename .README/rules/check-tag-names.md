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
modifies (Currently undocumented but in source)
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
(or Closure), one may also use the following:

```
template
```

And for [Closure](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#nosideeffects-modifies-thisarguments),
one may also use:

```
define
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
struct
suppress
template
unrestricted
```

Note that the tags indicated as replacements in `settings.jsdoc.tagNamePreference` will automatically be considered as valid.

#### Options

##### `definedTags`

Use an array of `definedTags` strings to configure additional, allowed JSDoc tags.
The format is as follows:

```json
{
  "definedTags": ["note", "record"]
}
```

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Options|`definedTags`|
|Settings|`tagNamePreference`|

<!-- assertions checkTagNames -->
