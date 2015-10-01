### `require-param-types`

The following patterns are considered problems:

```js
/**
 * @param foo
 */
function quux () {

}
```

The following patterns are not considered problems:

```js
/**
 * @param {String} foo
 */
function quux () {

}
```
