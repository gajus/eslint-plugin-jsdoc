export default {
  invalid: [
    {
      code: `
          /**
           *
           */
          function quux (foo) {

            return foo;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.'
        }
      ]
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {

            return foo;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @return declaration.'
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
           *
           */
          function quux () {
          }
      `
    }
  ]
};
