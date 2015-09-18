# eslint-plugin-jsdoc

JSDoc specific linting rules for ESLint.

* [Attribution](#attribution)
* [Installation](#installation)
* [Configuration](#configuration)
* [Rules](#rules)
    * [`require-description-complete-sentence`](#require-description-complete-sentence)
    * [`require-param-description`](#require-param-description)

## Attribution

Unusual, but I want to start the documentation with attribution to [JSCS: JavaScript Code Style checker](http://jscs.info/). This ESLint plugin is a wrapper around JSCS and the [`jscs-jsdoc`](https://github.com/jscs-dev/jscs-jsdoc) plugin.

The reason for writing this plugin is to have all the linting rules in a consistent, plugin driven setup, that ESLint provides.

Thank you for your work JSCS.

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
        "jsdoc/require-description-complete-sentence": 1,
        "jsdoc/require-param-description": 1
    }
}
```

## Rules

### `require-description-complete-sentence`

Ensures a doc comment description is a complete sentence.

A complete sentence is defined as starting with an upper case letter and ending with a period.

The following patterns are considered problems:

```js
/**
 * Description
 * On multiple lines.
 *
 * @param {String} message
 */
function method() {}

/**
 * Description
 * @param {String} message
 */
function method() {}

/**
 * description starting with a lower case letter.
 * @param {String} message
 */
function method() {}

/**
 * Description period is offset .
 * @param {String} message
 */
function method() {}

/**
 * Description!
 * @param {String} message
 */
function method() {}
```

The following patterns are not considered problems:

```js
/**
 * @param {String} message
 */
function method() {}

/**
 * Description.
 */
function method() {}

/**
 * (Description).
 */
function method() {}

/**
 * Description.
 *
 * @param {String} message
 */
function method() {}
```

### `require-param-description`

Ensures a param description exists.

The following patterns are considered problems:

```js
/**
 * @param {String} arg
 */
function fn (arg) {}

/**
 * @param arg
 */
function fn (arg) {}
```

The following patterns are not considered problems:

```js
/**
 * @param {String} arg message
 */
function fn (arg) {}

/**
 * @param arg message
 */
function fn (arg) {}
```
