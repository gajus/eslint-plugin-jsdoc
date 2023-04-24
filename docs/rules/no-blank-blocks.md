<a name="user-content-no-blank-blocks"></a>
<a name="no-blank-blocks"></a>
### <code>no-blank-blocks</code>

Reports and optionally removes blocks with whitespace only.

<a name="user-content-no-blank-blocks-options"></a>
<a name="no-blank-blocks-options"></a>
#### Options

<a name="user-content-no-blank-blocks-options-enablefixer"></a>
<a name="no-blank-blocks-options-enablefixer"></a>
##### <code>enableFixer</code>

Whether or not to auto-remove the blank block. Defaults to `false`.

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|false|
|Settings||
|Options|`enableFixer`|

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

