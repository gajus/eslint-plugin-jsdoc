export default {
  invalid: [
    {
      code: `
        /**
         * @throws
         */
      `,
      errors: [
        {
          line: 2,
          message: '@throws should have a type',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * @throws {SomeType}
         */
      `,
    },
  ],
};
