export default {
  invalid: [
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
          message: 'Syntax is required: FunctionDeclaration',
        },
      ],
      options: [{
        contexts: [
          {
            comment: 'JSDocBlock[postDelimiter=""]:has(JSDocTypeUnion[left.name="Foo"])',
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
          message: 'Problematic function syntax: `FunctionDeclaration`.',
        },
      ],
      options: [{
        contexts: [
          {
            comment: 'JSDocBlock[postDelimiter=""]:has(JSDocTypeUnion[left.name="Foo"])',
            context: 'FunctionDeclaration',
            message: 'Problematic function syntax: `{{context}}`.',
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
          message: 'Syntax is required: FunctionDeclaration',
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
       * @implements {Bar|Foo}
       */
      function quux () {

      }
      `,
      errors: [
        {
          message: 'Rule `no-restricted-syntax` is missing a `context` option.',
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
          message: 'Syntax is required: FunctionDeclaration',
        },
      ],
      options: [{
        contexts: [
          {
            comment: 'JSDocBlock[postDelimiter=""]:has(JSDocTypeUnion[left.name="Bar"])',
            context: 'FunctionDeclaration',
            minimum: 2,
          },
        ],
      }],
    },
  ],
  valid: [
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

      /**
       * @implements {Bar|Foo}
       */
      function bar () {

      }

      /**
       * @implements {Bar|Foo}
       */
      function baz () {

      }
      `,
      options: [{
        contexts: [
          {
            comment: 'JSDocBlock[postDelimiter=""]:has(JSDocTypeUnion[left.name="Bar"])',
            context: 'FunctionDeclaration',
            minimum: 2,
          },
        ],
      }],
    },
  ],
};
