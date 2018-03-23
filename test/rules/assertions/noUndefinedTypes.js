/* eslint-disable no-restricted-syntax */

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
      `
    },
    {
      code: `
        import {MyType} from 'my-library';

        /**
         * @param {MyType} foo - Bar.
         */
          function quux(foo) {

        }
      `,
      parserOptions: {
        sourceType: 'module'
      }
    },
    {
      code: `
        /*global MyType*/

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
    }
  ]
};

