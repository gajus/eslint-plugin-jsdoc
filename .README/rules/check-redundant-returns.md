### `check-redundant-returns`

Report statements for functions with no return.

The following patterns are considered problems:

```js
/**
 * @returns {String}
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
    return 'corge';
}
```
