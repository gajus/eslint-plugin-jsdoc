<a name="user-content-require-property-name"></a>
<a name="require-property-name"></a>
# <code>require-property-name</code>

* [Context and settings](#user-content-require-property-name-context-and-settings)
* [Failing examples](#user-content-require-property-name-failing-examples)
* [Passing examples](#user-content-require-property-name-passing-examples)


Requires that all `@property` tags have names.

<a name="user-content-require-property-name-context-and-settings"></a>
<a name="require-property-name-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`property`|
|Aliases|`prop`|
|Recommended|true|

<a name="user-content-require-property-name-failing-examples"></a>
<a name="require-property-name-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @typedef {SomeType} SomeTypedef
 * @property
 */
// Message: There must be an identifier after @property type.

/**
 * @typedef {SomeType} SomeTypedef
 * @property {string}
 */
// Message: There must be an identifier after @property tag.

/**
 * @typedef {SomeType} SomeTypedef
 * @property foo
 */
// Settings: {"jsdoc":{"tagNamePreference":{"property":false}}}
// Message: Unexpected tag `@property`
````



<a name="user-content-require-property-name-passing-examples"></a>
<a name="require-property-name-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @typedef {SomeType} SomeTypedef
 * @property foo
 */

/**
 * @typedef {SomeType} SomeTypedef
 * @property {string} foo
 */

/**
 * @namespace {SomeType} SomeName
 * @property {string} foo
 */

/**
 * @class
 * @property {string} foo
 */
````

