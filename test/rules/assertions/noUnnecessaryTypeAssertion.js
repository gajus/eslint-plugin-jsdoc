import {
  parser as typescriptEslintParser,
} from 'typescript-eslint';

const languageOptions = {
  parser: typescriptEslintParser,
  parserOptions: {
    projectService: {
      allowDefaultProject: [
        '*.js',
      ],
    },
    tsconfigRootDir: import.meta.dirname,
  },
};

export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
        /**
         * @type {5}
         */
        const a = 5;
      `,
      errors: [
        {
          line: 3,
          message: 'The @type tag declaring "5" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      output: `
        const a = 5;
      `,
    },
    {
      code: `
        /**
         * This is a special comment.
         * @type {5}
         */
        const a = 5;
      `,
      errors: [
        {
          line: 4,
          message: 'The @type tag declaring "5" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      output: `
        /**
         * This is a special comment.
         */
        const a = 5;
      `,
    },
    {
      code: `
        /**
         * @type {string}
         */
        const a = 'hello';
      `,
      errors: [
        {
          line: 3,
          message: 'The @type tag declaring "string" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      output: `
        const a = 'hello';
      `,
    },
    {
      code: `
        /**
         * @type {string}
         */
        const a = 'hello';
      `,
      errors: [
        {
          line: 3,
          message: 'The @type tag declaring "string" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      options: [
        {
          typesToIgnore: [
            'number', 'boolean',
          ],
        },
      ],
      output: `
        const a = 'hello';
      `,
    },
    {
      code: `
        /**
         * @type {const}
         */
        const a = 'hello';
      `,
      errors: [
        {
          line: 3,
          message: 'The @type tag declaring "const" is redundant as TypeScript infers it automatically for literals.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      options: [
        {
          checkLiteralConstAssertions: true,
        },
      ],
      output: `
        const a = 'hello';
      `,
    },
    {
      code: `
        /**
         * @type {const}
         */
        const a = true;
      `,
      errors: [
        {
          line: 3,
          message: 'The @type tag declaring "const" is redundant as TypeScript infers it automatically for literals.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      options: [
        {
          checkLiteralConstAssertions: true,
        },
      ],
      output: `
        const a = true;
      `,
    },
    {
      code: `
        /**
         * @param {"a"|15} b
         */
        function quux (b) {
          /**
           * @type {const}
           */
          const a = b;
        }
      `,
      errors: [
        {
          line: 7,
          message: 'The @type tag declaring "const" is redundant as TypeScript infers it automatically for literals.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      options: [
        {
          checkLiteralConstAssertions: true,
        },
      ],
      output: `
        /**
         * @param {"a"|15} b
         */
        function quux (b) {
          const a = b;
        }
      `,
    },
    {
      code: `
        /**
         * @param {true} a
         */
        function quux (a) {
          /**
           * @type {boolean}
           */
          const b = a;
        }
      `,
      errors: [
        {
          line: 7,
          message: 'The @type tag declaring "boolean" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      output: `
        /**
         * @param {true} a
         */
        function quux (a) {
          const b = a;
        }
      `,
    },
    {
      code: `
        const a = /** @type {any} */ (5);
        /**
         * @type {any}
         */
        const b = a;
      `,
      errors: [
        {
          line: 2,
          message: 'The @type tag declaring "any" is redundant as TypeScript infers it automatically.',
        },
        {
          line: 4,
          message: 'The @type tag declaring "any" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      options: [
        {
          treatAnyAsRedundant: true,
        },
      ],
      output: `
        const a = 5;
        const b = a;
      `,
    },
    {
      code: `
        const a = /** @type {5} */ (5);
      `,
      errors: [
        {
          line: 2,
          message: 'The @type tag declaring "5" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      output: `
        const a = 5;
      `,
    },
    {
      code: `
        const a = /** @type {boolean} */ (true);
        /**
         * @type {true}
         */
        const b = a;
      `,
      errors: [
        {
          line: 2,
          message: 'The @type tag declaring "boolean" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      output: `
        const a = true;
        /**
         * @type {true}
         */
        const b = a;
      `,
    },
    {
      code: `
        foo(/** @type {number[]} */ ([1, 2]));
      `,
      errors: [
        {
          line: 2,
          message: 'The @type tag declaring "number[]" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      output: `
        foo([1, 2]);
      `,
    },
    {
      code: `
        const d = /** @type {Date} */ (new Date());
      `,
      errors: [
        {
          line: 2,
          message: 'The @type tag declaring "Date" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      output: `
        const d = new Date();
      `,
    },
    {
      code: `
        const u = /** @type {unknown} */ (5);
      `,
      errors: [
        {
          line: 2,
          message: 'The @type tag declaring "unknown" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      output: `
        const u = 5;
      `,
    },
    {
      code: `
        let a;
        a = /** @type {5} */ (5);
      `,
      errors: [
        {
          line: 3,
          message: 'The @type tag declaring "5" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      output: `
        let a;
        a = 5;
      `,
    },
    {
      code: `
        const a = /** @type {const} */ (5);
      `,
      errors: [
        {
          line: 2,
          message: 'The @type tag declaring "const" is redundant as TypeScript infers it automatically for literals.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      options: [
        {
          checkLiteralConstAssertions: true,
        },
      ],
      output: `
        const a = 5;
      `,
    },
    {
      code: `
        const arr = [1];
        arr[/** @type {0} */ (0)];
      `,
      errors: [
        {
          line: 3,
          message: 'The @type tag declaring "0" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
    },
    {
      code: `
        const a = globalThis.b ? /** @type {5} */ (5) : 6;
      `,
      errors: [
        {
          line: 2,
          message: 'The @type tag declaring "5" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      output: `
        const a = globalThis.b ? 5 : 6;
      `,
    },
    {
      code: `
        const a = /** @type {5} */ (5);
      `,
      errors: [
        {
          line: 2,
          message: 'The @type tag declaring "5" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      options: [
        {
          enableFixer: false,
        },
      ],
    },
    {
      code: `
        /** @type {{prop: string}} */
        const mapPaths = {prop: "text"};
      `,
      errors: [
        {
          line: 2,
          message: 'The @type tag declaring "{prop: string}" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      output: `
        const mapPaths = {prop: "text"};
      `,
    },
    {
      code: `
        /** @type {string} */
        const a = 'x', b = 2;
      `,
      errors: [
        {
          line: 2,
          message: 'The @type tag declaring "string" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      output: `
        const a = 'x', b = 2;
      `,
    },
    {
      code: `
        /**
         * Keep me.
         * @type {string}
         */
        const a = 'hello';
      `,
      errors: [
        {
          line: 4,
          message: 'The @type tag declaring "string" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      output: `
        /**
         * Keep me.
         */
        const a = 'hello';
      `,
    },
    {
      code: `
        /**
         * @type {string}
         */
        const a = 'hello';
      `,
      errors: [
        {
          line: 3,
          message: 'The @type tag declaring "string" is redundant as TypeScript infers it automatically.',
        },
      ],
      filename: 'dummy.js',
      languageOptions,
      options: [
        {
          enableFixer: false,
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * @param {boolean} a
         */
        function quux (a) {
          /**
           * @type {true}
           */
          const b = a;
        }
      `,
      filename: 'dummy.js',
      languageOptions,
    },
    {
      code: `
        const a = /** @type {string} */ (5);
      `,
      filename: 'dummy.js',
      languageOptions,
    },
    {
      code: `
        const a = /** @type {any} */ (5);
      `,
      filename: 'dummy.js',
      languageOptions,
    },
    {
      code: `
        const a = /** @type {5} */ (5);
      `,
      filename: 'dummy.js',
      languageOptions,
      options: [
        {
          typesToIgnore: [
            '5',
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @type {() => void}
         */
        function quux () {}
      `,
      filename: 'dummy.js',
      languageOptions,
    },
    {
      code: `
        let a = /** @type {5} */ (5);
      `,
      filename: 'dummy.js',
      languageOptions,
    },
    {
      code: `
        let a = /** @type {const} */ (5);
      `,
      filename: 'dummy.js',
      languageOptions,
      options: [
        {
          checkLiteralConstAssertions: true,
        },
      ],
    },
    {
      code: `
        foo(/** @type {const} */ (5));
      `,
      filename: 'dummy.js',
      languageOptions,
      options: [
        {
          checkLiteralConstAssertions: true,
        },
      ],
    },
    {
      code: `
        const f = () => /** @type {const} */ (5);
      `,
      filename: 'dummy.js',
      languageOptions,
      options: [
        {
          checkLiteralConstAssertions: true,
        },
      ],
    },
    {
      code: `
        /**
         * @type {string}
         */
        const a = 5;
      `,
      filename: 'dummy.js',
      languageOptions,
    },
    {
      code: `
        /**
         * @type {any}
         */
        const a = 5;
      `,
      filename: 'dummy.js',
      languageOptions,
    },
    {
      code: `
        const a = /** @type {any} */ (5);
        /**
         * @type {any}
         */
        const b = a;
      `,
      filename: 'dummy.js',
      languageOptions,
      options: [
        {
          treatAnyAsRedundant: false,
        },
      ],
    },
    {
      code: `
        /**
         * @type {const}
         */
        const a = 'hello';
      `,
      filename: 'dummy.js',
      languageOptions,
      options: [
        {
          checkLiteralConstAssertions: false,
        },
      ],
    },
    {
      code: `
        /**
         * @type {string}
         */
        const a = 'hello';
      `,
      filename: 'dummy.js',
      languageOptions,
      options: [
        {
          typesToIgnore: [
            'number', 'string',
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @param {string} b
         */
        function quux (b) {
          /**
           * @type {const}
           */
          const a = b;
        }
      `,
      filename: 'dummy.js',
      languageOptions,
      options: [
        {
          checkLiteralConstAssertions: true,
        },
      ],
    },
    {
      code: `
        /** @type {string[]} */
        const mapPaths = [];
      `,
      filename: 'dummy.js',
      languageOptions,
    },
    {
      code: `
        /** @type {{prop?: string}} */
        const mapPaths = {};
      `,
      filename: 'dummy.js',
      languageOptions,
    },
    {
      code: `
        /** @type {{prop?: string}} */
        const mapPaths = {prop: "text"};
      `,
      filename: 'dummy.js',
      languageOptions,
    },
    {
      code: `
        /** @type {string} */
        const a = 5, b = 'x';
      `,
      filename: 'dummy.js',
      languageOptions,
    },
    {
      code: `
        /**
         * @param {string} sel
         * @returns {HTMLElement[]}
         */
        const $$ = (sel) => [...(/** @type {NodeListOf<HTMLElement>} */ (
          document.querySelectorAll(sel)
        ))];
      `,
      filename: 'dummy.js',
      languageOptions,
    },
    {
      code: `
        /**
         * @param {string} sel
         */
        const q = (sel) => {
          /** @type {NodeListOf<HTMLElement>} */
          const els = document.querySelectorAll(sel);
          return els;
        };
      `,
      filename: 'dummy.js',
      languageOptions,
    },
    {
      code: `
        const p = /** @type {Promise<number>} */ (Promise.resolve(5));
      `,
      filename: 'dummy.js',
      languageOptions,
    },
    {
      code: `
        const m = /** @type {Map<string, number>} */ (new Map());
      `,
      filename: 'dummy.js',
      languageOptions,
    },
    {
      code: `
        let match = null;
        // ...
        const mtch = /** @type {RegExpMatchArray} */ (
          /** @type {unknown} */ (match)
        );
      `,
      filename: 'dummy.js',
      languageOptions,
    },
    {
      code: `
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
      `,
      filename: 'dummy.js',
      languageOptions,
    },
    {
      code: `
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
      `,
      filename: 'dummy.js',
      languageOptions,
    },
  ],
});

