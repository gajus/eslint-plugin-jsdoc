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
    },
  ],
  valid: [
    {
      code: `
        const a = /** @type {boolean} */ (true);
        /**
         * @type {true}
         */
        const b = a;
      `,
      filename: 'dummy.js',
      languageOptions,
    },
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
  ],
});

