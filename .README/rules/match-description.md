# `match-description`

{"gitdown": "contents", "rootId": "match-description"}

Enforces a regular expression pattern on descriptions.

The default is this basic expression to match English sentences (Support
for Unicode upper case may be added in a future version when it can be handled
by our supported Node versions):

``^\n?([A-Z`\\d_][\\s\\S]*[.?!`]\\s*)?$``

Applies by default to the jsdoc block description and to the following tags:

- `@description`/`@desc`
- `@summary`
- `@file`/`@fileoverview`/`@overview`
- `@classdesc`

In addition, the `tags` option (see below) may be used to match other tags.

The default (and all regex options) defaults to using (only) the `u` flag, so
to add your own flags, encapsulate your expression as a string, but like a
literal, e.g., `/[A-Z].*\\./ui`.

Note that `/` delimiters are optional, but necessary to add flags (besides
`u`).

Also note that the default or optional regular expressions is *not*
case-insensitive unless one opts in to add the `i` flag.

You can add the `s` flag if you want `.` to match newlines. Note, however,
that the trailing newlines of a description will not be matched.

## Options

### `matchDescription`

You can supply your own expression to override the default, passing a
`matchDescription` string on the options object.

```js
{
  'jsdoc/match-description': ['error', {matchDescription: '[A-Z].*\\.'}]
}
```

### `message`

You may provide a custom default message by using the following format:

```js
{
  'jsdoc/match-description': ['error', {
    message: 'The default description should begin with a capital letter.'
  }]
}
```

This can be overridden per tag or for the main block description by setting
`message` within `tags` or `mainDescription`, respectively.

### `nonemptyTags`

If not set to `false`, will enforce that the following tags have at least
some content:

- `@copyright`
- `@example`
- `@see`
- `@todo`

If you supply your own tag description for any of the above tags in `tags`,
your description will take precedence.

### `tags`

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

Alternatively, you may supply an object with a `message` property to indicate
the error message for that tag.

```js
{
  'jsdoc/match-description': ['error', {tags: {
    param: {message: 'Begin with a hyphen', match: '\\- [A-Z].*\\.'},
    returns: {message: 'Capitalize for returns (the default)', match: true}
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

### `mainDescription`

If you wish to override the main block description without changing the
default `match-description` (which can cascade to the `tags` with `true`),
you may use `mainDescription`:

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
block description (and only the main block description) is linted, though you
may disable checking it by setting it to `false`.

You may also provide an object with `message`:

```js
{
  'jsdoc/match-description': ['error', {
    mainDescription: {
      message: 'Capitalize first word of JSDoc block descriptions',
      match: '[A-Z].*\\.'
    },
    tags: {
      param: true,
      returns: true
    }
  }]
}
```

### `contexts`

Set this to an array of strings representing the AST context (or an object with
`context` and `comment` properties) where you wish the rule to be applied.
(e.g., `ClassDeclaration` for ES6
classes). Overrides the default contexts (see below). Set to `"any"` if you
want the rule to apply to any jsdoc block throughout your files.

See the ["AST and Selectors"](../#advanced-ast-and-selectors)
section of our README for more on the expected format.

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|docblock and `@description` by default but more with `tags`|
|Aliases|`@desc`|
|Recommended|false|
|Settings||
|Options|`contexts`, `mainDescription`, `matchDescription`, `message`, `nonemptyTags`, `tags`|

## Failing examples

<!-- assertions-failing matchDescription -->

## Passing examples

<!-- assertions-passing matchDescription -->
