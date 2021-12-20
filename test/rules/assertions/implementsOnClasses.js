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
          message: '@implements used on a non-constructor function',
        },
      ],
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
          message: '@implements used on a non-constructor function',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
    },
    {
      code: `
      /**
       * @function
       * @implements {SomeClass}
       */
      function quux () {

      }
      `,
      errors: [
        {
          line: 4,
          message: '@implements used on a non-constructor function',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
    },
    {
      code: `
      /**
       * @callback
       * @implements {SomeClass}
       */
      `,
      errors: [
        {
          line: 4,
          message: '@implements used on a non-constructor function',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
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
          message: 'Unexpected tag `@implements`',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            implements: false,
          },
        },
      },
    },
    {
      code: `
      class Foo {
          /**
           * @implements {SomeClass}
           */
          constructor() {}

          /**
           * @implements {SomeClass}
           */
          bar() {}
      }
      `,
      errors: [
        {
          line: 9,
          message: '@implements used on a non-constructor function',
        },
      ],
      options: [
        {
          contexts: [
            'MethodDefinition',
          ],
        },
      ],
    },
    {
      code: `
      class Foo {
          /**
           * @implements {SomeClass}
           */
          constructor() {}

          /**
           * @implements {SomeClass}
           */
          bar() {}
      }
      `,
      errors: [
        {
          line: 9,
          message: '@implements used on a non-constructor function',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
    },
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
      `,
    },
    {
      code: `
      /**
       * @implements {SomeClass}
       * @class
       */
      function quux () {

      }
      `,
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
    },
    {
      code: `
      /**
       * @implements {SomeClass}
       */
      `,
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
    },
    {
      code: `
      /**
       * @implements {SomeClass}
       * @constructor
       */
      function quux () {

      }
      `,
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
      `,
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
      `,
    },
    {
      code: `
      /**
       *
       */
      function quux () {

      }
      `,
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
            implements: false,
          },
        },
      },
    },
    {
      code: `
      /**
       * @function
       * @implements {SomeClass}
       */
      `,
    },
    {
      code: `
      /**
       * @callback
       * @implements {SomeClass}
       */
      `,
    },
  ],
};
