import * as babelEslintParser from '@babel/eslint-parser';
import globals from 'globals';
import {
  parser as typescriptEslintParser,
} from 'typescript-eslint';

export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
          /** This is comment */
          export interface Foo {
            /** This is comment x2 */
            tom: string;
            catchJerry(): boolean;
          }
      `,
      errors: [
        {
          line: 6,
          message: 'Missing JSDoc comment.',
          type: 'TSMethodSignature',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'TSInterfaceDeclaration',
            'TSMethodSignature',
            'TSPropertySignature',
          ],
          publicOnly: {
            ancestorsOnly: true,
          },
          require: {
            ClassDeclaration: true,
            ClassExpression: true,
            MethodDefinition: true,
          },
        },
      ],
      output: `
          /** This is comment */
          export interface Foo {
            /** This is comment x2 */
            tom: string;
            /**
             *
             */
            catchJerry(): boolean;
          }
      `,
    },
    {
      code: `
          /** This is comment */
          export interface Foo {
            /** This is comment x2 */
            tom: string;
            jerry: number;
          }
      `,
      errors: [
        {
          line: 6,
          message: 'Missing JSDoc comment.',
          type: 'TSPropertySignature',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'TSInterfaceDeclaration',
            'TSMethodSignature',
            'TSPropertySignature',
          ],
          publicOnly: {
            ancestorsOnly: true,
          },
          require: {
            ClassDeclaration: true,
            ClassExpression: true,
            MethodDefinition: true,
          },
        },
      ],
      output: `
          /** This is comment */
          export interface Foo {
            /** This is comment x2 */
            tom: string;
            /**
             *
             */
            jerry: number;
          }
      `,
    },
    {
      code: `
          /** This is comment */
          export interface Foo {
            bar(): string;
          }
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc comment.',
          type: 'TSMethodSignature',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'TSInterfaceDeclaration',
            'TSMethodSignature',
            'TSPropertySignature',
          ],
          publicOnly: {
            ancestorsOnly: true,
          },
        },
      ],
      output: `
          /** This is comment */
          export interface Foo {
            /**
             *
             */
            bar(): string;
          }
      `,
    },
    {
      code: `
          /** This is comment */
          export interface Foo {
            bar: string;
          }
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc comment.',
          type: 'TSPropertySignature',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'TSInterfaceDeclaration',
            'TSMethodSignature',
            'TSPropertySignature',
          ],
          publicOnly: {
            ancestorsOnly: true,
            esm: true,
          },
        },
      ],
      output: `
          /** This is comment */
          export interface Foo {
            /**
             *
             */
            bar: string;
          }
      `,
    },
    {
      code: `
      /**
       * Foo interface documentation.
       */
      export interface Foo extends Bar {
        /**
         * baz method documentation.
         */
        baz(): void;

        meow(): void;
      }
      `,
      errors: [
        {
          line: 11,
          message: 'Missing JSDoc comment.',
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
          publicOnly: {
            ancestorsOnly: true,
          },
        },
      ],
      output: `
      /**
       * Foo interface documentation.
       */
      export interface Foo extends Bar {
        /**
         * baz method documentation.
         */
        baz(): void;

        /**
         *
         */
        meow(): void;
      }
      `,
    },
    {
      code: `
function quux (foo) {

}`,
      errors: [
        {
          column: 1,
          endLine: 3,
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      output: `
/**
 *
 */
function quux (foo) {

}`,
    },
    {
      code: `
       /**
        * @func myFunction
        */
       function myFunction() {

       }
       `,
      errors: [
        {
          line: 5,
          message: 'Missing JSDoc comment.',
        },
      ],
      output: `
       /**
        * @func myFunction
        */
       /**
        *
        */

       function myFunction() {

       }
       `,
      settings: {
        jsdoc: {
          maxLines: 3,
          minLines: 2,
        },
      },
    },
    {
      code: `
       /**
        * @func myFunction
        */


       function myFunction() {

       }
       `,
      errors: [
        {
          line: 7,
          message: 'Missing JSDoc comment.',
        },
      ],
      output: `
       /**
        * @func myFunction
        */


       /**
        *
        */
       function myFunction() {

       }
       `,
      settings: {
        jsdoc: {
          maxLines: 2,
        },
      },
    },
    {
      code: `
       /** @func myFunction */ function myFunction() {

       }
       `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      output: `
       /** @func myFunction */ /**
        *
        */
       function myFunction() {

       }
       `,
      settings: {
        jsdoc: {
          minLines: 1,
        },
      },
    },
    {
      code: `
       function myFunction() {

       }
       `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
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
          export var test = function () {

          };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          export var test = function () {

          };
      `,
    },
    {
      code: `
          function test () {

          }
          export var test2 = test;
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionDeclaration',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionDeclaration: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          function test () {

          }
          export var test2 = test;
      `,
    },
    {
      code: `
          export const test = () => {

          };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'ArrowFunctionExpression',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          export const test = () => {

          };
      `,
    },
    {
      code: `
          export const test = () => {

          };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'ArrowFunctionExpression',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'ArrowFunctionExpression',
          ],
          publicOnly: true,
        },
      ],
      output: `
          /**
           *
           */
          export const test = () => {

          };
      `,
    },
    {
      code: `
          export const test = () => {

          };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'ArrowFunctionExpression',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
        },
      ],
      output: `
          /**
           *
           */
          export const test = () => {

          };
      `,
      settings: {
        jsdoc: {
          contexts: [
            'ArrowFunctionExpression',
          ],
        },
      },
    },
    {
      code: `
          export const test = () => {

          };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'ArrowFunctionExpression',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            {
              context: 'ArrowFunctionExpression',
            },
          ],
          publicOnly: true,
        },
      ],
      output: `
          /**
           *
           */
          export const test = () => {

          };
      `,
    },
    {
      code: `
          export let test = class {

          };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'ClassExpression',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            ClassExpression: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          export let test = class {

          };
      `,
    },
    {
      code: `
        export default function () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionDeclaration',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: {
            cjs: false,
            esm: true,
            window: false,
          },
          require: {
            FunctionDeclaration: true,
          },
        },
      ],
      output: `
        /**
         *
         */
        export default function () {}
      `,
    },
    {
      code: `
        export default () => {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'ArrowFunctionExpression',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: {
            cjs: false,
            esm: true,
            window: false,
          },
          require: {
            ArrowFunctionExpression: true,
          },
        },
      ],
      output: `
        /**
         *
         */
        export default () => {}
      `,
    },
    {
      code: `
      export default (function () {})
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: {
            cjs: false,
            esm: true,
            window: false,
          },
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
      /**
       *
       */
      export default (function () {})
      `,
    },
    {
      code: `
        export default class {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'ClassDeclaration',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: {
            cjs: false,
            esm: true,
            window: false,
          },
          require: {
            ClassDeclaration: true,
          },
        },
      ],
      output: `
        /**
         *
         */
        export default class {}
      `,
    },
    {
      code: `
          function quux (foo) {

          }`,
      errors: [
        {
          endLine: 3,
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      output: `
          /**
           *
           */
          function quux (foo) {

          }`,
    },
    {
      code: `
        function quux (foo) {

        }`,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          exemptEmptyFunctions: true,
        },
      ],
      output: `
        /**
         *
         */
        function quux (foo) {

        }`,
    },
    {
      code: `
        function quux (foo) {

        }`,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          exemptEmptyFunctions: true,
        },
      ],
      output: `
        /**
         *
         */

        function quux (foo) {

        }`,
      settings: {
        jsdoc: {
          minLines: 2,
        },
      },
    },
    {
      code: `
      function myFunction() {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionDeclaration',
        },
      ],
      output: `
      /**
       *
       */
      function myFunction() {}
      `,
    },
    {
      code:
        `/**
          * Description for A.
          */
         class A {
            constructor(xs) {
                 this.a = xs;
            }
         }`,
      errors: [
        {
          line: 5,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      languageOptions: {
        ecmaVersion: 6,
      },
      options: [
        {
          require: {
            ClassDeclaration: true,
            MethodDefinition: true,
          },
        },
      ],
      output:
        `/**
          * Description for A.
          */
         class A {
            /**
             *
             */
            constructor(xs) {
                 this.a = xs;
            }
         }`,
    },
    {
      code: `
        class A {
            /**
             * Description for constructor.
             * @param {object[]} xs - xs
             */
            constructor(xs) {
                this.a = xs;
            }
        }`,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'ClassDeclaration',
        },
      ],
      languageOptions: {
        ecmaVersion: 6,
      },
      options: [
        {
          require: {
            ClassDeclaration: true,
            MethodDefinition: true,
          },
        },
      ],
      output: `
        /**
         *
         */
        class A {
            /**
             * Description for constructor.
             * @param {object[]} xs - xs
             */
            constructor(xs) {
                this.a = xs;
            }
        }`,
    },
    {
      code: `
        class A extends B {
            /**
             * Description for constructor.
             * @param {object[]} xs - xs
             */
            constructor(xs) {
                this.a = xs;
            }
        }`,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'ClassDeclaration',
        },
      ],
      languageOptions: {
        ecmaVersion: 6,
      },
      options: [
        {
          require: {
            ClassDeclaration: true,
            MethodDefinition: true,
          },
        },
      ],
      output: `
        /**
         *
         */
        class A extends B {
            /**
             * Description for constructor.
             * @param {object[]} xs - xs
             */
            constructor(xs) {
                this.a = xs;
            }
        }`,
    },
    {
      code: `
        export class A extends B {
            /**
             * Description for constructor.
             * @param {object[]} xs - xs
             */
            constructor(xs) {
                this.a = xs;
            }
        }`,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'ClassDeclaration',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          require: {
            ClassDeclaration: true,
            MethodDefinition: true,
          },
        },
      ],
      output: `
        /**
         *
         */
        export class A extends B {
            /**
             * Description for constructor.
             * @param {object[]} xs - xs
             */
            constructor(xs) {
                this.a = xs;
            }
        }`,
    },
    {
      code: `
        export default class A extends B {
            /**
             * Description for constructor.
             * @param {object[]} xs - xs
             */
            constructor(xs) {
                this.a = xs;
            }
        }`,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'ClassDeclaration',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          require: {
            ClassDeclaration: true,
            MethodDefinition: true,
          },
        },
      ],
      output: `
        /**
         *
         */
        export default class A extends B {
            /**
             * Description for constructor.
             * @param {object[]} xs - xs
             */
            constructor(xs) {
                this.a = xs;
            }
        }`,
    },
    {
      code: `
      var myFunction = () => {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'ArrowFunctionExpression',
        },
      ],
      languageOptions: {
        ecmaVersion: 6,
      },
      options: [
        {
          require: {
            ArrowFunctionExpression: true,
          },
        },
      ],
      output: `
      /**
       *
       */
      var myFunction = () => {}
      `,
    },
    {
      code: `
      var myFunction = () => () => {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'ArrowFunctionExpression',
        },
      ],
      languageOptions: {
        ecmaVersion: 6,
      },
      options: [
        {
          require: {
            ArrowFunctionExpression: true,
          },
        },
      ],
      output: `
      /**
       *
       */
      var myFunction = () => () => {}
      `,
    },
    {
      code: `
      var foo = function() {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      options: [
        {
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
      /**
       *
       */
      var foo = function() {}
      `,
    },
    {
      code: `
      const foo = {bar() {}}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      languageOptions: {
        ecmaVersion: 6,
      },
      options: [
        {
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
      const foo = {/**
       *
       */
      bar() {}}
      `,
    },
    {
      code: `
      var foo = {bar: function() {}}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      options: [
        {
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
      var foo = {/**
       *
       */
      bar: function() {}}
      `,
    },
    {
      code: `
        function foo (abc) {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionDeclaration',
        },
      ],
      options: [
        {
          exemptEmptyFunctions: false,
        },
      ],
      output: `
        /**
         *
         */
        function foo (abc) {}
      `,
    },
    {
      code: `
        function foo () {
          return true;
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionDeclaration',
        },
      ],
      options: [
        {
          exemptEmptyFunctions: false,
        },
      ],
      output: `
        /**
         *
         */
        function foo () {
          return true;
        }
      `,
    },
    {
      code: `
          module.exports = function quux () {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          module.exports = function quux () {

          }
      `,
    },
    {
      code: `
          module.exports = function quux () {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: {
            ancestorsOnly: true,
          },
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          module.exports = function quux () {

          }
      `,
    },
    {
      code: `
          module.exports = {
            method: function() {

            }
          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
          module.exports = {
            /**
             *
             */
            method: function() {

            }
          }
      `,
    },
    {
      code: `
          module.exports = {
            test: {
              test2: function() {

              }
            }
          }
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
          module.exports = {
            test: {
              /**
               *
               */
              test2: function() {

              }
            }
          }
      `,
    },
    {
      code: `
          module.exports = {
            test: {
              test2: function() {

              }
            }
          }
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: {
            ancestorsOnly: true,
          },
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
          module.exports = {
            test: {
              /**
               *
               */
              test2: function() {

              }
            }
          }
      `,
    },
    {
      code: `
          const test = module.exports = function () {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          const test = module.exports = function () {

          }
      `,
    },
    {
      code: `
          /**
          *
          */
          const test = module.exports = function () {

          }

          test.prototype.method = function() {}
      `,
      errors: [
        {
          line: 9,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
          /**
          *
          */
          const test = module.exports = function () {

          }

          /**
           *
           */
          test.prototype.method = function() {}
      `,
    },
    {
      code: `
          const test = function () {

          }
          module.exports = {
            test: test
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          const test = function () {

          }
          module.exports = {
            test: test
          }
      `,
    },
    {
      code: `
          const test = () => {

          }
          module.exports = {
            test: test
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'ArrowFunctionExpression',
        },
      ],
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          const test = () => {

          }
          module.exports = {
            test: test
          }
      `,
    },
    {
      code: `
        class Test {
            method() {

            }
        }
        module.exports = Test;
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: true,
          require: {
            MethodDefinition: true,
          },
        },
      ],
      output: `
        class Test {
            /**
             *
             */
            method() {

            }
        }
        module.exports = Test;
      `,
    },
    {
      code: `
          export default function quux () {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionDeclaration',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          export default function quux () {

          }
      `,
    },
    {
      code: `
          export default function quux () {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionDeclaration',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: {
            ancestorsOnly: true,
          },
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          export default function quux () {

          }
      `,
    },
    {
      code: `
          function quux () {

          }
          export default quux;
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionDeclaration',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          function quux () {

          }
          export default quux;
      `,
    },
    {
      code: `
          export function test() {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionDeclaration',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          export function test() {

          }
      `,
    },
    {
      code: `
          export function test() {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionDeclaration',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: {
            ancestorsOnly: true,
          },
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          export function test() {

          }
      `,
    },
    {
      code: `
          var test = function () {

          }
          var test2 = 2;
          export { test, test2 }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          var test = function () {

          }
          var test2 = 2;
          export { test, test2 }
      `,
    },
    {
      code: `
          var test = function () {

          }
          export { test as test2 }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          var test = function () {

          }
          export { test as test2 }
      `,
    },
    {
      code: `
         export default class A {

         }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'ClassDeclaration',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            ClassDeclaration: true,
          },
        },
      ],
      output: `
         /**
          *
          */
         export default class A {

         }
      `,
    },
    {
      code: `
         export default class A {

         }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'ClassDeclaration',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: {
            ancestorsOnly: true,
          },
          require: {
            ClassDeclaration: true,
          },
        },
      ],
      output: `
         /**
          *
          */
         export default class A {

         }
      `,
    },
    {
      code: `
          var test = function () {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: {
            window: true,
          },
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          var test = function () {

          }
      `,
    },
    {
      code: `
          window.test = function () {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: {
            window: true,
          },
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          window.test = function () {

          }
      `,
    },
    {
      code: `
          function test () {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionDeclaration',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: {
            window: true,
          },
        },
      ],
      output: `
          /**
           *
           */
          function test () {

          }
      `,
    },
    {
      code: `
        module.exports = function() {

        }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: {
            cjs: true,
            esm: false,
            window: false,
          },
          require: {
            FunctionExpression: true,
          },
        },
      ],
      output: `
        /**
         *
         */
        module.exports = function() {

        }
      `,
    },
    {
      code: `
        export function someMethod() {

        }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
          type: 'FunctionDeclaration',
        },
      ],
      languageOptions: {
        ecmaVersion: 6,
        globals: globals.node,
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: {
            cjs: false,
            esm: true,
            window: false,
          },
          require: {
            FunctionDeclaration: true,
          },
        },
      ],
      output: `
        /**
         *
         */
        export function someMethod() {

        }
      `,
    },
    {
      code: `
          const myObject = {
            myProp: true
          };
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc comment.',
          type: 'Property',
        },
      ],
      options: [
        {
          contexts: [
            'Property',
          ],
        },
      ],
      output: `
          const myObject = {
            /**
             *
             */
            myProp: true
          };
      `,
    },
    {
      code: `
      /**
       * Foo interface documentation.
       */
      export interface Foo extends Bar {
        /**
         * baz method documentation.
         */
        baz(): void;

        meow(): void;
      }
      `,
      errors: [
        {
          line: 11,
          message: 'Missing JSDoc comment.',
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
      /**
       * Foo interface documentation.
       */
      export interface Foo extends Bar {
        /**
         * baz method documentation.
         */
        baz(): void;

        /**
         *
         */
        meow(): void;
      }
      `,
    },
    {
      code: `
      class MyClass {
        someProperty: boolean; // Flow type annotation.
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: babelEslintParser,
        parserOptions: {
          babelOptions: {
            env: {
              test: {
                plugins: [
                  'istanbul',
                ],
              },
            },
            plugins: [
              '@babel/plugin-transform-flow-strip-types',
              '@babel/plugin-syntax-class-properties',
              'add-module-exports',
            ],
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 12,
                  },
                },
              ],
            ],
          },
        },
      },
      options: [
        {
          exemptEmptyFunctions: true,
          require: {
            ClassDeclaration: true,
          },
        },
      ],
      output: `
      /**
       *
       */
      class MyClass {
        someProperty: boolean; // Flow type annotation.
      }
      `,
    },
    {
      code: `
      export default class Test {
        constructor(a) {
          this.a = a;
        }
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            ArrowFunctionExpression: false,
            ClassDeclaration: false,
            ClassExpression: false,
            FunctionDeclaration: false,
            FunctionExpression: false,
            MethodDefinition: true,
          },
        },
      ],
      output: `
      export default class Test {
        /**
         *
         */
        constructor(a) {
          this.a = a;
        }
      }
      `,
    },
    {
      code: `
      export default class Test {
        constructor(a) {
          this.a = a;
        }
        private abc(a) {
          this.a = a;
        }
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'MethodDefinition > FunctionExpression',
          ],
          publicOnly: true,
          require: {
            ArrowFunctionExpression: false,
            ClassDeclaration: false,
            ClassExpression: false,
            FunctionDeclaration: false,
            FunctionExpression: false,
            MethodDefinition: false,
          },
        },
      ],
      output: `
      export default class Test {
        /**
         *
         */
        constructor(a) {
          this.a = a;
        }
        private abc(a) {
          this.a = a;
        }
      }
      `,
    },
    {
      code: `
      e = function () {
      };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          require: {
            FunctionDeclaration: false,
            FunctionExpression: true,
          },
        },
      ],
      output: `
      /**
       *
       */
      e = function () {
      };
      `,
    },
    {
      code: `
      /**
       *
       */
      export class Class {
          test = 1;

          foo() {
              this.test = 2;
          }
      }
      `,
      errors: [
        {
          line: 8,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          require: {
            FunctionDeclaration: false,
            MethodDefinition: true,
          },
        },
      ],
      output: `
      /**
       *
       */
      export class Class {
          test = 1;

          /**
           *
           */
          foo() {
              this.test = 2;
          }
      }
      `,
    },
    {
      code: `
      class Dog {
        eat() {

        }
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          require: {
            FunctionDeclaration: false,
            MethodDefinition: true,
          },
        },
      ],
      output: `
      class Dog {
        /**
         *
         */
        eat() {

        }
      }
      `,
    },
    {
      code: `
      const hello = name => {
        document.body.textContent = "Hello, " + name + "!";
      };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          require: {
            ArrowFunctionExpression: true,
            FunctionDeclaration: false,
          },
        },
      ],
      output: `
      /**
       *
       */
      const hello = name => {
        document.body.textContent = "Hello, " + name + "!";
      };
      `,
    },
    {
      code: `
      export const loginSuccessAction = (): BaseActionPayload => ({ type: LOGIN_SUCCESSFUL });
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          require: {
            ArrowFunctionExpression: true,
            FunctionDeclaration: false,
          },
        },
      ],
      output: `
      /**
       *
       */
      export const loginSuccessAction = (): BaseActionPayload => ({ type: LOGIN_SUCCESSFUL });
      `,
    },
    {
      code: `
      export type Container = {
        constants?: ObjByString;
        enums?: { [key in string]: TypescriptEnum };
        helpers?: { [key in string]: AnyFunction };
      };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
        {
          line: 3,
          message: 'Missing JSDoc comment.',
        },
        {
          line: 4,
          message: 'Missing JSDoc comment.',
        },
        {
          line: 5,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'TSTypeAliasDeclaration',
            {
              context: 'TSPropertySignature',
              inlineCommentBlock: true,
            },
          ],
        },
      ],
      output: `
      /**
       *
       */
      export type Container = {
        /** */
        constants?: ObjByString;
        /** */
        enums?: { [key in string]: TypescriptEnum };
        /** */
        helpers?: { [key in string]: AnyFunction };
      };
      `,
    },
    {
      code: `
      class Foo {
          constructor() {}

          bar() {}
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
        {
          line: 5,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          contexts: [
            'MethodDefinition[key.name!="constructor"]',
          ],
          require: {
            ClassDeclaration: true,
          },
        },
      ],
      output: `
      /**
       *
       */
      class Foo {
          constructor() {}

          /**
           *
           */
          bar() {}
      }
      `,
    },
    {
      code: `
      class Example extends React.PureComponent {
        componentDidMount() {}

        render() {}

        someOtherMethod () {}
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
        {
          line: 7,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          contexts: [
            'MethodDefinition:not([key.name="componentDidMount"]):not([key.name="render"])',
          ],
          require: {
            ClassDeclaration: true,
          },
        },
      ],
      output: `
      /**
       *
       */
      class Example extends React.PureComponent {
        componentDidMount() {}

        render() {}

        /**
         *
         */
        someOtherMethod () {}
      }
      `,
    },
    {
      code: `
      function foo(arg: boolean): boolean {
        return arg;
      }

      function bar(arg: true): true;
      function bar(arg: false): false;
      function bar(arg: boolean): boolean {
        return arg;
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
        {
          line: 6,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'TSDeclareFunction:not(TSDeclareFunction + TSDeclareFunction)',
            'FunctionDeclaration:not(TSDeclareFunction + FunctionDeclaration)',
          ],
          require: {
            FunctionDeclaration: false,
          },
        },
      ],
      output: `
      /**
       *
       */
      function foo(arg: boolean): boolean {
        return arg;
      }

      /**
       *
       */
      function bar(arg: true): true;
      function bar(arg: false): false;
      function bar(arg: boolean): boolean {
        return arg;
      }
      `,
    },
    {
      code: `
      export function foo(arg: boolean): boolean {
        return arg;
      }

      export function bar(arg: true): true;
      export function bar(arg: false): false;
      export function bar(arg: boolean): boolean {
        return arg;
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
        {
          line: 6,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'ExportNamedDeclaration[declaration.type="TSDeclareFunction"]:' +
              'not(ExportNamedDeclaration[declaration.type="TSDeclareFunction"] + ' +
              'ExportNamedDeclaration[declaration.type="TSDeclareFunction"])',
            'ExportNamedDeclaration[declaration.type="FunctionDeclaration"]:not(' +
              'ExportNamedDeclaration[declaration.type="TSDeclareFunction"] + ' +
              'ExportNamedDeclaration[declaration.type="FunctionDeclaration"])',
          ],
          require: {
            FunctionDeclaration: false,
          },
        },
      ],
      output: `
      /**
       *
       */
      export function foo(arg: boolean): boolean {
        return arg;
      }

      /**
       *
       */
      export function bar(arg: true): true;
      export function bar(arg: false): false;
      export function bar(arg: boolean): boolean {
        return arg;
      }
      `,
    },
    {
      code: `
      module.exports.foo = (bar) => {
        return bar + "biz"
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          publicOnly: false,
          require: {
            ArrowFunctionExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
        },
      ],
      output: `
      /**
       *
       */
      module.exports.foo = (bar) => {
        return bar + "biz"
      }
      `,
    },
    {
      code: `
      class Animal {

        #name: string;

        private species: string;

        public color: string;

        @SomeAnnotation('optionalParameter')
        tail: boolean;
      }
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc comment.',
        },
        {
          line: 6,
          message: 'Missing JSDoc comment.',
        },
        {
          line: 8,
          message: 'Missing JSDoc comment.',
        },
        {
          line: 10,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'PropertyDefinition',
          ],
        },
      ],
      output: `
      class Animal {

        /**
         *
         */
        #name: string;

        /**
         *
         */
        private species: string;

        /**
         *
         */
        public color: string;

        /**
         *
         */
        @SomeAnnotation('optionalParameter')
        tail: boolean;
      }
      `,
    },
    {
      code: `
      @Entity('users')
      export class User {}
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          require: {
            ClassDeclaration: true,
          },
        },
      ],
      output: `
      /**
       *
       */
      @Entity('users')
      export class User {}
      `,
    },
    {
      code: `
        /**
         *
         */
        class Foo {
            constructor() {}
        }
      `,
      errors: [
        {
          line: 6,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          exemptEmptyConstructors: false,
          require: {
            MethodDefinition: true,
          },
        },
      ],
      output: `
        /**
         *
         */
        class Foo {
            /**
             *
             */
            constructor() {}
        }
      `,
    },
    {
      code: `
        /**
         *
         */
        class Foo {
            constructor(notEmpty) {}
        }
      `,
      errors: [
        {
          line: 6,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          exemptEmptyConstructors: true,
          require: {
            MethodDefinition: true,
          },
        },
      ],
      output: `
        /**
         *
         */
        class Foo {
            /**
             *
             */
            constructor(notEmpty) {}
        }
      `,
    },
    {
      code: `
        /**
         *
         */
        class Foo {
            constructor() {
                const notEmpty = true;
                return notEmpty;
            }
        }
      `,
      errors: [
        {
          line: 6,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          exemptEmptyConstructors: true,
          require: {
            MethodDefinition: true,
          },
        },
      ],
      output: `
        /**
         *
         */
        class Foo {
            /**
             *
             */
            constructor() {
                const notEmpty = true;
                return notEmpty;
            }
        }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 1,
          message: 'Cannot add "name" to `require` with the tag\'s `name` set to `false`',
        },
      ],
      settings: {
        jsdoc: {
          structuredTags: {
            see: {
              name: false,
              required: [
                'name',
              ],
            },
          },
        },
      },
    },
    {
      code: `
      class Test {
        aFunc() {}
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          checkConstructors: false,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: false,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
        },
      ],
      output: `
      class Test {
        /**
         *
         */
        aFunc() {}
      }
      `,
    },
    {
      code: `
      class Test {
        aFunc = () => {}
        anotherFunc() {}
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc comment.',
        }, {
          line: 4,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: babelEslintParser,
      },
      options: [
        {
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: false,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
        },
      ],
      output: `
      class Test {
        /**
         *
         */
        aFunc = () => {}
        /**
         *
         */
        anotherFunc() {}
      }
      `,
    },
    {
      code: `
      export enum testEnum {
        A, B
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'TSEnumDeclaration',
          ],
          publicOnly: true,
        },
      ],
      output: `
      /**
       *
       */
      export enum testEnum {
        A, B
      }
      `,
    },
    {
      code: `
      export interface Test {
        aFunc: () => void;
        aVar: string;
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'TSInterfaceDeclaration',
          ],
          publicOnly: true,
        },
      ],
      output: `
      /**
       *
       */
      export interface Test {
        aFunc: () => void;
        aVar: string;
      }
      `,
    },
    {
      code: `
      export type testType = string | number;
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'TSTypeAliasDeclaration',
          ],
          publicOnly: true,
        },
      ],
      output: `
      /**
       *
       */
      export type testType = string | number;
      `,
    },
    {
      code: `
      export interface Foo {
          bar: number;
          baz: string;
          quux(): void;
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc comment.',
        },
        {
          line: 4,
          message: 'Missing JSDoc comment.',
        },
        {
          line: 5,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'TSPropertySignature', 'TSMethodSignature',
          ],
          publicOnly: true,
        },
      ],
      output: `
      export interface Foo {
          /**
           *
           */
          bar: number;
          /**
           *
           */
          baz: string;
          /**
           *
           */
          quux(): void;
      }
      `,
    },
    {
      code: `
      export class MyComponentComponent {
        @Output()
        public changed = new EventEmitter();

        public test = 'test';

        @Input()
        public value = new EventEmitter();
      }
      `,
      errors: [
        {
          line: 8,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'PropertyDefinition > Decorator[expression.callee.name="Input"]',
          ],
        },
      ],
      output: `
      export class MyComponentComponent {
        @Output()
        public changed = new EventEmitter();

        public test = 'test';

        /**
         *
         */
        @Input()
        public value = new EventEmitter();
      }
      `,
    },
    {
      code: `
      requestAnimationFrame(draw)

      function bench() {
      }
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc comment.',
        },
      ],
      output: `
      requestAnimationFrame(draw)

      /**
       *
       */
      function bench() {
      }
      `,
    },
    {
      code: `
        class Foo {
          set aName (val) {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          checkSetters: 'no-getter',
          contexts: [
            'MethodDefinition > FunctionExpression',
          ],
        },
      ],
      output: `
        class Foo {
          /**
           *
           */
          set aName (val) {}
        }
      `,
    },
    {
      code: `
        class Foo {
          get aName () {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          checkGetters: 'no-setter',
          contexts: [
            'MethodDefinition > FunctionExpression',
          ],
        },
      ],
      output: `
        class Foo {
          /**
           *
           */
          get aName () {}
        }
      `,
    },
    {
      code: `
        const obj = {
          get aName () {},
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          checkGetters: 'no-setter',
          contexts: [
            'Property > FunctionExpression',
          ],
        },
      ],
      output: `
        const obj = {
          /**
           *
           */
          get aName () {},
        }
      `,
    },
    {
      code: `
      function commandFinished () {
        return new Promise((resolve) => {
          client.on('ev', () => {
            resolve();
          });
        });
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      ignoreReadme: true,
      options: [
        {
          exemptEmptyFunctions: true,
          require: {
            FunctionDeclaration: true,
          },
        },
      ],
      output: `
      /**
       *
       */
      function commandFinished () {
        return new Promise((resolve) => {
          client.on('ev', () => {
            resolve();
          });
        });
      }
      `,
    },
    {
      code: `
      function comment () {
        return "comment";
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          enableFixer: true,
          fixerMessage: ' TODO: add comment',
        },
      ],
      output: `
      /**
       * TODO: add comment
       */
      function comment () {
        return "comment";
      }
      `,
    },
    {
      code: `
      function comment () {
        return "comment";
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
            {
              context: 'FunctionDeclaration',
              inlineCommentBlock: true,
            },
          ],
          fixerMessage: 'TODO: add comment ',
        },
      ],
      output: `
      /** TODO: add comment */
      function comment () {
        return "comment";
      }
      `,
    },
    {
      code: `
      function comment () {
        return "comment";
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          enableFixer: false,
          fixerMessage: ' TODO: add comment',
        },
      ],
      output: null,
    },
    {
      code: `
      export class InovaAutoCompleteComponent {
        public disabled = false;
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'PropertyDefinition',
          ],
          publicOnly: true,
        },
      ],
      output: `
      export class InovaAutoCompleteComponent {
        /**
         *
         */
        public disabled = false;
      }
      `,
    },
    {
      code: `
        export default (arg) => arg;
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
        },
      ],
      output: `
        /**
         *
         */
        export default (arg) => arg;
      `,
    },
    {
      code: `
      export function outer() {
          function inner() {
              console.log('foo');
          }

          inner();
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
        },
      ],
      output: `
      /**
       *
       */
      export function outer() {
          function inner() {
              console.log('foo');
          }

          inner();
      }
      `,
    },
    {
      code: `
      export const outer = () => {
          const inner = () => {
              console.log('foo');
          };

          inner();
      };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
        },
      ],
      output: `
      /**
       *
       */
      export const outer = () => {
          const inner = () => {
              console.log('foo');
          };

          inner();
      };
      `,
    },
    {
      code: `
      /**
       *
       */
      export class InovaAutoCompleteComponent {
        public disabled = false;
      }
      `,
      errors: [
        {
          line: 6,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'PropertyDefinition',
          ],
          publicOnly: true,
        },
      ],
      output: `
      /**
       *
       */
      export class InovaAutoCompleteComponent {
        /**
         *
         */
        public disabled = false;
      }
      `,
    },
    {
      code: `
          /**
          * Some comment.
          */
          export class Component {
              public foo?: number;
          }
      `,
      errors: [
        {
          line: 6,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          checkConstructors: false,
          contexts: [
            'PropertyDefinition',
          ],
          publicOnly: true,
        },
      ],
      output: `
          /**
          * Some comment.
          */
          export class Component {
              /**
               *
               */
              public foo?: number;
          }
      `,
    },
    {
      code: `
        /** Alpha of all types */
        export type Alpha = {
          one: string;
          two: number;
        };
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc comment.',
        },
        {
          line: 5,
          message: 'Missing JSDoc comment.',
        },
      ],
      ignoreReadme: true,
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'TSPropertySignature',
          ],
          publicOnly: true,
        },
      ],
      output: `
        /** Alpha of all types */
        export type Alpha = {
          /**
           *
           */
          one: string;
          /**
           *
           */
          two: number;
        };
      `,
    },
    {
      code: `
        export type Alpha = {
          one: string;
          two: number;
        };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
        {
          line: 3,
          message: 'Missing JSDoc comment.',
        },
        {
          line: 4,
          message: 'Missing JSDoc comment.',
        },
      ],
      ignoreReadme: true,
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'TSTypeAliasDeclaration',
            'TSPropertySignature',
          ],
          publicOnly: true,
        },
      ],
      output: `
        /**
         *
         */
        export type Alpha = {
          /**
           *
           */
          one: string;
          /**
           *
           */
          two: number;
        };
      `,
    },
    {
      code: `
         class Utility {
             /**
              *
              */
             mthd() {
                 return false;
             }
         }

         module.exports = Utility;
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          enableFixer: false,
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        module.exports = class Utility {
          mthd() {
            return false;
          }
        };
      `,
      errors: [
        {
          line: 6,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          enableFixer: false,
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code: `
        function quux () {
          return 3;
        }

        function b () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          minLineCount: 2,
        },
      ],
      output: `
        /**
         *
         */
        function quux () {
          return 3;
        }

        function b () {}
      `,
    },
    {
      code: `
        function quux () {
          return 3;
        }

        var a = {};
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          contexts: [
            {
              context: 'FunctionDeclaration',
              minLineCount: 2,
            },
            {
              context: 'VariableDeclaration',
              minLineCount: 2,
            },
          ],
          require: {
            FunctionDeclaration: false,
          },
        },
      ],
      output: `
        /**
         *
         */
        function quux () {
          return 3;
        }

        var a = {};
      `,
    },
    {
      code: `
        function quux () {
          return 3;
        }

        var a = {
          b: 1,
          c: 2
        };
      `,
      errors: [
        {
          line: 6,
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          contexts: [
            {
              context: 'FunctionDeclaration',
              minLineCount: 4,
            },
            {
              context: 'VariableDeclaration',
              minLineCount: 2,
            },
          ],
          require: {
            FunctionDeclaration: false,
          },
        },
      ],
      output: `
        function quux () {
          return 3;
        }

        /**
         *
         */
        var a = {
          b: 1,
          c: 2
        };
      `,
    },
    {
      code: `
        class A {
          setId(newId: number): void {
            this.id = id;
          }
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            {
              context: 'MethodDefinition',
              minLineCount: 3,
            },
          ],
          require: {
            ClassDeclaration: false,
            FunctionExpression: false,
            MethodDefinition: false,
          },
        },
      ],
      output: `
        class A {
          /**
           *
           */
          setId(newId: number): void {
            this.id = id;
          }
        }
      `,
    },
    {
      code: `
        export class MyClass {

          public myPublicProperty: number = 1;
              /* ^ Missing JSDoc comment. eslint(jsdoc/require-jsdoc) - expected ✅ */

          private myPrivateProp: number = -1;
              /* ^ Missing JSDoc comment. eslint(jsdoc/require-jsdoc) - unexpected ❌ */

          // ...
        }
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'PropertyDefinition',
          ],
          publicOnly: true,
        },
      ],
      output: `
        export class MyClass {

          /**
           *
           */
          public myPublicProperty: number = 1;
              /* ^ Missing JSDoc comment. eslint(jsdoc/require-jsdoc) - expected ✅ */

          private myPrivateProp: number = -1;
              /* ^ Missing JSDoc comment. eslint(jsdoc/require-jsdoc) - unexpected ❌ */

          // ...
        }
      `,
    },
    {
      code: `
        export const Comp = observer(() => <>Hello</>);
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      options: [
        {
          contexts: [
            'CallExpression[callee.name="observer"]',
          ],
          enableFixer: false,
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code: `
        /**
         * Command options for the login command
         */
        export type LoginOptions = CmdOptions<{
          username?: string;
          password?: string;
        }>;
      `,
      errors: [
        {
          line: 6,
          message: 'Missing JSDoc comment.',
        },
        {
          line: 7,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'TSTypeAliasDeclaration',
            'TSInterfaceDeclaration',
            'TSMethodSignature',
            'TSPropertySignature',
          ],
          publicOnly: {
            ancestorsOnly: true,
          },
        },
      ],
      output: `
        /**
         * Command options for the login command
         */
        export type LoginOptions = CmdOptions<{
          /**
           *
           */
          username?: string;
          /**
           *
           */
          password?: string;
        }>;
      `,
    },
    {
      code: `
        type Props = {
          variant: string
        }

        export type { Props as ComponentProps };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'VariableDeclaration',
            'TSTypeAliasDeclaration',
            // Encourage documenting React prop types
            'TSPropertySignature',
            'TSInterfaceDeclaration',
            'TSMethodSignature',
            'TSEnumDeclaration',
          ],
          enableFixer: true,
          publicOnly: {
            esm: true,
          },
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
        },
      ],
      output: `
        /**
         *
         */
        type Props = {
          variant: string
        }

        export type { Props as ComponentProps };
      `,
    },
    {
      code: `
        export interface A {
          a: string;
        }

        export class B implements A, B {
          a = 'abc';
          public f(): void {
            //
          }
        }
      `,
      errors: [
        {
          line: 8,
          message: 'Missing JSDoc comment.',
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
        export interface A {
          a: string;
        }

        export class B implements A, B {
          a = 'abc';
          /**
           *
           */
          public f(): void {
            //
          }
        }
      `,
    },
  ],
  valid: [
    {
      code: `
      interface FooBar {
        fooBar: string;
      }
    `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'TSInterfaceDeclaration',
            'TSMethodSignature',
            'TSPropertySignature',
          ],
          publicOnly: {
            ancestorsOnly: true,
          },
        },
      ],
    }, {
      code: `
      /** This is comment */
      interface FooBar {
        fooBar: string;
      }
    `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'TSInterfaceDeclaration',
            'TSMethodSignature',
            'TSPropertySignature',
          ],
          publicOnly: {
            ancestorsOnly: true,
          },
        },
      ],
    }, {
      code: `
        /** This is comment */
        export class Foo {
          someMethod() {
            interface FooBar {
              fooBar: string;
            }
          }
        }
    `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'TSInterfaceDeclaration',
            'TSMethodSignature',
            'TSPropertySignature',
          ],
          publicOnly: {
            ancestorsOnly: true,
          },
        },
      ],
    }, {
      code: `
        /** This is comment */
        function someFunction() {
          interface FooBar {
            fooBar: string;
          }
        }

    `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'TSInterfaceDeclaration',
            'TSMethodSignature',
            'TSPropertySignature',
          ],
          publicOnly: {
            ancestorsOnly: true,
          },
        },
      ],
    }, {
      code: `
        /** This is comment */
        export function foo() {
          interface bar {
            fooBar: string;
          }
        }
    `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'TSInterfaceDeclaration',
            'TSMethodSignature',
            'TSPropertySignature',
          ],
          publicOnly: {
            ancestorsOnly: true,
          },
        },
      ],
    }, {
      code: `
        /**
         *
         */
    `,
    }, {
      code: `
      var array = [1,2,3];
      array.forEach(function() {});

      /**
       * @class MyClass
       **/
      function MyClass() {}

      /**
       Function doing something
       */
      function myFunction() {}
      /**
       Function doing something
       */
      var myFunction = function() {};
      /**
       Function doing something
       */
      Object.myFunction = function () {};
      var obj = {
         /**
          *  Function doing something
          **/
          myFunction: function () {} };

      /**
       @func myFunction
       */
      function myFunction() {}
      /**
       @method myFunction
       */
      function myFunction() {}
      /**
       @function myFunction
       */
      function myFunction() {}

      /**
       @func myFunction
       */
      var myFunction = function () {}
      /**
       @method myFunction
       */
      var myFunction = function () {}
      /**
       @function myFunction
       */
      var myFunction = function () {}

      /**
       @func myFunction
       */
      Object.myFunction = function() {}
      /**
       @method myFunction
       */
      Object.myFunction = function() {}
      /**
       @function myFunction
       */
      Object.myFunction = function() {}
      (function(){})();

      var object = {
        /**
         *  @func myFunction - Some function
         */
        myFunction: function() {} }
      var object = {
        /**
         *  @method myFunction - Some function
         */
        myFunction: function() {} }
      var object = {
        /**
         *  @function myFunction - Some function
         */
        myFunction: function() {} }

      var array = [1,2,3];
      array.filter(function() {});
      Object.keys(this.options.rules || {}).forEach(function(name) {}.bind(this));
      var object = { name: 'key'};
      Object.keys(object).forEach(function() {})
    `,
      languageOptions: {
        sourceType: 'script',
      },
    },
    {
      code: `
       /**
        * @func myFunction
        */

       function myFunction() {

       }
       `,
      settings: {
        jsdoc: {
          maxLines: 2,
          minLines: 0,
        },
      },
    },
    {
      code: `
     /**
      * @func myFunction
      */


     function myFunction() {

     }
     `,
      settings: {
        jsdoc: {
          maxLines: 3,
          minLines: 0,
        },
      },
    },
    {
      code: `
        /** @func myFunction */  function myFunction() {

        }
   `,
      settings: {
        jsdoc: {
          maxLines: 0,
          minLines: 0,
        },
      },
    },
    {
      code: `
        /**
         * @func myFunction
         */

        function myFunction() {

        }
    `,
      settings: {
        jsdoc: {
          maxLines: 3,
          minLines: 2,
        },
      },
    },
    {
      code: 'function myFunction() {}',
      options: [
        {
          require: {
            ClassDeclaration: true,
            FunctionDeclaration: false,
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code: 'var myFunction = function() {}',
      options: [
        {
          require: {
            ClassDeclaration: true,
            FunctionDeclaration: false,
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code: `
      /**
       * Description for A.
       */
      class A {
          /**
           * Description for constructor.
           * @param {object[]} xs - xs
           */
          constructor(xs) {
              this.a = xs;
          }
      }`,
      languageOptions: {
        ecmaVersion: 6,
      },
      options: [
        {
          require: {
            ClassDeclaration: true,
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code:
      `/**
        * Description for A.
        */
       class App extends Component {
           /**
            * Description for constructor.
            * @param {object[]} xs - xs
            */
           constructor(xs) {
               this.a = xs;
           }
       }`,
      languageOptions: {
        ecmaVersion: 6,
      },
      options: [
        {
          require: {
            ClassDeclaration: true,
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code:
      `/**
       * Description for A.
       */
      export default class App extends Component {
          /**
           * Description for constructor.
           * @param {object[]} xs - xs
           */
          constructor(xs) {
              this.a = xs;
          }
      }`,
      languageOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
      options: [
        {
          require: {
            ClassDeclaration: true,
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code:
      `/**
         * Description for A.
         */
        export class App extends Component {
            /**
             * Description for constructor.
             * @param {object[]} xs - xs
             */
            constructor(xs) {
                this.a = xs;
            }
        }`,
      languageOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
      options: [
        {
          require: {
            ClassDeclaration: true,
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code:
      `class A {
          constructor(xs) {
              this.a = xs;
          }
      }`,
      languageOptions: {
        ecmaVersion: 6,
      },
      options: [
        {
          require: {
            ClassDeclaration: false,
            MethodDefinition: false,
          },
        },
      ],
    },
    {
      code:
      `/**
       * Function doing something
       */
       var myFunction = () => {}`,
      languageOptions: {
        ecmaVersion: 6,
      },
      options: [
        {
          require: {
            ArrowFunctionExpression: true,
          },
        },
      ],
    },
    {
      code:
      `/**
       * Function doing something
       */
       var myFunction = function () {}`,
      languageOptions: {
        ecmaVersion: 6,
      },
      options: [
        {
          require: {
            ArrowFunctionExpression: true,
          },
        },
      ],
    },
    {
      code:
      `/**
       * Function doing something
       */
       var myFunction = () => {}`,
      languageOptions: {
        ecmaVersion: 6,
      },
      options: [
        {
          require: {
            ArrowFunctionExpression: false,
          },
        },
      ],
    },
    {
      code:
      `/**
        Function doing something
       */
       var myFunction = () => () => {}`,
      languageOptions: {
        ecmaVersion: 6,
      },
      options: [
        {
          require: {
            ArrowFunctionExpression: true,
          },
        },
      ],
    },
    {
      code: 'setTimeout(() => {}, 10);',
      languageOptions: {
        ecmaVersion: 6,
      },
      options: [
        {
          require: {
            ArrowFunctionExpression: true,
          },
        },
      ],
    },
    {
      code:
      `/**
       JSDoc Block
       */
       var foo = function() {}`,
      options: [
        {
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code:
      `const foo = {/**
       JSDoc Block
       */
       bar() {}}`,
      languageOptions: {
        ecmaVersion: 6,
      },
      options: [
        {
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code:
      `var foo = {/**
       JSDoc Block
       */
       bar: function() {}}`,
      options: [
        {
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: ' var foo = { [function() {}]: 1 };',
      languageOptions: {
        ecmaVersion: 6,
      },
      options: [
        {
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      function foo () {}
    `,
      options: [
        {
          exemptEmptyFunctions: true,
        },
      ],
    },
    {
      code: `
      function foo () {
        return;
      }
    `,
      options: [
        {
          exemptEmptyFunctions: true,
        },
      ],
    },
    {
      code: `
      const test = {};
      /**
       * test
       */
       test.method = function () {

      }
      module.exports = {
        prop: { prop2: test.method }
      }
      `,
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
     /**
      *
      */
     function test() {

     }

     module.exports = {
       prop: { prop2: test }
     }
      `,
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      test = function() {

      }

      module.exports = {
        prop: { prop2: test }
      }
      `,
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: {
            cjs: true,
            esm: false,
            window: false,
          },
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      test = function() {

      }

      exports.someMethod = {
        prop: { prop2: test }
      }
      `,
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: {
            cjs: false,
            esm: true,
            window: false,
          },
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      const test = () => {

      }

      module.exports = {
      prop: { prop2: test }
      }
      `,
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      const test = () => {

      }
      module.exports = {
        prop: { prop2: test }
      }
      `,
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: {
            ancestorsOnly: true,
          },
          require: {
            ArrowFunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      window.test = function() {

      }

      module.exports = {
      prop: window
      }
      `,
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      test = function() {

      }

      /**
       *
       */
      test = function() {

      }

      module.exports = {
      prop: { prop2: test }
      }
      `,
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      test = function() {

      }

      test = 2;

      module.exports = {
      prop: { prop2: test }
      }
      `,
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      function test() {

      }

      /**
       *
       */
      test.prototype.method = function() {

      }

      module.exports = {
      prop: { prop2: test }
      }
      `,
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
    class Test {
      /**
       * Test
       */
      method() {

      }
    }
    module.exports = Test;
      `,
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: true,
          require: {
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      export default function quux () {

      }
    `,
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      export default function quux () {

      }
    `,
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: {
            ancestorsOnly: true,
          },
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      function quux () {

      }
      export default quux;
    `,
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      function quux () {

      }
      export default quux;
    `,
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: {
            ancestorsOnly: true,
          },
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      export function test() {

      }
    `,
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      export function test() {

      }
    `,
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: {
            ancestorsOnly: true,
          },
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      var test = function () {

      }
      var test2 = 2;
      export { test, test2 }
    `,
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      var test = function () {

      }
      export { test as test2 }
    `,
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      export default class A {

      }
    `,
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: {
            ancestorsOnly: true,
          },
          require: {
            ClassDeclaration: true,
          },
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      var test = function () {

      }
    `,
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: {
            window: true,
          },
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      let test = function () {

      }
    `,
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: {
            window: true,
          },
          require: {
            FunctionExpression: true,
          },
        },
      ],
    },
    {
      code: `
      let test = class {

      }
    `,
      options: [
        {
          publicOnly: true,
          require: {
            ClassExpression: false,
          },
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      let test = class {

      }
    `,
      options: [
        {
          publicOnly: true,
          require: {
            ClassExpression: true,
          },
        },
      ],
    },
    {
      code: `
      export function someMethod() {

      }
      `,
      languageOptions: {
        ecmaVersion: 6,
        globals: globals.node,
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: {
            cjs: true,
            esm: false,
            window: false,
          },
          require: {
            FunctionDeclaration: true,
          },
        },
      ],
    }, {
      code: `
      exports.someMethod = function() {

      }
      `,
      languageOptions: {
        globals: globals.node,
      },
      options: [
        {
          publicOnly: {
            cjs: false,
            esm: true,
            window: false,
          },
          require: {
            FunctionExpression: true,
          },
        },
      ],
    }, {
      code: `
        const myObject = {
          myProp: true
        };
    `,
      options: [
        {
          contexts: [],
        },
      ],
    }, {
      code: `
      function bear() {}
      /**
       *
       */
      function quux () {
      }
      export default quux;
    `,
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            FunctionExpression: true,
          },
        },
      ],
    }, {
      code: `
    /**
     * This example interface is great!
     */
    export interface Example {
      /**
       * My super test string!
       */
      test: string
    }
    `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'TSInterfaceDeclaration',
          ],
        },
      ],
    },
    {
      code: `
    /**
     * This example interface is great!
     */
    interface Example {
      /**
       * My super test string!
       */
      test: string
    }
    `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'TSInterfaceDeclaration',
          ],
        },
      ],
    }, {
      code: `
    /**
     * This example type is great!
     */
    export type Example = {
      /**
       * My super test string!
       */
      test: string
    };
    `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'TSTypeAliasDeclaration',
          ],
        },
      ],
    },
    {
      code: `
    /**
     * This example type is great!
     */
    type Example = {
      /**
       * My super test string!
       */
      test: string
    };
    `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'TSTypeAliasDeclaration',
          ],
        },
      ],
    }, {
      code: `
    /**
     * This example enum is great!
     */
    export enum Example {
      /**
       * My super test enum!
       */
      test = 123
    }
    `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'TSEnumDeclaration',
          ],
        },
      ],
    },
    {
      code: `
    /**
     * This example enum is great!
     */
    enum Example {
      /**
       * My super test enum!
       */
      test = 123
    }
    `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'TSEnumDeclaration',
          ],
        },
      ],
    },
    {
    // https://github.com/gajus/eslint-plugin-jsdoc/issues/378
      code: `
    const foo = {...{}};
    function bar() {}
    `,
      languageOptions: {
        ecmaVersion: 2_017,
        parser: babelEslintParser,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        sourceType: 'module',
      },
      options: [
        {
          exemptEmptyFunctions: false,
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: false,
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code: `
    /**
     * Class documentation
     */
     @logged
    export default class Foo {
     // ....
    }
    `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          exemptEmptyFunctions: false,
          require: {
            ClassDeclaration: true,
          },
        },
      ],
    },
    {
      code: `
    const a = {};
    const b = {
      ...a
    };

    export default b;
    `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'ObjectExpression',
          ],
          exemptEmptyFunctions: false,
          publicOnly: true,
        },
      ],
    },
    {
      code: `
    /**
     * Foo interface documentation.
     */
    export interface Foo extends Bar {
      /**
       * baz method documentation.
       */
      baz(): void;

      /**
       * meow method documentation.
       */
      meow(): void;
    }
    `,
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
    },
    {
      code: `
    export default class Test {
      private abc(a) {
        this.a = a;
      }
    }
    `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'MethodDefinition > FunctionExpression',
          ],
          publicOnly: true,
          require: {
            ArrowFunctionExpression: false,
            ClassDeclaration: false,
            ClassExpression: false,
            FunctionDeclaration: false,
            FunctionExpression: false,
            MethodDefinition: false,
          },
        },
      ],
    },
    {
      code: `
    /**
     * Basic application controller.
     */
    @Controller()
    export class AppController {
      /**
       * Returns the application information.
       *
       * @returns ...
       */
      @Get('/info')
      public getInfo(): string {
        return 'OK';
      }
    }
    `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          require: {
            ArrowFunctionExpression: false,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: false,
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code: `
    /**
     * Entity to represent a user in the system.
     */
    @Entity('users')
    export class User {
    }
    `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          require: {
            ArrowFunctionExpression: false,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: false,
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code: `
    /**
     * Entity to represent a user in the system.
     */
    @Entity('users', getVal())
    export class User {
    }
    `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          require: {
            ArrowFunctionExpression: false,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: false,
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      class Foo {
          constructor() {}
      }
    `,
      options: [
        {
          exemptEmptyConstructors: true,
          require: {
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      class Foo {
          constructor() {}
      }
    `,
      options: [
        {
          checkConstructors: false,
          require: {
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code: `
      class Foo {
        get aName () {}
        set aName (val) {}
      }
    `,
      options: [
        {
          checkGetters: 'no-setter',
          checkSetters: false,
          contexts: [
            'MethodDefinition > FunctionExpression',
          ],
        },
      ],
    },
    {
      code: `
      const obj = {
        get aName () {},
        set aName (val) {}
      }
    `,
      options: [
        {
          checkGetters: 'no-setter',
          checkSetters: false,
          contexts: [
            'Property > FunctionExpression',
          ],
        },
      ],
    },
    {
      code: `
      class Foo {
        set aName (val) {}
      }
    `,
      options: [
        {
          checkSetters: false,
          contexts: [
            'MethodDefinition > FunctionExpression',
          ],
        },
      ],
    },
    {
      code: `
      class Foo {
        get aName () {}
      }
    `,
      options: [
        {
          checkGetters: false,
          contexts: [
            'MethodDefinition > FunctionExpression',
          ],
        },
      ],
    },
    {
      code: `
      class Foo {
        /**
         *
         */
        set aName (val) {}
      }
    `,
      options: [
        {
          checkSetters: 'no-getter',
          contexts: [
            'MethodDefinition > FunctionExpression',
          ],
        },
      ],
    },
    {
      code: `
      class Foo {
        /**
         *
         */
        get aName () {}
      }
    `,
      options: [
        {
          checkGetters: 'no-setter',
          contexts: [
            'MethodDefinition > FunctionExpression',
          ],
        },
      ],
    },
    {
      code: `
      class Foo {
        get aName () {}
        set aName (val) {}
      }
    `,
      options: [
        {
          checkGetters: false,
          checkSetters: 'no-getter',
          contexts: [
            'MethodDefinition > FunctionExpression',
          ],
        },
      ],
    },
    {
      code: `
    class Base {
      constructor() {
      }
    }
    `,
      options: [
        {
          contexts: [
            'MethodDefinition',
          ],
          exemptEmptyConstructors: true,
        },
      ],
    },
    {
      code: `
    /**
     * This is a text.
     */
    export function a(); // Reports an error
    `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'TSDeclareFunction',
          ],
          require: {
            FunctionDeclaration: true,
          },
        },
      ],
    },
    {
      code: `
    /**
     * Foo
     */
    export function foo(): void {
      function bar(): void {
        console.log('bar');
      }

      console.log('foo');
    }
`,
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          publicOnly: true,
        },
      ],
    },
    {
      code: `
    const foo = {
      bar: () => {
        // ...
      }
    }
    `,
      options: [
        {
          contexts: [
            ':not(Property) > ArrowFunctionExpression',
          ],
          require: {
            ArrowFunctionExpression: false,
            ClassDeclaration: true,
            ClassExpression: true,
          },
        },
      ],
    },
    {
      code: `
    /** Defines the current user's settings. */
    @Injectable({
      providedIn: 'root',
    })
    @State<Partial<UserSettingsStateModel>>
    ({
      name: 'userSettings',
      defaults: {
        isDev: !environment.production,
      },
    })
    export class UserSettingsState { }
    `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          require: {
            ClassDeclaration: true,
          },
        },
      ],
    },
    {
      code: `
    /**
     * Entity to represent a user in the system.
     */
    @Entity('users')
    export class User {
    }
    `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'Decorator',
          ],
          require: {
            FunctionDeclaration: false,
          },
        },
      ],
    },
    {
      code: `
        function main () {
          class Utility {
             /**
              *
              */
             mthd() {
                 return false;
             }
           }
         }

         module.exports = main;
      `,
      ignoreReadme: true,
      options: [
        {
          enableFixer: false,
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: false,
            FunctionExpression: true,
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code: `
        function main () {
          const a = class Utility {
             /**
              *
              */
             mthd() {
                 return false;
             }
           }
         }

         module.exports = main;
      `,
      ignoreReadme: true,
      options: [
        {
          enableFixer: false,
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: false,
            FunctionExpression: true,
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code: `
          function quux () {
          return 3;
        }

        function b () {}
      `,
      options: [
        {
          minLineCount: 4,
        },
      ],
    },
    {
      code: `
        function quux () {
          return 3;
        }

        var a = {
          b: 1,
          c: 2
        };
      `,
      options: [
        {
          contexts: [
            'ClassDeclaration',
            {
              context: 'FunctionDeclaration',
              minLineCount: 4,
            },
            {
              context: 'VariableDeclaration',
              minLineCount: 5,
            },
          ],
          require: {
            FunctionDeclaration: false,
          },
        },
      ],
    },
    {
      code: `
        class A {
          setId(newId: number): void {
            this.id = id;
          }
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            {
              context: 'MethodDefinition',
              minLineCount: 4,
            },
          ],
          require: {
            ClassDeclaration: false,
            FunctionExpression: false,
            MethodDefinition: false,
          },
        },
      ],
    },
    {
      code: `
    export default class Test {
      private abc(a) {
        this.a = a;
      }
    }
    `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          publicOnly: true,
          require: {
            ArrowFunctionExpression: false,
            ClassDeclaration: false,
            ClassExpression: false,
            FunctionDeclaration: false,
            FunctionExpression: false,
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code: `
      export default {
        created() {
          this.getData();
        },

        beforeUpdate() {},

        watch: {
          someValue(val) {}
        },

        computed: {
          loaded() {},
          selection() {}
        },

        methods: {
          getData(id) {}
        }
      };
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'ExportDefaultDeclaration > ObjectExpression > Property[key.name!=/^(created|beforeUpdate)$/] > FunctionExpression',
            'ExportDefaultDeclaration > ObjectExpression > Property[key.name!=/^(watch|computed|methods)$/] > ObjectExpression > Property > FunctionExpression',
          ],
        },
      ],
    },
    {
      code: `
        export class MyClass {
          #myPrivateMethod(): void { }

          #myPrivateProp = 5;
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          contexts: [
            'PropertyDefinition',
          ],
          publicOnly: true,
          require: {
            MethodDefinition: true,
          },
        },
      ],
    },
    {
      code: `
        class Abc {
          static {
            this.x = '2'
          }
        }
      `,
      languageOptions: {
        parser: babelEslintParser,
      },
      options: [
        {
          publicOnly: true,
          require: {
            ClassDeclaration: true,
          },
        },
      ],
    },
    {
      code: `
        /**
         * Array map function with overload for NonEmptyArray
         * @example
         * const data = [{value: 'value'}] as const;
         * const result1: NonEmptyReadonlyArray<'value'> = arrayMap(data, (value) => value.value); // pick type from data
         * const result2: NonEmptyReadonlyArray<'value'> = arrayMap<'value', typeof data>(data, (value) => value.value); // enforce output type
         * @template Target - The type of the array to map to
         * @template Source - The type of the array to map from
         * @param {Source} data - The array to map
         * @param {MapCallback<Target, Source>} callback - Callback function to map data from the array
         * @returns {AnyArrayType<Target>} Mapped array
         * @since v0.2.0
         */
        export function arrayMap<Target, Source extends NonEmptyArray<unknown> | NonEmptyReadonlyArray<unknown>>(
          data: Source,
          callback: MapCallback<Target, Source>,
        ): NonEmptyArray<Target>;
        export function arrayMap<Target, Source extends Array<unknown>>(data: Source, callback: MapCallback<Target, Source>): Array<Target>;
        export function arrayMap<Target, Source extends AnyArrayType>(data: Source, callback: MapCallback<Target, Source>): AnyArrayType<Target> {
          return data.map(callback);
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        export interface A {
          a: string;
          /**
           * Documentation.
           */
          f(): void;
        }

        export class B implements A {
          a = 'abc';
          public f(): void {
            //
          }
        }
      `,
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
  ],
});
