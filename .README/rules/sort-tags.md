# `sort-tags`

{"gitdown": "contents", "rootId": "sort-tags"}

Sorts tags by a specified sequence according to tag name, optionally
adding line breaks between tag groups.

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

## Fixer

Sorts tags by a specified sequence according to tag name, optionally
adding line breaks between tag groups.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|any|
|Recommended|false|
|Settings||
|Options|`alphabetizeExtras`, `linesBetween`, `reportIntraTagGroupSpacing`, `reportTagGroupSpacing`, `tagExceptions`, `tagSequence`|

## Failing examples

<!-- assertions-failing sortTags -->

## Passing examples

<!-- assertions-passing sortTags -->
