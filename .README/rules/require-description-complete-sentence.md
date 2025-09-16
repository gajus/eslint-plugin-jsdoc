# `require-description-complete-sentence`

{"gitdown": "contents", "rootId": "require-description-complete-sentence"}

Requires that block description, explicit `@description`, and
`@param`/`@returns` tag descriptions are written in complete sentences, i.e.,

* Description must start with an uppercase alphabetical character.
* Paragraphs must start with an uppercase alphabetical character.
* Sentences must end with a period, question mark, exclamation mark, or triple backticks.
* Every line in a paragraph (except the first) which starts with an uppercase
  character must be preceded by a line ending with a period.
* A colon or semi-colon followed by two line breaks is still part of the
  containing paragraph (unlike normal dual line breaks).
* Text within inline tags `{...}` or within triple backticks are not checked for sentence divisions.
* Periods after items within the `abbreviations` option array are not treated
  as sentence endings.

## Fixer

If sentences do not end with terminal punctuation, a period will be added.

If sentences do not start with an uppercase character, the initial
letter will be capitalized.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|doc block, `param`, `returns`, `description`, `property`, `summary`, `file`, `classdesc`, `todo`, `deprecated`, `throws`, 'yields' and others added by `tags`|
|Aliases|`arg`, `argument`, `return`, `desc`, `prop`, `fileoverview`, `overview`, `exception`, `yield`|
|Recommended|false|
|Options|`abbreviations`, `newlineBeforeCapsAssumesBadSentenceEnd`, `tags`|

## Failing examples

<!-- assertions-failing requireDescriptionCompleteSentence -->

## Passing examples

<!-- assertions-passing requireDescriptionCompleteSentence -->
