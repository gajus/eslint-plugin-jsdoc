<a name="user-content-tag-lines"></a>
<a name="tag-lines"></a>
# <code>tag-lines</code>

* [Fixer](#user-content-tag-lines-fixer)
* [Options](#user-content-tag-lines-options)
    * [`applyToEndTag`](#user-content-tag-lines-options-applytoendtag)
    * [`count`](#user-content-tag-lines-options-count)
    * [`endLines`](#user-content-tag-lines-options-endlines)
    * [`maxBlockLines`](#user-content-tag-lines-options-maxblocklines)
    * [`startLines`](#user-content-tag-lines-options-startlines)
    * [`startLinesWithNoTags`](#user-content-tag-lines-options-startlineswithnotags)
    * [`tags`](#user-content-tag-lines-options-tags)
* [Context and settings](#user-content-tag-lines-context-and-settings)
* [Failing examples](#user-content-tag-lines-failing-examples)
* [Passing examples](#user-content-tag-lines-passing-examples)


Enforces lines (or no lines) between tags.

If you only want lines preceding all tags or after all tags, you can use
the "any" option along with `startLines` and/or `endLines`.

The "always" or "never" options of this rule should not
be used with the linebreak-setting options of the `sort-tags` rule as both
may try to impose a conflicting number of lines.

<a name="user-content-tag-lines-fixer"></a>
<a name="tag-lines-fixer"></a>
## Fixer

Removes or adds lines between tags or trailing tags.

<a name="user-content-tag-lines-options"></a>
<a name="tag-lines-options"></a>
## Options

The first option is a string with the following possible values: "always", "any", "never".
Defaults to "never". "any" is only useful with `tags` (allowing non-enforcement of lines except
for particular tags) or with `startLines`, `startLinesWithNoTags` `endLines`, or `maxBlockLines`. It is also
necessary if using the linebreak-setting options of the `sort-tags` rule
so that the two rules won't conflict in both attempting to set lines
between tags.

The next option is an object with the following properties.

<a name="user-content-tag-lines-options-applytoendtag"></a>
<a name="tag-lines-options-applytoendtag"></a>
### <code>applyToEndTag</code>

Set to `false` and use with "always" to indicate the normal lines to be
added after tags should not be added after the final tag.

Defaults to `true`.

<a name="user-content-tag-lines-options-count"></a>
<a name="tag-lines-options-count"></a>
### <code>count</code>

Use with "always" to indicate the number of lines to require be present.

Defaults to 1.

<a name="user-content-tag-lines-options-endlines"></a>
<a name="tag-lines-options-endlines"></a>
### <code>endLines</code>

If not set to `null`, will enforce end lines to the given count on the
final tag only.

Defaults to `0`.

<a name="user-content-tag-lines-options-maxblocklines"></a>
<a name="tag-lines-options-maxblocklines"></a>
### <code>maxBlockLines</code>

If not set to `null`, will enforce a maximum number of lines to the given count anywhere in the block description.

Note that if non-`null`, `maxBlockLines` must be greater than or equal to `startLines`.

Defaults to `null`.

<a name="user-content-tag-lines-options-startlines"></a>
<a name="tag-lines-options-startlines"></a>
### <code>startLines</code>

If not set to `null`, will enforce end lines to the given count before the
first tag only, unless there is only whitespace content, in which case,
a line count will not be enforced.

Defaults to `0`.

<a name="user-content-tag-lines-options-startlineswithnotags"></a>
<a name="tag-lines-options-startlineswithnotags"></a>
### <code>startLinesWithNoTags</code>

If set to a number, will enforce a starting lines count when there are no tags. Defaults to `undefined`.

<a name="user-content-tag-lines-options-tags"></a>
<a name="tag-lines-options-tags"></a>
### <code>tags</code>

Overrides the default behavior depending on specific tags.

An object whose keys are tag names and whose values are objects with the
following keys:

1. `lines` - Set to `always`, `never`, or `any` to override.
2. `count` - Overrides main `count` (for "always")

Defaults to empty object.


<a name="user-content-tag-lines-context-and-settings"></a>
<a name="tag-lines-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|Any|
|Recommended|true|
|Settings|N/A|
|Options|string ("always", "any", "never") followed by object with `applyToEndTag`, `count`, `endLines`, `maxBlockLines`, `startLines`, `startLinesWithNoTags`, `tags`|

<a name="user-content-tag-lines-failing-examples"></a>
<a name="tag-lines-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "always"]
// Message: Expected 1 line between tags but found 0

/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"count":2}]
// Message: Expected 2 lines between tags but found 0

/**
 * Some description
 * @param {string} a
 *
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"count":2}]
// Message: Expected 2 lines between tags but found 1

/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"applyToEndTag":false}]
// Message: Expected 1 line between tags but found 0

/**
 * Some description
 * @param {string} a
 *
 * @param {number} b
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "never"]
// Message: Expected no lines between tags

/**
 * Some description
 * @param {string} a
 *
 * @param {number} b
 *
 */
// Message: Expected no lines between tags

/**
 * Some description
 * @param {string} a
 *
 * @param {number} b
 * @param {number} c
 */
// "jsdoc/tag-lines": ["error"|"warn", "always"]
// Message: Expected 1 line between tags but found 0

/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"tags":{"param":{"lines":"always"}}}]
// Message: Expected 1 line between tags but found 0

/**
 * Some description
 * @param {string} a
 * @param {number} b
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"tags":{"param":{"lines":"never"}}}]
// Message: Expected no lines between tags

/**
 * Some description
 * @param {string} a
 *
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"count":2,"tags":{"param":{"lines":"always"}}}]
// Message: Expected 2 lines between tags but found 1

/**
 * Some description
 * @param {string} a
 *
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"count":5,"tags":{"param":{"count":2,"lines":"always"}}}]
// Message: Expected 2 lines between tags but found 1

/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"tags":{"anotherTag":{"lines":"never"}}}]
// Message: Expected 1 line between tags but found 0

/**
 * Some description
 * @param {string} A broken up
 *
 * tag description.
 * @param {number} b
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"endLines":null}]
// Message: Expected 1 line between tags but found 0

/**
 * Some description
 * @param {number} b
 *
 * @returns {string} A broken up
 *
 * tag description.
 */
// "jsdoc/tag-lines": ["error"|"warn", "always"]
// Message: Expected 1 line between tags but found 0

/**
 * Some description
 * @param {string} a
 * @param {string} b
 *
 * @returns {SomeType} An extended
 * description.
 *
 * This is still part of `@returns`.
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"endLines":0}]
// Message: Expected 0 trailing lines

/**
 * Some description
 * @param {string} a
 * @param {string} b
 *
 * @returns {SomeType} An extended
 * description.
 *
 * This is still part of `@returns`.
 *
 *
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"endLines":1}]
// Message: Expected 1 trailing lines

/**
 * Some description
 * @param {string} a
 * @param {string} b
 *
 * @returns {SomeType} An extended
 * description.
 *
 * This is still part of `@returns`.
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"endLines":2}]
// Message: Expected 2 trailing lines

/**
 * Some description
 *
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":1}]
// Message: Expected only 1 line after block description

/**
 * Some description
 *
 *
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":2}]
// Message: Expected only 2 lines after block description

/**
 * Some description
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":0}]
// Message: Expected only 0 lines after block description

/**
 * Some description
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":2}]
// Message: Expected 2 lines after block description

/**
 * Some description
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":1}]
// Message: Expected 1 lines after block description

/**
 *
 * Some description
 *
 * Abc
 *
 *
 *
 * Def
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"maxBlockLines":2}]
// Message: Expected a maximum of 2 lines within block description

/**
 *
 * Some description
 *
 * Abc
 *
 *
 *
 * Def
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"maxBlockLines":1}]
// Message: Expected a maximum of 1 line within block description

/**
 *
 * Some description
 *
 * Abc
 *
 *
 *
 * Def
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"maxBlockLines":0}]
// Message: Expected a maximum of 0 lines within block description

/**
 *
 * Some description
 *
 * Abc
 *
 *
 * Def
 *
 *
 *
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"maxBlockLines":2,"startLines":5}]
// Message: If set to a number, `maxBlockLines` must be greater than or equal to `startLines`.

/**
 * My Test Function, with some example code.
 *
 * ```js
 *   new Foo();
 * ```
 *
 *
 * @param {string} bar
 */
function myTestFunction(bar) {

}
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":1}]
// Message: Expected only 1 line after block description

/**
 *
 * Second Test Case
 * @param {number} baz
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":1}]
// Message: Expected 1 lines after block description

/**
 * Some text
 */
function quux () {
}
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLinesWithNoTags":1}]
// Message: Expected 1 lines after block description

export interface SubOptionTypeMap {
  /**
   * Checkboxes have two states - true (checked) and false (unchecked)
   *
   */
  checkbox: boolean
}
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLinesWithNoTags":0}]
// Message: Expected only 0 lines after block description
````



<a name="user-content-tag-lines-passing-examples"></a>
<a name="tag-lines-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * Some description
 * @param {string} a
 * @param {number} b
 */

/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "never"]

/**
 * @param {string} a
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"applyToEndTag":false}]

/**
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"applyToEndTag":false}]

/** @param {number} b */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"applyToEndTag":false}]

/**
 * Some description
 * @param {string} a
 *
 * @param {number} b
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"endLines":null}]

/**
 * Some description
 * @param {string} a
 *
 *
 * @param {number} b
 *
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"count":2,"endLines":null}]

/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"tags":{"param":{"lines":"any"}}}]

/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"tags":{"param":{"lines":"any"}}}]

/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"tags":{"param":{"lines":"never"}}}]

/**
 * Some description
 * @param {number} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"tags":{"param":{"lines":"any"}}}]

/**
 * Some description
 * @param {number} a
 *
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"tags":{"param":{"lines":"any"}}}]

/**
 * Some description
 * @param {number} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"tags":{"param":{"lines":"never"}}}]

/**
 * Some description
 * @param {string} a
 *
 *
 * @param {number} b
 *
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"count":5,"tags":{"param":{"count":2,"lines":"always"}}}]

/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"tags":{"anotherTag":{"lines":"always"}}}]

/**
 * Some description
 * @param {string} a
 *
 * This is still part of `@param`.
 * @returns {SomeType} An extended
 * description.
 */
// "jsdoc/tag-lines": ["error"|"warn", "never"]

/**
 * Some description
 * @param {string} a
 * @returns {SomeType} An extended
 * description.
 *
 * This is still part of `@returns`.
 */
// "jsdoc/tag-lines": ["error"|"warn", "never"]

/**
 * Some description
 * @param {string} a
 *
 * This is still part of `@param`.
 *
 * @returns {SomeType} An extended
 * description.
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"endLines":null}]

/**
 * Some description
 * @param {string} a
 *
 * @returns {SomeType} An extended
 * description.
 *
 * This is still part of `@returns`.
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"endLines":null}]

/**
 * Some description
 * @param {string} a
 * @param {string} b
 *
 * @returns {SomeType} An extended
 * description.
 *
 * This is still part of `@returns`.
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"endLines":0}]

/**
 * Some description
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":1}]

/**
 * Some description
 * @param {string} a
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"endLines":1}]

/**
 * Some description
 *
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"startLines":null}]

/**
 * Some description
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"startLines":null}]

/**
 * @param {string} input
 */
function processSass (input) {
}
// "jsdoc/tag-lines": ["error"|"warn", "never",{"startLines":1}]

/**
 *
 * @param {string} input
 */
function processSass (input) {
}
// "jsdoc/tag-lines": ["error"|"warn", "never",{"startLines":1}]

/**
 * Toggles the deselect all icon button action
 */
function updateIconButton () {
}
// "jsdoc/tag-lines": ["error"|"warn", "never",{"startLines":1}]

/** A class. */
class _Foo {
  /** @param arg Argument. */
  conststructor(arg: string) {
    console.log(arg);
  }
}
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":1}]

/**
 *
 * Some description
 *
 * Abc
 *
 *
 * Def
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"maxBlockLines":2}]

export interface SubOptionTypeMap {
  /**
   * Checkboxes have two states - true (checked) and false (unchecked)
   *
   */
  checkbox: boolean
}
// "jsdoc/tag-lines": ["error"|"warn", "any",{"endLines":0,"startLines":0}]
````

