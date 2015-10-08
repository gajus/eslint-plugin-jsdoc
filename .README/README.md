# eslint-plugin-jsdoc

[![NPM version](http://img.shields.io/npm/v/eslint-plugin-jsdoc.svg?style=flat)](https://www.npmjs.org/package/eslint-plugin-jsdoc)
[![Travis build status](http://img.shields.io/travis/gajus/eslint-plugin-jsdoc/master.svg?style=flat)](https://travis-ci.org/gajus/eslint-plugin-jsdoc)

<!--
{"gitdown": "badge", "name": "npm-version"}
{"gitdown": "badge", "name": "travis"}
-->

JSDoc specific linting rules for ESLint.

{"gitdown": "contents"}

## Attribution

Unusual, but I want to start the documentation with attribution to [JSCS: JavaScript Code Style checker](http://jscs.info/). This ESLint plugin is a wrapper around JSCS and the [`jscs-jsdoc`](https://github.com/jscs-dev/jscs-jsdoc) plugin.

The reason for writing this plugin is to have all the linting rules in a consistent, plugin driven setup, that ESLint provides.

Thank you [@zxqfox](https://github.com/jscs-dev/jscs-jsdoc/commits/master?author=zxqfox) and [others](https://github.com/jscs-dev/jscs-jsdoc/commits/master).

### Reference to jscs-jsdoc

This table maps the rules between `eslint-plugin-jsdoc` and `jscs-jsdoc`.

| `eslint-plugin-jsdoc` | `jscs-jsdoc` |
| --- | --- |
| [`check-param-names`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-param-names) | [`checkParamNames`](https://github.com/jscs-dev/jscs-jsdoc#checkparamnames) |
| [`check-redundant-params`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-redundant-params) | [`checkReturnTypes`](https://github.com/jscs-dev/jscs-jsdoc#checkreturntypes) |
| [`check-redundant-returns`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-redundant-returns) | [`checkRedundantParams`](https://github.com/jscs-dev/jscs-jsdoc#checkredundantparams) |
| [`check-returns-types`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-returns-types) | [`checkReturnTypes`](https://github.com/jscs-dev/jscs-jsdoc#checkreturntypes) |
| [`check-types`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-types) | [`checkTypes`](https://github.com/jscs-dev/jscs-jsdoc#checktypes) |
| [`newline-after-description`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-newline-after-description) | [`requireNewlineAfterDescription`](https://github.com/jscs-dev/jscs-jsdoc#requirenewlineafterdescription) and [`disallowNewlineAfterDescription`](https://github.com/jscs-dev/jscs-jsdoc#disallownewlineafterdescription) |
| [`require-description-complete-sentence`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-description-complete-sentence) | [`requireDescriptionCompleteSentence`](https://github.com/jscs-dev/jscs-jsdoc#requiredescriptioncompletesentence) |
| [`require-param`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-param) | [`checkReturnTypes`](https://github.com/jscs-dev/jscs-jsdoc#checkreturntypes) |
| [`require-param-description`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-param-description) | [`requireParamDescription`](https://github.com/jscs-dev/jscs-jsdoc#requireparamdescription) |
| [`require-param-types`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-param-types) | [`requireParamTypes`](https://github.com/jscs-dev/jscs-jsdoc#requireparamtypes) |
| [`require-returns-description`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-returns-description) | [`requireReturnDescription`](https://github.com/jscs-dev/jscs-jsdoc#requirereturndescription) |
| [`require-returns-types`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-returns-types) | [`requireReturnTypes`](https://github.com/jscs-dev/jscs-jsdoc#requirereturntypes) |
| N/A | [`checkAnnotations`](https://github.com/jscs-dev/jscs-jsdoc#checkannotations) |
| N/A | [`checkRedundantAccess`](https://github.com/jscs-dev/jscs-jsdoc#checkredundantaccess) |
| N/A | [`leadingUnderscoreAccess`](https://github.com/jscs-dev/jscs-jsdoc#leadingunderscoreaccess) |
| N/A | [`enforceExistence`](https://github.com/jscs-dev/jscs-jsdoc#enforceexistence) |
| N/A | [`requireHyphenBeforeDescription`](https://github.com/jscs-dev/jscs-jsdoc#requirehyphenbeforedescription) |

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
        "jsdoc/check-returns-types": 1,
        "jsdoc/check-types": 1,
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

## Rules

{"gitdown": "include", "file": "./rules/check-param-names.md"}
{"gitdown": "include", "file": "./rules/check-redundant-params.md"}
{"gitdown": "include", "file": "./rules/check-redundant-returns.md"}
{"gitdown": "include", "file": "./rules/check-returns-types.md"}
{"gitdown": "include", "file": "./rules/check-types.md"}
{"gitdown": "include", "file": "./rules/newline-after-description.md"}
{"gitdown": "include", "file": "./rules/require-description-complete-sentence.md"}
{"gitdown": "include", "file": "./rules/require-param.md"}
{"gitdown": "include", "file": "./rules/require-param-description.md"}
{"gitdown": "include", "file": "./rules/require-param-types.md"}
{"gitdown": "include", "file": "./rules/require-returns-description.md"}
{"gitdown": "include", "file": "./rules/require-returns-types.md"}
