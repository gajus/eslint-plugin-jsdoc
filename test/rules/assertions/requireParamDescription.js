/* eslint-disable no-restricted-syntax */

export default {
  invalid: [
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" description.'
        }
      ]
    },
    {
      code: `
          /**
           * @arg foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @arg "foo" description.'
        }
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: 'arg'
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
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * @param foo Foo.
           */
          function quux (foo) {

          }
      `
    }
  ]
};
