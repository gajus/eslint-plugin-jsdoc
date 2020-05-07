### `check-param-names`

Ensures that parameter names in JSDoc match those in the function declaration.

#### Destructuring

Note that by default the rule will not report parameters present on the docs
but missing from the function signature when an object rest property is part
of that function signature since the missing properties might be a part of
the object rest property.

```js
/**
 * @param options
 * @param options.foo
 */
function quux ({foo, ...extra}) {}
```

To require that `extra` be documented, you can use the `checkRestProperty`
option. Note, however, that jsdoc [does not appear](https://github.com/jsdoc/jsdoc/issues/1773)
to currently support syntax or output to distinguish rest properties from
other properties, so in looking at the docs alone without looking at the
function signature, it may appear that there is an actual property named
`extra`.

#### Options

##### `checkRestProperty`

See the "Destructuring" section.

##### `allowExtraTrailingParamDocs`

If set to `true`, this option will allow extra `@param` definitions (e.g.,
representing future expected or virtual params) to be present without needing
their presence within the function signature. Other inconsistencies between
`@param`'s and present function parameters will still be reported.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Options|`allowExtraTrailingParamDocs`, `checkRestProperty`|
|Tags|`param`|

<!-- assertions checkParamNames -->
