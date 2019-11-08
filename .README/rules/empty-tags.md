### `empty-tags`

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

#### Options

##### `tags`

If you want additional tags to be checked for their descriptions, you may
add them within this option.

```js
{
  'jsdoc/empty-tags': ['error', {tags: ['event']}]
}
```

|||
|---|---|
|Context|everywhere|
|Tags| and others added by `tags`|
|Aliases||
|Options|`tags`|
<!-- assertions emptyTags -->
