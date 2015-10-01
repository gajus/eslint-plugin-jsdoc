### `require-return-types`

Ensures returns in JSDoc contains type.

The following patterns are considered problems:

```js
/**
 * @returns
 */
function quux () {

}
```

The following patterns are not considered problems:

```js
/**
 * @returns {string}
 */
function quux () {

}

/**
 * no @returns
 */
function quux () {

}
```
