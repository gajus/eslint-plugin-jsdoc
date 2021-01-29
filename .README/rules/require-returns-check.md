### `require-returns-check`

Requires a return statement (or non-`undefined` Promise resolve value) in
function bodies if a `@returns` tag (without a `void` or `undefined` type)
is specified in the function's jsdoc comment.

Will also report `@returns {void}` and `@returns {undefined}` if `exemptAsync`
is set to `false` no non-`undefined` returned or resolved value is found.

Will also report if multiple `@returns` tags are present.

#### Options

- `exemptAsync` - By default, functions which return a `Promise` that are not
    detected as resolving with a non-`undefined` value and `async` functions
    (even ones that do not explicitly return a value, as these are returning a
    `Promise` implicitly) will be exempted from reporting by this rule.
    If you wish to insist that only `Promise`'s which resolve to
    non-`undefined` values or `async` functions with explicit `return`'s will
    be exempted from reporting (i.e., that `async` functions can be reported
    if they lack an explicit (non-`undefined`) `return` when a `@returns` is
    present), you can set `exemptAsync` to `false` on the options object.
- `reportMissingReturnForUndefinedTypes` - If `true` and no return or
    resolve value is found, this setting will even insist that reporting occur
    with `void` or `undefined` (including as an indicated `Promise` type).
    Unlike `require-returns`, with this option in the rule, one can
     *discourage* the labeling of `undefined` types. Defaults to `false`.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`returns`|
|Aliases|`return`|
|Options|`exemptAsync`, `reportMissingReturnForUndefinedTypes`|
|Recommended|true|

<!-- assertions requireReturnsCheck -->
