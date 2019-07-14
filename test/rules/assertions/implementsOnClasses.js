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
    }
  ]
};
