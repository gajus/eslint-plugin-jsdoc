<a name="user-content-no-unnecessary-type-assertion"></a>
<a name="no-unnecessary-type-assertion"></a>
# <code>no-unnecessary-type-assertion</code>

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

<a name="user-content-no-unnecessary-type-assertion-options-preferconsttoliteraltuples"></a>
<a name="no-unnecessary-type-assertion-options-preferconsttoliteraltuples"></a>
### <code>preferConstToLiteralTuples</code>

Whether to report a non-`const` literal-tuple assertion on an array literal (e.g. `/** @type {['foo']} */ (['foo'])`) and fix it to the equivalent, more concise `/** @type {const} */` assertion. Defaults to `false`.

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
|Context|`VariableDeclaration`; inline `/** @type */` casts|
|Tags|`type`|
|Recommended|false|
|Options|`checkLiteralConstAssertions`, `enableFixer`, `preferConstToLiteralTuples`, `treatAnyAsRedundant`, `typesToIgnore`|

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

const a = /** @type {5} */ (5);
// Message: The @type tag declaring "5" is redundant as TypeScript infers it automatically.

const a = /** @type {boolean} */ (true);
/**
 * @type {true}
 */
const b = a;
// Message: The @type tag declaring "boolean" is redundant as TypeScript infers it automatically.

foo(/** @type {number[]} */ ([1, 2]));
// Message: The @type tag declaring "number[]" is redundant as TypeScript infers it automatically.

const d = /** @type {Date} */ (new Date());
// Message: The @type tag declaring "Date" is redundant as TypeScript infers it automatically.

const u = /** @type {unknown} */ (5);
// Message: The @type tag declaring "unknown" is redundant as TypeScript infers it automatically.

let a;
a = /** @type {5} */ (5);
// Message: The @type tag declaring "5" is redundant as TypeScript infers it automatically.

const a = /** @type {const} */ (5);
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":true}]
// Message: The @type tag declaring "const" is redundant as TypeScript infers it automatically for literals.

const arr = [1];
arr[/** @type {0} */ (0)];
// Message: The @type tag declaring "0" is redundant as TypeScript infers it automatically.

const a = globalThis.b ? /** @type {5} */ (5) : 6;
// Message: The @type tag declaring "5" is redundant as TypeScript infers it automatically.

const a = /** @type {5} */ (5);
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"enableFixer":false}]
// Message: The @type tag declaring "5" is redundant as TypeScript infers it automatically.

/** @type {{prop: string}} */
const mapPaths = {prop: "text"};
// Message: The @type tag declaring "{prop: string}" is redundant as TypeScript infers it automatically.

/** @type {string} */
const a = 'x', b = 2;
// Message: The @type tag declaring "string" is redundant as TypeScript infers it automatically.

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

const arr = /** @type {['foo']} */ (['foo']);
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"preferConstToLiteralTuples":true}]
// Message: The @type tag declaring "['foo']" is better written as the "const" assertion `/** @type {const} */` (TypeScript 4.5+).

/**
 * @type {['foo', 1]}
 */
const arr = ['foo', 1];
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"preferConstToLiteralTuples":true}]
// Message: The @type tag declaring "['foo', 1]" is better written as the "const" assertion `/** @type {const} */` (TypeScript 4.5+).

foo(/** @type {['foo']} */ (['foo']));
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"preferConstToLiteralTuples":true}]
// Message: The @type tag declaring "['foo']" is better written as the "const" assertion `/** @type {const} */` (TypeScript 4.5+).

const arr = /** @type {['foo']} */ (['foo']);
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"enableFixer":false,"preferConstToLiteralTuples":true}]
// Message: The @type tag declaring "['foo']" is better written as the "const" assertion `/** @type {const} */` (TypeScript 4.5+).
````



<a name="user-content-no-unnecessary-type-assertion-passing-examples"></a>
<a name="no-unnecessary-type-assertion-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {boolean} a
 */
function quux (a) {
  /**
   * @type {true}
   */
  const b = a;
}

const a = /** @type {string} */ (5);

const a = /** @type {any} */ (5);

const a = /** @type {5} */ (5);
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"typesToIgnore":["5"]}]

/**
 * @type {() => void}
 */
function quux () {}

let a = /** @type {5} */ (5);

let a = /** @type {const} */ (5);
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":true}]

foo(/** @type {const} */ (5));
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":true}]

const f = () => /** @type {const} */ (5);
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"checkLiteralConstAssertions":true}]

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

/** @type {string} */
const a = 5, b = 'x';

/**
 * @param {string} sel
 * @returns {HTMLElement[]}
 */
const $$ = (sel) => [...(/** @type {NodeListOf<HTMLElement>} */ (
  document.querySelectorAll(sel)
))];

/**
 * @param {string} sel
 */
const q = (sel) => {
  /** @type {NodeListOf<HTMLElement>} */
  const els = document.querySelectorAll(sel);
  return els;
};

const p = /** @type {Promise<number>} */ (Promise.resolve(5));

const m = /** @type {Map<string, number>} */ (new Map());

let match = null;
// ...
const mtch = /** @type {RegExpMatchArray} */ (
  /** @type {unknown} */ (match)
);

/**
 * @typedef {"Int8Array"|"Uint8Array"|"Uint8ClampedArray"|
 *   "Int16Array"|"Uint16Array"|"Int32Array"|"Uint32Array"|
 *   "Float32Array"|"Float64Array"|"BigInt64Array"|
 *   "BigUint64Array"} TypedArray
 */

/**
 * @param {string} s
 */
const parse = (s) => {
  const bufferSourceClass = 'someClass';
  const o = JSON.parse(s);
  return getTypedArray(
    /** @type {TypedArray} */ (o.typedArray ?? bufferSourceClass)
  );
};

/**
 * @param {string} s
 */
const setter = (s) => {
  const o = JSON.parse(s);
  typedArray.set(...(
    /**
     * @type {[
     *   array: Array<bigint> & Array<number>,
     *   offset?: number | undefined
     * ]}
     */ (o.set)
  ));
};

const reader = new FileReader();
reader.addEventListener(
  'error',
  async function () {
    await dialogs.alert(/** @type {string} */ (
      /** @type {DOMException} */ (reader.error).message
    ));
  }
);

const parsed = JSON.parse('{}');
const z = /** @type {string} */ (
  /** @type {{y: string}} */ (parsed).y
);

const aType = 'array';
const newType = /** @type {"arrayReference"|"objectReference"} */ (
  `${aType}Reference`
);

const aType = 'array';
/** @type {"arrayReference"|"objectReference"} */
const newType = `${aType}Reference`;

/** @type {{[key: (string|number)]: any}} */
const retObj = this.array && !this.record ? [] : {};

/** @type {({[key: string]: any})|any[]} */
const ret = someString === 'object' ? {} : [];

const list = /** @type {string[] | undefined} */ (
  Math.random() ? [] : undefined
);

const a = /* @type {number} */ (3 + 5);

const arr = /** @type {['foo']} */ (['foo']);

/**
 * @type {['foo']}
 */
const arr = ['foo'];

const arr = /** @type {[string]} */ (['foo']);
// "jsdoc/no-unnecessary-type-assertion": ["error"|"warn", {"preferConstToLiteralTuples":true}]
````

