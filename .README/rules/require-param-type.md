# `require-param-type`

{"gitdown": "contents", "rootId": "require-param-type"}

Requires that each `@param` tag has a `type` value (within curly brackets).

Will exempt destructured roots and their children if
`settings.exemptDestructuredRootsFromChecks` is set to `true` (e.g.,
`@param props` will be exempted from requiring a type given
`function someFunc ({child1, child2})`).

## Options

{"gitdown": "options"}

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
