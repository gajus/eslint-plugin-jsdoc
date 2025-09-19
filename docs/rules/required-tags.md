<a name="user-content-required-tags"></a>
<a name="required-tags"></a>
# <code>required-tags</code>

Requires tags be present, optionally for specific contexts.

<a name="user-content-required-tags-options"></a>
<a name="required-tags-options"></a>
## Options

A single options object has the following properties.

<a name="user-content-required-tags-options-tags"></a>
<a name="required-tags-options-tags"></a>
### <code>tags</code>

May be an array of either strings or objects with
a string `tag` property and `context` string property.


|||
|---|---|
|Context|everywhere|
|Tags|(Any)|
|Recommended|false|
|Settings||
|Options|`tags`|

<a name="user-content-required-tags-failing-examples"></a>
<a name="required-tags-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 *
 */
function quux () {}
// "jsdoc/required-tags": ["error"|"warn", {"tags":["see"]}]
// Message: Missing required tag "see"

/**
 *
 */
function quux () {}
// "jsdoc/required-tags": ["error"|"warn", {"tags":[{"context":"FunctionDeclaration","tag":"see"}]}]
// Message: Missing required tag "see"

/**
 * @type {SomeType}
 */
function quux () {}
// "jsdoc/required-tags": ["error"|"warn", {"tags":[{"context":"FunctionDeclaration","tag":"see"}]}]
// Message: Missing required tag "see"

/**
 * @type {SomeType}
 */
function quux () {}
// Message: Rule `required-tags` is missing a `tags` option.
````



<a name="user-content-required-tags-passing-examples"></a>
<a name="required-tags-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @see
 */
function quux () {}
// "jsdoc/required-tags": ["error"|"warn", {"tags":["see"]}]

/**
 *
 */
class Quux {}
// "jsdoc/required-tags": ["error"|"warn", {"tags":[{"context":"FunctionDeclaration","tag":"see"}]}]
````

