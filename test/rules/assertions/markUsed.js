export default {
  invalid: [],
  valid: [
    {
      code: `
        const foo = "bar";
        /** This thing uses {@link foo} for something */
      `,
      /*
      rules: {
        'no-unused-vars': 'error',
      },
      */
    },
  ],
};
