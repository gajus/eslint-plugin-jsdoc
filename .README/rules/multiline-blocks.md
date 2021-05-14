### `multiline-blocks`

Controls how and whether jsdoc blocks can be expressed as single or multiple
line blocks.

Note that if you set `noSingleLineBlocks` and `noMultilineBlocks` to `true`
and configure them in a certain manner, you might effectively be prohibiting
all jsdoc blocks!

#### Options

A single options object with the following properties.

##### `noZeroLineText` (defaults to `true`)

For multiline blocks, any non-whitespace text immediately after the `/**` and
space will be reported. (Text after a newline is not reported.)

`noMultilineBlocks` will have priority over this rule if it applies.

##### `noSingleLineBlocks` (defaults to `false`)

If this is `true`, any single line blocks will be reported, except those which
are whitelisted in `singleLineTags`.

##### `singleLineTags` (defaults to `['lends', 'type']`)

An array of tags which can nevertheless be allowed as single line blocks when
`noSingleLineBlocks` is set.  You may set this to a empty array to
cause all single line blocks to be reported. If `'*'` is present, then
the presence of a tag will allow single line blocks (but not if a tag is
missing).

##### `noMultilineBlocks` (defaults to `false`)

Requires that jsdoc blocks are restricted to single lines only unless impacted
by the options `minimumLengthForMultiline`, `multilineTags`, or
`allowMultipleTags`.

##### `minimumLengthForMultiline` (defaults to not being in effect)

If `noMultilineBlocks` is set with this numeric option, multiline blocks will
be permitted if containing at least the given amount of text.

If not set, multiline blocks will not be permitted regardless of length unless
a relevant tag is present and `multilineTags` is set.

##### `multilineTags` (defaults to `['*']`)

If `noMultilineBlocks` is set with this option, multiline blocks may be allowed
regardless of length as long as a tag or a tag of a certain type is present.

If `*` is included in the array, the presence of a tags will allow for
multiline blocks (but not when without any tags unless the amount of text is
over an amount specified by `minimumLengthForMultiline`).

If the array does not include `*` but lists certain tags, the presence of
such a tag will cause multiline blocks to be allowed.

You may set this to an empty array to prevent any tag from permitting multiple
lines.

##### `allowMultipleTags` (defaults to `true`)

If `noMultilineBlocks` is set to `true` with this option and multiple tags are
found in a block, an error will not be reported.

Since multiple-tagged lines cannot be collapsed into a single line, this option
prevents them from being reported. Set to `false` if you really want to report
any blocks.

This option will also be applied when there is a block description and a single
tag (since a description cannot precede a tag on a single line, and also
cannot be reliably added after the tag either).

|||
|---|---|
|Context|everywhere|
|Tags|Any (though `singleLineTags` and `multilineTags` control the application)|
|Recommended|true|
|Settings||
|Options|`noZeroLineText`, `noSingleLineBlocks`, `singleLineTags`, `noMultilineBlocks`, `minimumLengthForMultiline`, `multilineTags`, `allowMultipleTags`|

<!-- assertions multilineBlocks -->
