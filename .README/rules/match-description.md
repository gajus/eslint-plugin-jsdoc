### `match-description`

Enforces a regular expression pattern on descriptions.

The default is this basic expression to match English sentences (Support
for Unicode upper case may be added in a future version when it can be handled
by our supported Node versions):

``^([A-Z]|[`\\d_])[\\s\\S]*[.?!`]$``

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

If you wish to override the main function description without changing the
default `mainDescription`, you may use `tags` with `main description`:

```js
{
  'jsdoc/match-description': ['error', {tags: {
    'main description': '[A-Z].*\\.',
    param: true,
    returns: true
  }}]
}
```

There is no need to add `"main description": true`, as by default, the main
function (and only the main function) is linted, though you may disable checking
it by setting it to `false`.

##### `contexts`

Set this to a string or array of strings representing the AST context
where you wish the rule to be applied (e.g., `ClassDeclaration` for ES6 classes).

##### `noDefaults`

By default, `contexts` will permit `ArrowFunctionExpression`,
`FunctionDeclaration`, and `FunctionExpression`. Set this instead to `true` to
have `contexts` override these.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|N/A by default but see `tags` options|
|Settings||
|Options|`contexts`, `noDefaults`, `tags` (allows for 'param', 'arg', 'argument', 'returns', 'return'), `matchDescription`|

<!-- assertions matchDescription -->
