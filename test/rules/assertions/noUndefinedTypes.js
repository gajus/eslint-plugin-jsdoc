export default {
  invalid: [
    {
      code: `
          /**
           * @param {strnig} foo - Bar.
           */
          function quux(foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'The type \'strnig\' is undefined.'
        }
      ],
      rules: {
        'no-undef': 'error'
      }
    }
  ],
  valid: [
    {
      code: `
          /**
           * @param {string} foo - Bar.
           */
          function quux(foo) {

          }
      `
    },
    {
      code: `
          /**
           * @param {Promise} foo - Bar.
           */
          function quux(foo) {

          }
      `,
      env: {
        es6: true
      }
    },
    {
      code: `
          class MyClass {}

          /**
           * @param {MyClass} foo - Bar.
           */
          function quux(foo) {
            console.log(foo);
          }

          quux(0);
      `,
      rules: {
        'no-unused-vars': 'error'
      }
    },
    {
      code: `
        const MyType = require('my-library').MyType;

        /**
         * @param {MyType} foo - Bar.
         */
          function quux(foo) {

        }
      `,
      env: {
        node: true
      }
    },
    {
      code: `
        const MyType = require('my-library').MyType;

        /**
         * @param {MyType} foo - Bar.
         */
          function quux(foo) {

        }
      `,
      env: {
        node: false
      }
    },
    {
      code: `
        import {MyType} from 'my-library';

        /**
         * @param {MyType} foo - Bar.
         * @param {Object<string, number>} foo
         * @param {Array<string>} baz
         */
          function quux(foo, bar, baz) {

        }
      `,
      parserOptions: {
        sourceType: 'module'
      }
    },
    {
      code: `
        /*globals MyType*/

        /**
         * @param {MyType} foo - Bar.
         * @param {HisType} bar - Foo.
         */
          function quux(foo, bar) {

        }
      `,
      globals: {
        HisType: true
      }
    },
    {
      code: `
        /**
         * @typedef {Object} hello
         * @property {string} a - a.
         */

        /**
         * @param {hello} foo
         */
        function quux(foo) {

        }
      `
    },
    {
      code: `
        /**
         * @param {Array<syntaxError} foo
         */
        function quux(foo) {

        }
      `
    },
    {
      code: `
      /**
       * Callback test.
       *
       * @callback addStuffCallback
       * @param {String} sum - An test integer.
       */
      /**
       * Test Eslint.
       *
       * @param {addStuffCallback} callback - A callback to run.
       */
      function testFunction(callback) {
        callback();
      }
      `
    }
  ]
};
