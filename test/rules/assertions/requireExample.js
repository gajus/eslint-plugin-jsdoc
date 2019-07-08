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
    },
    {
      code: `
      /**
       * @constructor
       */
      function f () {

      }
      `,
      errors: [
        {
          message: '`settings.jsdoc.avoidExampleOnConstructors` has been removed, use options in the rule `require-example` instead.'
        },
        {
          message: 'Missing JSDoc @example declaration.'
        }
      ],
      settings: {
        jsdoc: {
          avoidExampleOnConstructors: true
        }
      }
    },
    {
      code: `
      /**
       * @constructor
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
       * @constructor
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
          message: 'Missing JSDoc @example declaration.'
        }
      ],
      options: [
        {
          contexts: ['ClassDeclaration']
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
       * @constructor
       */
      function quux () {

      }
      `,
      options: [
        {avoidExampleOnConstructors: true}
      ]
    },
    {
      code: `
      /**
       * @constructor
       * @example
       */
      function quux () {

      }
      `,
      options: [
        {avoidExampleOnConstructors: true}
      ]
    },
    {
      code: `
      class Foo {
        /**
         *
         */
        constructor () {

        }
      }
      `,
      options: [
        {avoidExampleOnConstructors: true}
      ]
    },
    {
      code: `
      /**
       * @inheritdoc
       */
      function quux () {

      }
      `
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
           * @example Some example code
           */
          class quux {

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
    }
  ]
};
