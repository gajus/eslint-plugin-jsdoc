<a name="user-content-lines-before-block"></a>
<a name="lines-before-block"></a>
# <code>lines-before-block</code>

This rule enforces minimum number of newlines before JSDoc comment blocks
(except at the beginning of a file).

<a name="user-content-lines-before-block-options"></a>
<a name="lines-before-block-options"></a>
## Options

<a name="user-content-lines-before-block-options-lines"></a>
<a name="lines-before-block-options-lines"></a>
### <code>lines</code>

The minimum number of lines to require. Defaults to 1.

<a name="user-content-lines-before-block-options-ignoresameline"></a>
<a name="lines-before-block-options-ignoresameline"></a>
### <code>ignoreSameLine</code>

This option excludes cases where the JSDoc block occurs on the same line as a
preceding code or comment. Defaults to `true`.

<a name="user-content-lines-before-block-options-excludedtags"></a>
<a name="lines-before-block-options-excludedtags"></a>
### <code>excludedTags</code>

An array of tags whose presence in the JSDoc block will prevent the
application of the rule. Defaults to `['type']` (i.e., if `@type` is present,
lines before the block will not be added).

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|true|
|Settings||
|Options|`excludedTags`, `ignoreSameLine`, `lines`|

<a name="user-content-lines-before-block-failing-examples"></a>
<a name="lines-before-block-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
someCode;
/**
 *
 */
// Message: Required 1 line(s) before JSDoc block

someCode; /**
 *
 */
// "jsdoc/lines-before-block": ["error"|"warn", {"ignoreSameLine":false}]
// Message: Required 1 line(s) before JSDoc block

someCode; /** */
// "jsdoc/lines-before-block": ["error"|"warn", {"ignoreSameLine":false}]
// Message: Required 1 line(s) before JSDoc block

someCode;
/**
 *
 */
// "jsdoc/lines-before-block": ["error"|"warn", {"lines":2}]
// Message: Required 2 line(s) before JSDoc block

// Some comment
/**
 *
 */
// Message: Required 1 line(s) before JSDoc block

/* Some comment */
/**
 *
 */
// Message: Required 1 line(s) before JSDoc block

/**
 * Some comment
 */
/**
 *
 */
// Message: Required 1 line(s) before JSDoc block
````



<a name="user-content-lines-before-block-passing-examples"></a>
<a name="lines-before-block-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
*
*/

someCode;

/**
 *
 */

someCode;


/**
 *
 */
// "jsdoc/lines-before-block": ["error"|"warn", {"lines":2}]

// Some comment

/**
 *
 */

/* Some comment */

/**
 *
 */

/**
 * Some comment
 */

/**
 *
 */

someCode; /** */

const a = {
  someProp: /** @type {SomeCast} */ (someVal)
};

const a = /** @lends SomeClass */ {
  someProp: (someVal)
};
// "jsdoc/lines-before-block": ["error"|"warn", {"excludedTags":["lends"],"ignoreSameLine":false}]
````

