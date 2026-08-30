<a name="user-content-no-unnecessary-type-assertion"></a>
<a name="no-unnecessary-type-assertion"></a>
# <code>no-unnecessary-type-assertion</code>

JavaScript-based TypeScript type assertions (`@type`) are helpful when you have TypeScript running against JavaScript files with the `checkJs`/`allowJs` options. However,
they become redundant when the type is equal to or more broad than the type which
TypeScript infers for the expression.

Currently only supports `VariableDeclaration`.

The fixer removes the redundant `@type` tag, deleting the whole JSDoc block if
nothing else is left in it.

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

<a name="user-content-no-unnecessary-type-assertion-options"></a>
<a name="no-unnecessary-type-assertion-options"></a>
## Options

A single options object has the following properties.

<a name="user-content-no-unnecessary-type-assertion-options-checkliteralconstassertions"></a>
<a name="no-unnecessary-type-assertion-options-checkliteralconstassertions"></a>
### <code>checkLiteralConstAssertions</code>

Whether to check `const` type assertions as redundant

<a name="user-content-no-unnecessary-type-assertion-options-enablefixer"></a>
<a name="no-unnecessary-type-assertion-options-enablefixer"></a>
### <code>enableFixer</code>

Whether to enable the fixer that removes the redundant `@type` tag (and the JSDoc block if it becomes empty). Defaults to `true`.

<a name="user-content-no-unnecessary-type-assertion-options-treatanyasredundant"></a>
<a name="no-unnecessary-type-assertion-options-treatanyasredundant"></a>
### <code>treatAnyAsRedundant</code>

Whether to treat `any` type casts as redundant

<a name="user-content-no-unnecessary-type-assertion-options-typestoignore"></a>
<a name="no-unnecessary-type-assertion-options-typestoignore"></a>
### <code>typesToIgnore</code>

An array list of types to ignore


|||
|---|---|
|Context|`VariableDeclaration`|
|Tags|`type`|
|Recommended|false|
|Options|`checkLiteralConstAssertions`, `enableFixer`, `treatAnyAsRedundant`, `typesToIgnore`|

<a name="user-content-no-unnecessary-type-assertion-failing-examples"></a>
<a name="no-unnecessary-type-assertion-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @type {5}
 */
const a = 5;
// Message: The @type tag declaring "5" is redundant as TypeScript infers it automatically.

/**
 * This is a special comment.
 * @type {5}
 */
const a = 5;
// Message: The @type tag declaring "5" is redundant as TypeScript infers it automatically.

/**
 * @type {string}
 */
const a = 'hello';
// Message: The @type tag declaring "string" is redundant as TypeScript infers it automatically.

/**
 * @type {string}
 */
const a = 'hello';
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"typesToIgnore":["number","boolean"]}]
// Message: The @type tag declaring "string" is redundant as TypeScript infers it automatically.

/**
 * @type {const}
 */
const a = 'hello';
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":true}]
// Message: The @type tag declaring "const" is redundant as TypeScript infers it automatically for literals.

/**
 * @type {const}
 */
const a = true;
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":true}]
// Message: The @type tag declaring "const" is redundant as TypeScript infers it automatically for literals.

/**
 * @param {"a"|15} b
 */
function quux (b) {
  /**
   * @type {const}
   */
  const a = b;
}
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":true}]
// Message: The @type tag declaring "const" is redundant as TypeScript infers it automatically for literals.

/**
 * @param {true} a
 */
function quux (a) {
  /**
   * @type {boolean}
   */
  const b = a;
}
// Message: The @type tag declaring "boolean" is redundant as TypeScript infers it automatically.

const a = /** @type {any} */ (5);
/**
 * @type {any}
 */
const b = a;
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"treatAnyAsRedundant":true}]
// Message: The @type tag declaring "any" is redundant as TypeScript infers it automatically.

/** @type {{prop: string}} */
const mapPaths = {prop: "text"};
// Message: The @type tag declaring "{prop: string}" is redundant as TypeScript infers it automatically.

/**
 * Keep me.
 * @type {string}
 */
const a = 'hello';
// Message: The @type tag declaring "string" is redundant as TypeScript infers it automatically.

/**
 * @type {string}
 */
const a = 'hello';
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"enableFixer":false}]
// Message: The @type tag declaring "string" is redundant as TypeScript infers it automatically.
````



<a name="user-content-no-unnecessary-type-assertion-passing-examples"></a>
<a name="no-unnecessary-type-assertion-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
const a = /** @type {boolean} */ (true);
/**
 * @type {true}
 */
const b = a;

/**
 * @param {boolean} a
 */
function quux (a) {
  /**
   * @type {true}
   */
  const b = a;
}

/**
 * @type {string}
 */
const a = 5;

/**
 * @type {any}
 */
const a = 5;

const a = /** @type {any} */ (5);
/**
 * @type {any}
 */
const b = a;
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"treatAnyAsRedundant":false}]

/**
 * @type {const}
 */
const a = 'hello';
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":false}]

/**
 * @type {string}
 */
const a = 'hello';
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"typesToIgnore":["number","string"]}]

/**
 * @param {string} b
 */
function quux (b) {
  /**
   * @type {const}
   */
  const a = b;
}
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":true}]

/** @type {string[]} */
const mapPaths = [];

/** @type {{prop?: string}} */
const mapPaths = {};

/** @type {{prop?: string}} */
const mapPaths = {prop: "text"};
````

