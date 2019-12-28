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
      settings: {
        jsdoc: {
          minLines: 1,
        },
      },
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
      code:
        `
          function quux (foo) {

          }`,
      errors: [
        {
          endLine: undefined,
          line: 2,
          message: 'Missing JSDoc comment.',
        },
      ],
    },
    {
      code: '',
      errors: [
        {
          message: '`settings.jsdoc.exemptEmptyFunctions` has been removed, use options in the rule `require-jsdoc` instead.',
        },
      ],
      settings: {
        jsdoc: {
          exemptEmptyFunctions: true,
        },
      },
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
      code: 'function myFunction() {}',
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionDeclaration',
      }],
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
      parserOptions: {
        ecmaVersion: 6,
      },
    },
    {
      code:
        `class A {
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
      parserOptions: {
        ecmaVersion: 6,
      },
    },
    {
      code:
        `class A extends B {
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
      parserOptions: {
        ecmaVersion: 6,
      },
    },
    {
      code:
        `export class A extends B {
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
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code:
        `export default class A extends B {
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
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: 'var myFunction = () => {}',
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'ArrowFunctionExpression',
      }],
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
      code: 'var myFunction = () => () => {}',
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'ArrowFunctionExpression',
      }],
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
      code: 'var foo = function() {}',
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        require: {
          FunctionExpression: true,
        },
      }],
    },
    {
      code: 'const foo = {bar() {}}',
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
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
      code: 'var foo = {bar: function() {}}',
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression',
      }],
      options: [{
        require: {
          FunctionExpression: true,
        },
      }],
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
  ],
};
