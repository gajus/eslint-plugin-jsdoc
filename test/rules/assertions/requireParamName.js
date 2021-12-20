export default {
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
};
