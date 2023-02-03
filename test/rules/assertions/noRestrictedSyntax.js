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
          message: 'Rule `no-restricted-syntax` is missing a `contexts` option.',
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
          message: 'Rule `no-restricted-syntax` is missing a `contexts` option.',
        },
      ],
      settings: {
        jsdoc: {
          contexts: [
            'FunctionDeclaration',
          ],
        },
      },
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
    {
      code: `
        /** Some text and more */
      `,
      errors: [
        {
          line: 2,
          message: 'Requiring descriptive text on 0th line only',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[descriptionStartLine=0][descriptionEndLine=0]',
              context: 'any',
              message: 'Requiring descriptive text on 0th line only',
            },
          ],
        },
      ],
    },
    {
      code: `
        /** Some text and
        * more
        */
      `,
      errors: [
        {
          line: 2,
          message: 'Requiring descriptive text on 0th line and no preterminal description',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[descriptionStartLine=0][hasPreterminalDescription=0]',
              context: 'any',
              message: 'Requiring descriptive text on 0th line and no preterminal description',
            },
          ],
        },
      ],
    },
    {
      code: `
        /** Some text
        * @param sth Param text followed by no newline */
      `,
      errors: [
        {
          line: 2,
          message: 'Requiring descriptive text on 0th line but no preterminal description',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[descriptionStartLine=0][hasPreterminalTagDescription=1]',
              context: 'any',
              message: 'Requiring descriptive text on 0th line but no preterminal description',
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         *
         */
      `,
      errors: [
        {
          line: 2,
          message: '@see required on each block',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:not(*:has(JsdocTag[tag=see]))',
              context: 'any',
              message: '@see required on each block',
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @type {{a: string}}
         */
      `,
      errors: [
        {
          line: 2,
          message: '@type should be limited to numeric or string literals and names',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTag[tag=type][parsedType.type!=JsdocTypeStringValue][parsedType.type!=JsdocTypeNumber][parsedType.type!=JsdocTypeName])',
              context: 'any',
              message: '@type should be limited to numeric or string literals and names',
            },
            {
              comment: 'JsdocBlock:has(JsdocTag[tag=type][parsedType.type=JsdocTypeName]:not(*[parsedType.value=/^(true|false|null|undefined|boolean|number|string)$/]))',
              context: 'any',
              message: '@type names should only be recognized primitive types or literals',
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @type {abc}
         */
      `,
      errors: [
        {
          line: 2,
          message: '@type names should only be recognized primitive types or literals',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTag[tag=type][parsedType.type!=JsdocTypeStringValue][parsedType.type!=JsdocTypeNumber][parsedType.type!=JsdocTypeName])',
              context: 'any',
              message: '@type should be limited to numeric or string literals and names',
            },
            {
              comment: 'JsdocBlock:has(JsdocTag[tag=type][parsedType.type=JsdocTypeName]:not(*[parsedType.value=/^(true|false|null|undefined|boolean|number|string)$/]))',
              context: 'any',
              message: '@type names should only be recognized primitive types or literals',
            },
          ],
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      function test(): string { }
      `,
      errors: [
        {
          line: 2,
          message: 'Functions with non-void return types must have a @returns tag',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:not(*:has(JsdocTag[tag=/returns/]))',
              context: 'FunctionDeclaration[returnType.typeAnnotation.type!=/TSVoidKeyword|TSUndefinedKeyword/]',
              message: 'Functions with non-void return types must have a @returns tag',
            },
          ],
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       *
       */
      let test = (): string => { };
      `,
      errors: [
        {
          line: 2,
          message: 'Functions with non-void return types must have a @returns tag',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:not(*:has(JsdocTag[tag=/returns/]))',
              context: 'ArrowFunctionExpression[returnType.typeAnnotation.type!=/TSVoidKeyword|TSUndefinedKeyword/]',
              message: 'Functions with non-void return types must have a @returns tag',
            },
          ],
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       * @returns
       */
      let test: () => string;
      `,
      errors: [
        {
          line: 2,
          message: 'FunctionType\'s with non-void return types must have a @returns tag with a description',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:not(*:has(JsdocTag[tag=/returns/]:has(JsdocDescriptionLine)))',
              context: 'VariableDeclaration:has(*[typeAnnotation.typeAnnotation.type=/TSFunctionType/][typeAnnotation.typeAnnotation.returnType.typeAnnotation.type!=/TSVoidKeyword|TSUndefinedKeyword/])',
              message: 'FunctionType\'s with non-void return types must have a @returns tag with a description',
            },
          ],
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       *
       */
      class Test {
        abstract Test(): string;
      }
      `,
      errors: [
        {
          line: 2,
          message: 'methods with non-void return types must have a @returns tag',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:not(*:has(JsdocTag[tag=/returns/]))',
              context: 'TSEmptyBodyFunctionExpression[returnType.typeAnnotation.type!=/TSVoidKeyword|TSUndefinedKeyword/]',
              message: 'methods with non-void return types must have a @returns tag',
            },
          ],
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
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
    {
      code: `
        /** Some text and more */
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[descriptionStartLine=0][descriptionEndLine=1]',
              context: 'any',
              message: 'Requiring descriptive text on 0th line and no final newline',
            },
          ],
        },
      ],
    },
    {
      code: `
        /** Some text and
        * more */
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[descriptionStartLine=0][hasPreterminalDescription=0]',
              context: 'any',
              message: 'Requiring descriptive text on 0th line and no preterminal description',
            },
          ],
        },
      ],
    },
    {
      code: `
        /** Some text
        * @param sth Param text followed by newline
        */
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[descriptionStartLine=0][hasPreterminalTagDescription=1]',
              context: 'any',
              message: 'Requiring descriptive text on 0th line but no preterminal description',
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @type {123}
         */
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTag[tag=type][parsedType.type!=JsdocTypeStringValue][parsedType.type!=JsdocTypeNumber][parsedType.type!=JsdocTypeName])',
              context: 'any',
              message: '@type should be limited to numeric or string literals and names',
            },
            {
              comment: 'JsdocBlock:has(JsdocTag[tag=type][parsedType.type=JsdocTypeName]:not(*[parsedType.value=/^(true|false|null|undefined|boolean|number|string)$/]))',
              context: 'any',
              message: '@type names should only be recognized primitive types or literals',
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @type {boolean}
         */
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTag[tag=type][parsedType.type!=JsdocTypeStringValue][parsedType.type!=JsdocTypeNumber][parsedType.type!=JsdocTypeName])',
              context: 'any',
              message: '@type should be limited to numeric or string literals and names',
            },
            {
              comment: 'JsdocBlock:has(JsdocTag[tag=type][parsedType.type=JsdocTypeName]:not(*[parsedType.value=/^(true|false|null|undefined|boolean|number|string)$/]))',
              context: 'any',
              message: '@type names should only be recognized primitive types or literals',
            },
          ],
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      function test(): void { }
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:not(*:has(JsdocTag[tag=/returns/]))',
              context: 'FunctionDeclaration[returnType.typeAnnotation.type!=/TSVoidKeyword|TSUndefinedKeyword/]',
              message: 'Functions with return types must have a @returns tag',
            },
          ],
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       *
       */
      let test = (): undefined => { };
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:not(*:has(JsdocTag[tag=/returns/]))',
              context: 'ArrowFunctionExpression[returnType.typeAnnotation.type!=/TSVoidKeyword|TSUndefinedKeyword/]',
              message: 'Functions with non-void return types must have a @returns tag',
            },
          ],
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       * @returns A description
       */
      let test: () => string;
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:not(*:has(JsdocTag[tag=/returns/]:has(JsdocDescriptionLine)))',
              context: 'VariableDeclaration:has(*[typeAnnotation.typeAnnotation.type=/TSFunctionType/])',
              message: 'FunctionType\'s with non-void return types must have a @returns tag',
            },
          ],
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       *
       */
      class Test {
        abstract Test(): void;
      }
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:not(*:has(JsdocTag[tag=/returns/]))',
              context: 'TSEmptyBodyFunctionExpression[returnType.typeAnnotation.type!=/TSVoidKeyword|TSUndefinedKeyword/]',
              message: 'methods with non-void return types must have a @returns tag',
            },
          ],
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
  ],
};
