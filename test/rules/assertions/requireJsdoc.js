/**
 * @see https://github.com/eslint/eslint/blob/master/tests/lib/rules/require-jsdoc.js
 */

export default {
  invalid: [
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
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          enableFixer: false,
        },
      ],
      output: `
       function myFunction() {

       }
       `,
    },
    {
      code: `
          export var test = function () {

          };
      `,
      errors: [
        {
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      options: [{
        publicOnly: true,
        require: {
          FunctionExpression: true,
        },
      }],
      output: `
          /**
           *
           */
          export var test = function () {

          };
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          function test () {

          }
          export var test2 = test;
      `,
      errors: [
        {
          message: 'Missing JSDoc comment.',
          type: 'FunctionDeclaration',
        },
      ],
      options: [{
        publicOnly: true,
        require: {
          FunctionDeclaration: true,
        },
      }],
      output: `
          /**
           *
           */
          function test () {

          }
          export var test2 = test;
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          export const test = () => {

          };
      `,
      errors: [
        {
          message: 'Missing JSDoc comment.',
          type: 'ArrowFunctionExpression',
        },
      ],
      options: [{
        publicOnly: true,
        require: {
          ArrowFunctionExpression: true,
        },
      }],
      output: `
          /**
           *
           */
          export const test = () => {

          };
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          export const test = () => {

          };
      `,
      errors: [
        {
          message: 'Missing JSDoc comment.',
          type: 'ArrowFunctionExpression',
        },
      ],
      options: [{
        contexts: ['ArrowFunctionExpression'],
        publicOnly: true,
      }],
      output: `
          /**
           *
           */
          export const test = () => {

          };
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          export const test = () => {

          };
      `,
      errors: [
        {
          message: 'Missing JSDoc comment.',
          type: 'ArrowFunctionExpression',
        },
      ],
      options: [{
        contexts: [{
          context: 'ArrowFunctionExpression',
        }],
        publicOnly: true,
      }],
      output: `
          /**
           *
           */
          export const test = () => {

          };
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          export let test = class {

          };
      `,
      errors: [
        {
          message: 'Missing JSDoc comment.',
          type: 'ClassExpression',
        },
      ],
      options: [{
        publicOnly: true,
        require: {
          ClassExpression: true,
        },
      }],
      output: `
          /**
           *
           */
          export let test = class {

          };
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
        export default function () {}
      `,
      errors: [
        {
          message: 'Missing JSDoc comment.',
          type: 'FunctionDeclaration',
        },
      ],
      options: [{
        publicOnly: {
          cjs: false,
          esm: true,
          window: false,
        },
        require: {
          FunctionDeclaration: true,
        },
      }],
      output: `
        /**
         *
         */
        export default function () {}
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
        export default () => {}
      `,
      errors: [
        {
          message: 'Missing JSDoc comment.',
          type: 'ArrowFunctionExpression',
        },
      ],
      options: [{
        publicOnly: {
          cjs: false,
          esm: true,
          window: false,
        },
        require: {
          ArrowFunctionExpression: true,
        },
      }],
      output: `
        export default /**
         *
         */
        () => {}
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
      export default (function () {})
      `,
      errors: [
        {
          message: 'Missing JSDoc comment.',
          type: 'FunctionExpression',
        },
      ],
      options: [{
        publicOnly: {
          cjs: false,
          esm: true,
          window: false,
        },
        require: {
          FunctionExpression: true,
        },
      }],
      output: `
      export default (/**
       *
       */
      function () {})
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
        export default class {}
      `,
      errors: [
        {
          message: 'Missing JSDoc comment.',
          type: 'ClassDeclaration',
        },
      ],
      options: [{
        publicOnly: {
          cjs: false,
          esm: true,
          window: false,
        },
        require: {
          ClassDeclaration: true,
        },
      }],
      output: `
        /**
         *
         */
        export default class {}
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          function quux (foo) {

          }`,
      errors: [
        {
          endLine: undefined,
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
        {exemptEmptyFunctions: true},
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
        {exemptEmptyFunctions: true},
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
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionDeclaration',
      }],
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
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        require: {
          ClassDeclaration: true,
          MethodDefinition: true,
        },
      }],
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
      parserOptions: {
        ecmaVersion: 6,
      },
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
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'ClassDeclaration',
      }],
      options: [{
        require: {
          ClassDeclaration: true,
          MethodDefinition: true,
        },
      }],
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
      parserOptions: {
        ecmaVersion: 6,
      },
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
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'ClassDeclaration',
      }],
      options: [{
        require: {
          ClassDeclaration: true,
          MethodDefinition: true,
        },
      }],
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
      parserOptions: {
        ecmaVersion: 6,
      },
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
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'ClassDeclaration',
      }],
      options: [{
        require: {
          ClassDeclaration: true,
          MethodDefinition: true,
        },
      }],
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
      parserOptions: {
        sourceType: 'module',
      },
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
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'ClassDeclaration',
      }],
      options: [{
        require: {
          ClassDeclaration: true,
          MethodDefinition: true,
        },
      }],
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
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
      var myFunction = () => {}
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'ArrowFunctionExpression',
      }],
      options: [{
        require: {
          ArrowFunctionExpression: true,
        },
      }],
      output: `
      /**
       *
       */
      var myFunction = () => {}
      `,
      parserOptions: {
        ecmaVersion: 6,
      },
    },
    {
      code: `
      var myFunction = () => () => {}
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'ArrowFunctionExpression',
      }],
      options: [{
        require: {
          ArrowFunctionExpression: true,
        },
      }],
      output: `
      /**
       *
       */
      var myFunction = () => () => {}
      `,
      parserOptions: {
        ecmaVersion: 6,
      },
    },
    {
      code: `
      var foo = function() {}
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        require: {
          FunctionExpression: true,
        },
      }],
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
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        require: {
          FunctionExpression: true,
        },
      }],
      output: `
      const foo = {/**
       *
       */
      bar() {}}
      `,
      parserOptions: {
        ecmaVersion: 6,
      },
    },
    {
      code: `
      var foo = {bar: function() {}}
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        require: {
          FunctionExpression: true,
        },
      }],
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
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionDeclaration',
      }],
      options: [
        {exemptEmptyFunctions: false},
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
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionDeclaration',
      }],
      options: [
        {exemptEmptyFunctions: false},
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
      env: {
        node: true,
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        publicOnly: true,
        require: {
          FunctionExpression: true,
        },
      }],
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
      env: {
        node: true,
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        publicOnly: {
          ancestorsOnly: true,
        },
        require: {
          FunctionExpression: true,
        },
      }],
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
      env: {
        node: true,
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        publicOnly: true,
        require: {
          FunctionExpression: true,
        },
      }],
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
      env: {
        node: true,
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        publicOnly: true,
        require: {
          FunctionExpression: true,
        },
      }],
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
      env: {
        node: true,
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        publicOnly: {
          ancestorsOnly: true,
        },
        require: {
          FunctionExpression: true,
        },
      }],
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
      env: {
        node: true,
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        publicOnly: true,
        require: {
          FunctionExpression: true,
        },
      }],
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
      env: {
        node: true,
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        publicOnly: true,
        require: {
          FunctionExpression: true,
        },
      }],
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
      env: {
        node: true,
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        publicOnly: true,
        require: {
          FunctionExpression: true,
        },
      }],
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
      env: {
        node: true,
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'ArrowFunctionExpression',
      }],
      options: [{
        publicOnly: true,
        require: {
          ArrowFunctionExpression: true,
        },
      }],
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
      env: {
        node: true,
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        publicOnly: true,
        require: {
          MethodDefinition: true,
        },
      }],
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
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionDeclaration',
      }],
      options: [{
        publicOnly: true,
        require: {
          FunctionExpression: true,
        },
      }],
      output: `
          /**
           *
           */
          export default function quux () {

          }
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          export default function quux () {

          }
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionDeclaration',
      }],
      options: [{
        publicOnly: {
          ancestorsOnly: true,
        },
        require: {
          FunctionExpression: true,
        },
      }],
      output: `
          /**
           *
           */
          export default function quux () {

          }
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          function quux () {

          }
          export default quux;
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionDeclaration',
      }],
      options: [{
        publicOnly: true,
        require: {
          FunctionExpression: true,
        },
      }],
      output: `
          /**
           *
           */
          function quux () {

          }
          export default quux;
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          export function test() {

          }
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionDeclaration',
      }],
      options: [{
        publicOnly: true,
        require: {
          FunctionExpression: true,
        },
      }],
      output: `
          /**
           *
           */
          export function test() {

          }
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          export function test() {

          }
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionDeclaration',
      }],
      options: [{
        publicOnly: {
          ancestorsOnly: true,
        },
        require: {
          FunctionExpression: true,
        },
      }],
      output: `
          /**
           *
           */
          export function test() {

          }
      `,
      parserOptions: {
        sourceType: 'module',
      },
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
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [{
        publicOnly: true,
        require: {
          FunctionExpression: true,
        },
      }],
      output: `
          /**
           *
           */
          var test = function () {

          }
          var test2 = 2;
          export { test, test2 }
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          var test = function () {

          }
          export { test as test2 }
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        publicOnly: true,
        require: {
          FunctionExpression: true,
        },
      }],
      output: `
          /**
           *
           */
          var test = function () {

          }
          export { test as test2 }
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
         export default class A {

         }
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'ClassDeclaration',
      }],
      options: [{
        publicOnly: true,
        require: {
          ClassDeclaration: true,
        },
      }],
      output: `
         /**
          *
          */
         export default class A {

         }
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
         export default class A {

         }
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'ClassDeclaration',
      }],
      options: [{
        publicOnly: {
          ancestorsOnly: true,
        },
        require: {
          ClassDeclaration: true,
        },
      }],
      output: `
         /**
          *
          */
         export default class A {

         }
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          var test = function () {

          }
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        publicOnly: {
          window: true,
        },
        require: {
          FunctionExpression: true,
        },
      }],
      output: `
          /**
           *
           */
          var test = function () {

          }
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          window.test = function () {

          }
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        publicOnly: {
          window: true,
        },
        require: {
          FunctionExpression: true,
        },
      }],
      output: `
          /**
           *
           */
          window.test = function () {

          }
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          function test () {

          }
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionDeclaration',
      }],
      options: [{
        publicOnly: {
          window: true,
        },
      }],
      output: `
          /**
           *
           */
          function test () {

          }
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
        module.exports = function() {

        }
      `,
      env: {
        node: true,
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        publicOnly: {
          cjs: true,
          esm: false,
          window: false,
        },
        require: {
          FunctionExpression: true,
        },
      }],
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
      env: {
        node: true,
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionDeclaration',
      }],
      options: [{
        publicOnly: {
          cjs: false,
          esm: true,
          window: false,
        },
        require: {
          FunctionDeclaration: true,
        },
      }],
      output: `
        /**
         *
         */
        export function someMethod() {

        }
      `,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
    },
    {
      code: `
        export function someMethod() {

        }
      `,
      env: {
        node: true,
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionDeclaration',
      }],
      options: [{
        publicOnly: {
          cjs: false,
          esm: true,
          window: false,
        },
        require: {
          FunctionDeclaration: true,
        },
      }],
      output: `
        /**
         *
         */
        export function someMethod() {

        }
      `,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
    },
    {
      code: `
          const myObject = {
            myProp: true
          };
      `,
      errors: [
        {
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
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [{
        contexts: [
          'TSMethodSignature',
        ],
      }],
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
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      class MyClass {
        someProperty: boolean; // Flow type annotation.
      }
      `,
      errors: [
        {
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [{
        exemptEmptyFunctions: true,
        require: {
          ClassDeclaration: true,
        },
      }],
      output: `
      /**
       *
       */
      class MyClass {
        someProperty: boolean; // Flow type annotation.
      }
      `,
      parser: require.resolve('babel-eslint'),
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
          message: 'Missing JSDoc comment.',
        },
      ],
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
      parserOptions: {
        sourceType: 'module',
      },
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
          message: 'Missing JSDoc comment.',
        },
      ],
      options: [
        {
          contexts: [
            'MethodDefinition:not([accessibility="private"]) > FunctionExpression',
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
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
      e = function () {
      };
      `,
      errors: [
        {
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
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
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
      export const loginSuccessAction = (): BaseActionPayload => ({ type: LOGIN_SUCCESSFUL });
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
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
          message: 'Missing JSDoc comment.',
        },
        {
          message: 'Missing JSDoc comment.',
        },
        {
          message: 'Missing JSDoc comment.',
        },
        {
          message: 'Missing JSDoc comment.',
        },
      ],
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
      parser: require.resolve('@typescript-eslint/parser'),
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
      parser: require.resolve('@typescript-eslint/parser'),
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
      parser: require.resolve('@typescript-eslint/parser'),
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
      options: [
        {
          contexts: ['ClassProperty'],
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
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
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
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
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
      errors: [{
        line: 1,
        message: 'Cannot add "name" to `require` with the tag\'s `name` set to `false`',
      }],
      settings: {
        jsdoc: {
          structuredTags: {
            see: {
              name: false,
              required: ['name'],
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
      errors: [{
        line: 3,
        message: 'Missing JSDoc comment.',
      }],
      options: [{
        checkConstructors: false,
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: false,
          ClassExpression: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: true,
        },
      }],
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
      errors: [{
        line: 3,
        message: 'Missing JSDoc comment.',
      }, {
        line: 4,
        message: 'Missing JSDoc comment.',
      }],
      options: [{
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: false,
          ClassExpression: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: true,
        },
      }],
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
      parser: require.resolve('babel-eslint'),
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
      options: [
        {
          contexts: ['TSEnumDeclaration'],
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
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
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
      options: [
        {
          contexts: ['TSInterfaceDeclaration'],
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
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
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
      options: [
        {
          contexts: ['TSTypeAliasDeclaration'],
          publicOnly: true,
        },
      ],
      output: `
      /**
       *
       */
      export type testType = string | number;
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
  valid: [{
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
    options: [{
      require: {
        ClassDeclaration: true,
        FunctionDeclaration: false,
        MethodDefinition: true,
      },
    }],
  },
  {
    code: 'var myFunction = function() {}',
    options: [{
      require: {
        ClassDeclaration: true,
        FunctionDeclaration: false,
        MethodDefinition: true,
      },
    }],
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
    options: [{
      require: {
        ClassDeclaration: true,
        MethodDefinition: true,
      },
    }],
    parserOptions: {
      ecmaVersion: 6,
    },
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
    options: [{
      require: {
        ClassDeclaration: true,
        MethodDefinition: true,
      },
    }],
    parserOptions: {
      ecmaVersion: 6,
    },
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
    options: [{
      require: {
        ClassDeclaration: true,
        MethodDefinition: true,
      },
    }],
    parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module',
    },
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
    options: [{
      require: {
        ClassDeclaration: true,
        MethodDefinition: true,
      },
    }],
    parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module',
    },
  },
  {
    code:
      `class A {
          constructor(xs) {
              this.a = xs;
          }
      }`,
    options: [{
      require: {
        ClassDeclaration: false,
        MethodDefinition: false,
      },
    }],
    parserOptions: {
      ecmaVersion: 6,
    },
  },
  {
    code:
      `/**
       * Function doing something
       */
       var myFunction = () => {}`,
    options: [{
      require: {
        ArrowFunctionExpression: true,
      },
    }],
    parserOptions: {
      ecmaVersion: 6,
    },
  },
  {
    code:
      `/**
       * Function doing something
       */
       var myFunction = function () {}`,
    options: [{
      require: {
        ArrowFunctionExpression: true,
      },
    }],
    parserOptions: {
      ecmaVersion: 6,
    },
  },
  {
    code:
      `/**
       * Function doing something
       */
       var myFunction = () => {}`,
    options: [{
      require: {
        ArrowFunctionExpression: false,
      },
    }],
    parserOptions: {
      ecmaVersion: 6,
    },
  },
  {
    code:
      `/**
        Function doing something
       */
       var myFunction = () => () => {}`,
    options: [{
      require: {
        ArrowFunctionExpression: true,
      },
    }],
    parserOptions: {
      ecmaVersion: 6,
    },
  },
  {
    code: 'setTimeout(() => {}, 10);',
    options: [{
      require: {
        ArrowFunctionExpression: true,
      },
    }],
    parserOptions: {
      ecmaVersion: 6,
    },
  },
  {
    code:
      `/**
       JSDoc Block
       */
       var foo = function() {}`,
    options: [{
      require: {
        FunctionExpression: true,
      },
    }],
  },
  {
    code:
      `const foo = {/**
       JSDoc Block
       */
       bar() {}}`,
    options: [{
      require: {
        FunctionExpression: true,
      },
    }],
    parserOptions: {
      ecmaVersion: 6,
    },
  },
  {
    code:
      `var foo = {/**
       JSDoc Block
       */
       bar: function() {}}`,
    options: [{
      require: {
        FunctionExpression: true,
      },
    }],
  },
  {
    code: ' var foo = { [function() {}]: 1 };',
    options: [{
      require: {
        FunctionExpression: true,
      },
    }],
    parserOptions: {
      ecmaVersion: 6,
    },
  },
  {
    code: `
      function foo () {}
    `,
    options: [
      {exemptEmptyFunctions: true},
    ],
  },
  {
    code: `
      function foo () {
        return;
      }
    `,
    options: [
      {exemptEmptyFunctions: true},
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
    env: {
      node: true,
    },
    options: [{
      publicOnly: true,
      require: {
        FunctionExpression: true,
      },
    }],
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
    env: {
      node: true,
    },
    options: [{
      publicOnly: true,
      require: {
        FunctionExpression: true,
      },
    }],
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
    env: {
      node: true,
    },
    options: [{
      publicOnly: {
        cjs: true,
        esm: false,
        window: false,
      },
      require: {
        FunctionExpression: true,
      },
    }],
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
    env: {
      node: true,
    },
    options: [{
      publicOnly: {
        cjs: false,
        esm: true,
        window: false,
      },
      require: {
        FunctionExpression: true,
      },
    }],
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
    env: {
      node: true,
    },
    options: [{
      publicOnly: true,
      require: {
        ArrowFunctionExpression: true,
      },
    }],
  },
  {
    code: `
      const test = () => {

      }
      module.exports = {
        prop: { prop2: test }
      }
    `,
    env: {
      node: true,
    },
    options: [{
      publicOnly: {
        ancestorsOnly: true,
      },
      require: {
        ArrowFunctionExpression: true,
      },
    }],
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
    env: {
      node: true,
    },
    options: [{
      publicOnly: true,
      require: {
        FunctionExpression: true,
      },
    }],
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
    env: {
      node: true,
    },
    options: [{
      publicOnly: true,
      require: {
        FunctionExpression: true,
      },
    }],
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
    env: {
      node: true,
    },
    options: [{
      publicOnly: true,
      require: {
        FunctionExpression: true,
      },
    }],
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
    env: {
      node: true,
    },
    options: [{
      publicOnly: true,
      require: {
        FunctionExpression: true,
      },
    }],
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
    env: {
      node: true,
    },
    options: [{
      publicOnly: true,
      require: {
        MethodDefinition: true,
      },
    }],
  },
  {
    code: `
      /**
       *
       */
      export default function quux () {

      }
    `,
    options: [{
      publicOnly: true,
      require: {
        FunctionExpression: true,
      },
    }],
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    code: `
      /**
       *
       */
      export default function quux () {

      }
    `,
    options: [{
      publicOnly: {
        ancestorsOnly: true,
      },
      require: {
        FunctionExpression: true,
      },
    }],
    parserOptions: {
      sourceType: 'module',
    },
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
    options: [{
      publicOnly: true,
      require: {
        FunctionExpression: true,
      },
    }],
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    code: `
      function quux () {

      }
      export default quux;
    `,
    options: [{
      publicOnly: {
        ancestorsOnly: true,
      },
      require: {
        FunctionExpression: true,
      },
    }],
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    code: `
      /**
       *
       */
      export function test() {

      }
    `,
    options: [{
      publicOnly: true,
      require: {
        FunctionExpression: true,
      },
    }],
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    code: `
      /**
       *
       */
      export function test() {

      }
    `,
    options: [{
      publicOnly: {
        ancestorsOnly: true,
      },
      require: {
        FunctionExpression: true,
      },
    }],
    parserOptions: {
      sourceType: 'module',
    },
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
    options: [{
      publicOnly: true,
      require: {
        FunctionExpression: true,
      },
    }],
    parserOptions: {
      sourceType: 'module',
    },
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
    options: [{
      publicOnly: true,
      require: {
        FunctionExpression: true,
      },
    }],
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    code: `
      /**
       *
       */
      export default class A {

      }
    `,
    options: [{
      publicOnly: {
        ancestorsOnly: true,
      },
      require: {
        ClassDeclaration: true,
      },
    }],
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    code: `
      /**
       *
       */
      var test = function () {

      }
    `,
    options: [{
      publicOnly: {
        window: true,
      },
      require: {
        FunctionExpression: true,
      },
    }],
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    code: `
      let test = function () {

      }
    `,
    options: [{
      publicOnly: {
        window: true,
      },
      require: {
        FunctionExpression: true,
      },
    }],
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    code: `
      let test = class {

      }
    `,
    options: [{
      publicOnly: true,
      require: {
        ClassExpression: false,
      },
    }],
  },
  {
    code: `
      /**
       *
       */
      let test = class {

      }
    `,
    options: [{
      publicOnly: true,
      require: {
        ClassExpression: true,
      },
    }],
  },
  {
    code: `
      export function someMethod() {

      }
    `,
    env: {
      node: true,
    },
    options: [{
      publicOnly: {
        cjs: true,
        esm: false,
        window: false,
      },
      require: {
        FunctionDeclaration: true,
      },
    }],
    parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module',
    },
  }, {
    code: `
      export function someMethod() {

      }
    `,
    env: {
      node: true,
    },
    options: [{
      publicOnly: {
        cjs: true,
        esm: false,
        window: false,
      },
      require: {
        FunctionDeclaration: true,
      },
    }],
    parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module',
    },
  }, {
    code: `
      exports.someMethod = function() {

      }
    `,
    env: {
      node: true,
    },
    options: [{
      publicOnly: {
        cjs: false,
        esm: true,
        window: false,
      },
      require: {
        FunctionExpression: true,
      },
    }],
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
    options: [{
      publicOnly: true,
      require: {
        FunctionExpression: true,
      },
    }],
    parserOptions: {
      sourceType: 'module',
    },
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
    options: [
      {
        contexts: [
          'TSInterfaceDeclaration',
        ],
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
     * This example interface is great!
     */
    interface Example {
      /**
       * My super test string!
       */
      test: string
    }
    `,
    options: [
      {
        contexts: [
          'TSInterfaceDeclaration',
        ],
      },
    ],
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      sourceType: 'module',
    },
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
    options: [
      {
        contexts: [
          'TSTypeAliasDeclaration',
        ],
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
     * This example type is great!
     */
    type Example = {
      /**
       * My super test string!
       */
      test: string
    };
    `,
    options: [
      {
        contexts: [
          'TSTypeAliasDeclaration',
        ],
      },
    ],
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      sourceType: 'module',
    },
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
    options: [
      {
        contexts: [
          'TSEnumDeclaration',
        ],
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
     * This example enum is great!
     */
    enum Example {
      /**
       * My super test enum!
       */
      test = 123
    }
    `,
    options: [
      {
        contexts: [
          'TSEnumDeclaration',
        ],
      },
    ],
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    // https://github.com/gajus/eslint-plugin-jsdoc/issues/378
    code: `
    const foo = {...{}};
    function bar() {}
    `,
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
    parser: require.resolve('babel-eslint'),
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2017,
      sourceType: 'module',
    },
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
    options: [
      {
        exemptEmptyFunctions: false,
        require: {
          ClassDeclaration: true,
        },
      },
    ],
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    code: `
    const a = {};
    const b = {
      ...a
    };

    export default b;
    `,
    options: [
      {
        contexts: ['ObjectExpression'],
        exemptEmptyFunctions: false,
        publicOnly: true,
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
    options: [{
      contexts: [
        'TSMethodSignature',
      ],
    }],
    parser: require.resolve('@typescript-eslint/parser'),
  },
  {
    code: `
    export default class Test {
      private abc(a) {
        this.a = a;
      }
    }
    `,
    options: [
      {
        contexts: [
          'MethodDefinition:not([accessibility="private"]) > FunctionExpression',
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
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      sourceType: 'module',
    },
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
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      sourceType: 'module',
    },
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
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      sourceType: 'module',
    },
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
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      sourceType: 'module',
    },
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
    class Base {
      constructor() {
      }
    }
    `,
    options: [{
      contexts: ['MethodDefinition'],
      exemptEmptyConstructors: true,
    }],
  },
  {
    code: `
    /**
     * This is a text.
     */
    export function a(); // Reports an error
    `,
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
    parser: require.resolve('@typescript-eslint/parser'),
  },
  ],
};
