<a name="user-content-escape-inline-tags"></a>
<a name="escape-inline-tags"></a>
# <code>escape-inline-tags</code>

Reports use of JSDoc tags in non-tag positions (in the default "typescript" mode).

Note that while the JSDoc standard refers to inline tags as those being surrounded
by curly brackets, such as those in the form `{@link https://example.com}`, for the
purposes of this rule, we are referring to inline tags as a simple reference to
tags such as `@param` outside of the normal location of a tag and which may need to
be wrapped in `{}` to be proper inline JSDoc or need to be escaped with `\` or
wrapped with ` to be normal text. E.g.

```js
/** Supports shorthands such as `@yearly` to simplify setup. */
```

<a name="user-content-escape-inline-tags-options"></a>
<a name="escape-inline-tags-options"></a>
## Options

A single options object has the following properties.

<a name="user-content-escape-inline-tags-options-allowedinlinetags"></a>
<a name="escape-inline-tags-options-allowedinlinetags"></a>
### <code>allowedInlineTags</code>

A listing of tags you wish to allow unescaped. Defaults to an empty array.

<a name="user-content-escape-inline-tags-options-enablefixer"></a>
<a name="escape-inline-tags-options-enablefixer"></a>
### <code>enableFixer</code>

Whether to enable the fixer. Defaults to `false`.

<a name="user-content-escape-inline-tags-options-fixtype"></a>
<a name="escape-inline-tags-options-fixtype"></a>
### <code>fixType</code>

How to escape the inline tag.

May be "backticks" to enclose tags in backticks (treating as code segments), or
"backslash" to escape tags with a backslash, i.e., `\@`

Defaults to "backslash".


|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|true (unless `mode` is changed away from "typescript")|
|Settings|`mode`|
|Options|`allowedInlineTags`, `enableFixer`, `fixType`|

<a name="user-content-escape-inline-tags-failing-examples"></a>
<a name="escape-inline-tags-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 *
 * Whether to include a @yearly, @monthly etc text labels in the generated expression.
 */
// "jsdoc/escape-inline-tags": ["error"|"warn", {"enableFixer":true}]
// Message: Unexpected inline JSDoc tag. Did you mean to use {@yearly}, \@yearly, or `@yearly`?

/**
 * Some text
 * Whether to include a @yearly, @monthly etc text labels in the generated expression.
 */
// "jsdoc/escape-inline-tags": ["error"|"warn", {"enableFixer":true}]
// Message: Unexpected inline JSDoc tag. Did you mean to use {@yearly}, \@yearly, or `@yearly`?

/**
 * Whether to include a @yearly, @yearly etc text labels in the generated expression.
 */
// "jsdoc/escape-inline-tags": ["error"|"warn", {"enableFixer":true}]
// Message: Unexpected inline JSDoc tag. Did you mean to use {@yearly}, \@yearly, or `@yearly`?

/**
 * Whether to include a @yearly,
 * or @yearly etc text labels in the generated expression.
 */
// "jsdoc/escape-inline-tags": ["error"|"warn", {"enableFixer":true}]
// Message: Unexpected inline JSDoc tag. Did you mean to use {@yearly}, \@yearly, or `@yearly`?

/**
 * Whether to include a @yearly, @monthly etc text labels in the generated expression.
 */
// "jsdoc/escape-inline-tags": ["error"|"warn", {"allowedInlineTags":["monthly"],"enableFixer":true,"fixType":"backticks"}]
// Message: Unexpected inline JSDoc tag. Did you mean to use {@yearly}, \@yearly, or `@yearly`?

/**
 * Some description @sth
 */
// "jsdoc/escape-inline-tags": ["error"|"warn", {"enableFixer":true}]
// Message: Unexpected inline JSDoc tag. Did you mean to use {@sth}, \@sth, or `@sth`?

/**
 * Some description @sth
 */
// "jsdoc/escape-inline-tags": ["error"|"warn", {"enableFixer":false}]
// Message: Unexpected inline JSDoc tag. Did you mean to use {@sth}, \@sth, or `@sth`?

/**
 * @param includeNonStandard Whether to include a @yearly, @monthly etc text labels in the generated expression.
 */
// "jsdoc/escape-inline-tags": ["error"|"warn", {"enableFixer":true}]
// Message: Unexpected inline JSDoc tag. Did you mean to use {@yearly}, \@yearly, or `@yearly`?

/**
 * @param includeNonStandard Whether to include a @yearly, @monthly etc text labels in the generated expression.
 */
// "jsdoc/escape-inline-tags": ["error"|"warn", {"allowedInlineTags":["monthly"],"enableFixer":true,"fixType":"backticks"}]
// Message: Unexpected inline JSDoc tag. Did you mean to use {@yearly}, \@yearly, or `@yearly`?

/**
 * @param aName @sth
 */
// "jsdoc/escape-inline-tags": ["error"|"warn", {"enableFixer":true}]
// Message: Unexpected inline JSDoc tag. Did you mean to use {@sth}, \@sth, or `@sth`?

/**
 * @param aName @sth
 *   and @another
 * @param anotherName @yetAnother
 */
// "jsdoc/escape-inline-tags": ["error"|"warn", {"enableFixer":true}]
// Message: Unexpected inline JSDoc tag. Did you mean to use {@sth}, \@sth, or `@sth`?

/**
 * @param aName @sth
 */
// "jsdoc/escape-inline-tags": ["error"|"warn", {"enableFixer":false}]
// Message: Unexpected inline JSDoc tag. Did you mean to use {@sth}, \@sth, or `@sth`?
````



<a name="user-content-escape-inline-tags-passing-examples"></a>
<a name="escape-inline-tags-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * A description with an escaped \@tag.
 */

/**
 * A description with a markdown `@tag`.
 */

/**
 * A description with a non@tag.
 */

/**
 * @param {SomeType} aName A description with an escaped \@tag.
 */

/**
 * @param {SomeType} aName A description with a markdown `@tag`.
 */

/**
 * @param {SomeType} aName A description with a non@tag.
 */

/**
 * {@link https://example.com}
 */

/**
 * A description with a {@link https://example.com}
 */

/**
 * @someTag {@link https://example.com}
 */

/**
 * @param {SomeType} aName {@link https://example.com}
 */

/**
 * @param {SomeType} aName A description with a {@link https://example.com}.
 */

/**
 * @example
 * Here are some unescaped tags: @yearly, @monthly
 */

/**
 * Whether to include a @yearly, @monthly etc text labels in the generated expression.
 */
// Settings: {"jsdoc":{"mode":"jsdoc"}}
````

