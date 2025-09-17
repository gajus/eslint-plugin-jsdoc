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
         * @param {*} abc
         */
        function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Prefer a more specific type to `*`',
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
    {
      code: `
        /**
         * @param {Array<*>|number} abc
         */
        function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Prefer a more specific type to `*`',
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
