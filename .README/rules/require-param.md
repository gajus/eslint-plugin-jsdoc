### `require-param`

Ensures all parameters are documented.

The following patterns are considered problems:

```js
/**
 *
 */
function quux (foo) {

}
```

The following patterns are not considered problems:

```js
/**
 * @param {string} foo
 */
function quux (foo) {

}
```
