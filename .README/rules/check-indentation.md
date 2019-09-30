### `check-indentation`

Reports invalid padding inside JSDoc block.

#### Options

This rule has an object option.

##### `excludeExamples`

This boolean property allows to "hide" example code from reports.

By default, whole JSDoc block is checked for invalid padding.
That includes example blocks too, which may get in the way of adding full,
readable examples of code without ending up with multiple linting issues.

When enabled, following code will lint without any padding issue:

```js
/**
 * @example
 * anArray.filter((a) => {
 *   return a.b;
 * });
 */
```

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Options| `excludeExamples` |

<!-- assertions checkIndentation -->
