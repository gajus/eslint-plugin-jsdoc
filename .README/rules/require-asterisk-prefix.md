### `require-asterisk-prefix`

{"gitdown": "contents", "rootId": "require-asterisk-prefix"}

Requires that each JSDoc line starts with an `*`.

## Fixer

(TODO)

## Options

This rule allows an optional string argument. If it is `"always"` then a
problem is raised when there is no asterisk prefix on a given jsdoc line. If
it is `"never"` then a problem is raised when there is an asterisk present.
The default value is `"always"`. You may also set the default to `"any"`
and use the `tags` option to apply to specific tags only.

After the string option, one may add an object with the following.

### `tags`

If you want different values to apply to specific tags, you may use
the `tags` option object. The keys are `always`, `never`, or `any` and
the values are arrays of tag names or the special value `*description`
which applies to the main jsdoc block description.

```js
{
  'jsdoc/require-asterisk-prefix': ['error', 'always', {
    tags: {
      always: ['*description'],
      any: ['example', 'license'],
      never: ['copyright']
    }
  }]
}
```

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|All or as limited by the `tags` option|
|Options|(a string matching `"always"|"never"` and optional object with `tags`)|

## Failing examples

<!-- assertions-failing requireAsteriskPrefix -->

## Passing examples

<!-- assertions-passing requireAsteriskPrefix -->
