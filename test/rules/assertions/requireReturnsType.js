/* eslint-disable no-restricted-syntax */

export default {
  invalid: [
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
          line: 3,
          message: 'Missing JSDoc @returns type.'
        }
      ]
    },
    {
      code: `
          /**
           * @returns Foo.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @returns type.'
        }
      ]
    },
    {
      code: `
          /**
           * @return Foo.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @return type.'
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
           * @returns {number}
           */
          function quux () {

          }
      `
    }
  ]
};
