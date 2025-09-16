### `empty-tags`

{"gitdown": "contents", "rootId": "empty-tags"}

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
- `@internal` (used by TypeScript)
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

Similarly, `@internal` will still be checked for content by this rule even with
`settings.jsdoc.ignoreInternal` set to `true`.

## Fixer

Strips content if present for the above-mentioned tags.

## Options

{"gitdown": "options"}

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags| `abstract`, `async`, `generator`, `global`, `hideconstructor`, `ignore`, `inheritdoc`, `inner`, `instance`, `internal`, `override`, `readonly`, `package`, `private`, `protected`, `public`, `static` and others added by `tags`|
|Recommended|true|
|Options|`tags`|

## Failing examples

<!-- assertions-failing emptyTags -->

## Passing examples

<!-- assertions-passing emptyTags -->
