<a name="user-content-require-throws-description"></a>
<a name="require-throws-description"></a>
# <code>require-throws-description</code>

Requires a description for `@throws` tags.

|||
|---|---|
|Context|everywhere|
|Tags|`throws`|
|Recommended|false|
|Settings||
|Options||

<a name="user-content-require-throws-description-failing-examples"></a>
<a name="require-throws-description-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @throws {SomeType}
 */
// Message: @throws should have a description
````



<a name="user-content-require-throws-description-passing-examples"></a>
<a name="require-throws-description-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @throws {SomeType} Has a description
 */
````

