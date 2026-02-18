# `tag-lines`

{"gitdown": "contents", "rootId": "tag-lines"}

Enforces lines (or no lines) between tags.

If you only want lines preceding all tags or after all tags, you can use
the "any" option along with `startLines` and/or `endLines`.

The "always" or "never" options of this rule should not
be used with the linebreak-setting options of the `sort-tags` rule as both
may try to impose a conflicting number of lines.

## Fixer

Removes or adds lines between tags or trailing tags.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|Any|
|Recommended|true|
|Settings|N/A|
|Options|string ("always", "any", "never") followed by object with `applyToEndTag`, `count`, `endLines`, `maxBlockLines`, `startLines`, `startLinesWithNoTags`, `tags`|

## Failing examples

<!-- assertions-failing tagLines -->

## Passing examples

<!-- assertions-passing tagLines -->
