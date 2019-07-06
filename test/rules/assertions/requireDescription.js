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
      ],
      options: [
        {
          descriptionStyle: 'tag'
        }
      ]
    },
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
          message: 'Missing JSDoc block description or @description declaration.'
        }
      ],
      options: [
        {
          descriptionStyle: 'any'
        }
      ]
    },
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
          message: 'Missing JSDoc block description.'
        }
      ],
      options: [
        {
          descriptionStyle: 'body'
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
          contexts: ['ClassDeclaration'],
          descriptionStyle: 'tag'
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
          contexts: ['ClassDeclaration'],
          descriptionStyle: 'tag'
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
          contexts: ['ClassDeclaration'],
          descriptionStyle: 'tag'
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
      ],
      options: [
        {
          descriptionStyle: 'tag'
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
          descriptionStyle: 'tag'
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
          ],
          descriptionStyle: 'tag'
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
          ],
          descriptionStyle: 'tag'
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
      options: [
        {
          descriptionStyle: 'tag'
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
      options: [
        {
          descriptionStyle: 'tag'
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
      `,
      options: [
        {
          descriptionStyle: 'tag'
        }
      ]
    },
    {
      code: `
          /**
           * @description
           * quux(); // does something useful
           */
          function quux () {

          }
      `,
      options: [
        {
          descriptionStyle: 'tag'
        }
      ]
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
      `,
      options: [
        {
          descriptionStyle: 'tag'
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
      options: [
        {
          descriptionStyle: 'tag'
        }
      ]
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
      options: [
        {
          descriptionStyle: 'tag'
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
      options: [
        {
          descriptionStyle: 'tag'
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
      options: [
        {
          descriptionStyle: 'tag'
        }
      ]
    },
    {
      code: `
          /**
           * Has an implicit description
           */
          function quux () {

          }
      `,
      options: [
        {
          descriptionStyle: 'body'
        }
      ]
    },
    {
      code: `
          /**
           * Has an implicit description
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * Has an implicit description
           */
          function quux () {

          }
      `,
      options: [
        {
          descriptionStyle: 'any'
        }
      ]
    },
    {
      code: `
          /**
           * @description Has an explicit description
           */
          function quux () {

          }
      `,
      options: [
        {
          descriptionStyle: 'any'
        }
      ]
    }
  ]
};
