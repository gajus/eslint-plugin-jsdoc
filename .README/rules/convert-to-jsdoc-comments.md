# `convert-to-jsdoc-comments`

Converts single line or non-JSDoc, multiline comments into JSDoc comments.

Note that this rule is experimental. As usual with fixers, please confirm
the results before committing.

## Fixer

Converts comments into JSDoc comments.

## Options

{"gitdown": "options"}

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|(N/A)|
|Recommended|false|
|Settings|`minLines`, `maxLines`|
|Options|`enableFixer`, `enforceJsdocLineStyle`, `lineOrBlockStyle`, `allowedPrefixes`, `contexts`, `contextsAfter`, `contextsBeforeAndAfter`|

## Failing examples

<!-- assertions-failing convertToJsdocComments -->

## Passing examples

<!-- assertions-passing convertToJsdocComments -->
