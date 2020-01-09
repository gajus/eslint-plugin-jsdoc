<a name="require-property-type"></a>
# <code>require-property-type</code>

* [`require-property-type`](#require-property-type)
    * [Context and settings](#require-property-type-context-and-settings)
    * [Failing examples](#require-property-type-failing-examples)
    * [Passing examples](#require-property-type-passing-examples)


Requires that each `@property` tag has a type value (within curly brackets).

<a name="require-property-type-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`property`|
|Aliases|`prop`|

<a name="require-property-type-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @typedef {SomeType} SomeTypedef
 * @property foo
 */
// Message: Missing JSDoc @property "foo" type.

/**
 * @typedef {SomeType} SomeTypedef
 * @prop foo
 */
// Settings: {"jsdoc":{"tagNamePreference":{"property":"prop"}}}
// Message: Missing JSDoc @prop "foo" type.

/**
 * @typedef {SomeType} SomeTypedef
 * @property foo
 */
// Settings: {"jsdoc":{"tagNamePreference":{"property":false}}}
// Message: Unexpected tag `@property`
````


<a name="require-property-type-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @typedef {SomeType} SomeTypedef
 */

/**
 * @typedef {SomeType} SomeTypedef
 * @property {number} foo
 */

/**
 * @namespace {SomeType} SomeName
 * @property {number} foo
 */

/**
 * @class
 * @property {number} foo
 */
````

