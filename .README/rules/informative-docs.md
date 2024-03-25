# `informative-docs`

{"gitdown": "contents", "rootId": "informative-docs"}

Reports on JSDoc texts that serve only to restate their attached name.

Devs sometimes write JSDoc descriptions that add no additional information just to fill out the doc:

```js
/** The user id. */
let userId;
```

Those "uninformative" docs comments take up space without being helpful.
This rule requires all docs comments contain at least one word not already in the code.

## Options

### `aliases`

The `aliases` option allows indicating words as synonyms (aliases) of each other.

For example, with `{ aliases: { emoji: ["smiley", "winkey"] } }`, the following comment would be considered uninformative:

```js
/** A smiley/winkey. */
let emoji;
```

The default `aliases` option is:

```json
{
  "a": ["an", "our"]
}
```

### `excludedTags`

Tags that should not be checked for valid contents.

For example, with `{ excludedTags: ["category"] }`, the following comment would not be considered uninformative:

```js
/** @category Types */
function computeTypes(node) {
  // ...
}

No tags are excluded by default.

### `uselessWords`

Words that are ignored when searching for one that adds meaning.

For example, with `{ uselessWords: ["our"] }`, the following comment would be considered uninformative:

```js
/** Our text. */
let text;
```

The default `uselessWords` option is:

```json
["a", "an", "i", "in", "of", "s", "the"]
```

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|any|
|Recommended|false|
|Settings||
|Options|`aliases`, `excludedTags`, `uselessWords`|

## Failing examples

<!-- assertions-failing informativeDocs -->

## Passing examples

<!-- assertions-passing informativeDocs -->
