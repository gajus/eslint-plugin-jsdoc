# `no-unnecessary-type-assertion`

JavaScript-based TypeScript type assertions (`@type`) are helpful when you have TypeScript running against JavaScript files with the `checkJs`/`allowJs` options. However,
they become redundant when the type is equal to or more broad than the type which
TypeScript infers for the expression.

An assertion on an `any` expression (for instance a property read off
`JSON.parse(s)`) is never reported: `any` is assignable to every type, so a
concrete assertion on it is narrowing rather than redundant. The same holds for
structureless placeholders — `never`, `null`, `undefined`, an empty array or
object, `any[]`, and unions built only from those (e.g. `never[] | {}` from
`cond ? [] : {}`) — where the assertion is supplying the real shape.

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
redundant one. Template literals with interpolations (`` `${x}Reference` ``) are
skipped for the same reason — they widen to `string` on their own, but the
assertion contextually narrows them to a template-literal type.

The `unknown` half of a "cast through `unknown`"
(`/** @type {Foo} */ (/** @type {unknown} */ (x))`) is likewise never reported:
it is the bridge that lets the outer assertion reach an otherwise-incompatible
type, so it is load-bearing despite `unknown` being broader than everything.

A cast whose comment sits on an inner parenthesized sub-expression that is then
a member or argument of the outer cast's operand
(`/** @type {DOMException} */ (reader.error).message`) is skipped entirely,
since removing or unwrapping it would target the wrong expression.

A non-`const` tuple `@type` on an array literal
(`/** @type {['foo']} */ (['foo'])`) is never reported as redundant: the array
literal only takes the tuple type *from* the assertion (without it the literal
widens to `string[]`), so the assertion is doing real work even though the
contextually-typed expression echoes the asserted tuple straight back. This is
the pre-TypeScript-4.5 stand-in for a `const` assertion. Enable the
`preferConstToLiteralTuples` option to instead report such assertions when every
tuple element is a literal and (under `enableFixer`) rewrite them to the
equivalent, more concise `/** @type {const} */`.

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
          // If you need more aggressive testing and don't mind slower speed, set this
          //   property to a reasonable value
          // maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 500,
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
        preferConstToLiteralTuples: false,
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
|Options|`checkLiteralConstAssertions`, `enableFixer`, `preferConstToLiteralTuples`, `treatAnyAsRedundant`, `typesToIgnore`|

## Failing examples

<!-- assertions-failing noUnnecessaryTypeAssertion -->

## Passing examples

<!-- assertions-passing noUnnecessaryTypeAssertion -->
