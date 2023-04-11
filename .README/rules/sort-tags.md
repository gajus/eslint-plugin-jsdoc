### `sort-tags`

Sorts tags by a specified sequence according to tag name.

(Default order originally inspired by [`@homer0/prettier-plugin-jsdoc`](https://github.com/homer0/packages/tree/main/packages/public/prettier-plugin-jsdoc).)

Optionally allows adding line breaks between tag groups and/or between tags
within a tag group.

Please note: unless you are disabling reporting of line breaks, this rule
should not be used with the default "never" or "always" options of
`tag-lines` (a rule enabled by default with the recommended config) as
that rule adds its own line breaks after tags and may interfere with any
line break setting this rule will attempt to do when not disabled.

You may, however, safely set the "any" option in that rule along with
`startLines` and/or `endLines`.

#### Options

##### `tagSequence`

An array of tag group objects indicating the preferred sequence for sorting tags.

Each item in the array should be an object with a `tags` property set to an array
of tag names.

Tag names earlier in the list will be arranged first. The relative position of
tags of the same name will not be changed.

Earlier groups will also be arranged before later groups, but with the added
feature that additional line breaks may be added between (or before or after)
such groups (depending on the setting of `linesBetween`).

Tag names not in the list will be grouped together at the end. The pseudo-tag
`-other` can be used to place them anywhere else if desired. The tags will be
placed in their order of appearance, or alphabetized if `alphabetizeExtras`
is enabled, see more below about that option.

Defaults to the array below (noting that it is just a single tag group with
no lines between groups by default).

Please note that this order is still experimental, so if you want to retain
a fixed order that doesn't change into the future, supply your own
`tagSequence`.

```js
[{tags: [
  // Brief descriptions
  'summary',
  'typeSummary',

  // Module/file-level
  'module',
  'exports',
  'file',
  'fileoverview',
  'overview',

  // Identifying (name, type)
  'typedef',
  'interface',
  'record',
  'template',
  'name',
  'kind',
  'type',
  'alias',
  'external',
  'host',
  'callback',
  'func',
  'function',
  'method',
  'class',
  'constructor',

  // Relationships
  'modifies',
  'mixes',
  'mixin',
  'mixinClass',
  'mixinFunction',
  'namespace',
  'borrows',
  'constructs',
  'lends',
  'implements',
  'requires',

  // Long descriptions
  'desc',
  'description',
  'classdesc',
  'tutorial',
  'copyright',
  'license',

  // Simple annotations
  'const',
  'constant',
  'final',
  'global',
  'readonly',
  'abstract',
  'virtual',
  'var',
  'member',
  'memberof',
  'memberof!',
  'inner',
  'instance',
  'inheritdoc',
  'inheritDoc',
  'override',
  'hideconstructor',

  // Core function/object info
  'param',
  'arg',
  'argument',
  'prop',
  'property',
  'return',
  'returns',

  // Important behavior details
  'async',
  'generator',
  'default',
  'defaultvalue',
  'enum',
  'augments',
  'extends',
  'throws',
  'exception',
  'yield',
  'yields',
  'event',
  'fires',
  'emits',
  'listens',
  'this',

  // Access
  'static',
  'private',
  'protected',
  'public',
  'access',
  'package',

  '-other',

  // Supplementary descriptions
  'see',
  'example',

  // METADATA

  // Other Closure (undocumented) metadata
  'closurePrimitive',
  'customElement',
  'expose',
  'hidden',
  'idGenerator',
  'meaning',
  'ngInject',
  'owner',
  'wizaction',

  // Other Closure (documented) metadata
  'define',
  'dict',
  'export',
  'externs',
  'implicitCast',
  'noalias',
  'nocollapse',
  'nocompile',
  'noinline',
  'nosideeffects',
  'polymer',
  'polymerBehavior',
  'preserve',
  'struct',
  'suppress',
  'unrestricted',

  // @homer0/prettier-plugin-jsdoc metadata
  'category',

  // Non-Closure metadata
  'ignore',
  'author',
  'version',
  'variation',
  'since',
  'deprecated',
  'todo',
]}];
```

##### `alphabetizeExtras`

Defaults to `false`. Alphabetizes any items not within `tagSequence` after any
items within `tagSequence` (or in place of the special `-other` pseudo-tag)
are sorted.

If you want all your tags alphabetized, you can supply an empty array for
`tagSequence` along with setting this option to `true`.

##### `linesBetween`

Indicates the number of lines to be added between tag groups. Defaults to 1.
Do not set to 0 or 2+ if you are using `tag-lines` and `"always"` and do not
set to 1+ if you are using `tag-lines` and `"never"`.

##### `reportTagGroupSpacing`

Whether to enable reporting and fixing of line breaks between tag groups
as set by `linesBetween`. Defaults to `true`. Note that the very last tag
will not have spacing applied regardless. For adding line breaks there, you
may wish to use the `endLines` option of the `tag-lines` rule.

##### `reportIntraTagGroupSpacing`

Whether to enable reporting and fixing of line breaks within tags of a given
tag group. Defaults to `true` which will remove any line breaks at the end of
such tags. Do not use with `true` if you are using `tag-lines` and `always`.

|||
|---|---|
|Context|everywhere|
|Tags|any|
|Recommended|false|
|Settings||
|Options|`tagSequence`, `alphabetizeExtras`, `linesBetween`, `reportTagGroupSpacing`, `reportIntraTagGroupSpacing`|

<!-- assertions sortTags -->
