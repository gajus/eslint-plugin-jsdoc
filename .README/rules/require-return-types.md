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
 * @returns {String}
 */
function quux () {

}

/**
 * no @return
 */
function quux () {

}
```
