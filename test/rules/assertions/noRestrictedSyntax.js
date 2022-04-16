export default {
  invalid: [
    {
      code: `
      /**
       *
       */
      function quux () {

      }
      `,
      errors: [
        {
          line: 2,
          message: 'Syntax is restricted: FunctionDeclaration',
        },
      ],
      options: [
        {
          contexts: [
            'FunctionDeclaration',
          ],
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      function quux () {

      }
      `,
      errors: [
        {
          line: 2,
          message: 'Oops: `FunctionDeclaration`.',
        },
      ],
      options: [
        {
          contexts: [
            {
              context: 'FunctionDeclaration',
              message: 'Oops: `{{context}}`.',
            },
          ],
        },
      ],
    },
    {
      code: `
      /**
       * @implements {Bar|Foo}
       */
      function quux () {

      }
      `,
      errors: [
        {
          line: 2,
          message: 'Syntax is restricted: FunctionDeclaration with JsdocBlock[postDelimiter=""]:has(JsdocTypeUnion > JsdocTypeName[value="Bar"]:nth-child(1))',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTypeUnion > JsdocTypeName[value="Bar"]:nth-child(1))',
              context: 'FunctionDeclaration',
            },
          ],
        },
      ],
    },
    {
      code: `
      /**
       * @implements {Bar|Foo}
       */
      function quux () {

      }
      `,
      errors: [
        {
          line: 2,
          message: 'The bar one: FunctionDeclaration.',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTypeUnion > JsdocTypeName[value="Foo"]:nth-child(1))',
              context: 'FunctionDeclaration',
              message: 'The foo one: {{context}}.',
            },
            {
              comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTypeUnion > JsdocTypeName[value="Bar"]:nth-child(1))',
              context: 'FunctionDeclaration',
              message: 'The bar one: {{context}}.',
            },
          ],
        },
      ],
    },
    {
      code: `
      /**
       * @implements {Bar|Foo}
       */
      function quux () {

      }
      `,
      errors: [
        {
          line: 2,
          message: 'The bar one: FunctionDeclaration.',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTypeUnion > JsdocTypeName[value="Bar"]:nth-child(1))',
              context: 'FunctionDeclaration',
              message: 'The bar one: {{context}}.',
            },
            {
              comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTypeUnion > JsdocTypeName[value="Foo"]:nth-child(1))',
              context: 'FunctionDeclaration',
              message: 'The foo one: {{context}}.',
            },
          ],
        },
      ],
    },
    {
      code: `
      /**
       * @implements {Bar|Foo}
       */
      function quux () {

      }
      `,
      errors: [
        {
          line: 2,
          message: 'Rule `no-restricted-syntax` is missing a `context` option.',
        },
      ],
    },
    {
      code: `
        /**
         * @param opt_a
         * @param opt_b
         */
        function a () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Only allowing names not matching `/^opt_/i`.',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTag[name=/opt_/])',
              context: 'FunctionDeclaration',
              message: 'Only allowing names not matching `/^opt_/i`.',
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @param opt_a
         * @param opt_b
         */
        function a () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Only allowing names not matching `/^opt_/i`.',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTag[name=/opt_/])',
              context: 'any',
              message: 'Only allowing names not matching `/^opt_/i`.',
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @param opt_a
         * @param opt_b
         */
        function a () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Only allowing names not matching `/^opt_/i`.',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTag[name=/opt_/])',
              message: 'Only allowing names not matching `/^opt_/i`.',
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @param opt_a
         * @param opt_b
         */
        function a () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Only allowing names not matching `/^opt_/i`.',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTag[name=/not-this/])',
              context: 'any',
              message: 'Only allowing names not matching `/^not-this/i`.',
            },
            {
              comment: 'JsdocBlock:has(JsdocTag[name=/opt_/])',
              context: 'any',
              message: 'Only allowing names not matching `/^opt_/i`.',
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @param opt_a
         * @param opt_b
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Only allowing names not matching `/^opt_/i`.',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTag[name=/opt_/])',
              context: 'any',
              message: 'Only allowing names not matching `/^opt_/i`.',
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @enum {String}
         * Object holding values of some custom enum
         */
        const MY_ENUM = Object.freeze({
          VAL_A: "myvala"
        } as const);
      `,
      errors: [
        {
          line: 2,
          message: '@enum not allowed on declarations',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTag ~ JsdocTag[tag=/private|protected/])',
              context: 'any',
              message: 'Access modifier tags must come first',
            },
            {
              comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTag[tag="enum"])',
              context: ':declaration',
              message: '@enum not allowed on declarations',
            },
          ],
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /** @type {React.FunctionComponent<{ children: React.ReactNode }>}*/
      const MyComponent = ({ children }) => {
         return children;
      }
      `,
      errors: [
        {
          line: 2,
          message: 'The `FunctionComponent` type is not allowed. Please use `FC` instead.',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTag[tag="type"]:has([value=/FunctionComponent/]))',
              context: 'any',
              message: 'The `FunctionComponent` type is not allowed. Please use `FC` instead.',
            },
          ],
        },
      ],
    },
    {
      code: `
        class a {
          /** */
          private b () {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax is restricted: MethodDefinition:not([accessibility="public"]):has(JsdocBlock)',
        },
      ],
      ignoreReadme: true,
      options: [
        {
          contexts: [
            {
              context: 'MethodDefinition:not([accessibility="public"]):has(JsdocBlock)',
            },
          ],
        },
      ],
      parser: require.resolve('@es-joy/jsdoc-eslint-parser/typescript.js'),
    },
  ],
  valid: [
    {
      code: `
      /**
       *
       */
      function quux () {

      }
      `,
      options: [
        {
          contexts: [
            'FunctionExpression',
          ],
        },
      ],
    },
    {
      code: `
      /**
       * @implements {Bar|Foo}
       */
      function quux () {

      }
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTypeUnion > JsdocTypeName[value="Foo"]:nth-child(1))',
              context: 'FunctionDeclaration',
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @param ab
         * @param cd
         */
        function a () {}
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTag[name=/opt_/])',
              context: 'any',
              message: 'Only allowing names not matching `/^opt_/i`.',
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @param ab
         * @param cd
         */
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTag[name=/opt_/])',
              context: 'any',
              message: 'Only allowing names not matching `/^opt_/i`.',
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @param ab
         * @param cd
         */
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTag[name=/opt_/])',
              message: 'Only allowing names not matching `/^opt_/i`.',
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @enum {String}
         * Object holding values of some custom enum
         */
        const MY_ENUM = Object.freeze({
          VAL_A: "myvala"
        } as const);
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTag ~ JsdocTag[tag=/private|protected/])',
              context: 'any',
              message: 'Access modifier tags must come first',
            },
            {
              comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTag[tag="enum"])',
              context: ':declaration:not(TSEnumDeclaration):not(:has(ObjectExpression)), :function',
              message: '@enum is only allowed on potential enum types',
            },
          ],
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        /**
         * @param {(...args: any[]) => any} fn
         * @returns {(...args: any[]) => any}
         */
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTag[tag="type"]:has([value=/FunctionComponent/]))',
              context: 'any',
              message: 'The `FunctionComponent` type is not allowed. Please use `FC` instead.',
            },
          ],
        },
      ],
    },
    {
      code: `
        /** Does something very important. */
        function foo(): string;
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[endLine=0][description!=/^\\S[\\s\\S]*\\S\\s$/]',
            },
          ],
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
  ],
};
