# `require-template`

Checks to see that `@template` tags are present for any detected type
parameters.

Currently checks `ClassDeclaration`, `FunctionDeclaration`, `TSDeclareFunction`,
`TSInterfaceDeclaration` or `TSTypeAliasDeclaration` such as:

```ts
export type Pairs<D, V> = [D, V | undefined];
```

or

```js
/**
 * @typedef {[D, V | undefined]} Pairs
 */
```

Note that in the latter TypeScript-flavor JavaScript example, there is no way
for us to firmly distinguish between `D` and `V` as type parameters or as some
other identifiers, so we use an algorithm that assumes that any single capital
letters are templates.

## Options

{"gitdown": "options"}

|||
|---|---|
|Context|everywhere|
|Tags|`template`|
|Recommended|false|
|Settings||
|Options|`exemptedBy`, `requireSeparateTemplates`|

## Failing examples

<!-- assertions-failing requireTemplate -->

## Passing examples

<!-- assertions-passing requireTemplate -->
