### `no-multi-asterisks`

Prevents use of multiple asterisks at the beginning of lines.

Note that if you wish to prevent multiple asterisks at the very beginning of
the jsdoc block, you should use `no-bad-blocks` (as that is not proper jsdoc
and that rule is for catching blocks which only seem like jsdoc).

#### Options

##### `preventAtMiddleLines` (defaults to `true`)

Prevent the likes of this:

```js
/**
 *
 **
 */
```

##### `preventAtEnd` (defaults to `true`)

Prevent the likes of this:

```js
/**
 *
 *
 **/
```

|||
|---|---|
|Context|everywhere|
|Tags|(any)|
|Recommended|true|
|Settings||
|Options|`preventAtEnd`, `preventAtMiddleLines`|

<!-- assertions noMultiAsterisks -->
