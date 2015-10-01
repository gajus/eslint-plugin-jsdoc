### `check-param-names`

Ensures param names in JSDoc and in function declaration are equal.

The following patterns are considered problems:

```js
/**
 * @param foo
 * @param bar
 */
function quux (bar, foo) {

}

/**
 * @param foo
 */
function quux (bar) {

}
```

The following patterns are not considered problems:

```js
/**
 * @param foo
 * @param bar
 */
function quux (foo, bar) {

}

/**
 * @param foo
 */
function quux (foo) {

}
```
