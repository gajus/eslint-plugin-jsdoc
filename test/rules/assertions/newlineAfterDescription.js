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
         * @typedef {Object} A
         * @prop {boolean} a A.
         */
      `,
      errors: [
        {
          message: 'There must be no newline after the description of the JSDoc block.',
        },
      ],
      options: [
        'never',
      ],
      output: `
        /**
         * A.
         * @typedef {Object} A
         * @prop {boolean} a A.
         */
      `,
    },
    {
      code: `
        /**
         * A.
         * @typedef {Object} A
         * @prop {boolean} a A.
         */
      `,
      errors: [
        {
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
         * @typedef {Object} A
         * @prop {boolean} a A.
         */
      `,
    },
    {
      code: `\r
      /**\r
       * Service for fetching symbols.\r
       * @param {Object} $http - Injected http helper.\r
       * @param {Object} $q - Injected Promise api helper.\r
       * @param {Object} $location - Injected window location object.\r
       * @param {Object} REPORT_DIALOG_CONSTANTS - Injected handle.\r
       */\r
      `,
      errors: [
        {
          message: 'There must be a newline after the description of the JSDoc block.',
        },
      ],
      output: `\r
      /**\r
       * Service for fetching symbols.\r
       *\r
       * @param {Object} $http - Injected http helper.\r
       * @param {Object} $q - Injected Promise api helper.\r
       * @param {Object} $location - Injected window location object.\r
       * @param {Object} REPORT_DIALOG_CONSTANTS - Injected handle.\r
       */\r
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
       * Test\u00a0\r
       * abc\u00a0\r
       * @bar\u00a0\r
       */\r
      `,
    },
    {
      code: `\r
      /**\r
       * \r
       * @foo\r
       * Test\u00a0\r
       * abc\u00a0\r
       * @bar\u00a0\r
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
  ],
};
