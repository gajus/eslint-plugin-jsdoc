### `require-returns`

Requires returns are documented.

#### Options

- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the document
    block avoids the need for a `@returns`.
- `forceReturnsWithAsync` - By default `async` functions that do not explicitly return a value pass this rule. You can force all `async` functions to require return statements by setting `forceReturnsWithAsync` as true on the options object. This may be useful as an `async` function will always return a Promise, even if the Promise returns void.

```js
'jsdoc/require-jsdoc': ['error', {forceReturnsWithAsync: true}]
```

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`returns`|
|Aliases|`return`|
|Settings|`forceRequireReturn`|
|Options|`exemptedBy`, `forceReturnsWithAsync`|

<!-- assertions requireReturns -->
