# `check-indentation`

{"gitdown": "contents", "rootId": "check-indentation"}

Reports invalid padding inside JSDoc blocks.

Ignores parts enclosed in Markdown "code block"'s. For example,
the following description is not reported:

```js
/**
 * Some description:
 * ```html
 * <section>
 *   <title>test</title>
 * </section>
 * ```
 */
```

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|false|
|Options|`excludeTags`|

## Failing examples

<!-- assertions-failing checkIndentation -->

## Passing examples

<!-- assertions-passing checkIndentation -->
