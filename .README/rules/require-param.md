### `require-param`

Requires that all function parameters are documented.

#### Options

An options object accepts two optional properties:

##### `exemptedBy`

Array of tags (e.g., `['type']`) whose presence on the document block
avoids the need for a `@param`. Defaults to an array with
`inheritdoc`. If you set this array, it will overwrite the default,
so be sure to add back `inheritdoc` if you wish its presence to cause
exemption of the rule.

##### `contexts`

Set this to an array of strings representing the AST context
where you wish the rule to be applied. Overrides the default
contexts (see below). May be useful for adding such as
`TSMethodSignature` in TypeScript or restricting the contexts
which are checked.

##### `checkConstructors`

A value indicating whether `constructor`s should be checked. Defaults to `true`.

##### `checkGetters`

A value indicating whether getters should be checked. Defaults to `false`.

##### `checkSetters`

A value indicating whether getters should be checked. Defaults to `false`.

|          |                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------- |
| Context  | `ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled |
| Tags     | `param`                                                                                                       |
| Aliases  | `arg`, `argument`                                                                                             |
| Options  | `contexts`, `exemptedBy`, `checkConstructors`, `checkGetters`, `checkSetters`                                 |
| Settings | `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`                               |

<!-- assertions requireParam -->
