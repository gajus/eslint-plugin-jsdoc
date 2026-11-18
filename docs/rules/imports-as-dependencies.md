<a name="user-content-imports-as-dependencies"></a>
<a name="imports-as-dependencies"></a>
### <code>imports-as-dependencies</code>

This rule will report an issue if JSDoc `import()` statements point to a package
which is not listed in `dependencies` or `devDependencies` (by
default; see the options).

|||
|---|---|
|Context|everywhere|
|Tags|(Any)|
|Recommended|false|
|Settings||
|Options|`dependencies`, `devDependencies`, `peerDependencies`|

<a name="user-content-options"></a>
<a name="options"></a>
## Options

A single options object has the following properties.

<a name="user-content-options-dependencies"></a>
<a name="options-dependencies"></a>
### <code>dependencies</code>

Whether packages listed in `dependencies` may be imported. Defaults to `true`.

<a name="user-content-options-devdependencies"></a>
<a name="options-devdependencies"></a>
### <code>devDependencies</code>

Whether packages listed in `devDependencies` may be imported. Defaults to `true`.

<a name="user-content-options-peerdependencies"></a>
<a name="options-peerdependencies"></a>
### <code>peerDependencies</code>

Whether packages listed in `peerDependencies` may be imported. Defaults to
`false`, so that a package which is only a peer dependency is reported, as
projects usually also list such packages in `devDependencies`.


<a name="user-content-failing-examples"></a>
<a name="failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
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

/**
 * @type {null|import('sinon').SomeApi}
 */
// Message: import points to package which is not found in dependencies

/**
 * @type {null|{bar: string, [Symbol.dispose](): import('sth').SomeApi}}
 */
// Message: import points to package which is not found in dependencies

/**
 * @type {null|import('eslint').SomeApi}
 */
// "jsdoc/imports-as-dependencies": ["error"|"warn", {"devDependencies":false}]
// Message: import points to package which is not found in dependencies

/**
 * @type {null|import('@es-joy/jsdoccomment').SomeApi}
 */
// "jsdoc/imports-as-dependencies": ["error"|"warn", {"dependencies":false}]
// Message: import points to package which is not found in dependencies
````



<a name="user-content-passing-examples"></a>
<a name="passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
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

/**
 * @type {null|import('playwright').SomeApi}
 */

/**
 * @type {null|import('ts-api-utils').SomeApi}
 */

/**
 * @type {null|import('eslint').SomeApi}
 */
// "jsdoc/imports-as-dependencies": ["error"|"warn", {"devDependencies":false,"peerDependencies":true}]
````

