# `require-yields-check`

{"gitdown": "contents", "rootId": "require-yields-check"}

Ensures that if a `@yields` is present that a `yield` (or `yield` with a
value) is present in the function body (or that if a `@next` is present that
there is a `yield` with a return value present).

Please also note that JavaScript does allow generators not to have `yield`
(e.g., with just a return or even no explicit return), but if you want to
enforce that all generators (except wholly empty ones) have a `yield` in the
function body, you can use the ESLint
[`require-yield`](https://eslint.org/docs/rules/require-yield) rule. In
conjunction with this, you can also use the `checkGeneratorsOnly` option
as an optimization so that this rule won't need to do its own checking within
function bodies.

Will also report if multiple `@yields` tags are present.

## Options

- `checkGeneratorsOnly` - Avoids checking the function body and merely insists
    that all generators have `@yields`. This can be an optimization with the
    ESLint `require-yield` rule, as that rule already ensures a `yield` is
    present in generators, albeit assuming the generator is not empty).
    Defaults to `false`.
- `next` - If `true`, this option will insist that any use of a (non-standard)
    `@next` tag (in addition to any `@yields` tag) will be matched by a `yield`
    which uses a return value in the body of the generator (e.g.,
    `const rv = yield;` or `const rv = yield value;`). This (non-standard)
    tag is intended to be used to indicate a type and/or description of
    the value expected to be supplied by the user when supplied to the iterator
    by its `next` method, as with `it.next(value)` (with the iterator being
    the `Generator` iterator that is returned by the call to the generator
    function). This option will report an error if the generator function body
    merely has plain `yield;` or `yield value;` statements without returning
    the values. Defaults to `false`.

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`yields`|
|Aliases|`yield`|
|Recommended|true|
|Options|`checkGeneratorsOnly`, `contexts`, `exemptedBy`, `next`|

## Failing examples

<!-- assertions-failing requireYieldsCheck -->

## Passing examples

<!-- assertions-passing requireYieldsCheck -->
