<a name="user-content-normalize-see-links"></a>
<a name="normalize-see-links"></a>
# <code>normalize-see-links</code>

Normalizes labeled links in `@see` tags to a canonical `{@link}` form.

<a name="user-content-normalize-see-links-options"></a>
<a name="normalize-see-links-options"></a>
## Options

A single options object has the following properties.

<a name="user-content-normalize-see-links-options-canonicalform"></a>
<a name="normalize-see-links-options-canonicalform"></a>
### <code>canonicalForm</code>

The canonical `{<code>@link</code>}` form: `"pipe"` produces `{<code>@link</code> url|label}`, while `"prefix"` produces `[label]{<code>@link</code> url}`. Defaults to `"pipe"`.

<a name="user-content-normalize-see-links-options-enablefixer"></a>
<a name="normalize-see-links-options-enablefixer"></a>
### <code>enableFixer</code>

Whether to enable the fixer. Defaults to `true`.


|||
|---|---|
|Context|everywhere|
|Tags|`see`|
|Recommended|false|
|Settings||
|Options|`canonicalForm`, `enableFixer`|

<a name="user-content-normalize-see-links-failing-examples"></a>
<a name="normalize-see-links-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @see [Docs](https://api.example.com/v1?ids=1|2|3)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [See {options}](https://example.com/api)
 */
// Message: @see link cannot be safely normalized.

/**
 * @see [a}b](https://example.com)
 */
// Message: @see link cannot be safely normalized.

/**
 * @see [Foo](https://example.com/a|b)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see [ ](https://example.com)
 */
// Message: @see link cannot be safely normalized.

/**
 * @see {@link https://example.com|A]B}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: @see link cannot be safely normalized.

/**
 * @see [ ]{@link https://example.com}
 */
// Message: @see link cannot be safely normalized.

/**
 * @see [Foo](https://example.com/a}b)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see [Foo](https://example.com/a{b)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see [Braces](https://example.com/a{b}c)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [Existing](https://example.com/%7C?x=1&y=2#frag)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [Percent](https://example.com/100%)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [A{B](https://example.com)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [a}b](https://example.com)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see {@link https://example.com|A|B}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see {@link https://example.com|A`B}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see [a\}b](https://example.com)
 */
// Message: @see link cannot be safely normalized.

/**
 * @see [See {{one} and {two}}](https://example.com)
 */
// Message: @see link cannot be safely normalized.

/**
 * @see [A}B|C](https://example.com)
 */
// Message: @see link cannot be safely normalized.

/**
 * @see [Read the guide](https://example.com/read)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [Browse the API]{@link https://example.com/api}
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [A](https://a.com) and [B](https://b.com)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [A](https://a.com)
 * @see [B](https://b.com)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [Unsafe](https://example.com/a|b?x=1&y=2#frag) and [Safe](https://example.com/safe)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [JSDoc Markdown](https://example.com/jsdoc|markdown)
 */
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: Expected @see link to use the pipe form.

/**
 * @see [Package](@scope/pkg)
 */
// Message: @see link cannot be safely normalized.

/**
 * @see [First](https://example.com/first)
 *   and [Second](https://example.com/second)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [Example](https://example.com)
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [Guide]{@link https://example.com/guide}
 */
// Message: Expected @see link to use the pipe form.

/**
 * @see [API](https://example.com/api)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see {@link https://example.com/reference|Reference}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]
// Message: Expected @see link to use the prefix form.

/**
 * @see [No fix](https://example.com/no-fix)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"enableFixer":false}]
// Message: Expected @see link to use the pipe form.

/**
 * @see [Incomplete](https://example.com/incomplete
 */
// Message: @see link cannot be safely normalized.

/**
 * @see [Incomplete]{@link}
 */
// Message: @see link cannot be safely normalized.

/**
 * @see {@link https://example.com|}
 */
// Message: @see link cannot be safely normalized.

/**
 * @see `[Code](https://example.com/code)`
 */
// Message: @see link cannot be safely normalized.

/**
 * @see [Package]{@link @scope/pkg}
 */
// Message: @see link cannot be safely normalized.

/**
 * @see {@link https://example.com Space label}
 */
// Message: @see link cannot be safely normalized.

/**
 * @see [JSDoc]{@link https://example.com/jsdoc}
 */
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: Expected @see link to use the pipe form.

/**
 * @see [TypeScript](https://example.com/type{script})
 */
const value: string = 'value';
// Message: Expected @see link to use the pipe form.

/**
 * @see [Complex](https://example.com/a_(b))
 */
// Message: @see link cannot be safely normalized.
````



<a name="user-content-normalize-see-links-passing-examples"></a>
<a name="normalize-see-links-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @see {@link https://api.example.com/v1?ids=1%7C2%7C3|Docs}
 */

/**
 * @see [Foo]{@link https://example.com/a%7Cb}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]

/**
 * @see [Foo]{@link https://example.com/a%7Db}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]

/**
 * @see [Foo]{@link https://example.com/a%7Bb}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]

/**
 * @see {@link https://example.com/a%7Bb%7Dc|Braces}
 */

/**
 * @see {@link https://example.com/%7C?x=1&y=2#frag|Existing}
 */

/**
 * @see {@link https://example.com/100%25|Percent}
 */

/**
 * @see {@link https://example.com|A{B}
 */

/**
 * @see [a}b]{@link https://example.com}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]

/**
 * @see {@link https://example.com|A|B}
 */

/**
 * @see [A|B]{@link https://example.com}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]

/**
 * @see [A`B]{@link https://example.com}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]

/**
 * @see {@link https://example.com/a%7Cb?x=1&y=2#frag|Unsafe} and {@link https://example.com/safe|Safe}
 */

/**
 * @see {@link https://example.com/read|Read the guide}
 */

/**
 * @see {@link https://example.com/api|Browse the API}
 */

/**
 * @see {@link https://a.com|A} and {@link https://b.com|B}
 */

/**
 * @see {@link https://a.com|A}
 * @see {@link https://b.com|B}
 */

/**
 * @see {@link https://example.com/jsdoc%7Cmarkdown|JSDoc Markdown}
 */
// Settings: {"jsdoc":{"mode":"jsdoc"}}

/**
 * @see {@link https://example.com/first|First}
 *   and {@link https://example.com/second|Second}
 */

/**
 * @see {@link https://example.com|Example}
 */

/**
 * @see {@link https://example.com/guide|Guide}
 */

/**
 * @see [API]{@link https://example.com/api}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]

/**
 * @see [Reference]{@link https://example.com/reference}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix"}]

/**
 * @see {@link https://example.com/jsdoc|JSDoc}
 */
// Settings: {"jsdoc":{"mode":"jsdoc"}}

/**
 * @see {@link https://example.com/type%7Bscript%7D|TypeScript}
 */
const value: string = 'value';

/**
 * @see https://example.com
 */

/**
 * @see MyClass#method
 */

/**
 * @see some text
 */

/**
 * @see {@link https://example.com}
 */

/**
 * @see {@link @scope/pkg|Package}
 */

/**
 * @see @scope/pkg
 */

/**
 * @returns [Example](https://example.com)
 */

/**
 * @see {@code foo|bar}
 */

/**
 * @see \[Escaped](https://example.com)
 */
````

