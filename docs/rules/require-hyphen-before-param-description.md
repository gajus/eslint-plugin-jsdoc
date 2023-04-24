<a name="user-content-require-hyphen-before-param-description"></a>
<a name="require-hyphen-before-param-description"></a>
### <code>require-hyphen-before-param-description</code>

Requires (or disallows) a hyphen before the `@param` description.

<a name="user-content-require-hyphen-before-param-description-options"></a>
<a name="require-hyphen-before-param-description-options"></a>
#### Options

This rule takes one optional string argument and an optional options object.

If the string is `"always"` then a problem is raised when there is no hyphen
before the description. If it is `"never"` then a problem is raised when there
is a hyphen before the description. The default value is `"always"`.

The options object may have the following properties to indicate behavior for
other tags besides the `@param` tag (or the `@arg` tag if so set):

- `tags` - Object whose keys indicate different tags to check for the
  presence or absence of hyphens; the key value should be "always" or "never",
  indicating how hyphens are to be applied, e.g., `{property: 'never'}`
  to ensure `@property` never uses hyphens. A key can also be set as `*`, e.g.,
  `'*': 'always'` to apply hyphen checking to any tag (besides the preferred
  `@param` tag which follows the main string option setting and besides any
  other `tags` entries).

|||
|---|---|
|Context|everywhere|
|Tags|`param` and optionally other tags within `tags`|
|Aliases|`arg`, `argument`; potentially `prop` or other aliases|
|Recommended|false|
|Options|a string matching `"always" or "never"` followed by an optional object with a `tags` property|

## Failing examples

The following patterns are considered problems:

````js
/**
 * @param foo Foo.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always"]
// Message: There must be a hyphen before @param description.

/**
 * @param foo Foo.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"*":"never"}}]
// Message: There must be a hyphen before @param description.

/**
 * @param foo Foo.
 * @returns {SomeType} - Hyphen here.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"*":"never","returns":"always"}}]
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
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "never"]
// Message: There must be no hyphen before @param description.

/**
 * @param foo    - Foo.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "never"]
// Message: There must be no hyphen before @param description.

/**
 * @param foo - foo
 * @param foo foo
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always"]
// Message: There must be a hyphen before @param description.

/**
 * @param foo foo
 * bar
 * @param bar - bar
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always"]
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
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"property":"always"}}]
// Message: There must be a hyphen before @property description.

/**
 * @template TempA, TempB A desc.
 */
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"template":"always"}}]
// Message: There must be a hyphen before @template description.

/**
 * @typedef {SomeType} ATypeDefName
 * @property foo - Foo.
 */
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "never",{"tags":{"property":"never"}}]
// Message: There must be no hyphen before @property description.

/**
 * @param foo Foo.
 * @returns {SomeType} - A description.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"returns":"never"}}]
// Message: There must be a hyphen before @param description.
````

## Passing examples

The following patterns are not considered problems:

````js
/**
 * @param foo - Foo.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always"]

/**
 * @param foo     - Foo.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always"]

/**
 * @param foo - Foo.
 * @returns {SomeType} A description.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"returns":"never"}}]

/**
 * @param foo Foo.
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "never"]

/**
 * @param foo
 */
function quux () {

}

/**
 *
 */
function quux () {

}
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"*":"always"}}]

/**
 * @typedef {SomeType} ATypeDefName
 * @property foo - Foo.
 */
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "always",{"tags":{"property":"always"}}]

/**
 * @typedef {SomeType} ATypeDefName
 * @property foo Foo.
 */
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "never",{"tags":{"property":"never"}}]

/**
 * @typedef {SomeType} ATypeDefName
 * @property foo - Foo.
 */
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "never",{"tags":{"*":"always"}}]

/** Entry point for module.
 *
 * @param {!Array<string>} argv Command-line arguments.
 */
function main(argv) {
};
// "jsdoc/require-hyphen-before-param-description": ["error"|"warn", "never"]
````

