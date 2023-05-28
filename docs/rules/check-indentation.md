<a name="user-content-check-indentation"></a>
<a name="check-indentation"></a>
# <code>check-indentation</code>

* [Options](#user-content-check-indentation-options)
    * [`excludeTags`](#user-content-check-indentation-options-excludetags)
* [Context and settings](#user-content-check-indentation-context-and-settings)
* [Failing examples](#user-content-check-indentation-failing-examples)
* [Passing examples](#user-content-check-indentation-passing-examples)


Reports invalid padding inside JSDoc blocks.

Ignores parts enclosed in Markdown "code block"'s. For example,
the following description is not reported:

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

<a name="user-content-check-indentation-options"></a>
<a name="check-indentation-options"></a>
## Options

This rule has an object option.

<a name="user-content-check-indentation-options-excludetags"></a>
<a name="check-indentation-options-excludetags"></a>
### <code>excludeTags</code>

Array of tags (e.g., `['example', 'description']`) whose content will be
"hidden" from the `check-indentation` rule. Defaults to `['example']`.

By default, the whole JSDoc block will be checked for invalid padding.
That would include `@example` blocks too, which can get in the way
of adding full, readable examples of code without ending up with multiple
linting issues.

When disabled (by passing `excludeTags: []` option), the following code *will*
report a padding issue:

```js
/**
 * @example
 * anArray.filter((a) => {
 *   return a.b;
 * });
 */
```

<a name="user-content-check-indentation-context-and-settings"></a>
<a name="check-indentation-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|false|
|Options|`excludeTags`|

<a name="user-content-check-indentation-failing-examples"></a>
<a name="check-indentation-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**  foo */
function quux () {

}
// Message: There must be no indentation.

/**
 * foo
 *
 * @param bar
 *  baz
 */
function quux () {

}
// Message: There must be no indentation.

/**
 * Foo
 *   bar
 */
class Moo {}
// Message: There must be no indentation.

/**
 * foo
 *
 * @example
 * anArray.filter((a) => {
 *   return a.b;
 * });
 */
function quux () {

}
// "jsdoc/check-indentation": ["error"|"warn", {"excludeTags":[]}]
// Message: There must be no indentation.

/**
 * foo
 *
 * @example
 *   aaaa
 * @returns
 *   eeee
 */
function quux () {

}
// Message: There must be no indentation.

/**
 * foo
 * ```html
 * <section>
 *   <title>test</title>
 * </section>
 * ```
 * @returns
 *   eeee
 */
function quux () {

}
// Message: There must be no indentation.

/**
 * foo
 * ```   aaaa```
 * @returns
 *   eeee
 */
function quux () {

}
// Message: There must be no indentation.

/**
* @example <caption>
* Here is a long
*   indented summary of this
* example
* </caption>
* ```js
* function hi () {
*   alert('Hello');
* }
* ```
*/
// "jsdoc/check-indentation": ["error"|"warn", {"excludeTags":[]}]
// Message: There must be no indentation.

/**
* @example <caption>
* Here is a long
* summary of this
* example
* </caption>
* // Code is not wrapped into fenced code block
* function hi () {
*   alert('Hello');
* }
*/
// "jsdoc/check-indentation": ["error"|"warn", {"excludeTags":[]}]
// Message: There must be no indentation.
````



<a name="user-content-check-indentation-passing-examples"></a>
<a name="check-indentation-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * foo
 *
 * @param bar
 * baz
 */
function quux () {

}

/*** foo */
function quux () {

}

/**
 * foo
 *
 * @example
 * anArray.filter((a) => {
 *   return a.b;
 * });
 */
function quux () {

}

/**
 * foo
 *
 * @example
 * anArray.filter((a) => {
 *   return a.b;
 * });
 * @returns
 *   eeee
 */
function quux () {

}
// "jsdoc/check-indentation": ["error"|"warn", {"excludeTags":["example","returns"]}]

/**
 * foo
 * ```html
 * <section>
 *   <title>test</title>
 * </section>
 * ```
 * @returns eeee
 */
function quux () {

}

/**
 * foo
 * ```   aaaa```
 * @returns eeee
 */
function quux () {

}

/**
* @example <caption>
* Here is a long
* summary of this
* example
* </caption>
* ```js
* function hi () {
*   alert('Hello');
* }
* ```
*/
// "jsdoc/check-indentation": ["error"|"warn", {"excludeTags":[]}]

/**
 * @example
 * ```
 * @MyDecorator({
 *   myOptions: 42
 * })
 * export class MyClass {}
 * ```
 */
function MyDecorator(options: { myOptions: number }) {
  return (Base: Function) => {};
}
// "jsdoc/check-indentation": ["error"|"warn", {"excludeTags":["example","MyDecorator"]}]

/**
 * @example ```
 * @MyDecorator({
 *   myOptions: 42
 * })
 * export class MyClass {}
 * ```
 */
function MyDecorator(options: { myOptions: number }) {
  return (Base: Function) => {};
}
````

