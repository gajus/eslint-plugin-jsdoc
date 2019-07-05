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
          line: 3,
          message: 'Missing JSDoc @returns description.'
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
          line: 3,
          message: 'Missing JSDoc @return description.'
        }
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            returns: 'return'
          }
        }
      }
    },
    {
      code: `
          /**
           * @returns
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Unexpected tag `@returns`'
        }
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            returns: false
          }
        }
      }
    }
  ],
  valid: [
    {
      code: `
          /**
           *
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * @returns Foo.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * @returns {undefined}
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * @returns {void}
           */
          function quux () {

          }
      `
    }
  ]
};
