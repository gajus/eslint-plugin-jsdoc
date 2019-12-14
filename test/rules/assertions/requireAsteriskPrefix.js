export default {
  invalid: [
    {
      code: `

        /**
         @param {Number} foo
         */
        function quux (foo) {
          // with spaces
        }
      `,
      errors: [
        {
          line: 4,
          message: 'Expected JSDoc block to have the prefix.',
        },
      ],
      output: `

        /**
         * @param {Number} foo
         */
        function quux (foo) {
          // with spaces
        }
      `,
    },
    {
      code: `
        /**
          @param {Number} foo
         */function quux (foo) {
          // with spaces
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected JSDoc block to have the prefix.',
        },
      ],
      output: `
        /**
          * @param {Number} foo
         */function quux (foo) {
          // with spaces
        }
      `,
    },
  ],
  valid: [
    {
      code: `
        /**
         * Desc
         *
         * @param {Number} foo
         *   This is more comment.
         */
        function quux (foo) {

        }
      `,
    },
    {
      code: `
        /**
         * Desc
         *
         * @param {{
         * foo: Bar,
         * bar: Baz
         * }} foo
         *
         */
        function quux (foo) {

        }
      `,
    },
    {
      code: `
        /*  <- JSDoc must start with 2 stars.
         So this is unchecked.
         */
        function quux (foo) {}
      `,
    },
  ],
};
