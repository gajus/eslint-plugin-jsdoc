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
          message: 'Missing JSDoc @description declaration.'
        }
      ]
    },
    {
      code: `
          /**
           *
           */
          class quux {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @description declaration.'
        }
      ],
      options: [
        {
          contexts: 'ClassDeclaration'
        }
      ]
    },
    {
      code: `
          /**
           *
           */
          class quux {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @description declaration.'
        }
      ],
      options: [
        {
          contexts: 'ClassDeclaration',
          noDefaults: true
        }
      ]
    },
    {
      code: `
          /**
           *
           */
          class quux {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @description declaration.'
        }
      ],
      options: [
        {
          contexts: ['ClassDeclaration']
        }
      ]
    },
    {
      code: `
          /**
           * @description
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @description description.'
        }
      ]
    },
    {
      code: `
          /**
           *
           */
          interface quux {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @description declaration.'
        }
      ],
      options: [
        {
          contexts: [
            'TSInterfaceDeclaration'
          ],
          noDefaults: true
        }
      ],
      parser: require.resolve('@typescript-eslint/parser')
    },
    {
      code: `
          /**
           *
           */
          var quux = class {

          };
      `,
      errors: [
        {
          message: 'Missing JSDoc @description declaration.'
        }
      ],
      options: [
        {
          contexts: [
            'ClassExpression'
          ]
        }
      ]
    },
    {
      code: `
          /**
           *
           */
          var quux = {

          };
      `,
      errors: [
        {
          message: 'Missing JSDoc @description declaration.'
        }
      ],
      options: [
        {
          contexts: [
            'ObjectExpression'
          ]
        }
      ]
    }
  ],
  valid: [
    {
      code: `
          /**
           * @description
           * // arbitrary description content
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * @description
           * quux(); // does something useful
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * @description <caption>Valid usage</caption>
           * quux(); // does something useful
           *
           * @description <caption>Invalid usage</caption>
           * quux('random unwanted arg'); // results in an error
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           *
           */
          class quux {

          }
      `
    },
    {
      code: `
          /**
           *
           */
          function quux () {

          }
      `,
      options: [
        {
          noDefaults: true
        }
      ]
    },
    {
      code: `
          /**
           * @type {MyCallback}
           */
          function quux () {

          }
      `,
      options: [
        {
          exemptedBy: ['type']
        }
      ]
    },
    {
      code: `
          /**
           *
           */
          interface quux {

          }
      `,
      parser: require.resolve('@typescript-eslint/parser')
    },
    {
      code: `
          /**
           *
           */
          var quux = class {

          };
      `
    },
    {
      code: `
          /**
           *
           */
          var quux = {

          };
      `,
      errors: [
        {
          message: 'Missing JSDoc @description declaration.'
        }
      ],
      parser: require.resolve('@typescript-eslint/parser')
    }
  ]
};
