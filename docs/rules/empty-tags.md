<a name="user-content-empty-tags"></a>
<a name="empty-tags"></a>
### <code>empty-tags</code>



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

<a name="user-content-fixer"></a>
<a name="fixer"></a>
## Fixer

(Todo)

<a name="user-content-options"></a>
<a name="options"></a>
## Options

<a name="user-content-options-tags"></a>
<a name="options-tags"></a>
### <code>tags</code>

If you want additional tags to be checked for their descriptions, you may
add them within this option.

```js
{
  'jsdoc/empty-tags': ['error', {tags: ['event']}]
}
```

<a name="user-content-context-and-settings"></a>
<a name="context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags| `abstract`, `async`, `generator`, `global`, `hideconstructor`, `ignore`, `inheritdoc`, `inner`, `instance`, `internal`, `override`, `readonly`, `package`, `private`, `protected`, `public`, `static` and others added by `tags`|
|Recommended|true|
|Options|`tags`|

<a name="user-content-failing-examples"></a>
<a name="failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @abstract extra text
 */
function quux () {

}
// Message: @abstract should be empty.

/**
 * @interface extra text
 */
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: @interface should be empty.

class Test {
    /**
     * @abstract extra text
     */
    quux () {

    }
}
// Message: @abstract should be empty.

/**
 * @abstract extra text
 * @inheritdoc
 * @async out of place
 */
function quux () {

}
// Message: @abstract should be empty.

/**
 * @event anEvent
 */
function quux () {

}
// "jsdoc/empty-tags": ["error"|"warn", {"tags":["event"]}]
// Message: @event should be empty.

/**
 * @private {someType}
 */
function quux () {

}
// Message: @private should be empty.

/**
 * @internal {someType}
 */
function quux () {

}
// Message: @internal should be empty.

/**
 * @private {someType}
 */
function quux () {

}
// Settings: {"jsdoc":{"ignorePrivate":true}}
// Message: @private should be empty.
````



<a name="user-content-passing-examples"></a>
<a name="passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @abstract
 */
function quux () {

}

/**
 *
 */
function quux () {

}

/**
 * @param aName
 */
function quux () {

}

/**
 * @abstract
 * @inheritdoc
 * @async
 */
function quux () {

}

/**
 * @private {someType}
 */
function quux () {

}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @private
 */
function quux () {

}

/**
 * @internal
 */
function quux () {

}

/**
 * Create an array.
 *
 * @private
 *
 * @param {string[]} [elem] - Elements to make an array of.
 * @param {boolean} [clone] - Optionally clone nodes.
 * @returns {string[]} The array of nodes.
 */
function quux () {}
````

