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

N/A

<a name="user-content-mark-used-fixer-options"></a>
<a name="mark-used-fixer-options"></a>
#### Options

None.

<a name="user-content-mark-used-failing-examples"></a>
<a name="mark-used-failing-examples"></a>
## Failing examples

Not applicable, since this only marks identifiers and types as used and never actually fails.

<a name="user-content-mark-used-passing-examples"></a>
<a name="mark-used-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
const foo = "bar";
/** Uses {@link foo} for something */
````

