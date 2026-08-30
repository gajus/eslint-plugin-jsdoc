# `no-unnecessary-type-assertion`

JavaScript-based TypeScript type assertions (`@type`) are helpful when you have TypeScript running against JavaScript files with the `checkJs`/`allowJs` options. However,
they become redundant when the type is equal to or more broad than the type which
TypeScript infers for the expression.

Currently only supports `VariableDeclaration`.

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
|Context|`VariableDeclaration`|
|Tags|`type`|
|Recommended|false|
|Options|`checkLiteralConstAssertions`, `treatAnyAsRedundant`, `typesToIgnore`|

## Failing examples

<!-- assertions-failing noUnnecessaryTypeAssertion -->

## Passing examples

<!-- assertions-passing noUnnecessaryTypeAssertion -->
