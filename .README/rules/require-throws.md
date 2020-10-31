### `require-throws`

Requires that throw statements are documented.

#### Options

- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the
    document block avoids the need for a `@throws`. Defaults to an array
    with `inheritdoc`. If you set this array, it will overwrite the default,
    so be sure to add back `inheritdoc` if you wish its presence to cause
    exemption of the rule.
- `contexts` - Set this to an array of strings representing the AST context
    where you wish the rule to be applied.
    Overrides the default contexts (see below). Set to `"any"` if you want
    the rule to apply to any jsdoc block throughout your files (as is necessary
    for finding function blocks not attached to a function declaration or
    expression, i.e., `@callback` or `@function` (or its aliases `@func` or
    `@method`) (including those associated with an `@interface`).

```js
'jsdoc/require-throws': 'error',
```

| | |
| -------- | --- |
| Context  | `ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled |
| Tags     | `throws` |
| Aliases  | `exception` |
|Recommended|true|
| Options  | `contexts`, `exemptedBy` |
| Settings | `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs` |

<!-- assertions requireThrows -->
