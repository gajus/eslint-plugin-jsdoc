---
sidebar_position: 2
---

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
