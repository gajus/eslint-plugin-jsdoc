# enforce valid @access tag (check-access)

Only "package", "private", "protected", "public" is valid for `@access` tag. Using anything else is probably a mistake:

```js
/**
 * @access foo
 */
```

So is using `@access` tag or its synonyms multiple times:

```js
/**
 * @public
 * @access protected
 */
```

## Rule Details

|||
|---|---|
|Context|everywhere|
|Tags|`@access`|
|Settings||

This rule ensures that `@access` tags use one of the following values:

- package
- private
- protected
- public

This rule also flags usage of multiple instances of `@access` (including its synonyms, `@package`, `@private`, `@protected`, and `@public`) on the same doc block.

Examples of **incorrect** code for this rule:

```js
/*eslint jsdoc/check-access: "error"*/

/**
 * @access
 */
// Message: Missing valid JSDoc @access level.

/**
 * @access foo
 */
// Message: Missing valid JSDoc @access level.

/**
 * @access public
 * @public
 */
// Message: The @access tag may not be used with specific access-control tags (@package, @private, @protected, or @public).

/**
 * @access public
 * @access private
 */
// Message: At most one access-control tag may be present on a jsdoc block.

/**
 * @public
 * @private
 */
// Message: At most one access-control tag may be present on a jsdoc block.

/**
 * @public
 * @public
 */
// Message: At most one access-control tag may be present on a jsdoc block.

// Settings: {"jsdoc": {"tagNamePreference": {"access": "accessLevel"}}}
/**
 * @accessLevel foo
 */
// Message: Missing valid JSDoc @accessLevel level.

// Settings: {"jsdoc": {"tagNamePreference": {"access": false}}}
/**
 * @access public
 */
// Message: Unexpected tag `@access`

// Settings: {"jsdoc": {"ignorePrivate": true}}
/**
 * @access public
 * @access private
 */
// Message: At most one access-control tag may be present on a jsdoc block.

// Settings: {"jsdoc": {"ignorePrivate": true}}
/**
 * @public
 * @private
 */
// Message: At most one access-control tag may be present on a jsdoc block.
```

Examples of **correct** code for this rule:

```js
/**
 * @access public
 */

/**
 * @private
 */

/**
 * Access level is omitted.
 */

// Settings: {"jsdoc": {"tagNamePreference": {"access": "accessLevel"}}}
/**
 * @accessLevel package
 */
```
