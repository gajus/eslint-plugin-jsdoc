## Advanced

{"gitdown": "contents", "maxLevel": 6, "rootId": "advanced"}

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

#### `contexts` format

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

#### Discovering available AST definitions

To know all of the AST definitions one may target, it will depend on the
[parser](https://eslint.org/docs/user-guide/configuring#specifying-parser)
you are using with ESLint (e.g., `espree` is the default parser for ESLint,
and this follows [EStree AST](https://github.com/estree/estree) but
to support the the latest experimental features of JavaScript, one may use
`@babel/eslint-parser` or to be able to have one's rules (including JSDoc rules)
apply to TypeScript, one may use `typescript-eslint`, etc.

So you can look up a particular parser to see its rules, e.g., browse through
the [ESTree docs](https://github.com/estree/estree) as used by Espree or see
ESLint's [overview of the structure of AST](https://eslint.org/docs/developer-guide/working-with-custom-parsers#the-ast-specification).

However, it can sometimes be even more helpful to get an idea of AST by just
providing some of your JavaScript to the wonderful
[AST Explorer](https://astexplorer.net/) tool and see what AST is built out
of your code. You can set the tool to the specific parser which you are using.

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

### Creating your own rules

#### Forbidding structures

Although `jsdoc/no-restricted-syntax` is available for restricting certain syntax,
it comes at a cost that, no matter how many restrictions one adds, one can only
disable a single restriction by disabling them all.

With the `extraRuleDefinitions.forbid` option, one can add information that is used
to create extra individual rules forbidding specific structures, and these rules can
then be selectively enabled and optionally disabled on a case-by-case basis.

For each `forbid` key, add the name of the context (this will be appended to
`forbid-` to decide the name of the rule, so with "Any" as the key, the rule
created will be `forbid-Any`). Then provide an optional `description` and
`url` keys (which will be used for the created rule's `meta.docs`
`description` and `url` properties) and the `contexts` array.
See the `jsdoc/restricted-syntax` rule for more details.

```js
import {jsdoc} from 'eslint-plugin-jsdoc';

export default [
  jsdoc({
    config: 'flat/recommended',
    extraRuleDefinitions: {
      forbid: {
        Any: {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTypeName[value="any"])',
              context: 'any',
              message: '`any` is not allowed; use a more specific type',
            },
          ],
          description: 'Forbids `any` usage',
          url: 'https://example.com/docs-for-my-any-rule/'
        },
        Function: {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTypeName[value="Function"])',
              context: 'any',
              message: '`Function` is not allowed; use a more specific type',
            },
          ],
        },
      },
    },
    // Be sure to enable the rules as well
    rules: {
      'jsdoc/forbid-Any': [
        'error',
      ],
      'jsdoc/forbid-Function': [
        'warn',
      ],
    },
  }),
];
```

Now you can selectively disable the rules you have created. In the following,
because of the individual disable directive, only the `Function` rule will be
triggered (as a warning since its rule was set to "warn"):

```js
/* eslint-disable jsdoc/forbid-Any */
/**
 * @param {any} abc Test
 * @param {Function} def Test2
 */
export const a = (abc, def) => {
  b(5, abc, def);
};
/* eslint-enable jsdoc/forbid-Any */
```

#### Preferring type structures

When the structures in question are types, a disadvantage of the previous approach
is that one cannot perform replacements nor can one distinguish between parent and
child types for a generic.

If targeting a type structure, you can use `extraRuleDefinitions.preferTypes`.

While one can get this same behavior using the `preferredTypes` setting, the
advantage of creating a rule definition is that handling is distributed not to
a single rule (`jsdoc/check-types`), but to an individual rule for each preferred
type (which can then be selectively enabled and disabled).

```js
import {jsdoc} from 'eslint-plugin-jsdoc';

export default [
  jsdoc({
    config: 'flat/recommended',
    extraRuleDefinitions: {
      preferTypes: {
        // This key will be used in the rule name
        promise: {
          description: 'This rule disallows Promises without a generic type',
          overrideSettings: {
            // Uses the same keys are are available on the `preferredTypes` settings

            // This key will indicate the type node name to find
            Promise: {
              // This is the specific error message if reported
              message: 'Add a generic type for this Promise.',

              // This can instead be a string replacement if an auto-replacement
              //   is desired
              replacement: false,

              // If `true`, this will check in both parent and child positions
              unifyParentAndChildTypeChecks: false,
            },
          },
          url: 'https://example.com/Promise-rule.md',
        },
      },
    },
    rules: {
      // Don't forget to enable the above-defined rules
      'jsdoc/prefer-type-promise': [
        'error',
      ],
    }
  })
```
