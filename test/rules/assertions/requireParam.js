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
       * @param {string} employee.name - The name of the employee.
       * @param {string} employee.department - The employee's department.
       */
      function assign({name, department}) {
        // ...
      }
      `,
    },
  ],
};
