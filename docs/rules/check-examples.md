<a name="user-content-check-examples"></a>
<a name="check-examples"></a>
# <code>check-examples</code>

* [Options](#user-content-check-examples-options)
    * [`captionRequired`](#user-content-check-examples-options-captionrequired)
    * [`exampleCodeRegex` and `rejectExampleCodeRegex`](#user-content-check-examples-options-examplecoderegex-and-rejectexamplecoderegex)
    * [`paddedIndent`](#user-content-check-examples-options-paddedindent)
    * [`reportUnusedDisableDirectives`](#user-content-check-examples-options-reportunuseddisabledirectives)
* [Options for Determining ESLint Rule Applicability (`allowInlineConfig`, `noDefaultExampleRules`, `matchingFileName`, `configFile`, `checkEslintrc`, and `baseConfig`)](#user-content-check-examples-options-for-determining-eslint-rule-applicability-allowinlineconfig-nodefaultexamplerules-matchingfilename-configfile-checkeslintrc-and-baseconfig)
    * [Rules Disabled by Default Unless `noDefaultExampleRules` is Set to `true`](#user-content-check-examples-options-for-determining-eslint-rule-applicability-allowinlineconfig-nodefaultexamplerules-matchingfilename-configfile-checkeslintrc-and-baseconfig-rules-disabled-by-default-unless-nodefaultexamplerules-is-set-to-true)
    * [Options for checking other than `@example` (`checkDefaults`, `checkParams`, or `checkProperties`)](#user-content-check-examples-options-for-determining-eslint-rule-applicability-allowinlineconfig-nodefaultexamplerules-matchingfilename-configfile-checkeslintrc-and-baseconfig-options-for-checking-other-than-example-checkdefaults-checkparams-or-checkproperties)
* [Context and settings](#user-content-check-examples-context-and-settings)
* [Failing examples](#user-content-check-examples-failing-examples)
* [Passing examples](#user-content-check-examples-passing-examples)


> **NOTE**: This rule currently does not work in ESLint 8 (we are waiting for
> [issue 14745](https://github.com/eslint/eslint/issues/14745)).

Ensures that (JavaScript) examples within JSDoc adhere to ESLint rules. Also
has options to lint the default values of optional `@param`/`@arg`/`@argument`
and `@property`/`@prop` tags or the values of `@default`/`@defaultvalue` tags.

<a name="user-content-check-examples-options"></a>
<a name="check-examples-options"></a>
## Options

The options below all default to no-op/`false` except as noted.

<a name="user-content-check-examples-options-captionrequired"></a>
<a name="check-examples-options-captionrequired"></a>
### <code>captionRequired</code>

JSDoc specs use of an optional `<caption>` element at the beginning of
`@example`.

The option `captionRequired` insists on a `<caption>` being present at
the beginning of any `@example`.

Used only for `@example`.

<a name="user-content-check-examples-options-examplecoderegex-and-rejectexamplecoderegex"></a>
<a name="check-examples-options-examplecoderegex-and-rejectexamplecoderegex"></a>
### <code>exampleCodeRegex</code> and <code>rejectExampleCodeRegex</code>

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
  to only match explicitly fenced JavaScript blocks. Defaults to only
  using the `u` flag, so to add your own flags, encapsulate your
  expression as a string, but like a literal, e.g., ````/```js.*```/gi````.
  Note that specifying a global regular expression (i.e., with `g`) will
  allow independent linting of matched blocks within a single `@example`.
* `rejectExampleCodeRegex` - Regex blacklist which rejects
  non-lintable examples (has priority over `exampleCodeRegex`). An example
  might be ```"^`"``` to avoid linting fenced blocks which may indicate
  a non-JavaScript language. See `exampleCodeRegex` on how to add flags
  if the default `u` is not sufficient.

If neither is in use, all examples will be matched. Note also that even if
`captionRequired` is not set, any initial `<caption>` will be stripped out
before doing the regex matching.

<a name="user-content-check-examples-options-paddedindent"></a>
<a name="check-examples-options-paddedindent"></a>
### <code>paddedIndent</code>

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
 *       return a.b;
 *     });
 */
```

Only applied to `@example` linting.

<a name="user-content-check-examples-options-reportunuseddisabledirectives"></a>
<a name="check-examples-options-reportunuseddisabledirectives"></a>
### <code>reportUnusedDisableDirectives</code>

If not set to `false`, `reportUnusedDisableDirectives` will report disabled
directives which are not used (and thus not needed). Defaults to `true`.
Corresponds to ESLint's [`--report-unused-disable-directives`](https://eslint.org/docs/user-guide/command-line-interface#--report-unused-disable-directives).

Inline ESLint config within `@example` JavaScript is allowed (or within
`@default`, etc.), though the disabling of ESLint directives which are not
needed by the resolved rules will be reported as with the ESLint
`--report-unused-disable-directives` command.

<a name="user-content-check-examples-options-for-determining-eslint-rule-applicability-allowinlineconfig-nodefaultexamplerules-matchingfilename-configfile-checkeslintrc-and-baseconfig"></a>
<a name="check-examples-options-for-determining-eslint-rule-applicability-allowinlineconfig-nodefaultexamplerules-matchingfilename-configfile-checkeslintrc-and-baseconfig"></a>
## Options for Determining ESLint Rule Applicability (<code>allowInlineConfig</code>, <code>noDefaultExampleRules</code>, <code>matchingFileName</code>, <code>configFile</code>, <code>checkEslintrc</code>, and <code>baseConfig</code>)

The following options determine which individual ESLint rules will be
applied to the JavaScript found within the `@example` tags (as determined
to be applicable by the above regex options) or for the other tags checked by
`checkDefaults`, `checkParams`, or `checkProperties` options. They are ordered
by decreasing precedence:

* `allowInlineConfig` - If not set to `false`, will allow
  inline config within the `@example` to override other config. Defaults
  to `true`.
* `noDefaultExampleRules` - Setting to `true` will disable the
  default rules which are expected to be troublesome for most documentation
  use. See the section below for the specific default rules.
* `configFile` - A config file. Corresponds to ESLint's [`-c`](https://eslint.org/docs/user-guide/command-line-interface#-c---config).
* `matchingFileName` - Option for a file name (even non-existent) to trigger
  specific rules defined in one's config; usable with ESLint `.eslintrc.*`
  `overrides` -> `files` globs, to apply a desired subset of rules with
  `@example` (besides allowing for rules specific to examples, this option
  can be useful for enabling reuse of the same rules within `@example` as
  with JavaScript Markdown lintable by
  [other plugins](https://github.com/eslint/eslint-plugin-markdown), e.g.,
  if one sets `matchingFileName` to `dummy.md/*.js` so that `@example`
  rules will follow rules for fenced JavaScript blocks within one's Markdown
  rules). (In ESLint 6's processor API and `eslint-plugin-markdown` < 2, one
  would instead use `dummy.md`.) For `@example` only.
* `matchingFileNameDefaults` - As with `matchingFileName` but for use with
  `checkDefaults` and defaulting to `.jsdoc-defaults` as extension.
* `matchingFileNameParams` - As with `matchingFileName` but for use with
  `checkParams` and defaulting to `.jsdoc-params` as extension.
* `matchingFileNameProperties` As with `matchingFileName` but for use with
  `checkProperties` and defaulting to `.jsdoc-properties` as extension.
* `checkEslintrc` - Defaults to `true` in adding rules
  based on an `.eslintrc.*` file. Setting to `false` corresponds to
  ESLint's [`--no-eslintrc`](https://eslint.org/docs/user-guide/command-line-interface#--no-eslintrc).
  If `matchingFileName` is set, this will automatically be `true` and
  will use the config corresponding to that file. If `matchingFileName` is
  not set and this value is set to `false`, the `.eslintrc.*` configs will
  not be checked. If `matchingFileName` is not set, and this is unset or
  set to `true`, the `.eslintrc.*` configs will be checked as though the file
  name were the same as the file containing the example, with any file
  extension changed to `".md/*.js"` (and if there is no file extension,
  `"dummy.md/*.js"` will be the result). This allows convenient sharing of
  similar rules with often also context-free Markdown as well as use of
  `overrides` as described under `matchingFileName`. Note that this option
  (whether set by `matchingFileName` or set manually to `true`) may come at
  somewhat of a performance penalty as the file's existence is checked by
  eslint.
* `baseConfig` - Set to an object of rules with the same schema
  as `.eslintrc.*` for defaults.

<a name="user-content-check-examples-options-for-determining-eslint-rule-applicability-allowinlineconfig-nodefaultexamplerules-matchingfilename-configfile-checkeslintrc-and-baseconfig-rules-disabled-by-default-unless-nodefaultexamplerules-is-set-to-true"></a>
<a name="check-examples-options-for-determining-eslint-rule-applicability-allowinlineconfig-nodefaultexamplerules-matchingfilename-configfile-checkeslintrc-and-baseconfig-rules-disabled-by-default-unless-nodefaultexamplerules-is-set-to-true"></a>
### Rules Disabled by Default Unless <code>noDefaultExampleRules</code> is Set to <code>true</code>

* `eol-last` - Insisting that a newline "always" be at the end is less likely
  to be desired in sample code as with the code file convention.
* `no-console` - This rule is unlikely to have inadvertent temporary debugging
  within examples.
* `no-multiple-empty-lines` - This rule may be problematic for projects which
  use an initial newline just to start an example. Also, projects may wish to
  use extra lines within examples just for easier illustration
  purposes.
* `no-undef` - Many variables in examples will be `undefined`.
* `no-unused-vars` - It is common to define variables for clarity without
  always using them within examples.
* `padded-blocks` - It can generally look nicer to pad a little even if one's
  code follows more stringency as far as block padding.
* `jsdoc/require-file-overview` - Shouldn't check example for jsdoc blocks.
* `jsdoc/require-jsdoc` - Wouldn't expect jsdoc blocks within jsdoc blocks.
* `import/no-unresolved` - One wouldn't generally expect example paths to
  resolve relative to the current JavaScript file as one would with real code.
* `import/unambiguous` - Snippets in examples are likely too short to always
  include full import/export info.
* `node/no-missing-import` - See `import/no-unresolved`.
* `node/no-missing-require` -  See `import/no-unresolved`.

For `checkDefaults`, `checkParams`, and `checkProperties`, the following
expression-oriented rules will be used by default as well:

* `quotes` - Will insist on "double".
* `semi` - Will insist on "never".
* `strict` - Disabled.
* `no-empty-function` - Disabled.
* `no-new` - Disabled.
* `no-unused-expressions` - Disabled.
* `chai-friendly/no-unused-expressions` - Disabled.

<a name="user-content-check-examples-options-for-determining-eslint-rule-applicability-allowinlineconfig-nodefaultexamplerules-matchingfilename-configfile-checkeslintrc-and-baseconfig-options-for-checking-other-than-example-checkdefaults-checkparams-or-checkproperties"></a>
<a name="check-examples-options-for-determining-eslint-rule-applicability-allowinlineconfig-nodefaultexamplerules-matchingfilename-configfile-checkeslintrc-and-baseconfig-options-for-checking-other-than-example-checkdefaults-checkparams-or-checkproperties"></a>
### Options for checking other than <code>@example</code> (<code>checkDefaults</code>, <code>checkParams</code>, or <code>checkProperties</code>)

* `checkDefaults` - Whether to check the values of `@default`/`@defaultvalue` tags
* `checkParams` - Whether to check `@param`/`@arg`/`@argument` default values
* `checkProperties` - Whether to check `@property`/`@prop` default values

<a name="user-content-check-examples-context-and-settings"></a>
<a name="check-examples-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`example`|
|Recommended|false|
|Options|`allowInlineConfig`, `baseConfig`, `captionRequired`, `checkDefaults`, `checkEslintrc`, `checkParams`, `checkProperties`, `configFile`, `exampleCodeRegex`, `matchingFileName`, `matchingFileNameDefaults`, `matchingFileNameParams`, `matchingFileNameProperties`, `noDefaultExampleRules`, `paddedIndent`, `rejectExampleCodeRegex`, `reportUnusedDisableDirectives`|

<a name="user-content-check-examples-failing-examples"></a>
<a name="check-examples-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @example alert('hello')
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"no-alert":2,"semi":["error","always"]}},"checkEslintrc":false}]
// Message: @example error (no-alert): Unexpected alert.

/**
 * @example alert('hello')
 */
class quux {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"no-alert":2,"semi":["error","always"]}},"checkEslintrc":false}]
// Message: @example error (no-alert): Unexpected alert.

/**
 * @example ```js
 alert('hello');
 ```
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["error","never"]}},"checkEslintrc":false,"exampleCodeRegex":"```js([\\s\\S]*)```"}]
// Message: @example error (semi): Extra semicolon.

/**
 * @example
 *
 * ```js alert('hello'); ```
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["error","never"]}},"checkEslintrc":false,"exampleCodeRegex":"```js ([\\s\\S]*)```"}]
// Message: @example error (semi): Extra semicolon.

/**
 * @example
 * ```js alert('hello'); ```
 */
var quux = {

};
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["error","never"]}},"checkEslintrc":false,"exampleCodeRegex":"```js ([\\s\\S]*)```"}]
// Message: @example error (semi): Extra semicolon.

/**
 * @example ```
 * js alert('hello'); ```
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["error","never"]}},"checkEslintrc":false,"exampleCodeRegex":"```\njs ([\\s\\S]*)```"}]
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
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["error","never"]}},"checkEslintrc":false,"rejectExampleCodeRegex":"^\\s*<.*>\\s*$"}]
// Message: @example error (semi): Extra semicolon.

/**
 * @example
 * quux(); // does something useful
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"no-undef":["error"]}},"checkEslintrc":false,"noDefaultExampleRules":true}]
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
// "jsdoc/check-examples": ["error"|"warn", {"captionRequired":true,"checkEslintrc":false}]
// Message: Caption is expected for examples.

/**
 * @example  quux();
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"indent":["error"]}},"checkEslintrc":false,"noDefaultExampleRules":false}]
// Message: @example error (indent): Expected indentation of 0 spaces but found 1.

/**
 * @example test() // eslint-disable-line semi
 */
function quux () {}
// "jsdoc/check-examples": ["error"|"warn", {"checkEslintrc":false,"noDefaultExampleRules":true,"reportUnusedDisableDirectives":true}]
// Message: @example error: Unused eslint-disable directive (no problems were reported from 'semi').

/**
 * @example
 test() // eslint-disable-line semi
 */
function quux () {}
// "jsdoc/check-examples": ["error"|"warn", {"allowInlineConfig":false,"baseConfig":{"rules":{"semi":["error","always"]}},"checkEslintrc":false,"noDefaultExampleRules":true}]
// Message: @example error (semi): Missing semicolon.

/**
 * @example const j = 5;
 * quux2();
 */
function quux2 () {

}
// "jsdoc/check-examples": ["error"|"warn", {"matchingFileName":"../../jsdocUtils.js"}]
// Message: @example warning (id-length): Identifier name 'j' is too short (< 2).

/**
 * @example const k = 5;
 * quux2();
 */
function quux2 () {

}
// "jsdoc/check-examples": ["error"|"warn", {"configFile":".eslintrc.json","matchingFileName":"../../jsdocUtils.js"}]
// Message: @example warning (id-length): Identifier name 'k' is too short (< 2).

/**
 * @example const m = 5;
 * quux2();
 */
function quux2 () {

}
// Message: @example warning (id-length): Identifier name 'm' is too short (< 2).

/**
 * @example const i = 5;
 *   quux2()
 */
function quux2 () {

}
// "jsdoc/check-examples": ["error"|"warn", {"paddedIndent":2}]
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
 * @example const idx = 5;
 * quux2()
 */
function quux2 () {

}
// "jsdoc/check-examples": ["error"|"warn", {"matchingFileName":"dummy.js"}]
// Message: @example error (semi): Missing semicolon.

/**
 * @example const idx = 5;
 *
 * quux2()
 */
function quux2 () {

}
// "jsdoc/check-examples": ["error"|"warn", {"matchingFileName":"dummy.js"}]
// Message: @example error (semi): Missing semicolon.

/**
 * @example const idx = 5;
 *
 * quux2()
 */
function quux2 () {

}
// "jsdoc/check-examples": ["error"|"warn", {"checkEslintrc":false,"matchingFileName":"dummy.js"}]
// Message: @example error: Parsing error: The keyword 'const' is reserved

/**
 * @example // begin
 alert('hello')
 // end
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["warn","always"]}},"checkEslintrc":false,"exampleCodeRegex":"// begin[\\s\\S]*// end","noDefaultExampleRules":true}]
// Message: @example warning (semi): Missing semicolon.

/**
 * @typedef {string} Foo
 * @example <caption></caption>
 * 'foo'
 */
// "jsdoc/check-examples": ["error"|"warn", {"captionRequired":true,"checkEslintrc":false}]
// Message: Caption is expected for examples.

/**
 * @example
 * const list: number[] = [1, 2, 3]
 * quux(list);
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"parser":"@typescript-eslint/parser","parserOptions":{"ecmaVersion":6},"rules":{"semi":["error","always"]}},"checkEslintrc":false}]
// Message: @example error (semi): Missing semicolon.

/**
 * @example
 * const test = something.find((_) => {
 *   return _
 * });
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"parserOptions":{"ecmaVersion":6},"rules":{"semi":["error","always"]}}}]
// Message: @example error (semi): Missing semicolon.

/**
 * @example <caption>Say `Hello!` to the user.</caption>
 * First, import the function:
 *
 * ```js
 * import popup from './popup'
 * const aConstInSameScope = 5;
 * ```
 *
 * Then use it like this:
 *
 * ```js
 * const aConstInSameScope = 7;
 * popup('Hello!')
 * ```
 *
 * Here is the result on macOS:
 *
 * ![Screenshot](path/to/screenshot.jpg)
 */
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"parserOptions":{"ecmaVersion":2015,"sourceType":"module"},"rules":{"semi":["error","always"]}},"checkEslintrc":false,"exampleCodeRegex":"/^```(?:js|javascript)\\n([\\s\\S]*?)```$/gm"}]
// Message: @example error (semi): Missing semicolon.

/**
 * @example // begin
 alert('hello')
 // end
 * And here is another example:
 // begin
 alert('there')
 // end
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["warn","always"]}},"checkEslintrc":false,"exampleCodeRegex":"/\\/\\/ begin[\\s\\S]*?// end/g","noDefaultExampleRules":true}]
// Message: @example warning (semi): Missing semicolon.

/**
 * @example
 *   quux();
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"indent":["error"]}},"checkEslintrc":false,"noDefaultExampleRules":false}]
// Message: @example error (indent): Expected indentation of 0 spaces but found 2.

/**
 * @default 'abc'
 */
const str = 'abc';
// "jsdoc/check-examples": ["error"|"warn", {"checkDefaults":true}]
// Message: @default error (quotes): Strings must use doublequote.

/**
 * @param {myType} [name='abc']
 */
function quux () {
}
// "jsdoc/check-examples": ["error"|"warn", {"checkParams":true}]
// Message: @param error (quotes): Strings must use doublequote.

/**
 * @property {myType} [name='abc']
 */
const obj = {};
// "jsdoc/check-examples": ["error"|"warn", {"checkProperties":true}]
// Message: @property error (quotes): Strings must use doublequote.

/**
 * Test function.
 *
 * @example <caption>functionName (paramOne: string, paramTwo?: any,
 * paramThree?: any): boolean</caption> test()
 *
 * @param {string} paramOne Parameter description.
 * @param {any} [paramTwo] Parameter description.
 * @param {any} [paramThree] Parameter description.
 * @returns {boolean} Return description.
 */
const functionName = function (paramOne, paramTwo,
  paramThree) {
  return false;
};
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"parserOptions":{"ecmaVersion":2015,"sourceType":"module"},"rules":{"semi":["error","always"]}},"captionRequired":true,"checkEslintrc":false}]
// Message: @example error (semi): Missing semicolon.
````



<a name="user-content-check-examples-passing-examples"></a>
<a name="check-examples-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @example ```js
 alert('hello');
 ```
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["error","always"]}},"checkEslintrc":false,"exampleCodeRegex":"```js([\\s\\S]*)```"}]

/**
 * @example ```js
 alert('hello');
 ```
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["error","always"]}},"checkEslintrc":false,"exampleCodeRegex":"/```js([\\s\\S]*)```/"}]

/**
 * @example
 * // arbitrary example content
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"checkEslintrc":false}]

/**
 * @example
 * quux(); // does something useful
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"no-undef":["error"]}},"checkEslintrc":false,"noDefaultExampleRules":false}]

/**
 * @example quux();
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"indent":["error"]}},"checkEslintrc":false,"noDefaultExampleRules":false}]

/**
 * @example <caption>Valid usage</caption>
 * quux(); // does something useful
 *
 * @example <caption>Invalid usage</caption>
 * quux('random unwanted arg'); // results in an error
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"captionRequired":true,"checkEslintrc":false}]

/**
 * @example test() // eslint-disable-line semi
 */
function quux () {}
// "jsdoc/check-examples": ["error"|"warn", {"checkEslintrc":false,"noDefaultExampleRules":true,"reportUnusedDisableDirectives":false}]

/**
 * @example
 test() // eslint-disable-line semi
 */
function quux () {}
// "jsdoc/check-examples": ["error"|"warn", {"allowInlineConfig":true,"baseConfig":{"rules":{"semi":["error","always"]}},"checkEslintrc":false,"noDefaultExampleRules":true}]

/**
 * @example ```js
 alert('hello')
 ```
 */
var quux = {

};
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["error","never"]}},"checkEslintrc":false,"exampleCodeRegex":"```js([\\s\\S]*)```"}]

/**
 * @example
 * foo(function (err) {
 *     throw err;
 * });
 */
function quux () {}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"indent":["error"]}},"checkEslintrc":false,"noDefaultExampleRules":false}]

/**
 * @example
 * const list: number[] = [1, 2, 3];
 * quux(list);
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"parser":"@typescript-eslint/parser","parserOptions":{"ecmaVersion":6},"rules":{"semi":["error","always"]}},"checkEslintrc":false}]

/**
 * @example const ident = 5;
 *   quux2();
 *   bar();
 */
function quux2 () {

}
// "jsdoc/check-examples": ["error"|"warn", {"paddedIndent":2}]

/**
 * @example
 * function quux() {
 *     bar();
 * }
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"indent":["error"]}},"checkEslintrc":false,"noDefaultExampleRules":false}]

// Comment
a();

export default {};

/**
 *
 */
function f () {

}

/**
 * Does quux
 * @example
 * // Do it!
 * quux();
 */
function quux () {
}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"plugins":["jsdoc"],"rules":{"jsdoc/require-file-overview":["error"]}},"checkEslintrc":false,"noDefaultExampleRules":false}]

/**
 * @default "abc"
 */
const str = 'abc';
// "jsdoc/check-examples": ["error"|"warn", {"checkDefaults":true}]

/**
 * @default
 */
const str = 'abc';
// "jsdoc/check-examples": ["error"|"warn", {"checkDefaults":true}]

/**
 * @param {myType} [name="abc"]
 */
function quux () {
}
// "jsdoc/check-examples": ["error"|"warn", {"checkParams":true}]

/**
 * @param {myType} name
 */
function quux () {
}
// "jsdoc/check-examples": ["error"|"warn", {"checkParams":true}]

/**
 * @property {myType} [name="abc"]
 */
const obj = {};
// "jsdoc/check-examples": ["error"|"warn", {"checkProperties":true}]

/**
 * @property {myType} [name]
 */
const obj = {};
// "jsdoc/check-examples": ["error"|"warn", {"checkProperties":true}]

/**
 * @default 'abc'
 */
const str = 'abc';
// "jsdoc/check-examples": ["error"|"warn", {"checkDefaults":false,"matchingFileNameDefaults":"dummy.js"}]

/**
 * @param {myType} [name='abc']
 */
function quux () {
}
// "jsdoc/check-examples": ["error"|"warn", {"checkParams":false,"matchingFileNameParams":"dummy.js"}]

/**
 * @property {myType} [name='abc']
 */
const obj = {};
// "jsdoc/check-examples": ["error"|"warn", {"checkProperties":false,"matchingFileNameProperties":"dummy.js"}]

/**
 * Test function.
 *
 * @example <caption>functionName (paramOne: string, paramTwo?: any,
 * paramThree?: any): boolean</caption> test();
 *
 * @param {string} paramOne Parameter description.
 * @param {any} [paramTwo] Parameter description.
 * @param {any} [paramThree] Parameter description.
 * @returns {boolean} Return description.
 */
const functionName = function (paramOne, paramTwo,
  paramThree) {
  return false;
};
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"parserOptions":{"ecmaVersion":2015,"sourceType":"module"},"rules":{"semi":["error","always"]}},"captionRequired":true,"checkEslintrc":false}]
````

