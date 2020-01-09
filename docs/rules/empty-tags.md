<a name="empty-tags"></a>
# <code>empty-tags</code>

* [`empty-tags`](#empty-tags)
    * [Options](#empty-tags-options)
        * [`tags`](#empty-tags-options-tags)
    * [Fixer](#empty-tags-fixer)
    * [Context and settings](#empty-tags-context-and-settings)
    * [Failing examples](#empty-tags-failing-examples)
    * [Passing examples](#empty-tags-passing-examples)


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

<a name="empty-tags-options"></a>
## Options

<a name="empty-tags-options-tags"></a>
### <code>tags</code>

If you want additional tags to be checked for their descriptions, you may
add them within this option.

```js
{
  'jsdoc/empty-tags': ['error', {tags: ['event']}]
}
```

<a name="empty-tags-fixer"></a>
## Fixer

(Todo)

<a name="empty-tags-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags| and others added by `tags`|
|Aliases||
|Options|`tags`|
<a name="empty-tags-failing-examples"></a>
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
// Options: [{"tags":["event"]}]
// Message: @event should be empty.

/**
 * @private {someType}
 */
function quux () {

}
// Message: @private should be empty.

/**
 * @private {someType}
 */
function quux () {

}
// Settings: {"jsdoc":{"ignorePrivate":true}}
// Message: @private should be empty.
````


<a name="empty-tags-passing-examples"></a>
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
````

