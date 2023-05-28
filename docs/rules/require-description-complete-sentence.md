<a name="user-content-require-description-complete-sentence"></a>
<a name="require-description-complete-sentence"></a>
# <code>require-description-complete-sentence</code>

* [Fixer](#user-content-require-description-complete-sentence-fixer)
* [Options](#user-content-require-description-complete-sentence-options)
    * [`tags`](#user-content-require-description-complete-sentence-options-tags)
    * [`abbreviations`](#user-content-require-description-complete-sentence-options-abbreviations)
    * [`newlineBeforeCapsAssumesBadSentenceEnd`](#user-content-require-description-complete-sentence-options-newlinebeforecapsassumesbadsentenceend)
* [Context and settings](#user-content-require-description-complete-sentence-context-and-settings)
* [Failing examples](#user-content-require-description-complete-sentence-failing-examples)
* [Passing examples](#user-content-require-description-complete-sentence-passing-examples)


Requires that block description, explicit `@description`, and
`@param`/`@returns` tag descriptions are written in complete sentences, i.e.,

* Description must start with an uppercase alphabetical character.
* Paragraphs must start with an uppercase alphabetical character.
* Sentences must end with a period, question mark, exclamation mark, or triple backticks.
* Every line in a paragraph (except the first) which starts with an uppercase
  character must be preceded by a line ending with a period.
* A colon or semi-colon followed by two line breaks is still part of the
  containing paragraph (unlike normal dual line breaks).
* Text within inline tags `{...}` or within triple backticks are not checked for sentence divisions.
* Periods after items within the `abbreviations` option array are not treated
  as sentence endings.

<a name="user-content-require-description-complete-sentence-fixer"></a>
<a name="require-description-complete-sentence-fixer"></a>
## Fixer

If sentences do not end with terminal punctuation, a period will be added.

If sentences do not start with an uppercase character, the initial
letter will be capitalized.

<a name="user-content-require-description-complete-sentence-options"></a>
<a name="require-description-complete-sentence-options"></a>
## Options

<a name="user-content-require-description-complete-sentence-options-tags"></a>
<a name="require-description-complete-sentence-options-tags"></a>
### <code>tags</code>

If you want additional tags to be checked for their descriptions, you may
add them within this option.

```js
{
  'jsdoc/require-description-complete-sentence': ['error', {
    tags: ['see', 'copyright']
  }]
}
```

The tags `@param`/`@arg`/`@argument` and `@property`/`@prop` will be properly
parsed to ensure that the checked "description" text includes only the text
after the name.

All other tags will treat the text following the tag name, a space, and
an optional curly-bracketed type expression (and another space) as part of
its "description" (e.g., for `@returns {someType} some description`, the
description is `some description` while for `@some-tag xyz`, the description
is `xyz`).

<a name="user-content-require-description-complete-sentence-options-abbreviations"></a>
<a name="require-description-complete-sentence-options-abbreviations"></a>
### <code>abbreviations</code>

You can provide an `abbreviations` options array to avoid such strings of text
being treated as sentence endings when followed by dots. The `.` is not
necessary at the end of the array items.

<a name="user-content-require-description-complete-sentence-options-newlinebeforecapsassumesbadsentenceend"></a>
<a name="require-description-complete-sentence-options-newlinebeforecapsassumesbadsentenceend"></a>
### <code>newlineBeforeCapsAssumesBadSentenceEnd</code>

When `false` (the new default), we will not assume capital letters after
newlines are an incorrect way to end the sentence (they may be proper
nouns, for example).

<a name="user-content-require-description-complete-sentence-context-and-settings"></a>
<a name="require-description-complete-sentence-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|doc block, `param`, `returns`, `description`, `property`, `summary`, `file`, `classdesc`, `todo`, `deprecated`, `throws`, 'yields' and others added by `tags`|
|Aliases|`arg`, `argument`, `return`, `desc`, `prop`, `fileoverview`, `overview`, `exception`, `yield`|
|Recommended|false|
|Options|`abbreviations`, `newlineBeforeCapsAssumesBadSentenceEnd`, `tags`|

<a name="user-content-require-description-complete-sentence-failing-examples"></a>
<a name="require-description-complete-sentence-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * foo.
 */
function quux () {

}
// Message: Sentences should start with an uppercase character.

/**
 * foo?
 */
function quux () {

}
// Message: Sentences should start with an uppercase character.

/**
 * @description foo.
 */
function quux () {

}
// Message: Sentences should start with an uppercase character.

/**
 * Foo)
 */
function quux () {

}
// Message: Sentences must end with a period.

/**
 * `foo` is a variable
 */
function quux () {

}
// Message: Sentences must end with a period.

/**
 * Foo.
 *
 * foo.
 */
function quux () {

}
// Message: Sentences should start with an uppercase character.

/**
 * тест.
 */
function quux () {

}
// Message: Sentences should start with an uppercase character.

/**
 * Foo
 */
function quux () {

}
// Message: Sentences must end with a period.

/**
 * Foo
 *
 * @param x
 */
function quux () {

}
// Message: Sentences must end with a period.

/**
 * Foo
 * Bar.
 */
function quux () {

}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"newlineBeforeCapsAssumesBadSentenceEnd":true}]
// Message: A line of text is started with an uppercase character, but the preceding line does not end the sentence.

/**
 * Foo.
 *
 * @param foo foo.
 */
function quux (foo) {

}
// Message: Sentences should start with an uppercase character.

/**
 * Foo.
 *
 * @param foo bar
 */
function quux (foo) {

}
// Message: Sentences should start with an uppercase character.

/**
 * {@see Foo.bar} buz
 */
function quux (foo) {

}
// Message: Sentences should start with an uppercase character.

/**
 * Foo.
 *
 * @returns {number} foo
 */
function quux (foo) {

}
// Message: Sentences should start with an uppercase character.

/**
 * Foo.
 *
 * @returns foo.
 */
function quux (foo) {

}
// Message: Sentences should start with an uppercase character.

/**
 * lorem ipsum dolor sit amet, consectetur adipiscing elit. pellentesque elit diam,
 * iaculis eu dignissim sed, ultrices sed nisi. nulla at ligula auctor, consectetur neque sed,
 * tincidunt nibh. vivamus sit amet vulputate ligula. vivamus interdum elementum nisl,
 * vitae rutrum tortor semper ut. morbi porta ante vitae dictum fermentum.
 * proin ut nulla at quam convallis gravida in id elit. sed dolor mauris, blandit quis ante at,
 * consequat auctor magna. duis pharetra purus in porttitor mollis.
 */
function longDescription (foo) {

}
// Message: Sentences should start with an uppercase character.

/**
 * @arg {number} foo - Foo
 */
function quux (foo) {

}
// Message: Sentences must end with a period.

/**
 * @argument {number} foo - Foo
 */
function quux (foo) {

}
// Message: Sentences must end with a period.

/**
 * @return {number} foo
 */
function quux (foo) {

}
// Message: Sentences should start with an uppercase character.

/**
 * Returns bar.
 *
 * @return {number} bar
 */
function quux (foo) {

}
// Message: Sentences should start with an uppercase character.

/**
 * @throws {object} Hello World
 * hello world
*/
// Message: Sentences must end with a period.

/**
 * @summary Foo
 */
function quux () {

}
// Message: Sentences must end with a period.

/**
 * @throws {SomeType} Foo
 */
function quux () {

}
// Message: Sentences must end with a period.

/**
 * @see Foo
 */
function quux () {

}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"tags":["see"]}]
// Message: Sentences must end with a period.

/**
 * @param foo Foo bar
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"tags":["param"]}]
// Message: Sentences must end with a period.

/**
 * Sorry, but this isn't a complete sentence, Mr.
 */
function quux () {

}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"abbreviations":["Mr"]}]
// Message: Sentences must end with a period.

/**
 * Sorry, but this isn't a complete sentence Mr.
 */
function quux () {

}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"abbreviations":["Mr."]}]
// Message: Sentences must end with a period.

/**
 * Sorry, but this isn't a complete sentence Mr. 
 */
function quux () {

}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"abbreviations":["Mr"]}]
// Message: Sentences must end with a period.

/**
 * Sorry, but this isn't a complete sentence Mr. and Mrs.
 */
function quux () {

}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"abbreviations":["Mr","Mrs"]}]
// Message: Sentences must end with a period.

/**
 * This is a complete sentence. But this isn't, Mr.
 */
function quux () {

}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"abbreviations":["Mr"]}]
// Message: Sentences must end with a period.

/**
 * This is a complete Mr. sentence. But this isn't, Mr.
 */
function quux () {

}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"abbreviations":["Mr"]}]
// Message: Sentences must end with a period.

/**
 * This is a complete Mr. sentence.
 */
function quux () {

}
// Message: Sentences should start with an uppercase character.

/**
 * This is fun, i.e. enjoyable, but not superlatively so, e.g. not
 * super, wonderful, etc..
 */
function quux () {

}
// Message: Sentences should start with an uppercase character.

/**
 * Do not have dynamic content; e.g. homepage. Here a simple unique id
 * suffices.
 */
 function quux () {

 }
// Message: Sentences should start with an uppercase character.

/**
 * Implements support for the
 * Swahili voice synthesizer.
 */
function speak() {
}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"newlineBeforeCapsAssumesBadSentenceEnd":true}]
// Message: A line of text is started with an uppercase character, but the preceding line does not end the sentence.

/**
 * Foo.
 *
 * @template TempA, TempB foo.
 */
function quux (foo) {

}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"tags":["template"]}]
// Message: Sentences should start with an uppercase character.

/**
 * Just a component.
 * @param {Object} props Свойства.
 * @return {ReactElement}.
 */
function quux () {}
// Message: Sentences must be more than punctuation.
````



<a name="user-content-require-description-complete-sentence-passing-examples"></a>
<a name="require-description-complete-sentence-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @param foo - Foo.
 */
function quux () {

}

/**
 * Foo.
 */
function quux () {

}

/**
 * Foo.
 * Bar.
 */
function quux () {

}

/**
 * Foo.
 *
 * Bar.
 */
function quux () {

}

/**
 * Тест.
 */
function quux () {

}

/**
 * Foo
 * bar.
 */
function quux () {

}

/**
 * @returns Foo bar.
 */
function quux () {

}

/**
 * Foo {@see Math.sin}.
 */
function quux () {

}

/**
 * Foo {@see Math.sin} bar.
 */
function quux () {

}

/**
 * Foo?
 *
 * Bar!
 *
 * Baz:
 *   1. Foo.
 *   2. Bar.
 */
function quux () {

}

/**
 * Hello:
 * World.
 */
function quux () {

}

/**
 * Hello: world.
 */
function quux () {

}

/**
 *
 */
function quux () {

}

/**
 * @description Foo.
 */
function quux () {

}

/**
 * `foo` is a variable.
 */
function quux () {

}

/**
 * Foo.
 *
 * `foo`.
 */
function quux () {

}

/**
 * @param foo - `bar`.
 */
function quux () {

}

/**
 * @returns {number} `foo`.
 */
function quux () {

}

/**
 * Foo
 * `bar`.
 */
function quux () {

}

/**
 * @example Foo
 */
function quux () {

}

/**
 * @see Foo
 */
function quux () {

}

/**
 * Foo.
 *
 * @param foo Foo.
 */
function quux (foo) {

}

/**
 * Foo.
 *
 * @param foo Foo.
 */
function quux (foo) {

}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"tags":["param"]}]

/**
 * @param foo Foo bar.
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"tags":["param"]}]

/**
 *
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}

/**
* We stop loading Items when we have loaded:
*
* 1) The main Item;
* 2) All its variants.
*/

/**
 * This method is working on 2 steps.
 *
 * | Step | Comment     |
 * |------|-------------|
 * |   1  | do it       |
 * |   2  | do it again |
 */

/**
 * This is something that
 * I want to test.
 */
function quux () {

}

/**
 * When making HTTP requests, the
 * URL is super important.
 */
function quux () {

}

/**
 * Sorry, but this isn't a complete sentence, Mr.
 */
function quux () {

}

/**
 * Sorry, but this isn't a complete sentence Mr..
 */
function quux () {

}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"abbreviations":["Mr."]}]

/**
 * Sorry, but this isn't a complete sentence Mr. 
 */
function quux () {

}

/**
 * Sorry, but this isn't a complete sentence Mr. and Mrs..
 */
function quux () {

}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"abbreviations":["Mr","Mrs"]}]

/**
 * This is a complete sentence aMr.
 */
function quux () {

}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"abbreviations":["Mr"]}]

/**
 * This is a complete sentence. But this isn't, Mr.
 */
function quux () {

}

/**
 * This is a complete Mr. Sentence. But this isn't, Mr.
 */
function quux () {

}

/**
 * This is a complete Mr. sentence.
 */
function quux () {

}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"abbreviations":["Mr"]}]

/**
 * This is fun, i.e. enjoyable, but not superlatively so, e.g. not
 * super, wonderful, etc..
 */
function quux () {

}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"abbreviations":["etc","e.g.","i.e."]}]


**
* Do not have dynamic content; e.g. homepage. Here a simple unique id
* suffices.
*/
function quux () {

}
// "jsdoc/require-description-complete-sentence": ["error"|"warn", {"abbreviations":["etc","e.g.","i.e."]}]

/**
 * Implements support for the
 * Swahili voice synthesizer.
 */
function speak() {
}

/**
 * @param foo
 *
 * @returns {void}
 */
export default (foo) => {
  foo()
}

/** @file To learn more,
 * see: https://github.com/d3/d3-ease. */

/** To learn more,
 * see: https://github.com/d3/d3-ease. */

/**
 * This is a complete sentence...
 */
function quux () {

}

/**
 * He wanted a few items: a jacket and shirt...
 */
function quux () {

}

/**
 * The code in question was...
 * ```
 * alert('hello');
 * ```
 */
function quux () {

}

/**
 * @param {number|string|Date|Object|OverType|WhateverElse} multiType -
 * Nice long explanation...
 */
function test (multiType) {
}

/**
 * Any kind of fowl (e.g., a duck).
 */
function quux () {}

/**
 * The code in question was...
 * ```
 * do something
 *
 * interesting
 * ```
 */
function quux () {

}
````

