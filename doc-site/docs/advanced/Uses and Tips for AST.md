---
sidebar_position: 4
---

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
