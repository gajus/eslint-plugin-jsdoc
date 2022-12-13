---
sidebar_position: 3
---

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
