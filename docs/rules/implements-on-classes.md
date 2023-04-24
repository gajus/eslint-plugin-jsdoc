<a name="user-content-implements-on-classes"></a>
<a name="implements-on-classes"></a>
### <code>implements-on-classes</code>

Reports an issue with any non-constructor function using `@implements`.

Constructor functions, whether marked with `@class`, `@constructs`, or being
an ES6 class constructor, will not be flagged.

To indicate that a function follows another function's signature, one might
instead use `@type` to indicate the `@function` or `@callback` to which the
function is adhering.

<a name="user-content-implements-on-classes-options"></a>
<a name="implements-on-classes-options"></a>
#### Options

<a name="user-content-implements-on-classes-options-contexts"></a>
<a name="implements-on-classes-options-contexts"></a>
##### <code>contexts</code>

Set this to an array of strings representing the AST context (or an object with
`context` and `comment` properties) where you wish the rule to be applied.

Overrides the default contexts (see below). Set to `"any"` if you want
the rule to apply to any jsdoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., `@callback` or `@function` (or its aliases `@func` or
`@method`) (including those associated with an `@interface`).

See the ["AST and Selectors"](#user-content-eslint-plugin-jsdoc-advanced-ast-and-selectors)
section of our README for more on the expected format.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`implements` (prevented)|
|Recommended|true|
|Options|`contexts`|

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
// "jsdoc/implements-on-classes": ["error"|"warn", {"contexts":["any"]}]
// Message: @implements used on a non-constructor function

/**
 * @function
 * @implements {SomeClass}
 */
function quux () {

}
// "jsdoc/implements-on-classes": ["error"|"warn", {"contexts":["any"]}]
// Message: @implements used on a non-constructor function

/**
 * @callback
 * @implements {SomeClass}
 */
// "jsdoc/implements-on-classes": ["error"|"warn", {"contexts":["any"]}]
// Message: @implements used on a non-constructor function

/**
 * @implements {SomeClass}
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"implements":false}}}
// Message: Unexpected tag `@implements`

class Foo {
    /**
     * @implements {SomeClass}
     */
    constructor() {}

    /**
     * @implements {SomeClass}
     */
    bar() {}
}
// "jsdoc/implements-on-classes": ["error"|"warn", {"contexts":["MethodDefinition"]}]
// Message: @implements used on a non-constructor function

class Foo {
    /**
     * @implements {SomeClass}
     */
    constructor() {}

    /**
     * @implements {SomeClass}
     */
    bar() {}
}
// "jsdoc/implements-on-classes": ["error"|"warn", {"contexts":["any"]}]
// Message: @implements used on a non-constructor function
````

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
// "jsdoc/implements-on-classes": ["error"|"warn", {"contexts":["any"]}]

/**
 * @implements {SomeClass}
 */
// "jsdoc/implements-on-classes": ["error"|"warn", {"contexts":["any"]}]

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

