### `require-param-description`

Ensures a param description exists.

The following patterns are considered problems:

```js
/**
 * @param {string} foo
 */
function quux (foo) {}

/**
 * @param foo
 */
function quux (foo) {

}
```

The following patterns are not considered problems:

```js
/**
 * @param {string} foo Foo.
 */
function quux (foo) {

}

/**
 * @param foo Foo.
 */
function quux (foo) {

}
```
