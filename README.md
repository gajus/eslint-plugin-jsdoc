# eslint-plugin-jsdoc

JSDoc specific linting rules for ESLint.

## Attribution

Unusual, but I want to start the documentation with attribution to [JSCS: JavaScript Code Style checker](http://jscs.info/). This ESLint plugin is a wrapper around JSCS and the [`jscs-jsdoc`](https://github.com/jscs-dev/jscs-jsdoc) plugin. Thank you for your work.

## Instalation

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
        "jsdoc/require-param-description": 1
    }
}
```

## Rules

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
