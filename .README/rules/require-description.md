### `require-description`

Requires that all functions have a description.

* All functions must have an implicit description (e.g., text above tags) or
  have the option `descriptionStyle` set to `tag` (requiring `@description`
  (or `@desc` if that is set as your preferred tag name)).
* Every jsdoc block description (or `@description` tag if `descriptionStyle`
  is `"tag"`) must have a non-empty description that explains the purpose of
  the method.

#### Options

An options object may have any of the following properties:

- `contexts` - Set to an array of strings representing the AST context
  where you wish the rule to be applied (e.g., `ClassDeclaration` for ES6
  classes). Overrides the default contexts (see below).  Set to `"any"` if
  you want the rule to apply to any jsdoc block throughout your files.
- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the
    document block avoids the need for a `@description`. Defaults to an
    array with `inheritdoc`. If you set this array, it will overwrite the
    default, so be sure to add back `inheritdoc` if you wish its presence
    to cause exemption of the rule.
- `descriptionStyle` - Whether to accept implicit descriptions (`"body"`) or
    `@description` tags (`"tag"`) as satisfying the rule. Set to `"any"` to
    accept either style. Defaults to `"body"`.
- `checkConstructors` - A value indicating whether `constructor`s should be
    checked. Defaults to `true`.
- `checkGetters` - A value indicating whether getters should be checked.
    Defaults to `true`.
- `checkSetters` - A value indicating whether setters should be checked.
    Defaults to `true`.

|          |                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------- |
| Context  | `ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled |
| Tags     | `description` or jsdoc block                                                                                  |
| Aliases  | `desc`                                                                                                        |
| Recommended | false |
| Options  | `contexts`, `exemptedBy`, `descriptionStyle`, `checkConstructors`, `checkGetters`, `checkSetters`             |
| Settings | `ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`                               |

<!-- assertions requireDescription -->
