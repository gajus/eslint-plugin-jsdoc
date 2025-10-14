export default {
  invalid: [
    {
      code: `
        /**
         * @param {Function} fooBar
         */
        function quux (fooBar) {
          console.log(fooBar(3));
        }
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
        function buzz (abc) {}
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
        function quux (abc) {}
      `,
    },
    {
      code: `
        // To avoid referencing a generic Function, define a callback
        //   with its inputs/outputs and a name.
        /**
         * @callback          FOOBAR
         * @param    {number} baz
         * @return   {number}
         */


        // Then reference the callback name as the type.
        /**
         * @param {FOOBAR} fooBar
         */
        function quux (fooBar) {
          console.log(fooBar(3));
        }

        /**
         * @param {string|Array<FOOBAR>} abc
         */
        function buzz (abc) {}
      `,
    },
  ],
};
