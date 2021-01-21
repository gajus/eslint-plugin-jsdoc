### `require-yields`

Requires that yields are documented.

Will also report if multiple `@yields` tags are present.

See the `next`, `forceRequireNext`, and `nextWithGeneratorTag` options for an
option to expect a non-standard `@next` tag.

Note that there is currently no `yield` equivalent to the
`require-returns-check` rule to ensure that if a `@yields` is present that a
`yield` (or `yield` with a value) is present in the function body (or that if
a `@next` is present that there is a `yield` with a return value present).

Please also note that JavaScript does allow generators not to have `yield`
(e.g., with just a return or even no explicit return), but if you want to
enforce that all generators have a `yield` in the function body, you can
use the ESLint
[`require-yield`](https://eslint.org/docs/rules/require-yield) rule.

#### Options

- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the
    document block avoids the need for a `@yields`. Defaults to an array
    with `inheritdoc`. If you set this array, it will overwrite the default,
    so be sure to add back `inheritdoc` if you wish its presence to cause
    exemption of the rule.
- `forceRequireYields` - Set to `true` to always insist on
    `@yields` documentation for generators even if there are only
    expressionless `yield` statements in the function. May be desired to flag
    that a project is aware of an `undefined`/`void` yield. Defaults to
    `false`.
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
- `next` - If `true`, this option will insist that any use of a `yield` return
    value (e.g., `const rv = yield;` or `const rv = yield value;`) has a
    (non-standard) `@next` tag (in addition to any `@yields` tag) so as to be
    able to document the type expected to be supplied into the iterator
    (the `Generator` iterator that is returned by the call to the generator
    function) to the iterator (e.g., `it.next(value)`). The tag will not be
    expected if the generator function body merely has plain `yield;` or
    `yield value;` statements without returning the values. Defaults to
    `false`.
- `forceRequireNext` - Set to `true` to always insist on
    `@next` documentation even if there are no `yield` statements in the
    function or none return values. May be desired to flag that a project is
    aware of the expected yield return being `undefined`. Defaults to `false`.
- `nextWithGeneratorTag` - If a `@generator` tag is present on a block, require
    (non-standard ) `@next` (see `next` option). This will require using `void`
    or `undefined` in cases where generators do not use the `next()`-supplied
    incoming `yield`-returned value. Defaults to `false`. See `contexts` to
    `any` if you want to catch `@generator` with `@callback` or such not
    attached to a function.

|||
|---|---|
|Context|Generator functions (`FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled)|
|Tags|`yields`|
|Aliases|`yield`|
|Recommended|true|
| Options  | `contexts`,  `exemptedBy`, `withGeneratorTag`, `nextWithGeneratorTag`, `forceRequireYields`, `next` |
| Settings | `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs` |

<!-- assertions requireYields -->
