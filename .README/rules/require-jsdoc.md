# `require-jsdoc`

{"gitdown": "contents", "rootId": "require-jsdoc"}

Checks for presence of jsdoc comments, on class declarations as well as
functions.

## Fixer

Adds an empty JSDoc block unless `enableFixer` is set to `false`. See
the `contexts` option for how `inlineCommentBlock` can control the style
of the generated JSDoc block.

## Options

Accepts one optional options object with the following optional keys.

### `publicOnly`

This option will insist that missing jsdoc blocks are only reported for
function bodies / class declarations that are exported from the module.
May be a boolean or object. If set to `true`, the defaults below will be
used. If unset, jsdoc block reporting will not be limited to exports.

This object supports the following optional boolean keys (`false` unless
otherwise noted):

- `ancestorsOnly` - Only check node ancestors to check if node is exported
- `esm` - ESM exports are checked for JSDoc comments (Defaults to `true`)
- `cjs` - CommonJS exports are checked for JSDoc comments  (Defaults to `true`)
- `window` - Window global exports are checked for JSDoc comments

### `require`

An object with the following optional boolean keys which all default to
`false` except as noted, indicating the contexts where the rule will apply:

- `ArrowFunctionExpression`
- `ClassDeclaration`
- `ClassExpression`
- `FunctionDeclaration` (defaults to `true`)
- `FunctionExpression`
- `MethodDefinition`

### `contexts`

Set this to an array of strings or objects representing the additional AST
contexts where you wish the rule to be applied (e.g., `Property` for
properties). If specified as an object, it should have a `context` property
and can have an `inlineCommentBlock` property which, if set to `true`, will
add an inline `/** */` instead of the regular, multi-line, indented jsdoc
block which will otherwise be added. Defaults to an empty array. Contexts
may also have their own `minLineCount` property.

Note that you may need to disable `require` items (e.g., `MethodDefinition`)
if you are specifying a more precise form in `contexts` (e.g., `MethodDefinition:not([accessibility="private"] > FunctionExpression`).

See the ["AST and Selectors"](../#advanced-ast-and-selectors)
section of our README for more on the expected format.

### `exemptEmptyConstructors`

Default: true

When `true`, the rule will not report missing jsdoc blocks above constructors
with no parameters or return values (this is enabled by default as the class
name or description should be seen as sufficient to convey intent).

### `exemptEmptyFunctions`

Default: false.

When `true`, the rule will not report missing jsdoc blocks above
functions/methods with no parameters or return values (intended where
function/method names are sufficient for themselves as documentation).

### `checkConstructors`

A value indicating whether `constructor`s should be checked. Defaults to
`true`. When `true`, `exemptEmptyConstructors` may still avoid reporting when
no parameters or return values are found.

### `checkGetters`

A value indicating whether getters should be checked. Besides setting as a
boolean, this option can be set to the string `"no-setter"` to indicate that
getters should be checked but only when there is no setter. This may be useful
if one only wishes documentation on one of the two accessors. Defaults to
`false`.

### `checkSetters`

A value indicating whether setters should be checked. Besides setting as a
boolean, this option can be set to the string `"no-getter"` to indicate that
setters should be checked but only when there is no getter. This may be useful
if one only wishes documentation on one of the two accessors. Defaults to
`false`.

### `enableFixer`

A boolean on whether to enable the fixer (which adds an empty jsdoc block).
Defaults to `true`.

### `minLineCount`

An integer to indicate a minimum number of lines expected for a node in order
for it to require documentation. Defaults to `undefined`. This option will
apply to any context; see `contexts` for line counts per context.

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `ClassDeclaration`, `ClassExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|N/A|
|Recommended|true|
|Options|`publicOnly`, `require`, `contexts`, `exemptEmptyConstructors`, `exemptEmptyFunctions`, `enableFixer`, `minLineCount`|

## Failing examples

<!-- assertions-failing requireJsdoc -->

## Passing examples

<!-- assertions-passing requireJsdoc -->
