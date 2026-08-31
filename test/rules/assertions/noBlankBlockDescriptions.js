export default /** @type {import('../index.js').TestCases} */ ({
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
    {
      code: `
      /**
       *
       * Some text
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
       * Some text
       * @param {number} x
       */
      function functionWithClearName(x) {}
      `,
    },
    {
      code: `
        /**
         *
         * Seniority levels that participate in distribution, in display
         * order. \`custom\` is never a real distribution key. Every test shown in this
         * modal can recruit each of these levels, so all three are always editable.
         */
        const SENIORITY_ORDER = ['senior', 'middle', 'specialist'];
      `,
      errors: [
        {
          line: 4,
          message: 'There should be no extra blank lines in block descriptions not followed by tags.',
        },
      ],
      output: `
        /**
         * Seniority levels that participate in distribution, in display
         * order. \`custom\` is never a real distribution key. Every test shown in this
         * modal can recruit each of these levels, so all three are always editable.
         */
        const SENIORITY_ORDER = ['senior', 'middle', 'specialist'];
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
});
