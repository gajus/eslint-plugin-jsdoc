<a name="user-content-require-template-description"></a>
<a name="require-template-description"></a>
# <code>require-template-description</code>

<a name="user-content-require-template-description-options"></a>
<a name="require-template-description-options"></a>
## Options



|||
|---|---|
|Context|everywhere|
|Tags|`template`|
|Recommended|false|
|Settings||
|Options||

<a name="user-content-require-template-description-failing-examples"></a>
<a name="require-template-description-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @template {SomeType}
 */
// Message: @template should have a description
````



<a name="user-content-require-template-description-passing-examples"></a>
<a name="require-template-description-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @template {SomeType} Has a description
 */

/**
 * @template Has a description
 */
````

