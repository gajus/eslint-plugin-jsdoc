export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
        /**
         * @template {SomeType}
         */
      `,
      errors: [
        {
          line: 2,
          message: '@template should have a description',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * @template {SomeType} Has a description
         */
      `,
    },
    {
      code: `
        /**
         * @template Has a description
         */
      `,
    },
  ],
});
