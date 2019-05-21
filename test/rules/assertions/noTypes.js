export default {
  invalid: [
    {
      code: `
          /**
           * @param {number} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Types are not permitted on @param.'
        }
      ]
    },
    {
      code: `
          /**
           * @returns {number}
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Types are not permitted on @returns.'
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
    }
  ]
};
