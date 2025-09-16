export default {
  invalid: [
    {
      code: `
        /**
         * @param {any} abc
         */
        function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Prefer a more specific type to `any`',
        },
      ],
    },
    {
      code: `
        /**
         * @param {string|Promise<any>} abc
         */
        function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Prefer a more specific type to `any`',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * @param {SomeType} abc
         */
        function quux () {}
      `,
    },
  ],
};
