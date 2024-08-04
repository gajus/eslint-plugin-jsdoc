export default {
  invalid: [
    {
      code: `
        someCode;
        /**
         *
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Required 1 line(s) before JSDoc block',
        },
      ],
      output: `
        someCode;

        /**
         *
         */
      `,
    },
    {
      code: `
        someCode; /**
         *
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Required 1 line(s) before JSDoc block',
        },
      ],
      options: [
        {
          ignoreSameLine: false
        }
      ],
      output: `
        someCode;

        /**
         *
         */
      `,
    },
    {
      code: `
        someCode; /** */
      `,
      errors: [
        {
          line: 2,
          message: 'Required 1 line(s) before JSDoc block',
        },
      ],
      options: [
        {
          ignoreSameLine: false
        }
      ],
      output: `
        someCode;

        /** */
      `,
    },
    {
      code: `
        someCode;
        /**
         *
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Required 2 line(s) before JSDoc block',
        },
      ],
      options: [
        {
          lines: 2,
        },
      ],
      output: `
        someCode;


        /**
         *
         */
      `,
    },
    {
      code: `
        // Some comment
        /**
         *
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Required 1 line(s) before JSDoc block',
        },
      ],
      output: `
        // Some comment

        /**
         *
         */
      `,
    },
    {
      code: `
        /* Some comment */
        /**
         *
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Required 1 line(s) before JSDoc block',
        },
      ],
      output: `
        /* Some comment */

        /**
         *
         */
      `,
    },
    {
      code: `
        /**
         * Some comment
         */
        /**
         *
         */
      `,
      errors: [
        {
          line: 5,
          message: 'Required 1 line(s) before JSDoc block',
        },
      ],
      output: `
        /**
         * Some comment
         */

        /**
         *
         */
      `,
    },
  ],
  valid: [
    {
      code: `/**\n *\n */`,
    },
    {
      code: `
        someCode;

        /**
         *
         */
      `,
    },
    {
      code: `
        someCode;


        /**
         *
         */
      `,
      options: [
        {
          lines: 2,
        },
      ],
    },
    {
      code: `
        // Some comment

        /**
         *
         */
      `,
    },
    {
      code: `
        /* Some comment */

        /**
         *
         */
      `,
    },
    {
      code: `
        /**
         * Some comment
         */

        /**
         *
         */
      `,
    },
    {
      code: `
        someCode; /** */
      `,
    },
    {
      code: `const a = {
        someProp: /** @type {SomeCast} */ (someVal)
      };
      `,
    },
    {
      code: `const a = /** @lends SomeClass */ {
        someProp: (someVal)
      };
      `,
      options: [
        {
          excludedTags: ['lends'],
          ignoreSameLine: false
        }
      ]
    },
  ],
};
