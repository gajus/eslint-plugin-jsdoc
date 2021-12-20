export default {
  invalid: [
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
          message: 'Missing JSDoc @returns type.',
        },
      ],
    },
    {
      code: `
          /**
           * @returns Foo.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @returns type.',
        },
      ],
    },
    {
      code: `
          /**
           * @returns Foo.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @returns type.',
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
           * @returns Foo.
           */
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc @returns type.',
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
           * @returns Foo.
           */
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc @returns type.',
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
           * @return Foo.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @return type.',
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
  ],
  valid: [
    {
      code: `
          /**
           * @returns {number}
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @returns {number}
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
           * @function
           * @returns Foo.
           */
      `,
    },
    {
      code: `
          /**
           * @callback
           * @returns Foo.
           */
      `,
    },
  ],
};
