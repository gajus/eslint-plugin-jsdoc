export default {
  invalid: [
    {
      code: `
          /**
           * Foo.
           *
           * Foo.
           * @foo
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'There must be a newline after the description of the JSDoc block.',
        },
      ],
      options: [
        'always',
      ],
      output: `
          /**
           * Foo.
           *
           * Foo.
           *
           * @foo
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo.
           * @foo
           *
           * Foo.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'There must be a newline after the description of the JSDoc block.',
        },
      ],
      options: [
        'always',
      ],
      output: `
          /**
           * Foo.
           *
           * @foo
           *
           * Foo.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo.
           *
           * Foo.
           * @foo
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'There must be a newline after the description of the JSDoc block.',
        },
      ],
      output: `
          /**
           * Foo.
           *
           * Foo.
           *
           * @foo
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Bar.
           *
           * Bar.
           *
           * @bar
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 6,
          message: 'There must be no newline after the description of the JSDoc block.',
        },
      ],
      options: [
        'never',
      ],
      output: `
          /**
           * Bar.
           *
           * Bar.
           * @bar
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Bar.
           *
           * @bar
           *
           * Bar.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'There must be no newline after the description of the JSDoc block.',
        },
      ],
      options: [
        'never',
      ],
      output: `
          /**
           * Bar.
           * @bar
           *
           * Bar.
           */
          function quux () {

          }
      `,
    },
    {
      code: `\r
          /**\r
           * Bar.\r
           *\r
           * Bar.\r
           *\r
           * @bar\r
           */\r
          function quux () {\r
\r
          }\r
      `,
      errors: [
        {
          line: 6,
          message: 'There must be no newline after the description of the JSDoc block.',
        },
      ],
      options: [
        'never',
      ],
      output: `\r
          /**\r
           * Bar.\r
           *\r
           * Bar.\r
           * @bar\r
           */\r
          function quux () {\r
\r
          }\r
      `,
    },
    {
      code: `
        /**
         * A.
         *
         * @typedef {object} A
         * @prop {boolean} a A.
         */
      `,
      errors: [
        {
          line: 4,
          message: 'There must be no newline after the description of the JSDoc block.',
        },
      ],
      options: [
        'never',
      ],
      output: `
        /**
         * A.
         * @typedef {object} A
         * @prop {boolean} a A.
         */
      `,
    },
    {
      code: `
        /**
         * A.
         * @typedef {object} A
         * @prop {boolean} a A.
         */
      `,
      errors: [
        {
          line: 3,
          message: 'There must be a newline after the description of the JSDoc block.',
        },
      ],
      options: [
        'always',
      ],
      output: `
        /**
         * A.
         *
         * @typedef {object} A
         * @prop {boolean} a A.
         */
      `,
    },
    {
      code: `\r
      /**\r
       * Service for fetching symbols.\r
       * @param {object} $http - Injected http helper.\r
       * @param {object} $q - Injected Promise api helper.\r
       * @param {object} $location - Injected window location object.\r
       * @param {object} REPORT_DIALOG_CONSTANTS - Injected handle.\r
       */\r
      `,
      errors: [
        {
          line: 3,
          message: 'There must be a newline after the description of the JSDoc block.',
        },
      ],
      output: `\r
      /**\r
       * Service for fetching symbols.\r
       *\r
       * @param {object} $http - Injected http helper.\r
       * @param {object} $q - Injected Promise api helper.\r
       * @param {object} $location - Injected window location object.\r
       * @param {object} REPORT_DIALOG_CONSTANTS - Injected handle.\r
       */\r
      `,
    },
    {
      code: `\r\n
      /**\r\n
       * Service for fetching symbols.\r\n
       * @param {object} $http - Injected http helper.\r\n
       * @param {object} $q - Injected Promise api helper.\r\n
       * @param {object} $location - Injected window location object.\r\n
       * @param {object} REPORT_DIALOG_CONSTANTS - Injected handle.\r\n
       */\r\n
      `,
      errors: [
        {
          line: 3,
          message: 'There must be a newline after the description of the JSDoc block.',
        },
      ],
      output: `\r\n
      /**\r\n
       * Service for fetching symbols.\r\n
       *\r\n
       * @param {object} $http - Injected http helper.\r\n
       * @param {object} $q - Injected Promise api helper.\r\n
       * @param {object} $location - Injected window location object.\r\n
       * @param {object} REPORT_DIALOG_CONSTANTS - Injected handle.\r\n
       */\r\n
      `,
    },
    {
      code: `
      /** An example function.
       *
       * @returns {number} An example number.
       */
      function example() {
        return 42;
      }
      `,
      errors: [
        {
          line: 3,
          message: 'There must be no newline after the description of the JSDoc block.',
        },
      ],
      options: [
        'never',
      ],
      output: `
      /** An example function.
       * @returns {number} An example number.
       */
      function example() {
        return 42;
      }
      `,
    },
    {
      code: `
      /** An example function.
       * @returns {number} An example number.
       */
      function example() {
        return 42;
      }
      `,
      errors: [
        {
          line: 2,
          message: 'There must be a newline after the description of the JSDoc block.',
        },
      ],
      options: [
        'always',
      ],
      output: `
      /** An example function.
       *
       * @returns {number} An example number.
       */
      function example() {
        return 42;
      }
      `,
    },
  ],
  valid: [
    {
      code: `
          /**
           * Foo.
           */
          function quux () {

          }
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
          /**
           * Bar.
           */
          function quux () {

          }
      `,
      options: [
        'never',
      ],
    },
    {
      code: `
          /**
           * Foo.
           *
           * @foo
           */
          function quux () {

          }
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
          /**
           * Bar.
           * @bar
           */
          function quux () {

          }
      `,
      options: [
        'never',
      ],
    },
    {
      code: `\r
      /**\r
       * @foo\r
       * Test\u00A0\r
       * abc\u00A0\r
       * @bar\u00A0\r
       */\r
      `,
    },
    {
      code: `\r
      /**\r
       * \r
       * @foo\r
       * Test\u00A0\r
       * abc\u00A0\r
       * @bar\u00A0\r
       */\r
      `,
    },
    {
      code: `
      /***
       *
       */
      function quux () {

      }`,
      options: [
        'always',
      ],
    },
    {
      // https://github.com/gajus/eslint-plugin-jsdoc/issues/437
      code: `
      /**\r
       * Parses query string to object containing URL parameters\r
       * \r
       * @param queryString\r
       * Input string\r
       * \r
       * @returns\r
       * Object containing URL parameters\r
       */\r
      export function parseQueryString(queryString: string): { [key: string]: string } {    // <-- Line 10 that fails\r
\r
      }\r
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
      /** An example function.
       *
       * @returns {number} An example number.
       */
      function example() {
        return 42;
      }
      `,
    },
    {
      code: `
      /** An example function.
       * @returns {number} An example number.
       */
      function example() {
        return 42;
      }
      `,
      options: [
        'never',
      ],
    },
  ],
};
