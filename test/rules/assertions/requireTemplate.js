import {parser as typescriptEslintParser} from 'typescript-eslint';

export default {
  invalid: [
    {
      code: `
        /**
         *
         */
        type Pairs<D, V> = [D, V | undefined];
      `,
      errors: [
        {
          line: 2,
          message: 'Missing @template D',
        },
        {
          line: 2,
          message: 'Missing @template V',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
        /**
         *
         */
        export type Pairs<D, V> = [D, V | undefined];
      `,
      errors: [
        {
          line: 2,
          message: 'Missing @template D',
        },
        {
          line: 2,
          message: 'Missing @template V',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
        /**
         * @typedef {[D, V | undefined]} Pairs
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Missing @template D',
        },
        {
          line: 3,
          message: 'Missing @template V',
        },
      ],
    },
    {
      code: `
        /**
         * @typedef {[D, V | undefined]} Pairs
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Missing @template D',
        },
        {
          line: 3,
          message: 'Missing @template V',
        },
      ],
      settings: {
        jsdoc: {
          mode: 'permissive',
        },
      },
    },
    {
      code: `
        /**
         * @template D, U
         */
        export type Extras<D, U, V> = [D, U, V | undefined];
      `,
      errors: [
        {
          line: 2,
          message: 'Missing @template V',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
        /**
         * @template D, U
         * @typedef {[D, U, V | undefined]} Extras
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Missing @template V',
        },
      ],
    },
    {
      code: `
        /**
         * @template D, V
         */
        export type Pairs<D, V> = [D, V | undefined];
      `,
      errors: [
        {
          line: 3,
          message: 'Missing separate @template for V',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
      options: [
        {
          requireSeparateTemplates: true,
        }
      ],
    },
    {
      code: `
        /**
         * @template D, V
         * @typedef {[D, V | undefined]} Pairs
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Missing separate @template for V',
        },
      ],
      options: [
        {
          requireSeparateTemplates: true,
        }
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * @template D
         * @template V
         */
        export type Pairs<D, V> = [D, V | undefined];
      `,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
        /**
         * @template D
         * @template V
         * @typedef {[D, V | undefined]} Pairs
         */
      `,
    },
    {
      code: `
        /**
         * @template D, U, V
         */
        export type Extras<D, U, V> = [D, U, V | undefined];
      `,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
        /**
         * @template D, U, V
         * @typedef {[D, U, V | undefined]} Extras
         */
      `,
    },
    {
      code: `
        /**
         * @typedef {[D, U, V | undefined]} Extras
         * @typedef {[D, U, V | undefined]} Extras
         */
      `,
    },
    {
      code: `
        /**
         * @typedef Foo
         * @prop {string} bar
         */
      `,
    },
  ],
};
