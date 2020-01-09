<a name="require-property"></a>
# <code>require-property</code>

* [`require-property`](#require-property)
    * [Fixer](#require-property-fixer)
    * [Context and settings](#require-property-context-and-settings)
    * [Failing examples](#require-property-failing-examples)
    * [Passing examples](#require-property-passing-examples)


Requires that all `@typedef` and `@namespace` tags have `@property`
tags when their type is a plain `object`, `Object`, or `PlainObject`.

Note that if any other type, including a subtype of object such as
`object<string, string>`, will not be reported.

<a name="require-property-fixer"></a>
## Fixer

The fixer for `require-example` will add an empty `@property`.

<a name="require-property-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|Everywhere|
|Tags|`property` (relates to presence of `typedef` or `namespace`)|
|Aliases|`prop`|

<a name="require-property-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @typedef {object} SomeTypedef
 */
// Message: Missing JSDoc @property.

/**
 * @typedef {PlainObject} SomeTypedef
 */
// Settings: {"jsdoc":{"tagNamePreference":{"property":"prop"}}}
// Message: Missing JSDoc @prop.

/**
 * @namespace {Object} SomeName
 */
// Message: Missing JSDoc @property.
````


<a name="require-property-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 *
 */

/**
 * @property
 */

/**
 * @typedef {Object} SomeTypedef
 * @property {SomeType} propName Prop description
 */

/**
 * @typedef {object} SomeTypedef
 * @prop {SomeType} propName Prop description
 */
// Settings: {"jsdoc":{"tagNamePreference":{"property":"prop"}}}

/**
 * @typedef {object} SomeTypedef
 * @property
 * // arbitrary property content
 */

/**
 * @typedef {object<string, string>} SomeTypedef
 */

/**
 * @typedef {string} SomeTypedef
 */

/**
 * @namespace {object} SomeName
 * @property {SomeType} propName Prop description
 */

/**
 * @namespace {object} SomeName
 * @property
 * // arbitrary property content
 */

/**
 * @typedef {object} SomeTypedef
 * @property someProp
 * @property anotherProp This with a description
 * @property {anotherType} yetAnotherProp This with a type and desc.
 */
function quux () {

}
````

