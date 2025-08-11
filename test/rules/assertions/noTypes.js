import {
  parser as typescriptEslintParser,
} from 'typescript-eslint';

export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
          /**
           * @param {number} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Types are not permitted on @param.',
        },
      ],
      output: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
      class quux {
        /**
         * @param {number} foo
         */
        bar (foo) {

        }
      }
      `,
      errors: [
        {
          line: 4,
          message: 'Types are not permitted on @param.',
        },
      ],
      output: `
      class quux {
        /**
         * @param foo
         */
        bar (foo) {

        }
      }
      `,
    },
    {
      code: `
          /**
           * @param {number} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Types are not permitted on @param.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
      output: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
      class quux {
        /**
         * @param {number} foo
         */
        quux (foo) {

        }
      }
      `,
      errors: [
        {
          line: 4,
          message: 'Types are not permitted on @param.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
      output: `
      class quux {
        /**
         * @param foo
         */
        quux (foo) {

        }
      }
      `,
    },
    {
      code: `
          /**
           * @function
           * @param {number} foo
           */
      `,
      errors: [
        {
          line: 4,
          message: 'Types are not permitted on @param.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
      output: `
          /**
           * @function
           * @param foo
           */
      `,
    },
    {
      code: `
          /**
           * @callback
           * @param {number} foo
           */
      `,
      errors: [
        {
          line: 4,
          message: 'Types are not permitted on @param.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
      output: `
          /**
           * @callback
           * @param foo
           */
      `,
    },
    {
      code: `
          /**
           * @returns {number}
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Types are not permitted on @returns.',
        },
      ],
      output: `
          /**
           * @returns
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Beep
           * Boop
           *
           * @returns {number}
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 6,
          message: 'Types are not permitted on @returns.',
        },
      ],
      output: `
          /**
           * Beep
           * Boop
           *
           * @returns
           */
          function quux () {

          }
      `,
    },
    {
      code: `
        export interface B {
          /**
           * @param {string} paramA
           */
          methodB(paramB: string): void
        }
      `,
      errors: [
        {
          line: 4,
          message: 'Types are not permitted on @param.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      output: `
        export interface B {
          /**
           * @param paramA
           */
          methodB(paramB: string): void
        }
      `,
    },
    {
      code: `
        /**
         * @class
         * @property {object} x
         */
        class Example {
          x: number;
        }
      `,
      errors: [
        {
          line: 4,
          message: 'Types are not permitted on @property in the supplied context.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      output: `
        /**
         * @class
         * @property x
         */
        class Example {
          x: number;
        }
      `,
    },
    {
      code: `
        /**
         * Returns a Promise...
         *
         * @param {number} ms - The number of ...
         */
        const sleep = (ms: number): Promise<unknown> => {};
      `,
      errors: [
        {
          line: 5,
          message: 'Types are not permitted on @param.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
      output: `
        /**
         * Returns a Promise...
         *
         * @param ms - The number of ...
         */
        const sleep = (ms: number): Promise<unknown> => {};
      `,
    },
    {
      code: `
        /**
         * Returns a Promise...
         *
         * @param {number} ms - The number of ...
         */
        export const sleep = (ms: number): Promise<unknown> => {};
      `,
      errors: [
        {
          line: 5,
          message: 'Types are not permitted on @param.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
      output: `
        /**
         * Returns a Promise...
         *
         * @param ms - The number of ...
         */
        export const sleep = (ms: number): Promise<unknown> => {};
      `,
    },
  ],
  valid: [
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           */
      `,
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * @function
           * @param {number} foo
           */
      `,
    },
    {
      code: `
          /**
           * @callback
           * @param {number} foo
           */
      `,
    },
    {
      code: `
        /*** Oops that's too many asterisks by accident **/
        function a () {}
      `,
    },
  ],
});
