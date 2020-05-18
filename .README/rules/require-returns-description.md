### `require-returns-description`

Requires that the `@returns` tag has a `description` value. The error
will not be reported if the return value is `void` or `undefined`
or if it is `Promise<void>` or `Promise<undefined>`.

#### Options

##### `contexts`

Set this to an array of strings representing the AST context
where you wish the rule to be applied.
Overrides the default contexts (see below). Set to `"any"` if you want
the rule to apply to any jsdoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., `@callback` or `@function` (or its aliases `@func` or
`@method`) (including those associated with an `@interface`).

See the ["AST and Selectors"](#eslint-plugin-jsdoc-advanced-ast-and-selectors) section of our README for
more on the expected format.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`returns`|
|Aliases|`return`|
|Options|`contexts`|

<!-- assertions requireReturnsDescription -->
