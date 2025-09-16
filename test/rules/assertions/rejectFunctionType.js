export default {
  invalid: [
    {
      code: `
        /**
         * @param {Function} abc
         */
        function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Prefer a more specific type to `Function`',
        },
      ],
    },
    {
      code: `
        /**
         * @param {string|Array<Function>} abc
         */
        function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Prefer a more specific type to `Function`',
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
