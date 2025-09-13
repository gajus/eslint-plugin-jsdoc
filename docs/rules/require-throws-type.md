<a name="user-content-require-throws-type"></a>
<a name="require-throws-type"></a>
# <code>require-throws-type</code>

Requires a type on the `@throws` tag.

|||
|---|---|
|Context|everywhere|
|Tags|`throws`|
|Recommended|true|
|Settings||
|Options||

<a name="user-content-require-throws-type-failing-examples"></a>
<a name="require-throws-type-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @throws
 */
// Message: @throws should have a type
````



<a name="user-content-require-throws-type-passing-examples"></a>
<a name="require-throws-type-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @throws {SomeType}
 */
````

