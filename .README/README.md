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

To enable rules, you may use either of the following approaches in setting
up your ESLint configuration file.

1. A `plugins` section, specifying `jsdoc` as a plugin. You will then
  need to opt in to any `jsdoc` rules you wish to use (see below for the list):

```json
{
    "plugins": [
        "jsdoc"
    ]
}
```

OR:

2. Add `plugin:jsdoc/recommended` to `extends` to automatically enable rules
  that report common problems. These have a check mark :heavy_check_mark: in
  the list below. You can then selectively add to or override these recommended
  rules.

```json
{
  "extends": ["plugin:jsdoc/recommended"]
}
```

Here is an example of rule setting:

```javascript
{
    "rules": {
        "jsdoc/check-alignment": ["warn"],
        "jsdoc/check-examples": ["error"]
    }
},
```

Note that the rules may have options or global settings which may impact the
behavior of the rules. These are explained in more detail below, in both the
general sections about options and settings and with each respective rule.

## Rule summary

Problems reported by rules which have a wrench :wrench: below can be fixed automatically by running ESLint on the command line with `--fix` option.

|recommended|fixable|rule|description|
|-|-|-|-|
|:heavy_check_mark:|| [check-access](#eslint-plugin-jsdoc-rules-check-access) | Enforces valid `@access` tags|
|:heavy_check_mark:|:wrench:| [check-alignment](#eslint-plugin-jsdoc-rules-check-alignment)|Enforces alignment of JSDoc block asterisks|
|||[check-examples](#eslint-plugin-jsdoc-rules-check-examples)|Linting of JavaScript within `@example`|
|||[check-indentation](#eslint-plugin-jsdoc-rules-check-indentation)|Checks for invalid padding inside JSDoc blocks|
|:heavy_check_mark:|:wrench:|[check-param-names](#eslint-plugin-jsdoc-rules-check-param-names)|Checks for dupe `@param` names, that nested param names have roots, and that parameter names in function declarations match jsdoc param names.|
|:heavy_check_mark:|:wrench:|[check-property-names](#eslint-plugin-jsdoc-rules-check-property-names)|Checks for dupe `@property` names, that nested property names have roots|
|||[check-syntax](#eslint-plugin-jsdoc-rules-check-syntax)|Reports use against current mode (currently only prohibits Closure-specific syntax)|
|:heavy_check_mark:|:wrench:|[check-tag-names](#eslint-plugin-jsdoc-rules-check-tag-names)|Reports invalid jsdoc (block) tag names|
|:heavy_check_mark:|:wrench:|[check-types](#eslint-plugin-jsdoc-rules-check-types)|Reports types deemed invalid (customizable and with defaults, for preventing and/or recommending replacements)|
|:heavy_check_mark:||[check-values](#eslint-plugin-jsdoc-rules-check-values)|Checks for expected content within some miscellaneous tags (`@version`, `@since`, `@license`, `@author`)|
|:heavy_check_mark:|:wrench:|[empty-tags](#eslint-plugin-jsdoc-rules-empty-tags)|Checks tags that are expected to be empty (e.g., `@abstract` or `@async`), reporting if they have content|
|:heavy_check_mark:||[implements-on-classes](#eslint-plugin-jsdoc-rules-implements-on-classes)|Prohibits use of `@implements` on non-constructor functions (to enforce the tag only being used on classes/constructors)|
|||[match-description](#eslint-plugin-jsdoc-rules-match-description)|Defines customizable regular expression rules for your tag descriptions|
|:heavy_check_mark:|:wrench:|[newline-after-description](#eslint-plugin-jsdoc-rules-newline-after-description)|Requires or prohibits newlines after the description portion of a jsdoc block|
||:wrench:|[no-types](#eslint-plugin-jsdoc-rules-no-types)|Prohibits types on `@param` or `@returns` (redundant with TypeScript)|
|:heavy_check_mark:||[no-undefined-types](#eslint-plugin-jsdoc-rules-no-undefined-types)|Besides some expected built-in types, prohibits any types not specified as globals or within `@typedef` |
|||[require-description](#eslint-plugin-jsdoc-rules-require-description)|Requires that all functions (and potentially other contexts) have a description.|
||:wrench:|[require-description-complete-sentence](#eslint-plugin-jsdoc-rules-require-description-complete-sentence)|Requires that block description, explicit `@description`, and `@param`/`@returns` tag descriptions are written in complete sentences|
||:wrench:|[require-example](#eslint-plugin-jsdoc-rules-require-example)|Requires that all functions (and potentially other contexts) have examples.|
|||[require-file-overview](#eslint-plugin-jsdoc-rules-require-file-overview)|By default, requires a single `@file` tag at the beginning of each linted file|
||:wrench:|[require-hyphen-before-param-description](#eslint-plugin-jsdoc-rules-require-hyphen-before-param-description)|Requires a hyphen before `@param` descriptions (and optionally before `@property` descriptions)|
|:heavy_check_mark:|:wrench:|[require-jsdoc](#eslint-plugin-jsdoc-rules-require-jsdoc)|Checks for presence of jsdoc comments, on functions and potentially other contexts (optionally limited to exports).|
|:heavy_check_mark:|:wrench:|[require-param](#eslint-plugin-jsdoc-rules-require-param)|Requires that all function parameters are documented with a `@param` tag.|
|:heavy_check_mark:||[require-param-description](#eslint-plugin-jsdoc-rules-require-param-description)|Requires that each `@param` tag has a `description` value.|
|:heavy_check_mark:||[require-param-name](#eslint-plugin-jsdoc-rules-require-param-name)|Requires that all `@param` tags have names.|
|:heavy_check_mark:||[require-param-type](#eslint-plugin-jsdoc-rules-require-param-type)|Requires that each `@param` tag has a type value (within curly brackets).|
|:heavy_check_mark:|:wrench:|[require-property](#eslint-plugin-jsdoc-rules-require-property)|Requires that all `@typedef` and `@namespace` tags have `@property` tags when their type is a plain `object`, `Object`, or `PlainObject`.|
|:heavy_check_mark:||[require-property-description](#eslint-plugin-jsdoc-rules-require-property-description)|Requires that each `@property` tag has a `description` value.|
|:heavy_check_mark:||[require-property-name](#eslint-plugin-jsdoc-rules-require-property-name)|Requires that all `@property` tags have names.|
|:heavy_check_mark:||[require-property-type](#eslint-plugin-jsdoc-rules-require-property-type)|Requires that each `@property` tag has a type value (within curly brackets).|
|:heavy_check_mark:||[require-returns](#eslint-plugin-jsdoc-rules-require-returns)|Requires that return statements are documented.|
|:heavy_check_mark:||[require-returns-check](#eslint-plugin-jsdoc-rules-require-returns-check)|Requires a return statement be present in a function body if a `@returns` tag is specified in the jsdoc comment block (and reports if multiple `@returns` tags are present).|
|:heavy_check_mark:||[require-returns-description](#eslint-plugin-jsdoc-rules-require-returns-description)|Requires that the `@returns` tag has a `description` value (not including `void`/`undefined` type returns).|
|:heavy_check_mark:||[require-returns-type](#eslint-plugin-jsdoc-rules-require-returns-type)|Requires that `@returns` tag has a type value (in curly brackets).|
|:heavy_check_mark:||[valid-types](#eslint-plugin-jsdoc-rules-valid-types)|Requires all types/namepaths to be valid JSDoc, Closure compiler, or TypeScript types (configurable in settings)|

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

## Settings

### Allow `@private` to disable rules for that comment block (`ignorePrivate`)

- `settings.jsdoc.ignorePrivate` - Disables all rules for the comment block
  on which a `@private` tag (or `@access private`) occurs. Defaults to
  `false`. Note: This has no effect with the rule `check-access` (whose
  purpose is to check access modifiers).

#### Controlling spacing between code and comment blocks (`maxLines` and `minLines`)

One can use `minLines` and `maxLines` to indicate how many line breaks
(if any) will be checked to find a jsdoc comment block before the given
code block. These settings default to `0` and `1` respectively.

In conjunction with the `require-jsdoc` rule, these settings can
be enforced so as to report problems if a jsdoc block is not found within
the specified boundaries. The settings are also used in the fixer to determine
how many line breaks to add when a block is missing.

### Linting mode (`mode`)

- `settings.jsdoc.mode` - Set to `jsdoc` (the default), `typescript`, or `closure`.
  Currently is used for the following:
  - Determine valid tags for `check-tag-names`
  - Only check `@template` in `no-undefined-types` for types in "closure" and
    "typescript" modes
  - For type-checking rules, determine which tags will be checked for types
    (Closure allows types on some tags which the others do not,
    so these tags will additionally be checked in "closure" mode)
  - Check preferred tag names

### Alias Preference (`tagNamePreference`)

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

One may also use an object with a `message` and `replacement`.

The following will report the message `@extends is to be used over @augments as it is more evocative of classes than @augments` upon encountering `@augments`.

```json
{
    "rules": {},
    "settings": {
        "jsdoc": {
            "tagNamePreference": {
                "augments": {
                  "message": "@extends is to be used over @augments as it is more evocative of classes than @augments",
                  "replacement": "extends"
                }
            }
        }
    }
}
```

If one wishes to reject a normally valid tag, e.g., `@todo`, one may set the tag to `false`:

```json
{
    "rules": {},
    "settings": {
        "jsdoc": {
            "tagNamePreference": {
                "todo": false
            }
        }
    }
}
```

A project wishing to ensure no blocks are left excluded from entering the
documentation, might wish to prevent the `@ignore` tag in the above manner.

Or one may set the targeted tag to an object with a custom `message`, but without a `replacement` property:

```json
{
    "rules": {},
    "settings": {
        "jsdoc": {
            "tagNamePreference": {
                "todo": {
                  "message": "We expect immediate perfection, so don't leave to-dos in your code."
                }
            }
        }
    }
}
```

Note that the preferred tags indicated in the `settings.jsdoc.tagNamePreference`
map will be assumed to be defined by `check-tag-names`.

#### Default Preferred Aliases

The defaults in `eslint-plugin-jsdoc` (for tags which offer
aliases) are as follows:

- `@abstract` (over `@virtual`)
- `@augments` (over `@extends`)
- `@class` (over `@constructor`)
- `@constant` (over `@const`)
- `@default` (over `@defaultvalue`)
- `@description` (over `@desc`)
- `@external` (over `@host`)
- `@file` (over `@fileoverview`, `@overview`)
- `@fires` (over `@emits`)
- `@function` (over `@func`, `@method`)
- `@member` (over `@var`)
- `@param` (over `@arg`, `@argument`)
- `@property` (over `@prop`)
- `@returns` (over `@return`)
- `@throws` (over `@exception`)
- `@yields` (over `@yield`)

This setting is utilized by the the rule for tag name checking
(`check-tag-names`) as well as in the `@param` and `@require` rules:

- `check-param-names`
- `check-tag-names`
- `require-hyphen-before-param-description`
- `require-description`
- `require-param`
- `require-param-description`
- `require-param-name`
- `require-param-type`
- `require-returns`
- `require-returns-check`
- `require-returns-description`
- `require-returns-type`

### `@override`/`@augments`/`@extends`/`@implements` Without Accompanying `@param`/`@description`/`@example`/`@returns` (`overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`)

The following settings allows the element(s) they reference to be omitted
on the JSDoc comment block of the function or that of its parent class
for any of the "require" rules (i.e., `require-param`, `require-description`,
`require-example`, or `require-returns`).

* `settings.jsdoc.overrideReplacesDocs` (`@override`) - Defaults to `true`
* `settings.jsdoc.augmentsExtendsReplacesDocs` (`@augments` or its alias `@extends`) - Defaults to `false`.
* `settings.jsdoc.implementsReplacesDocs` (`@implements`) - Defaults to `false`

The format of the configuration is as follows:

```json
{
    "rules": {},
    "settings": {
        "jsdoc": {
            "overrideReplacesDocs": true,
            "augmentsExtendsReplacesDocs": true,
            "implementsReplacesDocs": true
        }
    }
}
```

### Settings to Configure `check-types` and `no-undefined-types` (`preferredTypes`)

- `settings.jsdoc.preferredTypes` An option map to indicate preferred
  or forbidden types (if default types are indicated here, these will
  have precedence over the default recommendations for `check-types`).
  The keys of this map are the types to be replaced (or forbidden).
  These keys may include:
  1. The "ANY" type, `*`
  1. The pseudo-type `[]` which we use to denote the parent (array)
    types used in the syntax `string[]`, `number[]`, etc.
  1. The pseudo-type `.<>` (or `.`) to represent the format `Array.<value>`
    or `Object.<key, value>`
  1. The pseudo-type `<>` to represent the format `Array<value>` or
    `Object<key, value>`
  1. A plain string type, e.g., `MyType`
  1. A plain string type followed by one of the above pseudo-types (except
    for `[]` which is always assumed to be an `Array`), e.g., `Array.`, or
    `SpecialObject<>`.

  If a bare pseudo-type is used, it will match all parent types of that form.
  If a pseudo-type prefixed with a type name is used, it will only match
  parent types of that form and type name.

  The values can be:
  - `false` to forbid the type
  - a string to indicate the type that should be preferred in its place
    (and which `fix` mode can replace); this can be one of the formats
    of the keys described above.
    - Note that the format will not be changed unless you use a pseudo-type
      in the replacement. (For example, `'Array.<>': 'MyArray'` will change
      `Array.<string>` to `MyArray.<string>`, preserving the dot. To get rid
      of the dot, you must use the pseudo-type with `<>`, i.e.,
      `'Array.<>': 'MyArray<>'`, which will change `Array.<string>` to
      `MyArray<string>`).
    - If you use a _bare_ pseudo-type in the replacement (e.g.,
      `'MyArray.<>': '<>'`), the type will be converted to the format
      of the pseudo-type without changing the type name. For example,
      `MyArray.<string>` will become `MyArray<string>` but `Array.<string>`
      will not be modified.
  - an object with:
    - the key `message` to provide a specific error message
      when encountering the discouraged type.
      - The message string will have the substrings with special meaning,
        `{{tagName}}` and `{{tagValue}}`, replaced with their
        corresponding value.
    - an optional key `replacement` with either of the following values:
      - a string type to be preferred in its place (and which `fix` mode
        can replace)
      - `false` (for forbidding the type)

Note that the preferred types indicated as targets in `settings.jsdoc.preferredTypes`
map will be assumed to be defined by `no-undefined-types`.

See the option of `check-types`, `unifyParentAndChildTypeChecks`, for
how the keys of `preferredTypes` may have `<>` or `.<>` (or just `.`)
appended and its bearing on whether types are checked as parents/children
only (e.g., to match `Array` if the type is `Array` vs. `Array.<string>`).

## Rules

{"gitdown": "include", "file": "./rules/check-access.md"}
{"gitdown": "include", "file": "./rules/check-alignment.md"}
{"gitdown": "include", "file": "./rules/check-examples.md"}
{"gitdown": "include", "file": "./rules/check-indentation.md"}
{"gitdown": "include", "file": "./rules/check-param-names.md"}
{"gitdown": "include", "file": "./rules/check-property-names.md"}
{"gitdown": "include", "file": "./rules/check-syntax.md"}
{"gitdown": "include", "file": "./rules/check-tag-names.md"}
{"gitdown": "include", "file": "./rules/check-types.md"}
{"gitdown": "include", "file": "./rules/check-values.md"}
{"gitdown": "include", "file": "./rules/empty-tags.md"}
{"gitdown": "include", "file": "./rules/implements-on-classes.md"}
{"gitdown": "include", "file": "./rules/match-description.md"}
{"gitdown": "include", "file": "./rules/newline-after-description.md"}
{"gitdown": "include", "file": "./rules/no-types.md"}
{"gitdown": "include", "file": "./rules/no-undefined-types.md"}
{"gitdown": "include", "file": "./rules/require-description-complete-sentence.md"}
{"gitdown": "include", "file": "./rules/require-description.md"}
{"gitdown": "include", "file": "./rules/require-example.md"}
{"gitdown": "include", "file": "./rules/require-file-overview.md"}
{"gitdown": "include", "file": "./rules/require-hyphen-before-param-description.md"}
{"gitdown": "include", "file": "./rules/require-jsdoc.md"}
{"gitdown": "include", "file": "./rules/require-param-description.md"}
{"gitdown": "include", "file": "./rules/require-param-name.md"}
{"gitdown": "include", "file": "./rules/require-param-type.md"}
{"gitdown": "include", "file": "./rules/require-param.md"}
{"gitdown": "include", "file": "./rules/require-property.md"}
{"gitdown": "include", "file": "./rules/require-property-description.md"}
{"gitdown": "include", "file": "./rules/require-property-name.md"}
{"gitdown": "include", "file": "./rules/require-property-type.md"}
{"gitdown": "include", "file": "./rules/require-returns-check.md"}
{"gitdown": "include", "file": "./rules/require-returns-description.md"}
{"gitdown": "include", "file": "./rules/require-returns-type.md"}
{"gitdown": "include", "file": "./rules/require-returns.md"}
{"gitdown": "include", "file": "./rules/valid-types.md"}
