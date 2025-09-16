# `require-throws`

{"gitdown": "contents", "rootId": "require-throws"}

Requires that throw statements are documented.

Note that since throw statements within async functions end up as rejected
Promises, they are not considered as throw statements for the purposes of this
rule. See [issue 755](https://github.com/gajus/eslint-plugin-jsdoc/issues/755)
for our desire for a separate tag to document rejection types and see
[this discussion](https://stackoverflow.com/questions/50071115/typescript-promise-rejection-type)
on why TypeScript doesn't offer such a feature.

## Options

{"gitdown": "options"}

## Context and settings

| | |
| -------- | --- |
| Context  | `ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled |
| Tags     | `throws` |
| Aliases  | `exception` |
|Recommended|false|
| Options  |`contexts`, `exemptedBy`|
| Settings | `ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs` |

## Failing examples

<!-- assertions-failing requireThrows -->

## Passing examples

<!-- assertions-passing requireThrows -->
