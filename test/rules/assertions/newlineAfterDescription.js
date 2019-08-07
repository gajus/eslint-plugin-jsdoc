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
  ],
};
