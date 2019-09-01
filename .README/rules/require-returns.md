### `require-returns`

Requires returns are documented.

Will also report if multiple `@returns` tags are present.

#### Options

- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the document
    block avoids the need for a `@returns`. Defaults to an empty array.
- `forceRequireReturn` - Set to `true` to always insist on
  `@returns` documentation regardless of implicit or explicit `return`'s
  in the function. May be desired to flag that a project is aware of an
  `undefined`/`void` return. Defaults to `false`.
- `forceReturnsWithAsync` - By default `async` functions that do not explicitly return a value pass this rule. You can force all `async` functions to require return statements by setting `forceReturnsWithAsync` to `true` on the options object. This may be useful as an `async` function will always return a `Promise`, even if the `Promise` returns void. Defaults to `false`.

```js
'jsdoc/require-returns': ['error', {forceReturnsWithAsync: true}]
```

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`returns`|
|Aliases|`return`|
|Options|`exemptedBy`, `forceRequireReturn`, `forceReturnsWithAsync`|
|Settings|`overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

<!-- assertions requireReturns -->
