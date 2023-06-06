<a name="user-content-imports-as-dependencies"></a>
<a name="imports-as-dependencies"></a>
### <code>imports-as-dependencies</code>

This rule will report an issue if JSDoc `import()` statements point to a package
which is not listed in `dependencies` or `devDependencies`.

|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|false|
|Settings||
|Options||

<a name="user-content-failing-examples"></a>
<a name="failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @type {null|import('sth').SomeApi}
 */
// Message: import points to package which is not found in dependencies

/**
 * @type {null|import('sth').SomeApi}
 */
// Settings: {"jsdoc":{"mode":"permissive"}}
// Message: import points to package which is not found in dependencies

/**
 * @type {null|import('missingpackage/subpackage').SomeApi}
 */
// Message: import points to package which is not found in dependencies

/**
 * @type {null|import('@sth/pkg').SomeApi}
 */
// Message: import points to package which is not found in dependencies
````



<a name="user-content-passing-examples"></a>
<a name="passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @type {null|import('eslint').ESLint}
 */

/**
 * @type {null|import('eslint/use-at-your-own-risk').ESLint}
 */

/**
 * @type {null|import('@es-joy/jsdoccomment').InlineTag}
 */

/**
 * @type {null|import(}
 */

/**
 * @type {null|import('esquery').ESQueryOptions}
 */

/**
 * @type {null|import('@es-joy/jsdoccomment').InlineTag|
 *   import('@es-joy/jsdoccomment').JsdocBlock}
 */

/**
 * @type {null|import('typescript').Program}
 */

/**
 * @type {null|import('./relativePath.js').Program}
 */

/**
 * @type {null|import('fs').PathLike}
 */

/**
 * @type {null|import('fs/promises').FileHandle}
 */

/**
 * @type {null|import('node:fs').PathLike}
 */
````

