### `require-param-description`

{"gitdown": "contents", "rootId": "eslint-plugin-jsdoc-rules-require-param-description"}

Requires that each `@param` tag has a `description` value.

#### Options

##### `contexts`

Set this to an array of strings representing the AST context
where you wish the rule to be applied.
Overrides the default contexts (see below). Set to `"any"` if you want
the rule to apply to any jsdoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., `@callback` or `@function` (or its aliases `@func` or
`@method`) (including those associated with an `@interface`).

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Options|`contexts`|

#### Failing examples

<!-- assertions-failing requireParamDescription -->

#### Passing examples

<!-- assertions-passing requireParamDescription -->
