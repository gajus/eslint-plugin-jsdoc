// After `importMeta` no longer experimental, we can use this ESM
//   approach over `__dirname`?
// import {fileURLToPath} from 'url';
// import {join, dirname} from 'path';
// join(dirname(fileURLToPath(import.meta.url)), '@babel/eslint-parser')

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
          line: 2,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
          /**
           *
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
          contexts: [
            'FunctionDeclaration',
          ],
        },
      ],
      output: `
           /**
            *
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
          line: 2,
          message: 'Missing JSDoc @param "root0" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "root0.foo" declaration.',
        },
      ],
      output: `
          /**
           *
           * @param root0
           * @param root0.foo
           */
          function quux ({foo}) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo, bar, {baz}) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "bar" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "root0" declaration.',
        },
      ],
      options: [
        {
          checkDestructured: false,
        },
      ],
      output: `
          /**
           * @param foo
           * @param bar
           * @param root0
           */
          function quux (foo, bar, {baz}) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo, bar, {baz}) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "bar" declaration.',
        },
      ],
      options: [
        {
          checkDestructuredRoots: false,
        },
      ],
      output: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo, bar, {baz}) {

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
          line: 2,
          message: 'Missing JSDoc @param "root0" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "root0.foo" declaration.',
        },
      ],
      options: [
        {
          enableFixer: false,
        },
      ],
      output: `
          /**
           *
           */
          function quux ({foo}) {

          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux ({foo: bar = 5} = {}) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "root0" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "root0.foo" declaration.',
        },
      ],
      output: `
          /**
           *
           * @param root0
           * @param root0.foo
           */
          function quux ({foo: bar = 5} = {}) {

          }
      `,
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
          line: 2,
          message: 'Missing JSDoc @param "root0" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "root0.foo" declaration.',
        },
      ],
      output: `
          /**
           * @param root0
           * @param root0.foo
           */
          function quux ({foo}) {

          }
      `,
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
          line: 2,
          message: 'Missing JSDoc @param "root1" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "root1.foo" declaration.',
        },
      ],
      options: [
        {
          autoIncrementBase: 1,
        },
      ],
      output: `
          /**
           * @param root1
           * @param root1.foo
           */
          function quux ({foo}) {

          }
      `,
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
      output: `
          /**
           * @param options
           * @param options.foo
           */
          function quux ({foo}) {

          }
      `,
    },
    {
      code: `
          /**
           * @param
           */
          function quux ({ foo, bar: { baz }}) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "root0" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "root0.foo" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "root0.bar" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "root0.bar.baz" declaration.',
        },
      ],
      output: `
          /**
           * @param root0
           * @param root0.foo
           * @param root0.bar
           * @param root0.bar.baz
           */
          function quux ({ foo, bar: { baz }}) {

          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux ({foo}, {bar}) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "arg0" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "arg0.foo" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "arg1" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "arg1.bar" declaration.',
        },
      ],
      options: [
        {
          unnamedRootBase: [
            'arg',
          ],
        },
      ],
      output: `
          /**
           *
           * @param arg0
           * @param arg0.foo
           * @param arg1
           * @param arg1.bar
           */
          function quux ({foo}, {bar}) {

          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux ({foo}, {bar}) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "arg" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "arg.foo" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "config0" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "config0.bar" declaration.',
        },
      ],
      options: [
        {
          unnamedRootBase: [
            'arg', 'config',
          ],
        },
      ],
      output: `
          /**
           *
           * @param arg
           * @param arg.foo
           * @param config0
           * @param config0.bar
           */
          function quux ({foo}, {bar}) {

          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux ({foo}, {bar}) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "arg" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "arg.foo" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "config0" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "config0.bar" declaration.',
        },
      ],
      options: [
        {
          enableRootFixer: false,
          unnamedRootBase: [
            'arg', 'config',
          ],
        },
      ],
      output: `
          /**
           *
           * @param arg
           * @param arg.foo
           */
          function quux ({foo}, {bar}) {

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
          line: 2,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "bar" declaration.',
        },
      ],
      output: `
          /**
           *
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
          line: 2,
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
          line: 2,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
        {
          line: 2,
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
          line: 2,
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
          line: 2,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
        {
          line: 2,
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
          line: 2,
          message: 'Missing JSDoc @arg "foo" declaration.',
        },
      ],
      output: `
          /**
           * @arg foo
           * @param
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
           * @param foo
           */
          function quux (foo, bar) {

          }
      `,
      errors: [
        {
          line: 2,
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
           * @override
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
      output: `
          /**
           * @param foo
           * @override
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
           * @ignore
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
      output: `
          /**
           * @param foo
           * @ignore
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          ignoreReplacesDocs: false,
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
          line: 2,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
          /**
           * @param foo
           * @implements
           */
          function quux (foo) {

          }
      `,
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
          line: 2,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
          /**
           * @param foo
           * @augments
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
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
          /**
           * @param foo
           * @extends
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
      errors: [
        {
          line: 6,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
          /**
           * @override
           */
          class A {
            /**
             *
             * @param foo
             */
            quux (foo) {

            }
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
           * @ignore
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
          line: 6,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
          /**
           * @ignore
           */
          class A {
            /**
             *
             * @param foo
             */
            quux (foo) {

            }
          }
      `,
      settings: {
        jsdoc: {
          ignoreReplacesDocs: false,
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
          line: 6,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
          /**
           * @implements
           */
          class A {
            /**
             *
             * @param foo
             */
            quux (foo) {

            }
          }
      `,
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
          line: 6,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
          /**
           * @augments
           */
          class A {
            /**
             *
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
      errors: [
        {
          line: 6,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
          /**
           * @extends
           */
          class A {
            /**
             *
             * @param foo
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
          constructor(private property: string, private foo: number) {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
        export class SomeClass {
          /**
           * @param property
           * @param foo
           */
          constructor(private property: string, private foo: number) {}
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
           * @param
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
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
      function quux ({bar, baz}, foo) {
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "root0" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "root0.bar" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "root0.baz" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
      /**
       *
       * @param root0
       * @param root0.bar
       * @param root0.baz
       * @param foo
       */
      function quux ({bar, baz}, foo) {
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
          line: 2,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "root0" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "root0.bar" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "root0.baz" declaration.',
        },
      ],
      output: `
      /**
       *
       * @param foo
       * @param root0
       * @param root0.bar
       * @param root0.baz
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
          line: 2,
          message: 'Missing JSDoc @param "root0" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "root0."0"" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "root0."1"" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
      /**
       *
       * @param root0
       * @param root0."0"
       * @param root0."1"
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
          exemptedBy: [
            'notPresent',
          ],
        },
      ],
      output: `
          /**
           *
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
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      options: [
        {
          exemptedBy: [],
        },
      ],
      output: `
          /**
           * @param foo
           * @inheritdoc
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
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
          /**
           * @param foo
           * @inheritdoc
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
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
      output: `
          /**
           * Assign the project to a list of employees.
           * @param {object[]} employees - The employees who are responsible for the project.
           * @param {string} employees[].name - The name of an employee.
           * @param {string} employees[].department - The employee's department.
           * @param name
           */
          function assign (employees, name) {

          };
      `,
    },
    {
      code: `
      interface ITest {
      /**
       * Test description.
       */
      TestMethod(id: number): void;
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @param "id" declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'TSMethodSignature',
          ],
        },
      ],
      output: `
      interface ITest {
      /**
       * Test description.
       * @param id
       */
      TestMethod(id: number): void;
      }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       * A test class.
       */
      abstract class TestClass
      {
      /**
       * A test method.
       */
      abstract TestFunction(id);
      }
      `,
      errors: [
        {
          line: 7,
          message: 'Missing JSDoc @param "id" declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'TSEmptyBodyFunctionExpression',
          ],
        },
      ],
      output: `
      /**
       * A test class.
       */
      abstract class TestClass
      {
      /**
       * A test method.
       * @param id
       */
      abstract TestFunction(id);
      }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       * A test class.
       */
      declare class TestClass
      {
      /**
       *
       */
      TestMethod(id);
      }
      `,
      errors: [
        {
          line: 7,
          message: 'Missing JSDoc @param "id" declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'TSEmptyBodyFunctionExpression',
          ],
        },
      ],
      output: `
      /**
       * A test class.
       */
      declare class TestClass
      {
      /**
       *
       * @param id
       */
      TestMethod(id);
      }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       * A test function.
       */
      declare let TestFunction: (id) => void;
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "id" declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'TSFunctionType',
          ],
        },
      ],
      output: `
      /**
       * A test function.
       * @param id
       */
      declare let TestFunction: (id) => void;
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        /**
         * A test function.
         */
        let TestFunction: (id) => void;
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "id" declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'TSFunctionType',
          ],
        },
      ],
      output: `
        /**
         * A test function.
         * @param id
         */
        let TestFunction: (id) => void;
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        /**
         * A test function.
         */
        function test(
          processor: (id: number) => string
        ) {
          return processor(10);
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "id" declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'TSFunctionType',
          ],
        },
      ],
      output: `
        /**
         * A test function.
         * @param id
         */
        function test(
          processor: (id: number) => string
        ) {
          return processor(10);
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        /**
         * A test function.
         */
        let test = (processor: (id: number) => string) =>
        {
          return processor(10);
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "id" declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'TSFunctionType',
          ],
        },
      ],
      output: `
        /**
         * A test function.
         * @param id
         */
        let test = (processor: (id: number) => string) =>
        {
          return processor(10);
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        class TestClass {
          /**
          * A class property.
          */
          public Test: (id: number) => string;
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @param "id" declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'TSFunctionType',
          ],
        },
      ],
      output: `
        class TestClass {
          /**
          * A class property.
          * @param id
          */
          public Test: (id: number) => string;
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        class TestClass {
          /**
           * A class method.
           */
          public TestMethod(): (id: number) => string
          {
          }
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @param "id" declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'TSFunctionType',
          ],
        },
      ],
      output: `
        class TestClass {
          /**
           * A class method.
           * @param id
           */
          public TestMethod(): (id: number) => string
          {
          }
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        interface TestInterface {
        /**
         * An interface property.
         */
        Test: (id: number) => string;
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @param "id" declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'TSFunctionType',
          ],
        },
      ],
      output: `
        interface TestInterface {
        /**
         * An interface property.
         * @param id
         */
        Test: (id: number) => string;
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        interface TestInterface {
          /**
           * An interface method.
           */
          TestMethod(): (id: number) => string;
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @param "id" declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'TSFunctionType',
          ],
        },
      ],
      output: `
        interface TestInterface {
          /**
           * An interface method.
           * @param id
           */
          TestMethod(): (id: number) => string;
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        /**
         * A function with return type
         */
        function test(): (id: number) => string;
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "id" declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'TSFunctionType',
          ],
        },
      ],
      output: `
        /**
         * A function with return type
         * @param id
         */
        function test(): (id: number) => string;
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        /**
         * A function with return type
         */
        let test = (): (id: number) => string =>
        {
          return (id) => \`\${id}\`;
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "id" declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'TSFunctionType',
          ],
        },
      ],
      output: `
        /**
         * A function with return type
         * @param id
         */
        let test = (): (id: number) => string =>
        {
          return (id) => \`\${id}\`;
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
          /**
           * @param baz
           * @param options
           */
          function quux (baz, {foo: bar}) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "options.foo" declaration.',
        },
      ],
      output: `
          /**
           * @param baz
           * @param options
           * @param options.foo
           */
          function quux (baz, {foo: bar}) {

          }
      `,
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
         * @param  {Object}   data                    The collection data object.
         * @param  {number}   data.last_modified
         * @param  {Object}   options            The options object.
         * @param  {Object}   [options.headers]       The headers object option.
         * @param  {Number}   [options.retry=0]       Number of retries to make
         *     when faced with transient errors.
         * @param  {Boolean}  [options.safe]          The safe option.
         * @param  {Boolean}  [options.patch]         The patch option.
         * @param  {Number}   [options.last_modified] The last_modified option.
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
          enableFixer: false,
        },
      ],
      output: `
          /**
           *
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
      class Client {
        /**
         * Set collection data.
         * @return {Promise<Object, Error>}
         */
        async setData(
          data: { last_modified?: number }
        ) {}
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @param "data" declaration.',
        },
        {
          line: 3,
          message: 'Missing JSDoc @param "data.last_modified" declaration.',
        },
      ],
      output: `
      class Client {
        /**
         * Set collection data.
         * @param data
         * @param data.last_modified
         * @return {Promise<Object, Error>}
         */
        async setData(
          data: { last_modified?: number }
        ) {}
      }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       * @param cfg
       * @param cfg.num
       */
      function quux ({num, ...extra}) {
      }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "cfg.extra" declaration.',
        },
      ],
      options: [
        {
          checkRestProperty: true,
        },
      ],
      output: `
      /**
       * @param cfg
       * @param cfg.num
       * @param cfg.extra
       */
      function quux ({num, ...extra}) {
      }
      `,
      parserOptions: {
        ecmaVersion: 2_018,
      },
    },
    {
      code: `
      /**
       * @param cfg
       * @param cfg.opts
       * @param cfg.opts.num
       */
      function quux ({opts: {num, ...extra}}) {
      }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "cfg.opts.extra" declaration.',
        },
      ],
      options: [
        {
          checkRestProperty: true,
        },
      ],
      output: `
      /**
       * @param cfg
       * @param cfg.opts
       * @param cfg.opts.num
       * @param cfg.opts.extra
       */
      function quux ({opts: {num, ...extra}}) {
      }
      `,
      parserOptions: {
        ecmaVersion: 2_018,
      },
    },
    {
      code: `
      /**
       * @param {GenericArray} cfg
       * @param {number} cfg."0"
       */
      function baar ([a, ...extra]) {
        //
      }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "cfg."1"" declaration.',
        },
      ],
      output: `
      /**
       * @param {GenericArray} cfg
       * @param {number} cfg."0"
       * @param {...any} cfg."1"
       */
      function baar ([a, ...extra]) {
        //
      }
      `,
      parserOptions: {
        ecmaVersion: 2_015,
      },
    },
    {
      code: `
      /**
       * @param a
       */
      function baar (a, ...extra) {
        //
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "extra" declaration.',
        },
      ],
      output: `
      /**
       * @param a
       * @param {...any} extra
       */
      function baar (a, ...extra) {
        //
      }
      `,
      parserOptions: {
        ecmaVersion: 2_015,
      },
    },
    {
      code: `
      /**
       * Converts an SVGRect into an object.
       * @param {SVGRect} bbox - a SVGRect
       */
      const bboxToObj = function ({x, y, width, height}) {
        return {x, y, width, height};
      };
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "bbox.x" declaration.',
        },
        {
          message: 'Missing JSDoc @param "bbox.y" declaration.',
        },
        {
          message: 'Missing JSDoc @param "bbox.width" declaration.',
        },
        {
          message: 'Missing JSDoc @param "bbox.height" declaration.',
        },
      ],
      options: [
        {
          checkTypesPattern: 'SVGRect',
        },
      ],
      output: `
      /**
       * Converts an SVGRect into an object.
       * @param {SVGRect} bbox - a SVGRect
       * @param bbox.x
       * @param bbox.y
       * @param bbox.width
       * @param bbox.height
       */
      const bboxToObj = function ({x, y, width, height}) {
        return {x, y, width, height};
      };
      `,
    },
    {
      code: `
      /**
       * Converts an SVGRect into an object.
       * @param {object} bbox - a SVGRect
       */
      const bboxToObj = function ({x, y, width, height}) {
        return {x, y, width, height};
      };
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "bbox.x" declaration.',
        },
        {
          message: 'Missing JSDoc @param "bbox.y" declaration.',
        },
        {
          message: 'Missing JSDoc @param "bbox.width" declaration.',
        },
        {
          message: 'Missing JSDoc @param "bbox.height" declaration.',
        },
      ],
      output: `
      /**
       * Converts an SVGRect into an object.
       * @param {object} bbox - a SVGRect
       * @param bbox.x
       * @param bbox.y
       * @param bbox.width
       * @param bbox.height
       */
      const bboxToObj = function ({x, y, width, height}) {
        return {x, y, width, height};
      };
      `,
    },
    {
      code: `
      module.exports = class GraphQL {
        /**
         * @param fetchOptions
         * @param cacheKey
         */
        fetch = ({ url, ...options }, cacheKey) => {
        }
      };
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "fetchOptions.url" declaration.',
        },
        {
          message: 'Missing JSDoc @param "fetchOptions.options" declaration.',
        },
      ],
      options: [
        {
          checkRestProperty: true,
        },
      ],
      output: `
      module.exports = class GraphQL {
        /**
         * @param fetchOptions
         * @param fetchOptions.url
         * @param fetchOptions.options
         * @param cacheKey
         */
        fetch = ({ url, ...options }, cacheKey) => {
        }
      };
      `,
      parser: require.resolve('@babel/eslint-parser'),
    },
    /* eslint-disable no-tabs */
    {
      code: `
(function() {
	/**
	 * A function.
	 */
	function f(param) {
		return !param;
	}
})();
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @param "param" declaration.',
        },
      ],
      output: `
(function() {
	/**
	 * A function.
	 * @param param
	 */
	function f(param) {
		return !param;
	}
})();
      `,
      /* eslint-enable no-tabs */
    },
    {
      code: `
      /**
       * Description.
       * @param {Object} options
       * @param {Object} options.foo
       */
      function quux ({ foo: { bar } }) {}
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "options.foo.bar" declaration.',
        },
      ],
      output: `
      /**
       * Description.
       * @param {Object} options
       * @param {Object} options.foo
       * @param options.foo.bar
       */
      function quux ({ foo: { bar } }) {}
      `,
    },
    {
      code: `
      /**
       * Description.
       * @param {FooBar} options
       * @param {FooBar} options.foo
       */
      function quux ({ foo: { bar } }) {}
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "options.foo.bar" declaration.',
        },
      ],
      options: [
        {
          checkTypesPattern: 'FooBar',
        },
      ],
      output: `
      /**
       * Description.
       * @param {FooBar} options
       * @param {FooBar} options.foo
       * @param options.foo.bar
       */
      function quux ({ foo: { bar } }) {}
      `,
    },
    {
      code: `
      /**
       * Description.
       * @param {Object} options
       * @param {FooBar} foo
       */
      function quux ({ foo: { bar } }) {}
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "options.foo" declaration.',
        },
        {
          message: 'Missing JSDoc @param "options.foo.bar" declaration.',
        },
      ],
      output: `
      /**
       * Description.
       * @param {Object} options
       * @param options.foo
       * @param {FooBar} foo
       * @param options.foo.bar
       */
      function quux ({ foo: { bar } }) {}
      `,
    },
    {
      code: `
      /**
       * Description.
       * @param {Object} options
       * @param options.foo
       */
      function quux ({ foo: { bar } }) {}
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "options.foo.bar" declaration.',
        },
      ],
      output: `
      /**
       * Description.
       * @param {Object} options
       * @param options.foo
       * @param options.foo.bar
       */
      function quux ({ foo: { bar } }) {}
      `,
    },
    {
      code: `
      /**
       * Description.
       * @param {object} options Options.
       * @param {object} options.foo A description.
       * @param {object} options.foo.bar
       */
      function foo({ foo: { bar: { baz } }}) {}
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "options.foo.bar.baz" declaration.',
        },
      ],
      output: `
      /**
       * Description.
       * @param {object} options Options.
       * @param {object} options.foo A description.
       * @param {object} options.foo.bar
       * @param options.foo.bar.baz
       */
      function foo({ foo: { bar: { baz } }}) {}
      `,
    },
    {
      code: `
      /**
      * Returns a number.
      * @param {Object} props Props.
      * @param {Object} props.prop Prop.
      * @return {number} A number.
      */
      export function testFn1 ({ prop = { a: 1, b: 2 } }) {
      }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "props.prop.a" declaration.',
        },
        {
          message: 'Missing JSDoc @param "props.prop.b" declaration.',
        },
      ],
      options: [
        {
          useDefaultObjectProperties: true,
        },
      ],
      output: `
      /**
      * Returns a number.
      * @param {Object} props Props.
      * @param {Object} props.prop Prop.
      * @param props.prop.a
      * @param props.prop.b
      * @return {number} A number.
      */
      export function testFn1 ({ prop = { a: 1, b: 2 } }) {
      }
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
        /** Foo. */
        function foo(a, b, c) {}
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "a" declaration.',
        },
        {
          message: 'Missing JSDoc @param "b" declaration.',
        },
        {
          message: 'Missing JSDoc @param "c" declaration.',
        },
      ],
      output: `
        /**
         * Foo.
         * @param a
         * @param b
         * @param c
         */
        function foo(a, b, c) {}
      `,
    },
    {
      code: `
        /**
         * @param foo Some number.
         * @param bar Some number.
         */
        export function myPublicFunction(foo: number, bar: number, baz: number) {}
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "baz" declaration.',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTag[tag="param"])',
              context: 'FunctionDeclaration',
            },
          ],
        },
      ],
      output: `
        /**
         * @param foo Some number.
         * @param bar Some number.
         * @param baz
         */
        export function myPublicFunction(foo: number, bar: number, baz: number) {}
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       * Helper function to warp to a custom stage/level.
       *
       * @param name The name
       * @param firstFloor Optional.
       */
       export function setCustomStage(
         name: string,
         firstFloor = true,
         verbose = false,
       ): void {}
       `,
      errors: [
        {
          message: 'Missing JSDoc @param "verbose" declaration.',
        },
      ],
      ignoreReadme: true,
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
      output: `
      /**
       * Helper function to warp to a custom stage/level.
       *
       * @param name The name
       * @param firstFloor Optional.
       * @param verbose
       */
       export function setCustomStage(
         name: string,
         firstFloor = true,
         verbose = false,
       ): void {}
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
           * @param root0
           * @param root0.foo
           */
          function quux ({foo}) {

          }
      `,
    },
    {
      code: `
          /**
           * @param root0
           * @param root0.foo
           * @param root1
           * @param root1.bar
           */
          function quux ({foo}, {bar}) {

          }
      `,
    },
    {
      code: `
          /**
           * @param arg0
           * @param arg0.foo
           * @param arg1
           * @param arg1.bar
           */
          function quux ({foo}, {bar}) {

          }
      `,
      options: [
        {
          unnamedRootBase: [
            'arg',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * @param arg
           * @param arg.foo
           * @param config0
           * @param config0.bar
           * @param config1
           * @param config1.baz
           */
          function quux ({foo}, {bar}, {baz}) {

          }
      `,
      options: [
        {
          unnamedRootBase: [
            'arg', 'config',
          ],
        },
      ],
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
           * @inheritDoc
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
           * @ignore
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          ignoreReplacesDocs: true,
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
           * @ignore
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
          ignoreReplacesDocs: true,
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
           * @internal
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          ignoreInternal: true,
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
      parser: require.resolve('@babel/eslint-parser'),
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
          exemptedBy: [
            'type',
          ],
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
        /**
         *
         */
        function quux (foo) {

        }
      `,
      options: [
        {
          contexts: [
            'ArrowFunctionExpression',
          ],
        },
      ],
    },
    {
      code: `
      /**
      * A function with return type
      *
      * @param id
      */
      let test = (): (id: number) => string =>
      {
        return (id) => \`\${id}\`;
      }
      `,
      options: [
        {
          contexts: [
            'TSFunctionType',
          ],
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        /** @abstract */
        class base {
        /** @param {boolean} arg0 */
        constructor(arg0) {}
        }

        class foo extends base {
        /** @inheritDoc */
        constructor(arg0) {
        super(arg0);
        this.arg0 = arg0;
        }
        }
      `,
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
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
    {
      code: `
      /**
      * @param {string} cb
      */
      function createGetter (cb) {
        return function (...args) {
          cb();
        };
      }
      `,
    },
    {
      code: `
      /**
       * @param cfg
       * @param cfg.num
       */
      function quux ({num, ...extra}) {
      }
      `,
      parserOptions: {
        ecmaVersion: 2_018,
      },
    },
    {
      code: `
      /**
        * @param {GenericArray} cfg
        * @param {number} cfg."0"
       */
      function baar ([a, ...extra]) {
        //
      }
      `,
      options: [
        {
          enableRestElementFixer: false,
        },
      ],
      parserOptions: {
        ecmaVersion: 2_015,
      },
    },
    {
      code: `
      /**
        * @param a
       */
      function baar (a, ...extra) {
        //
      }
      `,
      options: [
        {
          enableRestElementFixer: false,
        },
      ],
      parserOptions: {
        ecmaVersion: 2_015,
      },
    },
    {
      code: `
      /**
      * Converts an SVGRect into an object.
      * @param {SVGRect} bbox - a SVGRect
      */
      const bboxToObj = function ({x, y, width, height}) {
        return {x, y, width, height};
      };
      `,
    },
    {
      code: `
      /**
      * Converts an SVGRect into an object.
      * @param {object} bbox - a SVGRect
      */
      const bboxToObj = function ({x, y, width, height}) {
        return {x, y, width, height};
      };
      `,
      options: [
        {
          checkTypesPattern: 'SVGRect',
        },
      ],
    },
    {
      code: `
      class CSS {
        /**
         * Set one or more CSS properties for the set of matched elements.
         *
         * @param {Object} propertyObject - An object of property-value pairs to set.
         */
        setCssObject(propertyObject: {[key: string]: string | number}): void {
        }
      }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           * @param cfg
           */
          function quux (foo, bar, {baz}) {

          }
      `,
      options: [
        {
          checkDestructured: false,
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo, bar, {baz}) {

          }
      `,
      options: [
        {
          checkDestructuredRoots: false,
        },
      ],
    },
    {
      code: `
          /**
           * @param root
           * @param root.foo
           */
          function quux ({"foo": bar}) {

          }
      `,
    },
    {
      code: `
          /**
           * @param root
           * @param root."foo"
           */
          function quux ({foo: bar}) {

          }
      `,
    },
    {
      code: `
      /**
       * Description.
       * @param {string} b Description \`/**\`.
       */
      module.exports = function a(b) {
        console.info(b);
      };
      `,
    },
    {
      code: `
      /**
       * Description.
       * @param {Object} options Options.
       * @param {FooBar} options.foo foo description.
       */
      function quux ({ foo: { bar } }) {}
      `,
    },
    {
      code: `
      /**
       * Description.
       * @param {FooBar} options
       * @param {Object} options.foo
       */
      function quux ({ foo: { bar } }) {}
      `,
      options: [
        {
          checkTypesPattern: 'FooBar',
        },
      ],
    },
    {
      code: `
      /**
       * @param obj
       * @param obj.data
       * @param obj.data."0"
       * @param obj.data."1"
       * @param obj.data."2"
       * @param obj.defaulting
       * @param obj.defaulting."0"
       * @param obj.defaulting."1"
       */
      function Item({
        data: [foo, bar, ...baz],
        defaulting: [quux, xyz] = []
      }) {
      }
      `,
    },
    {
      code: `
      /**
      * Returns a number.
      * @param {Object} props Props.
      * @param {Object} props.prop Prop.
      * @return {number} A number.
      */
      export function testFn1 ({ prop = { a: 1, b: 2 } }) {
      }
      `,
      options: [
        {
          useDefaultObjectProperties: false,
        },
      ],
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
      /**
       * [A description]
       */
      class A {
        /**
         * @param config
         */
        constructor (config: SomeConfig) {
          super(config);
        }
      }
      `,
      ignoreReadme: true,
      options: [
        {
          contexts: [
            'MethodDefinition',
          ],
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       * Test
       */
      `,
      ignoreReadme: true,
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
    },
    {
      code: `
      /**
       * Helper function to warp to a custom stage/level.
       */
       export function setCustomStage(): void {}
       `,
      ignoreReadme: true,
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       * @param this The this object
       * @param bar number to return
       * @returns number returned back to caller
       */
      function foo(this: T, bar: number): number {
        console.log(this.name);
        return bar;
      }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       * @param bar number to return
       * @returns number returned back to caller
       */
      function foo(this: T, bar: number): number {
        console.log(this.name);
        return bar;
      }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        /** {@link someOtherval} */
        function a (b) {}
      `,
      options: [
        {
          contexts: [
            {
              comment: '*:not(JsdocBlock:has(JsdocInlineTag[tag=link]))',
              context: 'FunctionDeclaration',
            },
          ],
        },
      ],
    },
  ],
};
