export default {
  invalid: [
    {
      code: `
      /**
       * @implements {SomeClass}
       */
      function quux () {

      }
      `,
      errors: [
        {
          line: 3,
          message: '@implements used on a non-constructor function'
        }
      ]
    },
    {
      code: `
        /**
         * @implements {SomeClass}
         */
        function quux () {

        }
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected tag `@implements`'
        }
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            implements: false
          }
        }
      }
    }
  ],
  valid: [
    {
      code: `
      /**
       * @implements {SomeClass}
       * @class
       */
      function quux () {

      }
      `
    },
    {
      code: `
      /**
       * @implements {SomeClass}
       * @constructor
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
        /**
         * @implements {SomeClass}
         */
        constructor () {

        }
      }
      `
    },
    {
      code: `
      /**
       *
       */
      const quux = class {
        /**
         * @implements {SomeClass}
         */
        constructor () {

        }
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
      settings: {
        jsdoc: {
          tagNamePreference: {
            implements: false
          }
        }
      }
    }
  ]
};
