export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
          /**
           * @returns
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @returns description.',
        },
      ],
    },
    {
      code: `
          /**
           * @returns {string}
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @returns description.',
        },
      ],
    },
    {
      code: `
          /**
           * @returns {string}
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @returns description.',
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
           * @returns {string}
           */
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc @returns description.',
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
           * @returns {string}
           */
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc @returns description.',
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
           * @return
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @return description.',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            returns: 'return',
          },
        },
      },
    },
    {
      code: `
          /**
           * @returns
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected tag `@returns`',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            returns: false,
          },
        },
      },
    },
    {
      code: `
          /**
           * Desc.
           * @returns {number}
           */
          export function quux (foo) {
            return foo;
          }
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc @returns description.',
        },
      ],
      options: [
        {
          publicOnly: true,
        },
      ],
    },
    {
      code: `
          /**
           * Desc.
           * @returns {number}
           */
          function quux (foo) {
            return foo;
          }
          module.exports = quux;
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc @returns description.',
        },
      ],
      options: [
        {
          publicOnly: true,
        },
      ],
    },
    {
      code: `
          /**
           * Desc.
           * @returns {number}
           */
          function quux (foo) {
            return foo;
          }
          export {quux};
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc @returns description.',
        },
      ],
      options: [
        {
          publicOnly: true,
        },
      ],
    },
    {
      code: `
        /**
         * @callback SomeCallback
         * @param {string} value
         * @returns {string}
         */

        /**
         *
         */
        export class ExportedClass {
          /**
           * @param {string} value
           * @returns {string}
           */
          method(value) {
            return value;
          }
        }

        /**
         * @param {string} value
         * @returns {string}
         */
        export function exportedFunction(value) {
          return value;
        }
      `,
      errors: [
        {
          line: 5,
          message: 'Missing JSDoc @returns description.',
        },
        {
          line: 14,
          message: 'Missing JSDoc @returns description.',
        },
        {
          line: 23,
          message: 'Missing JSDoc @returns description.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
          publicOnly: {
            cjs: false,
            esm: true,
          },
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
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @returns Foo.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @returns Foo.
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
           * @returns {undefined}
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @returns {void}
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @returns {Promise<void>}
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @returns {Promise<undefined>}
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @function
           * @returns
           */
      `,
    },
    {
      code: `
          /**
           * @callback
           * @returns
           */
      `,
    },
    {
      code: `
          /**
           * Desc.
           * @returns {number}
           */
          function quux (foo) {
            return foo;
          }
      `,
      options: [
        {
          publicOnly: true,
        },
      ],
    },
    {
      code: `
          /**
           * Desc.
           * @returns {number}
           */
          function quux (foo) {
            return foo;
          }
          module.exports = quux;
      `,
      options: [
        {
          publicOnly: {
            cjs: false,
          },
        },
      ],
    },
  ],
});
