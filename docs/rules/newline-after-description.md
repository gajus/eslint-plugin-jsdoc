<a name="newline-after-description"></a>
# <code>newline-after-description</code>

* [`newline-after-description`](#newline-after-description)
    * [Options](#newline-after-description-options)
    * [Fixer](#newline-after-description-fixer)
    * [Context and settings](#newline-after-description-context-and-settings)
    * [Failing examples](#newline-after-description-failing-examples)
    * [Passing examples](#newline-after-description-passing-examples)


Enforces a consistent padding of the block description.

<a name="newline-after-description-options"></a>
## Options

This rule allows one optional string argument. If it is `"always"` then a problem is raised when there is no newline after the description. If it is `"never"` then a problem is raised when there is a newline after the description. The default value is `"always"`.

<a name="newline-after-description-fixer"></a>
## Fixer

(Todo)

<a name="newline-after-description-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Options|(a string matching `"always"|"never"`)|
|Tags|N/A (doc block)|

<a name="newline-after-description-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * Foo.
 *
 * Foo.
 * @foo
 */
function quux () {

}
// Options: ["always"]
// Message: There must be a newline after the description of the JSDoc block.

/**
 * Foo.
 * @foo
 *
 * Foo.
 */
function quux () {

}
// Options: ["always"]
// Message: There must be a newline after the description of the JSDoc block.

/**
 * Foo.
 *
 * Foo.
 * @foo
 */
function quux () {

}
// Message: There must be a newline after the description of the JSDoc block.

/**
 * Bar.
 *
 * Bar.
 *
 * @bar
 */
function quux () {

}
// Options: ["never"]
// Message: There must be no newline after the description of the JSDoc block.

/**
 * Bar.
 *
 * @bar
 *
 * Bar.
 */
function quux () {

}
// Options: ["never"]
// Message: There must be no newline after the description of the JSDoc block.


         /**
          * Bar.
          *
          * Bar.
          *
          * @bar
          */
         function quux () {

         }
// Options: ["never"]
// Message: There must be no newline after the description of the JSDoc block.

/**
 * A.
 *
 * @typedef {object} A
 * @prop {boolean} a A.
 */
// Options: ["never"]
// Message: There must be no newline after the description of the JSDoc block.

/**
 * A.
 * @typedef {object} A
 * @prop {boolean} a A.
 */
// Options: ["always"]
// Message: There must be a newline after the description of the JSDoc block.


     /**
      * Service for fetching symbols.
      * @param {object} $http - Injected http helper.
      * @param {object} $q - Injected Promise api helper.
      * @param {object} $location - Injected window location object.
      * @param {object} REPORT_DIALOG_CONSTANTS - Injected handle.
      */
// Message: There must be a newline after the description of the JSDoc block.
````


<a name="newline-after-description-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * Foo.
 */
function quux () {

}
// Options: ["always"]

/**
 * Bar.
 */
function quux () {

}
// Options: ["never"]

/**
 * Foo.
 *
 * @foo
 */
function quux () {

}
// Options: ["always"]

/**
 * Bar.
 * @bar
 */
function quux () {

}
// Options: ["never"]


     /**
      * @foo
      * Test 
      * abc 
      * @bar 
      */


     /**
      * 
      * @foo
      * Test 
      * abc 
      * @bar 
      */

/***
 *
 */
function quux () {

}
// Options: ["always"]

/**
 * Parses query string to object containing URL parameters
 * 
 * @param queryString
 * Input string
 * 
 * @returns
 * Object containing URL parameters
 */
export function parseQueryString(queryString: string): { [key: string]: string } {    // <-- Line 10 that fails

}
````

