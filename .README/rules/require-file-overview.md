### `require-file-overview`

Checks that:

1. All files have a `@file`, `@fileoverview`, or `@overview` tag.
2. Duplicate file overview tags within a given file will be reported
3. File overview tags will be reported which are not, as per
  [the docs](https://jsdoc.app/tags-file.html), "at the beginning of
  the file"–where beginning of the file is interpreted in this rule
  as being when the overview tag is not preceded by anything other than
  a comment.

#### Fixer

The fixer for `require-example` will add an empty `@file`. Note that if you
need to report a missing description for `file`, you can add `file` on
the `tags` option with `match-description` (and the `contexts` option
set to "any").

|||
|---|---|
|Context|Everywhere|
|Tags|`file`|
|Aliases|`fileoverview`, `overview`|

<!-- assertions requireFileOverview -->
