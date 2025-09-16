# `require-example`

{"gitdown": "contents", "rootId": "require-example"}

Requires that all functions have examples.

* All functions must have one or more `@example` tags.
* Every example tag must have a non-empty description that explains the
  method's usage.

## Fixer

The fixer for `require-example` will add an empty `@example`, but it will still
report a missing example description after this is added.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`example`|
|Recommended|false|
|Options|`checkConstructors`, `checkGetters`, `checkSetters`, `contexts`, `enableFixer`, `exemptedBy`, `exemptNoArguments`|
|Settings|`ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

# Failing examples

<!-- assertions-failing requireExample -->

## Passing examples

<!-- assertions-passing requireExample -->
