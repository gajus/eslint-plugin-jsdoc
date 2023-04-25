# `require-example`

{"gitdown": "contents", "rootId": "require-example"}

Requires that all functions have examples.

* All functions must have one or more `@example` tags.
* Every example tag must have a non-empty description that explains the
  method's usage.

## Fixer

The fixer for `require-example` will add an empty `@example`, but it will still
report a missing example description after this is added.

## Options

This rule has an object option.

### `exemptedBy`

Array of tags (e.g., `['type']`) whose presence on the document
block avoids the need for an `@example`. Defaults to an array with
`inheritdoc`. If you set this array, it will overwrite the default,
so be sure to add back `inheritdoc` if you wish its presence to cause
exemption of the rule.

### `exemptNoArguments`

Boolean to indicate that no-argument functions should not be reported for
missing `@example` declarations.

### `contexts`

Set this to an array of strings representing the AST context (or an object with
`context` and `comment` properties) where you wish the rule to be applied.
(e.g., `ClassDeclaration` for ES6
classes). Overrides the default contexts (see below). Set to `"any"` if you
want the rule to apply to any jsdoc block throughout your files.

See the ["AST and Selectors"](../#advanced-ast-and-selectors)
section of our README for more on the expected format.

### `checkConstructors`

A value indicating whether `constructor`s should be checked.
Defaults to `true`.

### `checkGetters`

A value indicating whether getters should be checked. Defaults to `false`.

### `checkSetters`

A value indicating whether setters should be checked. Defaults to `false`.

### `enableFixer`

A boolean on whether to enable the fixer (which adds an empty `@example` block).
Defaults to `true`.

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`example`|
|Recommended|false|
|Options|`exemptedBy`, `exemptNoArguments`, `contexts`, `checkConstructors`, `checkGetters`, `checkSetters`, `enableFixer`|
|Settings|`ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

# Failing examples

<!-- assertions-failing requireExample -->

## Passing examples

<!-- assertions-passing requireExample -->
