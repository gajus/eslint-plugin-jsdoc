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
where the parentheses are load-bearing for precedence or Automatic Semicolon
Insertion (ASI). An inline `/** @type {const} */` cast is only reported (and
fixed) on a `const` declarator, where the literal type is inferred anyway;
elsewhere (a `let`/`var` binding, a `return`, an object-property value, etc.) the
cast suppresses widening, so it is doing real work and is left alone.

Generic `call()`/`new` expressions whose type arguments are inferred (e.g.
`document.querySelectorAll(sel)`, which defaults to `NodeListOf<Element>`) are
never reported: the `@type` supplies the contextual type TypeScript uses to
infer those arguments, so the inferred and asserted types always coincide and a
real narrowing (to `NodeListOf<HTMLElement>`, say) cannot be told apart from a
redundant one.

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
