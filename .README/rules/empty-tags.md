### `empty-tags`

{"gitdown": "contents", "rootId": "eslint-plugin-jsdoc-rules-empty-tags"}

Expects the following tags to be empty of any content:

- `@abstract`
- `@async`
- `@generator`
- `@global`
- `@hideconstructor`
- `@ignore`
- `@inheritdoc`
- `@inner`
- `@instance`
- `@override`
- `@readonly`

The following will also be expected to be empty unless `settings.jsdoc.mode`
is set to "closure" (which allows types).

- `@package`
- `@private`
- `@protected`
- `@public`
- `@static`

Note that `@private` will still be checked for content by this rule even with
`settings.jsdoc.ignorePrivate` set to `true` (a setting which normally
causes rules not to take effect).

#### Options

##### `tags`

If you want additional tags to be checked for their descriptions, you may
add them within this option.

```js
{
  'jsdoc/empty-tags': ['error', {tags: ['event']}]
}
```

#### Fixer

(Todo)

#### Context and settings

|||
|---|---|
|Context|everywhere|
|Tags| and others added by `tags`|
|Aliases||
|Options|`tags`|

#### Failing examples

<!-- assertions-failing emptyTags -->

#### Passing examples

<!-- assertions-passing emptyTags -->
