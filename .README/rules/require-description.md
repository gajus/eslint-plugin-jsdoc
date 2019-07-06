### `require-description`

Requires that all functions have a description.

* All functions must have an implicit description or have the option
  `descriptionStyle` set to `tag`.
* Every jsdoc block description (or description tag if `descriptionStyle` is
  `"tag"`) must have a non-empty description that explains the purpose of the
  method.

#### Options

An options object may have any of the following properties:

- `contexts` - Set to an array of strings representing the AST context
  where you wish the rule to be applied (e.g., `ClassDeclaration` for ES6
  classes). Overrides the default contexts (see below).
- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the
    document block avoids the need for a `@description`. Defaults to an
    empty array.
- `descriptionStyle` - Whether to accept implicit descriptions (`"body"`) or
    `@description` tags (`"tag"`) as satisfying the rule. Set to `"any"` to
    accept either style. Defaults to `"body"`.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`description` or jsdoc block|
|Aliases|`desc`|
|Options|`contexts`, `exemptedBy`, `descriptionStyle`|
|Settings|`overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

<!-- assertions requireDescription -->
