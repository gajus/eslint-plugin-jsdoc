### `check-redundant-params`

Reports redundant params in JSDoc.

The following patterns are considered problems:

```js
/**
 * @param {String} foo
 */
function quux () {

}
```

The following patterns are not considered problems:

```js
/**
 * @param {String} foo
 */
function quux (foo) {

}
```
