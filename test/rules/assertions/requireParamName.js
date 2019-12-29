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
      options: [{
        contexts: ['any'],
      }],
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
      options: [{
        contexts: ['any'],
      }],
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
      options: [{
        contexts: ['any'],
      }],
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
          contexts: ['any'],
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
  ],
};
