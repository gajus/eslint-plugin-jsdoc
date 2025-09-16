# `require-yields`

{"gitdown": "contents", "rootId": "require-yields"}

Requires that yields are documented.

Will also report if multiple `@yields` tags are present.

See the `next`, `forceRequireNext`, and `nextWithGeneratorTag` options for an
option to expect a non-standard `@next` tag.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|Generator functions (`FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled)|
|Tags|`yields`|
|Aliases|`yield`|
|Recommended|true|
| Options  |`contexts`, `exemptedBy`, `forceRequireNext`, `forceRequireYields`, `next`, `nextWithGeneratorTag`, `withGeneratorTag`|
| Settings | `ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs` |

## Failing examples

<!-- assertions-failing requireYields -->

## Passing examples

<!-- assertions-passing requireYields -->
