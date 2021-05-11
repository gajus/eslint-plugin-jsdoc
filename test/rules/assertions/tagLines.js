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
      errors: [{
        line: 4,
        message: 'Expected 1 line between tags but found 0',
      }],
      options: ['always'],
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
      errors: [{
        line: 4,
        message: 'Expected 2 lines between tags but found 0',
      }],
      options: ['always', {
        count: 2,
      }],
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
      errors: [{
        line: 5,
        message: 'Expected 2 lines between tags but found 1',
      }],
      options: ['always', {
        count: 2,
      }],
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
      errors: [{
        line: 4,
        message: 'Expected 1 line between tags but found 0',
      }],
      options: [
        'always',
        {
          noEndLine: true,
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
      errors: [{
        line: 5,
        message: 'Expected no lines between tags',
      }],
      options: ['never'],
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
      errors: [{
        line: 5,
        message: 'Expected no lines between tags',
      }],
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
      errors: [{
        line: 6,
        message: 'Expected 1 line between tags but found 0',
      }],
      options: ['always'],
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
      options: ['never'],
    },
    {
      code: `
      /**
       * @param {string} a
       *
       * @param {string} a
       */
      `,
      options: ['always', {
        noEndLine: true,
      }],
    },
    {
      code: `
      /**
       * @param {string} a
       */
      `,
      options: ['never', {
        noEndLine: true,
      }],
    },
    {
      code: `
      /** @param {number} b */
      `,
      options: ['never', {
        noEndLine: true,
      }],
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
      options: ['always'],
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
      options: ['always', {
        count: 2,
      }],
    },
  ],
};
