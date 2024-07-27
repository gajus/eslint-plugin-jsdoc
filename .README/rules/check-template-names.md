# `check-template-names`

Checks that any `@template` names are actually used in the connected
`@typedef` or type alias.

Currently checks `ClassDeclaration`, `FunctionDeclaration`,
`TSInterfaceDeclaration` or `TSTypeAliasDeclaration` such as:

```ts
/**
 * @template D
 * @template V
 */
export type Pairs<D, V> = [D, V | undefined];
```

or

```js
/**
 * @template D
 * @template V
 * @typedef {[D, V | undefined]} Pairs
 */
```

|||
|---|---|
|Context|everywhere|
|Tags|`@template`|
|Recommended|false|
|Settings||
|Options||

## Failing examples

<!-- assertions-failing checkTemplateNames -->

## Passing examples

<!-- assertions-passing checkTemplateNames -->
