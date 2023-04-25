<a name="user-content-no-blank-blocks"></a>
<a name="no-blank-blocks"></a>
# <code>no-blank-blocks</code>

* [Fixer](#user-content-no-blank-blocks-fixer)
* [Failing examples](#user-content-no-blank-blocks-failing-examples)
* [Passing examples](#user-content-no-blank-blocks-passing-examples)


Reports and optionally removes blocks with whitespace only.

<a name="user-content-no-blank-blocks-fixer"></a>
<a name="no-blank-blocks-fixer"></a>
## Fixer

(TODO)

<a name="user-content-no-blank-blocks-fixer-options"></a>
<a name="no-blank-blocks-fixer-options"></a>
#### Options

<a name="user-content-no-blank-blocks-fixer-options-enablefixer"></a>
<a name="no-blank-blocks-fixer-options-enablefixer"></a>
##### <code>enableFixer</code>

Whether or not to auto-remove the blank block. Defaults to `false`.

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|false|
|Settings||
|Options|`enableFixer`|

<a name="user-content-no-blank-blocks-failing-examples"></a>
<a name="no-blank-blocks-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/** */
// "jsdoc/no-blank-blocks": ["error"|"warn", {"enableFixer":true}]
// Message: No empty blocks

/**
 */
// "jsdoc/no-blank-blocks": ["error"|"warn", {"enableFixer":true}]
// Message: No empty blocks

/**
 *
 */
// "jsdoc/no-blank-blocks": ["error"|"warn", {"enableFixer":true}]
// Message: No empty blocks

/**
 *
 *
 */
// "jsdoc/no-blank-blocks": ["error"|"warn", {"enableFixer":true}]
// Message: No empty blocks

/**
 *
 *
 */
// "jsdoc/no-blank-blocks": ["error"|"warn", {"enableFixer":false}]
// Message: No empty blocks

/**
 *
 *
 */
// Message: No empty blocks
````



<a name="user-content-no-blank-blocks-passing-examples"></a>
<a name="no-blank-blocks-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/** @tag */

/**
 * Text
 */

/**
 * @tag
 */
````

