# `require-param-type`

{"gitdown": "contents", "rootId": "require-param-type"}

Requires that each `@param` tag has a `type` value (within curly brackets).

Will exempt destructured roots and their children if
`settings.exemptDestructuredRootsFromChecks` is set to `true` (e.g.,
`@param props` will be exempted from requiring a type given
`function someFunc ({child1, child2})`).

## Options

### `setDefaultDestructuredRootType`

Whether to set a default destructured root type. For example, you may wish
to avoid manually having to set the type for a `@param`
corresponding to a destructured root object as it is always going to be an
object. Uses `defaultDestructuredRootType` for the type string. Defaults to
`false`.

### `defaultDestructuredRootType`

The type string to set by default for destructured roots. Defaults to "object".

### `contexts`

Set this to an array of strings representing the AST context (or an object with
`context` and `comment` properties) where you wish the rule to be applied.
Overrides the default contexts (see below). Set to `"any"` if you want
the rule to apply to any jsdoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., `@callback` or `@function` (or its aliases `@func` or
`@method`) (including those associated with an `@interface`).

See the ["AST and Selectors"](../#advanced-ast-and-selectors)
section of our README for more on the expected format.

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Recommended|true|
|Options|`contexts`, `defaultDestructuredRootType`, `setDefaultDestructuredRootType`|
|Settings|`exemptDestructuredRootsFromChecks`|

## Failing examples

<!-- assertions-failing requireParamType -->

## Passing examples

<!-- assertions-passing requireParamType -->
