<a name="user-content-lines-before-block"></a>
<a name="lines-before-block"></a>
# <code>lines-before-block</code>

This rule enforces minimum number of newlines before JSDoc comment blocks
(except at the beginning of a block or file).

<a name="user-content-lines-before-block-options"></a>
<a name="lines-before-block-options"></a>
## Options

<a name="user-content-lines-before-block-options-checkblockstarts"></a>
<a name="lines-before-block-options-checkblockstarts"></a>
### <code>checkBlockStarts</code>

Whether to additionally check the start of blocks, such as classes or functions.
Defaults to `false`.

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
|Recommended|false|
|Settings||
|Options|`checkBlockStarts`, `excludedTags`, `ignoreSameLine`, `lines`|

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

{
  /**
   * Description.
   */
  let value;
}
// "jsdoc/lines-before-block": ["error"|"warn", {"checkBlockStarts":true}]
// Message: Required 1 line(s) before JSDoc block

class MyClass {
  /**
   * Description.
   */
  method() {}
}
// "jsdoc/lines-before-block": ["error"|"warn", {"checkBlockStarts":true}]
// Message: Required 1 line(s) before JSDoc block

function myFunction() {
  /**
   * Description.
   */
  let value;
}
// "jsdoc/lines-before-block": ["error"|"warn", {"checkBlockStarts":true}]
// Message: Required 1 line(s) before JSDoc block

const values = [
  /**
   * Description.
   */
  value,
];
// "jsdoc/lines-before-block": ["error"|"warn", {"checkBlockStarts":true}]
// Message: Required 1 line(s) before JSDoc block

const values = [
  value1,
  /**
   * Description.
   */
  value2
];
// Message: Required 1 line(s) before JSDoc block

const values = [
  value1,
  value2
]
/**
 * Description.
 */
// Message: Required 1 line(s) before JSDoc block

const value = 123
/**
 * Description.
 */
// Message: Required 1 line(s) before JSDoc block

type UnionDocumentation =
  /** Description. */
  | { someProp: number }
  /** Description. */
  | { otherProp: string }

type IntersectionDocumentation =
  /** Description. */
  { someProp: number } &
  /** Description. */
  { otherProp: string }
// Message: Required 1 line(s) before JSDoc block

type IntersectionDocumentation = {
  someProp: number;
} & /** Description. */ {
  otherProp: string;
};
// "jsdoc/lines-before-block": ["error"|"warn", {"ignoreSameLine":false}]
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

{
  /**
   * Description.
   */
  let value;
}

class MyClass {
  /**
   * Description.
   */
  method() {}
}

function myFunction() {
  /**
   * Description.
   */
  let value;
}

class SomeClass {
  constructor(
    /**
     * Description.
     */
    param
  ) {};

  method(
    /**
     * Description.
     */
    param
  ) {};
}

type FunctionAlias1 =
  /**
   * @param param - Description.
   */
  (param: number) => void;

type FunctionAlias2 = (
  /**
   * @param param - Description.
   */
  param: number
) => void;

type UnionDocumentation =
  /** Description. */
  | { someProp: number }

  /** Description. */
  | { otherProp: string }

type IntersectionDocumentation =
  /** Description. */
  { someProp: number } &

  /** Description. */
  { otherProp: string }

type IntersectionDocumentation = {
  someProp: number;
} & /** Description. */ {
  otherProp: string;
};
````

