<a name="user-content-require-next-description"></a>
<a name="require-next-description"></a>
# <code>require-next-description</code>

Requires a description for (non-standard) `@next` tags.

|||
|---|---|
|Context|everywhere|
|Tags|`next`|
|Recommended|false|
|Settings||
|Options||

<a name="user-content-require-next-description-failing-examples"></a>
<a name="require-next-description-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @next {SomeType}
 */
// Message: @next should have a description
````



<a name="user-content-require-next-description-passing-examples"></a>
<a name="require-next-description-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @next {SomeType} Has a description
 */
````

