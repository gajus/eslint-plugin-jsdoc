<a name="require-property-description"></a>
# <code>require-property-description</code>

* [`require-property-description`](#require-property-description)
    * [Context and settings](#require-property-description-context-and-settings)
    * [Failing examples](#require-property-description-failing-examples)
    * [Passing examples](#require-property-description-passing-examples)


Requires that each `@property` tag has a `description` value.

<a name="require-property-description-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`property`|
|Aliases|`prop`|

<a name="require-property-description-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @typedef {SomeType} SomeTypedef
 * @property foo
 */
// Message: Missing JSDoc @property "foo" description.

/**
 * @typedef {SomeType} SomeTypedef
 * @prop foo
 */
// Settings: {"jsdoc":{"tagNamePreference":{"property":"prop"}}}
// Message: Missing JSDoc @prop "foo" description.

/**
 * @typedef {SomeType} SomeTypedef
 * @property foo
 */
// Settings: {"jsdoc":{"tagNamePreference":{"property":false}}}
// Message: Unexpected tag `@property`
````


<a name="require-property-description-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @typedef {SomeType} SomeTypedef
 */

/**
 * @typedef {SomeType} SomeTypedef
 * @property foo Foo.
 */

/**
 * @namespace {SomeType} SomeName
 * @property foo Foo.
 */

/**
 * @class
 * @property foo Foo.
 */
````

