export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
          /**
           * @param
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'There must be an identifier after @param type.',
        },
      ],
      output: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param {string}
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'There must be an identifier after @param tag.',
        },
      ],
      output: `
          /**
           * @param {string} foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param {string}
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'There must be an identifier after @param tag.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
      output: `
          /**
           * @param {string} foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @function
           * @param {string}
           */
      `,
      errors: [
        {
          line: 4,
          message: 'There must be an identifier after @param tag.',
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
           * @param {string}
           */
      `,
      errors: [
        {
          line: 4,
          message: 'There must be an identifier after @param tag.',
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
           * @param foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected tag `@param`',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: false,
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {string} foo
           * @param {number}
           */
          function quux (foo, bar = 1) {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'There must be an identifier after @param tag.',
        },
      ],
      output: `
          /**
           * @param {string} foo
           * @param {number} bar
           */
          function quux (foo, bar = 1) {

          }
      `,
    },
    {
      code: `
          /** @param {string} */
          const quux = (foo) => {};
      `,
      errors: [
        {
          line: 2,
          message: 'There must be an identifier after @param tag.',
        },
      ],
      output: `
          /** @param {string} foo */
          const quux = (foo) => {};
      `,
    },
    {
      code: `
          /**
           * @param {string}
           */
          function quux (foo, bar) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'There must be an identifier after @param tag.',
        },
      ],
    },
    {
      code: `
          /**
           * @param {object}
           */
          function quux ({foo}) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'There must be an identifier after @param tag.',
        },
      ],
    },
    {
      code: `
          /**
           * @param {string}
           */
          function quux (...foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'There must be an identifier after @param tag.',
        },
      ],
    },
    {
      code: `
          /**
           * @param {string} [url The URL.
           */
          function load (url) {}
      `,
      errors: [
        {
          line: 3,
          message: 'There must be an identifier after @param tag.',
        },
      ],
      output: null,
    },
    {
      code: `
          /**
           * @param {string} [url=] The URL.
           */
          function load (url) {}
      `,
      errors: [
        {
          line: 3,
          message: 'There must be an identifier after @param tag.',
        },
      ],
      output: null,
    },
    {
      code: `
          /**
           * @param {{
           *   a: string
           * }}
           */
          function quux (opts) {}
      `,
      errors: [
        {
          line: 3,
          message: 'There must be an identifier after @param tag.',
        },
      ],
      output: `
          /**
           * @param {{
           *   a: string
           * }} opts
           */
          function quux (opts) {}
      `,
    },
  ],
  valid: [
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

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
           * @param {string} foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @function
           * @param
           */
      `,
    },
    {
      code: `
          /**
           * @callback
           * @param
           */
      `,
    },
    {
      code: `
      /**
       * @param {Function} [processor=data => data] A function to run
       */
      function processData(processor) {
        return processor(data)
      }
      `,
    },
    {
      code: `
      /** Example with multi-line param type.
      *
      * @param {function(
      *   number
      * )} cb Callback.
      */
      function example(cb) {
        cb(42);
      }
      `,
    },
  ],
});
