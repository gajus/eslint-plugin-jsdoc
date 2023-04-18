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
          applyToEndTag: false,
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
        {
          endLines: null,
        },
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
    {
      code: `
      /**
       * Some description
       * @param {string} a
       * @param {string} b
       *
       * @returns {SomeType} An extended
       * description.
       *
       * This is still part of \`@returns\`.
       *
       */
      `,
      errors: [
        {
          line: 11,
          message: 'Expected 0 trailing lines',
        },
      ],
      options: [
        'any',
        {
          endLines: 0,
        },
      ],
      output: `
      /**
       * Some description
       * @param {string} a
       * @param {string} b
       *
       * @returns {SomeType} An extended
       * description.
       *
       * This is still part of \`@returns\`.
       */
      `,
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       * @param {string} b
       *
       * @returns {SomeType} An extended
       * description.
       *
       * This is still part of \`@returns\`.
       *
       *
       *
       */
      `,
      errors: [
        {
          line: 12,
          message: 'Expected 1 trailing lines',
        },
      ],
      options: [
        'any',
        {
          endLines: 1,
        },
      ],
      output: `
      /**
       * Some description
       * @param {string} a
       * @param {string} b
       *
       * @returns {SomeType} An extended
       * description.
       *
       * This is still part of \`@returns\`.
       *
       */
      `,
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       * @param {string} b
       *
       * @returns {SomeType} An extended
       * description.
       *
       * This is still part of \`@returns\`.
       *
       */
      `,
      errors: [
        {
          line: 11,
          message: 'Expected 2 trailing lines',
        },
      ],
      options: [
        'any',
        {
          endLines: 2,
        },
      ],
      output: `
      /**
       * Some description
       * @param {string} a
       * @param {string} b
       *
       * @returns {SomeType} An extended
       * description.
       *
       * This is still part of \`@returns\`.
       *
       *
       */
      `,
    },
    {
      code: `
        /**
         * Some description
         *
         *
         * @param {string} a
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Expected only 1 line after block description',
        },
      ],
      options: [
        'any',
        {
          startLines: 1,
        },
      ],
      output: `
        /**
         * Some description
         *
         * @param {string} a
         */
      `,
    },
    {
      code: `
        /**
         * Some description
         *
         * @param {string} a
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected only 0 line after block description',
        },
      ],
      options: [
        'any',
        {
          startLines: 0,
        },
      ],
      output: `
        /**
         * Some description
         * @param {string} a
         */
      `,
    },
    {
      code: `
        /**
         * Some description
         *
         * @param {string} a
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Expected 2 lines after block description',
        },
      ],
      options: [
        'any',
        {
          startLines: 2,
        },
      ],
      output: `
        /**
         * Some description
         *
         *
         * @param {string} a
         */
      `,
    },
    {
      code: `
        /**
         * Some description
         * @param {string} a
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected 1 lines after block description',
        },
      ],
      options: [
        'any',
        {
          startLines: 1,
        },
      ],
      output: `
        /**
         * Some description
         *
         * @param {string} a
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
          applyToEndTag: false,
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
          applyToEndTag: false,
        },
      ],
    },
    {
      code: `
      /** @param {number} b */
      `,
      options: [
        'never', {
          applyToEndTag: false,
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
        {
          endLines: null,
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
        'always', {
          count: 2,
          endLines: null,
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
        {
          endLines: null,
        },
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
        {
          endLines: null,
        },
      ],
    },
    {
      code: `
      /**
       * Some description
       * @param {string} a
       * @param {string} b
       *
       * @returns {SomeType} An extended
       * description.
       *
       * This is still part of \`@returns\`.
       */
      `,
      options: [
        'any',
        {
          endLines: 0,
        },
      ],
    },
    {
      code: `
        /**
         * Some description
         *
         * @param {string} a
         */
      `,
      options: [
        'any',
        {
          startLines: 1,
        },
      ],
    },
    {
      code: `
        /**
         * Some description
         * @param {string} a
         *
         */
      `,
      options: [
        'any',
        {
          endLines: 1,
        },
      ],
    },
    {
      code: `
        /**
         * Some description
         *
         *
         * @param {string} a
         */
      `,
      options: [
        'never',
        {
          startLines: null,
        },
      ],
    },
    {
      code: `
        /**
         * Some description
         * @param {string} a
         */
      `,
      options: [
        'never',
        {
          startLines: null,
        },
      ],
    },
    {
      code: `
      /**
       * @param {string} input
       */
      function processSass (input) {
      }
      `,
      options: [
        'never',
        {
          startLines: 1,
        },
      ],
    },
    {
      code: `
      /**
       *
       * @param {string} input
       */
      function processSass (input) {
      }
      `,
      options: [
        'never',
        {
          startLines: 1,
        },
      ],
    },
    {
      code: `
      /**
       * Toggles the deselect all icon button action
       */
      function updateIconButton () {
      }
      `,
      options: [
        'never',
        {
          startLines: 1,
        },
      ],
    },
  ],
};
