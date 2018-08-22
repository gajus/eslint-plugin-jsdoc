/* eslint-disable no-restricted-syntax */

export default {
  invalid: [
    {
      code: `
          /**
           *
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @example declaration.'
        }
      ]
    },
    {
      code: `
          /**
           * @example
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @example description.'
        }
      ]
    }
  ],
  valid: [
    {
      code: `
          /**
           * @example
           * // arbitrary example content
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * @example
           * quux(); // does something useful
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * @example <caption>Valid usage</caption>
           * quux(); // does something useful
           *
           * @example <caption>Invalid usage</caption>
           * quux('random unwanted arg'); // results in an error
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * @private
           */
          function quux () {
          }
      `
    },
  ]
};
