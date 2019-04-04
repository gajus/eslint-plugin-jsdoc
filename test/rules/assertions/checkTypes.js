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
          line: 3,
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
          line: 3,
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
    },
    {
      code: `
          /**
           * @param {(Number|string|Boolean)=} foo
           */
          function quux (foo, bar, baz) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Number".'
        },
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Boolean".'
        }
      ],
      output: `
          /**
           * @param {(number|string|boolean)=} foo
           */
          function quux (foo, bar, baz) {

          }
      `
    },
    {
      code: `
          /**
           * @param {Array<Number|String>} foo
           */
          function quux (foo, bar, baz) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Number".'
        },
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "String".'
        }
      ],
      output: `
          /**
           * @param {Array<number|string>} foo
           */
          function quux (foo, bar, baz) {

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
    },
    {
      code: `
          /**
           * @param {(number|string|boolean)=} foo
           */
          function quux (foo, bar, baz) {

          }
      `
    },
    {
      code: `
          /**
           * @param {typeof bar} foo
           */
          function qux(foo) {
          }
      `
    },
    {
      code: `
          /**
           * @param {import('./foo').bar.baz} foo
           */
          function qux(foo) {
          }
      `
    },
    {
      code: `
          /**
           * @param {(x: number, y: string) => string} foo
           */
          function qux(foo) {
          }
      `
    },
    {
      code: `
          /**
           * @param {() => string} foo
           */
          function qux(foo) {
          }
      `
    },
  ]
};
