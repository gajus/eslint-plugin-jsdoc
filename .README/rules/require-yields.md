### `require-yields`

Requires that yields are documented.

Will also report if multiple `@yields` tags are present.

#### Options

- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the
    document block avoids the need for a `@yields`. Defaults to an array
    with `inheritdoc`. If you set this array, it will overwrite the default,
    so be sure to add back `inheritdoc` if you wish its presence to cause
    exemption of the rule.
- `forceRequireYields` - Set to `true` to always insist on
    `@yields` documentation even if there are only expressionless `yield`
    statements in the function. May be desired to flag that a project is aware
    of an `undefined`/`void` yield. Defaults to `false`.
    Note that unlike `require-returns`, `require-yields` `forceRequire*` option
    does not impose the requirement that all generators have a `yield` (since it
    is possible a generator may not have even an implicit `yield` and merely
    return). If you always want a `yield` present (and thus for this rule to
    report the need for docs), you should also use the ESLint
    [`require-yield`](https://eslint.org/docs/rules/require-yield) rule.
- `contexts` - Set this to an array of strings representing the AST context
    where you wish the rule to be applied.
    Overrides the default contexts (see below). Set to `"any"` if you want
    the rule to apply to any jsdoc block throughout your files (as is necessary
    for finding function blocks not attached to a function declaration or
    expression, i.e., `@callback` or `@function` (or its aliases `@func` or
    `@method`) (including those associated with an `@interface`). This
    rule will only apply on non-default contexts when there is such a tag
    present and the `forceRequireYields` option is set or if the
    `withGeneratorTag` option is set with a present `@generator` tag
    (since we are not checking against the actual `yield` values in these
    cases).
- `withGeneratorTag` - If a `@generator` tag is present on a block, require
    `@yields`/`@yield`. Defaults to `true`. See `contexts` to `any` if you want
    to catch `@generator` with `@callback` or such not attached to a function.

|||
|---|---|
|Context|Generator functions (`FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled)|
|Tags|`yields`|
|Aliases|`yield`|
|Recommended|true|
| Options  | `contexts`,  `exemptedBy`, `withGeneratorTag`, `forceRequireYields` |
| Settings | `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs` |

<!-- assertions requireYields -->
