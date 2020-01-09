<a name="match-description"></a>
# <code>match-description</code>

* [`match-description`](#match-description)
    * [Options](#match-description-options)
        * [`matchDescription`](#match-description-options-matchdescription)
        * [`tags`](#match-description-options-tags)
        * [`mainDescription`](#match-description-options-maindescription)
        * [`contexts`](#match-description-options-contexts)
    * [Context and settings](#match-description-context-and-settings)
    * [Failing examples](#match-description-failing-examples)
    * [Passing examples](#match-description-passing-examples)


Enforces a regular expression pattern on descriptions.

The default is this basic expression to match English sentences (Support
for Unicode upper case may be added in a future version when it can be handled
by our supported Node versions):

``^([A-Z]|[`\\d_])[\\s\\S]*[.?!`]$``

Applies to the jsdoc block description and `@description` (or `@desc`)
by default but the `tags` option (see below) may be used to match other tags.

<a name="match-description-options"></a>
## Options

<a name="match-description-options-matchdescription"></a>
### <code>matchDescription</code>

You can supply your own expression to override the default, passing a
`matchDescription` string on the options object.

```js
{
  'jsdoc/match-description': ['error', {matchDescription: '[A-Z].*\\.'}]
}
```

As with the default, the supplied regular expression will be applied with the
Unicode (`"u"`) flag and is *not* case-insensitive.

<a name="match-description-options-tags"></a>
### <code>tags</code>

If you want different regular expressions to apply to tags, you may use
the `tags` option object:

```js
{
  'jsdoc/match-description': ['error', {tags: {
    param: '\\- [A-Z].*\\.',
    returns: '[A-Z].*\\.'
  }}]
}
```

In place of a string, you can also add `true` to indicate that a particular
tag should be linted with the `matchDescription` value (or the default).

```js
{
  'jsdoc/match-description': ['error', {tags: {
    param: true,
    returns: true
  }}]
}
```

The tags `@param`/`@arg`/`@argument` and `@property`/`@prop` will be properly
parsed to ensure that the matched "description" text includes only the text
after the name.

All other tags will treat the text following the tag name, a space, and
an optional curly-bracketed type expression (and another space) as part of
its "description" (e.g., for `@returns {someType} some description`, the
description is `some description` while for `@some-tag xyz`, the description
is `xyz`).

<a name="match-description-options-maindescription"></a>
### <code>mainDescription</code>

If you wish to override the main function description without changing the
default `match-description`, you may use `mainDescription`:

```js
{
  'jsdoc/match-description': ['error', {
    mainDescription: '[A-Z].*\\.',
    tags: {
      param: true,
      returns: true
    }
  }]
}
```

There is no need to add `mainDescription: true`, as by default, the main
function (and only the main function) is linted, though you may disable checking
it by setting it to `false`.

<a name="match-description-options-contexts"></a>
### <code>contexts</code>

Set this to an array of strings representing the AST context
where you wish the rule to be applied (e.g., `ClassDeclaration` for ES6 classes).
Overrides the default contexts (see below). Set to `"any"` if you want
the rule to apply to any jsdoc block throughout your files.

<a name="match-description-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|docblock and `@description` by default but more with `tags`|
|Aliases|`@desc`|
|Settings||
|Options|`contexts`, `tags` (accepts tags with names and optional type such as 'param', 'arg', 'argument', 'property', and 'prop', and accepts arbitrary list of other tags with an optional type (but without names), e.g., 'returns', 'return'), `mainDescription`, `matchDescription`|

<a name="match-description-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * foo.
 */
const q = class {

}
// Options: [{"contexts":["ClassExpression"]}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * foo.
 */
// Options: [{"contexts":["any"]}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * foo.
 */
// Options: [{"contexts":["any"]}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * foo.
 */
const q = {

};
// Options: [{"contexts":["ObjectExpression"]}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * foo.
 */
function quux () {

}
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo)
 */
function quux () {

}
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * тест.
 */
function quux () {

}
// Options: [{"matchDescription":"[А-Я][А-я]+\\."}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Abc.
 */
function quux () {

}
// Options: [{"mainDescription":"[А-Я][А-я]+\\.","tags":{"param":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo
 */
function quux () {

}
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @param foo foo.
 */
function quux (foo) {

}
// Options: [{"tags":{"param":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @prop foo foo.
 */
function quux (foo) {

}
// Options: [{"tags":{"prop":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @summary foo.
 */
function quux () {

}
// Options: [{"tags":{"summary":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @author
 */
function quux () {

}
// Options: [{"tags":{"author":".+"}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @x-tag
 */
function quux () {

}
// Options: [{"tags":{"x-tag":".+"}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @description foo foo.
 */
function quux (foo) {

}
// Options: [{"tags":{"description":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo
 *
 * @param foo foo.
 */
function quux (foo) {

}
// Options: [{"mainDescription":"^[a-zA-Z]*$","tags":{"param":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo
 *
 * @param foo foo.
 */
function quux (foo) {

}
// Options: [{"mainDescription":false,"tags":{"param":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @param foo bar
 */
function quux (foo) {

}
// Options: [{"tags":{"param":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * {@see Foo.bar} buz
 */
function quux (foo) {

}
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @returns {number} foo
 */
function quux (foo) {

}
// Options: [{"tags":{"returns":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @returns foo.
 */
function quux (foo) {

}
// Options: [{"tags":{"returns":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * lorem ipsum dolor sit amet, consectetur adipiscing elit. pellentesque elit diam,
 * iaculis eu dignissim sed, ultrices sed nisi. nulla at ligula auctor, consectetur neque sed,
 * tincidunt nibh. vivamus sit amet vulputate ligula. vivamus interdum elementum nisl,
 * vitae rutrum tortor semper ut. morbi porta ante vitae dictum fermentum.
 * proin ut nulla at quam convallis gravida in id elit. sed dolor mauris, blandit quis ante at,
 * consequat auctor magna. duis pharetra purus in porttitor mollis.
 */
function longDescription (foo) {

}
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * @arg {number} foo - Foo
 */
function quux (foo) {

}
// Options: [{"tags":{"arg":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * @argument {number} foo - Foo
 */
function quux (foo) {

}
// Options: [{"tags":{"argument":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * @return {number} foo
 */
function quux (foo) {

}
// Options: [{"tags":{"return":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Returns bar.
 *
 * @return {number} bar
 */
function quux (foo) {

}
// Options: [{"tags":{"return":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * @param notRet
 * @returns Тест.
 */
function quux () {

}
// Options: [{"tags":{"param":"[А-Я][А-я]+\\."}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * @description notRet
 * @returns Тест.
 */
function quux () {

}
// Options: [{"tags":{"description":"[А-Я][А-я]+\\."}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * foo.
 */
class quux {

}
// Options: [{"contexts":["ClassDeclaration"]}]
// Message: JSDoc description does not satisfy the regex pattern.

class MyClass {
  /**
   * Abc
   */
  myClassField = 1
}
// Options: [{"contexts":["ClassProperty"]}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * foo.
 */
interface quux {

}
// Options: [{"contexts":["TSInterfaceDeclaration"]}]
// Message: JSDoc description does not satisfy the regex pattern.

const myObject = {
  /**
   * Bad description
   */
  myProp: true
};
// Options: [{"contexts":["Property"]}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * @param foo Foo bar
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
// Options: [{"tags":{"param":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo bar
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
// Message: JSDoc description does not satisfy the regex pattern.
````


<a name="match-description-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 *
 */

/**
 *
 */
 function quux () {

 }

/**
 * @param foo - Foo.
 */
function quux () {

}
// Options: [{"tags":{"param":true}}]

/**
 * Foo.
 */
function quux () {

}

/**
 * Foo.
 * Bar.
 */
function quux () {

}

/**
 * Foo.
 *
 * Bar.
 */
function quux () {

}

/**
 * Тест.
 */
function quux () {

}
// Options: [{"matchDescription":"[А-Я][А-я]+\\."}]

/**
 * @param notRet
 * @returns Тест.
 */
function quux () {

}
// Options: [{"tags":{"returns":"[А-Я][А-я]+\\."}}]

/**
 * @param notRet
 * @description Тест.
 */
function quux () {

}
// Options: [{"tags":{"description":"[А-Я][А-я]+\\."}}]

/**
 * Foo
 * bar.
 */
function quux () {

}

/**
 * @returns Foo bar.
 */
function quux () {

}
// Options: [{"tags":{"returns":true}}]

/**
 * @returns {type1} Foo bar.
 */
function quux () {

}
// Options: [{"tags":{"returns":true}}]

/**
 * @description Foo bar.
 */
function quux () {

}
// Options: [{"tags":{"description":true}}]

/**
 * Foo. {@see Math.sin}.
 */
function quux () {

}

/**
 * Foo {@see Math.sin} bar.
 */
function quux () {

}

/**
 * Foo?
 *
 * Bar!
 *
 * Baz:
 *   1. Foo.
 *   2. Bar.
 */
function quux () {

}

/**
 * Hello:
 * World.
 */
function quux () {

}

/**
 * Hello: world.
 */
function quux () {

}

/**
 * Foo
 * Bar.
 */
function quux () {

}

/**
 * Foo.
 *
 * foo.
 */
function quux () {

}

/**
 * foo.
 */
function quux () {

}
// Options: [{"mainDescription":false}]

/**
 * foo.
 */
class quux {

}

/**
 * foo.
 */
class quux {

}
// Options: [{"mainDescription":true}]

class MyClass {
  /**
   * Abc.
   */
  myClassField = 1
}
// Options: [{"contexts":["ClassProperty"]}]

/**
 * Foo.
 */
interface quux {

}
// Options: [{"contexts":["TSInterfaceDeclaration"]}]

const myObject = {
  /**
   * Bad description
   */
  myProp: true
};
// Options: [{"contexts":[]}]

/**
 * foo.
 */
const q = class {

}
// Options: [{"contexts":[]}]

/**
 * foo.
 */
const q = {

};
// Options: [{"contexts":[]}]

/**
 * @description foo.
 */
function quux () {

}
// Options: [{"tags":{"param":true}}]

/**
 * Foo.
 *
 * @summary Foo.
 */
function quux () {

}
// Options: [{"tags":{"summary":true}}]

/**
 * Foo.
 *
 * @author Somebody
 */
function quux () {

}
// Options: [{"tags":{"author":".+"}}]

/**
 * Foo.
 *
 * @x-tag something
 */
function quux () {

}
// Options: [{"tags":{"x-tag":".+"}}]

/**
 * Foo.
 *
 * @prop foo Foo.
 */
function quux (foo) {

}
// Options: [{"tags":{"prop":true}}]

/**
 * @param foo Foo bar.
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}

/**
 *
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
````

