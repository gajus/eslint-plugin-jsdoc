export default {
  invalid: [
    {
      code: `
      /**
       * Some description
       * @param {string} a
       * @param {number} b
       */
      `,
      errors: [
        {
          line: 4,
          message: 'Expected 1 line between tags but found 0',
        },
      ],
      options: [
        'always',
      ],
      output: `
      /**
       * Some description
       * @param {string} a
       *
       * @param {number} b
       */
      `,
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       * @param {number} b
       */
      `,
      errors: [
        {
          line: 4,
          message: 'Expected 2 lines between tags but found 0',
        },
      ],
      options: [
        'always', {
          count: 2,
        },
      ],
      output: `
      /**
       * Some description
       * @param {string} a
       *
       *
       * @param {number} b
       */
      `,
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       *
       * @param {number} b
       */
      `,
      errors: [
        {
          line: 5,
          message: 'Expected 2 lines between tags but found 1',
        },
      ],
      options: [
        'always', {
          count: 2,
        },
      ],
      output: `
      /**
       * Some description
       * @param {string} a
       *
       *
       * @param {number} b
       */
      `,
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       * @param {number} b
       */
      `,
      errors: [
        {
          line: 4,
          message: 'Expected 1 line between tags but found 0',
        },
      ],
      options: [
        'always',
        {
          noEndLines: true,
        },
      ],
      output: `
      /**
       * Some description
       * @param {string} a
       *
       * @param {number} b
       */
      `,
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       *
       * @param {number} b
       *
       */
      `,
      errors: [
        {
          line: 5,
          message: 'Expected no lines between tags',
        },
      ],
      options: [
        'never',
      ],
      output: `
      /**
       * Some description
       * @param {string} a
       * @param {number} b
       *
       */
      `,
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       *
       * @param {number} b
       *
       */
      `,
      errors: [
        {
          line: 5,
          message: 'Expected no lines between tags',
        },
      ],
      output: `
      /**
       * Some description
       * @param {string} a
       * @param {number} b
       *
       */
      `,
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       *
       * @param {number} b
       * @param {number} c
       */
      `,
      errors: [
        {
          line: 6,
          message: 'Expected 1 line between tags but found 0',
        },
      ],
      options: [
        'always',
      ],
      output: `
      /**
       * Some description
       * @param {string} a
       *
       * @param {number} b
       *
       * @param {number} c
       */
      `,
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       * @param {number} b
       */
      `,
      errors: [
        {
          line: 4,
          message: 'Expected 1 line between tags but found 0',
        },
      ],
      options: [
        'never', {
          tags: {
            param: {
              lines: 'always',
            },
          },
        },
      ],
      output: `
      /**
       * Some description
       * @param {string} a
       *
       * @param {number} b
       */
      `,
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       * @param {number} b
       */
      `,
      errors: [
        {
          line: 4,
          message: 'Expected 1 line between tags but found 0',
        },
      ],
      options: [
        'never', {
          tags: {
            param: {
              lines: 'always',
            },
          },
        },
      ],
      output: `
      /**
       * Some description
       * @param {string} a
       *
       * @param {number} b
       */
      `,
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       * @param {number} b
       *
       */
      `,
      errors: [
        {
          line: 6,
          message: 'Expected no lines between tags',
        },
      ],
      options: [
        'always', {
          tags: {
            param: {
              lines: 'never',
            },
          },
        },
      ],
      output: `
      /**
       * Some description
       * @param {string} a
       * @param {number} b
       */
      `,
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       *
       * @param {number} b
       */
      `,
      errors: [
        {
          line: 5,
          message: 'Expected 2 lines between tags but found 1',
        },
      ],
      options: [
        'never', {
          count: 2,
          tags: {
            param: {
              lines: 'always',
            },
          },
        },
      ],
      output: `
      /**
       * Some description
       * @param {string} a
       *
       *
       * @param {number} b
       */
      `,
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       *
       * @param {number} b
       */
      `,
      errors: [
        {
          line: 5,
          message: 'Expected 2 lines between tags but found 1',
        },
      ],
      options: [
        'never', {
          count: 5,
          tags: {
            param: {
              count: 2,
              lines: 'always',
            },
          },
        },
      ],
      output: `
      /**
       * Some description
       * @param {string} a
       *
       *
       * @param {number} b
       */
      `,
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       * @param {number} b
       */
      `,
      errors: [
        {
          line: 4,
          message: 'Expected 1 line between tags but found 0',
        },
      ],
      options: [
        'always', {
          tags: {
            anotherTag: {
              lines: 'never',
            },
          },
        },
      ],
      output: `
      /**
       * Some description
       * @param {string} a
       *
       * @param {number} b
       */
      `,
    },
    {
      code: `
      /**
       * Some description
       * @param {string} A broken up
       *
       * tag description.
       * @param {number} b
       *
       */
      `,
      errors: [
        {
          line: 6,
          message: 'Expected 1 line between tags but found 0',
        },
      ],
      options: [
        'always',
      ],
      output: `
      /**
       * Some description
       * @param {string} A broken up
       *
       * tag description.
       *
       * @param {number} b
       *
       */
      `,
    },
    {
      code: `
      /**
       * Some description
       * @param {number} b
       *
       * @returns {string} A broken up
       *
       * tag description.
       */
      `,
      errors: [
        {
          line: 8,
          message: 'Expected 1 line between tags but found 0',
        },
      ],
      options: [
        'always',
      ],
      output: `
      /**
       * Some description
       * @param {number} b
       *
       * @returns {string} A broken up
       *
       * tag description.
       *
       */
      `,
    },
  ],
  valid: [
    {
      code: `
      /**
       * Some description
       * @param {string} a
       * @param {number} b
       */
      `,
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       * @param {number} b
       */
      `,
      options: [
        'never',
      ],
    },
    {
      code: `
      /**
       * @param {string} a
       *
       * @param {string} a
       */
      `,
      options: [
        'always', {
          noEndLines: true,
        },
      ],
    },
    {
      code: `
      /**
       * @param {string} a
       */
      `,
      options: [
        'never', {
          noEndLines: true,
        },
      ],
    },
    {
      code: `
      /** @param {number} b */
      `,
      options: [
        'never', {
          noEndLines: true,
        },
      ],
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       *
       * @param {number} b
       *
       */
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       *
       *
       * @param {number} b
       *
       *
       */
      `,
      options: [
        'always', {
          count: 2,
        },
      ],
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       * @param {number} b
       */
      `,
      options: [
        'never', {
          tags: {
            param: {
              lines: 'any',
            },
          },
        },
      ],
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       * @param {number} b
       */
      `,
      options: [
        'always', {
          tags: {
            param: {
              lines: 'any',
            },
          },
        },
      ],
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       * @param {number} b
       */
      `,
      options: [
        'always', {
          tags: {
            param: {
              lines: 'never',
            },
          },
        },
      ],
    },
    {
      code: `
      /**
       * Some description
       * @param {number} a
       * @param {number} b
       */
      `,
      options: [
        'never', {
          tags: {
            param: {
              lines: 'any',
            },
          },
        },
      ],
    },
    {
      code: `
      /**
       * Some description
       * @param {number} a
       *
       * @param {number} b
       */
      `,
      options: [
        'never', {
          tags: {
            param: {
              lines: 'any',
            },
          },
        },
      ],
    },
    {
      code: `
      /**
       * Some description
       * @param {number} a
       * @param {number} b
       */
      `,
      options: [
        'never', {
          tags: {
            param: {
              lines: 'never',
            },
          },
        },
      ],
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       *
       *
       * @param {number} b
       *
       *
       */
      `,
      options: [
        'never', {
          count: 5,
          tags: {
            param: {
              count: 2,
              lines: 'always',
            },
          },
        },
      ],
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       * @param {number} b
       */
      `,
      options: [
        'never', {
          tags: {
            anotherTag: {
              lines: 'always',
            },
          },
        },
      ],
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       *
       * This is still part of \`@param\`.
       * @returns {SomeType} An extended
       * description.
       */
      `,
      options: [
        'never',
      ],
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       * @returns {SomeType} An extended
       * description.
       *
       * This is still part of \`@returns\`.
       */
      `,
      options: [
        'never',
      ],
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       *
       * This is still part of \`@param\`.
       *
       * @returns {SomeType} An extended
       * description.
       *
       */
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       *
       * @returns {SomeType} An extended
       * description.
       *
       * This is still part of \`@returns\`.
       *
       */
      `,
      options: [
        'always',
      ],
    },
  ],
};
