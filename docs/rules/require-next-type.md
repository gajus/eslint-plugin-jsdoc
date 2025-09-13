<a name="user-content-require-next-type"></a>
<a name="require-next-type"></a>
# <code>require-next-type</code>

Requires a type on the (non-standard) `@next` tag.
See the `jsdoc/require-yields` rule for details on this tag.

|||
|---|---|
|Context|everywhere|
|Tags|`next`|
|Recommended|true|
|Settings||
|Options||

<a name="user-content-require-next-type-failing-examples"></a>
<a name="require-next-type-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @next
 */
// Message: @next should have a type
````



<a name="user-content-require-next-type-passing-examples"></a>
<a name="require-next-type-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @next {SomeType}
 */
````

