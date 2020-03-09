### `require-returns`

{"gitdown": "contents", "rootId": "eslint-plugin-jsdoc-rules-require-returns"}

Requires that return statements are documented.

Will also report if multiple `@returns` tags are present.

#### Options

- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the document
    block avoids the need for a `@returns`. Defaults to an empty array.
- `forceRequireReturn` - Set to `true` to always insist on
  `@returns` documentation regardless of implicit or explicit `return`'s
  in the function. May be desired to flag that a project is aware of an
  `undefined`/`void` return. Defaults to `false`.
- `forceReturnsWithAsync` - By default `async` functions that do not explicitly
  return a value pass this rule as an `async` function will always return a
  `Promise`, even if the `Promise` resolves to void. You can force all `async`
  functions to require return statements by setting `forceReturnsWithAsync`
  to `true` on the options object. This may be useful for flagging that there
  has been consideration of return type. Defaults to `false`.
- `contexts` - Set this to an array of strings representing the AST context
  where you wish the rule to be applied.
  Overrides the default contexts (see below). Set to `"any"` if you want
  the rule to apply to any jsdoc block throughout your files (as is necessary
  for finding function blocks not attached to a function declaration or
  expression, i.e., `@callback` or `@function` (or its aliases `@func` or
  `@method`) (including those associated with an `@interface`). This
  rule will only apply on non-default contexts when there is such a tag
  present and the `forceRequireReturn` option is set or if the
  `forceReturnsWithAsync` option is set with a present `@async` tag
  (since we are not checking against the actual `return` values in these
  cases).

```js
'jsdoc/require-returns': ['error', {forceReturnsWithAsync: true}]
```

#### Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`returns`|
|Aliases|`return`|
|Options|`contexts`, `exemptedBy`, `forceRequireReturn`, `forceReturnsWithAsync`|
|Settings|`overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

#### Failing examples

<!-- assertions-failing requireReturns -->

#### Passing examples

<!-- assertions-passing requireReturns -->
