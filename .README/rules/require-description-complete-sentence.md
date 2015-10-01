### `require-description-complete-sentence`

Ensures a doc comment description is a complete sentence.

A complete sentence is defined as starting with an upper case letter and ending with a period.

The following patterns are considered problems:

```js
/**
 * Description
 * On multiple lines.
 *
 * @param {string} foo
 */
function quux (foo) {

}

/**
 * Description
 * @param {string} foo
 */
function quux (foo) {

}

/**
 * description starting with a lower case letter.
 * @param {string} foo
 */
function quux (foo) {

}

/**
 * Description period is offset .
 * @param {string} foo
 */
function quux (foo) {

}

/**
 * Description!
 * @param {string} foo
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

/**
 * Description.
 */
function quux () {

}

/**
 * (Description).
 */
function quux () {

}

/**
 * Description.
 *
 * @param {string} foo
 */
function quux (foo) {

}
```
