### `check-lines-alignment`

Reports invalid alignment of JSDoc block lines. This is a
[standard recommended to WordPress code](https://make.wordpress.org/core/handbook/best-practices/inline-documentation-standards/javascript/#aligning-comments), for example.

#### Options

This rule allows one optional string argument. If it is `"always"` then a
problem is raised when the lines are not aligned. If it is `"never"` then
a problem should be raised when there is more than one space between the
lines parts. Only the non-default `"always"` is implemented for now.

|||
|---|---|
|Context|everywhere|
|Options|(a string matching `"always"|"never"`)|
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
// Options: ["always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * My object.
 *
 * @typedef {Object} MyObject
 *
 * @property {string} lorem Description.
 * @property {int} sit Description multi words.
 */
// Options: ["always"]
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
// Options: ["always"]

/**
 * My object.
 *
 * @typedef {Object} MyObject
 *
 * @property {string} lorem Description.
 * @property {int}    sit   Description multi words.
 */
// Options: ["always"]
````
