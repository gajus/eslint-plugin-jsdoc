/**
 * @see https://github.com/eslint/eslint/blob/master/tests/lib/rules/require-jsdoc.js
 */

export default {
  invalid: [
    {
      code:
        `
          function quux (foo) {

          }`,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc comment.'
        }
      ]
    },
    {
      code: 'function myFunction() {}',
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionDeclaration'
      }]
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
        type: 'FunctionExpression'
      }],
      options: [{
        require: {
          ClassDeclaration: true,
          MethodDefinition: true
        }
      }],
      parserOptions: {
        ecmaVersion: 6
      }
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
        type: 'ClassDeclaration'
      }],
      options: [{
        require: {
          ClassDeclaration: true,
          MethodDefinition: true
        }
      }],
      parserOptions: {
        ecmaVersion: 6
      }
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
        type: 'ClassDeclaration'
      }],
      options: [{
        require: {
          ClassDeclaration: true,
          MethodDefinition: true
        }
      }],
      parserOptions: {
        ecmaVersion: 6
      }
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
        type: 'ClassDeclaration'
      }],
      options: [{
        require: {
          ClassDeclaration: true,
          MethodDefinition: true
        }
      }],
      parserOptions: {
        sourceType: 'module'
      }
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
        type: 'ClassDeclaration'
      }],
      options: [{
        require: {
          ClassDeclaration: true,
          MethodDefinition: true
        }
      }],
      parserOptions: {
        sourceType: 'module'
      }
    },
    {
      code: 'var myFunction = () => {}',
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'ArrowFunctionExpression'
      }],
      options: [{
        require: {
          ArrowFunctionExpression: true
        }
      }],
      parserOptions: {
        ecmaVersion: 6
      }
    },
    {
      code: 'var myFunction = () => () => {}',
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'ArrowFunctionExpression'
      }],
      options: [{
        require: {
          ArrowFunctionExpression: true
        }
      }],
      parserOptions: {
        ecmaVersion: 6
      }
    },
    {
      code: 'var foo = function() {}',
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression'
      }],
      options: [{
        require: {
          FunctionExpression: true
        }
      }]
    },
    {
      code: 'const foo = {bar() {}}',
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression'
      }],
      options: [{
        require: {
          FunctionExpression: true
        }
      }],
      parserOptions: {
        ecmaVersion: 6
      }
    },
    {
      code: 'var foo = {bar: function() {}}',
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression'
      }],
      options: [{
        require: {
          FunctionExpression: true
        }
      }]
    },
    {
      code: `
        function foo (abc) {}
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionDeclaration'
      }],
      settings: {
        jsdoc: {
          exemptEmptyFunctions: false
        }
      }
    },
    {
      code: `
        function foo () {
          return true;
        }
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionDeclaration'
      }],
      settings: {
        jsdoc: {
          exemptEmptyFunctions: false
        }
      }
    },
    {
      code: `
          module.exports = function quux () {

          }
      `,
      env: {
        node: true
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression'
      }],
      options: [{
        require: {
          FunctionExpression: true
        }
      }],
      settings: {
        jsdoc: {
          publicFunctionsOnly: true
        }
      }
    },
    {
      code: `
          module.exports = {
            method: function() {

            }
          }
      `,
      env: {
        node: true
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression'
      }],
      options: [{
        require: {
          FunctionExpression: true
        }
      }],
      settings: {
        jsdoc: {
          publicFunctionsOnly: true
        }
      }
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
        node: true
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression'
      }],
      options: [{
        require: {
          FunctionExpression: true
        }
      }],
      settings: {
        jsdoc: {
          publicFunctionsOnly: true
        }
      }
    },
    {
      code: `
          const test = module.exports = function () {

          }
      `,
      env: {
        node: true
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression'
      }],
      options: [{
        require: {
          FunctionExpression: true
        }
      }],
      settings: {
        jsdoc: {
          publicFunctionsOnly: true
        }
      }
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
        node: true
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression'
      }],
      options: [{
        require: {
          FunctionExpression: true
        }
      }],
      settings: {
        jsdoc: {
          publicFunctionsOnly: true
        }
      }
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
        node: true
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression'
      }],
      options: [{
        require: {
          FunctionExpression: true
        }
      }],
      settings: {
        jsdoc: {
          publicFunctionsOnly: true
        }
      }
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
        node: true
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'ArrowFunctionExpression'
      }],
      options: [{
        require: {
          ArrowFunctionExpression: true
        }
      }],
      settings: {
        jsdoc: {
          publicFunctionsOnly: true
        }
      }
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
        node: true
      },
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression'
      }],
      options: [{
        require: {
          MethodDefinition: true
        }
      }],
      settings: {
        jsdoc: {
          publicFunctionsOnly: true
        }
      }
    },
    {
      code: `
          export default function quux () {

          }
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionDeclaration'
      }],
      options: [{
        require: {
          FunctionExpression: true
        }
      }],
      parserOptions: {
        sourceType: 'module'
      },
      settings: {
        jsdoc: {
          publicFunctionsOnly: true
        }
      }
    },
    {
      code: `
          function quux () {

          }
          export default quux;
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionDeclaration'
      }],
      options: [{
        require: {
          FunctionExpression: true
        }
      }],
      parserOptions: {
        sourceType: 'module'
      },
      settings: {
        jsdoc: {
          publicFunctionsOnly: true
        }
      }
    },
    {
      code: `
          export function test() {

          }
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionDeclaration'
      }],
      options: [{
        require: {
          FunctionExpression: true
        }
      }],
      parserOptions: {
        sourceType: 'module'
      },
      settings: {
        jsdoc: {
          publicFunctionsOnly: true
        }
      }
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
          message: 'Missing JSDoc comment.'
        }
      ],
      options: [{
        require: {
          FunctionExpression: true
        }
      }],
      parserOptions: {
        sourceType: 'module'
      },
      settings: {
        jsdoc: {
          publicFunctionsOnly: true
        }
      }
    },
    {
      code: `
          var test = function () {

          }
          export { test as test2 }
      `,
      errors: [{
        message: 'Missing JSDoc comment.',
        type: 'FunctionExpression'
      }],
      options: [{
        require: {
          FunctionExpression: true
        }
      }],
      parserOptions: {
        sourceType: 'module'
      },
      settings: {
        jsdoc: {
          publicFunctionsOnly: true
        }
      }
    }
  ],
  valid: [{
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
    `
  },
  {
    code: 'function myFunction() {}',
    options: [{
      require: {
        ClassDeclaration: true,
        FunctionDeclaration: false,
        MethodDefinition: true
      }
    }]
  },
  {
    code: 'var myFunction = function() {}',
    options: [{
      require: {
        ClassDeclaration: true,
        FunctionDeclaration: false,
        MethodDefinition: true
      }
    }]
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
        MethodDefinition: true
      }
    }],
    parserOptions: {
      ecmaVersion: 6
    }
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
        MethodDefinition: true
      }
    }],
    parserOptions: {
      ecmaVersion: 6
    }
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
        MethodDefinition: true
      }
    }],
    parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module'
    }
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
        MethodDefinition: true
      }
    }],
    parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module'
    }
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
        MethodDefinition: false
      }
    }],
    parserOptions: {
      ecmaVersion: 6
    }
  },
  {
    code:
      `/**
        Function doing something
       */
       var myFunction = () => {}`,
    options: [{
      require: {
        ArrowFunctionExpression: true
      }
    }],
    parserOptions: {
      ecmaVersion: 6
    }
  },
  {
    code:
      `/**
        Function doing something
       */
       var myFunction = () => () => {}`,
    options: [{
      require: {
        ArrowFunctionExpression: true
      }
    }],
    parserOptions: {
      ecmaVersion: 6
    }
  },
  {
    code: 'setTimeout(() => {}, 10);',
    options: [{
      require: {
        ArrowFunctionExpression: true
      }
    }],
    parserOptions: {
      ecmaVersion: 6
    }
  },
  {
    code:
      `/**
       JSDoc Block
       */
       var foo = function() {}`,
    options: [{
      require: {
        FunctionExpression: true
      }
    }]
  },
  {
    code:
      `const foo = {/**
       JSDoc Block
       */
       bar() {}}`,
    options: [{
      require: {
        FunctionExpression: true
      }
    }],
    parserOptions: {
      ecmaVersion: 6
    }
  },
  {
    code:
      `var foo = {/**
       JSDoc Block
       */
       bar: function() {}}`,
    options: [{
      require: {
        FunctionExpression: true
      }
    }]
  },
  {
    code: ' var foo = { [function() {}]: 1 };',
    options: [{
      require: {
        FunctionExpression: true
      }
    }],
    parserOptions: {
      ecmaVersion: 6
    }
  },
  {
    code: `
      function foo () {}
    `,
    settings: {
      jsdoc: {
        exemptEmptyFunctions: true
      }
    }
  },
  {
    code: `
      function foo () {
        return;
      }
    `,
    settings: {
      jsdoc: {
        exemptEmptyFunctions: true
      }
    }
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
      node: true
    },
    options: [{
      require: {
        FunctionExpression: true
      }
    }],
    settings: {
      jsdoc: {
        publicFunctionsOnly: true
      }
    }
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
      node: true
    },
    options: [{
      require: {
        FunctionExpression: true
      }
    }],
    settings: {
      jsdoc: {
        publicFunctionsOnly: true
      }
    }
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
      node: true
    },
    options: [{
      require: {
        FunctionExpression: true
      }
    }],
    settings: {
      jsdoc: {
        publicFunctionsOnly: {
          browserEnv: false,
          modules: true
        }
      }
    }
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
      node: true
    },
    options: [{
      require: {
        FunctionExpression: true
      }
    }],
    settings: {
      jsdoc: {
        publicFunctionsOnly: {
          browserEnv: false,
          exports: true
        }
      }
    }
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
      node: true
    },
    options: [{
      require: {
        ArrowFunctionExpression: true
      }
    }],
    settings: {
      jsdoc: {
        publicFunctionsOnly: true
      }
    }
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
      node: true
    },
    options: [{
      require: {
        FunctionExpression: true
      }
    }],
    settings: {
      jsdoc: {
        publicFunctionsOnly: true
      }
    }
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
      node: true
    },
    options: [{
      require: {
        FunctionExpression: true
      }
    }],
    settings: {
      jsdoc: {
        publicFunctionsOnly: true
      }
    }
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
      node: true
    },
    options: [{
      require: {
        FunctionExpression: true
      }
    }],
    settings: {
      jsdoc: {
        publicFunctionsOnly: true
      }
    }
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
      node: true
    },
    options: [{
      require: {
        FunctionExpression: true
      }
    }],
    settings: {
      jsdoc: {
        publicFunctionsOnly: true
      }
    }
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
      node: true
    },
    options: [{
      require: {
        MethodDefinition: true
      }
    }],
    settings: {
      jsdoc: {
        publicFunctionsOnly: true
      }
    }
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
      require: {
        FunctionExpression: true
      }
    }],
    parserOptions: {
      sourceType: 'module'
    },
    settings: {
      jsdoc: {
        publicFunctionsOnly: true
      }
    }
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
      require: {
        FunctionExpression: true
      }
    }],
    parserOptions: {
      sourceType: 'module'
    },
    settings: {
      jsdoc: {
        publicFunctionsOnly: true
      }
    }
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
      require: {
        FunctionExpression: true
      }
    }],
    parserOptions: {
      sourceType: 'module'
    },
    settings: {
      jsdoc: {
        publicFunctionsOnly: true
      }
    }
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
      require: {
        FunctionExpression: true
      }
    }],
    parserOptions: {
      sourceType: 'module'
    },
    settings: {
      jsdoc: {
        publicFunctionsOnly: true
      }
    }
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
      require: {
        FunctionExpression: true
      }
    }],
    parserOptions: {
      sourceType: 'module'
    },
    settings: {
      jsdoc: {
        publicFunctionsOnly: true
      }
    }
  }]
};
