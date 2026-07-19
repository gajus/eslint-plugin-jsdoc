<a name="user-content-normalize-see-links"></a>
<a name="normalize-see-links"></a>
# <code>normalize-see-links</code>

Normalizes labeled links in `@see` tags to a canonical `{@link}` form.

Set `wrapBareUrls` to `true` to also wrap an `@see` description that contains
only a lowercase `http:` or `https:` URL in a plain, no-label `{@link}` tag.
This option defaults to `false`, and its output is independent of
`canonicalForm` because there is no label to position.

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

<a name="user-content-normalize-see-links-options-wrapbareurls"></a>
<a name="normalize-see-links-options-wrapbareurls"></a>
### <code>wrapBareUrls</code>

Whether to wrap an `@see` description containing only a lowercase `http:` or `https:` URL (for example, `@see https://example.com`) in a plain `{<code>@link</code> https://example.com}`. Defaults to `false`.


|||
|---|---|
|Context|everywhere|
|Tags|`see`|
|Recommended|false|
|Settings||
|Options|`canonicalForm`, `enableFixer`, `wrapBareUrls`|

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

/**
 * @see https://example.com/docs
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
// Message: Expected bare @see URL to use a {@link} tag.

/**
 * @see http://example.com/docs
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
// Message: Expected bare @see URL to use a {@link} tag.

/**
 * @see https://example.com/%7C?ids=1|2&brace={ok}#part}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
// Message: Expected bare @see URL to use a {@link} tag.

/**
 * @see https://example.com/prefix
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix","wrapBareUrls":true}]
// Message: Expected bare @see URL to use a {@link} tag.

/**
 * @see https://example.com/report-only
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"enableFixer":false,"wrapBareUrls":true}]
// Message: Expected bare @see URL to use a {@link} tag.

/**
 * @see [Docs](https://example.com/labeled)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
// Message: Expected @see link to use the pipe form.

/**
 * @see [Docs]{@link https://example.com/labeled}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
// Message: Expected @see link to use the pipe form.

/**
 * @see {@link https://example.com/labeled|Docs}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"canonicalForm":"prefix","wrapBareUrls":true}]
// Message: Expected @see link to use the prefix form.

/**
 * @see [See {options}](https://example.com/labeled)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
// Message: @see link cannot be safely normalized.

/**
 * @see [No fix](https://example.com/labeled)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"enableFixer":false,"wrapBareUrls":true}]
// Message: Expected @see link to use the pipe form.

/**
 * @see https://example.com/period.
 * @see https://example.com/comma,
 * @see https://example.com/paren)
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
// Message: Expected bare @see URL to use a {@link} tag.

/**
 * @see
 *   https://example.com/continued
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
// Message: Expected bare @see URL to use a {@link} tag.

/**
 * @see http:MyClass#method
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
// Message: Expected bare @see URL to use a {@link} tag.
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

/**
 * @see {@link https://example.com/idempotent}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see Read https://example.com/docs
 */

/**
 * @see Read https://example.com/docs
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see MyClass#method
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see ftp://example.com/file
 */

/**
 * @see ftp://example.com/file
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see mailto:docs@example.com
 */

/**
 * @see mailto:docs@example.com
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see file:///tmp/docs
 */

/**
 * @see file:///tmp/docs
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see //example.com/docs
 */

/**
 * @see //example.com/docs
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see `https://example.com/docs`
 */

/**
 * @see `https://example.com/docs`
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see {@link https://example.com/docs}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see
 */

/**
 * @see
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see https://example.com/one two
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see HTTP://example.com/docs
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see https://example.com/one https://example.com/two
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see <https://example.com/docs>
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]

/**
 * @see {@link https://example.com/%7C}
 */
// "jsdoc/normalize-see-links": ["error"|"warn", {"wrapBareUrls":true}]
````

