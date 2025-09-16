# `require-param-description`

{"gitdown": "contents", "rootId": "require-param-description"}

Requires that each `@param` tag has a `description` value.

Will exempt destructured roots and their children if
`settings.exemptDestructuredRootsFromChecks` is set to `true` (e.g.,
`@param {object} props` will be exempted from requiring a description given
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
|Options|`contexts`, `defaultDestructuredRootDescription`, `setDefaultDestructuredRootDescription`|
|Settings|`exemptDestructuredRootsFromChecks`|

## Failing examples

<!-- assertions-failing requireParamDescription -->

## Passing examples

<!-- assertions-passing requireParamDescription -->
