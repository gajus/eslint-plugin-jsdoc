### `check-examples`

Ensures that (JavaScript) examples within JSDoc adhere to ESLint rules. Also
has options to lint the default values of optional `@param`/`@arg`/`@argument`
and `@property`/`@prop` tags or the values of `@default`/`@defaultvalue` tags.

#### Options

The options below all default to no-op/`false` except as noted.

##### `captionRequired`

JSDoc specs use of an optional `<caption>` element at the beginning of
`@example`.

The option `captionRequired` insists on a `<caption>` being present at
the beginning of any `@example`.

Used only for `@example`.

##### `exampleCodeRegex` and `rejectExampleCodeRegex`

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

##### `paddedIndent`

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

##### `reportUnusedDisableDirectives`

If not set to `false`, `reportUnusedDisableDirectives` will report disabled
directives which are not used (and thus not needed). Defaults to `true`.
Corresponds to ESLint's [`--report-unused-disable-directives`](https://eslint.org/docs/user-guide/command-line-interface#--report-unused-disable-directives).

Inline ESLint config within `@example` JavaScript is allowed (or within
`@default`, etc.), though the disabling of ESLint directives which are not
needed by the resolved rules will be reported as with the ESLint
`--report-unused-disable-directives` command.

#### Options for Determining ESLint Rule Applicability (`allowInlineConfig`, `noDefaultExampleRules`, `matchingFileName`, `configFile`, `checkEslintrc`, and `baseConfig`)

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
  rules). (In ESLint 6's process API and `eslint-plugin-markdown` < 2, one
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

##### Rules Disabled by Default Unless `noDefaultExampleRules` is Set to `true`

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
* `semi` - Will insist on "never"
* `strict` - Disabled.
* `no-new` - Disabled.
* `no-unused-expressions` - Disabled.

##### Options for checking other than `@example` (`checkDefaults`, `checkParams`, or `checkProperties`)

* `checkDefaults` - Whether to check the values of `@default`/`@defaultvalue` tags
* `checkParams` - Whether to check `@param`/`@arg`/`@argument` default values
* `checkProperties` - Whether to check `@property`/`@prop` default values

|||
|---|---|
|Context|everywhere|
|Tags|`example`|
|Recommended|false|
|Options| *See above* |

<!-- assertions checkExamples -->
