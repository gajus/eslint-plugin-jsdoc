<a name="user-content-used-types"></a>
<a name="used-types"></a>
# <code>used-types</code>

* [Fixer](#user-content-used-types-fixer)
* [Failing examples](#user-content-used-types-failing-examples)
* [Passing examples](#user-content-used-types-passing-examples)


Marks all types referenced in `{@link}` tags as used.

<a name="user-content-used-types-fixer"></a>
<a name="used-types-fixer"></a>
## Fixer

Not applicable.

<a name="user-content-used-types-fixer-options"></a>
<a name="used-types-fixer-options"></a>
#### Options

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|false|
|Settings||
|Options||

<a name="user-content-used-types-failing-examples"></a>
<a name="used-types-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js

````



<a name="user-content-used-types-passing-examples"></a>
<a name="used-types-passing-examples"></a>
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
````

