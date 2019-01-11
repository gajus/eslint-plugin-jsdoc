export default {
  invalid: [
    {
      code: `
          /**
           * @returns
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Present JSDoc @returns declaration but not available return expression in function.'
        }
      ]
    },
    {
      code: `
          /**
           * @return
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Present JSDoc @return declaration but not available return expression in function.'
        }
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            returns: 'return'
          }
        }
      }
    }
  ],
  valid: [
    {
      code: `
          /**
           * @returns Foo.
           */
          function quux () {

            return foo;
          }
      `
    },
    {
      code: `
          /**
           * @returns {void} Foo.
           */
          function quux () {

            return foo;
          }
      `
    },
    {
      code: `
          /**
           * @returns {undefined} Foo.
           */
          function quux () {

            return foo;
          }
      `
    },
    {
      code: `
          /**
           *
           */
          function quux () {
          }
      `
    }
  ]
};
