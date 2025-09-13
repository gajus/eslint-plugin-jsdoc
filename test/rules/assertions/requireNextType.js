export default {
  invalid: [
    {
      code: `
        /**
         * @next
         */
      `,
      errors: [
        {
          line: 2,
          message: '@next should have a type',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * @next {SomeType}
         */
      `,
    },
  ],
};
