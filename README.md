<h1 id="eslint-plugin-jsdoc">eslint-plugin-jsdoc</h1>

[![NPM version](http://img.shields.io/npm/v/eslint-plugin-jsdoc.svg?style=flat-square)](https://www.npmjs.org/package/eslint-plugin-jsdoc)
[![Travis build status](http://img.shields.io/travis/gajus/eslint-plugin-jsdoc/master.svg?style=flat-square)](https://travis-ci.org/gajus/eslint-plugin-jsdoc)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

JSDoc linting rules for ESLint.

* [eslint-plugin-jsdoc](#eslint-plugin-jsdoc)
    * [Reference to jscs-jsdoc](#eslint-plugin-jsdoc-reference-to-jscs-jsdoc)
    * [Installation](#eslint-plugin-jsdoc-installation)
    * [Configuration](#eslint-plugin-jsdoc-configuration)
    * [Settings](#eslint-plugin-jsdoc-settings)
        * [Alias Preference](#eslint-plugin-jsdoc-settings-alias-preference)
    * [Rules](#eslint-plugin-jsdoc-rules)
        * [`check-param-names`](#eslint-plugin-jsdoc-rules-check-param-names)
        * [`check-tag-names`](#eslint-plugin-jsdoc-rules-check-tag-names)
        * [`check-types`](#eslint-plugin-jsdoc-rules-check-types)
        * [`newline-after-description`](#eslint-plugin-jsdoc-rules-newline-after-description)
        * [`require-description-complete-sentence`](#eslint-plugin-jsdoc-rules-require-description-complete-sentence)
        * [`require-hyphen-before-param-description`](#eslint-plugin-jsdoc-rules-require-hyphen-before-param-description)
        * [`require-param`](#eslint-plugin-jsdoc-rules-require-param)
        * [`require-param-description`](#eslint-plugin-jsdoc-rules-require-param-description)
        * [`require-param-type`](#eslint-plugin-jsdoc-rules-require-param-type)
        * [`require-returns-description`](#eslint-plugin-jsdoc-rules-require-returns-description)
        * [`require-returns-type`](#eslint-plugin-jsdoc-rules-require-returns-type)


<h3 id="eslint-plugin-jsdoc-reference-to-jscs-jsdoc">Reference to jscs-jsdoc</h3>

This table maps the rules between `eslint-plugin-jsdoc` and `jscs-jsdoc`.

| `eslint-plugin-jsdoc` | `jscs-jsdoc` |
| --- | --- |
| [`check-param-names`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-param-names) | [`checkParamNames`](https://github.com/jscs-dev/jscs-jsdoc#checkparamnames) |
| [`check-tag-names`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-tag-names) | N/A ~ [`checkAnnotations`](https://github.com/jscs-dev/jscs-jsdoc#checkannotations) |
| [`check-types`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-types) | [`checkTypes`](https://github.com/jscs-dev/jscs-jsdoc#checktypes) |
| [`newline-after-description`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-newline-after-description) | [`requireNewlineAfterDescription`](https://github.com/jscs-dev/jscs-jsdoc#requirenewlineafterdescription) and [`disallowNewlineAfterDescription`](https://github.com/jscs-dev/jscs-jsdoc#disallownewlineafterdescription) |
| [`require-description-complete-sentence`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-description-complete-sentence) | [`requireDescriptionCompleteSentence`](https://github.com/jscs-dev/jscs-jsdoc#requiredescriptioncompletesentence) |
| [`require-hyphen-before-param-description`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-hyphen-before-param-description) | [`requireHyphenBeforeDescription`](https://github.com/jscs-dev/jscs-jsdoc#requirehyphenbeforedescription) |
| [`require-param`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-param) | [`checkParamExistence`](https://github.com/jscs-dev/jscs-jsdoc#checkparamexistence) |
| [`require-param-description`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-param-description) | [`requireParamDescription`](https://github.com/jscs-dev/jscs-jsdoc#requireparamdescription) |
| [`require-param-type`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-param-type) | [`requireParamTypes`](https://github.com/jscs-dev/jscs-jsdoc#requireparamtypes) |
| [`require-returns-description`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-returns-description) | [`requireReturnDescription`](https://github.com/jscs-dev/jscs-jsdoc#requirereturndescription) |
| [`require-returns-type`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-returns-type) | [`requireReturnTypes`](https://github.com/jscs-dev/jscs-jsdoc#requirereturntypes) |
| N/A | [`checkReturnTypes`](https://github.com/jscs-dev/jscs-jsdoc#checkreturntypes) |
| N/A | [`checkRedundantParams`](https://github.com/jscs-dev/jscs-jsdoc#checkredundantparams) |
| N/A | [`checkReturnTypes`](https://github.com/jscs-dev/jscs-jsdoc#checkreturntypes) |
| N/A | [`checkRedundantAccess`](https://github.com/jscs-dev/jscs-jsdoc#checkredundantaccess) |
| N/A | [`enforceExistence`](https://github.com/jscs-dev/jscs-jsdoc#enforceexistence) |
| N/A | [`leadingUnderscoreAccess`](https://github.com/jscs-dev/jscs-jsdoc#leadingunderscoreaccess) |

<h2 id="eslint-plugin-jsdoc-installation">Installation</h2>

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.

```sh
npm install eslint
```

If you have installed `ESLint` globally, you have to install JSDoc plugin globally too. Otherwise, install it locally.

```sh
npm install eslint-plugin-jsdoc
```

<h2 id="eslint-plugin-jsdoc-configuration">Configuration</h2>

Add `plugins` section and specify `eslint-plugin-jsdoc` as a plugin.

```json
{
    "plugins": [
        "jsdoc"
    ]
}
```

Finally, enable all of the rules that you would like to use.

```json
{
    "rules": {
        "jsdoc/check-param-names": 1,
        "jsdoc/check-tag-names": 1,
        "jsdoc/check-types": 1,
        "jsdoc/newline-after-description": 1,
        "jsdoc/require-description-complete-sentence": 1,
        "jsdoc/require-hyphen-before-param-description": 1,
        "jsdoc/require-param": 1,
        "jsdoc/require-param-description": 1,
        "jsdoc/require-param-type": 1,
        "jsdoc/require-returns-description": 1,
        "jsdoc/require-returns-type": 1
    }
}
```

<h2 id="eslint-plugin-jsdoc-settings">Settings</h2>

<h3 id="eslint-plugin-jsdoc-settings-alias-preference">Alias Preference</h3>

Use `settings.jsdoc.tagNamePreference` to configure a preferred alias name for a JSDoc tag. The format of the configuration is: `<primary tag name>: <preferred alias name>`, e.g.

```json
{
    "rules": {},
    "settings": {
        "jsdoc": {
            "tagNamePreference": {
                "param": "arg",
                "returns": "return"
            }
        }
    }
}
```

<h2 id="eslint-plugin-jsdoc-rules">Rules</h2>

<h3 id="eslint-plugin-jsdoc-rules-check-param-names"><code>check-param-names</code></h3>

Ensures that parameter names in JSDoc match those in the function declaration.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`param`|

The following patterns are considered problems:

```js
/**
 * @param Foo
 */
function quux (foo = 'FOO') {

}
// Message: Expected @param names to be "foo". Got "Foo".

/**
 * @arg Foo
 */
function quux (foo = 'FOO') {

}
// Message: Expected @arg names to be "foo". Got "Foo".

/**
 * @param Foo
 */
function quux (foo) {

}
// Message: Expected @param names to be "foo". Got "Foo".

/**
 * @param Foo.Bar
 */
function quux (foo) {

}
// Message: @param path declaration ("Foo.Bar") appears before any real parameter.

/**
 * @param foo
 * @param Foo.Bar
 */
function quux (foo) {

}
// Message: @param path declaration ("Foo.Bar") root node name ("Foo") does not match previous real parameter name ("foo").

/**
 * @param foo
 * @param foo.bar
 * @param bar
 */
function quux (bar, foo) {

}
// Message: Expected @param names to be "bar, foo". Got "foo, bar".

/**
 * @param foo
 * @param bar
 */
function quux (foo) {

}
// Message: @param "bar" does not match an existing function parameter.
```

The following patterns are not considered problems:

```js
/**
 *
 */
function quux (foo) {

}

/**
 * @param foo
 */
function quux (foo) {

}

/**
 * @param foo
 * @param bar
 */
function quux (foo, bar) {

}

/**
 * @param foo
 * @param bar
 */
function quux (foo, bar, baz) {

}

/**
 * @param foo
 * @param foo.foo
 * @param bar
 */
function quux (foo, bar) {

}

/**
 * @param args
 */
function quux (...args) {

}

/**
 * @param foo
 */
function quux ({a, b}) {

}
```


<h4 id="eslint-plugin-jsdoc-rules-check-param-names-deconstructing-function-parameter">Deconstructing Function Parameter</h4>

`eslint-plugin-jsdoc` does not validate names of parameters in function deconstruction, e.g.

```js
/**
 * @param foo
 */
function quux ({
    a,
    b
}) {

}
```

`{a, b}` is an [`ObjectPattern`](https://github.com/estree/estree/blob/master/es6.md#objectpattern) AST type and does not have a name. Therefore, the associated parameter in JSDoc block can have any name.

<h3 id="eslint-plugin-jsdoc-rules-check-tag-names"><code>check-tag-names</code></h3>

Reports invalid block tag names.

Valid [JSDoc 3 Block Tags](http://usejsdoc.org/#block-tags) are:

```
abstract
access
alias
augments
author
borrows
callback
class
classdesc
constant
constructs
copyright
default
deprecated
description
enum
event
example
exports
external
file
fires
function
global
ignore
implements
inheritdoc
inner
instance
interface
kind
lends
license
listens
member
memberof
mixes
mixin
module
name
namespace
override
param
private
property
protected
public
readonly
requires
returns
see
since
static
summary
this
throws
todo
tutorial
type
typedef
variation
version
```

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|N/A|

The following patterns are considered problems:

```js
/**
 * @Param
 */
function quux () {

}
// Message: Invalid JSDoc tag name "Param".

/**
 * @foo
 */
function quux () {

}
// Message: Invalid JSDoc tag name "foo".

/**
 * @arg foo
 */
function quux (foo) {

}
// Message: Invalid JSDoc tag (preference). Replace "arg" JSDoc tag with "param".

/**
 * @param foo
 */
function quux (foo) {

}
// Message: Invalid JSDoc tag (preference). Replace "param" JSDoc tag with "arg".
```

The following patterns are not considered problems:

```js
/**
 * @param foo
 */
function quux (foo) {

}

/**
 * @arg foo
 */
function quux (foo) {

}
```


<h3 id="eslint-plugin-jsdoc-rules-check-types"><code>check-types</code></h3>

Reports invalid types.

Ensures that case of native types is the same as in this list:

```
boolean
number
string
Object
Array
Date
RegExp
```

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`class`, `constant`, `enum`, `member`, `module`, `namespace`, `param`, `property`, `returns`, `throws`, `type`, `typedef`|

The following patterns are considered problems:

```js
/**
 * @param {Number} foo
 */
function quux (foo) {

}
// Message: Invalid JSDoc @param "foo" type "Number".

/**
 * @arg {Number} foo
 */
function quux (foo) {

}
// Message: Invalid JSDoc @arg "foo" type "Number".
```

The following patterns are not considered problems:

```js
/**
 * @param {number} foo
 * @param {Bar} bar
 * @param {*} baz
 */
function quux (foo, bar, baz) {

}

/**
 * @arg {number} foo
 * @arg {Bar} bar
 * @arg {*} baz
 */
function quux (foo, bar, baz) {

}
```


<h3 id="eslint-plugin-jsdoc-rules-newline-after-description"><code>newline-after-description</code></h3>

Enforces a consistent padding of the block description.

This rule takes one argument. If it is `"always"` then a problem is raised when there is a newline after the description. If it is `"never"` then a problem is raised when there is no newline after the description. The default value is `"always"`.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|N/A|

The following patterns are considered problems:

```js
/**
 * Foo.
 *
 * Foo.
 * @foo
 */
function quux () {

}
// Options: ["always"]
// Message: There must be a newline after the description of the JSDoc block.

/**
 * Bar.
 *
 * Bar.
 *
 * @bar
 */
function quux () {

}
// Options: ["never"]
// Message: There must be no newline after the description of the JSDoc block.
```

The following patterns are not considered problems:

```js
/**
 * Foo.
 */
function quux () {

}
// Options: ["always"]

/**
 * Bar.
 */
function quux () {

}
// Options: ["never"]

/**
 * Foo.
 *
 * @foo
 */
function quux () {

}
// Options: ["always"]

/**
 * Bar.
 * @bar
 */
function quux () {

}
// Options: ["never"]
```


<h3 id="eslint-plugin-jsdoc-rules-require-description-complete-sentence"><code>require-description-complete-sentence</code></h3>

Requires that block description and tag description are written in complete sentences, i.e.,

* Description must start with an uppercase alphabetical character.
* Paragraph must start with an uppercase alphabetical character.
* Sentences must end with a period.
* Every line that starts with a lowercase character must be preceded by a line ending the sentence.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`param`, `returns`|

The following patterns are considered problems:

```js
/**
 * foo.
 */
function quux () {

}
// Message: Description must start with an uppercase character.

/**
 * Foo.
 *
 * foo.
 */
function quux () {

}
// Message: Paragraph must start with an uppercase character.

/**
 * Foo
 */
function quux () {

}
// Message: Sentence must end with a period.

/**
 * Foo
 * Bar.
 */
function quux () {

}
// Message: A line of text is started with an uppercase character, but preceding line does not end the sentence.

/**
 * Foo.
 *
 * @param foo foo.
 */
function quux (foo) {

}
// Message: Description must start with an uppercase character.

/**
 * Foo.
 *
 * @returns foo.
 */
function quux (foo) {

}
// Message: Description must start with an uppercase character.
```

The following patterns are not considered problems:

```js
/**
 * @param foo - Foo.
 */
function quux () {

}

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
```


<h3 id="eslint-plugin-jsdoc-rules-require-hyphen-before-param-description"><code>require-hyphen-before-param-description</code></h3>

Requires a hyphen before the `@param` description.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`param`|

The following patterns are considered problems:

```js
/**
 * @param foo Foo.
 */
function quux () {

}
// Message: There must be a hyphen before @param description.
```

The following patterns are not considered problems:

```js
/**
 * @param foo - Foo.
 */
function quux () {

}
```


<h3 id="eslint-plugin-jsdoc-rules-require-param"><code>require-param</code></h3>

Requires that all function parameters are documented.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`param`|

The following patterns are considered problems:

```js
/**
 *
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 *
 */
function quux (foo) {

}
// Message: Missing JSDoc @arg "foo" declaration.

/**
 * @param foo
 */
function quux (foo, bar) {

}
// Message: Missing JSDoc @param "bar" declaration.
```

The following patterns are not considered problems:

```js
/**
 * @param foo
 */
function quux (foo) {

}

/**
 * @arg foo
 */
function quux (foo) {

}
```


<h3 id="eslint-plugin-jsdoc-rules-require-param-description"><code>require-param-description</code></h3>

Requires that `@param` tag has `description` value.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`param`|

The following patterns are considered problems:

```js
/**
 * @param foo
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" description.

/**
 * @arg foo
 */
function quux (foo) {

}
// Message: Missing JSDoc @arg "foo" description.
```

The following patterns are not considered problems:

```js
/**
 *
 */
function quux (foo) {

}

/**
 * @param foo Foo.
 */
function quux (foo) {

}
```


<h3 id="eslint-plugin-jsdoc-rules-require-param-type"><code>require-param-type</code></h3>

Requires that `@param` tag has `type` value.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`param`|

The following patterns are considered problems:

```js
/**
 * @param foo
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" type.

/**
 * @arg foo
 */
function quux (foo) {

}
// Message: Missing JSDoc @arg "foo" type.
```

The following patterns are not considered problems:

```js
/**
 *
 */
function quux (foo) {

}

/**
 * @param {number} foo
 */
function quux (foo) {

}
```


<h3 id="eslint-plugin-jsdoc-rules-require-returns-description"><code>require-returns-description</code></h3>

Requires that `@returns` tag has `description` value.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`returns`|

The following patterns are considered problems:

```js
/**
 * @returns
 */
function quux (foo) {

}
// Message: Missing JSDoc @returns description.

/**
 * @return
 */
function quux (foo) {

}
// Message: Missing JSDoc @return description.
```

The following patterns are not considered problems:

```js
/**
 *
 */
function quux () {

}

/**
 * @returns Foo.
 */
function quux () {

}
```


<h3 id="eslint-plugin-jsdoc-rules-require-returns-type"><code>require-returns-type</code></h3>

Requires that `@returns` tag has `type` value.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`returns`|

The following patterns are considered problems:

```js
/**
 * @returns
 */
function quux () {

}
// Message: Missing JSDoc @returns type.

/**
 * @returns Foo.
 */
function quux () {

}
// Message: Missing JSDoc @returns type.

/**
 * @return Foo.
 */
function quux () {

}
// Message: Missing JSDoc @return type.
```

The following patterns are not considered problems:

```js
/**
 * @returns {number}
 */
function quux () {

}
```


