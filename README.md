<a name="eslint-plugin-jsdoc"></a>
# eslint-plugin-jsdoc

[![GitSpo Mentions](https://gitspo.com/badges/mentions/gajus/eslint-plugin-jsdoc?style=flat-square)](https://gitspo.com/mentions/gajus/eslint-plugin-jsdoc)
[![NPM version](http://img.shields.io/npm/v/eslint-plugin-jsdoc.svg?style=flat-square)](https://www.npmjs.org/package/eslint-plugin-jsdoc)
[![Travis build status](http://img.shields.io/travis/gajus/eslint-plugin-jsdoc/master.svg?style=flat-square)](https://travis-ci.org/gajus/eslint-plugin-jsdoc)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

JSDoc linting rules for ESLint.

* [eslint-plugin-jsdoc](#eslint-plugin-jsdoc)
    * [Installation](#eslint-plugin-jsdoc-installation)
    * [Configuration](#eslint-plugin-jsdoc-configuration)
    * [Options](#eslint-plugin-jsdoc-options)
    * [Settings](#eslint-plugin-jsdoc-settings)
        * [Allow `@private` to disable rules for that comment block](#eslint-plugin-jsdoc-settings-allow-private-to-disable-rules-for-that-comment-block)
        * [Mode](#eslint-plugin-jsdoc-settings-mode)
        * [Alias Preference](#eslint-plugin-jsdoc-settings-alias-preference)
        * [`@override`/`@augments`/`@extends`/`@implements` Without Accompanying `@param`/`@description`/`@example`/`@returns`](#eslint-plugin-jsdoc-settings-override-augments-extends-implements-without-accompanying-param-description-example-returns)
        * [Settings to Configure `check-types` and `no-undefined-types`](#eslint-plugin-jsdoc-settings-settings-to-configure-check-types-and-no-undefined-types)
    * [Rules](#eslint-plugin-jsdoc-rules)
        * [`check-alignment`](#eslint-plugin-jsdoc-rules-check-alignment)
        * [`check-examples`](#eslint-plugin-jsdoc-rules-check-examples)
        * [`check-indentation`](#eslint-plugin-jsdoc-rules-check-indentation)
        * [`check-param-names`](#eslint-plugin-jsdoc-rules-check-param-names)
        * [`check-syntax`](#eslint-plugin-jsdoc-rules-check-syntax)
        * [`check-tag-names`](#eslint-plugin-jsdoc-rules-check-tag-names)
        * [`check-types`](#eslint-plugin-jsdoc-rules-check-types)
        * [`implements-on-classes`](#eslint-plugin-jsdoc-rules-implements-on-classes)
        * [`match-description`](#eslint-plugin-jsdoc-rules-match-description)
        * [`newline-after-description`](#eslint-plugin-jsdoc-rules-newline-after-description)
        * [`no-types`](#eslint-plugin-jsdoc-rules-no-types)
        * [`no-undefined-types`](#eslint-plugin-jsdoc-rules-no-undefined-types)
        * [`require-description-complete-sentence`](#eslint-plugin-jsdoc-rules-require-description-complete-sentence)
        * [`require-description`](#eslint-plugin-jsdoc-rules-require-description)
        * [`require-example`](#eslint-plugin-jsdoc-rules-require-example)
        * [`require-hyphen-before-param-description`](#eslint-plugin-jsdoc-rules-require-hyphen-before-param-description)
        * [`require-jsdoc`](#eslint-plugin-jsdoc-rules-require-jsdoc)
        * [`require-param-description`](#eslint-plugin-jsdoc-rules-require-param-description)
        * [`require-param-name`](#eslint-plugin-jsdoc-rules-require-param-name)
        * [`require-param-type`](#eslint-plugin-jsdoc-rules-require-param-type)
        * [`require-param`](#eslint-plugin-jsdoc-rules-require-param)
        * [`require-returns-check`](#eslint-plugin-jsdoc-rules-require-returns-check)
        * [`require-returns-description`](#eslint-plugin-jsdoc-rules-require-returns-description)
        * [`require-returns-type`](#eslint-plugin-jsdoc-rules-require-returns-type)
        * [`require-returns`](#eslint-plugin-jsdoc-rules-require-returns)
        * [`valid-types`](#eslint-plugin-jsdoc-rules-valid-types)


<a name="eslint-plugin-jsdoc-installation"></a>
## Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.

```sh
npm install --save-dev eslint
```

If you have installed `ESLint` globally, you have to install JSDoc plugin globally too. Otherwise, install it locally.

```sh
npm install --save-dev eslint-plugin-jsdoc
```

<a name="eslint-plugin-jsdoc-configuration"></a>
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

```javascript
{
    "rules": {
        "jsdoc/check-alignment": 1, // Recommended
        "jsdoc/check-examples": 1,
        "jsdoc/check-indentation": 1,
        "jsdoc/check-param-names": 1, // Recommended
        "jsdoc/check-syntax": 1,
        "jsdoc/check-tag-names": 1, // Recommended
        "jsdoc/check-types": 1, // Recommended
        "jsdoc/implements-on-classes": 1, // Recommended
        "jsdoc/match-description": 1,
        "jsdoc/newline-after-description": 1, // Recommended
        "jsdoc/no-types": 1,
        "jsdoc/no-undefined-types": 1, // Recommended
        "jsdoc/require-description": 1,
        "jsdoc/require-description-complete-sentence": 1,
        "jsdoc/require-example": 1,
        "jsdoc/require-hyphen-before-param-description": 1,
        "jsdoc/require-jsdoc": 1, // Recommended
        "jsdoc/require-param": 1, // Recommended
        "jsdoc/require-param-description": 1, // Recommended
        "jsdoc/require-param-name": 1, // Recommended
        "jsdoc/require-param-type": 1, // Recommended
        "jsdoc/require-returns": 1, // Recommended
        "jsdoc/require-returns-check": 1, // Recommended
        "jsdoc/require-returns-description": 1, // Recommended
        "jsdoc/require-returns-type": 1, // Recommended
        "jsdoc/valid-types": 1 // Recommended
    }
}
```

Or you can simply use the following which enables the rules commented
above as "recommended":

```json
{
  "extends": ["plugin:jsdoc/recommended"]
}
```

You can then selectively add to or override the recommended rules.

<a name="eslint-plugin-jsdoc-options"></a>
## Options

Rules may, as per the [ESLint user guide](https://eslint.org/docs/user-guide/configuring), have their own individual options. In `eslint-plugin-jsdoc`, a few options,
such as, `exemptedBy` and `contexts`, may be used across different rules.

`eslint-plugin-jsdoc` options, if present, are in the form of an object
supplied as the second argument in an array after the error level.

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

<a name="eslint-plugin-jsdoc-settings"></a>
## Settings

<a name="eslint-plugin-jsdoc-settings-allow-private-to-disable-rules-for-that-comment-block"></a>
### Allow <code>@private</code> to disable rules for that comment block

- `settings.jsdoc.ignorePrivate` - Disables all rules for the comment block
  on which a `@private` tag occurs. Defaults to `false`.

<a name="eslint-plugin-jsdoc-settings-mode"></a>
### Mode

- `settings.jsdoc.mode` - Set to `jsdoc` (the default), `typescript`, or `closure`.
  Currently is used for the following:
  - Determine valid tags for `check-tag-names`
  - Only check `@template` in `no-undefined-types` for types in "closure" and
    "typescript" modes
  - For type-checking rules, determine which tags will be checked for types
    (Closure allows types on some tags which the others do not,
    so these tags will additionally be checked in "closure" mode)
  - Check preferred tag names

<a name="eslint-plugin-jsdoc-settings-alias-preference"></a>
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

<a name="eslint-plugin-jsdoc-settings-override-augments-extends-implements-without-accompanying-param-description-example-returns"></a>
### <code>@override</code>/<code>@augments</code>/<code>@extends</code>/<code>@implements</code> Without Accompanying <code>@param</code>/<code>@description</code>/<code>@example</code>/<code>@returns</code>

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

<a name="eslint-plugin-jsdoc-settings-settings-to-configure-check-types-and-no-undefined-types"></a>
### Settings to Configure <code>check-types</code> and <code>no-undefined-types</code>

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
    forbidding the type. The message string will have the substrings with
    special meaning, `{{tagName}}` and `{{tagValue}}`, replaced with their
    corresponding value.

Note that the preferred types indicated as targets in `settings.jsdoc.preferredTypes`
map will be assumed to be defined by `no-undefined-types`.

See the option of `check-types`, `unifyParentAndChildTypeChecks`, for
how the keys of `preferredTypes` may have `<>` or `.<>` (or just `.`)
appended and its bearing on whether types are checked as parents/children
only (e.g., to match `Array` if the type is `Array` vs. `Array.<string>`).

<a name="eslint-plugin-jsdoc-rules"></a>
## Rules

<a name="eslint-plugin-jsdoc-rules-check-alignment"></a>
### <code>check-alignment</code>

Reports invalid alignment of JSDoc block asterisks.

|||
|---|---|
|Context|everywhere|
|Tags|N/A|

The following patterns are considered problems:

````js
/**
  * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// Message: Expected JSDoc block to be aligned.

/**
  * @param {Number} foo
 */
function quux (foo) {
	// with tabs
}
// Message: Expected JSDoc block to be aligned.

/**
  * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// Message: Expected JSDoc block to be aligned.

/**
* @param {Number} foo
*/
function quux (foo) {
  // with spaces
}
// Message: Expected JSDoc block to be aligned.

/**
 * @param {Number} foo
  */
function quux (foo) {

}
// Message: Expected JSDoc block to be aligned.

 /**
 * @param {Number} foo
 */
function quux (foo) {

}
// Message: Expected JSDoc block to be aligned.

 /**
  * @param {Number} foo
 */
function quux (foo) {

}
// Message: Expected JSDoc block to be aligned.

/**
  * @param {Number} foo
  */
 function quux (foo) {

 }
// Message: Expected JSDoc block to be aligned.

/**
   * A jsdoc not attached to any node.
 */
// Message: Expected JSDoc block to be aligned.

class Foo {
  /**
   *  Some method
    * @param a
   */
  quux(a) {}
}
// Message: Expected JSDoc block to be aligned.
````

The following patterns are not considered problems:

````js
/**
 * Desc
 *
 * @param {Number} foo
 */
function quux (foo) {

}

/**
 * Desc
 *
 * @param {{
  foo: Bar,
  bar: Baz
 * }} foo
 *
 */
function quux (foo) {

}

/*  <- JSDoc must start with 2 stars.
  *    So this is unchecked.
 */
function quux (foo) {}
````


<a name="eslint-plugin-jsdoc-rules-check-examples"></a>
### <code>check-examples</code>

Ensures that (JavaScript) examples within JSDoc adhere to ESLint rules.

<a name="eslint-plugin-jsdoc-rules-check-examples-options-1"></a>
#### Options

The options below all default to no-op/`false` except as noted.

<a name="eslint-plugin-jsdoc-rules-check-examples-options-1-captionrequired"></a>
##### <code>captionRequired</code>

JSDoc specs use of an optional `<caption>` element at the beginning of
`@example`.

The option `captionRequired` insists on a `<caption>` being present at
the beginning of any `@example`.

<a name="eslint-plugin-jsdoc-rules-check-examples-options-1-examplecoderegex-and-rejectexamplecoderegex"></a>
##### <code>exampleCodeRegex</code> and <code>rejectExampleCodeRegex</code>

JSDoc does not specify a formal means for delimiting code blocks within
`@example` (it uses generic syntax highlighting techniques for its own
syntax highlighting). The following options determine whether a given
`@example` tag will have the `check-examples` checks applied to it:

* `exampleCodeRegex` - Regex which whitelists lintable
  examples. If a parenthetical group is used, the first one will be used,
  so you may wish to use `(?:...)` groups where you do not wish the
  first such group treated as one to include. If no parenthetical group
  exists or matches, the whole matching expression will be used.
  An example might be ````"^```(?:js|javascript)([\\s\\S]*)```\s*$"````
  to only match explicitly fenced JavaScript blocks.
* `rejectExampleCodeRegex` - Regex blacklist which rejects
  non-lintable examples (has priority over `exampleCodeRegex`). An example
  might be ```"^`"``` to avoid linting fenced blocks which may indicate
  a non-JavaScript language.

If neither is in use, all examples will be matched. Note also that even if
`captionRequired` is not set, any initial `<caption>` will be stripped out
before doing the regex matching.

<a name="eslint-plugin-jsdoc-rules-check-examples-options-1-paddedindent"></a>
##### <code>paddedIndent</code>

This integer property allows one to add a fixed amount of whitespace at the
beginning of the second or later lines of the example to be stripped so as
to avoid linting issues with the decorative whitespace. For example, if set
to a value of `4`, the initial whitespace below will not trigger `indent`
rule errors as the extra 4 spaces on each subsequent line will be stripped
out before evaluation.

```js
/**
 * @example
 *     anArray.filter((a) => {
 *      return a.b;
 *     });
 */
```

<a name="eslint-plugin-jsdoc-rules-check-examples-options-1-reportunuseddisabledirectives"></a>
##### <code>reportUnusedDisableDirectives</code>

If not set to `false`, `reportUnusedDisableDirectives` will report disabled
directives which are not used (and thus not needed). Defaults to `true`.
Corresponds to ESLint's [`--report-unused-disable-directives`](https://eslint.org/docs/user-guide/command-line-interface#--report-unused-disable-directives).

Inline ESLint config within `@example` JavaScript is allowed, though the
disabling of ESLint directives which are not needed by the resolved rules
will be reported as with the ESLint `--report-unused-disable-directives`
command.

<a name="eslint-plugin-jsdoc-rules-check-examples-options-for-determining-eslint-rule-applicability-allowinlineconfig-nodefaultexamplerules-matchingfilename-configfile-eslintrcforexamples-and-baseconfig"></a>
#### Options for Determining ESLint Rule Applicability (<code>allowInlineConfig</code>, <code>noDefaultExampleRules</code>, <code>matchingFileName</code>, <code>configFile</code>, <code>eslintrcForExamples</code>, and <code>baseConfig</code>)

The following options determine which individual ESLint rules will be
applied to the JavaScript found within the `@example` tags (as determined
to be applicable by the above regex options). They are ordered by
decreasing precedence:

* `allowInlineConfig` - If not set to `false`, will allow
  inline config within the `@example` to override other config. Defaults
  to `true`.
* `noDefaultExampleRules` - Setting to `true` will disable the
  default rules which are expected to be troublesome for most documentation
  use. See the section below for the specific default rules.
* `matchingFileName` - Option for a file name (even non-existent) to trigger
  specific rules defined in one's config; usable with ESLint `.eslintrc.*`
  `overrides` -> `files` globs, to apply a desired subset of rules with
  `@example` (besides allowing for rules specific to examples, this option
  can be useful for enabling reuse of the same rules within `@example` as
  with JavaScript Markdown lintable by
  [other plugins](https://github.com/eslint/eslint-plugin-markdown), e.g.,
  if one sets `matchingFileName` to `dummy.md` so that `@example` rules will
  follow one's Markdown rules). Note that this option may come at somewhat
  of a performance penalty as the file's existence is checked by eslint.
* `configFile` - A config file. Corresponds to ESLint's [`-c`](https://eslint.org/docs/user-guide/command-line-interface#-c---config).
* `eslintrcForExamples` - Defaults to `true` in adding rules
  based on an `.eslintrc.*` file. Setting to `false` corresponds to
  ESLint's [`--no-eslintrc`](https://eslint.org/docs/user-guide/command-line-interface#--no-eslintrc).
* `baseConfig` - An object of rules with the same schema
  as `.eslintrc.*` for defaults

<a name="eslint-plugin-jsdoc-rules-check-examples-options-for-determining-eslint-rule-applicability-allowinlineconfig-nodefaultexamplerules-matchingfilename-configfile-eslintrcforexamples-and-baseconfig-rules-disabled-by-default-unless-nodefaultexamplerules-is-set-to-true"></a>
##### Rules Disabled by Default Unless <code>noDefaultExampleRules</code> is Set to <code>true</code>

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

|||
|---|---|
|Context|everywhere|
|Tags|`example`|
|Options| *See above* |

The following patterns are considered problems:

````js
/**
 * @example alert('hello')
 */
function quux () {

}
// Options: [{"baseConfig":{"rules":{"no-alert":2,"semi":["error","always"]}},"eslintrcForExamples":false}]
// Message: @example error (no-alert): Unexpected alert.

/**
 * @example alert('hello')
 */
class quux {

}
// Options: [{"baseConfig":{"rules":{"no-alert":2,"semi":["error","always"]}},"eslintrcForExamples":false}]
// Message: @example error (no-alert): Unexpected alert.

/**
 * @example ```js
 alert('hello');
 ```
 */
function quux () {

}
// Options: [{"baseConfig":{"rules":{"semi":["error","never"]}},"eslintrcForExamples":false,"exampleCodeRegex":"```js([\\s\\S]*)```"}]
// Message: @example error (semi): Extra semicolon.

/**
 * @example
 *
 * ```js alert('hello'); ```
 */
function quux () {

}
// Options: [{"baseConfig":{"rules":{"semi":["error","never"]}},"eslintrcForExamples":false,"exampleCodeRegex":"```js ([\\s\\S]*)```"}]
// Message: @example error (semi): Extra semicolon.

/**
 * @example
 * ```js alert('hello'); ```
 */
var quux = {

};
// Options: [{"baseConfig":{"rules":{"semi":["error","never"]}},"eslintrcForExamples":false,"exampleCodeRegex":"```js ([\\s\\S]*)```"}]
// Message: @example error (semi): Extra semicolon.

/**
 * @example ```
 * js alert('hello'); ```
 */
function quux () {

}
// Options: [{"baseConfig":{"rules":{"semi":["error","never"]}},"eslintrcForExamples":false,"exampleCodeRegex":"```\njs ([\\s\\S]*)```"}]
// Message: @example error (semi): Extra semicolon.

/**
 * @example <b>Not JavaScript</b>
 */
function quux () {

}
/**
 * @example quux2();
 */
function quux2 () {

}
// Options: [{"baseConfig":{"rules":{"semi":["error","never"]}},"eslintrcForExamples":false,"rejectExampleCodeRegex":"^\\s*<.*>\\s*$"}]
// Message: @example error (semi): Extra semicolon.

/**
 * @example
 * quux(); // does something useful
 */
function quux () {

}
// Options: [{"baseConfig":{"rules":{"no-undef":["error"]}},"eslintrcForExamples":false,"noDefaultExampleRules":true}]
// Message: @example error (no-undef): 'quux' is not defined.

/**
 * @example <caption>Valid usage</caption>
 * quux(); // does something useful
 *
 * @example
 * quux('random unwanted arg'); // results in an error
 */
function quux () {

}
// Options: [{"captionRequired":true,"eslintrcForExamples":false}]
// Message: Caption is expected for examples.

/**
 * @example  quux();
 */
function quux () {

}
// Options: [{"baseConfig":{"rules":{"indent":["error"]}},"eslintrcForExamples":false,"noDefaultExampleRules":false}]
// Message: @example error (indent): Expected indentation of 0 spaces but found 1.

/**
 * @example test() // eslint-disable-line semi
 */
function quux () {}
// Options: [{"eslintrcForExamples":false,"noDefaultExampleRules":true,"reportUnusedDisableDirectives":true}]
// Message: @example error: Unused eslint-disable directive (no problems were reported from 'semi').

/**
 * @example
 test() // eslint-disable-line semi
 */
function quux () {}
// Options: [{"allowInlineConfig":false,"baseConfig":{"rules":{"semi":["error","always"]}},"eslintrcForExamples":false,"noDefaultExampleRules":true}]
// Message: @example error (semi): Missing semicolon.

/**
 * @example const i = 5;
 * quux2()
 */
function quux2 () {

}
// Options: [{"matchingFileName":"test/jsdocUtils.js"}]
// Message: @example warning (id-length): Identifier name 'i' is too short (< 2).

/**
 * @example const i = 5;
 *   quux2()
 */
function quux2 () {

}
// Options: [{"paddedIndent":2}]
// Message: @example warning (id-length): Identifier name 'i' is too short (< 2).

/**
 * @example
 * const i = 5;
 * quux2()
 */
function quux2 () {

}
// Message: @example warning (id-length): Identifier name 'i' is too short (< 2).

/**
 * @example const i = 5;
 * quux2()
 */
function quux2 () {

}
// Options: [{"matchingFileName":"test/rules/data/dummy.js"}]
// Message: @example error (semi): Missing semicolon.

/**
 * @example // begin
 alert('hello')
 // end
 */
function quux () {

}
// Options: [{"baseConfig":{"rules":{"semi":["warn","always"]}},"eslintrcForExamples":false,"exampleCodeRegex":"// begin[\\s\\S]*// end","noDefaultExampleRules":true}]
// Message: @example warning (semi): Missing semicolon.

/**
 *
 */
function f () {

}
// Settings: {"jsdoc":{"allowInlineConfig":true,"baseConfig":{},"captionRequired":false,"configFile":"configFile.js","eslintrcForExamples":true,"exampleCodeRegex":".*?","matchingFileName":"test.md","noDefaultExampleRules":false,"rejectExampleCodeRegex":"\\W*","reportUnusedDisableDirectives":true}}
// Message: `settings.jsdoc.captionRequired` has been removed, use options in the rule `check-examples` instead.

/**
 * @typedef {string} Foo
 * @example <caption></caption>
 * 'foo'
 */
// Options: [{"captionRequired":true,"eslintrcForExamples":false}]
// Message: Caption is expected for examples.

/**
 * @example
 * const list: number[] = [1, 2, 3]
 * quux(list);
 */
function quux () {

}
// Options: [{"baseConfig":{"parser":"@typescript-eslint/parser","parserOptions":{"ecmaVersion":6},"rules":{"semi":["error","always"]}},"eslintrcForExamples":false}]
// Message: @example error (semi): Missing semicolon.
````

The following patterns are not considered problems:

````js
/**
 * @example ```js
 alert('hello');
 ```
 */
function quux () {

}
// Options: [{"baseConfig":{"rules":{"semi":["error","always"]}},"eslintrcForExamples":false,"exampleCodeRegex":"```js([\\s\\S]*)```"}]

/**
 * @example
 * // arbitrary example content
 */
function quux () {

}
// Options: [{"eslintrcForExamples":false}]

/**
 * @example
 * quux(); // does something useful
 */
function quux () {

}
// Options: [{"baseConfig":{"rules":{"no-undef":["error"]}},"eslintrcForExamples":false,"noDefaultExampleRules":false}]

/**
 * @example quux();
 */
function quux () {

}
// Options: [{"baseConfig":{"rules":{"indent":["error"]}},"eslintrcForExamples":false,"noDefaultExampleRules":false}]

/**
 * @example <caption>Valid usage</caption>
 * quux(); // does something useful
 *
 * @example <caption>Invalid usage</caption>
 * quux('random unwanted arg'); // results in an error
 */
function quux () {

}
// Options: [{"captionRequired":true,"eslintrcForExamples":false}]

/**
 * @example test() // eslint-disable-line semi
 */
function quux () {}
// Options: [{"eslintrcForExamples":false,"noDefaultExampleRules":true,"reportUnusedDisableDirectives":false}]

/**
 * @example
 test() // eslint-disable-line semi
 */
function quux () {}
// Options: [{"allowInlineConfig":true,"baseConfig":{"rules":{"semi":["error","always"]}},"eslintrcForExamples":false,"noDefaultExampleRules":true}]

/**
 * @example ```js
 alert('hello')
 ```
 */
var quux = {

};
// Options: [{"baseConfig":{"rules":{"semi":["error","never"]}},"eslintrcForExamples":false,"exampleCodeRegex":"```js([\\s\\S]*)```"}]

/**
 * @example
 * foo(function (err) {
 *     throw err;
 * });
 */
function quux () {}
// Options: [{"baseConfig":{"rules":{"indent":["error"]}},"eslintrcForExamples":false,"noDefaultExampleRules":false}]

/**
 * @example
 * const list: number[] = [1, 2, 3];
 * quux(list);
 */
function quux () {

}
// Options: [{"baseConfig":{"parser":"@typescript-eslint/parser","parserOptions":{"ecmaVersion":6},"rules":{"semi":["error","always"]}},"eslintrcForExamples":false}]
````


<a name="eslint-plugin-jsdoc-rules-check-indentation"></a>
### <code>check-indentation</code>

Reports invalid padding inside JSDoc blocks.

Ignores parts enclosed in Markdown "code block"'s. For example,
the following description is not reported:

```js
/**
 * Some description:
 * ```html
 * <section>
 *   <title>test</title>
 * </section>
 * ```
 */
```

<a name="eslint-plugin-jsdoc-rules-check-indentation-options-2"></a>
#### Options

This rule has an object option.

<a name="eslint-plugin-jsdoc-rules-check-indentation-options-2-excludetags"></a>
##### <code>excludeTags</code>

Array of tags (e.g., `['example', 'description']`) whose content will be
"hidden" from the `check-indentation` rule. Defaults to `['example']`.

By default, the whole JSDoc block will be checked for invalid padding.
That would include `@example` blocks too, which can get in the way
of adding full, readable examples of code without ending up with multiple
linting issues.

When disabled (by passing `excludeTags: []` option), the following code *will*
report a padding issue:

```js
/**
 * @example
 * anArray.filter((a) => {
 *   return a.b;
 * });
 */
```

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Options| `excludeTags` |

The following patterns are considered problems:

````js
/***  foo */
function quux () {

}
// Message: There must be no indentation.

/**
 * foo
 *
 * @param bar
 *  baz
 */
function quux () {

}
// Message: There must be no indentation.

/**
 * Foo
 *   bar
 */
class Moo {}
// Message: There must be no indentation.

/**
 * foo
 *
 * @example
 * anArray.filter((a) => {
 *   return a.b;
 * });
 */
function quux () {

}
// Options: [{"excludeTags":[]}]
// Message: There must be no indentation.

/**
 * foo
 *
 * @example
 *   aaaa
 * @returns
 *   eeee
 */
function quux () {

}
// Message: There must be no indentation.

/**
 * foo
 * ```html
 * <section>
 *   <title>test</title>
 * </section>
 * ```
 * @returns
 *   eeee
 */
function quux () {

}
// Message: There must be no indentation.

/**
 * foo
 * ```   aaaa```
 * @returns
 *   eeee
 */
function quux () {

}
// Message: There must be no indentation.

/**
* @example <caption>
* Here is a long
*   indented summary of this
* example
* </caption>
* ```js
* function hi () {
*   alert('Hello');
* }
* ```
*/
// Options: [{"excludeTags":[]}]
// Message: There must be no indentation.

/**
* @example <caption>
* Here is a long
* summary of this
* example
* </caption>
* // Code is not wrapped into fenced code block
* function hi () {
*   alert('Hello');
* }
*/
// Options: [{"excludeTags":[]}]
// Message: There must be no indentation.
````

The following patterns are not considered problems:

````js
/**
 * foo
 *
 * @param bar
 * baz
 */
function quux () {

}

/*** foo */
function quux () {

}

/**
 * foo
 *
 * @example
 * anArray.filter((a) => {
 *   return a.b;
 * });
 */
function quux () {

}

/**
 * foo
 *
 * @example
 * anArray.filter((a) => {
 *   return a.b;
 * });
 * @returns
 *   eeee
 */
function quux () {

}
// Options: [{"excludeTags":["example","returns"]}]

/**
 * foo
 * ```html
 * <section>
 *   <title>test</title>
 * </section>
 * ```
 * @returns eeee
 */
function quux () {

}

/**
 * foo
 * ```   aaaa```
 * @returns eeee
 */
function quux () {

}

/**
* @example <caption>
* Here is a long
* summary of this
* example
* </caption>
* ```js
* function hi () {
*   alert('Hello');
* }
* ```
*/
// Options: [{"excludeTags":[]}]
````


<a name="eslint-plugin-jsdoc-rules-check-param-names"></a>
### <code>check-param-names</code>

Ensures that parameter names in JSDoc match those in the function declaration.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`param`|

The following patterns are considered problems:

````js
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
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}
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

/**
 * @param foo
 * @param foo
 */
function quux (foo) {

}
// Message: Duplicate @param "foo"

/**
 * @param foo
 * @param foo
 */
function quux (foo, bar) {

}
// Message: Duplicate @param "foo"

/**
 * @param foo
 * @param foo
 */
function quux (foo, foo) {

}
// Message: Duplicate @param "foo"

export class SomeClass {
  /**
   * @param prop
   */
  constructor(private property: string) {}
}
// Message: Expected @param names to be "property". Got "prop".

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`
````

The following patterns are not considered problems:

````js
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

/**
 * @param foo
 */
function quux ({a, b} = {}) {

}

/**
 * @param foo
 */
function quux ([a, b] = []) {

}

/**
 * Assign the project to a list of employees.
 * @param {Object[]} employees - The employees who are responsible for the project.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].department - The employee's department.
 */
function assign (employees) {

};

export class SomeClass {
  /**
   * @param property
   */
  constructor(private property: string) {}
}
````


<a name="eslint-plugin-jsdoc-rules-check-param-names-deconstructing-function-parameter"></a>
#### Deconstructing Function Parameter

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

`{a, b}` is an [`ObjectPattern`](https://github.com/estree/estree/blob/master/es2015.md#objectpattern) AST type and does not have a name. Therefore, the associated parameter in JSDoc block can have any name.

Likewise for the pattern `[a, b]` which is an [`ArrayPattern`](https://github.com/estree/estree/blob/master/es2015.md#arraypattern).

<a name="eslint-plugin-jsdoc-rules-check-syntax"></a>
### <code>check-syntax</code>

Reports against Google Closure Compiler syntax.

|||
|---|---|
|Context|everywhere|
|Tags|N/A|

The following patterns are considered problems:

````js
/**
 * @param {string=} foo
 */
function quux (foo) {

}
// Message: Syntax should not be Google Closure Compiler style.
````

The following patterns are not considered problems:

````js
/**
 * @param {string} [foo]
 */
function quux (foo) {

}

/**
 *
 */
function quux (foo) {

}
````


<a name="eslint-plugin-jsdoc-rules-check-tag-names"></a>
### <code>check-tag-names</code>

Reports invalid block tag names.

Valid [JSDoc 3 Block Tags](https://jsdoc.app/#block-tags) are:

```
abstract
access
alias
async
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
generator
global
hideconstructor
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
memberof!
mixes
mixin
module
name
namespace
override
package
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
yields
```

`modifies` is also supported (see [source](https://github.com/jsdoc/jsdoc/blob/master/packages/jsdoc/lib/jsdoc/tag/dictionary/definitions.js#L594)) but is undocumented.

The following synonyms are also recognized:

```
arg
argument
const
constructor
defaultvalue
desc
emits
exception
extends
fileoverview
func
host
method
overview
prop
return
var
virtual
yield
```

For [TypeScript](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html#supported-jsdoc)
(or Closure), when `settings.jsdoc.mode` is set to `typescript` or `closure`,
one may also use the following:

```
template
```

And for [Closure](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler),
when `settings.jsdoc.mode` is set to `closure`, one may use the following (in
addition to the jsdoc and TypeScript tags):

```
define (synonym of `const` per jsdoc source)
dict
export
externs
final
implicitCast (casing distinct from that recognized by jsdoc internally)
inheritDoc (casing distinct from that recognized by jsdoc internally)
noalias
nocollapse
nocompile
noinline
nosideeffects
polymer
polymerBehavior
preserve
record (synonym of `interface` per jsdoc source)
struct
suppress
unrestricted
```

...and these undocumented tags which are only in [source](https://github.com/google/closure-compiler/blob/master/src/com/google/javascript/jscomp/parsing/Annotation.java):

```
closurePrimitive
customElement
expose
hidden
idGenerator
meaning
mixinClass
mixinFunction
ngInject
owner
typeSummary
wizaction
```

Note that the tags indicated as replacements in `settings.jsdoc.tagNamePreference` will automatically be considered as valid.

<a name="eslint-plugin-jsdoc-rules-check-tag-names-options-3"></a>
#### Options

<a name="eslint-plugin-jsdoc-rules-check-tag-names-options-3-definedtags"></a>
##### <code>definedTags</code>

Use an array of `definedTags` strings to configure additional, allowed tags.
The format is as follows:

```json
{
  "definedTags": ["note", "record"]
}
```

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Options|`definedTags`|
|Settings|`tagNamePreference`, `mode`|

The following patterns are considered problems:

````js
/** @typoo {string} */
let a;
// Message: Invalid JSDoc tag name "typoo".

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
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}
// Message: Invalid JSDoc tag (preference). Replace "param" JSDoc tag with "arg".

/**
 * @arg foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"arg":"somethingDifferent"}}}
// Message: Invalid JSDoc tag (preference). Replace "arg" JSDoc tag with "somethingDifferent".

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"parameter"}}}
// Message: Invalid JSDoc tag (preference). Replace "param" JSDoc tag with "parameter".

/**
 * @bar foo
 */
function quux (foo) {

}
// Message: Invalid JSDoc tag name "bar".

/**
 * @baz @bar foo
 */
function quux (foo) {

}
// Options: [{"definedTags":["bar"]}]
// Message: Invalid JSDoc tag name "baz".

/**
 * @bar
 * @baz
 */
function quux (foo) {

}
// Options: [{"definedTags":["bar"]}]
// Message: Invalid JSDoc tag name "baz".

/**
 * @todo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"todo":false}}}
// Message: Blacklisted tag found (`@todo`)

/**
 * @todo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"todo":{"message":"Please resolve to-dos or add to the tracker"}}}}
// Message: Please resolve to-dos or add to the tracker

/**
 * @todo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"todo":{"message":"Please use x-todo instead of todo","replacement":"x-todo"}}}}
// Message: Please use x-todo instead of todo

/**
 * @todo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"todo":{"message":"Please use x-todo instead of todo","replacement":"x-todo"}}}}
// Message: Please use x-todo instead of todo

/**
 * @todo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"todo":55}}}
// Message: Invalid `settings.jsdoc.tagNamePreference`. Values must be falsy, a string, or an object.

/**
 * @property {object} a
 * @prop {boolean} b
 */
function quux () {

}
// Message: Invalid JSDoc tag (preference). Replace "prop" JSDoc tag with "property".

/**
 * @abc foo
 * @abcd bar
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"abc":"abcd"}}}
// Options: [{"definedTags":["abcd"]}]
// Message: Invalid JSDoc tag (preference). Replace "abc" JSDoc tag with "abcd".

/**
 * @abc
 * @abcd
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"abc":"abcd"}}}
// Message: Invalid JSDoc tag (preference). Replace "abc" JSDoc tag with "abcd".

/** 
 * @modifies
 * @abstract
 * @access
 * @alias
 * @async
 * @augments
 * @author
 * @borrows
 * @callback
 * @class
 * @classdesc
 * @constant
 * @constructs
 * @copyright
 * @default
 * @deprecated
 * @description
 * @enum
 * @event
 * @example
 * @exports
 * @external
 * @file
 * @fires
 * @function
 * @generator
 * @global
 * @hideconstructor
 * @ignore
 * @implements
 * @inheritdoc
 * @inner
 * @instance
 * @interface
 * @kind
 * @lends
 * @license
 * @listens
 * @member
 * @memberof
 * @memberof!
 * @mixes
 * @mixin
 * @module
 * @name
 * @namespace
 * @override
 * @package
 * @param
 * @private
 * @property
 * @protected
 * @public
 * @readonly
 * @requires
 * @returns
 * @see
 * @since
 * @static
 * @summary
 * @this
 * @throws
 * @todo
 * @tutorial
 * @type
 * @typedef
 * @variation
 * @version
 * @yields
 */
function quux (foo) {}
// Settings: {"jsdoc":{"mode":"badMode"}}
// Message: Unrecognized value `badMode` for `settings.jsdoc.mode`.

/** 
 * @modifies
 * @abstract
 * @access
 * @alias
 * @async
 * @augments
 * @author
 * @borrows
 * @callback
 * @class
 * @classdesc
 * @constant
 * @constructs
 * @copyright
 * @default
 * @deprecated
 * @description
 * @enum
 * @event
 * @example
 * @exports
 * @external
 * @file
 * @fires
 * @function
 * @generator
 * @global
 * @hideconstructor
 * @ignore
 * @implements
 * @inheritdoc
 * @inner
 * @instance
 * @interface
 * @kind
 * @lends
 * @license
 * @listens
 * @member
 * @memberof
 * @memberof!
 * @mixes
 * @mixin
 * @module
 * @name
 * @namespace
 * @override
 * @package
 * @param
 * @private
 * @property
 * @protected
 * @public
 * @readonly
 * @requires
 * @returns
 * @see
 * @since
 * @static
 * @summary
 * @this
 * @throws
 * @todo
 * @tutorial
 * @type
 * @typedef
 * @variation
 * @version
 * @yields
 * @template
 */
function quux (foo) {}
// Message: Invalid JSDoc tag name "template".

/** 
 * @externs
 */
function quux (foo) {}
// Message: Invalid JSDoc tag name "externs".
````

The following patterns are not considered problems:

````js
/**
 * @param foo
 */
function quux (foo) {

}

/**
 * @memberof! foo
 */
function quux (foo) {

}

/**
 * @arg foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}

/**
 * @bar foo
 */
function quux (foo) {

}
// Options: [{"definedTags":["bar"]}]

/**
 * @baz @bar foo
 */
function quux (foo) {

}
// Options: [{"definedTags":["baz","bar"]}]

/**
 * @baz @bar foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"baz","returns":{"message":"Prefer `bar`","replacement":"bar"},"todo":false}}}

/** 
 * @modifies
 * @abstract
 * @access
 * @alias
 * @async
 * @augments
 * @author
 * @borrows
 * @callback
 * @class
 * @classdesc
 * @constant
 * @constructs
 * @copyright
 * @default
 * @deprecated
 * @description
 * @enum
 * @event
 * @example
 * @exports
 * @external
 * @file
 * @fires
 * @function
 * @generator
 * @global
 * @hideconstructor
 * @ignore
 * @implements
 * @inheritdoc
 * @inner
 * @instance
 * @interface
 * @kind
 * @lends
 * @license
 * @listens
 * @member
 * @memberof
 * @memberof!
 * @mixes
 * @mixin
 * @module
 * @name
 * @namespace
 * @override
 * @package
 * @param
 * @private
 * @property
 * @protected
 * @public
 * @readonly
 * @requires
 * @returns
 * @see
 * @since
 * @static
 * @summary
 * @this
 * @throws
 * @todo
 * @tutorial
 * @type
 * @typedef
 * @variation
 * @version
 * @yields
 */
function quux (foo) {}

/** 
 * @modifies
 * @abstract
 * @access
 * @alias
 * @async
 * @augments
 * @author
 * @borrows
 * @callback
 * @class
 * @classdesc
 * @constant
 * @constructs
 * @copyright
 * @default
 * @deprecated
 * @description
 * @enum
 * @event
 * @example
 * @exports
 * @external
 * @file
 * @fires
 * @function
 * @generator
 * @global
 * @hideconstructor
 * @ignore
 * @implements
 * @inheritdoc
 * @inner
 * @instance
 * @interface
 * @kind
 * @lends
 * @license
 * @listens
 * @member
 * @memberof
 * @memberof!
 * @mixes
 * @mixin
 * @module
 * @name
 * @namespace
 * @override
 * @package
 * @param
 * @private
 * @property
 * @protected
 * @public
 * @readonly
 * @requires
 * @returns
 * @see
 * @since
 * @static
 * @summary
 * @this
 * @throws
 * @todo
 * @tutorial
 * @type
 * @typedef
 * @variation
 * @version
 * @yields
 * @template
 */
function quux (foo) {}
// Settings: {"jsdoc":{"mode":"typescript"}}

/** 
 * @externs
 */
function quux (foo) {}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 *
 */
function quux (foo) {

}

/**
 * @todo
 */
function quux () {

}

/**
 * @extends Foo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"augments":{"message":"@extends is to be used over @augments.","replacement":"extends"}}}}

/**
 * Registers the `target` class as a transient dependency; each time the dependency is resolved a new instance will be created.
 *
 * @param target - The class / constructor function to register as transient.
 *
 * @example ```ts
@transient()
class Foo { }
```
 * @param Time for a new tag
 */
export function transient<T>(target?: T): T {
  // ...
}
````


<a name="eslint-plugin-jsdoc-rules-check-types"></a>
### <code>check-types</code>

Reports invalid types.

By default, ensures that the casing of native types is the same as in this list:

```
undefined
null
boolean
number
bigint
string
symbol
object
Array
Function
Date
RegExp
```

<a name="eslint-plugin-jsdoc-rules-check-types-options-4"></a>
#### Options

`check-types` allows one option:

- An option object:
  - with the key `noDefaults` to insist that only the supplied option type
    map is to be used, and that the default preferences (such as "string"
    over "String") will not be enforced. The option's default is `false`.
  - with the key `unifyParentAndChildTypeChecks` which will treat
    `settings.jsdoc.preferredTypes` keys such as `SomeType` as matching
    not only child types such as an unadorned `SomeType` but also
    `SomeType<aChildType>`, `SomeType.<aChildType>`, or if `SomeType` is
    `Array` (or `[]`), it will match `aChildType[]`. If this is `false` or
    unset, the former format will only apply to types which are not parent
    types/unions whereas the latter formats will only apply for parent
    types/unions. The special types `[]`, `.<>` (or `.`), and `<>`
    act only as parent types (and will not match a bare child type such as
    `Array` even when unified, though, as mentioned, `Array` will match
    say `string[]` or `Array.<string>` when unified). The special type
    `*` is only a child type. Note that there is no detection of parent
    and child type together, e.g., you cannot specify preferences for
    `string[]` specifically as distinct from say `number[]`, but you can
    target both with `[]` or the child types `number` or `string`.

See also the documentation on `settings.jsdoc.preferredTypes` which impacts
the behavior of `check-types`.

<a name="eslint-plugin-jsdoc-rules-check-types-why-not-capital-case-everything"></a>
#### Why not capital case everything?

Why are `boolean`, `number` and `string` exempt from starting with a capital letter? Let's take `string` as an example. In Javascript, everything is an object. The string Object has prototypes for string functions such as `.toUpperCase()`.

Fortunately we don't have to write `new String()` everywhere in our code. Javascript will automatically wrap string primitives into string Objects when we're applying a string function to a string primitive. This way the memory footprint is a tiny little bit smaller, and the [GC](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)) has less work to do.

So in a sense, there two types of strings in Javascript; `{string}` literals, also called primitives and `{String}` Objects. We use the primitives because it's easier to write and uses less memory. `{String}` and `{string}` are technically both valid, but they are not the same.

```js
new String('lard') // String {0: "l", 1: "a", 2: "r", 3: "d", length: 4}
'lard' // "lard"
new String('lard') === 'lard' // false
```

To make things more confusing, there are also object literals and object Objects. But object literals are still static Objects and object Objects are instantiated Objects. So an object primitive is still an object Object.

However, `Object.create(null)` objects are not `instanceof Object`, however, so
in the case of this Object we lower-case to indicate possible support for
these objects.

Basically, for primitives, we want to define the type as a primitive, because that's what we use in 99.9% of cases. For everything else, we use the type rather than the primitive. Otherwise it would all just be `{object}`.

In short: It's not about consistency, rather about the 99.9% use case. (And some
functions might not even support the objects if they are checking for identity.)

type name | `typeof` | check-types | testcase
--|--|--|--
**Array** | object | **Array** | `([]) instanceof Array` -> `true`
**Function** | function | **function** | `(function f () {}) instanceof Function` -> `true`
**Date** | object | **Date** | `(new Date()) instanceof Date` -> `true`
**RegExp** | object | **RegExp** | `(new RegExp(/.+/)) instanceof RegExp` -> `true`
Object | **object** | **object** | `({}) instanceof Object` -> `true` but `Object.create(null) instanceof Object` -> `false`
Boolean | **boolean** | **boolean** | `(true) instanceof Boolean` -> **`false`**
Number | **number** | **number** | `(41) instanceof Number` -> **`false`**
String | **string** | **string** | `("test") instanceof String` -> **`false`**

|||
|---|---|
|Context|everywhere|
|Tags|`augments`, `class`, `constant`, `enum`, `implements`, `member`, `module`, `namespace`, `param`, `property`, `returns`, `throws`, `type`, `typedef`, `yields`|
|Aliases|`constructor`, `const`, `extends`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|`package`, `private`, `protected`, `public`, `static`|
|Options|`noDefaults`, `unifyParentAndChildTypeChecks`|
|Settings|`preferredTypes`, `mode`|

The following patterns are considered problems:

````js
/**
 * @param {abc} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"abc":100}}}
// Message: Invalid `settings.jsdoc.preferredTypes`. Values must be falsy, a string, or an object.

/**
 * @param {Number} foo
 */
function quux (foo) {

}
// Message: Invalid JSDoc @param "foo" type "Number"; prefer: "number".

/**
 * @arg {Number} foo
 */
function quux (foo) {

}
// Message: Invalid JSDoc @arg "foo" type "Number"; prefer: "number".

/**
 * @returns {Number} foo
 * @throws {Number} foo
 */
function quux () {

}
// Message: Invalid JSDoc @returns type "Number"; prefer: "number".

/**
 * @param {(Number|string|Boolean)=} foo
 */
function quux (foo, bar, baz) {

}
// Message: Invalid JSDoc @param "foo" type "Number"; prefer: "number".

/**
 * @param {Array.<Number|String>} foo
 */
function quux (foo, bar, baz) {

}
// Message: Invalid JSDoc @param "foo" type "Number"; prefer: "number".

/**
 * @param {(Number|String)[]} foo
 */
function quux (foo, bar, baz) {

}
// Message: Invalid JSDoc @param "foo" type "Number"; prefer: "number".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":"Abc","string":"Str"}}}
// Message: Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":{"replacement":"Abc"},"string":"Str"}}}
// Message: Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":{"message":"Messed up JSDoc @{{tagName}}{{tagValue}} type \"abc\"; prefer: \"Abc\".","replacement":"Abc"},"string":"Str"}}}
// Message: Messed up JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {abc} foo
 * @param {cde} bar
 * @param {object} baz
 */
function qux(foo, bar, baz) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":{"message":"Messed up JSDoc @{{tagName}}{{tagValue}} type \"abc\"; prefer: \"Abc\".","replacement":"Abc"},"cde":{"message":"More messed up JSDoc @{{tagName}}{{tagValue}} type \"cde\"; prefer: \"Cde\".","replacement":"Cde"},"object":"Object"}}}
// Message: Messed up JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":{"message":"Messed up JSDoc @{{tagName}}{{tagValue}} type \"abc\".","replacement":false},"string":"Str"}}}
// Message: Messed up JSDoc @param "foo" type "abc".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":{"message":"Messed up JSDoc @{{tagName}}{{tagValue}} type \"abc\"."},"string":"Str"}}}
// Message: Messed up JSDoc @param "foo" type "abc".

/**
 * @param {abc} foo
 * @param {Number} bar
 */
function qux(foo, bar) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":"Abc","string":"Str"}}}
// Options: [{"noDefaults":true}]
// Message: Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {abc} foo
 * @param {Number} bar
 */
function qux(foo, bar) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":"Abc","string":"Str"}}}
// Message: Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":false,"string":"Str"}}}
// Message: Invalid JSDoc @param "foo" type "abc".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":false}}}
// Message: Invalid JSDoc @param "foo" type "abc".

/**
 * @param {*} baz
 */
function qux(baz) {
}
// Settings: {"jsdoc":{"preferredTypes":{"*":false,"abc":"Abc","string":"Str"}}}
// Message: Invalid JSDoc @param "baz" type "*".

/**
 * @param {*} baz
 */
function qux(baz) {
}
// Settings: {"jsdoc":{"preferredTypes":{"*":"aaa","abc":"Abc","string":"Str"}}}
// Message: Invalid JSDoc @param "baz" type "*"; prefer: "aaa".

/**
 * @param {abc} foo
 * @param {Number} bar
 */
function qux(foo, bar) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":"Abc","string":"Str"}}}
// Message: Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {Array} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"GenericArray"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".

/**
 * @param {Array} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"GenericArray","Array.<>":"GenericArray"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".

/**
 * @param {Array.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.<>":"GenericArray"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".

/**
 * @param {Array<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array<>":"GenericArray"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".

/**
 * @param {string[]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"SpecialTypeArray"}}}
// Message: Invalid JSDoc @param "foo" type "[]"; prefer: "SpecialTypeArray".

/**
 * @param {string[]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"SpecialTypeArray"}}}
// Options: [{"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "[]"; prefer: "SpecialTypeArray".

/**
 * @param {string[]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"SpecialTypeArray"}}}
// Options: [{"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "SpecialTypeArray".

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject","object.<>":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject","object<>":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object.<>":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object<>":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object.<string, number>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object.<>":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object<string, number>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object<>":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}
// Options: [{"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}
// Options: [{"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}
// Options: [{"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":false}}}
// Options: [{"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "object".

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":false}}}
// Message: Invalid JSDoc @param "foo" type "object".

/**
 * @param {object.<string, number>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}
// Options: [{"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object<string, number>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}
// Options: [{"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 *
 * @param {string[][]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"Array."}}}
// Message: Invalid JSDoc @param "foo" type "[]"; prefer: "Array.".

/**
 *
 * @param {string[][]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"Array.<>"}}}
// Message: Invalid JSDoc @param "foo" type "[]"; prefer: "Array.<>".

/**
 *
 * @param {string[][]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"Array<>"}}}
// Message: Invalid JSDoc @param "foo" type "[]"; prefer: "Array<>".

/**
 *
 * @param {object.<string, object.<string, string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object.":"Object"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "Object".

/**
 *
 * @param {object.<string, object.<string, string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object.":"Object<>"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "Object<>".

/**
 *
 * @param {object<string, object<string, string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object<>":"Object."}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "Object.".

/**
 *
 * @param {Array.<Array.<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.":"[]"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "[]".

/**
 *
 * @param {Array.<Array.<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.":"Array<>"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "Array<>".

/**
 *
 * @param {Array.<Array.<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.":"<>"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "<>".

/**
 *
 * @param {Array.<MyArray.<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.":"<>"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "<>".

/**
 *
 * @param {Array.<MyArray.<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"MyArray.":"<>"}}}
// Message: Invalid JSDoc @param "foo" type "MyArray"; prefer: "<>".

/**
 *
 * @param {Array<Array<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"<>":"Array."}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "Array.".

/**
 *
 * @param {Array<Array<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"Array."}}}
// Options: [{"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "Array.".

/**
 *
 * @param {Array<Array<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"<>":"[]"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "[]".

/** @typedef {String} foo */
// Message: Invalid JSDoc @typedef "foo" type "String"; prefer: "string".
````

The following patterns are not considered problems:

````js
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

/**
 * @param {(number|string|boolean)=} foo
 */
function quux (foo, bar, baz) {

}

/**
 * @param {typeof bar} foo
 */
function qux(foo) {
}

/**
 * @param {import('./foo').bar.baz} foo
 */
function qux(foo) {
}

/**
 * @param {(x: number, y: string) => string} foo
 */
function qux(foo) {
}

/**
 * @param {() => string} foo
 */
function qux(foo) {
}

/**
 * @returns {Number} foo
 * @throws {Number} foo
 */
function quux () {

}
// Options: [{"noDefaults":true}]

/**
 * @param {Object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"Object"}}}

/**
 * @param {Array} foo
 */
function quux (foo) {

}

/**
 * @param {Array.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"GenericArray"}}}

/**
 * @param {Array<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"GenericArray"}}}

/**
 * @param {string[]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"SpecialTypeArray","Array.<>":"SpecialTypeArray","Array<>":"SpecialTypeArray"}}}

/**
 * @param {string[]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.<>":"SpecialTypeArray","Array<>":"SpecialTypeArray"}}}
// Options: [{"unifyParentAndChildTypeChecks":true}]

/**
 * @param {Array} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"SpecialTypeArray"}}}

/**
 * @param {Array} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"SpecialTypeArray"}}}
// Options: [{"unifyParentAndChildTypeChecks":true}]

/**
 * @param {Array} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.<>":"GenericArray"}}}

/**
 * @param {Array} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array<>":"GenericArray"}}}

/**
 * @param {object} foo
 */
function quux (foo) {

}

/**
 * @param {object.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}

/**
 * @param {object<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}

/**
 * @param {object.<string, number>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}

/**
 * @param {object<string, number>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object.<>":"GenericObject"}}}

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object<>":"GenericObject"}}}

/**
 * @param {Number<} Ignore the error as not a validating rule
 */
function quux (foo) {

}

/** @param {function(...)} callback The function to invoke. */
var subscribe = function(callback) {};
````


<a name="eslint-plugin-jsdoc-rules-implements-on-classes"></a>
### <code>implements-on-classes</code>

Reports an issue with any non-constructor function using `@implements`.

Constructor functions, whether marked with `@class`, `@constructs`, or being
an ES6 class constructor, will not be flagged.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`implements` (prevented)|

The following patterns are considered problems:

````js
/**
 * @implements {SomeClass}
 */
function quux () {

}
// Message: @implements used on a non-constructor function

/**
 * @implements {SomeClass}
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"implements":false}}}
// Message: Unexpected tag `@implements`
````

The following patterns are not considered problems:

````js
/**
 * @implements {SomeClass}
 * @class
 */
function quux () {

}

/**
 * @implements {SomeClass}
 * @constructor
 */
function quux () {

}

/**
 *
 */
class quux {
  /**
   * @implements {SomeClass}
   */
  constructor () {

  }
}

/**
 *
 */
const quux = class {
  /**
   * @implements {SomeClass}
   */
  constructor () {

  }
}

/**
 *
 */
function quux () {

}

/**
 *
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"implements":false}}}
````


<a name="eslint-plugin-jsdoc-rules-match-description"></a>
### <code>match-description</code>

Enforces a regular expression pattern on descriptions.

The default is this basic expression to match English sentences (Support
for Unicode upper case may be added in a future version when it can be handled
by our supported Node versions):

``^([A-Z]|[`\\d_])[\\s\\S]*[.?!`]$``

Applies to the jsdoc block description and `@description` (or `@desc`)
by default but the `tags` option (see below) may be used to match other tags.

<a name="eslint-plugin-jsdoc-rules-match-description-options-5"></a>
#### Options

<a name="eslint-plugin-jsdoc-rules-match-description-options-5-matchdescription"></a>
##### <code>matchDescription</code>

You can supply your own expression to override the default, passing a
`matchDescription` string on the options object.

```js
{
  'jsdoc/match-description': ['error', {matchDescription: '[A-Z].*\\.'}]
}
```

As with the default, the supplied regular expression will be applied with the
Unicode (`"u"`) flag and is *not* case-insensitive.

<a name="eslint-plugin-jsdoc-rules-match-description-options-5-tags"></a>
##### <code>tags</code>

If you want different regular expressions to apply to tags, you may use
the `tags` option object:

```js
{
  'jsdoc/match-description': ['error', {tags: {
    param: '\\- [A-Z].*\\.',
    returns: '[A-Z].*\\.'
  }}]
}
```

In place of a string, you can also add `true` to indicate that a particular
tag should be linted with the `matchDescription` value (or the default).

```js
{
  'jsdoc/match-description': ['error', {tags: {
    param: true,
    returns: true
  }}]
}
```

The tags `@param`/`@arg`/`@argument` and `@property`/`@prop` will be properly
parsed to ensure that the matched "description" text includes only the text
after the name.

All other tags will treat the text following the tag name, a space, and
an optional curly-bracketed type expression (and another space) as part of
its "description" (e.g., for `@returns {someType} some description`, the
description is `some description` while for `@some-tag xyz`, the description
is `xyz`).

<a name="eslint-plugin-jsdoc-rules-match-description-options-5-maindescription"></a>
##### <code>mainDescription</code>

If you wish to override the main function description without changing the
default `match-description`, you may use `mainDescription`:

```js
{
  'jsdoc/match-description': ['error', {
    mainDescription: '[A-Z].*\\.',
    tags: {
      param: true,
      returns: true
    }
  }]
}
```

There is no need to add `mainDescription: true`, as by default, the main
function (and only the main function) is linted, though you may disable checking
it by setting it to `false`.

<a name="eslint-plugin-jsdoc-rules-match-description-options-5-contexts"></a>
##### <code>contexts</code>

Set this to an array of strings representing the AST context
where you wish the rule to be applied (e.g., `ClassDeclaration` for ES6 classes).
Overrides the default contexts (see below).

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|docblock and `@description` by default but more with `tags`|
|Aliases|`@desc`|
|Settings||
|Options|`contexts`, `tags` (accepts tags with names and optional type such as 'param', 'arg', 'argument', 'property', and 'prop', and accepts arbitrary list of other tags with an optional type (but without names), e.g., 'returns', 'return'), `mainDescription`, `matchDescription`|

The following patterns are considered problems:

````js
/**
 * foo.
 */
const q = class {

}
// Options: [{"contexts":["ClassExpression"]}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * foo.
 */
const q = {

};
// Options: [{"contexts":["ObjectExpression"]}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * foo.
 */
function quux () {

}
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo)
 */
function quux () {

}
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * тест.
 */
function quux () {

}
// Options: [{"matchDescription":"[А-Я][А-я]+\\."}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Abc.
 */
function quux () {

}
// Options: [{"mainDescription":"[А-Я][А-я]+\\.","tags":{"param":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo
 */
function quux () {

}
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @param foo foo.
 */
function quux (foo) {

}
// Options: [{"tags":{"param":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @prop foo foo.
 */
function quux (foo) {

}
// Options: [{"tags":{"prop":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @summary foo.
 */
function quux () {

}
// Options: [{"tags":{"summary":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @author
 */
function quux () {

}
// Options: [{"tags":{"author":".+"}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @x-tag
 */
function quux () {

}
// Options: [{"tags":{"x-tag":".+"}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @description foo foo.
 */
function quux (foo) {

}
// Options: [{"tags":{"description":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo
 *
 * @param foo foo.
 */
function quux (foo) {

}
// Options: [{"mainDescription":"^[a-zA-Z]*$","tags":{"param":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo
 *
 * @param foo foo.
 */
function quux (foo) {

}
// Options: [{"mainDescription":false,"tags":{"param":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @param foo bar
 */
function quux (foo) {

}
// Options: [{"tags":{"param":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * {@see Foo.bar} buz
 */
function quux (foo) {

}
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @returns {number} foo
 */
function quux (foo) {

}
// Options: [{"tags":{"returns":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo.
 *
 * @returns foo.
 */
function quux (foo) {

}
// Options: [{"tags":{"returns":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * lorem ipsum dolor sit amet, consectetur adipiscing elit. pellentesque elit diam,
 * iaculis eu dignissim sed, ultrices sed nisi. nulla at ligula auctor, consectetur neque sed,
 * tincidunt nibh. vivamus sit amet vulputate ligula. vivamus interdum elementum nisl,
 * vitae rutrum tortor semper ut. morbi porta ante vitae dictum fermentum.
 * proin ut nulla at quam convallis gravida in id elit. sed dolor mauris, blandit quis ante at,
 * consequat auctor magna. duis pharetra purus in porttitor mollis.
 */
function longDescription (foo) {

}
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * @arg {number} foo - Foo
 */
function quux (foo) {

}
// Options: [{"tags":{"arg":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * @argument {number} foo - Foo
 */
function quux (foo) {

}
// Options: [{"tags":{"argument":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * @return {number} foo
 */
function quux (foo) {

}
// Options: [{"tags":{"return":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Returns bar.
 *
 * @return {number} bar
 */
function quux (foo) {

}
// Options: [{"tags":{"return":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * @param notRet
 * @returns Тест.
 */
function quux () {

}
// Options: [{"tags":{"param":"[А-Я][А-я]+\\."}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * @description notRet
 * @returns Тест.
 */
function quux () {

}
// Options: [{"tags":{"description":"[А-Я][А-я]+\\."}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * foo.
 */
class quux {

}
// Options: [{"contexts":["ClassDeclaration"]}]
// Message: JSDoc description does not satisfy the regex pattern.

class MyClass {
  /**
   * Abc
   */
  myClassField = 1
}
// Options: [{"contexts":["ClassProperty"]}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * foo.
 */
interface quux {

}
// Options: [{"contexts":["TSInterfaceDeclaration"]}]
// Message: JSDoc description does not satisfy the regex pattern.

const myObject = {
  /**
   * Bad description
   */
  myProp: true
};
// Options: [{"contexts":["Property"]}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * @param foo Foo bar
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
// Options: [{"tags":{"param":true}}]
// Message: JSDoc description does not satisfy the regex pattern.

/**
 * Foo bar
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
// Message: JSDoc description does not satisfy the regex pattern.
````

The following patterns are not considered problems:

````js
/**
 * @param foo - Foo.
 */
function quux () {

}
// Options: [{"tags":{"param":true}}]

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
 * Тест.
 */
function quux () {

}
// Options: [{"matchDescription":"[А-Я][А-я]+\\."}]

/**
 * @param notRet
 * @returns Тест.
 */
function quux () {

}
// Options: [{"tags":{"returns":"[А-Я][А-я]+\\."}}]

/**
 * @param notRet
 * @description Тест.
 */
function quux () {

}
// Options: [{"tags":{"description":"[А-Я][А-я]+\\."}}]

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
// Options: [{"tags":{"returns":true}}]

/**
 * @returns {type1} Foo bar.
 */
function quux () {

}
// Options: [{"tags":{"returns":true}}]

/**
 * @description Foo bar.
 */
function quux () {

}
// Options: [{"tags":{"description":true}}]

/**
 * Foo. {@see Math.sin}.
 */
function quux () {

}

/**
 * Foo {@see Math.sin} bar.
 */
function quux () {

}

/**
 * Foo?
 *
 * Bar!
 *
 * Baz:
 *   1. Foo.
 *   2. Bar.
 */
function quux () {

}

/**
 * Hello:
 * World.
 */
function quux () {

}

/**
 * Hello: world.
 */
function quux () {

}

/**
 * Foo
 * Bar.
 */
function quux () {

}

/**
 * Foo.
 *
 * foo.
 */
function quux () {

}

/**
 * foo.
 */
function quux () {

}
// Options: [{"mainDescription":false}]

/**
 * foo.
 */
class quux {

}

/**
 * foo.
 */
class quux {

}
// Options: [{"mainDescription":true}]

class MyClass {
  /**
   * Abc.
   */
  myClassField = 1
}
// Options: [{"contexts":["ClassProperty"]}]

/**
 * Foo.
 */
interface quux {

}
// Options: [{"contexts":["TSInterfaceDeclaration"]}]

const myObject = {
  /**
   * Bad description
   */
  myProp: true
};
// Options: [{"contexts":[]}]

/**
 * foo.
 */
const q = class {

}
// Options: [{"contexts":[]}]

/**
 * foo.
 */
const q = {

};
// Options: [{"contexts":[]}]

/**
 * @description foo.
 */
function quux () {

}
// Options: [{"tags":{"param":true}}]

/**
 * Foo.
 *
 * @summary Foo.
 */
function quux () {

}
// Options: [{"tags":{"summary":true}}]

/**
 * Foo.
 *
 * @author Somebody
 */
function quux () {

}
// Options: [{"tags":{"author":".+"}}]

/**
 * Foo.
 *
 * @x-tag something
 */
function quux () {

}
// Options: [{"tags":{"x-tag":".+"}}]

/**
 * Foo.
 *
 * @prop foo Foo.
 */
function quux (foo) {

}
// Options: [{"tags":{"prop":true}}]

/**
 * @param foo Foo bar.
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}

/**
 *
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
````


<a name="eslint-plugin-jsdoc-rules-newline-after-description"></a>
### <code>newline-after-description</code>

Enforces a consistent padding of the block description.

<a name="eslint-plugin-jsdoc-rules-newline-after-description-options-6"></a>
#### Options

This rule allows one optional string argument. If it is `"always"` then a problem is raised when there is no newline after the description. If it is `"never"` then a problem is raised when there is a newline after the description. The default value is `"always"`.

|||
|---|---|
|Context|everywhere|
|Options|(a string matching `"always"|"never"`)|
|Tags|N/A (doc block)|

The following patterns are considered problems:

````js
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
 * Foo.
 *
 * Foo.
 * @foo
 */
function quux () {

}
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

/**
 * A.
 *
 * @typedef {Object} A
 * @prop {boolean} a A.
 */
// Options: ["never"]
// Message: There must be no newline after the description of the JSDoc block.

/**
 * A.
 * @typedef {Object} A
 * @prop {boolean} a A.
 */
// Options: ["always"]
// Message: There must be a newline after the description of the JSDoc block.
````

The following patterns are not considered problems:

````js
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
````


<a name="eslint-plugin-jsdoc-rules-no-types"></a>
### <code>no-types</code>

This rule reports types being used on `@param` or `@returns`.

The rule is intended to prevent the indication of types on tags where
the type information would be redundant with TypeScript.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`param`, `returns`|
|Aliases|`arg`, `argument`, `return`|

The following patterns are considered problems:

````js
/**
 * @param {number} foo
 */
function quux (foo) {

}
// Message: Types are not permitted on @param.

/**
 * @returns {number}
 */
function quux () {

}
// Message: Types are not permitted on @returns.
````

The following patterns are not considered problems:

````js
/**
 * @param foo
 */
function quux (foo) {

}
````


<a name="eslint-plugin-jsdoc-rules-no-undefined-types"></a>
### <code>no-undefined-types</code>

Checks that types in jsdoc comments are defined. This can be used to check
unimported types.

When enabling this rule, types in jsdoc comments will resolve as used
variables, i.e. will not be marked as unused by `no-unused-vars`.

In addition to considering globals found in code (or in ESLint-indicated
`globals`) as defined, the following tags will also be checked for
name(path) definitions to also serve as a potential "type" for checking
the tag types in the table below:

`@callback`, `@class` (or `@constructor`), `@constant` (or `@const`), `@event`, `@external` (or `@host`), `@function` (or `@func` or `@method`), `@interface`, `@member` (or `@var`), `@mixin`, `@name`, `@namespace`, `@template` (for "closure" or "typescript" `settings.jsdoc.mode` only), `@typedef`.

The following tags will also be checked but only when the mode is `closure`:

`@package`, `@private`, `@protected`, `@public`, `@static`

The following types are always considered defined.

- `null`, `undefined`, `void`, `string`, `boolean`, `object`, `function`
- `number`, `NaN`, `Infinity`
- `any`, `*`
- `Array`, `Object`, `RegExp`, `Date`, `Function`

Note that preferred types indicated within `settings.jsdoc.preferredTypes` will
also be assumed to be defined.

<a name="eslint-plugin-jsdoc-rules-no-undefined-types-options-7"></a>
#### Options

An option object may have the following key:

- `definedTypes` - This array can be populated to indicate other types which
  are automatically considered as defined (in addition to globals, etc.).
  Defaults to an empty array.

|||
|---|---|
|Context|everywhere|
|Tags|`augments`, `class`, `constant`, `enum`, `implements`, `member`, `module`, `namespace`, `param`, `property`, `returns`, `throws`, `type`, `typedef`, `yields`|
|Aliases|`constructor`, `const`, `extends`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|`package`, `private`, `protected`, `public`, `static`|
|Options|`definedTypes`|
|Settings|`preferredTypes`, `mode`|

The following patterns are considered problems:

````js
/**
 * @param {HerType} baz - Foo.
 */
function quux(foo, bar, baz) {

}
// Settings: {"jsdoc":{"preferredTypes":{"HerType":1000}}}
// Message: Invalid `settings.jsdoc.preferredTypes`. Values must be falsy, a string, or an object.

/**
 * @param {HerType} baz - Foo.
 */
function quux(foo, bar, baz) {

}
// Settings: {"jsdoc":{"preferredTypes":{"HerType":false}}}
// Message: The type 'HerType' is undefined.

/**
 * @param {strnig} foo - Bar.
 */
function quux(foo) {

}
// Message: The type 'strnig' is undefined.

/**
 * @param {MyType} foo - Bar.
 * @param {HisType} bar - Foo.
 */
function quux(foo, bar) {

}
// Options: [{"definedTypes":["MyType"]}]
// Message: The type 'HisType' is undefined.

/**
 * @param {MyType} foo - Bar.
 * @param {HisType} bar - Foo.
 * @param {HerType} baz - Foo.
 */
function quux(foo, bar, baz) {

}
// Settings: {"jsdoc":{"preferredTypes":{"hertype":{"replacement":"HerType"}}}}
// Options: [{"definedTypes":["MyType"]}]
// Message: The type 'HisType' is undefined.

 /**
  * @param {MyType} foo - Bar.
  * @param {HisType} bar - Foo.
  * @param {HerType} baz - Foo.
  */
function quux(foo, bar, baz) {

}
// Settings: {"jsdoc":{"preferredTypes":{"hertype":{"replacement":false},"histype":"HisType"}}}
// Options: [{"definedTypes":["MyType"]}]
// Message: The type 'HerType' is undefined.

/**
 * @template TEMPLATE_TYPE
 * @param {WRONG_TEMPLATE_TYPE} bar
 */
function foo (bar) {
};
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: The type 'WRONG_TEMPLATE_TYPE' is undefined.

class Foo {
  /**
   * @return {TEMPLATE_TYPE}
   */
  bar () {
  }
}
// Message: The type 'TEMPLATE_TYPE' is undefined.

class Foo {
  /**
   * @return {TEMPLATE_TYPE}
   */
  invalidTemplateReference () {
  }
}

/**
 * @template TEMPLATE_TYPE
 */
class Bar {
  /**
   * @return {TEMPLATE_TYPE}
   */
  validTemplateReference () {
  }
}
// Settings: {"jsdoc":{"mode":"typescript"}}
// Message: The type 'TEMPLATE_TYPE' is undefined.

/**
 * @type {strnig}
 */
var quux = {

};
// Message: The type 'strnig' is undefined.

/**
 * @template TEMPLATE_TYPE_A, TEMPLATE_TYPE_B
 */
class Foo {
  /**
   * @param {TEMPLATE_TYPE_A} baz
   * @return {TEMPLATE_TYPE_B}
   */
  bar (baz) {
  }
}
// Message: The type 'TEMPLATE_TYPE_A' is undefined.

/**
 * @param {...VAR_TYPE} varargs
 */
function quux (varargs) {
}
// Message: The type 'VAR_TYPE' is undefined.
````

The following patterns are not considered problems:

````js
/**
 * @param {string} foo - Bar.
 */
function quux(foo) {

}

/**
 * @param {Promise} foo - Bar.
 */
function quux(foo) {

}

class MyClass {}

/**
 * @param {MyClass} foo - Bar.
 */
function quux(foo) {
  console.log(foo);
}

quux(0);

const MyType = require('my-library').MyType;

/**
 * @param {MyType} foo - Bar.
 */
  function quux(foo) {

}

const MyType = require('my-library').MyType;

/**
 * @param {MyType} foo - Bar.
 */
  function quux(foo) {

}

import {MyType} from 'my-library';

/**
 * @param {MyType} foo - Bar.
 * @param {Object<string, number>} foo
 * @param {Array<string>} baz
 */
  function quux(foo, bar, baz) {

}

/*globals MyType*/

/**
 * @param {MyType} foo - Bar.
 * @param {HisType} bar - Foo.
 */
  function quux(foo, bar) {

}

/**
 * @typedef {Object} hello
 * @property {string} a - a.
 */

/**
 * @param {hello} foo
 */
function quux(foo) {

}

/**
 * @param {Array<syntaxError} foo
 */
function quux(foo) {

}

/**
 * Callback test.
 *
 * @callback addStuffCallback
 * @param {String} sum - An test integer.
 */
/**
 * Test Eslint.
 *
 * @param {addStuffCallback} callback - A callback to run.
 */
function testFunction(callback) {
  callback();
}

/**
 *
 *
 */
function foo () {

}

/**
 *
 *
 */
function foo () {

}

/**
 * @param {MyType} foo - Bar.
 * @param {HisType} bar - Foo.
 */
function quux(foo, bar) {

}
// Options: [{"definedTypes":["MyType","HisType"]}]

/**
 * @param {MyType} foo - Bar.
 * @param {HisType} bar - Foo.
 * @param {HerType} baz - Foo.
 */
function quux(foo, bar, baz) {

}
// Settings: {"jsdoc":{"preferredTypes":{"hertype":{"replacement":"HerType"},"histype":"HisType"}}}
// Options: [{"definedTypes":["MyType"]}]

/**
 * @param {MyType} foo - Bar.
 * @param {HisType} bar - Foo.
 * @param {HerType} baz - Foo.
 */
function quux(foo, bar, baz) {

}
// Settings: {"jsdoc":{"preferredTypes":{"hertype":{"replacement":"HerType<>"},"histype":"HisType.<>"}}}
// Options: [{"definedTypes":["MyType"]}]

/**
 * @template TEMPLATE_TYPE
 * @param {TEMPLATE_TYPE} bar
 * @return {TEMPLATE_TYPE}
 */
function foo (bar) {
};
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @template TEMPLATE_TYPE
 */
class Foo {
  /**
   * @return {TEMPLATE_TYPE}
   */
  bar () {
  }
}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @template TEMPLATE_TYPE_A, TEMPLATE_TYPE_B
 */
class Foo {
  /**
   * @param {TEMPLATE_TYPE_A} baz
   * @return {TEMPLATE_TYPE_B}
   */
  bar (baz) {
  }
}
// Settings: {"jsdoc":{"mode":"closure"}}

/****/

/**
 *
 */
function quux () {

}

/**
 * Run callback when hooked method is called.
 *
 * @template {BaseObject} T
 * @param {T} obj - object whose method should be hooked.
 * @param {string} method - method which should be hooked.
 * @param {(sender: T) => void} callback - callback which should
 * be called when the hooked method was invoked.
 */
function registerEvent(obj, method, callback) {

}
// Settings: {"jsdoc":{"mode":"typescript"}}

 /**
 * @param {...} varargs
 */
function quux (varargs) {
}

/**
 * @param {...number} varargs
 */
function quux (varargs) {
}
````


<a name="eslint-plugin-jsdoc-rules-require-description-complete-sentence"></a>
### <code>require-description-complete-sentence</code>

Requires that block description, explicit `@description`, and `@param`/`@returns`
tag descriptions are written in complete sentences, i.e.,

* Description must start with an uppercase alphabetical character.
* Paragraphs must start with an uppercase alphabetical character.
* Sentences must end with a period.
* Every line in a paragraph (except the first) which starts with an uppercase
  character must be preceded by a line ending with a period.
* A colon or semi-colon followed by two line breaks is still part of the
  containing paragraph (unlike normal dual line breaks).

<a name="eslint-plugin-jsdoc-rules-require-description-complete-sentence-options-8"></a>
#### Options

<a name="eslint-plugin-jsdoc-rules-require-description-complete-sentence-options-8-tags-1"></a>
##### <code>tags</code>

If you want additional tags to be checked for their descriptions, you may
add them within this option.

```js
{
  'jsdoc/require-description-complete-sentence': ['error', {tags: ['see', 'copyright']}]
}
```

The tags `@param`/`@arg`/`@argument` and `@property`/`@prop` will be properly
parsed to ensure that the checked "description" text includes only the text
after the name.

All other tags will treat the text following the tag name, a space, and
an optional curly-bracketed type expression (and another space) as part of
its "description" (e.g., for `@returns {someType} some description`, the
description is `some description` while for `@some-tag xyz`, the description
is `xyz`).

|||
|---|---|
|Context|everywhere|
|Tags|doc block, `param`, `returns`, `description`, `property`, `summary`, `file`, `classdesc`, `todo`, `deprecated`, `throws`, 'yields' and others added by `tags`|
|Aliases|`arg`, `argument`, `return`, `desc`, `prop`, `fileoverview`, `overview`, `exception`, `yield`|
|Options|`tags`|
The following patterns are considered problems:

````js
/**
 * foo.
 */
function quux () {

}
// Message: Sentence should start with an uppercase character.

/**
 * foo?
 */
function quux () {

}
// Message: Sentence should start with an uppercase character.

/**
 * @description foo.
 */
function quux () {

}
// Message: Sentence should start with an uppercase character.

/**
 * Foo)
 */
function quux () {

}
// Message: Sentence must end with a period.

/**
 * `foo` is a variable
 */
function quux () {

}
// Message: Sentence must end with a period.

/**
 * Foo.
 *
 * foo.
 */
function quux () {

}
// Message: Sentence should start with an uppercase character.

/**
 * тест.
 */
function quux () {

}
// Message: Sentence should start with an uppercase character.

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
// Message: Sentence should start with an uppercase character.

/**
 * Foo.
 *
 * @param foo bar
 */
function quux (foo) {

}
// Message: Sentence should start with an uppercase character.

/**
 * {@see Foo.bar} buz
 */
function quux (foo) {

}
// Message: Sentence should start with an uppercase character.

/**
 * Foo.
 *
 * @returns {number} foo
 */
function quux (foo) {

}
// Message: Sentence should start with an uppercase character.

/**
 * Foo.
 *
 * @returns foo.
 */
function quux (foo) {

}
// Message: Sentence should start with an uppercase character.

/**
 * lorem ipsum dolor sit amet, consectetur adipiscing elit. pellentesque elit diam,
 * iaculis eu dignissim sed, ultrices sed nisi. nulla at ligula auctor, consectetur neque sed,
 * tincidunt nibh. vivamus sit amet vulputate ligula. vivamus interdum elementum nisl,
 * vitae rutrum tortor semper ut. morbi porta ante vitae dictum fermentum.
 * proin ut nulla at quam convallis gravida in id elit. sed dolor mauris, blandit quis ante at,
 * consequat auctor magna. duis pharetra purus in porttitor mollis.
 */
function longDescription (foo) {

}
// Message: Sentence should start with an uppercase character.

/**
 * @arg {number} foo - Foo
 */
function quux (foo) {

}
// Message: Sentence must end with a period.

/**
 * @argument {number} foo - Foo
 */
function quux (foo) {

}
// Message: Sentence must end with a period.

/**
 * @return {number} foo
 */
function quux (foo) {

}
// Message: Sentence should start with an uppercase character.

/**
 * Returns bar.
 *
 * @return {number} bar
 */
function quux (foo) {

}
// Message: Sentence should start with an uppercase character.

/**
 * @throws {Object} Hello World
 * hello world
*/
// Message: Sentence must end with a period.

/**
 * @summary Foo
 */
function quux () {

}
// Message: Sentence must end with a period.

/**
 * @throws {SomeType} Foo
 */
function quux () {

}
// Message: Sentence must end with a period.

/**
 * @see Foo
 */
function quux () {

}
// Options: [{"tags":["see"]}]
// Message: Sentence must end with a period.

/**
 * @param foo Foo bar
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
// Options: [{"tags":["param"]}]
// Message: Sentence must end with a period.
````

The following patterns are not considered problems:

````js
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
 * Тест.
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

/**
 * Foo. {@see Math.sin}.
 */
function quux () {

}

/**
 * Foo {@see Math.sin} bar.
 */
function quux () {

}

/**
 * Foo?
 *
 * Bar!
 *
 * Baz:
 *   1. Foo.
 *   2. Bar.
 */
function quux () {

}

/**
 * Hello:
 * World.
 */
function quux () {

}

/**
 * Hello: world.
 */
function quux () {

}

/**
 *
 */
function quux () {

}

/**
 * @description Foo.
 */
function quux () {

}

/**
 * `foo` is a variable.
 */
function quux () {

}

/**
 * Foo.
 *
 * `foo`.
 */
function quux () {

}

/**
 * @param foo - `bar`.
 */
function quux () {

}

/**
 * @returns {number} `foo`.
 */
function quux () {

}

/**
 * Foo
 * `bar`.
 */
function quux () {

}

/**
 * @example Foo
 */
function quux () {

}

/**
 * @see Foo
 */
function quux () {

}

/**
 * Foo.
 *
 * @param foo Foo.
 */
function quux (foo) {

}

/**
 * Foo.
 *
 * @param foo Foo.
 */
function quux (foo) {

}
// Options: [{"tags":["param"]}]

/**
 * @param foo Foo bar.
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
// Options: [{"tags":["param"]}]

/**
 *
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}

/**
* We stop loading Items when we have loaded:
*
* 1) The main Item;
* 2) All its variants.
*/

/**
 * This method is working on 2 steps.
 *
 * | Step | Comment     |
 * |------|-------------|
 * |   1  | do it       |
 * |   2  | do it again |
 */
````


<a name="eslint-plugin-jsdoc-rules-require-description"></a>
### <code>require-description</code>

Requires that all functions have a description.

* All functions must have an implicit description or have the option
  `descriptionStyle` set to `tag`.
* Every jsdoc block description (or description tag if `descriptionStyle` is
  `"tag"`) must have a non-empty description that explains the purpose of the
  method.

<a name="eslint-plugin-jsdoc-rules-require-description-options-9"></a>
#### Options

An options object may have any of the following properties:

- `contexts` - Set to an array of strings representing the AST context
  where you wish the rule to be applied (e.g., `ClassDeclaration` for ES6
  classes). Overrides the default contexts (see below).
- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the
    document block avoids the need for a `@description`. Defaults to an
    empty array.
- `descriptionStyle` - Whether to accept implicit descriptions (`"body"`) or
    `@description` tags (`"tag"`) as satisfying the rule. Set to `"any"` to
    accept either style. Defaults to `"body"`.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`description` or jsdoc block|
|Aliases|`desc`|
|Options|`contexts`, `exemptedBy`, `descriptionStyle`|
|Settings|`overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

The following patterns are considered problems:

````js
/**
 *
 */
function quux () {

}
// Options: [{"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 *
 */
function quux () {

}
// Options: [{"descriptionStyle":"any"}]
// Message: Missing JSDoc block description or @description declaration.

/**
 *
 */
function quux () {

}
// Options: [{"descriptionStyle":"body"}]
// Message: Missing JSDoc block description.

/**
 *
 */
class quux {

}
// Options: [{"contexts":["ClassDeclaration"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 *
 */
class quux {

}
// Options: [{"contexts":["ClassDeclaration"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 *
 */
class quux {

}
// Options: [{"contexts":["ClassDeclaration"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 * @description
 */
function quux () {

}
// Options: [{"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description description.

/**
 *
 */
interface quux {

}
// Options: [{"contexts":["TSInterfaceDeclaration"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 *
 */
var quux = class {

};
// Options: [{"contexts":["ClassExpression"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 *
 */
var quux = {

};
// Options: [{"contexts":["ObjectExpression"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 * @someDesc
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":{"message":"Please avoid `{{tagName}}`; use `{{replacement}}` instead","replacement":"someDesc"}}}}
// Options: [{"descriptionStyle":"tag"}]
// Message: Missing JSDoc @someDesc description.

/**
 * @description
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
// Options: [{"descriptionStyle":"tag"}]
// Message: Unexpected tag `@description`

/**
 * @description
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
// Options: [{"descriptionStyle":"any"}]
// Message: Missing JSDoc block description or @description declaration.

/**
 *
 */
function quux () {
}
// Options: [{"exemptedBy":["notPresent"]}]
// Message: Missing JSDoc block description.
````

The following patterns are not considered problems:

````js
/**
 * @description
 * // arbitrary description content
 */
function quux () {

}
// Options: [{"descriptionStyle":"tag"}]

/**
 * @description
 * quux(); // does something useful
 */
function quux () {

}
// Options: [{"descriptionStyle":"tag"}]

/**
 * @description <caption>Valid usage</caption>
 * quux(); // does something useful
 *
 * @description <caption>Invalid usage</caption>
 * quux('random unwanted arg'); // results in an error
 */
function quux () {

}
// Options: [{"descriptionStyle":"tag"}]

/**
 *
 */
class quux {

}
// Options: [{"descriptionStyle":"tag"}]

/**
 *
 */
function quux () {

}
// Options: [{"contexts":["ClassDeclaration"]}]

/**
 * @type {MyCallback}
 */
function quux () {

}
// Options: [{"exemptedBy":["type"]}]

/**
 *
 */
interface quux {

}
// Options: [{"descriptionStyle":"tag"}]

/**
 *
 */
var quux = class {

};
// Options: [{"descriptionStyle":"tag"}]

/**
 *
 */
var quux = {

};
// Options: [{"descriptionStyle":"tag"}]

/**
 * Has an implicit description
 */
function quux () {

}
// Options: [{"descriptionStyle":"body"}]

/**
 * Has an implicit description
 */
function quux () {

}

/**
 * Has an implicit description
 */
function quux () {

}
// Options: [{"descriptionStyle":"any"}]

/**
 * @description Has an explicit description
 */
function quux () {

}
// Options: [{"descriptionStyle":"any"}]

/**
 *
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
````


<a name="eslint-plugin-jsdoc-rules-require-example"></a>
### <code>require-example</code>

Requires that all functions have examples.

* All functions must have one or more `@example` tags.
* Every example tag must have a non-empty description that explains the method's usage.

<a name="eslint-plugin-jsdoc-rules-require-example-options-10"></a>
#### Options

This rule has an object option.

<a name="eslint-plugin-jsdoc-rules-require-example-options-10-exemptedby"></a>
##### <code>exemptedBy</code>

Array of tags (e.g., `['type']`) whose presence on the document
block avoids the need for an `@example`. Defaults to an empty array.

<a name="eslint-plugin-jsdoc-rules-require-example-options-10-avoidexampleonconstructors"></a>
##### <code>avoidExampleOnConstructors</code>

Set to `true` to avoid the need for an example on a constructor (whether
indicated as such by a jsdoc tag or by being within an ES6 `class`).
Defaults to `false`.

<a name="eslint-plugin-jsdoc-rules-require-example-options-10-contexts-1"></a>
##### <code>contexts</code>

Set this to an array of strings representing the AST context
where you wish the rule to be applied (e.g., `ClassDeclaration` for ES6 classes).
Overrides the default contexts (see below).

<a name="eslint-plugin-jsdoc-rules-require-example-fixer"></a>
#### Fixer

The fixer for `require-example` will add an empty `@example`, but it will still
report a missing example description after this is added.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`example`|
|Options|`exemptedBy`, `avoidExampleOnConstructors`, `contexts`|
|Settings|`overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

The following patterns are considered problems:

````js
/**
 *
 */
function quux () {

}
// Message: Missing JSDoc @example declaration.

/**
 * @example
 */
function quux () {

}
// Message: Missing JSDoc @example description.

/**
 * @constructor
 */
function f () {

}
// Settings: {"jsdoc":{"avoidExampleOnConstructors":true}}
// Message: `settings.jsdoc.avoidExampleOnConstructors` has been removed, use options in the rule `require-example` instead.

/**
 * @constructor
 */
function quux () {

}
// Message: Missing JSDoc @example declaration.

/**
 * @constructor
 * @example
 */
function quux () {

}
// Message: Missing JSDoc @example description.

/**
 *
 */
class quux {

}
// Options: [{"contexts":["ClassDeclaration"]}]
// Message: Missing JSDoc @example declaration.

/**
 *
 */
function quux () {
}
// Options: [{"exemptedBy":["notPresent"]}]
// Message: Missing JSDoc @example declaration.
````

The following patterns are not considered problems:

````js
/**
 * @example
 * // arbitrary example content
 */
function quux () {

}

/**
 * @example
 * quux(); // does something useful
 */
function quux () {

}

/**
 * @example <caption>Valid usage</caption>
 * quux(); // does something useful
 *
 * @example <caption>Invalid usage</caption>
 * quux('random unwanted arg'); // results in an error
 */
function quux () {

}

/**
 * @constructor
 */
function quux () {

}
// Options: [{"avoidExampleOnConstructors":true}]

/**
 * @constructor
 * @example
 */
function quux () {

}
// Options: [{"avoidExampleOnConstructors":true}]

class Foo {
  /**
   *
   */
  constructor () {

  }
}
// Options: [{"avoidExampleOnConstructors":true}]

/**
 * @inheritdoc
 */
function quux () {

}

/**
 * @type {MyCallback}
 */
function quux () {

}
// Options: [{"exemptedBy":["type"]}]

/**
 * @example Some example code
 */
class quux {

}
// Options: [{"contexts":["ClassDeclaration"]}]

/**
 *
 */
function quux () {

}
// Options: [{"contexts":["ClassDeclaration"]}]
````


<a name="eslint-plugin-jsdoc-rules-require-hyphen-before-param-description"></a>
### <code>require-hyphen-before-param-description</code>

Requires a hyphen before the `@param` description.

<a name="eslint-plugin-jsdoc-rules-require-hyphen-before-param-description-options-11"></a>
#### Options

This rule takes one optional string argument. If it is `"always"` then a problem is raised when there is no hyphen before the description. If it is `"never"` then a problem is raised when there is a hyphen before the description. The default value is `"always"`.

|||
|---|---|
|Context|everywhere|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Options|(a string matching `"always"|"never"`)|

The following patterns are considered problems:

````js
/**
 * @param foo Foo.
 */
function quux () {

}
// Options: ["always"]
// Message: There must be a hyphen before @param description.

/**
 * @param foo Foo.
 */
function quux () {

}
// Message: There must be a hyphen before @param description.

/**
 * @param foo - Foo.
 */
function quux () {

}
// Options: ["never"]
// Message: There must be no hyphen before @param description.

/**
 * @param foo - foo
 * @param foo foo
 */
function quux () {

}
// Options: ["always"]
// Message: There must be a hyphen before @param description.

/**
 * @param foo foo
 * bar
 * @param bar - bar
 */
function quux () {

}
// Options: ["always"]
// Message: There must be a hyphen before @param description.

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`
````

The following patterns are not considered problems:

````js
/**
 * @param foo - Foo.
 */
function quux () {

}
// Options: ["always"]

/**
 * @param foo Foo.
 */
function quux () {

}
// Options: ["never"]

/**
 * @param foo
 */
function quux () {

}
````


<a name="eslint-plugin-jsdoc-rules-require-jsdoc"></a>
### <code>require-jsdoc</code>

Checks for presence of jsdoc comments, on class declarations as well as
functions.

<a name="eslint-plugin-jsdoc-rules-require-jsdoc-options-12"></a>
#### Options

Accepts one optional options object with the following optional keys.

- `publicOnly` - This option will insist that missing jsdoc blocks are
  only reported for function bodies / class declarations that are exported
  from the module. May be a boolean or object. If set to `true`, the defaults
  below will be used. If unset, jsdoc block reporting will not be limited to
  exports.

  This object supports the following optional boolean keys (`false` unless
  otherwise noted):

  - `ancestorsOnly` - Only check node ancestors to check if node is exported
  - `esm` - ESM exports are checked for JSDoc comments (Defaults to `true`)
  - `cjs` - CommonJS exports are checked for JSDoc comments  (Defaults to `true`)
  - `window` - Window global exports are checked for JSDoc comments

- `require` - An object with the following optional boolean keys which all
    default to `false` except as noted, indicating the contexts where the rule
    will apply:

  - `ArrowFunctionExpression`
  - `ClassDeclaration`
  - `ClassExpression`
  - `FunctionDeclaration` (defaults to `true`)
  - `FunctionExpression`
  - `MethodDefinition`

- `contexts` - Set this to an array of strings representing the additional
  AST contexts where you wish the rule to be applied (e.g., `Property` for
  properties). Defaults to an empty array.

- `exemptEmptyFunctions` (default: false) - When `true`, the rule will not report
  missing jsdoc blocks above functions/methods with no parameters or return values
  (intended where variable names are sufficient for themselves as documentation).

|||
|---|---|
|Context|`ArrowFunctionExpression`, `ClassDeclaration`, `ClassExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|N/A|
|Options|`publicOnly`, `require`, `contexts`, `exemptEmptyFunctions`|

The following patterns are considered problems:

````js
/**
 * @func myFunction
 */
function myFunction() {

}
// Settings: {"jsdoc":{"maxLines":3,"minLines":2}}
// Message: Missing JSDoc comment.

/**
 * @func myFunction
 */


function myFunction() {

}
// Settings: {"jsdoc":{"maxLines":2}}
// Message: Missing JSDoc comment.

/** @func myFunction */ function myFunction() {

}
// Settings: {"jsdoc":{"minLines":1}}
// Message: Missing JSDoc comment.

export var test = function () {

};
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

function test () {

}
export var test2 = test;
// Options: [{"publicOnly":true,"require":{"FunctionDeclaration":true}}]
// Message: Missing JSDoc comment.

export const test = () => {

};
// Options: [{"publicOnly":true,"require":{"ArrowFunctionExpression":true}}]
// Message: Missing JSDoc comment.

export let test = class {

};
// Options: [{"publicOnly":true,"require":{"ClassExpression":true}}]
// Message: Missing JSDoc comment.

export default function () {}
// Options: [{"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"FunctionDeclaration":true}}]
// Message: Missing JSDoc comment.

export default () => {}
// Options: [{"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"ArrowFunctionExpression":true}}]
// Message: Missing JSDoc comment.

export default (function () {})
// Options: [{"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export default class {}
// Options: [{"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"ClassDeclaration":true}}]
// Message: Missing JSDoc comment.

function quux (foo) {

}
// Message: Missing JSDoc comment.


// Settings: {"jsdoc":{"exemptEmptyFunctions":true}}
// Message: `settings.jsdoc.exemptEmptyFunctions` has been removed, use options in the rule `require-jsdoc` instead.

function quux (foo) {

}
// Options: [{"exemptEmptyFunctions":true}]
// Message: Missing JSDoc comment.

function quux (foo) {

}
// Settings: {"jsdoc":{"minLines":2}}
// Options: [{"exemptEmptyFunctions":true}]
// Message: Missing JSDoc comment.

function myFunction() {}
// Message: Missing JSDoc comment.

/**
 * Description for A.
 */
class A {
   constructor(xs) {
        this.a = xs;
   }
}
// Options: [{"require":{"ClassDeclaration":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

class A {
    /**
     * Description for constructor.
     * @param {object[]} xs - xs
     */
    constructor(xs) {
        this.a = xs;
    }
}
// Options: [{"require":{"ClassDeclaration":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

class A extends B {
    /**
     * Description for constructor.
     * @param {object[]} xs - xs
     */
    constructor(xs) {
        this.a = xs;
    }
}
// Options: [{"require":{"ClassDeclaration":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

export class A extends B {
    /**
     * Description for constructor.
     * @param {object[]} xs - xs
     */
    constructor(xs) {
        this.a = xs;
    }
}
// Options: [{"require":{"ClassDeclaration":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

export default class A extends B {
    /**
     * Description for constructor.
     * @param {object[]} xs - xs
     */
    constructor(xs) {
        this.a = xs;
    }
}
// Options: [{"require":{"ClassDeclaration":true,"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

var myFunction = () => {}
// Options: [{"require":{"ArrowFunctionExpression":true}}]
// Message: Missing JSDoc comment.

var myFunction = () => () => {}
// Options: [{"require":{"ArrowFunctionExpression":true}}]
// Message: Missing JSDoc comment.

var foo = function() {}
// Options: [{"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

const foo = {bar() {}}
// Options: [{"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

var foo = {bar: function() {}}
// Options: [{"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

function foo (abc) {}
// Options: [{"exemptEmptyFunctions":false}]
// Message: Missing JSDoc comment.

function foo () {
  return true;
}
// Options: [{"exemptEmptyFunctions":false}]
// Message: Missing JSDoc comment.

module.exports = function quux () {

}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

module.exports = function quux () {

}
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

module.exports = {
  method: function() {

  }
}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

module.exports = {
  test: {
    test2: function() {

    }
  }
}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

module.exports = {
  test: {
    test2: function() {

    }
  }
}
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

const test = module.exports = function () {

}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

/**
*
*/
const test = module.exports = function () {

}

test.prototype.method = function() {}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

const test = function () {

}
module.exports = {
  test: test
}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

const test = () => {

}
module.exports = {
  test: test
}
// Options: [{"publicOnly":true,"require":{"ArrowFunctionExpression":true}}]
// Message: Missing JSDoc comment.

class Test {
    method() {

    }
}
module.exports = Test;
// Options: [{"publicOnly":true,"require":{"MethodDefinition":true}}]
// Message: Missing JSDoc comment.

export default function quux () {

}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export default function quux () {

}
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

function quux () {

}
export default quux;
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export function test() {

}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export function test() {

}
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

var test = function () {

}
var test2 = 2;
export { test, test2 }
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

var test = function () {

}
export { test as test2 }
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export default class A {

}
// Options: [{"publicOnly":true,"require":{"ClassDeclaration":true}}]
// Message: Missing JSDoc comment.

export default class A {

}
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"ClassDeclaration":true}}]
// Message: Missing JSDoc comment.

var test = function () {

}
// Options: [{"publicOnly":{"window":true},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

window.test = function () {

}
// Options: [{"publicOnly":{"window":true},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

function test () {

}
// Options: [{"publicOnly":{"window":true}}]
// Message: Missing JSDoc comment.

module.exports = function() {

}
// Options: [{"publicOnly":{"cjs":true,"esm":false,"window":false},"require":{"FunctionExpression":true}}]
// Message: Missing JSDoc comment.

export function someMethod() {

}
// Options: [{"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"FunctionDeclaration":true}}]
// Message: Missing JSDoc comment.

export function someMethod() {

}
// Options: [{"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"FunctionDeclaration":true}}]
// Message: Missing JSDoc comment.

const myObject = {
  myProp: true
};
// Options: [{"contexts":["Property"]}]
// Message: Missing JSDoc comment.
````

The following patterns are not considered problems:

````js
var array = [1,2,3];
array.forEach(function() {});

/**
 * @class MyClass
 **/
function MyClass() {}

/**
 Function doing something
 */
function myFunction() {}
/**
 Function doing something
 */
var myFunction = function() {};
/**
 Function doing something
 */
Object.myFunction = function () {};
var obj = {
   /**
    *  Function doing something
    **/
    myFunction: function () {} };

/**
 @func myFunction
 */
function myFunction() {}
/**
 @method myFunction
 */
function myFunction() {}
/**
 @function myFunction
 */
function myFunction() {}

/**
 @func myFunction
 */
var myFunction = function () {}
/**
 @method myFunction
 */
var myFunction = function () {}
/**
 @function myFunction
 */
var myFunction = function () {}

/**
 @func myFunction
 */
Object.myFunction = function() {}
/**
 @method myFunction
 */
Object.myFunction = function() {}
/**
 @function myFunction
 */
Object.myFunction = function() {}
(function(){})();

var object = {
  /**
   *  @func myFunction - Some function
   */
  myFunction: function() {} }
var object = {
  /**
   *  @method myFunction - Some function
   */
  myFunction: function() {} }
var object = {
  /**
   *  @function myFunction - Some function
   */
  myFunction: function() {} }

var array = [1,2,3];
array.filter(function() {});
Object.keys(this.options.rules || {}).forEach(function(name) {}.bind(this));
var object = { name: 'key'};
Object.keys(object).forEach(function() {})

/**
 * @func myFunction
 */

function myFunction() {

}
// Settings: {"jsdoc":{"maxLines":2,"minLines":0}}

/**
 * @func myFunction
 */


function myFunction() {

}
// Settings: {"jsdoc":{"maxLines":3,"minLines":0}}

/** @func myFunction */  function myFunction() {

}
// Settings: {"jsdoc":{"maxLines":0,"minLines":0}}

/**
 * @func myFunction
 */

function myFunction() {

}
// Settings: {"jsdoc":{"maxLines":3,"minLines":2}}

function myFunction() {}
// Options: [{"require":{"ClassDeclaration":true,"FunctionDeclaration":false,"MethodDefinition":true}}]

var myFunction = function() {}
// Options: [{"require":{"ClassDeclaration":true,"FunctionDeclaration":false,"MethodDefinition":true}}]

/**
 * Description for A.
 */
class A {
    /**
     * Description for constructor.
     * @param {object[]} xs - xs
     */
    constructor(xs) {
        this.a = xs;
    }
}
// Options: [{"require":{"ClassDeclaration":true,"MethodDefinition":true}}]

/**
 * Description for A.
 */
class App extends Component {
    /**
     * Description for constructor.
     * @param {object[]} xs - xs
     */
    constructor(xs) {
        this.a = xs;
    }
}
// Options: [{"require":{"ClassDeclaration":true,"MethodDefinition":true}}]

/**
 * Description for A.
 */
export default class App extends Component {
    /**
     * Description for constructor.
     * @param {object[]} xs - xs
     */
    constructor(xs) {
        this.a = xs;
    }
}
// Options: [{"require":{"ClassDeclaration":true,"MethodDefinition":true}}]

/**
 * Description for A.
 */
export class App extends Component {
    /**
     * Description for constructor.
     * @param {object[]} xs - xs
     */
    constructor(xs) {
        this.a = xs;
    }
}
// Options: [{"require":{"ClassDeclaration":true,"MethodDefinition":true}}]

class A {
    constructor(xs) {
        this.a = xs;
    }
}
// Options: [{"require":{"ClassDeclaration":false,"MethodDefinition":false}}]

/**
* Function doing something
*/
var myFunction = () => {}
// Options: [{"require":{"ArrowFunctionExpression":true}}]

/**
* Function doing something
*/
var myFunction = function () {}
// Options: [{"require":{"ArrowFunctionExpression":true}}]

/**
* Function doing something
*/
var myFunction = () => {}
// Options: [{"require":{"ArrowFunctionExpression":false}}]

/**
 Function doing something
*/
var myFunction = () => () => {}
// Options: [{"require":{"ArrowFunctionExpression":true}}]

setTimeout(() => {}, 10);
// Options: [{"require":{"ArrowFunctionExpression":true}}]

/**
JSDoc Block
*/
var foo = function() {}
// Options: [{"require":{"FunctionExpression":true}}]

const foo = {/**
JSDoc Block
*/
bar() {}}
// Options: [{"require":{"FunctionExpression":true}}]

var foo = {/**
JSDoc Block
*/
bar: function() {}}
// Options: [{"require":{"FunctionExpression":true}}]

var foo = { [function() {}]: 1 };
// Options: [{"require":{"FunctionExpression":true}}]

function foo () {}
// Options: [{"exemptEmptyFunctions":true}]

function foo () {
  return;
}
// Options: [{"exemptEmptyFunctions":true}]

const test = {};
/**
 * test
 */
 test.method = function () {

}
module.exports = {
  prop: { prop2: test.method }
}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
function test() {

}

module.exports = {
  prop: { prop2: test }
}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
test = function() {

}

module.exports = {
  prop: { prop2: test }
}
// Options: [{"publicOnly":{"cjs":true,"esm":false,"window":false},"require":{"FunctionExpression":true}}]

/**
 *
 */
test = function() {

}

exports.someMethod = {
  prop: { prop2: test }
}
// Options: [{"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"FunctionExpression":true}}]

/**
 *
 */
const test = () => {

}

module.exports = {
prop: { prop2: test }
}
// Options: [{"publicOnly":true,"require":{"ArrowFunctionExpression":true}}]

const test = () => {

}
module.exports = {
  prop: { prop2: test }
}
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"ArrowFunctionExpression":true}}]

/**
 *
 */
window.test = function() {

}

module.exports = {
prop: window
}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

test = function() {

}

/**
 *
 */
test = function() {

}

module.exports = {
prop: { prop2: test }
}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

test = function() {

}

test = 2;

module.exports = {
prop: { prop2: test }
}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
function test() {

}

/**
 *
 */
test.prototype.method = function() {

}

module.exports = {
prop: { prop2: test }
}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

class Test {
  /**
   * Test
   */
  method() {

  }
}
module.exports = Test;
// Options: [{"publicOnly":true,"require":{"MethodDefinition":true}}]

/**
 *
 */
export default function quux () {

}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
export default function quux () {

}
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]

/**
 *
 */
function quux () {

}
export default quux;
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

function quux () {

}
export default quux;
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]

/**
 *
 */
export function test() {

}
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
export function test() {

}
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"FunctionExpression":true}}]

/**
 *
 */
var test = function () {

}
var test2 = 2;
export { test, test2 }
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
var test = function () {

}
export { test as test2 }
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 *
 */
export default class A {

}
// Options: [{"publicOnly":{"ancestorsOnly":true},"require":{"ClassDeclaration":true}}]

/**
 *
 */
var test = function () {

}
// Options: [{"publicOnly":{"window":true},"require":{"FunctionExpression":true}}]

let test = function () {

}
// Options: [{"publicOnly":{"window":true},"require":{"FunctionExpression":true}}]

let test = class {

}
// Options: [{"publicOnly":true,"require":{"ClassExpression":false}}]

/**
 *
 */
let test = class {

}
// Options: [{"publicOnly":true,"require":{"ClassExpression":true}}]

export function someMethod() {

}
// Options: [{"publicOnly":{"cjs":true,"esm":false,"window":false},"require":{"FunctionDeclaration":true}}]

export function someMethod() {

}
// Options: [{"publicOnly":{"cjs":true,"esm":false,"window":false},"require":{"FunctionDeclaration":true}}]

exports.someMethod = function() {

}
// Options: [{"publicOnly":{"cjs":false,"esm":true,"window":false},"require":{"FunctionExpression":true}}]

const myObject = {
  myProp: true
};
// Options: [{"contexts":[]}]

function bear() {}
/**
 *
 */
function quux () {
}
export default quux;
// Options: [{"publicOnly":true,"require":{"FunctionExpression":true}}]

/**
 * This example interface is great!
 */
export interface Example {
  /**
   * My super test string!
   */
  test: string
}
// Options: [{"contexts":["TSInterfaceDeclaration"]}]

/**
 * This example interface is great!
 */
interface Example {
  /**
   * My super test string!
   */
  test: string
}
// Options: [{"contexts":["TSInterfaceDeclaration"]}]

/**
 * This example type is great!
 */
export type Example = {
  /**
   * My super test string!
   */
  test: string
};
// Options: [{"contexts":["TSTypeAliasDeclaration"]}]

/**
 * This example type is great!
 */
type Example = {
  /**
   * My super test string!
   */
  test: string
};
// Options: [{"contexts":["TSTypeAliasDeclaration"]}]

/**
 * This example enum is great!
 */
export enum Example {
  /**
   * My super test enum!
   */
  test = 123
}
// Options: [{"contexts":["TSEnumDeclaration"]}]

/**
 * This example enum is great!
 */
enum Example {
  /**
   * My super test enum!
   */
  test = 123
}
// Options: [{"contexts":["TSEnumDeclaration"]}]

const foo = {...{}};
function bar() {}
// Options: [{"exemptEmptyFunctions":false,"publicOnly":true,"require":{"ArrowFunctionExpression":true,"ClassDeclaration":true,"ClassExpression":true,"FunctionDeclaration":true,"FunctionExpression":false,"MethodDefinition":true}}]
````


<a name="eslint-plugin-jsdoc-rules-require-param-description"></a>
### <code>require-param-description</code>

Requires that `@param` tag has `description` value.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`param`|
|Aliases|`arg`, `argument`|

The following patterns are considered problems:

````js
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
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}
// Message: Missing JSDoc @arg "foo" description.

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`
````

The following patterns are not considered problems:

````js
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
````


<a name="eslint-plugin-jsdoc-rules-require-param-name"></a>
### <code>require-param-name</code>

Requires that all function parameters have name.

> The `@param` tag requires you to specify the name of the parameter you are documenting. You can also include the parameter's type, enclosed in curly brackets, and a description of the parameter.
>
> [JSDoc](https://jsdoc.app/tags-param.html#overview)

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`param`|
|Aliases|`arg`, `argument`|

The following patterns are considered problems:

````js
/**
 * @param
 */
function quux (foo) {

}
// Message: There must be an identifier after @param type.

/**
 * @param {string}
 */
function quux (foo) {

}
// Message: There must be an identifier after @param tag.

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`
````

The following patterns are not considered problems:

````js
/**
 * @param foo
 */
function quux (foo) {

}

/**
 * @param {string} foo
 */
function quux (foo) {

}
````


<a name="eslint-plugin-jsdoc-rules-require-param-type"></a>
### <code>require-param-type</code>

Requires that `@param` tag has `type` value.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`param`|
|Aliases|`arg`, `argument`|

The following patterns are considered problems:

````js
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
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}
// Message: Missing JSDoc @arg "foo" type.

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`
````

The following patterns are not considered problems:

````js
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
````


<a name="eslint-plugin-jsdoc-rules-require-param"></a>
### <code>require-param</code>

Requires that all function parameters are documented.

<a name="eslint-plugin-jsdoc-rules-require-param-options-13"></a>
#### Options

An options object accepts one optional property:

- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the document
    block avoids the need for a `@param`. Defaults to an empty array.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Options|`exemptedBy`|
|Settings|`overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

The following patterns are considered problems:

````js
/**
 *
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 *
 */
function quux (foo, bar) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @param foo
 */
function quux (foo, bar) {

}
// Message: Missing JSDoc @param "bar" declaration.

/**
 * @param bar
 */
function quux (foo, bar, baz) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @param foo
 * @param bar
 */
function quux (foo, bar, baz) {

}
// Message: Missing JSDoc @param "baz" declaration.

/**
 * @param baz
 */
function quux (foo, bar, baz) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @param
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}
// Message: Missing JSDoc @arg "foo" declaration.

/**
 * @param foo
 */
function quux (foo, bar) {

}
// Message: Missing JSDoc @param "bar" declaration.

/**
 * @override
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"overrideReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @implements
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"implementsReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @augments
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @extends
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @override
 */
class A {
  /**
    *
    */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"overrideReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @implements
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"implementsReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @augments
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @extends
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Message: Missing JSDoc @param "foo" declaration.

export class SomeClass {
  /**
   * @param property
   */
  constructor(private property: string, private foo: number) {}
}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @param
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`

/**
 *
 */
function quux ({bar, baz}, foo) {
}
// Message: Missing JSDoc @param "foo" declaration.

/**
 *
 */
function quux (foo, {bar, baz}) {
}
// Message: Missing JSDoc @param "foo" declaration.

/**
 *
 */
function quux ([bar, baz], foo) {
}
// Message: Missing JSDoc @param "foo" declaration.

/**
 *
 */
function quux (foo) {
}
// Options: [{"exemptedBy":["notPresent"]}]
// Message: Missing JSDoc @param "foo" declaration.
````

The following patterns are not considered problems:

````js
/**
 * @param foo
 */
function quux (foo) {

}

/**
 * @inheritdoc
 */
function quux (foo) {

}

/**
 * @arg foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}

/**
 * @override
 * @param foo
 */
function quux (foo) {

}

/**
 * @override
 */
function quux (foo) {

}

/**
 * @override
 */
class A {
  /**
    *
    */
  quux (foo) {

  }
}

/**
 * @override
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"overrideReplacesDocs":true}}

/**
 * @implements
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}

/**
 * @implements
 */
function quux (foo) {

}

/**
 * @implements
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"implementsReplacesDocs":true}}

/**
 * @implements
 * @param foo
 */
function quux (foo) {

}

/**
 * @augments
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @augments
 * @param foo
 */
function quux (foo) {

}

/**
 * @extends
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @extends
 * @param foo
 */
function quux (foo) {

}

/**
 * @augments
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @extends
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @override
 */
class A {
  /**
  * @param foo
  */
  quux (foo) {

  }
}

/**
 * @override
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"overrideReplacesDocs":true}}

/**
 * @implements
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"implementsReplacesDocs":true}}

/**
 * @implements
 */
class A {
  /**
   * @param foo
   */
  quux (foo) {

  }
}

/**
 * @augments
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @augments
 */
class A {
  /**
   * @param foo
   */
  quux (foo) {

  }
}

/**
 * @extends
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @extends
 */
class A {
  /**
   * @param foo
   */
  quux (foo) {

  }
}

/**
 * @augments
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @extends
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @private
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignorePrivate":true}}

// issue 182: optional chaining
/** @const {boolean} test */
const test = something?.find(_ => _)

/** @type {RequestHandler} */
function foo(req, res, next) {}

/**
 * @type {MyCallback}
 */
function quux () {

}
// Options: [{"exemptedBy":["type"]}]

/**
 * @override
 */
var A = class {
  /**
    *
    */
  quux (foo) {

  }
}

export class SomeClass {
  /**
   * @param property
   */
  constructor(private property: string) {}
}

/**
 * Assign the project to an employee.
 *
 * @param {object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */
function assign({name, department}) {
  // ...
}
````


<a name="eslint-plugin-jsdoc-rules-require-returns-check"></a>
### <code>require-returns-check</code>

Requires a return statement in function body if a `@returns` tag is specified in jsdoc comment.

Will also report if multiple `@returns` tags are present.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`returns`|
|Aliases|`return`|

The following patterns are considered problems:

````js
/**
 * @returns
 */
function quux (foo) {

}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @return
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":"return"}}}
// Message: JSDoc @return declaration present but return expression not available in function.

/**
 * @returns
 */
const quux = () => {}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {undefined} Foo.
 * @returns {String} Foo.
 */
function quux () {

  return foo;
}
// Message: Found more than one @returns declaration.

const language = {
  /**
   * @param {string} name
   * @returns {string}
   */
  get name() {
    this._name = name;
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.

class Foo {
  /**
   * @returns {string}
   */
  bar () {
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":false}}}
// Message: Unexpected tag `@returns`

/**
 * @returns {string}
 */
function f () {
  function g() {
    return 'foo'
  }

  () => {
    return 5
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.
````

The following patterns are not considered problems:

````js
/**
 * @returns Foo.
 */
function quux () {

  return foo;
}

/**
 * @returns {string} Foo.
 */
function quux () {

  return foo;
}

/**
 * @returns {string} Foo.
 */
function quux () {

  return foo;
}

/**
 *
 */
function quux () {
}

/**
 * @returns {*} Foo.
 */
const quux = () => foo;

/**
 * @returns {undefined} Foo.
 */
function quux () {}

/**
 * @returns { void } Foo.
 */
function quux () {}

/**
 * @returns {Promise<void>}
 */
async function quux() {}

/**
 * @returns {Promise<void>}
 */
const quux = async function () {}

/**
 * @returns {Promise<void>}
 */
const quux = async () => {}

/**
 * @returns Foo.
 * @abstract
 */
function quux () {
  throw new Error('must be implemented by subclass!');
}

/**
 * @returns Foo.
 * @virtual
 */
function quux () {
  throw new Error('must be implemented by subclass!');
}

/**
 * @returns Foo.
 * @constructor
 */
function quux () {
}

/**
 * @interface
 */
class Foo {
  /**
   * @returns {string}
   */
  bar () {
  }
}

/**
 * @returns {undefined} Foo.
 */
function quux () {
}

/**
 * @returns {void} Foo.
 */
function quux () {
}

/**
 * @returns {void} Foo.
 */
function quux () {
  return undefined;
}

/**
 * @returns {void} Foo.
 */
function quux () {
  return;
}

/**
 *
 */
function quux () {
  return undefined;
}

/**
 *
 */
function quux () {
  return;
}

/**
 * @returns {true}
 */
function quux () {
  try {
    return true;
  } catch (err) {
  }
  return;
}

/**
 * @returns {true}
 */
function quux () {
  try {
  } finally {
    return true;
  }
  return;
}

/**
 * @returns {true}
 */
function quux () {
  try {
    return;
  } catch (err) {
  }
  return true;
}

/**
 * @returns {true}
 */
function quux () {
  try {
    something();
  } catch (err) {
    return true;
  }
  return;
}

/**
 * @returns {true}
 */
function quux () {
  switch (true) {
  case 'abc':
    return true;
  }
  return;
}

/**
 * @returns {true}
 */
function quux () {
  switch (true) {
  case 'abc':
    return;
  }
  return true;
}

/**
 * @returns {true}
 */
function quux () {
  for (const i of abc) {
    return true;
  }
  return;
}

/**
 * @returns {true}
 */
function quux () {
  for (const a in b) {
    return true;
  }
}

/**
 * @returns {true}
 */
function quux () {
  for (let i=0; i<n; i+=1) {
    return true;
  }
}

/**
 * @returns {true}
 */
function quux () {
  while(true) {
    return true
  }
}

/**
 * @returns {true}
 */
function quux () {
  do {
    return true
  }
  while(true)
}

/**
 * @returns {true}
 */
function quux () {
  if (true) {
    return;
  }
  return true;
}

/**
 * @returns {true}
 */
function quux () {
  if (true) {
    return true;
  }
}

/**
 * @returns {true}
 */
function quux () {
  var a = {};
  with (a) {
    return true;
  }
}

/**
 * @returns {true}
 */
function quux () {
  if (true) {
    return;
  } else {
    return true;
  }
  return;
}
````


<a name="eslint-plugin-jsdoc-rules-require-returns-description"></a>
### <code>require-returns-description</code>

Requires that `@returns` tag has `description` value.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`returns`|
|Aliases|`return`|

The following patterns are considered problems:

````js
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
// Settings: {"jsdoc":{"tagNamePreference":{"returns":"return"}}}
// Message: Missing JSDoc @return description.

/**
 * @returns
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":false}}}
// Message: Unexpected tag `@returns`
````

The following patterns are not considered problems:

````js
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

/**
 * @returns {undefined}
 */
function quux () {

}

/**
 * @returns {void}
 */
function quux () {

}
````


<a name="eslint-plugin-jsdoc-rules-require-returns-type"></a>
### <code>require-returns-type</code>

Requires that `@returns` tag has `type` value.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`returns`|
|Aliases|`return`|

The following patterns are considered problems:

````js
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
// Settings: {"jsdoc":{"tagNamePreference":{"returns":"return"}}}
// Message: Missing JSDoc @return type.

/**
 * @returns
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":false}}}
// Message: Unexpected tag `@returns`
````

The following patterns are not considered problems:

````js
/**
 * @returns {number}
 */
function quux () {

}
````


<a name="eslint-plugin-jsdoc-rules-require-returns"></a>
### <code>require-returns</code>

Requires returns are documented.

Will also report if multiple `@returns` tags are present.

<a name="eslint-plugin-jsdoc-rules-require-returns-options-14"></a>
#### Options

- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the document
    block avoids the need for a `@returns`. Defaults to an empty array.
- `forceRequireReturn` - Set to `true` to always insist on
  `@returns` documentation regardless of implicit or explicit `return`'s
  in the function. May be desired to flag that a project is aware of an
  `undefined`/`void` return. Defaults to `false`.
- `forceReturnsWithAsync` - By default `async` functions that do not explicitly return a value pass this rule. You can force all `async` functions to require return statements by setting `forceReturnsWithAsync` to `true` on the options object. This may be useful as an `async` function will always return a `Promise`, even if the `Promise` returns void. Defaults to `false`.

```js
'jsdoc/require-returns': ['error', {forceReturnsWithAsync: true}]
```

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`returns`|
|Aliases|`return`|
|Options|`exemptedBy`, `forceRequireReturn`, `forceReturnsWithAsync`|
|Settings|`overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

The following patterns are considered problems:

````js
/**
 *
 */
function quux (foo) {

  return foo;
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const foo = () => ({
  bar: 'baz'
})
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const foo = bar=>({ bar })
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const foo = bar => bar.baz()
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux (foo) {

  return foo;
}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":"return"}}}
// Message: Missing JSDoc @return declaration.

/**
 *
 */
function foo() {}

/**
 *
 */
function bar() {}
// Settings: {"jsdoc":{"forceRequireReturn":true}}
// Message: `settings.jsdoc.forceRequireReturn` has been removed, use options in the rule `require-returns` instead.

/**
 *
 */
async function quux() {
}
// Options: [{"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const quux = async function () {}
// Options: [{"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const quux = async () => {}
// Options: [{"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
async function quux () {}
// Options: [{"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
}
// Options: [{"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

const language = {
  /**
   * @param {string} name
   */
  get name() {
    return this._name;
  }
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
async function quux () {
}
// Options: [{"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @returns {undefined}
 * @returns {void}
 */
function quux (foo) {

  return foo;
}
// Message: Found more than one @returns declaration.

/**
 * @returns
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":false}}}
// Message: Unexpected tag `@returns`

/**
 * @param foo
 */
function quux (foo) {
  return 'bar';
}
// Options: [{"exemptedBy":["notPresent"]}]
// Message: Missing JSDoc @returns declaration.
````

The following patterns are not considered problems:

````js
/**
 * @returns Foo.
 */
function quux () {

  return foo;
}

/**
 *
 */
function quux () {
}

/**
 *
 */
function quux (bar) {
  bar.filter(baz => {
    return baz.corge();
  })
}

/**
 * @returns Array
 */
function quux (bar) {
  return bar.filter(baz => {
    return baz.corge();
  })
}

/**
 * @returns Array
 */
const quux = (bar) => bar.filter(({ corge }) => corge())

/**
 * @inheritdoc
 */
function quux (foo) {
}

/**
 * @override
 */
function quux (foo) {
}

/**
 * @constructor
 */
function quux (foo) {
}

/**
 * @implements
 */
function quux (foo) {
}

/**
 * @override
 */
function quux (foo) {

  return foo;
}

/**
 * @class
 */
function quux (foo) {

}

/**
 * @constructor
 */
function quux (foo) {

}

/**
 * @returns {Object}
 */
function quux () {

  return {a: foo};
}

/**
 * @returns {Object}
 */
const quux = () => ({a: foo});

/**
 * @returns {Object}
 */
const quux = () => {
  return {a: foo}
};

/**
 * @returns {void}
 */
function quux () {
}

/**
 * @returns {void}
 */
const quux = () => {

}

/**
 * @returns {undefined}
 */
function quux () {
}

/**
 * @returns {undefined}
 */
const quux = () => {

}

/**
 *
 */
function quux () {
}

/**
 *
 */
const quux = () => {

}

class Foo {
  /**
   *
   */
  constructor () {
  }
}
// Options: [{"forceRequireReturn":true}]

const language = {
  /**
   * @param {string} name
   */
  set name(name) {
    this._name = name;
  }
}

/**
 * @returns {void}
 */
function quux () {
}
// Options: [{"forceRequireReturn":true}]

/**
 * @returns {void}
 */
function quux () {
  return undefined;
}

/**
 * @returns {void}
 */
function quux () {
  return undefined;
}
// Options: [{"forceRequireReturn":true}]

/**
 * @returns {void}
 */
function quux () {
  return;
}

/**
 * @returns {void}
 */
function quux () {
}
// Options: [{"forceRequireReturn":true}]

/**
 * @returns {void}
 */
function quux () {
  return;
}
// Options: [{"forceRequireReturn":true}]

/** @type {RequestHandler} */
function quux (req, res , next) {
  return;
}

/**
 * @returns {Promise}
 */
async function quux () {
}
// Options: [{"forceRequireReturn":true}]

/**
 * @returns {Promise}
 */
async function quux () {
}
// Options: [{"forceReturnsWithAsync":true}]

/**
 *
 */
async function quux () {}

/**
 *
 */
const quux = async function () {}

/**
 *
 */
const quux = async () => {}

/** foo class */
class foo {
  /** foo constructor */
  constructor () {
    // =>
    this.bar = true;
  }
}

export default foo;

/**
 *
 */
function quux () {
}
// Options: [{"forceReturnsWithAsync":true}]

/**
 * @type {MyCallback}
 */
function quux () {

}
// Options: [{"exemptedBy":["type"]}]
````


<a name="eslint-plugin-jsdoc-rules-valid-types"></a>
### <code>valid-types</code>

Requires all types to be valid JSDoc or Closure compiler types without syntax errors.

Also impacts behaviors on namepath (or event)-defining and pointing tags:

1. Name(path)-defining tags requiring namepath: `@external`, `@host`, `@name`, `@typedef`
1. Name(path)-defining tags (which may have value without namepath or their
    namepath can be expressed elsewhere on the block): `@event`, `@callback`,
    `@class`, `@constructor`, `@constant`, `@const`,
    `@function`, `@func`, `@method`, `@interface`, `@member`, `@var`,
    `@mixin`, `@namespace`
1. Name(path)-pointing tags requiring namepath: `@alias`, `@augments`, `@extends`, `@lends`, `@memberof`, `@memberof!`, `@mixes`, `@this`
1. Name(path)-pointing tags (which may have value without namepath or their
    namepath can be expressed elsewhere on the block): `@listens`, `@fires`,
    `@emits`, and `@modifies`
1. Name(path)-pointing tags (multiple names in one): `@borrows`

...with the following applying to the above sets:

- Expect tags in set 1-4 to have a valid namepath if present
- Prevent sets 2 and 4 from being empty by setting `allowEmptyNamepaths` to
  `false` as these tags might have some indicative value without a path
  or may allow a name expressed elsewhere on the block (but sets 1 and 3 will
  always fail if empty)
- For the special case of set 5, i.e., `@borrows <that namepath> as <this namepath>`,
  check that both namepaths are present and valid and ensure there is an `as `
  between them. In the case of `<this namepath>`, it can be preceded by
  one of the name path operators, `#`, `.`, or `~`.
- For the special case of `@memberof` and `@memberof!` (part of set 3), as
   per the [specification](https://jsdoc.app/tags-memberof.html), they also
   allow `#`, `.`, or `~` at the end (which is not allowed at the end of
   normal paths).

<a name="eslint-plugin-jsdoc-rules-valid-types-options-15"></a>
#### Options

- `allowEmptyNamepaths` (default: true) - Set to `false` to disallow
  empty name paths with `@callback`, `@event`, `@class`, `@constructor`,
  `@constant`, `@const`, `@function`, `@func`, `@method`, `@interface`,
  `@member`, `@var`, `@mixin`, `@namespace`, `@listens`, `@fires`,
  `@modifies`, or `@emits` (these might often be expected to have an
  accompanying name path, though they have some indicative value without
  one; these may also allow names to be defined in another manner elsewhere
  in the block)
- `checkSeesForNamepaths` (default: false) - Set this to `true` to insist
  that `@see` only use name paths (the tag is normally permitted to
  allow other text)


|||
|---|---|
|Context|everywhere|
|Tags|For name only unless otherwise stated: `alias`, `augments`, `borrows`, `callback`, `class` (for name and type), `constant` (for name and type), `enum` (for type), `event`, `external`, `fires`, `function`, `implements` (for type), `interface`, `lends`, `listens`, `member` (for name and type),  `memberof`, `memberof!`, `mixes`, `mixin`, `modifies`, `module` (for name and type), `name`, `namespace` (for name and type), `param` (for name and type), `property` (for name and type), `returns` (for type), `this`, `throws` (for type), `type` (for type), `typedef` (for name and type), `yields` (for type)|
|Aliases|`extends`, `constructor`, `const`, `host`, `emits`, `func`, `method`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|For type only: `package`, `private`, `protected`, `public`, `static`|
|Options|`allowEmptyNamepaths`, `checkSeesForNamepaths`|
|Settings|`mode`|

The following patterns are considered problems:

````js
/**
 * @param {Array<string} foo
 */
function quux() {

}
// Message: Syntax error in type: Array<string

/**
 * @memberof module:namespace.SomeClass<~
 */
function quux() {

}
// Message: Syntax error in namepath: module:namespace.SomeClass<~

/**
 * @memberof module:namespace.SomeClass~<
 */
function quux() {

}
// Message: Syntax error in namepath: module:namespace.SomeClass~<

/**
 * @borrows foo% as bar
 */
function quux() {

}
// Message: Syntax error in namepath: foo%

/**
 * @borrows #foo as bar
 */
function quux() {

}
// Message: Syntax error in namepath: #foo

/**
 * @borrows foo as bar%
 */
function quux() {

}
// Message: Syntax error in namepath: bar%

/**
 * @borrows foo
 */
function quux() {

}
// Message: @borrows must have an "as" expression. Found ""

/**
 * @see foo%
 */
function quux() {

}
// Options: [{"checkSeesForNamepaths":true}]
// Message: Syntax error in namepath: foo%

/** */
function foo() {}
// Settings: {"jsdoc":{"allowEmptyNamepaths":true,"checkSeesForNamepaths":true}}
// Message: `settings.jsdoc.allowEmptyNamepaths` has been removed, use options in the rule `valid-types` instead.

/**
 * @alias module:abc#event:foo-bar
 */
function quux() {

}
// Message: Syntax error in namepath: module:abc#event:foo-bar

/**
 * @mixes module:namespace.SomeClass~
 */
function quux() {

}
// Message: Syntax error in namepath: module:namespace.SomeClass~

/**
 * @callback
 */
function quux() {

}
// Options: [{"allowEmptyNamepaths":false}]
// Message: Tag @callback must have a namepath

/**
 * @constant {str%ng}
 */
 const FOO = 'foo';
// Message: Syntax error in type: str%ng

/**
 * @typedef {str%ng} UserString
 */
// Message: Syntax error in type: str%ng

/**
 * @typedef {string} UserStr%ng
 */
// Message: Syntax error in namepath: UserStr%ng

/**
 * @extends
 */
 class Bar {};
// Message: Tag @extends must have either a type or namepath

/**
 * @type
 */
 let foo;
// Message: Tag @type must have a type

/**
 * @modifies {bar|foo<}
 */
function quux (foo, bar, baz) {}
// Message: Syntax error in type: bar|foo<

/**
 * @private {BadTypeChecked<}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Syntax error in type: BadTypeChecked<
````

The following patterns are not considered problems:

````js
/**
 * @param {Array<string>} foo
 */
function quux() {

}

/**
 * @param {string} foo
 */
function quux() {

}

/**
 * @param foo
 */
function quux() {

}

/**
 * @borrows foo as bar
 */
function quux() {

}

/**
 * @borrows foo as #bar
 */
function quux() {

}

/**
 * @see foo%
 */
function quux() {

}

/**
 * @alias module:namespace.SomeClass#event:ext_anevent
 */
function quux() {

}

/**
 * @callback foo
 */
function quux() {

}

/**
 * @callback
 */
function quux() {

}
// Options: [{"allowEmptyNamepaths":true}]

/**
 * @class
 */
function quux() {

}

/**
 * @see {@link foo}
 */
function quux() {

}
// Options: [{"checkSeesForNamepaths":true}]

/**
 *
 * @fires {module:namespace.SomeClass#event:ext_anevent}
 */
function quux() {

}

/**
 * @memberof module:namespace.SomeClass~
 */
function quux() {

}

/**
 * @memberof! module:namespace.SomeClass.
 */
function quux() {

}

/**
 *
 */
function quux() {

}

/**
 * @constant {string}
 */
 const FOO = 'foo';

/**
 * @constant {string} FOO
 */
 const FOO = 'foo';

/**
 * @extends Foo
 */
 class Bar {};

/**
 * @extends {Foo<String>}
 */
 class Bar {};

/**
 * @typedef {number|string} UserDefinedType
 */

/**
 * @typedef {number|string}
 */
let UserDefinedGCCType;

/**
 * @modifies {foo|bar}
 */
function quux (foo, bar, baz) {}

/**
 * @private {BadTypeNotCheckedInJsdoc<}
 */
function quux () {}
````


