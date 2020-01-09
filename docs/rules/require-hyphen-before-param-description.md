<a name="require-hyphen-before-param-description"></a>
# <code>require-hyphen-before-param-description</code>

* [`require-hyphen-before-param-description`](#require-hyphen-before-param-description)
    * [Options](#require-hyphen-before-param-description-options)
    * [Fixer](#require-hyphen-before-param-description-fixer)
    * [Context and settings](#require-hyphen-before-param-description-context-and-settings)
    * [Failing examples](#require-hyphen-before-param-description-failing-examples)
    * [Passing examples](#require-hyphen-before-param-description-passing-examples)


Requires a hyphen before the `@param` description.

<a name="require-hyphen-before-param-description-options"></a>
## Options

This rule takes one optional string argument and an optional options object.

If the string is `"always"` then a problem is raised when there is no hyphen
before the description. If it is `"never"` then a problem is raised when there
is a hyphen before the description. The default value is `"always"`.

The options object may have the following properties:

- `checkProperties` - Boolean on whether to also apply the rule to `@property`
  tags.

<a name="require-hyphen-before-param-description-fixer"></a>
## Fixer

(Todo)

<a name="require-hyphen-before-param-description-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`param` and optionally `property`|
|Aliases|`arg`, `argument`; optionally `prop`|
|Options|(a string matching `"always"|"never"`) and an optional object with a `checkProperties` property|

<a name="require-hyphen-before-param-description-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @param foo Foo.
 */
function quux () {

}
// Options: ["always"]
// Message: There must be a hyphen before @param description.

/**
 * @param foo Foo.
 */
function quux () {

}
// Message: There must be a hyphen before @param description.

/**
 * @param foo - Foo.
 */
function quux () {

}
// Options: ["never"]
// Message: There must be no hyphen before @param description.

/**
 * @param foo - foo
 * @param foo foo
 */
function quux () {

}
// Options: ["always"]
// Message: There must be a hyphen before @param description.

/**
 * @param foo foo
 * bar
 * @param bar - bar
 */
function quux () {

}
// Options: ["always"]
// Message: There must be a hyphen before @param description.

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`

/**
 * @typedef {SomeType} ATypeDefName
 * @property foo Foo.
 */
// Options: ["always",{"checkProperties":true}]
// Message: There must be a hyphen before @property description.

/**
 * @typedef {SomeType} ATypeDefName
 * @property foo - Foo.
 */
// Options: ["never",{"checkProperties":true}]
// Message: There must be no hyphen before @property description.
````


<a name="require-hyphen-before-param-description-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @param foo - Foo.
 */
function quux () {

}
// Options: ["always"]

/**
 * @param foo Foo.
 */
function quux () {

}
// Options: ["never"]

/**
 * @param foo
 */
function quux () {

}

/**
 * @typedef {SomeType} ATypeDefName
 * @property foo - Foo.
 */
// Options: ["always",{"checkProperties":true}]

/**
 * @typedef {SomeType} ATypeDefName
 * @property foo Foo.
 */
// Options: ["never",{"checkProperties":true}]
````

