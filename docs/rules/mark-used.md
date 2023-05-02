<a name="user-content-mark-used"></a>
<a name="mark-used"></a>
# <code>mark-used</code>

* [Fixer](#user-content-mark-used-fixer)
* [Failing examples](#user-content-mark-used-failing-examples)
* [Passing examples](#user-content-mark-used-passing-examples)


Marks all types referenced in `{@link}` tags as used.

<a name="user-content-mark-used-fixer"></a>
<a name="mark-used-fixer"></a>
## Fixer

Not applicable.

<a name="user-content-mark-used-fixer-options"></a>
<a name="mark-used-fixer-options"></a>
#### Options

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|false|
|Settings||
|Options||

<a name="user-content-mark-used-failing-examples"></a>
<a name="mark-used-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js

````



<a name="user-content-mark-used-passing-examples"></a>
<a name="mark-used-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
class Foo {}
/** @param {Foo} */
function foo() {}
foo();

class Foo {}
/** @returns {Foo} */
function foo() {}
foo();

class Foo {}
class Bar {}
class Baz {}
class Qux {}
/** @type {(!Foo|?Bar|...Baz|Qux[]|foo=)} */
let foo = null;
````

