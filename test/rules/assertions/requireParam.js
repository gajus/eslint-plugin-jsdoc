import * as babelEslintParser from '@babel/eslint-parser';
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
      output: null,
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
           * @param root0
           * @param root0.foo
           * @param root0.bar.baz
           */
          function quux ({ foo, bar: { baz }}) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "root0.bar" declaration.',
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
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      output: `
        export class SomeClass {
          /**
           * @param property
           * @param foo
           */
          constructor(private property: string, private foo: number) {}
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      output: null,
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        ecmaVersion: 2_018,
      },
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
      languageOptions: {
        ecmaVersion: 2_018,
      },
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
      languageOptions: {
        ecmaVersion: 2_015,
      },
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
      languageOptions: {
        ecmaVersion: 2_015,
      },
      output: `
      /**
       * @param a
       * @param {...any} extra
       */
      function baar (a, ...extra) {
        //
      }
      `,
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
      languageOptions: {
        parser: babelEslintParser,
      },
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
    },
    /* eslint-disable @stylistic/no-tabs */
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
      /* eslint-enable @stylistic/no-tabs */
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
      languageOptions: {
        sourceType: 'module',
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
    },
    {
      code: `
      /**
       * [A description]
       */
      class A {
        /**
         * openConfirmModal
         * @memberof CreateEditTestWizardComponent
         */
        public openConfirmModal(btnState: string) {
          this.modalBtnState = btnState;
          this.openModal();
        }
      }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "btnState" declaration.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'MethodDefinition',
          ],
        },
      ],
      output: `
      /**
       * [A description]
       */
      class A {
        /**
         * openConfirmModal
         * @param btnState
         * @memberof CreateEditTestWizardComponent
         */
        public openConfirmModal(btnState: string) {
          this.modalBtnState = btnState;
          this.openModal();
        }
      }
      `,
    },
    {
      code: `
        class A {
          /**
           * @param root0
           * @param root0.foo
           */
          quux({ foo }, { bar }) {
            console.log(foo, bar);
          }
        }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "root1" declaration.',
        },
        {
          message: 'Missing JSDoc @param "root1.bar" declaration.',
        },
      ],
      output: `
        class A {
          /**
           * @param root0
           * @param root0.foo
           * @param root1
           * @param root1.bar
           */
          quux({ foo }, { bar }) {
            console.log(foo, bar);
          }
        }
      `,
    },
    {
      code: `
        /**
         * Some desc.
         * @param a
         */
        function quux (a, b) {}
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "b" declaration.',
        },
      ],
      options: [
        {
          ignoreWhenAllParamsMissing: true,
        },
      ],
      output: `
        /**
         * Some desc.
         * @param a
         * @param b
         */
        function quux (a, b) {}
      `,
    },
    {
      code: `
        /**
         * Some test function type.
         */
        export type Test = (foo: number) => string;
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'TSFunctionType',
          ],
        },
      ],
      output: `
        /**
         * Some test function type.
         * @param foo
         */
        export type Test = (foo: number) => string;
      `,
    },
    {
      code: `
          /**
           *
           */
          const quux = function quux (foo) {
          };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          interfaceExemptsParamsCheck: true,
        },
      ],
      output: `
          /**
           *
           * @param foo
           */
          const quux = function quux (foo) {
          };
      `,
    },

    {
      code: `
          /**
           *
           */
          function quux ({
            abc,
            def
          }) {
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "root0" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "root0.abc" declaration.',
        },
        {
          line: 2,
          message: 'Missing JSDoc @param "root0.def" declaration.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          interfaceExemptsParamsCheck: true,
        },
      ],
      output: `
          /**
           *
           * @param root0
           * @param root0.abc
           * @param root0.def
           */
          function quux ({
            abc,
            def
          }) {
          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param baz
           * @returns {number}
           */
          function quux (foo, bar, baz) {
            return foo + bar + baz;
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
           * @param baz
           * @returns {number}
           */
          function quux (foo, bar, baz) {
            return foo + bar + baz;
          }
      `,
    },
    {
      code: `
        /**
         * @example
         * \`\`\`ts
         * app.use(checkResourceOwnership({ entryPoint: 'seller_product' }));
         * \`\`\`
         *
         * @example
         * \`\`\`ts
         * app.use(checkResourceOwnership({ entryPoint: 'service_zone' }));
         * \`\`\`
         *
         * @param options - configuration
         * @param options.entryPoint
         * @param options.filterField
         * @param options.paramIdField
         */
        export const checkResourceOwnership = ({ entryPoint, filterField, paramIdField, resourceId = () => '' }) => {};
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @param "options.resourceId" declaration.',
        },
      ],
      output: `
        /**
         * @example
         * \`\`\`ts
         * app.use(checkResourceOwnership({ entryPoint: 'seller_product' }));
         * \`\`\`
         *
         * @example
         * \`\`\`ts
         * app.use(checkResourceOwnership({ entryPoint: 'service_zone' }));
         * \`\`\`
         *
         * @param options - configuration
         * @param options.entryPoint
         * @param options.filterField
         * @param options.paramIdField
         * @param options.resourceId
         */
        export const checkResourceOwnership = ({ entryPoint, filterField, paramIdField, resourceId = () => '' }) => {};
      `,
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
      languageOptions: {
        parser: babelEslintParser,
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'TSFunctionType',
          ],
        },
      ],
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
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
      languageOptions: {
        ecmaVersion: 2_015,
      },
      options: [
        {
          enableRestElementFixer: false,
        },
      ],
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
      languageOptions: {
        ecmaVersion: 2_015,
      },
      options: [
        {
          enableRestElementFixer: false,
        },
      ],
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          useDefaultObjectProperties: false,
        },
      ],
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'MethodDefinition',
          ],
        },
      ],
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
       * @param this The this object
       * @param bar number to return
       * @returns number returned back to caller
       */
      function foo(this: T, bar: number): number {
        console.log(this.name);
        return bar;
      }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
    {
      code: `
        /**
         * Returns the sum of two numbers
         * @param options Object to destructure
         * @param options.a First value
         * @param options.b Second value
         * @returns Sum of a and b
         */
        function sumDestructure(this: unknown, { a, b }: { a: number, b: number }) {
          return a + b;
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         *
         */
        const inner = (c: number, d: string): void => {
          console.log(c);
          console.log(d);
        };
      `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      settings: {
        jsdoc: {
          contexts: [
            'VariableDeclaration',
          ],
        },
      },
    },
    {
      code: `
        /**
         * Some desc.
         */
        function quux (a, b) {}
      `,
      options: [
        {
          ignoreWhenAllParamsMissing: true,
        },
      ],
    },
    {
      code: `
        /**
         * Test function with param.
         * @param foo - Test param.
         */
        function myFunction(foo: string): void;
        /**
         * Test function without param.
         */
        function myFunction(): void;
        function myFunction(foo?: string) {}
      `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
    },
    {
      code: `
          /**
           *
           */
          const quux: FunctionInterface = function quux (foo) {
          };
      `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          interfaceExemptsParamsCheck: true,
        },
      ],
    },

    {
      code: `
          /**
           *
           */
          function quux ({
            abc,
            def
          }: FunctionInterface) {
          }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          interfaceExemptsParamsCheck: true,
        },
      ],
    },
  ],
});
