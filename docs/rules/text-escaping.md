<a name="user-content-text-escaping"></a>
<a name="text-escaping"></a>
### <code>text-escaping</code>

This rule can auto-escape certain characters that are input within block and
tag descriptions.

This rule may be desirable if your text is known not to contain HTML or
Markdown and you therefore do not wish for it to be accidentally interpreted
as such by the likes of Visual Studio Code or if you wish to view it escaped
within it or your documentation.

<a name="user-content-text-escaping-options"></a>
<a name="text-escaping-options"></a>
#### Options

<a name="user-content-text-escaping-options-escapehtml"></a>
<a name="text-escaping-options-escapehtml"></a>
##### <code>escapeHTML</code>

This option escapes all `<` and `&` characters (except those followed by
whitespace which are treated as literals by Visual Studio Code).

<a name="user-content-text-escaping-options-escapemarkdown"></a>
<a name="text-escaping-options-escapemarkdown"></a>
##### <code>escapeMarkdown</code>

This option escapes the first backtick (`` ` ``) in a paired sequence.

|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|false|
|Settings||
|Options||

## Failing examples

The following patterns are considered problems:

````js
/**
 * Some things to escape: <a> and &gt; and `test`
 */
// Message: You must include either `escapeHTML` or `escapeMarkdown`

/**
 * Some things to escape: <a> and &gt; and &#xabc; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]
// Message: You have unescaped HTML characters < or &

/**
 * Some things to escape: <a> and &gt; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeMarkdown":true}]
// Message: You have unescaped Markdown backtick sequences

/**
 * Some things to escape:
 * <a> and &gt; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]
// Message: You have unescaped HTML characters < or &

/**
 * Some things to escape:
 * <a> and &gt; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeMarkdown":true}]
// Message: You have unescaped Markdown backtick sequences

/**
 * @param {SomeType} aName Some things to escape: <a> and &gt; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]
// Message: You have unescaped HTML characters < or & in a tag

/**
 * @param {SomeType} aName Some things to escape: <a> and &gt; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeMarkdown":true}]
// Message: You have unescaped Markdown backtick sequences in a tag

/**
 * @param {SomeType} aName Some things to escape:
 * <a> and &gt; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]
// Message: You have unescaped HTML characters < or & in a tag

/**
 * @param {SomeType} aName Some things to escape:
 * <a> and &gt; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeMarkdown":true}]
// Message: You have unescaped Markdown backtick sequences in a tag
````

## Passing examples

The following patterns are not considered problems:

````js
/**
 * Some things to escape: &lt;a> and &gt; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]

/**
 * Some things to escape: <a> and &gt; and \`test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeMarkdown":true}]

/**
 * Some things to escape: < and &
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]

/**
 * Some things to escape: `
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeMarkdown":true}]

/**
 * @param {SomeType} aName Some things to escape: &lt;a> and &gt; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]

/**
 * @param {SomeType} aName Some things to escape: <a> and &gt; and \`test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeMarkdown":true}]

/**
 * @param {SomeType} aName Some things to escape: < and &
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]

/**
 * @param {SomeType} aName Some things to escape: `
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeMarkdown":true}]

/**
 * Nothing
 * to escape
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]
````

