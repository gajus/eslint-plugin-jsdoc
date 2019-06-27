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
          line: 3,
          message: 'Syntax error in type: Array<string'
        }
      ]
    },
    {
      code: `
          /**
           * @memberof module:namespace.SomeClass<~
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in type: module:namespace.SomeClass<~'
        }
      ]
    },
    {
      code: `
          /**
           * @memberof module:namespace.SomeClass~<
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in type: module:namespace.SomeClass~<'
        }
      ]
    },
    {
      code: `
          /**
           * @borrows foo% as bar
           */
          function quux() {

          }
      `,
      errors: [{
        line: 3,
        message: 'Syntax error in type: foo%'
      }]
    },
    {
      code: `
          /**
           * @borrows #foo as bar
           */
          function quux() {

          }
      `,
      errors: [{
        line: 3,
        message: 'Syntax error in type: #foo'
      }]
    },
    {
      code: `
          /**
           * @borrows foo as bar%
           */
          function quux() {

          }
      `,
      errors: [{
        line: 3,
        message: 'Syntax error in type: bar%'
      }]
    },
    {
      code: `
          /**
           * @borrows foo
           */
          function quux() {

          }
      `,
      errors: [{
        line: 3,
        message: '@borrows must have an "as" expression. Found ""'
      }]
    },
    {
      code: `
          /**
           * @see foo%
           */
          function quux() {

          }
      `,
      errors: [{
        line: 3,
        message: 'Syntax error in type: foo%'
      }],
      settings: {
        jsdoc: {
          checkSeesForNamepaths: true
        }
      }
    },
    {
      code: `
          /**
           * @alias module:abc#event:foo-bar
           */
          function quux() {

          }
      `,
      errors: [{
        line: 3,
        message: 'Syntax error in type: module:abc#event:foo-bar'
      }]
    },
    {
      code: `
          /**
           * @mixes module:namespace.SomeClass~
           */
          function quux() {

          }
      `,
      errors: [{
        line: 3,
        message: 'Syntax error in type: module:namespace.SomeClass~'
      }]
    },
    {
      code: `
          /**
           * @callback
           */
          function quux() {

          }
      `,
      errors: [{
        line: 3,
        message: 'Syntax error in type: '
      }],
      settings: {
        jsdoc: {
          allowEmptyNamepaths: false
        }
      }
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
    },
    {
      code: `
          /**
           * @borrows foo as bar
           */
          function quux() {

          }
      `
    },
    {
      code: `
          /**
           * @borrows foo as #bar
           */
          function quux() {

          }
      `
    },
    {
      code: `
          /**
           * @see foo%
           */
          function quux() {

          }
      `
    },
    {
      code: `
          /**
           * @alias module:namespace.SomeClass#event:ext_anevent
           */
          function quux() {

          }
      `
    },
    {
      code: `
          /**
           * @callback
           */
          function quux() {

          }
      `
    },
    {
      code: `
          /**
           * @class
           */
          function quux() {

          }
      `
    },
    {
      code: `
          /**
           * @see {@link foo}
           */
          function quux() {

          }
      `
    },
    {
      code: `
          /**
           *
           * @fires {module:namespace.SomeClass#event:ext_anevent}
           */
          function quux() {

          }
      `
    },
    {
      code: `
          /**
           * @memberof module:namespace.SomeClass~
           */
          function quux() {

          }
      `
    },
    {
      code: `
          /**
           * @memberof! module:namespace.SomeClass.
           */
          function quux() {

          }
      `
    },
    {
      code: `
          /**
           *
           */
          function quux() {

          }
      `
    }
  ]
};
