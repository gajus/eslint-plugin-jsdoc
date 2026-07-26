# `normalize-see-links`

Normalizes labeled links in `@see` tags to a canonical `{@link}` form.

Set `wrapBareUrls` to `true` to also wrap an `@see` description that contains
only a lowercase `http:` or `https:` URL in a plain, no-label `{@link}` tag.
This option defaults to `false`, and its output is independent of
`canonicalForm` because there is no label to position.

Labels that contain the destination form's closing delimiter are fixable. For
pipe form, the fixer escapes `}` in the label:

```js
/** @see [See {options}](https://example.com/api) */
/** @see {@link https://example.com/api|See {options\}} */
```

For prefix form, the fixer escapes `]` in the label:

```js
/** @see {@link https://example.com|A]B} */
/** @see [A\]B]{@link https://example.com} */
```

## Options

{"gitdown": "options"}

|||
|---|---|
|Context|everywhere|
|Tags|`see`|
|Recommended|false|
|Settings||
|Options|`canonicalForm`, `enableFixer`, `wrapBareUrls`|

## Failing examples

<!-- assertions-failing normalizeSeeLinks -->

## Passing examples

<!-- assertions-passing normalizeSeeLinks -->
