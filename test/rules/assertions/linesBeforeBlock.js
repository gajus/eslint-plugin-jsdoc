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
    {
      code: `
        {
          /**
           * Description.
           */
          let value;
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Required 1 line(s) before JSDoc block'
        }
      ],
      options: [{ checkBlockStarts: true }],
      output: `
        {

          /**
           * Description.
           */
          let value;
        }
      `,
    },
    {
      code: `
        class MyClass {
          /**
           * Description.
           */
          method() {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Required 1 line(s) before JSDoc block'
        }
      ],
      options: [{ checkBlockStarts: true }],
      output: `
        class MyClass {

          /**
           * Description.
           */
          method() {}
        }
      `,
    },
    {
      code: `
        function myFunction() {
          /**
           * Description.
           */
          let value;
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Required 1 line(s) before JSDoc block'
        }
      ],
      options: [{ checkBlockStarts: true }],
      output: `
        function myFunction() {

          /**
           * Description.
           */
          let value;
        }
      `,
    },
    {
      code: `
        const values = [
          /**
           * Description.
           */
          value,
        ];
      `,
      errors: [
        {
          line: 3,
          message: 'Required 1 line(s) before JSDoc block'
        }
      ],
      options: [{ checkBlockStarts: true }],
      output: `
        const values = [

          /**
           * Description.
           */
          value,
        ];
      `,
    }
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
    {
      code: `
        {
          /**
           * Description.
           */
          let value;
        }
      `,
    },
    {
      code: `
        class MyClass {
          /**
           * Description.
           */
          method() {}
        }
      `,
    },
    {
      code: `
        function myFunction() {
          /**
           * Description.
           */
          let value;
        }
      `,
    }
  ],
};
