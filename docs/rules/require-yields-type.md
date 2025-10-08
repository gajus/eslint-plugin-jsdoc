<a name="user-content-require-yields-type"></a>
<a name="require-yields-type"></a>
# <code>require-yields-type</code>

Requires a type on the `@yields` tag.

|||
|---|---|
|Context|everywhere|
|Tags|`yields`|
|Recommended|true|
|Settings||
|Options||

<a name="user-content-require-yields-type-failing-examples"></a>
<a name="require-yields-type-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @yields
 */
// Message: @yields should have a type

/**
 * @yield
 */
// Message: @yields should have a type
````



<a name="user-content-require-yields-type-passing-examples"></a>
<a name="require-yields-type-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @yields {SomeType}
 */
````

