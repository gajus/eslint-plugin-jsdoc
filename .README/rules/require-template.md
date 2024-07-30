# `require-template`

Checks to see that `@template` tags are present for any detected type
parameters.

Currently checks `ClassDeclaration`, `FunctionDeclaration`,
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

### `requireSeparateTemplates`

Requires that each template have its own separate line, i.e., preventing
templates of this format:

```js
/**
 * @template T, U, V
 */
```

Defaults to `false`.

|||
|---|---|
|Context|everywhere|
|Tags|`template`|
|Recommended|true|
|Settings||
|Options|`requireSeparateTemplates`|

## Failing examples

<!-- assertions-failing requireTemplate -->

## Passing examples

<!-- assertions-passing requireTemplate -->
