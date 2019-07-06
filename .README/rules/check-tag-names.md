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

Note that the tags indicated as replacements in `settings.jsdoc.tagNamePreference` will automatically be considered as valid.

#### Options

##### `definedTags`

Use an array of `definedTags` strings to configure additional, allowed JSDoc tags.
The format is as follows:

```json
{
  "definedTags": ["define", "record"]
}
```

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Options|`definedTags`|
|Settings|`tagNamePreference`|

<!-- assertions checkTagNames -->
