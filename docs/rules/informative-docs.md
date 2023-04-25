<a name="user-content-informative-docs"></a>
<a name="informative-docs"></a>
# <code>informative-docs</code>

* [Options](#user-content-informative-docs-options)
    * [`aliases`](#user-content-informative-docs-options-aliases)
    * [`uselessWords`](#user-content-informative-docs-options-uselesswords)
* [Context and settings](#user-content-informative-docs-context-and-settings)
* [Failing examples](#user-content-informative-docs-failing-examples)
* [Passing examples](#user-content-informative-docs-passing-examples)


Reports on JSDoc texts that serve only to restart their attached name.

Devs sometimes write JSDoc descriptions that add no additional information just to fill out the doc:

```js
/** The user id. */
let userId;
```

Those "uninformative" docs comments take up space without being helpful.
This rule requires all docs comments contain at least one word not already in the code.

<a name="user-content-informative-docs-options"></a>
<a name="informative-docs-options"></a>
## Options

<a name="user-content-informative-docs-options-aliases"></a>
<a name="informative-docs-options-aliases"></a>
### <code>aliases</code>

The `aliases` option allows indicating words as synonyms (aliases) of each other.

For example, with `{ aliases: { emoji: ["smiley", "winkey"] } }`, the following comment would be considered uninformative:

```js
/** A smiley/winkey. */
let emoji;
```

The default `aliases` option is:

```json
{
  "a": ["an", "our"]
}
```

<a name="user-content-informative-docs-options-uselesswords"></a>
<a name="informative-docs-options-uselesswords"></a>
### <code>uselessWords</code>

Words that are ignored when searching for one that adds meaning.

For example, with `{ uselessWords: ["our"] }`, the following comment would be considered uninformative:

```js
/** Our text. */
let text;
```

The default `uselessWords` option is:

```json
["a", "an", "i", "in", "of", "s", "the"]
```

<a name="user-content-informative-docs-context-and-settings"></a>
<a name="informative-docs-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|any|
|Recommended|false|
|Settings||
|Options|`aliases`, `uselessWords`|

<a name="user-content-informative-docs-failing-examples"></a>
<a name="informative-docs-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/** the  */
let myValue = 3;
// Message: This description only repeats the name it describes.

/** The user id. */
let userId: string;
// Message: This description only repeats the name it describes.

/** the my value */
let myValue = 3;
// Message: This description only repeats the name it describes.

/** value **/
let myValue,
  count = 3;
// Message: This description only repeats the name it describes.

let myValue,
  /** count **/
  count = 3;
// Message: This description only repeats the name it describes.

/**
 * the foo.
 */
function foo() {}
// Message: This description only repeats the name it describes.

/**
 * the value foo.
 */
const value = function foo() {}
// Message: This description only repeats the name it describes.

const value = {
  /**
   * the  prop.
   */
  prop: true,
}
// Message: This description only repeats the name it describes.

/**
 * name
 */
class Name {}
// Message: This description only repeats the name it describes.

/**
 * abc def
 */
const abc = class Def {}
// Message: This description only repeats the name it describes.

class Abc {
  /** the abc def! */
  def;
}
// Message: This description only repeats the name it describes.

const _ = class Abc {
  /** the abc def! */
  def;
}
// Message: This description only repeats the name it describes.

class Abc {
  /** the abc def! */
  def() {};
}
// Message: This description only repeats the name it describes.

class Abc {
  /** def */
  accessor def;
}
// Message: This description only repeats the name it describes.

class Abc {
  /** def */
  def() {}
}
// Message: This description only repeats the name it describes.

class Abc {
  /** def */
  abstract accessor def;
}
// Message: This description only repeats the name it describes.

class Abc {
  /** def */
  abstract def();
}
// Message: This description only repeats the name it describes.

class Abc {
  /** def */
  abstract def;
}
// Message: This description only repeats the name it describes.

/** abc */
namespace Abc {}
// Message: This description only repeats the name it describes.

class Abc {
  /** def */
  def();
  def() {}
}
// Message: This description only repeats the name it describes.

/** abc */
declare function abc();
// Message: This description only repeats the name it describes.

/** abc */
enum Abc {}
// Message: This description only repeats the name it describes.

enum Abc {
  /** def */
  def,
}
// Message: This description only repeats the name it describes.

/** def */
interface Def {}
// Message: This description only repeats the name it describes.

/** def */
type Def = {};
// Message: This description only repeats the name it describes.

/**
 * count
 *
 * @description the value
 */
let value = 3;
// Message: This tag description only repeats the name it describes.

/** @param {number} param - the param */
function takesOne(param) {}
// Message: This tag description only repeats the name it describes.

/** @other param - takes one */
function takesOne(param) {}
// Message: This tag description only repeats the name it describes.

/**
 * takes one
 * @other param - takes one
 */
function takesOne(param) {}
// Message: This description only repeats the name it describes.

/**
 * - takes one
 * @other param - takes one
 */
function takesOne(param) {}
// Message: This description only repeats the name it describes.
````



<a name="user-content-informative-docs-passing-examples"></a>
<a name="informative-docs-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**   */
let myValue = 3;

/** count */
let myValue = 3;

/** Informative info user id. */
let userId: string;

let myValue,
  /** count value **/
  count = 3;

/**
 * Does X Y Z work.
 */
function foo() {}

const value = {
  /**
   * the truthiness of the prop.
   */
  prop: true,
}

const value = {
  /**
   * the truthiness of the prop.
   */
  ['prop']: true,
}

/**
 * abc def ghi
 */
const abc = function def() {}

/**
 * name extra
 */
class Name {}

/**
 * abc name extra
 */
const abc = class Name {}

class Abc {
  /** ghi */
  def;
}

class Abc {
  /** ghi */
  accessor def;
}

class Abc {
  /** ghi */
  def() {}
}

class Abc {
  /** ghi */
  abstract accessor def;
}

class Abc {
  /** ghi */
  abstract def();
}

class Abc {
  /** ghi */
  abstract def;
}

/** abc */
namespace Def {}

class Abc {
  /** ghi */
  def();
  def() {}
}

/** abc */
declare function def();

/** abc */
enum Def {}

enum Abc {
  /** def */
  ghi,
}

/** abc */
interface Def {}

/** abc */
type Def = {};

/** abc */
type Def = {};

/**
 * count
 *
 * @description increment value
 */
let value = 3;

/**
 * count
 *
 * @unknownTag - increment value
 */
let value = 3;

/**
 * @other param - takes one two
 */
function takesOne(param) {}

/**
 * takes abc param
 */
function takesOne(param) {}

/**
 * @class 
 *
 * @param {number} value - Some useful text
 */      
function MyAmazingThing(value) {}
````

