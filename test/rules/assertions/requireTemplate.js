import {
  parser as typescriptEslintParser,
} from 'typescript-eslint';

export default /** @type {import('../index.js').TestCases} */ ({
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
        parser: typescriptEslintParser,
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
        parser: typescriptEslintParser,
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
        parser: typescriptEslintParser,
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
        parser: typescriptEslintParser,
      },
      options: [
        {
          requireSeparateTemplates: true,
        },
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
        },
      ],
    },
    {
      code: `
        /**
         * @template X
         * @typedef {object} Pairs
         * @property {D} foo
         * @property {X} bar
         */
      `,
      errors: [
        {
          line: 5,
          message: 'Missing @template D',
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        interface GenericIdentityFn<Type> {
          (arg: Type): Type;
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing @template Type',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         *
         */
        export interface GenericIdentityFn<Type> {
          (arg: Type): Type;
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing @template Type',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         *
         */
        export default interface GenericIdentityFn<Type> {
          (arg: Type): Type;
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing @template Type',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         *
         */
        function identity<Type>(arg: Type): Type {
          return arg;
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing @template Type',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         *
         */
        export function identity<Type>(arg: Type): Type {
          return arg;
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing @template Type',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         *
         */
        export default function identity<Type>(arg: Type): Type {
          return arg;
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing @template Type',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         *
         */
        class GenericNumber<NumType> {
          zeroValue: NumType;
          add: (x: NumType, y: NumType) => NumType;
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing @template NumType',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         *
         */
        export class GenericNumber<NumType> {
          zeroValue: NumType;
          add: (x: NumType, y: NumType) => NumType;
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing @template NumType',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         *
         */
        export default class GenericNumber<NumType> {
          zeroValue: NumType;
          add: (x: NumType, y: NumType) => NumType;
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing @template NumType',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         *
         */
        export default class <NumType> {
          zeroValue: NumType;
          add: (x: NumType, y: NumType) => NumType;
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing @template NumType',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @callback
         * @param {[D, V | undefined]} someParam
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Missing @template D',
        },
        {
          line: 4,
          message: 'Missing @template V',
        },
      ],
    },
    {
      code: `
        /**
         * @callback
         * @returns {[D, V | undefined]}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Missing @template D',
        },
        {
          line: 4,
          message: 'Missing @template V',
        },
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
        parser: typescriptEslintParser,
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
        parser: typescriptEslintParser,
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
    {
      code: `
        /**
         * @template D
         * @template V
         * @typedef {object} Pairs
         * @property {D} foo
         * @property {V} bar
         */
      `,
    },
    {
      code: `
        /**
         * @template Type
         */
        interface GenericIdentityFn<Type> {
          (arg: Type): Type;
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template Type
         */
        export interface GenericIdentityFn<Type> {
          (arg: Type): Type;
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template Type
         */
        export default interface GenericIdentityFn<Type> {
          (arg: Type): Type;
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template Type
         */
        function identity<Type>(arg: Type): Type {
          return arg;
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template Type
         */
        export function identity<Type>(arg: Type): Type {
          return arg;
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template Type
         */
        export default function identity<Type>(arg: Type): Type {
          return arg;
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template NumType
         */
        class GenericNumber<NumType> {
          zeroValue: NumType;
          add: (x: NumType, y: NumType) => NumType;
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template NumType
         */
        export class GenericNumber<NumType> {
          zeroValue: NumType;
          add: (x: NumType, y: NumType) => NumType;
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template NumType
         */
        export default class GenericNumber<NumType> {
          zeroValue: NumType;
          add: (x: NumType, y: NumType) => NumType;
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template NumType
         */
        export default class <NumType> {
          zeroValue: NumType;
          add: (x: NumType, y: NumType) => NumType;
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @callback
         * @template D
         * @template V
         * @param {[D, V | undefined]} someParam
         */
      `,
    },
    {
      code: `
        /**
         * @callback
         * @template D
         * @template V
         * @returns {[D, V | undefined]}
         */
      `,
    },
    {
      code: `
        /**
         * @callback
         * @returns {[Something | undefined]}
         */
      `,
    },
    {
      code: `
        /**
         * @template {string | Buffer} [T=string, U=number]
         * @typedef {object} Dirent
         * @property {T} name name
         * @property {U} aNumber number
         * @property {string} parentPath path
         */
      `,
    },
  ],
});
