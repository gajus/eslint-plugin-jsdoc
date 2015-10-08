### `check-types`

Reports invalid types. Ensures that case of natives is the same as in this list:

```
boolean
number
string
Object
Array
Date
RegExp
```

The following patterns are considered problems:

```js
/**
 * @param {Boolean} foo
 */
function quux (foo) {

}

/**
 * @param {date} foo
 */
function quux (foo) {

}
```

The following patterns are not considered problems:

```js
/**
 * @param {boolean} foo
 */
function quux (foo) {

}

/**
 * @param {Date} foo
 */
function quux (foo) {

}

/**
 * @typedef foo~bar
 */

/**
 * @param {foo~bar} bar
 */
function quux (foo) {

}
```