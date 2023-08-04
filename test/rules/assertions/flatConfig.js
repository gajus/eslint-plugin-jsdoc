// @ts-expect-error Our package is not ESM
import * as tsParser from '@typescript-eslint/parser';

export default {
  'valid-types': {
    invalid: [],
    valid: [
      {
        code: `
        /**
         * Foo function.
         *
         * @param {[number, string]} bar - The bar array.
         */
        function foo(bar) {}
        `,
        languageOptions: {
          parser: tsParser,
          parserOptions: {
            ecmaVersion: 2_020,
            sourceType: 'module',
          },
        },
        // Need manual setting here until fixing:
        // https://github.com/eslint/eslint/pull/16944
        // https://github.com/typescript-eslint/typescript-eslint/issues/6541
        settings: {
          jsdoc: {
            mode: 'typescript',
          },
        },
      },
    ],
  },
};
