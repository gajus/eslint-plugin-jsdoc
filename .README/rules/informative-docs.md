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

{"gitdown": "options"}

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
