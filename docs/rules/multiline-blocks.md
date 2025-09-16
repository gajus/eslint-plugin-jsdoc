<a name="user-content-multiline-blocks"></a>
<a name="multiline-blocks"></a>
### <code>multiline-blocks</code>



Controls how and whether JSDoc blocks can be expressed as single or multiple
line blocks.

Note that if you set `noSingleLineBlocks` and `noMultilineBlocks` to `true`
and configure them in a certain manner, you might effectively be prohibiting
all JSDoc blocks!

Also allows for preventing text at the very beginning or very end of blocks.

<a name="user-content-fixer"></a>
<a name="fixer"></a>
## Fixer

Optionally converts single line blocks to multiline ones and vice versa.

<a name="user-content-options"></a>
<a name="options"></a>
## Options

A single options object has the following properties.

<a name="user-content-options-allowmultipletags"></a>
<a name="options-allowmultipletags"></a>
### <code>allowMultipleTags</code>

If `noMultilineBlocks` is set to `true` with this option and multiple tags are
found in a block, an error will not be reported.

Since multiple-tagged lines cannot be collapsed into a single line, this option
prevents them from being reported. Set to `false` if you really want to report
any blocks.

This option will also be applied when there is a block description and a single
tag (since a description cannot precede a tag on a single line, and also
cannot be reliably added after the tag either).

Defaults to `true`.
<a name="user-content-options-minimumlengthformultiline"></a>
<a name="options-minimumlengthformultiline"></a>
### <code>minimumLengthForMultiline</code>

If `noMultilineBlocks` is set with this numeric option, multiline blocks will
be permitted if containing at least the given amount of text.

If not set, multiline blocks will not be permitted regardless of length unless
a relevant tag is present and `multilineTags` is set.

Defaults to not being in effect.
<a name="user-content-options-multilinetags"></a>
<a name="options-multilinetags"></a>
### <code>multilineTags</code>

If `noMultilineBlocks` is set with this option, multiline blocks may be allowed
regardless of length as long as a tag or a tag of a certain type is present.

If `*` is included in the array, the presence of a tags will allow for
multiline blocks (but not when without any tags unless the amount of text is
over an amount specified by `minimumLengthForMultiline`).

If the array does not include `*` but lists certain tags, the presence of
such a tag will cause multiline blocks to be allowed.

You may set this to an empty array to prevent any tag from permitting multiple
lines.

Defaults to `['*']`.

<a name="user-content-options-nofinallinetext"></a>
<a name="options-nofinallinetext"></a>
### <code>noFinalLineText</code>

For multiline blocks, any non-whitespace text preceding the `*/` on the final
line will be reported. (Text preceding a newline is not reported.)

`noMultilineBlocks` will have priority over this rule if it applies.

Defaults to `true`.
<a name="user-content-options-nomultilineblocks"></a>
<a name="options-nomultilineblocks"></a>
### <code>noMultilineBlocks</code>

Requires that JSDoc blocks are restricted to single lines only unless impacted
by the options `minimumLengthForMultiline`, `multilineTags`, or
`allowMultipleTags`.

Defaults to `false`.
<a name="user-content-options-nosinglelineblocks"></a>
<a name="options-nosinglelineblocks"></a>
### <code>noSingleLineBlocks</code>

If this is `true`, any single line blocks will be reported, except those which
are whitelisted in `singleLineTags`.

Defaults to `false`.

<a name="user-content-options-nozerolinetext"></a>
<a name="options-nozerolinetext"></a>
### <code>noZeroLineText</code>

For multiline blocks, any non-whitespace text immediately after the `/**` and
space will be reported. (Text after a newline is not reported.)

`noMultilineBlocks` will have priority over this rule if it applies.

Defaults to `true`.
<a name="user-content-options-requiresinglelineundercount"></a>
<a name="options-requiresinglelineundercount"></a>
### <code>requireSingleLineUnderCount</code>

If this number is set, it indicates a minimum line width for a single line of
JSDoc content spread over a multi-line comment block. If a single line is under
the minimum length, it will be reported so as to enforce single line JSDoc blocks
for such cases. Blocks are not reported which have multi-line descriptions,
multiple tags, a block description and tag, or tags with multi-line types or
descriptions.

Defaults to `null`.

<a name="user-content-options-singlelinetags"></a>
<a name="options-singlelinetags"></a>
### <code>singleLineTags</code>

An array of tags which can nevertheless be allowed as single line blocks when
`noSingleLineBlocks` is set.  You may set this to a empty array to
cause all single line blocks to be reported. If `'*'` is present, then
the presence of a tag will allow single line blocks (but not if a tag is
missing).

Defaults to `['lends', 'type']`.


<a name="user-content-context-and-settings"></a>
<a name="context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|Any (though `singleLineTags` and `multilineTags` control the application)|
|Recommended|true|
|Settings||
|Options|`allowMultipleTags`, `minimumLengthForMultiline`, `multilineTags`, `noFinalLineText`, `noMultilineBlocks`, `noSingleLineBlocks`, `noZeroLineText`, `requireSingleLineUnderCount`, `singleLineTags`|

<a name="user-content-failing-examples"></a>
<a name="failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/** Reported up here
 * because the rest is multiline
 */
// Message: Should have no text on the "0th" line (after the `/**`).

/** Reported up here
 * because the rest is multiline
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noZeroLineText":true}]
// Message: Should have no text on the "0th" line (after the `/**`).

/** @abc {aType} aName Reported up here
 * because the rest is multiline
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noZeroLineText":true}]
// Message: Should have no text on the "0th" line (after the `/**`).

/** @tag */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noSingleLineBlocks":true}]
// Message: Single line blocks are not permitted by your configuration.

/** @tag {someType} */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noSingleLineBlocks":true}]
// Message: Single line blocks are not permitted by your configuration.

/** @tag {someType} aName */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noSingleLineBlocks":true}]
// Message: Single line blocks are not permitted by your configuration.

/** @tag */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noSingleLineBlocks":true,"singleLineTags":["someOtherTag"]}]
// Message: Single line blocks are not permitted by your configuration.

/** desc */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noSingleLineBlocks":true,"singleLineTags":["*"]}]
// Message: Single line blocks are not permitted by your configuration.

/**
 * Desc.
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noMultilineBlocks":true}]
// Message: Multiline JSDoc blocks are prohibited by your configuration.

/** desc
 *
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noMultilineBlocks":true}]
// Message: Multiline JSDoc blocks are prohibited by your configuration.

/** desc
 *
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noMultilineBlocks":true,"noSingleLineBlocks":true}]
// Message: Multiline JSDoc blocks are prohibited by your configuration but fixing would result in a single line block which you have prohibited with `noSingleLineBlocks`.

/**
 *
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noMultilineBlocks":true}]
// Message: Multiline JSDoc blocks are prohibited by your configuration.

/**
 * This is not long enough to be permitted.
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"minimumLengthForMultiline":100,"noMultilineBlocks":true}]
// Message: Multiline JSDoc blocks are prohibited by your configuration.

/**
 * This is not long enough to be permitted.
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"allowMultipleTags":true,"minimumLengthForMultiline":100,"noMultilineBlocks":true}]
// Message: Multiline JSDoc blocks are prohibited by your configuration.

/**
 * This has the wrong tags so is not permitted.
 * @notTheRightTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"allowMultipleTags":false,"multilineTags":["onlyThisIsExempted"],"noMultilineBlocks":true}]
// Message: Multiline JSDoc blocks are prohibited by your configuration but the block has a description with a tag.

/**
 * This has too many tags so cannot be fixed ot a single line.
 * @oneTag
 * @anotherTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"allowMultipleTags":false,"multilineTags":[],"noMultilineBlocks":true}]
// Message: Multiline JSDoc blocks are prohibited by your configuration but the block has multiple tags.

/**
 * This has a tag and description so cannot be fixed ot a single line.
 * @oneTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"allowMultipleTags":false,"multilineTags":[],"noMultilineBlocks":true}]
// Message: Multiline JSDoc blocks are prohibited by your configuration but the block has a description with a tag.

/**
 * This has no tags so is not permitted.
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"multilineTags":["*"],"noMultilineBlocks":true}]
// Message: Multiline JSDoc blocks are prohibited by your configuration.

/**
 * This has the wrong tags so is not permitted.
 * @notTheRightTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"allowMultipleTags":false,"minimumLengthForMultiline":500,"multilineTags":["onlyThisIsExempted"],"noMultilineBlocks":true}]
// Message: Multiline JSDoc blocks are prohibited by your configuration but the block has a description with a tag.

/**
 * @lends This can be safely fixed to a single line.
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"multilineTags":[],"noMultilineBlocks":true,"noSingleLineBlocks":true}]
// Message: Multiline JSDoc blocks are prohibited by your configuration.

/**
 * @type {aType} This can be safely fixed to a single line.
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"multilineTags":[],"noMultilineBlocks":true,"noSingleLineBlocks":true}]
// Message: Multiline JSDoc blocks are prohibited by your configuration.

/**
 * @aTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"multilineTags":[],"noMultilineBlocks":true}]
// Message: Multiline JSDoc blocks are prohibited by your configuration.

/**
 * This is a problem when single and multiline are blocked.
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noMultilineBlocks":true,"noSingleLineBlocks":true}]
// Message: Multiline JSDoc blocks are prohibited by your configuration but fixing would result in a single line block which you have prohibited with `noSingleLineBlocks`.

/** This comment is bad
 * It should not have text on line zero
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"minimumLengthForMultiline":50,"noMultilineBlocks":true,"noZeroLineText":true}]
// Message: Should have no text on the "0th" line (after the `/**`).

/**
 * @lends This can be safely fixed
 * to a single
 * line. */
// "jsdoc/multiline-blocks": ["error"|"warn", {"multilineTags":[],"noMultilineBlocks":true}]
// Message: Multiline JSDoc blocks are prohibited by your configuration.

/**
 * @someTag {aType} with Description */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noFinalLineText":true}]
// Message: Should have no text on the final line (before the `*/`).

/**
 * Description */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noFinalLineText":true}]
// Message: Should have no text on the final line (before the `*/`).

/**
 * Description too short
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]
// Message: Description is too short to be multi-line.

/** Description too short
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]
// Message: Description is too short to be multi-line.

/**
 * Description too short */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]
// Message: Description is too short to be multi-line.

/**
 * @someTag {someType} Description too short
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]
// Message: Description is too short to be multi-line.

/** @someTag {someType} Description too short
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]
// Message: Description is too short to be multi-line.

/**
 * @someTag {someType} Description too short */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]
// Message: Description is too short to be multi-line.
````



<a name="user-content-passing-examples"></a>
<a name="passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/** Not reported */

/**
 *  Not reported
 */

/** Reported up here
 * because the rest is multiline
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noZeroLineText":false}]

/** @tag */

/** @lends */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noSingleLineBlocks":true}]

/** @tag */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noSingleLineBlocks":true,"singleLineTags":["tag"]}]

/** @tag */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noSingleLineBlocks":true,"singleLineTags":["*"]}]

/**
 *
 */

/**
 *
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noMultilineBlocks":false}]

/** Test */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noMultilineBlocks":true}]

/**
 * This is long enough to be permitted by our config.
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"minimumLengthForMultiline":25,"noMultilineBlocks":true}]

/**
 * This is long enough to be permitted by our config.
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"minimumLengthForMultiline":50,"noMultilineBlocks":true}]

/**
 * This has the right tag so is permitted.
 * @theRightTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"multilineTags":["theRightTag"],"noMultilineBlocks":true}]

/** This has no tags but is single line so is not permitted. */
// "jsdoc/multiline-blocks": ["error"|"warn", {"multilineTags":["*"],"noMultilineBlocks":true}]

/**
 * This has the wrong tags so is not permitted.
 * @notTheRightTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"minimumLengthForMultiline":10,"multilineTags":["onlyThisIsExempted"],"noMultilineBlocks":true}]

/**
 * This has the wrong tags so is not permitted.
 * @theRightTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"minimumLengthForMultiline":500,"multilineTags":["theRightTag"],"noMultilineBlocks":true}]

/** tag */

/**
 * @lends This is ok per multiline
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noMultilineBlocks":true,"noSingleLineBlocks":true}]

/**
 * This has too many tags so cannot be fixed ot a single line.
 * @oneTag
 * @anotherTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"multilineTags":[],"noMultilineBlocks":true}]

/**
 * This has too many tags so cannot be fixed ot a single line.
 * @oneTag
 * @anotherTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"allowMultipleTags":true,"multilineTags":[],"noMultilineBlocks":true}]

/**
 * This has a tag and description so cannot be fixed ot a single line.
 * @oneTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"allowMultipleTags":true,"multilineTags":[],"noMultilineBlocks":true}]

/**
 * This has a tag and description so cannot be fixed ot a single line.
 * @oneTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"allowMultipleTags":false,"multilineTags":["oneTag"],"noMultilineBlocks":true}]

/** @someTag with Description */
// "jsdoc/multiline-blocks": ["error"|"warn", {"noFinalLineText":true}]

/**
 * This description here is very much long enough, I'd say, wouldn't you?
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]

/**
 * This description here is
 * on multiple lines.
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]

/** This description here is on a single line, so it doesn't matter if it goes over. */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]

/**
 * @someTag {someType} This description here is very much long enough, I'd say, wouldn't you?
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]

/**
 * @someTag {someType} This description here is
 * on multiple lines.
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]

/** @someTag {someTag} This description here is on a single line, so it doesn't matter if it goes over. */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]

/**
 * Description short but has...
 * @someTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]

/**
 * @someTag
 * @anotherTag
 */
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":80}]

/**
 * @type {{
    visible: import("vue").Ref<boolean>,
    attack: import("vue").Ref<AttackPve|AttackPvp|undefined>,
    hero: import("vue").Ref<HeroOwn|undefined>,
    outpost: import("vue").Ref<Outpost|undefined>,
    rewards: import("vue").Ref<Rewards|undefined>
* }}
*/
// "jsdoc/multiline-blocks": ["error"|"warn", {"requireSingleLineUnderCount":120}]
````

