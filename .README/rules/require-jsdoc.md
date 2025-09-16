# `require-jsdoc`

{"gitdown": "contents", "rootId": "require-jsdoc"}

Checks for presence of JSDoc comments, on class declarations as well as
functions.

## Fixer

Adds an empty JSDoc block unless `enableFixer` is set to `false`. See
the `contexts` option for how `inlineCommentBlock` can control the style
of the generated JSDoc block and `fixerMessage` for an optional message
to insert.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `ClassDeclaration`, `ClassExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|N/A|
|Recommended|true|
|Options|`publicOnly`, `require`, `contexts`, `exemptEmptyConstructors`, `exemptEmptyFunctions`, `enableFixer`, `minLineCount`, `fixerMessage`, `skipInterveningOverloadedDeclarations`|

## Failing examples

<!-- assertions-failing requireJsdoc -->

## Passing examples

<!-- assertions-passing requireJsdoc -->
