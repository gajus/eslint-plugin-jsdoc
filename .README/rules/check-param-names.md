### `check-param-names`

Ensures that parameter names in JSDoc match those in the function declaration.

#### Destructuring

Note that by default the rule will not report parameters present on the docs
but non-existing on the function signature when an object rest property is part
of that function signature since the seemingly non-existing properties might
actually be a part of the object rest property.

```js
/**
 * @param options
 * @param options.foo
 */
function quux ({foo, ...extra}) {}
```

To require that `extra` be documented--and that any extraneous properties
get reported--e.g., if there had been a `@param options.bar` above--you
can use the `checkRestProperty` option which insists that the rest
property be documented (and that there be no other implicit properties).
Note, however, that jsdoc [does not appear](https://github.com/jsdoc/jsdoc/issues/1773)
to currently support syntax or output to distinguish rest properties from
other properties, so in looking at the docs alone without looking at the
function signature, the disadvantage of enabling this option is that it
may appear that there is an actual property named `extra`.

#### Options

##### `checkRestProperty`

See the "Destructuring" section. Defaults to `false`.

##### `checkTypesPattern`

See `require-param` under the option of the same name.

##### `enableFixer`

Set to `true` to auto-remove `@param` duplicates (based on identical
names).

Note that this option will remove duplicates of the same name even if
the definitions do not match in other ways (e.g., the second param will
be removed even if it has a different type or description).

##### `allowExtraTrailingParamDocs`

If set to `true`, this option will allow extra `@param` definitions (e.g.,
representing future expected or virtual params) to be present without needing
their presence within the function signature. Other inconsistencies between
`@param`'s and present function parameters will still be reported.

##### `checkDestructured`

Whether to check destructured properties. Defaults to `true`.

##### `useDefaultObjectProperties`

Set to `true` if you wish to avoid reporting of child property documentation
where instead of destructuring, a whole plain object is supplied as default
value but you wish its keys to be considered as signalling that the properties
are present and can therefore be documented. Defaults to `false`.

##### `disableExtraPropertyReporting`

Whether to check for extra destructured properties. Defaults to `false`. Change
to `true` if you want to be able to document properties which are not actually
destructured. Keep as `false` if you expect properties to be documented in
their own types. Note that extra properties will always be reported if another
item at the same level is destructured as destructuring will prevent other
access and this option is only intended to permit documenting extra properties
that are available and actually used in the function.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Options|`allowExtraTrailingParamDocs`, `checkDestructured`, `checkRestProperty`, `checkTypesPattern`, `useDefaultObjectProperties`, `disableExtraPropertyReporting`|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Recommended|true|
<!-- assertions checkParamNames -->
