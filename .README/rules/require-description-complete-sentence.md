### `require-description-complete-sentence`

Requires that block description, explicit `@description`, and `@param`/`@returns`
tag descriptions are written in complete sentences, i.e.,

* Description must start with an uppercase alphabetical character.
* Paragraphs must start with an uppercase alphabetical character.
* Sentences must end with a period.
* Every line in a paragraph (except the first) which starts with an uppercase
  character must be preceded by a line ending with a period.

|||
|---|---|
|Context|everywhere|
|Tags|`param`, `returns`, `description`|
|Aliases|`arg`, `argument`, `return`, `desc`|

<!-- assertions requireDescriptionCompleteSentence -->
