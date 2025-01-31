export default /** @type {import('../index.js').TestCases} */ ({
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
           * @param {string=} foo
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
    },
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
});
