### `check-indentation`

Reports invalid padding inside JSDoc block.

Ignores parts enclosed in Markdown's "code block". For example,
following description is valid:

```js
/**
 * Some description:
 * ```html
 * <section>
 *   <title>test</title>
 * </section>
 * ```
 */
```

#### Options

This rule has an object option.

##### `excludeTags`

Array of tags (e.g., `['example', 'description']`) whose content will be
"hidden" from the `check-indentation` rule. Defaults to `['example']`.

By default, whole JSDoc block is checked for invalid padding.
That would include `@example` blocks too, which would get in the way
of adding full, readable examples of code without ending up with multiple
linting issues.

When disabled (by passing `excludeTags: []` option), following code will
lint *with* padding issue:

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
|Options| `excludeTags` |

<!-- assertions checkIndentation -->
