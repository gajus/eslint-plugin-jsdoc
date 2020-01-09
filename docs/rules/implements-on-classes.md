<a name="implements-on-classes"></a>
# <code>implements-on-classes</code>

* [`implements-on-classes`](#implements-on-classes)
    * [Options](#implements-on-classes-options)
        * [`contexts`](#implements-on-classes-options-contexts)
    * [Context and settings](#implements-on-classes-context-and-settings)
    * [Failing examples](#implements-on-classes-failing-examples)
    * [Passing examples](#implements-on-classes-passing-examples)


Reports an issue with any non-constructor function using `@implements`.

Constructor functions, whether marked with `@class`, `@constructs`, or being
an ES6 class constructor, will not be flagged.

To indicate that a function follows another function's signature, one might
instead use `@type` to indicate the `@function` or `@callback` to which the
funciton is adhering.

<a name="implements-on-classes-options"></a>
## Options

<a name="implements-on-classes-options-contexts"></a>
### <code>contexts</code>

Set this to an array of strings representing the AST context
where you wish the rule to be applied.
Overrides the default contexts (see below). Set to `"any"` if you want
the rule to apply to any jsdoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., `@callback` or `@function` (or its aliases `@func` or
`@method`) (including those associated with an `@interface`).

<a name="implements-on-classes-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`implements` (prevented)|
|Options|`contexts`|

<a name="implements-on-classes-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @implements {SomeClass}
 */
function quux () {

}
// Message: @implements used on a non-constructor function

/**
 * @implements {SomeClass}
 */
function quux () {

}
// Options: [{"contexts":["any"]}]
// Message: @implements used on a non-constructor function

/**
 * @function
 * @implements {SomeClass}
 */
function quux () {

}
// Options: [{"contexts":["any"]}]
// Message: @implements used on a non-constructor function

/**
 * @callback
 * @implements {SomeClass}
 */
// Options: [{"contexts":["any"]}]
// Message: @implements used on a non-constructor function

/**
 * @implements {SomeClass}
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"implements":false}}}
// Message: Unexpected tag `@implements`
````


<a name="implements-on-classes-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @implements {SomeClass}
 * @class
 */
function quux () {

}

/**
 * @implements {SomeClass}
 * @class
 */
function quux () {

}
// Options: [{"contexts":["any"]}]

/**
 * @implements {SomeClass}
 */
// Options: [{"contexts":["any"]}]

/**
 * @implements {SomeClass}
 * @constructor
 */
function quux () {

}

/**
 *
 */
class quux {
  /**
   * @implements {SomeClass}
   */
  constructor () {

  }
}

/**
 *
 */
const quux = class {
  /**
   * @implements {SomeClass}
   */
  constructor () {

  }
}

/**
 *
 */
function quux () {

}

/**
 *
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"implements":false}}}

/**
 * @function
 * @implements {SomeClass}
 */

/**
 * @callback
 * @implements {SomeClass}
 */
````

