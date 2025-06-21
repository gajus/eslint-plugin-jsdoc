import {
  parser as typescriptEslintParser,
} from 'typescript-eslint';

export default /** @type {import('../index.js').TestCases} */ ({
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
          ignoreSameLine: false,
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
          ignoreSameLine: false,
          ignoreSingleLines: false,
        },
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
          message: 'Required 1 line(s) before JSDoc block',
        },
      ],
      options: [
        {
          checkBlockStarts: true,
        },
      ],
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
          message: 'Required 1 line(s) before JSDoc block',
        },
      ],
      options: [
        {
          checkBlockStarts: true,
        },
      ],
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
          message: 'Required 1 line(s) before JSDoc block',
        },
      ],
      options: [
        {
          checkBlockStarts: true,
        },
      ],
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
          message: 'Required 1 line(s) before JSDoc block',
        },
      ],
      options: [
        {
          checkBlockStarts: true,
        },
      ],
      output: `
        const values = [

          /**
           * Description.
           */
          value,
        ];
      `,
    },
    {
      code: `
        const values = [
          value1,
          /**
           * Description.
           */
          value2
        ];
      `,
      errors: [
        {
          line: 4,
          message: 'Required 1 line(s) before JSDoc block',
        },
      ],
      output: `
        const values = [
          value1,

          /**
           * Description.
           */
          value2
        ];
      `,
    },
    {
      code: `
        const values = [
          value1,
          value2
        ]
        /**
         * Description.
         */
      `,
      errors: [
        {
          line: 6,
          message: 'Required 1 line(s) before JSDoc block',
        },
      ],
      output: `
        const values = [
          value1,
          value2
        ]

        /**
         * Description.
         */
      `,
    },
    {
      // This test is interesting due to the lack of semicolons.
      code: `
        const value = 123
        /**
         * Description.
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Required 1 line(s) before JSDoc block',
        },
      ],
      output: `
        const value = 123

        /**
         * Description.
         */
      `,
    },
    {
      code: `
        type UnionDocumentation =
          /** Description. */
          | { someProp: number }
          /** Description. */
          | { otherProp: string }

        type IntersectionDocumentation =
          /** Description. */
          { someProp: number } &
          /** Description. */
          { otherProp: string }
      `,
      errors: [
        {
          line: 5,
          message: 'Required 1 line(s) before JSDoc block',
        },
        {
          line: 11,
          message: 'Required 1 line(s) before JSDoc block',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          ignoreSingleLines: false,
        },
      ],
      output: `
        type UnionDocumentation =
          /** Description. */
          | { someProp: number }

          /** Description. */
          | { otherProp: string }

        type IntersectionDocumentation =
          /** Description. */
          { someProp: number } &

          /** Description. */
          { otherProp: string }
      `,
    },
    {
      // While this looks ugly this is exactly how Prettier currently requires such an intersection
      // to be formatted. See https://github.com/prettier/prettier/issues/3986.
      code: `
        type IntersectionDocumentation = {
          someProp: number;
        } & /** Description. */ {
          otherProp: string;
        };
      `,
      errors: [
        {
          line: 4,
          message: 'Required 1 line(s) before JSDoc block',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          ignoreSameLine: false,
          ignoreSingleLines: false,
        },
      ],
      output: `
        type IntersectionDocumentation = {
          someProp: number;
        } &

        /** Description. */ {
          otherProp: string;
        };
      `,
    },
    {
      code: `
        /** The parameters for a request */
        export type RequestParams = {
          /** The year to retrieve. */
          year: \`\${number}\`;
          /**
           * The month to retrieve.
           */
          month: \`\${number}\`;
        }
      `,
      errors: [
        {
          line: 6,
          message: 'Required 1 line(s) before JSDoc block',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          ignoreSingleLines: true,
        },
      ],
      output: `
        /** The parameters for a request */
        export type RequestParams = {
          /** The year to retrieve. */
          year: \`\${number}\`;

          /**
           * The month to retrieve.
           */
          month: \`\${number}\`;
        }
      `,
    },
  ],
  valid: [
    {
      code: '/**\n *\n */',
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
          excludedTags: [
            'lends',
          ],
          ignoreSameLine: false,
        },
      ],
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
    },
    {
      code: `
        class SomeClass {
          constructor(
            /**
             * Description.
             */
            param
          ) {};

          method(
            /**
             * Description.
             */
            param
          ) {};
        }
      `,
    },
    {
      code: `
        type FunctionAlias1 =
          /**
           * @param param - Description.
           */
          (param: number) => void;

        type FunctionAlias2 = (
          /**
           * @param param - Description.
           */
          param: number
        ) => void;
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        type UnionDocumentation =
          /** Description. */
          | { someProp: number }

          /** Description. */
          | { otherProp: string }

        type IntersectionDocumentation =
          /** Description. */
          { someProp: number } &

          /** Description. */
          { otherProp: string }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        type IntersectionDocumentation = {
          someProp: number;
        } & /** Description. */ {
          otherProp: string;
        };
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /** The parameters for a request */
        export type RequestParams = {
          /** The year to retrieve. */
          year: \`\${number}\`;
          /** The month to retrieve. */
          month: \`\${number}\`;
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          ignoreSingleLines: true,
        },
      ],
    },
  ],
});
