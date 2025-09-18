export default {
  invalid: [
    {
      code: `
        /**
         * @next {SomeType}
         */
      `,
      errors: [
        {
          line: 2,
          message: '@next should have a description',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * @next {SomeType} Has a description
         */
      `,
    },
  ],
};
