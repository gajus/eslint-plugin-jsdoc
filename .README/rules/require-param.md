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

...the fixed jsdoc will be:

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

..the fixed jsdoc will be:

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

...the default jsdoc that would be added if the fixer is enabled would be:

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
[jsdoc repeatable parameters](https://jsdoc.app/tags-param.html#multiple-types-and-repeatable-parameters)
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

..becomes:

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

You may wish to manually note in your jsdoc for `extra` that this is a
rest property, however, as jsdoc
[does not appear](https://github.com/jsdoc/jsdoc/issues/1773)
to currently support syntax or output to distinguish rest properties from
other properties, so in looking at the docs alone without looking at the
function signature, it may appear that there is an actual property named
`extra`.

## Options

An options object accepts the following optional properties:

### `enableFixer`

Whether to enable the fixer. Defaults to `true`.

### `enableRootFixer`

Whether to enable the auto-adding of incrementing roots (see the "Fixer"
section). Defaults to `true`. Has no effect if `enableFixer` is set to
`false`.

### `enableRestElementFixer`

Whether to enable the rest element fixer (see
"Rest Element (`RestElement`) insertions"). Defaults to `true`.

### `checkRestProperty`

If set to `true`, will report (and add fixer insertions) for missing rest
properties. Defaults to `false`.

If set to `true`, note that you can still document the subproperties of the
rest property using other jsdoc features, e.g., `@typedef`:

```js
/**
 * @typedef ExtraOptions
 * @property innerProp1
 * @property innerProp2
 */

/**
 * @param cfg
 * @param cfg.num
 * @param {ExtraOptions} extra
 */
function quux ({num, ...extra}) {
}
```

Setting this option to `false` (the default) may be useful in cases where
you already have separate `@param` definitions for each of the properties
within the rest property.

For example, with the option disabled, this will not give an error despite
`extra` not having any definition:

```js
/**
 * @param cfg
 * @param cfg.num
 */
function quux ({num, ...extra}) {
}
```

Nor will this:

```js
/**
 * @param cfg
 * @param cfg.num
 * @param cfg.innerProp1
 * @param cfg.innerProp2
 */
function quux ({num, ...extra}) {
}
```

### `autoIncrementBase`

Numeric to indicate the number at which to begin auto-incrementing roots.
Defaults to `0`.

### `unnamedRootBase`

An array of root names to use in the fixer when roots are missing. Defaults
to `['root']`. Note that only when all items in the array besides the last
are exhausted will auto-incrementing occur. So, with
`unnamedRootBase: ['arg', 'config']`, the following:

```js
function quux ({foo}, [bar], {baz}) {
}
```

...will get the following jsdoc block added:

```js
/**
* @param arg
* @param arg.foo
* @param config0
* @param config0."0" (`bar`)
* @param config1
* @param config1.baz
*/
```

### `exemptedBy`

Array of tags (e.g., `['type']`) whose presence on the document block
avoids the need for a `@param`. Defaults to an array with
`inheritdoc`. If you set this array, it will overwrite the default,
so be sure to add back `inheritdoc` if you wish its presence to cause
exemption of the rule.

### `checkTypesPattern`

When one specifies a type, unless it is of a generic type, like `object`
or `array`, it may be considered unnecessary to have that object's
destructured components required, especially where generated docs will
link back to the specified type. For example:

```js
/**
 * @param {SVGRect} bbox - a SVGRect
 */
export const bboxToObj = function ({x, y, width, height}) {
  return {x, y, width, height};
};
```

By default `checkTypesPattern` is set to
`/^(?:[oO]bject|[aA]rray|PlainObject|Generic(?:Object|Array))$/u`,
meaning that destructuring will be required only if the type of the `@param`
(the text between curly brackets) is a match for "Object" or "Array" (with or
without initial caps), "PlainObject", or "GenericObject", "GenericArray" (or
if no type is present). So in the above example, the lack of a match will
mean that no complaint will be given about the undocumented destructured
parameters.

Note that the `/` delimiters are optional, but necessary to add flags.

Defaults to using (only) the `u` flag, so to add your own flags, encapsulate
your expression as a string, but like a literal, e.g., `/^object$/ui`.

You could set this regular expression to a more expansive list, or you
could restrict it such that even types matching those strings would not
need destructuring.

### `contexts`

Set this to an array of strings representing the AST context (or an object with
`context` and `comment` properties) where you wish the rule to be applied.
Overrides the default contexts (see below). May be useful for adding such as
`TSMethodSignature` in TypeScript or restricting the contexts
which are checked.

See the ["AST and Selectors"](../#advanced-ast-and-selectors)
section of our README for more on the expected format.

### `checkConstructors`

A value indicating whether `constructor`s should be checked. Defaults to
`true`.

### `checkGetters`

A value indicating whether getters should be checked. Defaults to `false`.

### `checkSetters`

A value indicating whether setters should be checked. Defaults to `false`.

### `checkDestructured`

Whether to require destructured properties. Defaults to `true`.

### `checkDestructuredRoots`

Whether to check the existence of a corresponding `@param` for root objects
of destructured properties (e.g., that for `function ({a, b}) {}`, that there
is something like `@param myRootObj` defined that can correspond to
the `{a, b}` object parameter).

If `checkDestructuredRoots` is `false`, `checkDestructured` will also be
implied to be `false` (i.e., the inside of the roots will not be checked
either, e.g., it will also not complain if `a` or `b` do not have their own
documentation). Defaults to `true`.

### `useDefaultObjectProperties`

Set to `true` if you wish to expect documentation of properties on objects
supplied as default values. Defaults to `false`.

## Context and settings

|          |                      |
| -------- | ----------------------------------------------------------------------------- |
| Context  | `ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled |
| Tags     | `param` |
| Aliases  | `arg`, `argument` |
|Recommended | true|
| Options  | `autoIncrementBase`, `checkDestructured`, `checkDestructuredRoots`, `contexts`, `enableFixer`, `enableRootFixer`, `enableRestElementFixer`, `checkRestProperty`, `exemptedBy`, `checkConstructors`, `checkGetters`, `checkSetters`, `checkTypesPattern`, `unnamedRootBase`, `useDefaultObjectProperties`|
| Settings | `ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

## Failing examples

<!-- assertions-failing requireParam -->

## Passing examples

<!-- assertions-passing requireParam -->
