### `require-param`

Requires that all function parameters are documented.

#### Fixer

Adds `@param <name>` for each tag present in the function signature but
missing in the jsdoc. Can be disabled by setting the `enableFixer`
option to `false`.

##### Destructured object and array naming

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

..the fixed jsdoc will be:

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
* @param cfg.0
* @param cfg.1
*/
```

##### Missing root fixing

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

#### Options

An options object accepts the following optional properties:

##### `enableFixer`

Whether to enable the fixer. Defaults to `true`.

##### `enableRootFixer`

Whether to enable the auto-adding of incrementing roots (see the "Fixer"
section). Defaults to `true`. Has no effect if `enableFixer` is set to
`false`.

##### `autoIncrementBase`

Numeric to indicate the number at which to begin auto-incrementing roots.
Defaults to `0`.

##### `unnamedRootBase`

An array of root names to use in the fixer when roots are missing. Defaults
to `['root']`. Note that only when all items in the array besides the last
are exhausted will auto-incrementing occur. So, with `unnamedRootBase: ['arg', 'config']`, the following:

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
* @param config0.0 (`bar`)
* @param config1
* @param config1.baz
*/
```

##### `exemptedBy`

Array of tags (e.g., `['type']`) whose presence on the document block
avoids the need for a `@param`. Defaults to an array with
`inheritdoc`. If you set this array, it will overwrite the default,
so be sure to add back `inheritdoc` if you wish its presence to cause
exemption of the rule.

##### `contexts`

Set this to an array of strings representing the AST context
where you wish the rule to be applied. Overrides the default
contexts (see below). May be useful for adding such as
`TSMethodSignature` in TypeScript or restricting the contexts
which are checked.

##### `checkConstructors`

A value indicating whether `constructor`s should be checked. Defaults to `true`.

##### `checkGetters`

A value indicating whether getters should be checked. Defaults to `false`.

##### `checkSetters`

A value indicating whether getters should be checked. Defaults to `false`.

|          |                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------- |
| Context  | `ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled |
| Tags     | `param`                                                                                                       |
| Aliases  | `arg`, `argument`                                                                                             |
| Options  | `contexts`, `exemptedBy`, `checkConstructors`, `checkGetters`, `checkSetters`                                 |
| Settings | `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`                               |

<!-- assertions requireParam -->
