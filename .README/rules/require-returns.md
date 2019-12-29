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
- `forceReturnsWithAsync` - By default `async` functions that do not explicitly
  return a value pass this rule as an `async` function will always return a
  `Promise`, even if the `Promise` resolves to void. You can force all `async`
  functions to require return statements by setting `forceReturnsWithAsync`
  to `true` on the options object. This may be useful for flagging that there
  has been consideration of return type. Defaults to `false`.

```js
'jsdoc/require-returns': ['error', {forceReturnsWithAsync: true}]
```

#### Options

##### `contexts`

Set this to an array of strings representing the AST context
where you wish the rule to be applied (e.g., `ClassDeclaration` for ES6 classes).
Overrides the default contexts (see below). Set to `"any"` if you want
the rule to apply to any jsdoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression such as `@callback` or `@function` (including those associated
with an `@interface`).

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`returns`|
|Aliases|`return`|
|Options|`contexts`, `exemptedBy`, `forceRequireReturn`, `forceReturnsWithAsync`|
|Settings|`overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

<!-- assertions requireReturns -->
