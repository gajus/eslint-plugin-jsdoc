### `no-multi-asterisks`

{"gitdown": "contents", "rootId": "no-multi-asterisks"}

Prevents use of multiple asterisks at the beginning of lines.

Note that if you wish to prevent multiple asterisks at the very beginning of
the jsdoc block, you should use `no-bad-blocks` (as that is not proper jsdoc
and that rule is for catching blocks which only seem like jsdoc).

## Fixer

(TODO)

## Options

### `allowWhitespace` (defaults to `false`)

Set to `true` if you wish to allow asterisks after a space (as with Markdown):

```js
/**
 * *bold* text
 */
```

### `preventAtMiddleLines` (defaults to `true`)

Prevent the likes of this:

```js
/**
 *
 **
 */
```

### `preventAtEnd` (defaults to `true`)

Prevent the likes of this:

```js
/**
 *
 *
 **/
```

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|(Any)|
|Recommended|true|
|Settings||
|Options|`allowWhitespace`, `preventAtEnd`, `preventAtMiddleLines`|

## Failing examples

<!-- assertions-failing noMultiAsterisks -->

## Passing examples

<!-- assertions-passing noMultiAsterisks -->
