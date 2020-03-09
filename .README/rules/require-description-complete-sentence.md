### `require-description-complete-sentence`

{"gitdown": "contents", "rootId": "require-description-complete-sentence"}

Requires that block description, explicit `@description`, and `@param`/`@returns`
tag descriptions are written in complete sentences, i.e.,

* Description must start with an uppercase alphabetical character.
* Paragraphs must start with an uppercase alphabetical character.
* Sentences must end with a period.
* Every line in a paragraph (except the first) which starts with an uppercase
  character must be preceded by a line ending with a period.
* A colon or semi-colon followed by two line breaks is still part of the
  containing paragraph (unlike normal dual line breaks).
* Text within inline tags `{...}` are not checked for sentence divisions.
* Periods after items within the `abbreviations` option array are not treated
  as sentence endings.

#### Options

##### `tags`

If you want additional tags to be checked for their descriptions, you may
add them within this option.

```js
{
  'jsdoc/require-description-complete-sentence': ['error', {tags: ['see', 'copyright']}]
}
```

The tags `@param`/`@arg`/`@argument` and `@property`/`@prop` will be properly
parsed to ensure that the checked "description" text includes only the text
after the name.

All other tags will treat the text following the tag name, a space, and
an optional curly-bracketed type expression (and another space) as part of
its "description" (e.g., for `@returns {someType} some description`, the
description is `some description` while for `@some-tag xyz`, the description
is `xyz`).

##### `abbreviations`

You can provide an `abbreviations` options array to avoid such strings of text
being treated as sentence endings when followed by dots. The `.` is not
necessary at the end of the array items.

|||
|---|---|
|Context|everywhere|
|Tags|doc block, `param`, `returns`, `description`, `property`, `summary`, `file`, `classdesc`, `todo`, `deprecated`, `throws`, 'yields' and others added by `tags`|
|Aliases|`arg`, `argument`, `return`, `desc`, `prop`, `fileoverview`, `overview`, `exception`, `yield`|
|Options|`tags`, `abbreviations`|
<!-- assertions requireDescriptionCompleteSentence -->
