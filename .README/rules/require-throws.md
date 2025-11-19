# `require-throws`

{"gitdown": "contents", "rootId": "require-throws"}

Requires that throw statements are documented.

See
[this discussion](https://stackoverflow.com/questions/50071115/typescript-promise-rejection-type)
on why TypeScript doesn't offer such a feature.

Note that since throw statements within async functions end up as rejected
`Promise`'s, they are not considered as throw statements for the purposes of
this rule. See the `require-rejects` rule for a non-standard way to document
`Promise` rejections.

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
