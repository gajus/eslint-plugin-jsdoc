<a name="user-content-check-access"></a>
<a name="check-access"></a>
# <code>check-access</code>

* [Context and settings](#user-content-check-access-context-and-settings)
* [Failing examples](#user-content-check-access-failing-examples)
* [Passing examples](#user-content-check-access-passing-examples)


Checks that `@access` tags use one of the following values:

- "package", "private", "protected", "public"

Also reports:

- Mixing of `@access` with `@public`, `@private`, `@protected`, or `@package`
  on the same doc block.
- Use of multiple instances of `@access` (or the `@public`, etc. style tags)
  on the same doc block.

<a name="user-content-check-access-context-and-settings"></a>
<a name="check-access-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`@access`|
|Recommended|false|
|Settings||
|Options||

<a name="user-content-check-access-failing-examples"></a>
<a name="check-access-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @access foo
 */
function quux (foo) {

}
// Message: Missing valid JSDoc @access level.

/**
 * @access foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignorePrivate":true}}
// Message: Missing valid JSDoc @access level.

/**
 * @accessLevel foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"access":"accessLevel"}}}
// Message: Missing valid JSDoc @accessLevel level.

/**
 * @access
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"access":false}}}
// Message: Unexpected tag `@access`

class MyClass {
  /**
   * @access
   */
  myClassField = 1
}
// Message: Missing valid JSDoc @access level.

/**
 * @access public
 * @public
 */
function quux (foo) {

}
// Message: The @access tag may not be used with specific access-control tags (@package, @private, @protected, or @public).

/**
 * @access public
 * @access private
 */
function quux (foo) {

}
// Message: At most one access-control tag may be present on a jsdoc block.

/**
 * @access public
 * @access private
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignorePrivate":true}}
// Message: At most one access-control tag may be present on a jsdoc block.

/**
 * @public
 * @private
 */
function quux (foo) {

}
// Message: At most one access-control tag may be present on a jsdoc block.

/**
 * @public
 * @private
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignorePrivate":true}}
// Message: At most one access-control tag may be present on a jsdoc block.

/**
 * @public
 * @public
 */
function quux (foo) {

}
// Message: At most one access-control tag may be present on a jsdoc block.
````



<a name="user-content-check-access-passing-examples"></a>
<a name="check-access-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 *
 */
function quux (foo) {

}

/**
 * @access public
 */
function quux (foo) {

}

/**
 * @accessLevel package
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"access":"accessLevel"}}}

class MyClass {
  /**
   * @access private
   */
  myClassField = 1
}

/**
 * @public
 */
function quux (foo) {

}

/**
 * @private
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignorePrivate":true}}
````

