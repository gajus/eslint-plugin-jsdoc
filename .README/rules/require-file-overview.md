### `require-file-overview`

Requires that all files have a `@file`, `@fileoverview`, or `@overview` tag.

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
