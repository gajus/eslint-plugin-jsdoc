<a name="user-content-no-multi-asterisks"></a>
<a name="no-multi-asterisks"></a>
### <code>no-multi-asterisks</code>



Prevents use of multiple asterisks at the beginning of lines.

Note that if you wish to prevent multiple asterisks at the very beginning of
the jsdoc block, you should use `no-bad-blocks` (as that is not proper jsdoc
and that rule is for catching blocks which only seem like jsdoc).

<a name="user-content-fixer"></a>
<a name="fixer"></a>
## Fixer

(TODO)

<a name="user-content-options"></a>
<a name="options"></a>
## Options

<a name="user-content-options-allowwhitespace-defaults-to-false"></a>
<a name="options-allowwhitespace-defaults-to-false"></a>
### <code>allowWhitespace</code> (defaults to <code>false</code>)

Set to `true` if you wish to allow asterisks after a space (as with Markdown):

```js
/**
 * *bold* text
 */
```

<a name="user-content-options-preventatmiddlelines-defaults-to-true"></a>
<a name="options-preventatmiddlelines-defaults-to-true"></a>
### <code>preventAtMiddleLines</code> (defaults to <code>true</code>)

Prevent the likes of this:

```js
/**
 *
 **
 */
```

<a name="user-content-options-preventatend-defaults-to-true"></a>
<a name="options-preventatend-defaults-to-true"></a>
### <code>preventAtEnd</code> (defaults to <code>true</code>)

Prevent the likes of this:

```js
/**
 *
 *
 **/
```

<a name="user-content-context-and-settings"></a>
<a name="context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|(any)|
|Recommended|true|
|Settings||
|Options|`allowWhitespace`, `preventAtEnd`, `preventAtMiddleLines`|

<a name="user-content-failing-examples"></a>
<a name="failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 *
 **
 */
// Message: Should be no multiple asterisks on middle lines.

/**
 *
 **
 */
// "jsdoc/no-multi-asterisks": ["error"|"warn", {"preventAtMiddleLines":true}]
// Message: Should be no multiple asterisks on middle lines.

/**
 *
 **
 */
// "jsdoc/no-multi-asterisks": ["error"|"warn", {"preventAtEnd":false}]
// Message: Should be no multiple asterisks on middle lines.

/**
 * With a description
 * @tag {SomeType} and a tag with details
 **
 */
// Message: Should be no multiple asterisks on middle lines.

/**
 **
 *
 */
// Message: Should be no multiple asterisks on middle lines.

/**
 * Desc.
 *
 **/
// Message: Should be no multiple asterisks on end lines.

/**
 * Desc.
 *
 **/
// "jsdoc/no-multi-asterisks": ["error"|"warn", {"preventAtEnd":true}]
// Message: Should be no multiple asterisks on end lines.

/**
 * Desc.
 *
 abc * **/
// "jsdoc/no-multi-asterisks": ["error"|"warn", {"preventAtEnd":true}]
// Message: Should be no multiple asterisks on end lines.

/**
 * Desc.
 *
 **/
// "jsdoc/no-multi-asterisks": ["error"|"warn", {"preventAtMiddleLines":false}]
// Message: Should be no multiple asterisks on end lines.

/** Desc. **/
// Message: Should be no multiple asterisks on end lines.

/** @someTag name desc. **/
// Message: Should be no multiple asterisks on end lines.

/** abc * */
// Message: Should be no multiple asterisks on end lines.

/**
 * Preserve user's whitespace when fixing (though one may also
 *   use an align rule)
 *
 * */
// "jsdoc/no-multi-asterisks": ["error"|"warn", {"preventAtEnd":true}]
// Message: Should be no multiple asterisks on end lines.

/**
 * The method does 2 things:
 * * Thing 1
 * * Thing 2
 */
// "jsdoc/no-multi-asterisks": ["error"|"warn", {"allowWhitespace":false}]
// Message: Should be no multiple asterisks on middle lines.

/**
 * This muti-line comment contains some
 * *non-standard bold* syntax
 */
// "jsdoc/no-multi-asterisks": ["error"|"warn", {"allowWhitespace":false}]
// Message: Should be no multiple asterisks on middle lines.

/** Desc. **/
// "jsdoc/no-multi-asterisks": ["error"|"warn", {"allowWhitespace":true}]
// Message: Should be no multiple asterisks on end lines.
````



<a name="user-content-passing-examples"></a>
<a name="passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 *
 * Desc. ***
 */

/**
 * Desc. ***
 *
 */

/**
 * Desc.
 *
 * sth */

/**
 **
 *
 */
// "jsdoc/no-multi-asterisks": ["error"|"warn", {"preventAtMiddleLines":false}]

/**
 *
 *
 **/
// "jsdoc/no-multi-asterisks": ["error"|"warn", {"preventAtEnd":false}]

/**
 * With a desc.
 * and ***
 */

/**
 * and ***
 * With a desc.
 */

/**
 * With a desc.
 * With a desc.
 * Desc. */

/**
 * With a description
 * @tag {SomeType} and a tag with details
 *
 */

/** abc */
function foo() {
    //
}

/** foo */
function foo(): void {
    //
}

/** @aTag abc */
function foo() {
    //
}

/**
 * **Bold**
 */

/**
 * Preserve user's bold statement when fixing.
 *
 * **Bold example:** Hi there.
 */

/**
 * The method does 2 things:
 * * Thing 1
 * * Thing 2
 */
// "jsdoc/no-multi-asterisks": ["error"|"warn", {"allowWhitespace":true}]

/**
 * This muti-line comment contains some
 * *non-standard bold* syntax
 */
// "jsdoc/no-multi-asterisks": ["error"|"warn", {"allowWhitespace":true}]

/** abc */
function foo() {
    //
}
// "jsdoc/no-multi-asterisks": ["error"|"warn", {"allowWhitespace":true}]
````

