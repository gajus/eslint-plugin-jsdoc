# `require-file-overview`

{"gitdown": "contents", "rootId": "require-file-overview"}

Checks that:

1. All files have a `@file`, `@fileoverview`, or `@overview` tag.
2. Duplicate file overview tags within a given file will be reported
3. File overview tags will be reported which are not, as per
  [the docs](https://jsdoc.app/tags-file.html), "at the beginning of
  the file"–where beginning of the file is interpreted in this rule
  as being when the overview tag is not preceded by anything other than
  a comment.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|Everywhere|
|Tags|`file`; others when `tags` set|
|Aliases|`fileoverview`, `overview`|
|Recommended|false|
|Options|`tags`|

## Failing examples

<!-- assertions-failing requireFileOverview -->

## Passing examples

<!-- assertions-passing requireFileOverview -->
