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
          message: 'Missing JSDoc @example declaration.',
        },
      ],
      output: `
          /**
           * @example
           */
          function quux () {

          }
      `,
    },
    {
      code: `/**
 *
 */
function quux () {

}
      `,
      errors: [
        {
          message: 'Missing JSDoc @example declaration.',
        },
      ],
      output: `/**
 * @example
 */
function quux () {

}
      `,
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
          message: 'Missing JSDoc @example description.',
        },
      ],
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
          message: '`settings.jsdoc.avoidExampleOnConstructors` has been removed, use options in the rule `require-example` instead.',
        },
        {
          message: 'Missing JSDoc @example declaration.',
        },
      ],
      output: `
      /**
       * @constructor
       * @example
       */
      function f () {

      }
      `,
      settings: {
        jsdoc: {
          avoidExampleOnConstructors: true,
        },
      },
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
          message: 'Missing JSDoc @example declaration.',
        },
      ],
      output: `
      /**
       * @constructor
       * @example
       */
      function quux () {

      }
      `,
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
          message: 'Missing JSDoc @example description.',
        },
      ],
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
          message: 'Missing JSDoc @example declaration.',
        },
      ],
      options: [
        {
          contexts: ['ClassDeclaration'],
        },
      ],
      output: `
          /**
           * @example
           */
          class quux {

          }
      `,
    },
    {
      code: `
          /**
           *
           */
      `,
      errors: [
        {
          message: 'Missing JSDoc @example declaration.',
        },
      ],
      options: [
        {
          contexts: ['any'],
        },
      ],
      output: `
          /**
           * @example
           */
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
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @example declaration.',
        },
      ],
      options: [
        {
          exemptedBy: ['notPresent'],
        },
      ],
      output: `
          /**
           * @example
           */
          function quux () {
          }
      `,
    },
    {
      code: `
      class TestClass {
        /**
         *
         */
        get Test() { }
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @example declaration.',
        },
      ],
      options: [
        {
          checkGetters: true,
        },
      ],
      output: `
      class TestClass {
        /**
         * @example
         */
        get Test() { }
      }
      `,
    },
    {
      code: `
      class TestClass {
        /**
         * @example
         */
        get Test() { }
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @example description.',
        },
      ],
      options: [
        {
          checkGetters: true,
        },
      ],
    },
    {
      code: `
      class TestClass {
        /**
         *
         */
        set Test(value) { }
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @example declaration.',
        },
      ],
      options: [
        {
          checkSetters: true,
        },
      ],
      output: `
      class TestClass {
        /**
         * @example
         */
        set Test(value) { }
      }
      `,
    },
    {
      code: `
      class TestClass {
        /**
         * @example
         */
        set Test(value) { }
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @example description.',
        },
      ],
      options: [
        {
          checkSetters: true,
        },
      ],
    },
  ],
  valid: [
    {
      code: `
          /**
           *
           */
      `,
    },
    {
      code: `
          /**
           * @example
           * // arbitrary example content
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @example
           * quux(); // does something useful
           */
          function quux () {

          }
      `,
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
      `,
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
        {
          checkConstructors: false,
        },
      ],
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
        {
          checkConstructors: false,
        },
      ],
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
        {
          checkConstructors: false,
        },
      ],
    },
    {
      code: `
      /**
       * @inheritdoc
       */
      function quux () {

      }
      `,
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
          exemptedBy: ['type'],
        },
      ],
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
          contexts: ['ClassDeclaration'],
        },
      ],
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
          contexts: ['ClassDeclaration'],
        },
      ],
    },
    {
      code: `
      class TestClass {
        /**
         *
         */
        get Test() { }
      }
      `,
    },
    {
      code: `
      class TestClass {
        /**
         * @example
         */
        get Test() { }
      }
      `,
    },
    {
      code: `
      class TestClass {
        /**
         * @example Test
         */
        get Test() { }
      }
      `,
      options: [
        {
          checkGetters: true,
        },
      ],
    },
    {
      code: `
      class TestClass {
        /**
         *
         */
        set Test(value) { }
      }
      `,
    },
    {
      code: `
      class TestClass {
        /**
         * @example
         */
        set Test(value) { }
      }
      `,
      options: [
        {
          checkSetters: false,
        },
      ],
    },
    {
      code: `
      class TestClass {
        /**
         * @example Test
         */
        set Test(value) { }
      }
      `,
      options: [
        {
          checkSetters: true,
        },
      ],
    },
  ],
};
