# eslint-plugin-jsdoc

[![GitSpo Mentions](https://gitspo.com/badges/mentions/gajus/eslint-plugin-jsdoc?style=flat-square)](https://gitspo.com/mentions/gajus/eslint-plugin-jsdoc)
[![NPM version](http://img.shields.io/npm/v/eslint-plugin-jsdoc.svg?style=flat-square)](https://www.npmjs.org/package/eslint-plugin-jsdoc)
[![Travis build status](http://img.shields.io/travis/gajus/eslint-plugin-jsdoc/master.svg?style=flat-square)](https://travis-ci.org/gajus/eslint-plugin-jsdoc)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

JSDoc linting rules for ESLint.

{"gitdown": "contents"}

## Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.

```sh
npm install --save-dev eslint
```

If you have installed `ESLint` globally, you have to install JSDoc plugin globally too. Otherwise, install it locally.

```sh
npm install --save-dev eslint-plugin-jsdoc
```

## Configuration

To enable rules:

1. Add `plugin:jsdoc/recommended` to `extends` in your ESLint configuration
  file to enable rules that report common problems. These have a check mark
  :heavy_check_mark: below. You can then selectively add to or override the
  recommended rules.
2. Add a `plugins` section, specifying `eslint-plugin-jsdoc` as a plugin.
```json
{
    "plugins": [
        "jsdoc"
    ]
}
```
  No rules are enabled by default when adding the plugin, but you can now
  opt in to the specific rules you wish to be applied.


For example:

```javascript
{
    "rules": {
        "jsdoc/check-alignment": ["warn"],
        "jsdoc/check-examples": ["warn"],
    }
}
```

See below for the specific rules.

## Options

Rules may, as per the [ESLint user guide](https://eslint.org/docs/user-guide/configuring), have their own individual options. In `eslint-plugin-jsdoc`, a few options,
such as, `exemptedBy` and `contexts`, may be used across different rules.

`eslint-plugin-jsdoc` options, if present, are generally in the form of an
object supplied as the second argument in an array after the error level.

```js
// `.eslintrc.js`
{
  rules: {
    'jsdoc/require-example': [
        // The Error level should be `error`, `warn`, or `off` (or 2, 1, or 0)
        'error',
        // The options vary by rule, but are added to an options object:
        {
          avoidExampleOnConstructors: true,
          exemptedBy: ['type']
        }
    ]
  }
}
```

## Rules

Problems reported by rules which have a wrench :wrench: below can be fixed automatically by running ESLint on the command line with `--fix` option.

|recommended|fixable|rule|description|
|-|-|-|-|
|:heavy_check_mark:|| [check-access](./docs/rules/check-access.md) | Enforces valid `@access` tags|
|:heavy_check_mark:|:wrench:| [check-alignment](./docs/rules/check-alignment.md)|Enforces alignment of JSDoc block asterisks|
|||[check-examples](./docs/rules/check-examples.md)|Linting of JavaScript within `@example`|
|||[check-indentation](./docs/rules/check-indentation.md)|Checks for invalid padding inside JSDoc blocks|
|:heavy_check_mark:|:wrench:|[check-param-names](./docs/rules/check-param-names.md)|Checks for dupe `@param` names, that nested param names have roots, and that parameter names in function declarations match jsdoc param names.|
|:heavy_check_mark:|:wrench:|[check-property-names](./docs/rules/check-property-names.md)|Checks for dupe `@property` names, that nested property names have roots|
|||[check-syntax](./docs/rules/check-syntax.md)|Reports use against current mode (currently only prohibits Closure-specific syntax)|
|:heavy_check_mark:|:wrench:|[check-tag-names](./docs/rules/check-tag-names.md)|Reports invalid jsdoc (block) tag names|
|:heavy_check_mark:|:wrench:|[check-types](./docs/rules/check-types.md)|Reports types deemed invalid (customizable and with defaults, for preventing and/or recommending replacements)|
|:heavy_check_mark:||[check-values](./docs/rules/check-values.md)|Checks for expected content within some miscellaneous tags (`@version`, `@since`, `@license`, `@author`)|
|:heavy_check_mark:|:wrench:|[empty-tags](./docs/rules/empty-tags.md)|Checks tags that are expected to be empty (e.g., `@abstract` or `@async`), reporting if they have content|
|:heavy_check_mark:||[implements-on-classes](./docs/rules/implements-on-classes.md)|Prohibits use of `@implements` on non-constructor functions (to enforce the tag only being used on classes/constructors)|
|||[match-description](./docs/rules/match-description.md)|Defines customizable regular expression rules for your tag descriptions|
|:heavy_check_mark:|:wrench:|[newline-after-description](./docs/rules/newline-after-description.md)|Requires or prohibits newlines after the description portion of a jsdoc block|
||:wrench:|[no-types](./docs/rules/no-types.md)|Prohibits types on `@param` or `@returns` (redundant with TypeScript)|
|:heavy_check_mark:||[no-undefined-types](./docs/rules/no-undefined-types.md)|Besides some expected built-in types, prohibits any types not specified as globals or within `@typedef` |
|||[require-description](./docs/rules/require-description.md)|Requires that all functions (and potentially other contexts) have a description.|
||:wrench:|[require-description-complete-sentence](./docs/rules/require-description-complete-sentence.md)|Requires that block description, explicit `@description`, and `@param`/`@returns` tag descriptions are written in complete sentences|
||:wrench:|[require-example](./docs/rules/require-example.md)|Requires that all functions (and potentially other contexts) have examples.|
|||[require-file-overview](./docs/rules/require-file-overview.md)|By default, requires a single `@file` tag at the beginning of each linted file|
||:wrench:|[require-hyphen-before-param-description](./docs/rules/require-hyphen-before-param-description.md)|Requires a hyphen before `@param` descriptions (and optionally before `@property` descriptions)|
|:heavy_check_mark:|:wrench:|[require-jsdoc](./docs/rules/require-jsdoc.md)|Checks for presence of jsdoc comments, on functions and potentially other contexts (optionally limited to exports).|
|:heavy_check_mark:|:wrench:|[require-param](./docs/rules/require-param.md)|Requires that all function parameters are documented with a `@param` tag.|
|:heavy_check_mark:||[require-param-description](./docs/rules/require-param-description.md)|Requires that each `@param` tag has a `description` value.|
|:heavy_check_mark:||[require-param-name](./docs/rules/require-param-name.md)|Requires that all `@param` tags have names.|
|:heavy_check_mark:||[require-param-type](./docs/rules/require-param-type.md)|Requires that each `@param` tag has a type value (within curly brackets).|
|:heavy_check_mark:|:wrench:|[require-property](./docs/rules/require-property.md)|Requires that all `@typedef` and `@namespace` tags have `@property` tags when their type is a plain `object`, `Object`, or `PlainObject`.|
|:heavy_check_mark:||[require-property-description](./docs/rules/require-property-description.md)|Requires that each `@property` tag has a `description` value.|
|:heavy_check_mark:||[require-property-name](./docs/rules/require-property-name.md)|Requires that all `@property` tags have names.|
|:heavy_check_mark:||[require-property-type](./docs/rules/require-property-type.md)|Requires that each `@property` tag has a type value (within curly brackets).|
|:heavy_check_mark:||[require-returns](./docs/rules/require-returns.md)|Requires that return statements are documented.|
|:heavy_check_mark:||[require-returns-check](./docs/rules/require-returns-check.md)|Requires a return statement be present in a function body if a `@returns` tag is specified in the jsdoc comment block (and reports if multiple `@returns` tags are present).|
|:heavy_check_mark:||[require-returns-description](./docs/rules/require-returns-description.md)|Requires that the `@returns` tag has a `description` value (not including `void`/`undefined` type returns).|
|:heavy_check_mark:||[require-returns-type](./docs/rules/require-returns-type.md)|Requires that `@returns` tag has a type value (in curly brackets).|
|:heavy_check_mark:||[valid-types](./docs/rules/valid-types.md)|Requires all types/namepaths to be valid JSDoc, Closure compiler, or TypeScript types (configurable in settings)|
