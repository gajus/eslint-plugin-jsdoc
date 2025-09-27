# `escape-inline-tags`

Reports use of JSDoc tags in non-tag positions (in the default "typescript" mode).

Note that while the JSDoc standard refers to inline tags as those being surrounded
by curly brackets, such as those in the form `{@link https://example.com}`, for the
purposes of this rule, we are referring to inline tags as a simple reference to
tags such as `@param` outside of the normal location of a tag and which may need to
be wrapped in `{}` to be proper inline JSDoc or need to be escaped with `\` or
wrapped with ` to be normal text. E.g.

```js
/** Supports shorthands such as `@yearly` to simplify setup. */
```

## Options

{"gitdown": "options"}

|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|true (unless `mode` is changed away from "typescript")|
|Settings|`mode`|
|Options|`allowedInlineTags`, `enableFixer`, `fixType`|

## Failing examples

<!-- assertions-failing escapeInlineTags -->

## Passing examples

<!-- assertions-passing escapeInlineTags -->
