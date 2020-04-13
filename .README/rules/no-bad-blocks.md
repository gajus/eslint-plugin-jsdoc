### `no-bad-blocks`

{"gitdown": "contents", "rootId": "eslint-plugin-jsdoc-rules-no-bad-blocks"}

This rule checks for multi-line-style comments which fail to meet the
criteria of a jsdoc block, namely that it should begin with two asterisks,
but which appear to be intended as jsdoc blocks due to the presence
of whitespace followed by whitespace or asterisks, and
an at-sign (`@`) and some non-whitespace (as with a jsdoc block tag).

#### Fixer

Adds the extra asterisk (i.e., from `/*` to `/**`).

#### Context and settings

|||
|---|---|
|Context|Everywhere|
|Tags|N/A|

#### Failing examples

<!-- assertions-failing noBadBlocks -->

#### Passing examples

<!-- assertions-passing noBadBlocks -->
