### `match-description`

Enforces a regular expression pattern on descriptions.

The default is this basic expression to match English sentences (Support
for Unicode upper case may be added in a future version when it can be handled
by our supported Node versions):

``^([A-Z]|[`\\d_])[\\s\\S]*[.?!`]$``

Applies to the jsdoc block description and `@description` (or `@desc`)
by default but the `tags` option (see below) may be used to match other tags.

#### Options

##### `matchDescription`

You can supply your own expression to override the default, passing a
`matchDescription` string on the options object.

```js
{
  'jsdoc/match-description': ['error', {matchDescription: '[A-Z].*\\.'}]
}
```

As with the default, the supplied regular expression will be applied with the
Unicode (`"u"`) flag and is *not* case-insensitive.

##### `tags`

If you want different regular expressions to apply to tags, you may use
the `tags` option object:

```js
{
  'jsdoc/match-description': ['error', {tags: {
    param: '\\- [A-Z].*\\.',
    returns: '[A-Z].*\\.'
  }}]
}
```

In place of a string, you can also add `true` to indicate that a particular
tag should be linted with the `matchDescription` value (or the default).

```js
{
  'jsdoc/match-description': ['error', {tags: {
    param: true,
    returns: true
  }}]
}
```

The tags `@param`/`@arg`/`@argument` and `@property`/`@prop` will be properly
parsed to ensure that the matched "description" text includes only the text
after the name.

All other tags will treat the text following the tag name, a space, and
an optional curly-bracketed type expression (and another space) as part of
its "description" (e.g., for `@returns {someType} some description`, the
description is `some description` while for `@some-tag xyz`, the description
is `xyz`).

##### `mainDescription`

If you wish to override the main function description without changing the
default `match-description`, you may use `mainDescription`:

```js
{
  'jsdoc/match-description': ['error', {
    mainDescription: '[A-Z].*\\.',
    tags: {
      param: true,
      returns: true
    }
  }]
}
```

There is no need to add `mainDescription: true`, as by default, the main
function (and only the main function) is linted, though you may disable checking
it by setting it to `false`.

##### `contexts`

Set this to an array of strings representing the AST context
where you wish the rule to be applied (e.g., `ClassDeclaration` for ES6 classes).
Overrides the default contexts (see below).

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|docblock and `@description` (or `@desc`) by default but more with `tags`|
|Settings||
|Options|`contexts`, `tags` (accepts tags with names and optional type such as 'param', 'arg', 'argument', 'property', and 'prop', and accepts arbitrary list of other tags with an optional type (but without names), e.g., 'returns', 'return'), `mainDescription`, `matchDescription`|

<!-- assertions matchDescription -->
