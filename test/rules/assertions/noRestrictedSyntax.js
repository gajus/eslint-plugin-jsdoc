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
          message: 'Syntax is restricted: FunctionDeclaration.',
        },
      ],
      options: [{
        contexts: [
          'FunctionDeclaration',
        ],
      }],
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
      options: [{
        contexts: [
          {
            context: 'FunctionDeclaration',
            message: 'Oops: `{{context}}`.',
          },
        ],
      }],
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
          message: 'Syntax is restricted: FunctionDeclaration.',
        },
      ],
      options: [{
        contexts: [
          {
            comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTypeUnion > JsdocTypeName[value="Bar"]:nth-child(1))',
            context: 'FunctionDeclaration',
          },
        ],
      }],
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
      options: [{
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
      }],
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
      errors: [{
        line: 2,
        message: 'Only allowing names not matching `/^opt_/i`.',
      }],
      options: [{
        contexts: [
          {
            comment: 'JsdocBlock:has(JsdocTag[name=/opt_/])',
            context: 'FunctionDeclaration',
            message: 'Only allowing names not matching `/^opt_/i`.',
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @param opt_a
         * @param opt_b
         */
        function a () {}
      `,
      errors: [{
        line: 2,
        message: 'Only allowing names not matching `/^opt_/i`.',
      }],
      options: [{
        contexts: [
          {
            comment: 'JsdocBlock:has(JsdocTag[name=/opt_/])',
            context: 'any',
            message: 'Only allowing names not matching `/^opt_/i`.',
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @param opt_a
         * @param opt_b
         */
        function a () {}
      `,
      errors: [{
        line: 2,
        message: 'Only allowing names not matching `/^opt_/i`.',
      }],
      options: [{
        contexts: [
          {
            comment: 'JsdocBlock:has(JsdocTag[name=/opt_/])',
            message: 'Only allowing names not matching `/^opt_/i`.',
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @param opt_a
         * @param opt_b
         */
        function a () {}
      `,
      errors: [{
        line: 2,
        message: 'Only allowing names not matching `/^opt_/i`.',
      }],
      options: [{
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
      }],
    },
    {
      code: `
        /**
         * @param opt_a
         * @param opt_b
         */
      `,
      errors: [{
        line: 2,
        message: 'Only allowing names not matching `/^opt_/i`.',
      }],
      options: [{
        contexts: [
          {
            comment: 'JsdocBlock:has(JsdocTag[name=/opt_/])',
            context: 'any',
            message: 'Only allowing names not matching `/^opt_/i`.',
          },
        ],
      }],
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
      options: [{
        contexts: [
          'FunctionExpression',
        ],
      }],
    },
    {
      code: `
      /**
       * @implements {Bar|Foo}
       */
      function quux () {

      }
      `,
      options: [{
        contexts: [
          {
            comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTypeUnion > JsdocTypeName[value="Foo"]:nth-child(1))',
            context: 'FunctionDeclaration',
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @param ab
         * @param cd
         */
        function a () {}
      `,
      options: [{
        contexts: [
          {
            comment: 'JsdocBlock:has(JsdocTag[name=/opt_/])',
            context: 'any',
            message: 'Only allowing names not matching `/^opt_/i`.',
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @param ab
         * @param cd
         */
      `,
      options: [{
        contexts: [
          {
            comment: 'JsdocBlock:has(JsdocTag[name=/opt_/])',
            context: 'any',
            message: 'Only allowing names not matching `/^opt_/i`.',
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @param ab
         * @param cd
         */
      `,
      options: [{
        contexts: [
          {
            comment: 'JsdocBlock:has(JsdocTag[name=/opt_/])',
            message: 'Only allowing names not matching `/^opt_/i`.',
          },
        ],
      }],
    },
  ],
};
