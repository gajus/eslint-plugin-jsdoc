<a name="user-content-require-yields-description"></a>
<a name="require-yields-description"></a>
# <code>require-yields-description</code>

Requires a description for `@yields` tags.

|||
|---|---|
|Context|everywhere|
|Tags|`yields`|
|Recommended|false|
|Settings||
|Options||

<a name="user-content-require-yields-description-failing-examples"></a>
<a name="require-yields-description-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @yields {SomeType}
 */
// Message: @yields should have a description
````



<a name="user-content-require-yields-description-passing-examples"></a>
<a name="require-yields-description-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @yields {SomeType} Has a description
 */
````

