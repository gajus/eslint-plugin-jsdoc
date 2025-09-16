# `require-description`

{"gitdown": "contents", "rootId": "require-description"}

Requires that all functions (or optionally other structures) with a JSDoc block
have a description.

* All functions must have an implicit description (e.g., text above tags) or
  have the option `descriptionStyle` set to `tag` (requiring `@description`
  (or `@desc` if that is set as your preferred tag name)).
* Every JSDoc block description (or `@description` tag if `descriptionStyle`
  is `"tag"`) must have a non-empty description that explains the purpose of
  the method.

## Options

{"gitdown": "options"}

## Context and settings

| | |
| -------- | ---------------------- |
| Context  | `ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled |
| Tags     | `description` or JSDoc block |
| Aliases  | `desc` |
| Recommended | false |
| Options  |`checkConstructors`, `checkGetters`, `checkSetters`, `contexts`, `descriptionStyle`, `exemptedBy`|
| Settings | `ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs` |

## Failing examples

<!-- assertions-failing requireDescription -->

## Passing examples

<!-- assertions-passing requireDescription -->
