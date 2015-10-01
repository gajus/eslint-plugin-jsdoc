### `check-redundant-returns`

Report statements for functions with no return.

The following patterns are considered problems:

```js
/**
 * @returns {string}
 */
function quux () {

}
```

The following patterns are not considered problems:

```js
/**
 * @returns {string}
 */
function quux () {
    return 'corge';
}
```
