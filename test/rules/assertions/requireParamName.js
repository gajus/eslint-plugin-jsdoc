/* eslint-disable no-restricted-syntax */

export default {
  invalid: [
    {
      code: `
          /**
           * @param
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'There must be an identifier after @param type.'
        }
      ]
    },
    {
      code: `
          /**
           * @param {string}
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'There must be an identifier after @param tag.'
        }
      ]
    }
  ],
  valid: [
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * @param {string} foo
           */
          function quux (foo) {

          }
      `
    }
  ]
};
