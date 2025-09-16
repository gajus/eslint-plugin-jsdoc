<a name="user-content-reject-function-type"></a>
<a name="reject-function-type"></a>
# <code>reject-function-type</code>

Reports use of `Function` type within JSDoc tag types.

|||
|---|---|
|Context|everywhere|
|Tags|`augments`, `class`, `constant`, `enum`, `implements`, `member`, `module`, `namespace`, `param`, `property`, `returns`, `throws`, `type`, `typedef`, `yields`|
|Aliases|`constructor`, `const`, `extends`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|`package`, `private`, `protected`, `public`, `static`|
|Recommended|true|
|Settings|`mode`|
|Options||

<a name="user-content-reject-function-type-failing-examples"></a>
<a name="reject-function-type-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param {Function} abc
 */
function quux () {}
// Message: Prefer a more specific type to `Function`

/**
 * @param {string|Array<Function>} abc
 */
function quux () {}
// Message: Prefer a more specific type to `Function`
````



<a name="user-content-reject-function-type-passing-examples"></a>
<a name="reject-function-type-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {SomeType} abc
 */
function quux () {}
````

