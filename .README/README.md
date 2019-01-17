# eslint-plugin-jsdoc

[![NPM version](http://img.shields.io/npm/v/eslint-plugin-jsdoc.svg?style=flat-square)](https://www.npmjs.org/package/eslint-plugin-jsdoc)
[![Travis build status](http://img.shields.io/travis/gajus/eslint-plugin-jsdoc/master.svg?style=flat-square)](https://travis-ci.org/gajus/eslint-plugin-jsdoc)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

JSDoc linting rules for ESLint.

{"gitdown": "contents"}

### Reference to jscs-jsdoc

This table maps the rules between `eslint-plugin-jsdoc` and `jscs-jsdoc`.

| `eslint-plugin-jsdoc` | `jscs-jsdoc` |
| --- | --- |
| [`check-examples`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-examples) | N/A |
| [`check-param-names`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-param-names) | [`checkParamNames`](https://github.com/jscs-dev/jscs-jsdoc#checkparamnames) |
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
npm install eslint
```

If you have installed `ESLint` globally, you have to install JSDoc plugin globally too. Otherwise, install it locally.

```sh
npm install eslint-plugin-jsdoc
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
        "jsdoc/check-examples": 1,
        "jsdoc/check-param-names": 1,
        "jsdoc/check-tag-names": 1,
        "jsdoc/check-types": 1,
        "jsdoc/newline-after-description": 1,
        "jsdoc/no-undefined-types": 1,
        "jsdoc/require-description": 1,
        "jsdoc/require-description-complete-sentence": 1,
        "jsdoc/require-example": 1,
        "jsdoc/require-hyphen-before-param-description": 1,
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

### Additional Tag Names

Use `settings.jsdoc.additionalTagNames` to configure additional, allowed JSDoc tags. The format of the configuration is as follows:

```json
{
    "rules": {},
    "settings": {
        "jsdoc": {
            "additionalTagNames": {
                "customTags": ["define", "extends", "record"]
            }
        }
    }
}
```

### Allow `@override` Without Accompanying `@param` Tags

Use any of the following settings to override `require-param` and allow
`@param` to be omitted when the specified tags are present on the JSDoc
comment or the parent class comment. The default value for each is `false`.

* `settings.jsdoc.allowOverrideWithoutParam` - Enables behavior with
  `@override` tag
* `settings.jsdoc.allowImplementsWithoutParam` - Enables behavior with
  `@implements` tag
* `settings.jsdoc.allowAugmentsExtendsWithoutParam` - Enables behavior with
  `@augments` tag or its synonym `@extends`

The format of the configuration is as follows:

```json
{
    "rules": {},
    "settings": {
        "jsdoc": {
            "allowOverrideWithoutParam": true,
            "allowImplementsWithoutParam": true,
            "allowAugmentsExtendsWithoutParam": true
        }
    }
}
```

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

{"gitdown": "include", "file": "./rules/check-examples.md"}
{"gitdown": "include", "file": "./rules/check-param-names.md"}
{"gitdown": "include", "file": "./rules/check-tag-names.md"}
{"gitdown": "include", "file": "./rules/check-types.md"}
{"gitdown": "include", "file": "./rules/newline-after-description.md"}
{"gitdown": "include", "file": "./rules/no-undefined-types.md"}
{"gitdown": "include", "file": "./rules/require-description-complete-sentence.md"}
{"gitdown": "include", "file": "./rules/require-description.md"}
{"gitdown": "include", "file": "./rules/require-example.md"}
{"gitdown": "include", "file": "./rules/require-hyphen-before-param-description.md"}
{"gitdown": "include", "file": "./rules/require-param-description.md"}
{"gitdown": "include", "file": "./rules/require-param-name.md"}
{"gitdown": "include", "file": "./rules/require-param-type.md"}
{"gitdown": "include", "file": "./rules/require-param.md"}
{"gitdown": "include", "file": "./rules/require-returns-description.md"}
{"gitdown": "include", "file": "./rules/require-returns-type.md"}
{"gitdown": "include", "file": "./rules/require-returns-check.md"}
{"gitdown": "include", "file": "./rules/require-returns.md"}
{"gitdown": "include", "file": "./rules/valid-types.md"}
