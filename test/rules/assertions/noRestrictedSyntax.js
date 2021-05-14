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
            comment: 'JSDocBlock[postDelimiter=""]:has(JSDocTypeUnion[left.name="Bar"])',
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
            comment: 'JSDocBlock[postDelimiter=""]:has(JSDocTypeUnion[left.name="Foo"])',
            context: 'FunctionDeclaration',
            message: 'The foo one: {{context}}.',
          },
          {
            comment: 'JSDocBlock[postDelimiter=""]:has(JSDocTypeUnion[left.name="Bar"])',
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
            comment: 'JSDocBlock[postDelimiter=""]:has(JSDocTypeUnion[left.name="Foo"])',
            context: 'FunctionDeclaration',
          },
        ],
      }],
    },
  ],
};
