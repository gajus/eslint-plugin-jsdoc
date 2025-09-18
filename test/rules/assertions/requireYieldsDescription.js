import {
  parser as typescriptEslintParser,
} from 'typescript-eslint';

export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
        /**
         * @yields {SomeType}
         */
      `,
      errors: [
        {
          line: 2,
          message: '@yields should have a description',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * @yields {SomeType} Has a description
         */
      `,
    },
    {
      code: `
        /**
         * @yields
         *  The results.
         */
        export function *test1(): IterableIterator<string> { yield "hello"; }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
  ],
});
