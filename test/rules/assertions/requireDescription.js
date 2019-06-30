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
          contexts: ['ClassDeclaration']
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
          ]
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
    },
    {
      code: `
          /**
           * @someDesc
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @someDesc description.'
        }
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            description: {
              message: 'Please avoid `{{tagName}}`; use `{{replacement}}` instead',
              replacement: 'someDesc'
            }
          }
        }
      }
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
          message: 'Unexpected tag `@description`'
        }
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            description: false
          }
        }
      }
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
          contexts: ['ClassDeclaration']
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
      `
    }
  ]
};
