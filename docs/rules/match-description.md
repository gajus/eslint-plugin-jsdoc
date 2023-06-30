<a name="user-content-match-description"></a>
<a name="match-description"></a>
# <code>match-description</code>

* [Options](#user-content-match-description-options)
    * [`matchDescription`](#user-content-match-description-options-matchdescription)
    * [`message`](#user-content-match-description-options-message)
    * [`nonemptyTags`](#user-content-match-description-options-nonemptytags)
    * [`tags`](#user-content-match-description-options-tags)
    * [`mainDescription`](#user-content-match-description-options-maindescription)
    * [`contexts`](#user-content-match-description-options-contexts)
* [Context and settings](#user-content-match-description-context-and-settings)
* [Failing examples](#user-content-match-description-failing-examples)
* [Passing examples](#user-content-match-description-passing-examples)


Enforces a regular expression pattern on descriptions.

The default is this basic expression to match English sentences (Support
for Unicode upper case may be added in a future version when it can be handled
by our supported Node versions):

``^\n?([A-Z`\\d_][\\s\\S]*[.?!`]\\s*)?$``

Applies by default to the jsdoc block description and to the following tags:

- `@description`/`@desc`
- `@summary`
- `@file`/`@fileoverview`/`@overview`
- `@classdesc`

In addition, the `tags` option (see below) may be used to match other tags.

The default (and all regex options) defaults to using (only) the `u` flag, so
to add your own flags, encapsulate your expression as a string, but like a
literal, e.g., `/[A-Z].*\\./ui`.

Note that `/` delimiters are optional, but necessary to add flags (besides
`u`).

Also note that the default or optional regular expressions is *not*
case-insensitive unless one opts in to add the `i` flag.

You can add the `s` flag if you want `.` to match newlines. Note, however,
that the trailing newlines of a description will not be matched.

<a name="user-content-match-description-options"></a>
<a name="match-description-options"></a>
## Options

<a name="user-content-match-description-options-matchdescription"></a>
<a name="match-description-options-matchdescription"></a>
### <code>matchDescription</code>

You can supply your own expression to override the default, passing a
`matchDescription` string on the options object.

```js
{
  'jsdoc/match-description': ['error', {matchDescription: '[A-Z].*\\.'}]
}
```

<a name="user-content-match-description-options-message"></a>
<a name="match-description-options-message"></a>
### <code>message</code>

You may provide a custom default message by using the following format:

```js
{
  'jsdoc/match-description': ['error', {
    message: 'The default description should begin with a capital letter.'
  }]
}
```

This can be overridden per tag or for the main block description by setting
`message` within `tags` or `mainDescription`, respectively.

<a name="user-content-match-description-options-nonemptytags"></a>
<a name="match-description-options-nonemptytags"></a>
### <code>nonemptyTags</code>

If not set to `false`, will enforce that the following tags have at least
some content:

- `@copyright`
- `@example`
- `@see`
- `@todo`

If you supply your own tag description for any of the above tags in `tags`,
your description will take precedence.

<a name="user-content-match-description-options-tags"></a>
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

Alternatively, you may supply an object with a `message` property to indicate
the error message for that tag.

```js
{
  'jsdoc/match-description': ['error', {tags: {
    param: {message: 'Begin with a hyphen', match: '\\- [A-Z].*\\.'},
    returns: {message: 'Capitalize for returns (the default)', match: true}
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

<a name="user-content-match-description-options-maindescription"></a>
<a name="match-description-options-maindescription"></a>
### <code>mainDescription</code>

If you wish to override the main block description without changing the
default `match-description` (which can cascade to the `tags` with `true`),
you may use `mainDescription`:

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
block description (and only the main block description) is linted, though you
may disable checking it by setting it to `false`.

You may also provide an object with `message`:

```js
{
  'jsdoc/match-description': ['error', {
    mainDescription: {
      message: 'Capitalize first word of JSDoc block descriptions',
      match: '[A-Z].*\\.'
    },
    tags: {
      param: true,
      returns: true
    }
  }]
}
```

<a name="user-content-match-description-options-contexts"></a>
<a name="match-description-options-contexts"></a>
### <code>contexts</code>

Set this to an array of strings representing the AST context (or an object with
`context` and `comment` properties) where you wish the rule to be applied.
(e.g., `ClassDeclaration` for ES6
classes). Overrides the default contexts (see below). Set to `"any"` if you
want the rule to apply to any jsdoc block throughout your files.

See the ["AST and Selectors"](#user-content-eslint-plugin-jsdoc-advanced-ast-and-selectors)
section of our README for more on the expected format.

<a name="user-content-match-description-context-and-settings"></a>
<a name="match-description-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|docblock and `@description` by default but more with `tags`|
|Aliases|`@desc`|
|Recommended|false|
|Settings||
|Options|`contexts`, `mainDescription`, `matchDescription`, `message`, `nonemptyTags`, `tags`|

<a name="user-content-match-description-failing-examples"></a>
<a name="match-description-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * foo.
 */
const q = class {

}
// "jsdoc/match-description": ["error"|"warn", {"contexts":["ClassExpression"]}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * foo.
 */
const q = class {

}
// "jsdoc/match-description": ["error"|"warn", {"contexts":["ClassExpression"],"message":"Needs to begin with a capital letter and end with an end mark."}]
// Message: Needs to begin with a capital letter and end with an end mark.

/**
 * foo.
 */
// "jsdoc/match-description": ["error"|"warn", {"contexts":["any"]}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * foo.
 */
// "jsdoc/match-description": ["error"|"warn", {"contexts":["any"]}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * foo.
 */
const q = {

};
// "jsdoc/match-description": ["error"|"warn", {"contexts":["ObjectExpression"]}]
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
// "jsdoc/match-description": ["error"|"warn", {"matchDescription":"[А-Я][А-я]+\\."}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * тест.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"matchDescription":"[А-Я][А-я]+\\.","message":"Needs to begin with a capital letter and end with an end mark."}]
// Message: Needs to begin with a capital letter and end with an end mark.

/**
 * Abc.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"mainDescription":"[А-Я][А-я]+\\.","tags":{"param":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Abc.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"mainDescription":{"match":"[А-Я][А-я]+\\.","message":"Needs to begin with a Cyrillic capital letter and end with a period."},"tags":{"param":true}}]
// Message: Needs to begin with a Cyrillic capital letter and end with a period.

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
// "jsdoc/match-description": ["error"|"warn", {"tags":{"param":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @template Abc, Def foo.
 */
function quux (foo) {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"template":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @prop foo foo.
 */
function quux (foo) {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"prop":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @summary foo.
 */
function quux () {

}
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @author
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"author":".+"}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @x-tag
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"x-tag":".+"}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @description foo foo.
 */
function quux (foo) {

}
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo
 *
 * @param foo foo.
 */
function quux (foo) {

}
// "jsdoc/match-description": ["error"|"warn", {"mainDescription":"^[a-zA-Z]*\\s*$","tags":{"param":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo
 *
 * @param foo foo.
 */
function quux (foo) {

}
// "jsdoc/match-description": ["error"|"warn", {"mainDescription":{"match":"^[a-zA-Z]*\\s*$","message":"Letters only"},"tags":{"param":{"match":true,"message":"Needs to begin with a capital letter and end with a period."}}}]
// Message: Needs to begin with a capital letter and end with a period.

/**
 * Foo
 *
 * @param foo foo.
 */
function quux (foo) {

}
// "jsdoc/match-description": ["error"|"warn", {"mainDescription":false,"tags":{"param":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @param foo bar
 */
function quux (foo) {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"param":true}}]
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
// "jsdoc/match-description": ["error"|"warn", {"tags":{"returns":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @returns foo.
 */
function quux (foo) {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"returns":true}}]
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
// "jsdoc/match-description": ["error"|"warn", {"tags":{"arg":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * @argument {number} foo - Foo
 */
function quux (foo) {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"argument":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * @return {number} foo
 */
function quux (foo) {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"return":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Returns bar.
 *
 * @return {number} bar
 */
function quux (foo) {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"return":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * @param notRet
 * @returns Тест.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"param":"[А-Я][А-я]+\\."}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * @description notRet
 * @returns Тест.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"description":"[А-Я][А-я]+\\."}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * foo.
 */
class quux {

}
// "jsdoc/match-description": ["error"|"warn", {"contexts":["ClassDeclaration"]}]
// Message: JSDoc description does not satisfy the regex pattern.

class MyClass {
  /**
   * Abc
   */
  myClassField = 1
}
// "jsdoc/match-description": ["error"|"warn", {"contexts":["PropertyDefinition"]}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * foo.
 */
interface quux {

}
// "jsdoc/match-description": ["error"|"warn", {"contexts":["TSInterfaceDeclaration"]}]
// Message: JSDoc description does not satisfy the regex pattern.

const myObject = {
  /**
   * Bad description
   */
  myProp: true
};
// "jsdoc/match-description": ["error"|"warn", {"contexts":["Property"]}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * @param foo Foo bar
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"param":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo bar
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Description with extra new line
 *
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"matchDescription":"[\\s\\S]*\\S$"}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 *
 * This function does lots of things.
 */
 function quux () {

 }
// "jsdoc/match-description": ["error"|"warn", {"matchDescription":"^\\S[\\s\\S]*\\S$"}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 *
 * @param
 */
// "jsdoc/match-description": ["error"|"warn", {"contexts":["any"],"matchDescription":"^\\S[\\s\\S]*\\S$"}]
// Message: JSDoc description does not satisfy the regex pattern.

/** Does something very important. */
function foo(): string;
// "jsdoc/match-description": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[endLine=0]"}],"matchDescription":"^\\S[\\s\\S]*\\S$"}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * @copyright
 */
function quux () {
}
// Message: JSDoc description must not be empty.
````



<a name="user-content-match-description-passing-examples"></a>
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
// "jsdoc/match-description": ["error"|"warn", {"tags":{"param":true}}]

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
 * Foo.
 *
 * Bar.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"message":"This won't be shown"}]

/**
 * Тест.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"matchDescription":"[А-Я][А-я]+\\."}]

/**
 * @param notRet
 * @returns Тест.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"returns":"[А-Я][А-я]+\\."}}]

/**
 * @param notRet
 * @description Тест.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"description":"[А-Я][А-я]+\\."}}]

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
// "jsdoc/match-description": ["error"|"warn", {"tags":{"returns":true}}]

/**
 * @returns {type1} Foo bar.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"returns":true}}]

/**
 * @description Foo bar.
 */
function quux () {

}

/**
 * @description Foo
 * bar.
 * @param
 */
function quux () {

}

/** @description Foo bar. */
function quux () {

}

/**
 * @description Foo
 * bar.
 */
function quux () {

}

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
// "jsdoc/match-description": ["error"|"warn", {"mainDescription":false}]

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
// "jsdoc/match-description": ["error"|"warn", {"mainDescription":true}]

class MyClass {
  /**
   * Abc.
   */
  myClassField = 1
}
// "jsdoc/match-description": ["error"|"warn", {"contexts":["PropertyDefinition"]}]

/**
 * Foo.
 */
interface quux {

}
// "jsdoc/match-description": ["error"|"warn", {"contexts":["TSInterfaceDeclaration"]}]

const myObject = {
  /**
   * Bad description
   */
  myProp: true
};
// "jsdoc/match-description": ["error"|"warn", {"contexts":[]}]

/**
 * foo.
 */
const q = class {

}
// "jsdoc/match-description": ["error"|"warn", {"contexts":[]}]

/**
 * foo.
 */
const q = {

};
// "jsdoc/match-description": ["error"|"warn", {"contexts":[]}]

/**
 * @deprecated foo.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"param":true}}]

/**
 * Foo.
 *
 * @summary Foo.
 */
function quux () {

}

/**
 * Foo.
 *
 * @author Somebody
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"author":".+"}}]

/**
 * Foo.
 *
 * @x-tag something
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"x-tag":".+"}}]

/**
 * Foo.
 *
 * @prop foo Foo.
 */
function quux (foo) {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"prop":true}}]

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

/**
 * Foo.
 *
 * @template Abc, Def Foo.
 */
function quux (foo) {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"template":true}}]

/**
 * Enable or disable plugin.
 *
 * When enabling with this function, the script will be attached to the `document` if:.
 * - the script runs in browser context.
 * - the `document` doesn't have the script already attached.
 * - the `loadScript` option is set to `true`.
 * @param enabled `true` to enable, `false` to disable. Default: `true`.
 */
// "jsdoc/match-description": ["error"|"warn", {"contexts":["any"],"mainDescription":"/^[A-Z`-].*\\.$/us","matchDescription":"^([A-Z`-].*(\\.|:)|-\\s.*)$","tags":{"param":true,"returns":true}}]

/**
 * @constructor
 * @todo Ok.
 */
function quux () {
}
// "jsdoc/match-description": ["error"|"warn", {"mainDescription":false,"tags":{"todo":true}}]

/** Does something very important. */
function foo(): string;
// "jsdoc/match-description": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[endLine!=0]"}],"matchDescription":"^\\S[\\s\\S]*\\S$"}]

/**
 * This is my favorite function, foo.
 *
 * @returns Nothing.
 */
function foo(): void;
// "jsdoc/match-description": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[endLine!=0]:not(:has(JsdocTag))"}],"matchDescription":"^\\S[\\s\\S]*\\S$"}]

/**
 * @copyright
 */
function quux () {
}
// "jsdoc/match-description": ["error"|"warn", {"nonemptyTags":false}]
````

