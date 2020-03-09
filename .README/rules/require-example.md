### `require-example`

{"gitdown": "contents", "rootId": "eslint-plugin-jsdoc-rules-require-example"}

Requires that all functions have examples.

* All functions must have one or more `@example` tags.
* Every example tag must have a non-empty description that explains the method's usage.

#### Options

This rule has an object option.

##### `exemptedBy`

Array of tags (e.g., `['type']`) whose presence on the document
block avoids the need for an `@example`. Defaults to an empty array.

##### `avoidExampleOnConstructors`

Set to `true` to avoid the need for an example on a constructor (whether
indicated as such by a jsdoc tag or by being within an ES6 `class`).
Defaults to `false`.

##### `contexts`

Set this to an array of strings representing the AST context
where you wish the rule to be applied (e.g., `ClassDeclaration` for ES6 classes).
Overrides the default contexts (see below). Set to `"any"` if you want
the rule to apply to any jsdoc block throughout your files.

#### Fixer

The fixer for `require-example` will add an empty `@example`, but it will still
report a missing example description after this is added.

#### Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`example`|
|Options|`exemptedBy`, `avoidExampleOnConstructors`, `contexts`|
|Settings|`overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

#### Failing examples

<!-- assertions-failing requireExample -->

#### Passing examples

<!-- assertions-passing requireExample -->
