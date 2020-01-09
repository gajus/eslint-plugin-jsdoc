export default {
  invalid: [
    {
      code: `
          /*
           * @param foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Expected JSDoc-like comment to begin with two asterisks.',
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
          /*
           * @property foo
           */
      `,
      errors: [
        {
          line: 2,
          message: 'Expected JSDoc-like comment to begin with two asterisks.',
        },
      ],
      output: `
          /**
           * @property foo
           */
      `,
    },
  ],
  valid: [
    {
      code: `
          /**
           * @property foo
           */
      `,
    },
    {
      code: `
          /**
           * @param foo
           */
           function quux () {

           }
      `,
    },
    {
      code: `
      function quux () {

      }
      `,
    },
  ],
};
