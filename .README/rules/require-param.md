# `require-param`

{"gitdown": "contents", "rootId": "require-param"}

Requires that all function parameters are documented.

## Fixer

Adds `@param <name>` for each tag present in the function signature but
missing in the jsdoc. Can be disabled by setting the `enableFixer`
option to `false`.

### Destructured object and array naming

When the fixer is applied to destructured objects, only the input name is
used.

So for:

```js
/**
 * @param cfg
 */
function quux ({foo: bar, baz: bax = 5}) {
}
```

...the fixed JSDoc will be:

```js
/**
* @param cfg
* @param cfg.foo
* @param cfg.baz
*/
```

This is because the input to the function is the relevant item for
understanding the function's input, not how the variable is renamed
for internal use (the signature itself documents that).

For destructured arrays, the input name is merely the array index.

So for:

```js
/**
 * @param cfg
 */
function quux ([foo, bar]) {
}
```

..the fixed JSDoc will be:

```js
/**
* @param cfg
* @param cfg."0"
* @param cfg."1"
*/
```

### Missing root fixing

Note that unless `enableRootFixer` (or `enableFixer`) is set to `false`,
missing roots will be added and auto-incremented. The default behavior
is for "root" to be auto-inserted for missing roots, followed by a
0-based auto-incrementing number.

So for:

```js
function quux ({foo}, {bar}, {baz}) {
}
```

...the default JSDoc that would be added if the fixer is enabled would be:

```js
/**
* @param root0
* @param root0.foo
* @param root1
* @param root1.bar
* @param root2
* @param root2.baz
*/
```

The name of "root" can be configured with `unnamedRootBase` (which also allows
cycling through a list of multiple root names before there is need for any
numeric component).

And one can have the count begin at another number (e.g., `1`) by changing
`autoIncrementBase` from the default of `0`.

### Rest Element (`RestElement`) insertions

The fixer will automatically report/insert
[JSDoc repeatable parameters](https://jsdoc.app/tags-param.html#multiple-types-and-repeatable-parameters)
if missing.

```js
/**
  * @param {GenericArray} cfg
  * @param {number} cfg."0"
 */
function baar ([a, ...extra]) {
  //
}
```

...becomes:

```js
/**
  * @param {GenericArray} cfg
  * @param {number} cfg."0"
  * @param {...any} cfg."1"
 */
function baar ([a, ...extra]) {
  //
}
```

Note that the type `any` is included since we don't know of any specific
type to use.

To disable such rest element insertions, set `enableRestElementFixer` to
`false`.

Note too that the following will be reported even though there is an item
corresponding to `extra`:

```js
/**
  * @param {GenericArray} cfg
  * @param {number} cfg."0"
  * @param {any} cfg."1"
 */
function baar ([a, ...extra]) {
  //
}
```

...because it does not use the `...` syntax in the type.

### Object Rest Property insertions

If the `checkRestProperty` option is set to `true` (`false` by default),
missing rest properties will be reported with documentation auto-inserted:

```js
/**
 * @param cfg
 * @param cfg.num
 */
function quux ({num, ...extra}) {
}
```

...becomes:

```js
/**
 * @param cfg
 * @param cfg.num
 * @param cfg.extra
 */
function quux ({num, ...extra}) {
}
```

You may wish to manually note in your JSDoc for `extra` that this is a
rest property, however, as jsdoc
[does not appear](https://github.com/jsdoc/jsdoc/issues/1773)
to currently support syntax or output to distinguish rest properties from
other properties, so in looking at the docs alone without looking at the
function signature, it may appear that there is an actual property named
`extra`.

## Options

{"gitdown": "options"}

## Context and settings

|          |                      |
| -------- | ----------------------------------------------------------------------------- |
| Context  | `ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled |
| Tags     | `param` |
| Aliases  | `arg`, `argument` |
|Recommended | true|
| Options  |`autoIncrementBase`, `checkConstructors`, `checkDestructured`, `checkDestructuredRoots`, `checkGetters`, `checkRestProperty`, `checkSetters`, `checkTypesPattern`, `contexts`, `enableFixer`, `enableRestElementFixer`, `enableRootFixer`, `exemptedBy`, `ignoreWhenAllParamsMissing`, `interfaceExemptsParamsCheck`, `unnamedRootBase`, `useDefaultObjectProperties`|
| Settings | `ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

## Failing examples

<!-- assertions-failing requireParam -->

## Passing examples

<!-- assertions-passing requireParam -->
