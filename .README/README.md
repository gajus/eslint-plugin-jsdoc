# eslint-plugin-jsdoc

[![GitSpo Mentions](https://gitspo.com/badges/mentions/gajus/eslint-plugin-jsdoc?style=flat-square)](https://gitspo.com/mentions/gajus/eslint-plugin-jsdoc)
[![NPM version](http://img.shields.io/npm/v/eslint-plugin-jsdoc.svg?style=flat-square)](https://www.npmjs.org/package/eslint-plugin-jsdoc)
[![Travis build status](http://img.shields.io/travis/gajus/eslint-plugin-jsdoc/master.svg?style=flat-square)](https://travis-ci.org/gajus/eslint-plugin-jsdoc)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

JSDoc linting rules for ESLint.

{"gitdown": "contents"}

### Reference to jscs-jsdoc

This table maps the rules between `eslint-plugin-jsdoc` and `jscs-jsdoc`.

| `eslint-plugin-jsdoc` | `jscs-jsdoc` |
| --- | --- |
| [`check-alignment`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-alignment) | N/A |
| [`check-examples`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-examples) | N/A |
| [`check-indentation`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-indentation) | N/A |
| [`check-param-names`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-param-names) | [`checkParamNames`](https://github.com/jscs-dev/jscs-jsdoc#checkparamnames) |
| [`check-syntax`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-syntax) | N/A |
| [`check-tag-names`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-tag-names) | N/A ~ [`checkAnnotations`](https://github.com/jscs-dev/jscs-jsdoc#checkannotations) |
| [`check-types`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-types) | [`checkTypes`](https://github.com/jscs-dev/jscs-jsdoc#checktypes) |
| [`newline-after-description`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-newline-after-description) | [`requireNewlineAfterDescription`](https://github.com/jscs-dev/jscs-jsdoc#requirenewlineafterdescription) and [`disallowNewlineAfterDescription`](https://github.com/jscs-dev/jscs-jsdoc#disallownewlineafterdescription) |
| [`require-description`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-description) | N/A |
| [`require-description-complete-sentence`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-description-complete-sentence) | [`requireDescriptionCompleteSentence`](https://github.com/jscs-dev/jscs-jsdoc#requiredescriptioncompletesentence) |
| [`require-example`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-example) | N/A |
| [`require-hyphen-before-param-description`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-hyphen-before-param-description) | [`requireHyphenBeforeDescription`](https://github.com/jscs-dev/jscs-jsdoc#requirehyphenbeforedescription) |
| [`require-param`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-param) | [`checkParamExistence`](https://github.com/jscs-dev/jscs-jsdoc#checkparamexistence) |
| [`require-param-description`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-param-description) | [`requireParamDescription`](https://github.com/jscs-dev/jscs-jsdoc#requireparamdescription) |
| [`require-param-name`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-param-name) | N/A |
| [`require-param-type`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-param-type) | [`requireParamTypes`](https://github.com/jscs-dev/jscs-jsdoc#requireparamtypes) |
| [`require-returns`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-returns) | [`requireReturn`](https://github.com/jscs-dev/jscs-jsdoc#requirereturn) |
| [`require-returns-check`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-returns-check) | [`requireReturn`](https://github.com/jscs-dev/jscs-jsdoc#requirereturncheck) |
| [`require-returns-description`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-returns-description) | [`requireReturnDescription`](https://github.com/jscs-dev/jscs-jsdoc#requirereturndescription) |
| [`require-returns-type`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-returns-type) | [`requireReturnTypes`](https://github.com/jscs-dev/jscs-jsdoc#requirereturntypes) |
| [`valid-types`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-valid-types) | N/A |
| [`no-undefined-types`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-no-undefined-types) | N/A |
| N/A | [`checkReturnTypes`](https://github.com/jscs-dev/jscs-jsdoc#checkreturntypes) |
| N/A | [`checkRedundantParams`](https://github.com/jscs-dev/jscs-jsdoc#checkredundantparams) |
| N/A | [`checkReturnTypes`](https://github.com/jscs-dev/jscs-jsdoc#checkreturntypes) |
| N/A | [`checkRedundantAccess`](https://github.com/jscs-dev/jscs-jsdoc#checkredundantaccess) |
| N/A | [`enforceExistence`](https://github.com/jscs-dev/jscs-jsdoc#enforceexistence) |
| N/A | [`leadingUnderscoreAccess`](https://github.com/jscs-dev/jscs-jsdoc#leadingunderscoreaccess) |

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
        "jsdoc/check-alignment": 1,
        "jsdoc/check-examples": 1,
        "jsdoc/check-indentation": 1,
        "jsdoc/check-param-names": 1,
        "jsdoc/check-syntax": 1,
        "jsdoc/check-tag-names": 1,
        "jsdoc/check-types": 1,
        "jsdoc/implements-on-classes": 1,
        "jsdoc/match-description": 1,
        "jsdoc/newline-after-description": 1,
        "jsdoc/no-types": 1,
        "jsdoc/no-undefined-types": 1,
        "jsdoc/require-description": 1,
        "jsdoc/require-description-complete-sentence": 1,
        "jsdoc/require-example": 1,
        "jsdoc/require-hyphen-before-param-description": 1,
        "jsdoc/require-jsdoc": 1,
        "jsdoc/require-param": 1,
        "jsdoc/require-param-description": 1,
        "jsdoc/require-param-name": 1,
        "jsdoc/require-param-type": 1,
        "jsdoc/require-returns": 1,
        "jsdoc/require-returns-check": 1,
        "jsdoc/require-returns-description": 1,
        "jsdoc/require-returns-type": 1,
        "jsdoc/valid-types": 1
    }
}
```

## Settings

### Allow `@private` to disable rules for that comment block

- `settings.jsdoc.ignorePrivate` - Disables all rules for the comment block
  on which it occurs.

### Exempting empty functions from `require-jsdoc`

- `settings.jsdoc.exemptEmptyFunctions` - Will not report missing jsdoc blocks
  above functions/methods with no parameters or return values (intended where
  variable names are sufficient for themselves as documentation).

### Requiring JSDoc comments for exported functions in <code>require-jsdoc</code>

- `settings.jsdoc.publicFunctionsOnly` - Missing jsdoc blocks
  are only reported for function bodies that are exported from the module.

  This setting object supports the following keys:

  - `exports`
  - `modules`
  - `browserEnv`

### Alias Preference

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

### Additional Tag Names

Use `settings.jsdoc.additionalTagNames` to configure additional, allowed JSDoc
tags in the rule `check-tag-names`. The format of the configuration is as follows:

```json
{
    "rules": {},
    "settings": {
        "jsdoc": {
            "additionalTagNames": {
                "customTags": ["define", "record"]
            }
        }
    }
}
```

### `@override`/`@augments`/`@extends`/`@implements` Without Accompanying `@param`/`@description`/`@example`/`@returns`

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

`settings.jsdoc.allowOverrideWithoutParam`,
`settings.jsdoc.allowImplementsWithoutParam`, and
`settings.jsdoc.allowAugmentsExtendsWithoutParam` performed a similar function
but restricted to `@param`. These settings are now deprecated.

### Settings to Configure `check-types` and `no-undefined-types`

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
    of the keys described above. Note that the format will not be changed
    unless you use a pseudo-type in the replacement (e.g.,
    `'Array.<>': 'MyArray'` will change `Array.<string>` to `MyArray.<string>`,
    preserving the dot; to get rid of the dot, you must use the pseudo-type:
    `'Array.<>': 'MyArray<>'` which will change `Array.<string>` to
    `MyArray<string>`). If you use a bare pseudo-type in the replacement,
    e.g., `'MyArray.<>': '<>'`, the type will be converted to the format
    of the pseudo-type without changing the type name, i.e., `MyArray.<string>`
    will become `MyArray<string>` but `Array.<string>` will not be modified.
  - an object with the key `message` to provide a specific error message
    when encountering the discouraged type and, if a type is to be preferred
    in its place, the key `replacement` to indicate the type that should be
    used in its place (and which `fix` mode can replace) or `false` if
    forbidding the type. The message string will have the following
    substrings with special meaning replaced with their corresponding
    value (`{{tagName}}`, `{{tagValue}}`, `{{badType}}`, and
    `{{preferredType}}` (or `{{replacement}}`), noting that the latter is
    of no use when one is merely forbidding a type).

If `no-undefined-types` has the option key `preferredTypesDefined` set to
`true`, the preferred types indicated in the `settings.jsdoc.preferredTypes`
map will be assumed to be defined.

See the option of `check-types`, `unifyParentAndChildTypeChecks`, for
how the keys of `preferredTypes` may have `<>` or `.<>` (or just `.`)
appended and its bearing on whether types are checked as parents/children
only (e.g., to match `Array` if the type is `Array` vs. `Array.<string>`).

### Settings to Configure `valid-types`

* `settings.jsdoc.allowEmptyNamepaths` - Set to `false` to disallow
  empty name paths with `@callback`, `@event`, `@class`, `@constructor`,
  `@constant`, `@const`, `@function`, `@func`, `@method`, `@interface`,
  `@member`, `@var`, `@mixin`, `@namespace`, `@listens`, `@fires`,
  or `@emits` (these might often be expected to have an accompanying
  name path, though they have some indicative value without one; these
  may also allow names to be defined in another manner elsewhere in
  the block)
* `settings.jsdoc.checkSeesForNamepaths` - Set this to `true` to insist
  that `@see` only use name paths (the tag is normally permitted to
  allow other text)

### Settings to Configure `require-returns`

* `settings.jsdoc.forceRequireReturn` - Set to `true` to always insist on
  `@returns` documentation regardless of implicit or explicit `return`'s
  in the function. May be desired to flag that a project is aware of an
  `undefined`/`void` return.

### Settings to Configure `require-example`

* `settings.jsdoc.avoidExampleOnConstructors` - Set to `true` to avoid the
  need for an example on a constructor (whether indicated as such by a
  jsdoc tag or by being within an ES6 `class`).

### Settings to Configure `check-examples`

The settings below all impact the `check-examples` rule and default to
no-op/false except as noted.

JSDoc specs use of an optional `<caption>` element at the beginning of
`@example`. The following setting requires its use.

* `settings.jsdoc.captionRequired` - Require `<caption>` at beginning
  of any `@example`

JSDoc does not specify a formal means for delimiting code blocks within
`@example` (it uses generic syntax highlighting techniques for its own
syntax highlighting). The following settings determine whether a given
`@example` tag will have the `check-examples` checks applied to it:

* `settings.jsdoc.exampleCodeRegex` - Regex which whitelists lintable
  examples. If a parenthetical group is used, the first one will be used,
  so you may wish to use `(?:...)` groups where you do not wish the
  first such group treated as one to include. If no parenthetical group
  exists or matches, the whole matching expression will be used.
  An example might be ````"^```(?:js|javascript)([\\s\\S]*)```$"````
  to only match explicitly fenced JavaScript blocks.
* `settings.jsdoc.rejectExampleCodeRegex` - Regex blacklist which rejects
  non-lintable examples (has priority over `exampleCodeRegex`). An example
  might be ```"^`"``` to avoid linting fenced blocks which may indicate
  a non-JavaScript language.

If neither is in use, all examples will be matched. Note also that even if
`settings.jsdoc.captionRequired` is not set, any initial `<caption>`
will be stripped out before doing the regex matching.

The following settings determine which individual ESLint rules will be
applied to the JavaScript found within the `@example` tags (as determined
to be applicable by the above regex settings). They are ordered by
decreasing precedence:

* `settings.jsdoc.allowInlineConfig` - If not set to `false`, will allow
  inline config within the `@example` to override other config. Defaults
  to `true`.
* `settings.jsdoc.noDefaultExampleRules` - Setting to `true` will disable the
  default rules which are expected to be troublesome for most documentation
  use. See the section below for the specific default rules.
* `settings.jsdoc.matchingFileName` - Setting for a dummy file name to trigger
  specific rules defined in one's config; usable with ESLint `.eslintrc.*`
  `overrides` -> `files` globs, to apply a desired subset of rules with
  `@example` (besides allowing for rules specific to examples, this setting
  can be useful for enabling reuse of the same rules within `@example` as
  with JavaScript Markdown lintable by
  [other plugins](https://github.com/eslint/eslint-plugin-markdown), e.g.,
  if one sets `matchingFileName` to `dummy.md` so that `@example` rules will
  follow one's Markdown rules).
* `settings.jsdoc.configFile` - A config file. Corresponds to ESLint's `-c`.
* `settings.jsdoc.eslintrcForExamples` - Defaults to `true` in adding rules
  based on an `.eslintrc.*` file. Setting to `false` corresponds to
  ESLint's `--no-eslintrc`.
* `settings.jsdoc.baseConfig` - An object of rules with the same schema
  as `.eslintrc.*` for defaults

Finally, the following rule pertains to inline disable directives:

- `settings.jsdoc.reportUnusedDisableDirectives` - If not set to `false`,
  this will report disabled directives which are not used (and thus not
  needed). Defaults to `true`. Corresponds to ESLint's
  `--report-unused-disable-directives`.

#### Rules Disabled by Default Unless `noDefaultExampleRules` is Set to `true`

* `eol-last` - Insisting that a newline "always" be at the end is less likely
  to be desired in sample code as with the code file convention
* `no-console` - Unlikely to have inadvertent temporary debugging within
  examples
* `no-undef` - Many variables in examples will be `undefined`.
* `no-unused-vars` - It is common to define variables for clarity without always
  using them within examples.
* `padded-blocks` - It can generally look nicer to pad a little even if one's
  code follows more stringency as far as block padding.
* `import/no-unresolved` - One wouldn't generally expect example paths to
  resolve relative to the current JavaScript file as one would with real code.
* `import/unambiguous` - Snippets in examples are likely too short to always
  include full import/export info
* `node/no-missing-import` - See `import/no-unresolved`
* `node/no-missing-require` -  See `import/no-unresolved`

## Rules

{"gitdown": "include", "file": "./rules/check-alignment.md"}
{"gitdown": "include", "file": "./rules/check-examples.md"}
{"gitdown": "include", "file": "./rules/check-indentation.md"}
{"gitdown": "include", "file": "./rules/check-param-names.md"}
{"gitdown": "include", "file": "./rules/check-syntax.md"}
{"gitdown": "include", "file": "./rules/check-tag-names.md"}
{"gitdown": "include", "file": "./rules/check-types.md"}
{"gitdown": "include", "file": "./rules/implements-on-classes.md"}
{"gitdown": "include", "file": "./rules/match-description.md"}
{"gitdown": "include", "file": "./rules/newline-after-description.md"}
{"gitdown": "include", "file": "./rules/no-types.md"}
{"gitdown": "include", "file": "./rules/no-undefined-types.md"}
{"gitdown": "include", "file": "./rules/require-description-complete-sentence.md"}
{"gitdown": "include", "file": "./rules/require-description.md"}
{"gitdown": "include", "file": "./rules/require-example.md"}
{"gitdown": "include", "file": "./rules/require-hyphen-before-param-description.md"}
{"gitdown": "include", "file": "./rules/require-jsdoc.md"}
{"gitdown": "include", "file": "./rules/require-param-description.md"}
{"gitdown": "include", "file": "./rules/require-param-name.md"}
{"gitdown": "include", "file": "./rules/require-param-type.md"}
{"gitdown": "include", "file": "./rules/require-param.md"}
{"gitdown": "include", "file": "./rules/require-returns-check.md"}
{"gitdown": "include", "file": "./rules/require-returns-description.md"}
{"gitdown": "include", "file": "./rules/require-returns-type.md"}
{"gitdown": "include", "file": "./rules/require-returns.md"}
{"gitdown": "include", "file": "./rules/valid-types.md"}
