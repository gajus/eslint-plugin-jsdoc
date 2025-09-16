<a name="user-content-reject-any-type"></a>
<a name="reject-any-type"></a>
# <code>reject-any-type</code>

Reports use of `any` (or `*`) type within JSDoc tag types.

|||
|---|---|
|Context|everywhere|
|Tags|`augments`, `class`, `constant`, `enum`, `implements`, `member`, `module`, `namespace`, `param`, `property`, `returns`, `throws`, `type`, `typedef`, `yields`|
|Aliases|`constructor`, `const`, `extends`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|`package`, `private`, `protected`, `public`, `static`|
|Recommended|true|
|Settings|`mode`|
|Options||

<a name="user-content-reject-any-type-failing-examples"></a>
<a name="reject-any-type-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param {any} abc
 */
function quux () {}
// Message: Prefer a more specific type to `any`

/**
 * @param {string|Promise<any>} abc
 */
function quux () {}
// Message: Prefer a more specific type to `any`
````



<a name="user-content-reject-any-type-passing-examples"></a>
<a name="reject-any-type-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {SomeType} abc
 */
function quux () {}
````

