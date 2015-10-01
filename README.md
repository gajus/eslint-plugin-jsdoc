<h1 id="eslint-plugin-jsdoc">eslint-plugin-jsdoc</h1>

[![NPM version](http://img.shields.io/npm/v/gitdown.svg?style=flat)](https://www.npmjs.org/package/gitdown)
[![Travis build status](http://img.shields.io/travis/gajus/gitdown/master.svg?style=flat)](https://travis-ci.org/gajus/gitdown)

JSDoc specific linting rules for ESLint.

* [eslint-plugin-jsdoc](#eslint-plugin-jsdoc)
    * [Attribution](#eslint-plugin-jsdoc-attribution)
        * [Reference to jscs-jsdoc](#eslint-plugin-jsdoc-attribution-reference-to-jscs-jsdoc)
    * [Installation](#eslint-plugin-jsdoc-installation)
    * [Configuration](#eslint-plugin-jsdoc-configuration)
    * [Rules](#eslint-plugin-jsdoc-rules)
        * [`check-param-names`](#eslint-plugin-jsdoc-rules-check-param-names)
        * [`check-redundant-params`](#eslint-plugin-jsdoc-rules-check-redundant-params)
        * [`check-redundant-returns`](#eslint-plugin-jsdoc-rules-check-redundant-returns)
        * [`check-returns-types`](#eslint-plugin-jsdoc-rules-check-returns-types)
        * [`newline-after-description`](#eslint-plugin-jsdoc-rules-newline-after-description)
        * [`require-description-complete-sentence`](#eslint-plugin-jsdoc-rules-require-description-complete-sentence)
        * [`require-param`](#eslint-plugin-jsdoc-rules-require-param)
        * [`require-param-description`](#eslint-plugin-jsdoc-rules-require-param-description)
        * [`require-param-types`](#eslint-plugin-jsdoc-rules-require-param-types)
        * [`require-returns-description`](#eslint-plugin-jsdoc-rules-require-returns-description)
        * [`require-returns-types`](#eslint-plugin-jsdoc-rules-require-returns-types)


<h2 id="eslint-plugin-jsdoc-attribution">Attribution</h2>

Unusual, but I want to start the documentation with attribution to [JSCS: JavaScript Code Style checker](http://jscs.info/). This ESLint plugin is a wrapper around JSCS and the [`jscs-jsdoc`](https://github.com/jscs-dev/jscs-jsdoc) plugin.

The reason for writing this plugin is to have all the linting rules in a consistent, plugin driven setup, that ESLint provides.

Thank you [@zxqfox](https://github.com/jscs-dev/jscs-jsdoc/commits/master?author=zxqfox) and [others](https://github.com/jscs-dev/jscs-jsdoc/commits/master).

<h3 id="eslint-plugin-jsdoc-attribution-reference-to-jscs-jsdoc">Reference to jscs-jsdoc</h3>

This table maps the rules between `eslint-plugin-jsdoc` and `jscs-jsdoc`.

| `eslint-plugin-jsdoc` | `jscs-jsdoc` |
| --- | --- |
| [`check-param-names`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-param-names) | [`checkParamNames`](https://github.com/jscs-dev/jscs-jsdoc#checkparamnames) |
| [`check-redundant-params`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-redundant-params) | [`checkReturnTypes`](https://github.com/jscs-dev/jscs-jsdoc#checkreturntypes) |
| [`check-redundant-returns`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-redundant-returns) | [`checkRedundantParams`](https://github.com/jscs-dev/jscs-jsdoc#checkredundantparams) |
| [`check-returns-types`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-returns-types) | [`checkReturnTypes`](https://github.com/jscs-dev/jscs-jsdoc#checkreturntypes) |
| [`newline-after-description`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-newline-after-description) | [`requireNewlineAfterDescription`](https://github.com/jscs-dev/jscs-jsdoc#requirenewlineafterdescription) and [`disallowNewlineAfterDescription`](https://github.com/jscs-dev/jscs-jsdoc#disallownewlineafterdescription) |
| [`require-description-complete-sentence`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-description-complete-sentence) | [`requireDescriptionCompleteSentence`](https://github.com/jscs-dev/jscs-jsdoc#requiredescriptioncompletesentence) |
| [`require-param`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-param) | [`checkReturnTypes`](https://github.com/jscs-dev/jscs-jsdoc#checkreturntypes) |
| [`require-param-description`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-param-description) | [`requireParamDescription`](https://github.com/jscs-dev/jscs-jsdoc#requireparamdescription) |
| [`require-param-types`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-param-types) | [`requireParamTypes`](https://github.com/jscs-dev/jscs-jsdoc#requireparamtypes) |
| [`require-returns-description`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-returns-description) | [`requireReturnDescription`](https://github.com/jscs-dev/jscs-jsdoc#requirereturndescription) |
| [`require-returns-types`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-returns-types) | [`requireReturnTypes`](https://github.com/jscs-dev/jscs-jsdoc#requirereturntypes) |

<h2 id="eslint-plugin-jsdoc-installation">Installation</h2>

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.

```sh
$ npm install eslint
```

If you have installed `ESLint` globally, you have to install JSDoc plugin globally too. Otherwise, install it locally.

```sh
$ npm install eslint-plugin-jsdoc
```

<h2 id="eslint-plugin-jsdoc-configuration">Configuration</h2>

Add `plugins` section and specify eslint-plugin-jsdoc as a plugin.

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
        "jsdoc/check-redundant-params": 1,
        "jsdoc/check-redundant-returns": 1,
        "jsdoc/check-returns-types": 1,
        "jsdoc/newline-after-description": 1,
        "jsdoc/require-description-complete-sentence": 1,
        "jsdoc/require-param": 1,
        "jsdoc/require-param-description": 1,
        "jsdoc/require-param-types": 1,
        "jsdoc/require-returns-description": 1,
        "jsdoc/require-returns-types": 1
    }
}
```

<h2 id="eslint-plugin-jsdoc-rules">Rules</h2>

<h3 id="eslint-plugin-jsdoc-rules-check-param-names"><code>check-param-names</code></h3>

Ensures param names in JSDoc and in function declaration are equal.

The following patterns are considered problems:

```js
/**
 * @param foo
 * @param bar
 */
function quux (bar, foo) {

}

/**
 * @param foo
 */
function quux (bar) {

}
```

The following patterns are not considered problems:

```js
/**
 * @param foo
 * @param bar
 */
function quux (foo, bar) {

}

/**
 * @param foo
 */
function quux (foo) {

}
```

<h3 id="eslint-plugin-jsdoc-rules-check-redundant-params"><code>check-redundant-params</code></h3>

Reports redundant params in JSDoc.

The following patterns are considered problems:

```js
/**
 * @param {string} foo
 */
function quux () {

}
```

The following patterns are not considered problems:

```js
/**
 * @param {string} foo
 */
function quux (foo) {

}
```

<h3 id="eslint-plugin-jsdoc-rules-check-redundant-returns"><code>check-redundant-returns</code></h3>

Report statements for functions with no return.

The following patterns are considered problems:

```js
/**
 * @returns {string}
 */
function quux () {

}
```

The following patterns are not considered problems:

```js
/**
 * @returns {string}
 */
function quux () {
    return 'corge';
}
```

<h3 id="eslint-plugin-jsdoc-rules-check-returns-types"><code>check-returns-types</code></h3>

Reports discrepancies between the claimed in JSDoc and actual type if both exist (code scan).

The following patterns are considered problems:

```js
/**
 * @returns {string}
 */
function quux () {
    return true;
}
```

The following patterns are not considered problems:

```js
/**
 * @returns {string}
 */
function quux () {
    return 'corge';
}
```

<h3 id="eslint-plugin-jsdoc-rules-newline-after-description"><code>newline-after-description</code></h3>

Enforces consistent padding of doc comment description.

This rule takes one argument. If it is `"always"` then a problem is raised when there is a newline after description. If it is `"never"` then a problem is raised when there is no newline after the description. The default value is `"always"`.

The following patterns are considered problems when configured `"never"`:

```js
/**
 * Description
 *
 * @param {string} foo
 */
function quux (foo) {

}
```

The following patterns are not considered problems when configured `"never"`:

```js
/**
 * @param {string} foo
 */
function quux (foo) {

}

/**
 * Description
 */
function quux () {

}

/**
 * Description
 * @param {string} foo
 */
function quux (foo) {

}
```

The following patterns are considered problems when configured `"always"`:

```js
/**
 * Description
 * @param {string} foo
 */
function quux (foo) {

}
```

The following patterns are not considered problems when configured `"always"`:

```js
/**
 * @param {string} foo
 */
function quux (foo) {

}

/**
 * Description
 */
function quux () {

}

/**
 * Description
 *
 * @param {string} foo
 */
function quux (foo) {

}
```

<h3 id="eslint-plugin-jsdoc-rules-require-description-complete-sentence"><code>require-description-complete-sentence</code></h3>

Ensures a doc comment description is a complete sentence.

A complete sentence is defined as starting with an upper case letter and ending with a period.

The following patterns are considered problems:

```js
/**
 * Description
 * On multiple lines.
 *
 * @param {string} foo
 */
function quux (foo) {

}

/**
 * Description
 * @param {string} foo
 */
function quux (foo) {

}

/**
 * description starting with a lower case letter.
 * @param {string} foo
 */
function quux (foo) {

}

/**
 * Description period is offset .
 * @param {string} foo
 */
function quux (foo) {

}

/**
 * Description!
 * @param {string} foo
 */
function quux (foo) {

}
```

The following patterns are not considered problems:

```js
/**
 * @param {string} foo
 */
function quux (foo) {

}

/**
 * Description.
 */
function quux () {

}

/**
 * (Description).
 */
function quux () {

}

/**
 * Description.
 *
 * @param {string} foo
 */
function quux (foo) {

}
```

<h3 id="eslint-plugin-jsdoc-rules-require-param"><code>require-param</code></h3>

Ensures all parameters are documented.

The following patterns are considered problems:

```js
/**
 *
 */
function quux (foo) {

}
```

The following patterns are not considered problems:

```js
/**
 * @param {string} foo
 */
function quux (foo) {

}
```

<h3 id="eslint-plugin-jsdoc-rules-require-param-description"><code>require-param-description</code></h3>

Ensures a param description exists.

The following patterns are considered problems:

```js
/**
 * @param {string} foo
 */
function quux (foo) {}

/**
 * @param foo
 */
function quux (foo) {

}
```

The following patterns are not considered problems:

```js
/**
 * @param {string} foo Foo.
 */
function quux (foo) {

}

/**
 * @param foo Foo.
 */
function quux (foo) {

}
```

<h3 id="eslint-plugin-jsdoc-rules-require-param-types"><code>require-param-types</code></h3>

The following patterns are considered problems:

```js
/**
 * @param foo
 */
function quux () {

}
```

The following patterns are not considered problems:

```js
/**
 * @param {string} foo
 */
function quux () {

}
```

<h3 id="eslint-plugin-jsdoc-rules-require-returns-description"><code>require-returns-description</code></h3>

Ensures a `@returns` description exists.

The following patterns are considered problems:

```js
/**
 * @returns {string}
 */
function quux () {

}
```

The following patterns are not considered problems:

```js
/**
 * @returns {string} Quux.
 */
function quux () {

}
```

<h3 id="eslint-plugin-jsdoc-rules-require-returns-types"><code>require-returns-types</code></h3>

Ensures `@returns` in JSDoc contains type.

The following patterns are considered problems:

```js
/**
 * @returns
 */
function quux () {

}
```

The following patterns are not considered problems:

```js
/**
 * @returns {string}
 */
function quux () {

}

/**
 * no @returns
 */
function quux () {

}
```

