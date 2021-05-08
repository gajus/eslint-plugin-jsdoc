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
          message: 'Expected JSDoc line to have the prefix.',
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
         * Desc

         */
        function quux (foo) {
          // with spaces
        }
      `,
      errors: [
        {
          line: 5,
          message: 'Expected JSDoc line to have the prefix.',
        },
      ],
      output: `

        /**
         * Desc
         *
         */
        function quux (foo) {
          // with spaces
        }
      `,
    },
    {
      code: `

        /**
         *
         Desc
         */
        function quux (foo) {
          // with spaces
        }
      `,
      errors: [
        {
          line: 5,
          message: 'Expected JSDoc line to have the prefix.',
        },
      ],
      output: `

        /**
         *
         * Desc
         */
        function quux (foo) {
          // with spaces
        }
      `,
    },
    {
      code: `

        /**
         * Desc
         *
         */
        function quux (foo) {
          // with spaces
        }
      `,
      errors: [
        {
          line: 4,
          message: 'Expected JSDoc line to have no prefix.',
        },
      ],
      options: ['never'],
      output: `

        /**
         Desc
         *
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
         */
        function quux (foo) {
          // with spaces
        }
      `,
      errors: [
        {
          line: 4,
          message: 'Expected JSDoc line to have the prefix.',
        },
      ],
      options: ['always', {
        tags: {
          any: ['someOtherTag'],
        },
      }],
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
         * @param {Number} foo
         */
        function quux (foo) {
          // with spaces
        }
      `,
      errors: [
        {
          line: 4,
          message: 'Expected JSDoc line to have no prefix.',
        },
      ],
      options: ['never', {
        tags: {
          always: ['someOtherTag'],
        },
      }],
      output: `

        /**
         @param {Number} foo
         */
        function quux (foo) {
          // with spaces
        }
      `,
    },
    {
      code: `

        /**
         * @param {Number} foo
         */
        function quux (foo) {
          // with spaces
        }
      `,
      errors: [
        {
          line: 4,
          message: 'Expected JSDoc line to have no prefix.',
        },
      ],
      options: ['always', {
        tags: {
          never: ['param'],
        },
      }],
      output: `

        /**
         @param {Number} foo
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
         */
        function quux (foo) {
          // with spaces
        }
      `,
      errors: [
        {
          line: 4,
          message: 'Expected JSDoc line to have the prefix.',
        },
      ],
      options: ['never', {
        tags: {
          always: ['param'],
        },
      }],
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
          message: 'Expected JSDoc line to have the prefix.',
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
    {
      code: `

        /**
         * @param {Number} foo
         */
        function quux (foo) {
          // with spaces
        }
      `,
      errors: [
        {
          line: 4,
          message: 'Expected JSDoc line to have no prefix.',
        },
      ],
      options: ['never'],
      output: `

        /**
         @param {Number} foo
         */
        function quux (foo) {
          // with spaces
        }
      `,
    },
    {
      code: `
        /**
          *@param {Number} foo
         */function quux (foo) {
          // with spaces
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected JSDoc line to have no prefix.',
        },
      ],
      options: ['never'],
      output: `
        /**
          @param {Number} foo
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
    {
      code: `
        /** @param {Number} foo */
        function quux (foo) {
          // with spaces
        }
      `,
    },
    {
      code: `

        /**
         @param {Number} foo
         */
        function quux (foo) {
          // with spaces
        }
      `,
      options: ['always', {
        tags: {
          any: ['param'],
        },
      }],
    },
    {
      code: `

        /**
         * @param {Number} foo
         */
        function quux (foo) {
          // with spaces
        }
      `,
      options: ['never', {
        tags: {
          always: ['param'],
        },
      }],
    },
    {
      code: `

        /**
         * @param {Number} foo
         */
        function quux (foo) {
          // with spaces
        }
      `,
      options: ['always', {
        tags: {
          never: ['someOtherTag'],
        },
      }],
    },
    {
      code: `

        /**
         @param {Number} foo
         */
        function quux (foo) {
          // with spaces
        }
      `,
      options: ['always', {
        tags: {
          never: ['param'],
        },
      }],
    },
    {
      code: `

        /**
         @param {Number} foo
         */
        function quux (foo) {
          // with spaces
        }
      `,
      options: ['never', {
        tags: {
          always: ['someOtherTag'],
        },
      }],
    },
    {
      code: `

        /**
         * Desc
         *
         */
        function quux (foo) {
          // with spaces
        }
      `,
      options: ['never', {
        tags: {
          any: ['*description'],
        },
      }],
    },
    {
      code: `

        /**
         * Desc

         */
        function quux (foo) {
          // with spaces
        }
      `,
      options: ['always', {
        tags: {
          any: ['*description'],
        },
      }],
    },
  ],
};
