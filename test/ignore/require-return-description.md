### `require-return-description`

Ensures a return description exists.

The following patterns are considered problems:

```js
/**
 * @returns {Boolean}
 */
function fn () {
    return false;
}
```

The following patterns are not considered problems:

```js
/**
 * @returns {Boolean} Method result.
 */
function fn () {
    return false;
}

/**
 * @returns {String} method result
 */
function fn () {
    return 'Foo.';
}
```
