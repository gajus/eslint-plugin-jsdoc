export default {
  invalid: [
    {
      code: `
        /**
         * @yields {SomeType}
         */
      `,
      errors: [
        {
          line: 2,
          message: '@yields should have a description',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * @yields {SomeType} Has a description
         */
      `,
    },
  ],
};
