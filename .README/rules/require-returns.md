# `require-returns`

{"gitdown": "contents", "rootId": "require-returns"}

Requires that return statements are documented.

Will also report if multiple `@returns` tags are present.

## Fixer

Adds a blank `@returns`.

## Options

{"gitdown": "options"}

## Context and settings

|          |         |
| -------- | ------- |
| Context  | `ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled |
| Tags     | `returns` |
| Aliases  | `return` |
|Recommended|true|
| Options  |`checkConstructors`, `checkGetters`, `contexts`, `enableFixer`, `exemptedBy`, `forceRequireReturn`, `forceReturnsWithAsync`, `publicOnly`|
| Settings | `ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs` |

## Failing examples

<!-- assertions-failing requireReturns -->

## Passing examples

<!-- assertions-passing requireReturns -->
