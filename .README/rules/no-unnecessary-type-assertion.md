# `no-unnecessary-type-assertion`

JavaScript-based TypeScript type assertions (`@type`) are helpful when you have TypeScript running against JavaScript files with the `checkJs`/`allowJs` options. However,
they become redundant when the type is equal to or more broad than the type which
TypeScript infers for the expression.

Checks both a leading `@type` on a `VariableDeclaration` (e.g.
`/** @type {number} */ const x = 5;`) and an inline JSDoc cast around a
parenthesized expression (e.g. `const x = /** @type {number} */ (5);`).

For a `VariableDeclaration` the fixer removes the redundant `@type` tag,
deleting the whole JSDoc block if nothing else is left in it. For an inline
cast the fixer removes the comment and unwraps the parentheses
(`const x = /** @type {5} */ (5);` becomes `const x = 5;`); it is skipped
where the parentheses are load-bearing for precedence or Automatic Semicolon Insertion (ASI).

**Note that this experimental rule requires that the `typescript` package is installed.
You must also install and point to the `typescript-eslint` parser, targeting your
JavaScript + JSDoc files. Note also that this rule runs fairly slowly.**

```js
// eslint.config.js

import {
  parser as typescriptEslintParser,
} from 'typescript-eslint';

export default [
  {
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            '*.js',
          ],
        },
        tsconfigRootDir: import.meta.dirname,
      }
    },
    rules: {
      'jsdoc/no-unnecessary-type-assertion': ['error', {
        // You can change these defaults
        checkLiteralConstAssertions: false,
        enableFixer: true,
        treatAnyAsRedundant: false,
        typesToIgnore: [],
      }]
    }
  }
];
```

## Options

{"gitdown": "options"}

|||
|---|---|
|Context|`VariableDeclaration`; inline `/** @type */` casts|
|Tags|`type`|
|Recommended|false|
|Options|`checkLiteralConstAssertions`, `enableFixer`, `treatAnyAsRedundant`, `typesToIgnore`|

## Failing examples

<!-- assertions-failing noUnnecessaryTypeAssertion -->

## Passing examples

<!-- assertions-passing noUnnecessaryTypeAssertion -->
