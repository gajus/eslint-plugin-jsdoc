### `check-alignment`

Reports invalid alignment of JSDoc block lines. This is a
[standard recommended to WordPress code](https://make.wordpress.org/core/handbook/best-practices/inline-documentation-standards/javascript/#aligning-comments), for example.

|||
|---|---|
|Context|everywhere|
|Tags|`param`, `arg`, `argument`, `property`, `prop`|

The following patterns are considered problems:

````js
/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int} sit Description multi words.
 */
const fn = ( lorem, sit ) => {}
// Message: Expected JSDoc block lines to be aligned.

/**
 * My object.
 *
 * @typedef {Object} MyObject
 *
 * @property {string} lorem Description.
 * @property {int} sit Description multi words.
 */
// Message: Expected JSDoc block lines to be aligned.

The following patterns are not considered problems:

````js
/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int}    sit   Description multi words.
 */
const fn = ( lorem, sit ) => {}

/**
 * My object.
 *
 * @typedef {Object} MyObject
 *
 * @property {string} lorem Description.
 * @property {int}    sit   Description multi words.
 */
````
