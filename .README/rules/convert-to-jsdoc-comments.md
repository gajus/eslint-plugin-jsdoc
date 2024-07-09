# `convert-to-jsdoc-comments`

Converts single line or non-JSDoc, multiline comments into JSDoc comments.

Note that this rule is experimental. As usual with fixers, please confirm
the results before committing.

## Options

### `enableFixer`

Set to `false` to disable fixing.

### `lineOrBlockStyle`

What style of comments to which to apply JSDoc conversion.

- `block` - Applies to block-style comments (`/* ... */`)
- `line` - Applies to line-style comments (`// ...`)
- `both` - Applies to both block and line-style comments

Defaults to `both`.

### `enforceJsdocLineStyle`

What policy to enforce on the conversion of non-JSDoc comments without
line breaks. (Non-JSDoc (mulitline) comments with line breaks will always
be converted to `multi` style JSDoc comments.)

- `multi` - Convert to multi-line style
```js
/**
 * Some text
 */
```
- `single` - Convert to single-line style
```js
/** Some text */
```

Defaults to `multi`.

### `allowedPrefixes`

An array of prefixes to allow at the beginning of a comment.

Defaults to `['@ts-', 'istanbul ', 'c8 ', 'v8 ', 'eslint', 'prettier-']`.

Supplying your own value overrides the defaults.

### `contexts`

The contexts which will be checked for preceding content.

Defaults to `ArrowFunctionExpression`, `FunctionDeclaration`,
`FunctionExpression`, `TSDeclareFunction`.

### `contextsAfter`

The contexts which will be checked for content on the same line after.

Defaults to an empty array.

### `contextsBeforeAndAfter`

The contexts which will be checked for content before and on the same
line after.

Defaults to `VariableDeclarator`, `TSPropertySignature`, `PropertyDefinition`.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|(N/A)|
|Recommended|false|
|Settings|`minLines`, `maxLines`|
|Options|`enableFixer`, `enforceJsdocLineStyle`, `lineOrBlockStyle`, `allowedPrefixes`, `contexts`, `contextsAfter`, `contextsBeforeAndAfter`|

## Failing examples

<!-- assertions-failing convertToJsdocComments -->

## Passing examples

<!-- assertions-passing convertToJsdocComments -->
