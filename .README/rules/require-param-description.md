# `require-param-description`

{"gitdown": "contents", "rootId": "require-param-description"}

Requires that each `@param` tag has a `description` value.

Will exempt destructured roots and their children if
`settings.exemptDestructuredRootsFromChecks` is set to `true` (e.g.,
`@param {object} props` will be exempted from requiring a description given
`function someFunc ({child1, child2})`).

## Options

### `setDefaultDestructuredRootDescription`

Whether to set a default destructured root description. For example, you may
wish to avoid manually having to set the description for a `@param`
corresponding to a destructured root object as it should always be the same
type of object. Uses `defaultDestructuredRootDescription` for the description
string. Defaults to `false`.

### `defaultDestructuredRootDescription`

The description string to set by default for destructured roots. Defaults to
"The root object".

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
|Options|`setDefaultDestructuredRootDescription`, `defaultDestructuredRootDescription`, `contexts`|
|Settings|`exemptDestructuredRootsFromChecks`|

## Failing examples

<!-- assertions-failing requireParamDescription -->

## Passing examples

<!-- assertions-passing requireParamDescription -->
