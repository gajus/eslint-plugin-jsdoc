export default {
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
           * @returns
           */
          export function quux (foo) {

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
          publicOnly: true,
        },
      ],
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          /**
           * @returns
           */
          module.exports = function quux (foo) {

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
          publicOnly: {
            cjs: true,
            esm: false,
          },
        },
      ],
    },
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
      options: [
        {
          publicOnly: false,
        },
      ],
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          export default class Class {
            /**
             * @returns
             */
            quux(foo) {

            }
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
      parserOptions: {
        sourceType: 'module',
      },
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
           * @returns
           */
          function quux (foo) {

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
           * @returns - description
           */
          export function quux (foo) {

          }
      `,
      options: [
        {
          publicOnly: true,
        },
      ],
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          /**
           * @returns
           */
          module.exports = function quux (foo) {

          }
      `,
      options: [
        {
          publicOnly: {
            cjs: false,
          },
        },
      ],
    },
    {
      code: `
          class Class {
            /**
             * @returns
             */
            quux(foo) {

            }
          }
      `,
      options: [
        {
          publicOnly: true,
        },
      ],
    },
  ],
};
