# eslint-plugin-jsdoc

[![NPM version](https://img.shields.io/npm/v/eslint-plugin-jsdoc.svg?style=flat-square)](https://www.npmjs.org/package/eslint-plugin-jsdoc)
[![Travis build status](https://img.shields.io/travis/gajus/eslint-plugin-jsdoc/master.svg?style=flat-square)](https://travis-ci.org/gajus/eslint-plugin-jsdoc)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Discord Chat](https://img.shields.io/badge/chat-on%20disord-green.svg?logo=discord)](https://discord.gg/kFFy3nc)

JSDoc linting rules for ESLint.

{"gitdown": "contents"}

## Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or
globally.

```sh
npm install --save-dev eslint
```

If you have installed `ESLint` globally, you have to install JSDoc plugin
globally too. Otherwise, install it locally.

```sh
npm install --save-dev eslint-plugin-jsdoc
```

## Configuration

### Flat config (procedural)

This is the currently recommended approach for all flat configs (besides the
array-based `examples`, `default-expressions`, and
`examples-and-default-expressions` configs).

```js
import {jsdoc} from 'eslint-plugin-jsdoc';

export default [
  jsdoc({
    config: 'flat/recommended',
  })
];
```

Or with TypeScript-aware extra rules and/or settings supplied:

```js
import {jsdoc} from 'eslint-plugin-jsdoc';

export default [
  jsdoc({
    config: 'flat/recommended',
    rules: {
      'jsdoc/check-values': [
        'error',
        {
          allowedLicenses: [
            'MIT', 'ISC',
          ],
        },
      ],
    },
    // Uncomment this if you wish your `settings` to overwrite the config's own settings;
    //   otherwise, the default behavior is to merge recursively
    // mergeSettings: false,
    settings: {
      // Do not add a `jsdoc` child object here as you would for regular ESLint `settings`
      structuredTags: {
        see: {
          name: 'namepath-referencing',
          required: [
            'name',
          ],
        },
      },
      /*
        // Since the recommended config has been chosen, the above settings will
        //    be merged by default with the following (which are tags that are
        //    being allowed and requiring a type):
        structuredTags: {
          next: {
            required: [
              'type',
            ],
          },
        },
      */
    }
  })
];
```

A `plugins` property can also be supplied to merge with the resulting `jsdoc` plugin.

Other config properties such as `files`, `ignores`, etc. are also copied over,
though noting that if the specified config produces an array, they will not
currently function.

There is also a `extraRuleDefinitions.forbid` option, the details of which are
explained in the [Advanced](./docs/advanced.md#forbidding-structures) docs
(under creating your own rules and forbidding structures).

### Flat config (declarative)

```js
import jsdoc from 'eslint-plugin-jsdoc';

const config = [
  // configuration included in plugin
  jsdoc.configs['flat/recommended'],
  // other configuration objects...
  {
    files: ['**/*.js'],
    // `plugins` here is not necessary if including the above config
    plugins: {
      jsdoc,
    },
    rules: {
      'jsdoc/require-description': 'warn'
    }
  }
];

export default config;
```

The general starting rulesets you can extend from in flat config are:

- `jsdoc.configs['flat/recommended']`: Recommended starting rules for enforcing proper tag values, that common tags exist, and that tags are formatted and styled consistently
  - `jsdoc.configs['flat/recommended-error']`: The same, reporting with failing errors instead of mere warnings
- `jsdoc.configs['flat/recommended-typescript']`: A similar recommended starting list, adjusted for projects using TypeScript syntax (and not just the "typescript" `mode` setting)
  - `jsdoc.configs['flat/recommended-typescript-error']`: The same, reporting with failing errors instead of mere warnings
- `jsdoc.configs['flat/recommended-typescript-flavor']`: A similar recommended starting list, adjusted for projects using JavaScript syntax (source files that are still `.js`) but using TypeScript flavor within JSDoc (i.e., the default "typescript" `mode` in `eslint-plugin-jsdoc`)
  - `jsdoc.configs['flat/recommended-typescript-flavor-error']`: The same, reporting with failing errors instead of mere warnings
- `jsdoc.configs['flat/recommended-mixed']`: A combination of `flat/recommended-typescript-flavor` and `flat/recommended-typescript` with automatic assignment of subconfig based on file extension (`**/*.{js,jsx,cjs,mjs}` and `**/*.{ts,tsx,cts,mts}`, respectively)

#### Granular Flat Configs

There also exist several more granular, standalone TypeScript rulesets you can extend from.
These each only enable mostly or only rules from the recommended starting rules:

- **Contents**: rules that check names and descriptions
  - `jsdoc.configs['flat/contents-typescript']`: for TypeScript files, with reports set to warn
  - `jsdoc.configs['flat/contents-typescript-error']`: for TypeScript files, with reports set to error
  - `jsdoc.configs['flat/contents-typescript-flavor']`: for files using JavaScript syntax and JSDoc types, with reports set to warn
  - `jsdoc.configs['flat/contents-typescript-flavor-error']`: for files using JavaScript syntax and JSDoc types, with reports set to error
- **Logical**: rules that enforce proper tag values
  - `jsdoc.configs['flat/logical-typescript']`: for TypeScript files, with reports set to warn
  - `jsdoc.configs['flat/logical-typescript-error']`: for TypeScript files, with reports set to error
  - `jsdoc.configs['flat/logical-typescript-flavor']`: for files using JavaScript syntax and JSDoc types, with reports set to warn
  - `jsdoc.configs['flat/logical-typescript-flavor-error']`: for files using JavaScript syntax and JSDoc types, with reports set to error
- **Requirements**: rules that enforce tags exist or have or don't have types
  - `jsdoc.configs['flat/requirements-typescript']`: for TypeScript files, with reports set to warn
  - `jsdoc.configs['flat/requirements-typescript-error']`: for TypeScript files, with reports set to error
  - `jsdoc.configs['flat/requirements-typescript-flavor']`: for files using JavaScript syntax and JSDoc types, with reports set to warn
  - `jsdoc.configs['flat/requirements-typescript-flavor-error']`: for files using JavaScript syntax and JSDoc types, with reports set to error
- **Stylistic**: rules that enforce clear, consistent tag formatting and styles
  - `jsdoc.configs['flat/stylistic-typescript']`: for TypeScript files, with reports set to warn
  - `jsdoc.configs['flat/stylistic-typescript-error']`: for TypeScript files, with reports set to error
  - `jsdoc.configs['flat/stylistic-typescript-flavor']`: for files using JavaScript syntax and JSDoc types, with reports set to warn
  - `jsdoc.configs['flat/stylistic-typescript-flavor-error']`: for files using JavaScript syntax and JSDoc types, with reports set to error

For example, to enforce only that any JSDoc tags and their contents are valid and styled consistently in TypeScript files, without enforcing that tags must always exist:

```js
import jsdoc from 'eslint-plugin-jsdoc';

export default [
  jsdoc.configs['flat/contents-typescript-error'],
  jsdoc.configs['flat/logical-typescript-error'],
  jsdoc.configs['flat/stylistic-typescript-error'],
];
```

##### Why certain rules were excluded from the granular configs

A few rules were left out of the granular configs. Here is why:

Rules which might have been added to `required`:
  - [`require-throws`](./docs/rules/require-throws.md#readme) - Since this can't enforce all cases, some may not wish this rule enforced.
  - [`require-file-overview`](./docs/rules/require-file-overview.md#readme) - Too demanding for all projects
  - [`convert-to-jsdoc-comments`](./docs/rules/convert-to-jsdoc-comments.md#readme) - Overly aggressive for some projects

Rules which might have been added to `logical`:
  - [`no-missing-syntax`](./docs/rules/no-missing-syntax.md#readme) - Has no default options.
  - [`no-restricted-syntax`](./docs/rules/no-restricted-syntax.md#readme) - Has no default options.

Rules which might have been added to `contents`:
  - [`match-name`](./docs/rules/match-name.md#readme) - Has no default options.
  - [`require-description`](./docs/rules/require-description.md#readme) - Too demanding for all projects
  - [`require-description-complete-sentence`](./docs/rules/require-description-complete-sentence.md#readme) - Too demanding for all projects

Rules which might have been added to `stylistic`:
  - [`check-indentation`](./docs/rules/check-indentation.md#readme) - May not be desired by all projects
  - [`sort-tags`](./docs/rules/sort-tags.md#readme) - Too project-specific

### `eslintrc`

Add `plugins` section to [.eslintrc.*](https://eslint.org/docs/user-guide/configuring#configuration-file-formats)
and specify `eslint-plugin-jsdoc` as a plugin.

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
        "jsdoc/check-access": 1, // Recommended
        "jsdoc/check-alignment": 1, // Recommended
        // "jsdoc/check-examples": 1, // Deprecated and not for ESLint >= 8
        "jsdoc/check-indentation": 1,
        "jsdoc/check-line-alignment": 1,
        "jsdoc/check-param-names": 1, // Recommended
        "jsdoc/check-property-names": 1, // Recommended
        "jsdoc/check-syntax": 1,
        "jsdoc/check-tag-names": 1, // Recommended
        "jsdoc/check-template-names": 1,
        "jsdoc/check-types": 1, // Recommended
        "jsdoc/check-values": 1, // Recommended
        "jsdoc/convert-to-jsdoc-comments": 1,
        "jsdoc/empty-tags": 1, // Recommended
        "jsdoc/implements-on-classes": 1, // Recommended
        "jsdoc/imports-as-dependencies": 1,
        "jsdoc/informative-docs": 1,
        "jsdoc/lines-before-block": 1,
        "jsdoc/match-description": 1,
        "jsdoc/match-name": 1,
        "jsdoc/multiline-blocks": 1, // Recommended
        "jsdoc/no-bad-blocks": 1,
        "jsdoc/no-blank-block-descriptions": 1,
        "jsdoc/no-defaults": 1, // Recommended
        "jsdoc/no-missing-syntax": 1,
        "jsdoc/no-multi-asterisks": 1, // Recommended
        "jsdoc/no-restricted-syntax": 1,
        "jsdoc/no-types": 1, // Recommended for TS configs
        "jsdoc/no-undefined-types": 1, // Recommended for non-TS configs
        "jsdoc/rejct-any-type": 1, // Recommended
        "jsdoc/reject-function-type": 1, // Recommended
        "jsdoc/require-asterisk-prefix": 1,
        "jsdoc/require-description": 1,
        "jsdoc/require-description-complete-sentence": 1,
        "jsdoc/require-example": 1,
        "jsdoc/require-file-overview": 1,
        "jsdoc/require-hyphen-before-param-description": 1,
        "jsdoc/require-jsdoc": 1, // Recommended
        "jsdoc/require-next-description": 1,
        "jsdoc/require-next-type": 1, // Recommended
        "jsdoc/require-param-description": 1, // Recommended
        "jsdoc/require-param-name": 1, // Recommended
        "jsdoc/require-param-type": 1, // Recommended in non-TS configs
        "jsdoc/require-param": 1, // Recommended
        "jsdoc/require-property-description": 1, // Recommended
        "jsdoc/require-property-name": 1, // Recommended
        "jsdoc/require-property-type": 1, // Recommended in non-TS configs
        "jsdoc/require-property": 1, // Recommended
        "jsdoc/require-returns-check": 1, // Recommended
        "jsdoc/require-returns-description": 1, // Recommended
        "jsdoc/require-returns-type": 1, // Recommended in non-TS configs
        "jsdoc/require-returns": 1, // Recommended
        "jsdoc/require-template": 1,
        "jsdoc/require-template-description": 1,
        "jsdoc/require-throws": 1,
        "jsdoc/require-throws-description": 1,
        "jsdoc/require-throws-type": 1, // Recommended
        "jsdoc/require-yields-check": 1, // Recommended
        "jsdoc/require-yields-description": 1,
        "jsdoc/require-yields-type": 1, // Recommended
        "jsdoc/require-yields": 1, // Recommended
        "jsdoc/sort-tags": 1,
        "jsdoc/tag-lines": 1, // Recommended
        "jsdoc/text-escaping": 1,
        "jsdoc/type-formatting": 1,
        "jsdoc/valid-types": 1 // Recommended
    }
}
```

Or you can simply add the following to [.eslintrc.*](https://eslint.org/docs/user-guide/configuring#configuration-file-formats),
which enables the rules commented above as "recommended":


```json
{
  "extends": ["plugin:jsdoc/recommended"]
}
```

You can then selectively add to or override the recommended rules.

Alternatively, if you wish to have all linting issues reported
as failing errors, you may use the "recommended-error" config:

```json
{
  "extends": ["plugin:jsdoc/recommended-error"]
}
```

If you plan to use TypeScript syntax (and not just "typescript"
`mode` to indicate the JSDoc flavor is TypeScript), you can use:

```json
{
  "extends": ["plugin:jsdoc/recommended-typescript"]
}
```

...or to report with failing errors instead of mere warnings:

```json
{
  "extends": ["plugin:jsdoc/recommended-typescript-error"]
}
```

If you are not using TypeScript syntax (your source files are still `.js` files)
but you are using the TypeScript flavor within JSDoc (i.e., the default
"typescript" `mode` in `eslint-plugin-jsdoc`) and you are perhaps using
`allowJs` and `checkJs` options of TypeScript's `tsconfig.json`), you may
use:

```json
{
  "extends": ["plugin:jsdoc/recommended-typescript-flavor"]
}
```

...or to report with failing errors instead of mere warnings:

```json
{
  "extends": ["plugin:jsdoc/recommended-typescript-flavor-error"]
}
```

## Options

Rules may, as per the [ESLint user guide](https://eslint.org/docs/user-guide/configuring), have their own individual options. In `eslint-plugin-jsdoc`, a few options,
such as, `exemptedBy` and `contexts`, may be used across different rules.

`eslint-plugin-jsdoc` options, if present, are generally in the form of an
object supplied as the second argument in an array after the error level
(any exceptions to this format are explained within that rule's docs).

```js
// `.eslintrc.js`
{
  rules: {
    'jsdoc/require-example': [
        // The Error level should be `error`, `warn`, or `off` (or 2, 1, or 0)
        'error',
        // The options vary by rule, but are generally added to an options
        //  object as follows:
        {
          checkConstructors: true,
          exemptedBy: ['type']
        }
    ]
  }
}
```

## Settings

See [Settings](./docs/settings.md#readme).

## Advanced

See [Advanced](./docs/advanced.md#readme).

## Processors

See our `@example` and other item [processors](./docs/processors.md#readme).

## Rules

Problems reported by rules which have a wrench :wrench: below can be fixed automatically by running ESLint on the command line with `--fix` option.

Note that a number of fixable rules have an `enableFixer` option which can
be set to `false` to disable the fixer (or in the case of `check-param-names`,
`check-property-names`, and `no-blank-blocks`, set to `true` to enable a
non-default-recommended fixer).

|recommended|fixable|rule|description|
|-|-|-|-|
{"gitdown": "rules-table"}
