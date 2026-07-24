# `check-param-names`

{"gitdown": "contents", "rootId": "check-param-names"}

Ensures that parameter names in JSDoc are matched by corresponding items in
the function declaration.

## Fixer

With `enableFixer`, reorders non-nested `@param` definitions whose names match
the function signature but appear in a different order. The whole tag block is
moved, including multiline descriptions and any text after the final tag.
Destructured and nested parameters are reported without an automatic fix.

The fixer also auto-removes `@param` duplicates (based on identical names).
This can be disabled with `duplicateParams`. Duplicate removal does not compare
the rest of the definitions, so the second tag is removed even if it has a
different type or description.

## Suggestions

Set `extraParams` to `true` to offer a suggestion that removes an `@param`
without a corresponding function parameter. Set `badParamNames` to `true` to
offer a suggestion that renames a mismatched `@param` to the corresponding
function parameter name.

## Destructuring

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
Note, however, that JSDoc [does not appear](https://github.com/jsdoc/jsdoc/issues/1773)
to currently support syntax or output to distinguish rest properties from
other properties, so in looking at the docs alone without looking at the
function signature, the disadvantage of enabling this option is that it
may appear that there is an actual property named `extra`.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Options|`allowExtraTrailingParamDocs`, `badParamNames`, `badParamOrder`, `checkDestructured`, `checkRestProperty`, `checkTypesPattern`, `disableExtraPropertyReporting`, `disableMissingParamChecks`, `duplicateParams`, `enableFixer`, `extraParams`, `useDefaultObjectProperties`|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Recommended|true|

## Failing examples

<!-- assertions-failing checkParamNames -->

## Passing examples

<!-- assertions-passing checkParamNames -->
