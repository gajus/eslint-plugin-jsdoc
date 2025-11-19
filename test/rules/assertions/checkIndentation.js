import {
  parser as typescriptEslintParser,
} from 'typescript-eslint';

export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
          /**  foo */
          function quux () {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'There must be no indentation.',
        },
      ],
    },
    {
      code: `
          /**
           * foo
           *
           * @param bar
           *  baz
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 6,
          message: 'There must be no indentation.',
        },
      ],
    },
    {
      code: `
        /**
         * Foo
         *   bar
         */
        class Moo {}
      `,
      errors: [
        {
          line: 4,
          message: 'There must be no indentation.',
        },
      ],
    },
    {
      code: `
          /**
           * foo
           *
           * @example
           * anArray.filter((a) => {
           *   return a.b;
           * });
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 7,
          message: 'There must be no indentation.',
        },
      ],
      options: [
        {
          excludeTags: [],
        },
      ],
    },
    {
      code: `
          /**
           * foo
           *
           * @example
           *   aaaa
           * @returns
           *   eeee
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 8,
          message: 'There must be no indentation.',
        },
      ],
    },
    {
      code: `
          /**
           * foo
           * \`\`\`html
           * <section>
           *   <title>test</title>
           * </section>
           * \`\`\`
           * @returns
           *   eeee
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 10,
          message: 'There must be no indentation.',
        },
      ],
    },
    {
      code: `
          /**
           * foo
           * \`\`\`   aaaa\`\`\`
           * @returns
           *   eeee
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 6,
          message: 'There must be no indentation.',
        },
      ],
    },
    {
      code: `
          /**
          * @example <caption>
          * Here is a long
          *   indented summary of this
          * example
          * </caption>
          * \`\`\`js
          * function hi () {
          *   alert('Hello');
          * }
          * \`\`\`
          */
      `,
      errors: [
        {
          line: 5,
          message: 'There must be no indentation.',
        },
      ],
      options: [
        {
          excludeTags: [],
        },
      ],
    },
    {
      code: `
          /**
          * @example <caption>
          * Here is a long
          * summary of this
          * example
          * </caption>
          * // Code is not wrapped into fenced code block
          * function hi () {
          *   alert('Hello');
          * }
          */
      `,
      errors: [
        {
          line: 10,
          message: 'There must be no indentation.',
        },
      ],
      options: [
        {
          excludeTags: [],
        },
      ],
    },
    {
      code: `
        /**
         *   @param {number} val Still disallowed
         */
      `,
      errors: [
        {
          line: 3,
          message: 'There must be no indentation.',
        },
      ],
      options: [
        {
          allowIndentedSections: true,
        },
      ],
    },
    {
      code: `
        /**
         *   Disallowed
         *   Indentation
         */
      `,
      errors: [
        {
          line: 3,
          message: 'There must be no indentation.',
        },
      ],
      options: [
        {
          allowIndentedSections: true,
        },
      ],
    },
    {
      code: `
        /**
         * Some text
         *   that is indented
         *  but is inconsistent
         */
      `,
      errors: [
        {
          line: 5,
          message: 'There must be no indentation.',
        },
      ],
      options: [
        {
          allowIndentedSections: true,
        },
      ],
    },
  ],
  valid: [
    {
      code: `
          /**
           * foo
           *
           * @param bar
           * baz
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /*** foo */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * foo
           *
           * @example
           * anArray.filter((a) => {
           *   return a.b;
           * });
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * foo
           *
           * @example
           * anArray.filter((a) => {
           *   return a.b;
           * });
           * @returns
           *   eeee
           */
          function quux () {

          }
      `,
      options: [
        {
          excludeTags: [
            'example', 'returns',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * foo
           * \`\`\`html
           * <section>
           *   <title>test</title>
           * </section>
           * \`\`\`
           * @returns eeee
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * foo
           * \`\`\`   aaaa\`\`\`
           * @returns eeee
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
          * @example <caption>
          * Here is a long
          * summary of this
          * example
          * </caption>
          * \`\`\`js
          * function hi () {
          *   alert('Hello');
          * }
          * \`\`\`
          */
      `,
      options: [
        {
          excludeTags: [],
        },
      ],
    },
    {
      code: `
      /**
       * @example
       * \`\`\`
       * @MyDecorator({
       *   myOptions: 42
       * })
       * export class MyClass {}
       * \`\`\`
       */
      function MyDecorator(options: { myOptions: number }) {
        return (Base: Function) => {};
      }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          excludeTags: [
            'example', 'MyDecorator',
          ],
        },
      ],
    },
    {
      code: `
      /**
       * @example \`\`\`
       * @MyDecorator({
       *   myOptions: 42
       * })
       * export class MyClass {}
       * \`\`\`
       */
      function MyDecorator(options: { myOptions: number }) {
        return (Base: Function) => {};
      }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * Foobar
         *
         * This method does the following things:
         * - foo...
         *   this is the first step
         * - bar
         *   this is the second step
         */
      `,
      options: [
        {
          allowIndentedSections: true,
        },
      ],
    },
    {
      code: `
        /**
         * Allowed
         *   Indentation
         */
      `,
      options: [
        {
          allowIndentedSections: true,
        },
      ],
    },
    {
      code: `
        /**
         * @param {number} val Multi-
         *                     line
         */
      `,
      options: [
        {
          allowIndentedSections: true,
        },
      ],
    },
    {
      code: `
        /**
         * - foo:
         *   - bar
         */
      `,
      options: [
        {
          allowIndentedSections: true,
        },
      ],
    },
  ],
});
