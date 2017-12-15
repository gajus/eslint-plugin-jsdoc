/* eslint-disable no-restricted-syntax */

export default {
  invalid: [
    {
      code: `
          /**
           * @param {Number} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Invalid JSDoc @param "foo" type "Number".'
        }
      ],
      output: `
          /**
           * @param {number} foo
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * @arg {Number} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Invalid JSDoc @arg "foo" type "Number".'
        }
      ],
      output: `
          /**
           * @arg {number} foo
           */
          function quux (foo) {

          }
      `
    }
  ],
  valid: [
    {
      code: `
          /**
           * @param {number} foo
           * @param {Bar} bar
           * @param {*} baz
           */
          function quux (foo, bar, baz) {

          }
      `
    },
    {
      code: `
          /**
           * @arg {number} foo
           * @arg {Bar} bar
           * @arg {*} baz
           */
          function quux (foo, bar, baz) {

          }
      `
    }
  ]
};
