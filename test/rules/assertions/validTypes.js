/* eslint-disable no-restricted-syntax */

export default {
  invalid: [
    {
      code: `
          /**
           * @param {Array<string} foo
           */
          function quux() {

          }
      `,
      errors: [
        {
          message: 'Syntax error in type: Array<string'
        }
      ]
    }
  ],
  valid: [
    {
      code: `
          /**
           * @param {Array<string>} foo
           */
          function quux() {

          }
      `
    },
    {
      code: `
          /**
           * @param {string} foo
           */
          function quux() {

          }
      `
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux() {
            
          }
      `
    }
  ]
};
