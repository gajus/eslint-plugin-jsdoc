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
      ],
      output: `
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
           * @returns {number}
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Types are not permitted on @returns.'
        }
      ],
      output: `
          /**
           * @returns
           */
          function quux () {

          }
      `
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
