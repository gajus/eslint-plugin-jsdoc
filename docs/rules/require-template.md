<a name="user-content-require-template"></a>
<a name="require-template"></a>
# <code>require-template</code>

Checks to see that `@template` tags are present for any detected type
parameters.

Currently checks `TSTypeAliasDeclaration` such as:

```ts
export type Pairs<D, V> = [D, V | undefined];
```

or

```js
/**
 * @typedef {[D, V | undefined]} Pairs
 */
```

Note that in the latter TypeScript-flavor JavaScript example, there is no way
for us to firmly distinguish between `D` and `V` as type parameters or as some
other identifiers, so we use an algorithm that any single capital letters
are assumed to be templates.

<a name="user-content-require-template-options"></a>
<a name="require-template-options"></a>
## Options

<a name="user-content-require-template-options-requireseparatetemplates"></a>
<a name="require-template-options-requireseparatetemplates"></a>
### <code>requireSeparateTemplates</code>

Requires that each template have its own separate line, i.e., preventing
templates of this format:

```js
/**
 * @template T, U, V
 */
```

Defaults to `false`.

|||
|---|---|
|Context|everywhere|
|Tags|`template`|
|Recommended|true|
|Settings||
|Options|`requireSeparateTemplates`|

<a name="user-content-require-template-failing-examples"></a>
<a name="require-template-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 *
 */
type Pairs<D, V> = [D, V | undefined];
// Message: Missing @template D

/**
 *
 */
export type Pairs<D, V> = [D, V | undefined];
// Message: Missing @template D

/**
 * @typedef {[D, V | undefined]} Pairs
 */
// Message: Missing @template D

/**
 * @typedef {[D, V | undefined]} Pairs
 */
// Settings: {"jsdoc":{"mode":"permissive"}}
// Message: Missing @template D

/**
 * @template D, U
 */
export type Extras<D, U, V> = [D, U, V | undefined];
// Message: Missing @template V

/**
 * @template D, U
 * @typedef {[D, U, V | undefined]} Extras
 */
// Message: Missing @template V

/**
 * @template D, V
 */
export type Pairs<D, V> = [D, V | undefined];
// "jsdoc/require-template": ["error"|"warn", {"requireSeparateTemplates":true}]
// Message: Missing separate @template for V

/**
 * @template D, V
 * @typedef {[D, V | undefined]} Pairs
 */
// "jsdoc/require-template": ["error"|"warn", {"requireSeparateTemplates":true}]
// Message: Missing separate @template for V
````



<a name="user-content-require-template-passing-examples"></a>
<a name="require-template-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @template D
 * @template V
 */
export type Pairs<D, V> = [D, V | undefined];

/**
 * @template D
 * @template V
 * @typedef {[D, V | undefined]} Pairs
 */

/**
 * @template D, U, V
 */
export type Extras<D, U, V> = [D, U, V | undefined];

/**
 * @template D, U, V
 * @typedef {[D, U, V | undefined]} Extras
 */

/**
 * @typedef {[D, U, V | undefined]} Extras
 * @typedef {[D, U, V | undefined]} Extras
 */

/**
 * @typedef Foo
 * @prop {string} bar
 */
````

