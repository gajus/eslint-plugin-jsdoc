### `require-returns-description`

Ensures a `@returns` description exists.

The following patterns are considered problems:

```js
/**
 * @returns {string}
 */
function quux () {

}
```

The following patterns are not considered problems:

```js
/**
 * @returns {string} Quux.
 */
function quux () {

}
```
