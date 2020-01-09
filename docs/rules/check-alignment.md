<a name="check-alignment"></a>
# <code>check-alignment</code>

* [`check-alignment`](#check-alignment)
    * [Fixer](#check-alignment-fixer)
    * [Context and settings](#check-alignment-context-and-settings)
    * [Failing examples](#check-alignment-failing-examples)
    * [Passing examples](#check-alignment-passing-examples)


Reports invalid alignment of JSDoc block asterisks.

<a name="check-alignment-fixer"></a>
## Fixer

Fixes alignment.

<a name="check-alignment-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|N/A|

<a name="check-alignment-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
  * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// Message: Expected JSDoc block to be aligned.

/**
  * @param {Number} foo
 */
function quux (foo) {
	// with tabs
}
// Message: Expected JSDoc block to be aligned.

/**
  * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// Message: Expected JSDoc block to be aligned.

/**
* @param {Number} foo
*/
function quux (foo) {
  // with spaces
}
// Message: Expected JSDoc block to be aligned.

/**
 * @param {Number} foo
  */
function quux (foo) {

}
// Message: Expected JSDoc block to be aligned.

 /**
 * @param {Number} foo
 */
function quux (foo) {

}
// Message: Expected JSDoc block to be aligned.

 /**
  * @param {Number} foo
 */
function quux (foo) {

}
// Message: Expected JSDoc block to be aligned.

/**
  * @param {Number} foo
  */
 function quux (foo) {

 }
// Message: Expected JSDoc block to be aligned.

/**
   * A jsdoc not attached to any node.
 */
// Message: Expected JSDoc block to be aligned.

class Foo {
  /**
   *  Some method
    * @param a
   */
  quux(a) {}
}
// Message: Expected JSDoc block to be aligned.
````


<a name="check-alignment-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * Desc
 *
 * @param {Number} foo
 */
function quux (foo) {

}

/**
 * Desc
 *
 * @param {{
  foo: Bar,
  bar: Baz
 * }} foo
 *
 */
function quux (foo) {

}

/*  <- JSDoc must start with 2 stars.
  *    So this is unchecked.
 */
function quux (foo) {}

/**
  * @param {Number} foo
  * @private
 */
function quux (foo) {
  // with spaces
}
// Settings: {"jsdoc":{"ignorePrivate":true}}

/**
  * @param {Number} foo
  * @access private
 */
function quux (foo) {
  // with spaces
}
// Settings: {"jsdoc":{"ignorePrivate":true}}
````

