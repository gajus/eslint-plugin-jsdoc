### `require-returns-check`

Requires a return statement in function body if a `@returns` tag is specified in jsdoc comment.

Will also report if multiple `@returns` tags are present.

#### Options

##### `yieldAsReturn`

If the setting `settings.jsdoc.mode` is set to `typescript` or `gcc`, this option
will allow `yield` statements to be treated as `@returns` for the purposes of this
rule. (If the mode is instead `jsdoc`, then this option will have no effect, since
the jsdoc approach is to instead use the `@yields` tag.)

The allowable values are `"always"` which will treat any `yield` as a `return`,
or `argument`, which will only treat a `yield` as a `return` when `yield` is
followed by an argument.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`returns`|
|Aliases|`return`|

<!-- assertions requireReturnsCheck -->
