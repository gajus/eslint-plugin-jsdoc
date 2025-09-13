export default {
  invalid: [
    {
      code: `
        /**
         * @yields
         */
      `,
      errors: [
        {
          line: 2,
          message: '@yields should have a type',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * @yields {SomeType}
         */
      `,
    },
  ],
};
