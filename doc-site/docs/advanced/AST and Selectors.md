---
sidebar_position: 1
---

For various rules, one can add to the environments to which the rule applies
by using the `contexts` option.

This option works with [ESLint's selectors](https://eslint.org/docs/developer-guide/selectors) which are [esquery](https://github.com/estools/esquery/#readme)
expressions one may use to target a specific node type or types, including
subsets of the type(s) such as nodes with certain children or attributes.

These expressions are used within ESLint plugins to find those parts of
your files' code which are of interest to check. However, in
`eslint-plugin-jsdoc`, we also allow you to use these selectors to define
additional contexts where you wish our own rules to be applied.
