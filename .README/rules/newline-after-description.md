### `newline-after-description`

Enforces consistent padding of doc comment description.

This rule takes one argument. If it is `"always"` then a problem is raised when there is a newline after description. If it is `"never"` then a problem is raised when there is no newline after the description. The default value is `"always"`.

The following patterns are considered problems when configured `"never"`:

```js
/**
 * Description
 *
 * @param {string} foo
 */
function quux (foo) {

}
```

The following patterns are not considered problems when configured `"never"`:

```js
/**
 * @param {string} foo
 */
function quux (foo) {

}

/**
 * Description
 */
function quux () {

}

/**
 * Description
 * @param {string} foo
 */
function quux (foo) {

}
```

The following patterns are considered problems when configured `"always"`:

```js
/**
 * Description
 * @param {string} foo
 */
function quux (foo) {

}
```

The following patterns are not considered problems when configured `"always"`:

```js
/**
 * @param {string} foo
 */
function quux (foo) {

}

/**
 * Description
 */
function quux () {

}

/**
 * Description
 *
 * @param {string} foo
 */
function quux (foo) {

}
```
