export default {
  invalid: [
    {
      code: `
          /***  foo */
          function quux () {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'There must be no indentation.',
        },
      ],
    },
    {
      code: `
          /**
           * foo
           *
           * @param bar
           *  baz
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 6,
          message: 'There must be no indentation.',
        },
      ],
    },
    {
      code: `
        /**
         * Foo
         *   bar
         */
        class Moo {}
      `,
      errors: [
        {
          line: 4,
          message: 'There must be no indentation.',
        },
      ],
    },
    {
      code: `
          /**
           * foo
           *
           * @example
           * function xFoo () {
           *   return 'foo';
           * }
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 7,
          message: 'There must be no indentation.',
        },
      ],
      options: [{
        excludeExamples: false,
      }],
    },
  ],
  valid: [
    {
      code: `
          /**
           * foo
           *
           * @param bar
           * baz
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /*** foo */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * foo
           *
           * @example
           * function xFoo () {
           *   return 'foo';
           * }
           */
          function quux () {

          }
      `,
      options: [{
        excludeExamples: true,
      }],
    },
  ],
};
