export default {
  invalid: [
    {
      code: `
        /**
         * @throws {SomeType}
         */
      `,
      errors: [
        {
          line: 2,
          message: '@throws should have a description',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * @throws {SomeType} Has a description
         */
      `,
    },
  ],
};
