import {parser as typescriptEslintParser} from 'typescript-eslint';

export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
      /**
       *
       **
       */
      `,
      errors: [
        {
          line: 4,
          message: 'Should be no multiple asterisks on middle lines.',
        },
      ],
      output: `
      /**
       *
       *
       */
      `,
    },
    {
      code: `
      /**
       *
       **
       */
      `,
      errors: [
        {
          line: 4,
          message: 'Should be no multiple asterisks on middle lines.',
        },
      ],
      options: [
        {
          preventAtMiddleLines: true,
        },
      ],
      output: `
      /**
       *
       *
       */
      `,
    },
    {
      code: `
      /**
       *
       **
       */
      `,
      errors: [
        {
          line: 4,
          message: 'Should be no multiple asterisks on middle lines.',
        },
      ],
      options: [
        {
          preventAtEnd: false,
        },
      ],
      output: `
      /**
       *
       *
       */
      `,
    },
    {
      code: `
      /**
       * With a description
       * @tag {SomeType} and a tag with details
       **
       */
      `,
      errors: [
        {
          line: 5,
          message: 'Should be no multiple asterisks on middle lines.',
        },
      ],
      output: `
      /**
       * With a description
       * @tag {SomeType} and a tag with details
       *
       */
      `,
    },
    {
      code: `
      /**
       **
       *
       */
      `,
      errors: [
        {
          line: 3,
          message: 'Should be no multiple asterisks on middle lines.',
        },
      ],
      output: `
      /**
       *
       *
       */
      `,
    },
    {
      code: `
      /**
       * Desc.
       *
       **/
      `,
      errors: [
        {
          line: 5,
          message: 'Should be no multiple asterisks on end lines.',
        },
      ],
      output: `
      /**
       * Desc.
       *
       */
      `,
    },
    {
      code: `
      /**
       * Desc.
       *
       **/
      `,
      errors: [
        {
          line: 5,
          message: 'Should be no multiple asterisks on end lines.',
        },
      ],
      options: [
        {
          preventAtEnd: true,
        },
      ],
      output: `
      /**
       * Desc.
       *
       */
      `,
    },
    {
      code: `
      /**
       * Desc.
       *
       abc * **/
      `,
      errors: [
        {
          line: 5,
          message: 'Should be no multiple asterisks on end lines.',
        },
      ],
      options: [
        {
          preventAtEnd: true,
        },
      ],
      output: `
      /**
       * Desc.
       *
       abc*/
      `,
    },
    {
      code: `
      /**
       * Desc.
       *
       **/
      `,
      errors: [
        {
          line: 5,
          message: 'Should be no multiple asterisks on end lines.',
        },
      ],
      options: [
        {
          preventAtMiddleLines: false,
        },
      ],
      output: `
      /**
       * Desc.
       *
       */
      `,
    },
    {
      code: `
      /** Desc. **/
      `,
      errors: [
        {
          line: 2,
          message: 'Should be no multiple asterisks on end lines.',
        },
      ],
      output: `
      /** Desc. */
      `,
    },
    {
      code: `
      /** @someTag name desc. **/
      `,
      errors: [
        {
          line: 2,
          message: 'Should be no multiple asterisks on end lines.',
        },
      ],
      output: `
      /** @someTag name desc. */
      `,
    },
    {
      code: `
      /** abc * */
      `,
      errors: [
        {
          line: 2,
          message: 'Should be no multiple asterisks on end lines.',
        },
      ],
      output: `
      /** abc */
      `,
    },
    {
      code: `
      /**
       * Preserve user's whitespace when fixing (though one may also
       *   use an align rule)
       *
       * */
      `,
      errors: [
        {
          line: 6,
          message: 'Should be no multiple asterisks on end lines.',
        },
      ],
      options: [
        {
          preventAtEnd: true,
        },
      ],
      output: `
      /**
       * Preserve user's whitespace when fixing (though one may also
       *   use an align rule)
       *
        */
      `,
    },
    {
      code: `
      /**
       * The method does 2 things:
       * * Thing 1
       * * Thing 2
       */
      `,
      errors: [
        {
          line: 4,
          message: 'Should be no multiple asterisks on middle lines.',
        },
      ],
      options: [
        {
          allowWhitespace: false,
        },
      ],
      output: `
      /**
       * The method does 2 things:
       * Thing 1
       * * Thing 2
       */
      `,
    },
    {
      code: `
      /**
       * This muti-line comment contains some
       * *non-standard bold* syntax
       */
      `,
      errors: [
        {
          line: 4,
          message: 'Should be no multiple asterisks on middle lines.',
        },
      ],
      options: [
        {
          allowWhitespace: false,
        },
      ],
      output: `
      /**
       * This muti-line comment contains some
       * non-standard bold* syntax
       */
      `,
    },
    {
      code: `
      /** Desc. **/
      `,
      errors: [
        {
          line: 2,
          message: 'Should be no multiple asterisks on end lines.',
        },
      ],
      options: [
        {
          allowWhitespace: true,
        },
      ],
      output: `
      /** Desc. */
      `,
    },
  ],
  valid: [
    {
      code: `
      /**
       *
       * Desc. ***
       */
      `,
    },
    {
      code: `
      /**
       * Desc. ***
       *
       */
      `,
    },
    {
      code: `
      /**
       * Desc.
       *
       * sth */
      `,
    },
    {
      code: `
      /**
       **
       *
       */
      `,
      options: [
        {
          preventAtMiddleLines: false,
        },
      ],
    },
    {
      code: `
      /**
       *
       *
       **/
      `,
      options: [
        {
          preventAtEnd: false,
        },
      ],
    },
    {
      code: `
      /**
       * With a desc.
       * and ***
       */
      `,
    },
    {
      code: `
      /**
       * and ***
       * With a desc.
       */
      `,
    },
    {
      code: `
      /**
       * With a desc.
       * With a desc.
       * Desc. */
      `,
    },
    {
      code: `
      /**
       * With a description
       * @tag {SomeType} and a tag with details
       *
       */
      `,
    },
    {
      code: `
      /** abc */
      function foo() {
          //
      }
      `,
    },
    {
      code: `
      /** foo */
      function foo(): void {
          //
      }
      `,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
      /** @aTag abc */
      function foo() {
          //
      }
      `,
    },
    {
      code: `
      /**
       * **Bold**
       */
      `,
    },
    {
      code: `
      /**
       * Preserve user's bold statement when fixing.
       *
       * **Bold example:** Hi there.
       */
      `,
    },
    {
      code: `
      /**
       * The method does 2 things:
       * * Thing 1
       * * Thing 2
       */
      `,
      options: [
        {
          allowWhitespace: true,
        },
      ],
    },
    {
      code: `
      /**
       * This muti-line comment contains some
       * *non-standard bold* syntax
       */
      `,
      options: [
        {
          allowWhitespace: true,
        },
      ],
    },
    {
      code: `
      /** abc */
      function foo() {
          //
      }
      `,
      options: [
        {
          allowWhitespace: true,
        },
      ],
    },
  ],
});
