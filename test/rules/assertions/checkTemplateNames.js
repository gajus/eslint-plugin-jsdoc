import {
  parser as typescriptEslintParser,
} from 'typescript-eslint';

export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
        /**
         * @template D
         * @template V
         */
        type Pairs<X, Y> = [X, Y | undefined];
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
        {
          line: 4,
          message: '@template V not in use',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template D
         * @template V
         */
        export type Pairs<X, Y> = [X, Y | undefined];
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
        {
          line: 4,
          message: '@template V not in use',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template D
         * @template V
         * @typedef {[X, Y | undefined]} Pairs
         */
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
        {
          line: 4,
          message: '@template V not in use',
        },
      ],
    },
    {
      code: `
        /**
         * @template D
         * @template V
         */
        export type Pairs = [number, undefined];
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
        {
          line: 4,
          message: '@template V not in use',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template D
         * @template V
         * @typedef {[undefined]} Pairs
         */
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
        {
          line: 4,
          message: '@template V not in use',
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
         * @template D, U, V
         */
        export type Extras<D, U> = [D, U | undefined];
      `,
      errors: [
        {
          line: 3,
          message: '@template V not in use',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template D, U, V
         * @typedef {[D, U | undefined]} Extras
         */
      `,
      errors: [
        {
          line: 3,
          message: '@template V not in use',
        },
      ],
    },
    {
      code: `
        /**
         * @template D
         * @template V
         * @typedef Pairs
         * @property {V} foo
         */
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
      ],
    },
    {
      code: `
        /**
         * @template D
         * @template V
         */
        interface GenericIdentityFn<Type> {
          (arg: Type): Type;
        }
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
        {
          line: 4,
          message: '@template V not in use',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template D
         * @template V
         */
        export interface GenericIdentityFn<Type> {
          (arg: Type): Type;
        }
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
        {
          line: 4,
          message: '@template V not in use',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template D
         * @template V
         */
        export default interface GenericIdentityFn<Type> {
          (arg: Type): Type;
        }
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
        {
          line: 4,
          message: '@template V not in use',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template D
         * @template V
         */
        function identity<Type>(arg: Type): Type {
          return arg;
        }
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
        {
          line: 4,
          message: '@template V not in use',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template D
         * @template V
         */
        export function identity<Type>(arg: Type): Type {
          return arg;
        }
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
        {
          line: 4,
          message: '@template V not in use',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template D
         * @template V
         */
        export default function identity<Type>(arg: Type): Type {
          return arg;
        }
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
        {
          line: 4,
          message: '@template V not in use',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template D
         * @template V
         */
        class GenericNumber<NumType> {
          zeroValue: NumType;
          add: (x: NumType, y: NumType) => NumType;
        }
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
        {
          line: 4,
          message: '@template V not in use',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template D
         * @template V
         */
        export class GenericNumber<NumType> {
          zeroValue: NumType;
          add: (x: NumType, y: NumType) => NumType;
        }
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
        {
          line: 4,
          message: '@template V not in use',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template D
         * @template V
         */
        export default class GenericNumber<NumType> {
          zeroValue: NumType;
          add: (x: NumType, y: NumType) => NumType;
        }
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
        {
          line: 4,
          message: '@template V not in use',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template D
         * @template V
         */
        export default class <NumType> {
          zeroValue: NumType;
          add: (x: NumType, y: NumType) => NumType;
        }
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
        {
          line: 4,
          message: '@template V not in use',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @template D
         * @template V
         * @callback
         * @returns {[X, Y | undefined]}
         */
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
        {
          line: 4,
          message: '@template V not in use',
        },
      ],
    },
    {
      code: `
        /**
         * @template D
         * @template V
         * @function
         * @returns {[X, Y | undefined]}
         */
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
        {
          line: 4,
          message: '@template V not in use',
        },
      ],
    },
    {
      code: `
        /**
         * @template D
         * @template V
         * @function
         * @param {[X, Y | undefined]} someParam
         */
      `,
      errors: [
        {
          line: 3,
          message: '@template D not in use',
        },
        {
          line: 4,
          message: '@template V not in use',
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
         * @template X
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
         * @typedef Pairs
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
         * Uses the provided callback to group the given array into the keys of a map.
         * Based on the array grouping proposal: https://github.com/tc39/proposal-array-grouping/
         *
         * @template T
         * @param {T[]} array
         * @param {(value: T, index: number) => string} callbackFn
         * @returns {Map<string, T[]>}
         */
        export function mapGroupBy(array, callbackFn) {
        }
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
         * @callback
         * @returns {[D, V | undefined]}
         */
      `,
    },
    {
      code: `
        /**
         * @template D
         * @template V
         * @function
         * @returns {[D, V | undefined]}
         */
      `,
    },
    {
      code: `
        /**
         * @template D
         * @template V
         * @function
         * @param {[D, V | undefined]} someParam
         */
      `,
    },
    {
      code: `
        /**
         * @template {string} U
         */
        export class User {
          /**
           * @type {U}
           */
          name;
        }
      `,
      languageOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        /**
         * @template {string} U
         */
        export class User {
          /**
           * @param {U} name
           */
          constructor(name) {
            this.name = name;
          }
          methodToIgnore() {}
        }
      `,
    },
    {
      code: `
        /**
         * @template [ChannelDataType=undefined]
         * @param {string} messageType - A key used for sending and receiving messages.
         * @returns {MessageChannel<ChannelDataType>} A channel that can create messages of its
         * own type.
         */
        export function createMessageChannel(messageType) {
          // Note: It should also infer the type if the new channel is returned
          // directly rather than returned as a typed variable.

          /** @type {MessageChannel<ChannelDataType>} */
          const messageChannel = new MessageChannel(messageType);

          return messageChannel;
        }
      `,
    },
  ],
});
