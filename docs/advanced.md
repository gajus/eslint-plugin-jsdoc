<a name="user-content-advanced"></a>
<a name="advanced"></a>
## Advanced

* [AST and Selectors](#user-content-advanced-ast-and-selectors)
    * [`contexts` format](#user-content-advanced-ast-and-selectors-contexts-format)
    * [Discovering available AST definitions](#user-content-advanced-ast-and-selectors-discovering-available-ast-definitions)
    * [Uses/Tips for AST](#user-content-advanced-ast-and-selectors-uses-tips-for-ast)


<a name="user-content-advanced-ast-and-selectors"></a>
<a name="advanced-ast-and-selectors"></a>
### AST and Selectors

For various rules, one can add to the environments to which the rule applies
by using the `contexts` option.

This option works with [ESLint's selectors](https://eslint.org/docs/developer-guide/selectors) which are [esquery](https://github.com/estools/esquery/#readme)
expressions one may use to target a specific node type or types, including
subsets of the type(s) such as nodes with certain children or attributes.

These expressions are used within ESLint plugins to find those parts of
your files' code which are of interest to check. However, in
`eslint-plugin-jsdoc`, we also allow you to use these selectors to define
additional contexts where you wish our own rules to be applied.

<a name="user-content-advanced-ast-and-selectors-contexts-format"></a>
<a name="advanced-ast-and-selectors-contexts-format"></a>
#### <code>contexts</code> format

While at their simplest, these can be an array of string selectors, one can
also supply an object with `context` (in place of the string) and one of two
properties:

1. For `require-jsdoc`, there are also `inlineCommentBlock` and
    `minLineCount` properties. See that rule for details.
1. For `no-missing-syntax` and `no-restricted-syntax`, there is also a
    `message` property which allows customization of the message to be shown
    when the rule is triggered.
1. For `no-missing-syntax`, there is also a `minimum` property. See that rule.
1. For other rules, there is a `comment` property which adds to the `context`
    in requiring that the `comment` AST condition is also met, e.g., to
    require that certain tags are present and/or or types and type operators
    are in use. Note that this AST (either for `Jsdoc*` or `JsdocType*` AST)
    has not been standardized and should be considered experimental.
    Note that this property might also become obsolete if parsers begin to
    include JSDoc-structured AST. A
    [parser](https://github.com/brettz9/jsdoc-eslint-parser/) is available
    which aims to support comment AST as
    a first class citizen where comment/comment types can be used anywhere
    within a normal AST selector but this should only be considered
    experimental. When using such a parser, you need not use `comment` and
    can just use a plain string context. The determination of the node on
    which the comment is attached is based more on actual location than
    semantics (e.g., it will be attached to a `VariableDeclaration` if above
    that rather than to the `FunctionExpression` it is fundamentally
    describing). See
    [@es-joy/jsdoccomment](https://github.com/es-joy/jsdoccomment)
    for the precise structure of the comment (and comment type) nodes.

<a name="user-content-advanced-ast-and-selectors-discovering-available-ast-definitions"></a>
<a name="advanced-ast-and-selectors-discovering-available-ast-definitions"></a>
#### Discovering available AST definitions

To know all of the AST definitions one may target, it will depend on the
[parser](https://eslint.org/docs/user-guide/configuring#specifying-parser)
you are using with ESLint (e.g., `espree` is the default parser for ESLint,
and this follows [EStree AST](https://github.com/estree/estree) but
to support the the latest experimental features of JavaScript, one may use
`@babel/eslint-parser` or to be able to have one's rules (including JSDoc rules)
apply to TypeScript, one may use `@typescript-eslint/parser`, etc.

So you can look up a particular parser to see its rules, e.g., browse through
the [ESTree docs](https://github.com/estree/estree) as used by Espree or see
ESLint's [overview of the structure of AST](https://eslint.org/docs/developer-guide/working-with-custom-parsers#the-ast-specification).

However, it can sometimes be even more helpful to get an idea of AST by just
providing some of your JavaScript to the wonderful
[AST Explorer](https://astexplorer.net/) tool and see what AST is built out
of your code. You can set the tool to the specific parser which you are using.

<a name="user-content-advanced-ast-and-selectors-uses-tips-for-ast"></a>
<a name="advanced-ast-and-selectors-uses-tips-for-ast"></a>
#### Uses/Tips for AST

And if you wish to introspect on the AST of code within your projects, you can
use [eslint-plugin-query](https://github.com/brettz9/eslint-plugin-query).
Though it also works as a plugin, you can use it with its own CLI, e.g.,
to search your files for matching esquery selectors, optionally showing
it as AST JSON.

Tip: If you want to more deeply understand not just the resulting AST tree
structures for any given code but also the syntax for esquery selectors so
that you can, for example, find only those nodes with a child of a certain
type, you can set the "Transform" feature to ESLint and test out
esquery selectors in place of the selector expression (e.g., replace
`'VariableDeclaration > VariableDeclarator > Identifier[name="someVar"]'` as
we have
[here](https://astexplorer.net/#/gist/71a93130c19599d6f197bddb29c13a59/latest))
to the selector you wish so as to get messages reported in the bottom right
pane which match your [esquery](https://github.com/estools/esquery/#readme)
selector).
