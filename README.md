# eslint-plugin-jsdoc

[![Travis build status](http://img.shields.io/travis/gajus/eslint-plugin-jsdoc/master.svg?style=flat)](https://travis-ci.org/gajus/eslint-plugin-jsdoc)
[![NPM version](http://img.shields.io/npm/v/eslint-plugin-jsdoc.svg?style=flat)](https://www.npmjs.org/package/eslint-plugin-jsdoc)

JSDoc specific linting rules for ESLint.

* [Attribution](#attribution)
* [Installation](#installation)
* [Configuration](#configuration)
* [Rules](#rules)
    * [`check-param-names`](#check-param-names)
    * [`check-redundant-params`](#check-redundant-params)
    * [`check-redundant-returns`](#check-redundant-returns)
    * [`newline-after-description`](#newline-after-description)
    * [`require-description-complete-sentence`](#require-description-complete-sentence)
    * [`require-param-description`](#require-param-description)
    * [`require-param-types`](#require-param-types)
    * [`require-return-types`](#require-return-types)

## Attribution

Unusual, but I want to start the documentation with attribution to [JSCS: JavaScript Code Style checker](http://jscs.info/). This ESLint plugin is a wrapper around JSCS and the [`jscs-jsdoc`](https://github.com/jscs-dev/jscs-jsdoc) plugin.

The reason for writing this plugin is to have all the linting rules in a consistent, plugin driven setup, that ESLint provides.

Thank you [@zxqfox](https://github.com/jscs-dev/jscs-jsdoc/commits/master?author=zxqfox) and [others](https://github.com/jscs-dev/jscs-jsdoc/commits/master).

## Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.

```sh
$ npm install eslint
```

If you have installed `ESLint` globally, you have to install JSDoc plugin globally too. Otherwise, install it locally.

```sh
$ npm install eslint-plugin-jsdoc
```

## Configuration

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
        "jsdoc/newline-after-description": 1,
        "jsdoc/require-description-complete-sentence": 1,
        "jsdoc/require-param-description": 1,
        "jsdoc/require-param-types": 1,
        "jsdoc/require-return-types": 1
    }
}
```

## Rules

### `check-param-names`

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

### `check-redundant-params`

Reports redundant params in JSDoc.

The following patterns are considered problems:

```js
/**
 * @param {String} foo
 */
function quux () {

}
```

The following patterns are not considered problems:

```js
/**
 * @param {String} foo
 */
function quux (foo) {

}
```

### `check-redundant-returns`

Report statements for functions with no return.

The following patterns are considered problems:

```js
/**
 * @returns {String}
 */
function quux () {

}
```

The following patterns are not considered problems:

```js
/**
 * @returns {String}
 */
function quux () {
    return 'corge';
}
```

### `newline-after-description`

Enforces consistent padding of doc comment description.

This rule takes one argument. If it is `"always"` then a problem is raised when there is a newline after description. If it is `"never"` then a problem is raised when there is no newline after the description. The default value is `"always"`.

The following patterns are considered problems when configured `"never"`:

```js
/**
 * Description
 *
 * @param {String} foo
 */
function quux (foo) {

}
```

The following patterns are not considered problems when configured `"never"`:

```js
/**
 * @param {String} foo
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
 * @param {String} foo
 */
function quux (foo) {

}
```

The following patterns are considered problems when configured `"always"`:

```js
/**
 * Description
 * @param {String} foo
 */
function quux (foo) {

}
```

The following patterns are not considered problems when configured `"always"`:

```js
/**
 * @param {String} foo
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
 * @param {String} foo
 */
function quux (foo) {

}
```

### `require-description-complete-sentence`

Ensures a doc comment description is a complete sentence.

A complete sentence is defined as starting with an upper case letter and ending with a period.

The following patterns are considered problems:

```js
/**
 * Description
 * On multiple lines.
 *
 * @param {String} foo
 */
function quux (foo) {

}

/**
 * Description
 * @param {String} foo
 */
function quux (foo) {

}

/**
 * description starting with a lower case letter.
 * @param {String} foo
 */
function quux (foo) {

}

/**
 * Description period is offset .
 * @param {String} foo
 */
function quux (foo) {

}

/**
 * Description!
 * @param {String} foo
 */
function quux (foo) {

}
```

The following patterns are not considered problems:

```js
/**
 * @param {String} foo
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
 * @param {String} foo
 */
function quux (foo) {

}
```

### `require-param-description`

Ensures a param description exists.

The following patterns are considered problems:

```js
/**
 * @param {String} foo
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
 * @param {String} foo Foo.
 */
function quux (foo) {

}

/**
 * @param foo Foo.
 */
function quux (foo) {

}
```

### `require-param-types`

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
 * @param {String} foo
 */
function quux () {

}
```

### `check-return-types`

Reports discrepancies between the claimed in JSDoc and actual type if both exist (code scan).

The following patterns are considered problems:

```js
/**
 * @returns {String}
 */
function quux () {
    return true;
}
```

The following patterns are not considered problems:

```js
/**
 * @returns {String}
 */
function quux () {
    return 'corge';
}
```

### `require-return-types`

Ensures returns in JSDoc contains type.

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
 * @returns {String}
 */
function quux () {

}

/**
 * no @return
 */
function quux () {

}
```
