export default {
  invalid: [
    {
      code: `
          /**
           * @param {string=} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax should not be Google Closure Compiler style.',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
          /**
           * @param {string} [foo]
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {

          }
      `,
    },
  ],
};
