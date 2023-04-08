export default {
  invalid: [
    {
      code: `
      /**
       *
       * @param {number} x
       */
      function functionWithClearName(x) {}
      `,
      errors: [
        {
          line: 3,
          message: 'There should be no blank lines in block descriptions followed by tags.',
        },
      ],
      output: `
      /**
       * @param {number} x
       */
      function functionWithClearName(x) {}
      `,
    },
    {
      code: `
      /**
       *
       *
       */
      function functionWithClearName() {}
      `,
      errors: [
        {
          line: 4,
          message: 'There should be no extra blank lines in block descriptions not followed by tags.',
        },
      ],
      output: `
      /**
       *
       */
      function functionWithClearName() {}
      `,
    },
  ],
  valid: [
    {
      code: `
      /**
       * Non-empty description
       * @param {number} x
       */
      function functionWithClearName(x) {}
      `,
    },
    {
      code: `
      /**
       * @param {number} x
       */
      function functionWithClearName(x) {}
      `,
    },
    {
      code: `
      /**
       *
       */
      function functionWithClearName() {}
      `,
    },
    {
      code: `
      /**
       */
      function functionWithClearName() {}
      `,
    },
    {
      code: `
      /** */
      function functionWithClearName() {}
      `,
    },
    {
      code: `
      /** Some desc. */
      function functionWithClearName() {}
      `,
    },
    {
      code: `
      /** @someTag */
      function functionWithClearName() {}
      `,
    },
  ],
};
