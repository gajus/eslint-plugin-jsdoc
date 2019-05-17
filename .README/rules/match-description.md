### `match-description`

Enforces a regular expression pattern on descriptions.

The default is this basic expression to match English sentences (Support
for Unicode upper case may be added in a future version when it can be handled
by our supported Node versions):

``^([A-Z]|[`\\d_])([\\s\\S]*[.?!`])?$``

You can supply your own expression passing a `matchDescription` string on
the options object.

```js
{
  'jsdoc/match-description': ['error', {matchDescription: '[A-Z].*\\.'}]
}
```

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


By default, only the main function description is linted.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|N/A by default but see `tags` options|
|Settings||
|Options|`tags` (allows for 'param', 'arg', 'argument', 'returns', 'return'), `matchDescription`|

<!-- assertions matchDescription -->
