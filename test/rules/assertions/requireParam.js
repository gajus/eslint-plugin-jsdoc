// After `importMeta` no longer experimental, we can use this ESM
//   approach over `__dirname`?
// import {fileURLToPath} from 'url';
// import {join, dirname} from 'path';
// join(dirname(fileURLToPath(import.meta.url)), 'babel-eslint')

export default {
  invalid: [
    {
      code: `
          /**
           *
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux ({foo}) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "root.foo" declaration.',
        },
      ],
    },
    {
      code: `
          /**
           * @param
           */
          function quux ({foo}) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "root.foo" declaration.',
        },
      ],
    },
    {
      code: `
          /**
           * @param options
           */
          function quux ({foo}) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "options.foo" declaration.',
        },
      ],
    },
    {
      code: `
          /**
           * @param
           */
          function quux ({ foo, bar__: { baz__ }}) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "root.foo" declaration.',
        },
        {
          message: 'Missing JSDoc @param "root.bar__" declaration.',
        },
        {
          message: 'Missing JSDoc @param "root.bar__.baz__" declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo, bar) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
        {
          message: 'Missing JSDoc @param "bar" declaration.',
        },
      ],
      output: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo, bar) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo, bar) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "bar" declaration.',
        },
      ],
      output: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo, bar) {

          }
      `,
    },
    {
      code: `
          /**
           * @param bar
           */
          function quux (foo, bar, baz) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
        {
          message: 'Missing JSDoc @param "baz" declaration.',
        },
      ],
      output: `
          /**
           * @param foo
           * @param bar
           * @param baz
           */
          function quux (foo, bar, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo, bar, baz) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "baz" declaration.',
        },
      ],
      output: `
          /**
           * @param foo
           * @param bar
           * @param baz
           */
          function quux (foo, bar, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param baz
           */
          function quux (foo, bar, baz) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
        {
          message: 'Missing JSDoc @param "bar" declaration.',
        },
      ],
      output: `
          /**
           * @param foo
           * @param bar
           * @param baz
           */
          function quux (foo, bar, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @arg "foo" declaration.',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: 'arg',
          },
        },
      },
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo, bar) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "bar" declaration.',
        },
      ],
    },
    {
      code: `
          /**
           * @override
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
          /**
           * @override
           * @param foo
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          overrideReplacesDocs: false,
        },
      },
    },
    {
      code: `
          /**
           * @implements
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      settings: {
        jsdoc: {
          implementsReplacesDocs: false,
        },
      },
    },
    {
      code: `
          /**
           * @augments
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
    },
    {
      code: `
          /**
           * @extends
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
    },
    {
      code: `
          /**
           * @override
           */
          class A {
            /**
              *
              */
            quux (foo) {

            }
          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      settings: {
        jsdoc: {
          overrideReplacesDocs: false,
        },
      },
    },
    {
      code: `
          /**
           * @implements
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      settings: {
        jsdoc: {
          implementsReplacesDocs: false,
        },
      },
    },
    {
      code: `
          /**
           * @augments
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
    },
    {
      code: `
          /**
           * @extends
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param property
           */
          constructor(private property: string, private foo: number) {}
        }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          /**
           * @param
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Unexpected tag `@param`',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: false,
          },
        },
      },
    },
    {
      code: `
      /**
       *
       */
      function quux ({bar, baz___}, foo) {
      }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "root.bar" declaration.',
        },
        {
          message: 'Missing JSDoc @param "root.baz___" declaration.',
        },
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
      /**
       * @param root.bar
       * @param root.baz___
       * @param foo
       */
      function quux ({bar, baz___}, foo) {
      }
      `,
    },
    {
      code: `
      /**
       *
       */
      function quux (foo, {bar, baz}) {
      }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
        {
          message: 'Missing JSDoc @param "root.bar" declaration.',
        },
        {
          message: 'Missing JSDoc @param "root.baz" declaration.',
        },
      ],
      output: `
      /**
       * @param foo
       * @param root.bar
       * @param root.baz
       */
      function quux (foo, {bar, baz}) {
      }
      `,
    },
    {
      code: `
      /**
       *
       */
      function quux ([bar, baz], foo) {
      }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
      /**
       * @param foo
       */
      function quux ([bar, baz], foo) {
      }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      options: [
        {
          exemptedBy: ['notPresent'],
        },
      ],
    },
    {
      code: `
          /**
           * Assign the project to a list of employees.
           * @param {object[]} employees - The employees who are responsible for the project.
           * @param {string} employees[].name - The name of an employee.
           * @param {string} employees[].department - The employee's department.
           */
          function assign (employees, name) {

          };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "name" declaration.',
        },
      ],
    },
    {
      code: `
          /**
           * @param options
           */
          function quux ({foo: bar}) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "options.foo" declaration.',
        },
      ],
    },
    {
      code: `
      class Client {
        /**
         * Set collection data.
         * @param  {Object}   data                    The collection data object.
         * @param  {number}   data.last_modified
         * @param  {Object}   options            The options object.
         * @param  {Object}   [options.headers]       The headers object option.
         * @param  {Number}   [options.retry=0]       Number of retries to make
         *     when faced with transient errors.
         * @param  {Boolean}  [options.safe]          The safe option.
         * @param  {Boolean}  [options.patch]         The patch option.
         * @param  {Number}   [options.last_modified] The last_modified option.
         * @return {Promise<Object, Error>}
         */
        async setData(
          data: { last_modified?: number },
          options: {
            headers?: Record<string, string>;
            safe?: boolean;
            retry?: number;
            patch?: boolean;
            last_modified?: number;
            permissions?: [];
          } = {}
        ) {}
      }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "options.permissions" declaration.',
        },
      ],
      output: `
      class Client {
        /**
       * Set collection data.
       *
       * @param {Object} data                    The collection data object.
       * @param {number} data.last_modified
       * @param {Object} options            The options object.
       * @param {Object} [options.headers]       The headers object option.
       * @param {Number} [options.retry=0]       Number of retries to make
       * when faced with transient errors.
       * @param {Boolean} [options.safe]          The safe option.
       * @param {Boolean} [options.patch]         The patch option.
       * @param {Number} [options.last_modified] The last_modified option.
       * @param options.permissions
       * @return {Promise<Object, Error>}
       */
        async setData(
          data: { last_modified?: number },
          options: {
            headers?: Record<string, string>;
            safe?: boolean;
            retry?: number;
            patch?: boolean;
            last_modified?: number;
            permissions?: [];
          } = {}
        ) {}
      }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
  ],
  valid: [
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @inheritdoc
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @arg foo
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: 'arg',
          },
        },
      },
    },
    {
      code: `
          /**
           * @override
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @override
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @override
           */
          class A {
            /**
              *
              */
            quux (foo) {

            }
          }
      `,
    },
    {
      code: `
          /**
           * @override
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          overrideReplacesDocs: true,
        },
      },
    },
    {
      code: `
          /**
           * @implements
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
    },
    {
      code: `
          /**
           * @implements
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @implements
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          implementsReplacesDocs: true,
        },
      },
    },
    {
      code: `
          /**
           * @implements
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @augments
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          augmentsExtendsReplacesDocs: true,
        },
      },
    },
    {
      code: `
          /**
           * @augments
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @extends
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          augmentsExtendsReplacesDocs: true,
        },
      },
    },
    {
      code: `
          /**
           * @extends
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @augments
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          augmentsExtendsReplacesDocs: true,
        },
      },
    },
    {
      code: `
          /**
           * @extends
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          augmentsExtendsReplacesDocs: true,
        },
      },
    },
    {
      code: `
          /**
           * @override
           */
          class A {
            /**
            * @param foo
            */
            quux (foo) {

            }
          }
      `,
    },
    {
      code: `
          /**
           * @override
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
      settings: {
        jsdoc: {
          overrideReplacesDocs: true,
        },
      },
    },
    {
      code: `
          /**
           * @implements
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
      settings: {
        jsdoc: {
          implementsReplacesDocs: true,
        },
      },
    },
    {
      code: `
        /**
         * @implements
         */
        class A {
          /**
           * @param foo
           */
          quux (foo) {

          }
        }
      `,
    },
    {
      code: `
          /**
           * @augments
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
      settings: {
        jsdoc: {
          augmentsExtendsReplacesDocs: true,
        },
      },
    },
    {
      code: `
        /**
         * @augments
         */
        class A {
          /**
           * @param foo
           */
          quux (foo) {

          }
        }
      `,
    },
    {
      code: `
          /**
           * @extends
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
      settings: {
        jsdoc: {
          augmentsExtendsReplacesDocs: true,
        },
      },
    },
    {
      code: `
          /**
           * @extends
           */
          class A {
            /**
             * @param foo
             */
            quux (foo) {

            }
          }
      `,
    },
    {
      code: `
          /**
           * @augments
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
      settings: {
        jsdoc: {
          augmentsExtendsReplacesDocs: true,
        },
      },
    },
    {
      code: `
          /**
           * @extends
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
      settings: {
        jsdoc: {
          augmentsExtendsReplacesDocs: true,
        },
      },
    },
    {
      code: `
          /**
           * @private
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          ignorePrivate: true,
        },
      },
    },
    {
      code: `
          /**
           * @access private
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          ignorePrivate: true,
        },
      },
    },
    {
      code: `
          // issue 182: optional chaining
          /** @const {boolean} test */
          const test = something?.find(_ => _)
      `,
      parser: require.resolve('babel-eslint'),
    },
    {
      code: `
          /** @type {RequestHandler} */
          function foo(req, res, next) {}
      `,
    },
    {
      code: `
          /**
           * @type {MyCallback}
           */
          function quux () {

          }
      `,
      options: [
        {
          exemptedBy: ['type'],
        },
      ],
    },
    {
      code: `
          /**
           * @override
           */
          var A = class {
            /**
              *
              */
            quux (foo) {

            }
          }
      `,
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param property
           */
          constructor(private property: string) {}
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
      /**
       * Assign the project to an employee.
       *
       * @param {object} employee - The employee who is responsible for the project.
       * @param {string} employee.name1 - The name of the employee.
       * @param {string} employee.department1 - The employee's department.
       */
      function assign({name1, department1}) {
        // ...
      }
      `,
    },
    {
      code: `
    export abstract class StephanPlugin<O, D> {

        /**
         * Called right after Stephan loads the plugin file.
         *
         * @example
         *\`\`\`typescript
         * type Options = {
         *      verbose?: boolean;
         *      token?: string;
         * }
         * \`\`\`
         *
         * Note that your Options type should only have optional properties...
         *
         * @param args Arguments compiled and provided by StephanClient.
         * @param args.options The options as provided by the user, or an empty object if not provided.
         * @param args.client The options as provided by the user, or an empty object if not provided.
         * @param defaultOptions The default options as provided by the plugin, or an empty object.
         */
        public constructor({options, client}: {
            options: O;
            client: unknown;
        }, defaultOptions: D) {

        }
    }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
    export abstract class StephanPlugin<O, D> {

        /**
         * Called right after Stephan loads the plugin file.
         *
         * @example
         *\`\`\`typescript
         * type Options = {
         *      verbose?: boolean;
         *      token?: string;
         * }
         * \`\`\`
         *
         * Note that your Options type should only have optional properties...
         *
         * @param args Arguments compiled and provided by StephanClient.
         * @param args.options The options as provided by the user, or an empty object if not provided.
         * @param args.client The options as provided by the user, or an empty object if not provided.
         * @param args.client.name The name of the client.
         * @param defaultOptions The default options as provided by the plugin, or an empty object.
         */
        public constructor({ options, client: { name } }: {
            options: O;
            client: { name: string };
        }, defaultOptions: D) {

        }
    }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
  ],
};
