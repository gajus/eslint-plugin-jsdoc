export default {
  invalid: [
    {
      code: `
          /**
           *
           */
          function quux (foo) {

            return foo;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {
            someLabel: {
              return foo;
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          const foo = () => ({
            bar: 'baz'
          })
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          const foo = bar=>({ bar })
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          const foo = bar => bar.baz()
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {

            return foo;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @return declaration.',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            returns: 'return',
          },
        },
      },
    },
    {
      code: `
          /**
           *
           */
          async function quux() {
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        forceRequireReturn: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           *
           */
          const quux = async function () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        forceRequireReturn: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           *
           */
          const quux = async () => {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        forceRequireReturn: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
           /**
            *
            */
           async function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        forceRequireReturn: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           *
           */
          function quux () {
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        forceRequireReturn: true,
      }],
    },
    {
      code: `
          /**
           *
           */
          function quux () {
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        contexts: ['any'],
        forceRequireReturn: true,
      }],
    },
    {
      code: `
          /**
           * @function
           */
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        contexts: ['any'],
        forceRequireReturn: true,
      }],
    },
    {
      code: `
          /**
           * @callback
           */
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        contexts: ['any'],
        forceRequireReturn: true,
      }],
    },
    {
      code: `
      const language = {
        /**
         * @param {string} name
         */
        get name() {
          return this._name;
        }
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          async function quux () {
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        forceReturnsWithAsync: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           * @function
           * @async
           */
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        contexts: ['any'],
        forceReturnsWithAsync: true,
      }],
    },
    {
      code: `
          /**
           * @callback
           * @async
           */
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        contexts: ['any'],
        forceReturnsWithAsync: true,
      }],
    },
    {
      code: `
          /**
           * @returns {undefined}
           * @returns {void}
           */
          function quux (foo) {

            return foo;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Found more than one @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           * @returns
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Unexpected tag `@returns`',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            returns: false,
          },
        },
      },
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {
            return 'bar';
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
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
       * @param {array} a
       */
      async function foo(a) {
        return;
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        forceReturnsWithAsync: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
      /**
       * @param {array} a
       */
      async function foo(a) {
        return Promise.all(a);
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        forceReturnsWithAsync: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
      class foo {
        /** gets bar */
        get bar() {
          return 0;
        }
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        checkGetters: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
        class TestClass {
          /**
           *
           */
          constructor() {
            return new Map();
          }
        }
        `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [
        {
          checkConstructors: true,
        },
      ],
    },
    {
      code: `
      class TestClass {
        /**
         *
         */
        get Test() {
          return 0;
        }
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [
        {
          checkGetters: true,
        },
      ],
    },
    {
      code: `
      class quux {
        /**
         *
         */
        quux () {
        }
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        contexts: ['any'],
        forceRequireReturn: true,
      }],
    },
    {
      code: `
      /**
       * @param {array} a
       */
      async function foo(a) {
        return Promise.all(a);
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {

            return new Promise(function (resolve, reject) {
              resolve(foo);
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {

            return new Promise(function (resolve, reject) {
              setTimeout(() => {
                resolve(true);
              });
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {

            return new Promise(function (resolve, reject) {
              foo(resolve);
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              while(true) {
                resolve(true);
              }
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              do {
                resolve(true);
              }
              while(true)
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              if (true) {
                resolve(true);
              }
              return;
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              if (resolve(true)) {
                return;
              }
              return;
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              if (true) {
                resolve(true);
              }
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              true ? resolve(true) : null;
              return;
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            var a = {};
            return new Promise((resolve, reject) => {
              with (a) {
                resolve(true);
              }
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            var a = {};
            return new Promise((resolve, reject) => {
              try {
                resolve(true);
              } catch (err) {}
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            var a = {};
            return new Promise((resolve, reject) => {
              try {
              } catch (err) {
                resolve(true);
              }
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            var a = {};
            return new Promise((resolve, reject) => {
              try {
              } catch (err) {
              } finally {
                resolve(true);
              }
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            var a = {};
            return new Promise((resolve, reject) => {
              switch (a) {
              case 'abc':
                resolve(true);
              }
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              if (true) {
                resolve();
              } else {
                resolve(true);
              }
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              for (let i = 0; i < 5 ; i++) {
                resolve(true);
              }
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              for (const i of obj) {
                resolve(true);
              }
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              for (const i in obj) {
                resolve(true);
              }
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              if (true) {
                return;
              } else {
                resolve(true);
              }
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              function a () {
                resolve(true);
              }
              a();
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              return () => {
                identifierForCoverage;
                resolve(true);
              };
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              a || resolve(true);
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              (r = resolve(true));
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              a + (resolve(true));
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              a, resolve(true);
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              +resolve();
              [...resolve()];
              [resolve(true)];
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise(function * (resolve, reject) {
              yield resolve(true)
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise(async function (resolve, reject) {
              await resolve(true)
            });
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      ignoreReadme: true,
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise();
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [
        {
          forceReturnsWithAsync: true,
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          async function quux () {
            return new Promise();
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [
        {
          forceReturnsWithAsync: true,
        },
      ],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           *
           */
          async function quux () {
            return new Promise((resolve, reject) => {});
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [
        {
          forceReturnsWithAsync: true,
        },
      ],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
  ],
  valid: [
    {
      code: `
          /**
           * @returns Foo.
           */
          function quux () {

            return foo;
          }
      `,
    },
    {
      code: `
          /**
           * @returns Foo.
           */
          function quux () {

            return foo;
          }
      `,
      options: [
        {
          contexts: ['any'],
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
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux (bar) {
            bar.filter(baz => {
              return baz.corge();
            })
          }
      `,
    },
    {
      code: `
          /**
           * @returns Array
           */
          function quux (bar) {
            return bar.filter(baz => {
              return baz.corge();
            })
          }
      `,
    },
    {
      code: `
          /**
           * @returns Array
           */
          const quux = (bar) => bar.filter(({ corge }) => corge())
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
           * @override
           */
          function quux (foo) {
          }
      `,
    },
    {
      code: `
          /**
           * @constructor
           */
          function quux (foo) {
            return true;
          }
      `,
    },
    {
      code: `
          /**
           * @implements
           */
          function quux (foo) {
            return true;
          }
      `,
    },
    {
      code: `
          /**
           * @override
           */
          function quux (foo) {

            return foo;
          }
      `,
    },
    {
      code: `
          /**
           * @class
           */
          function quux (foo) {
            return true;
          }
      `,
    },
    {
      code: `
          /**
           * @constructor
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @returns {object}
           */
          function quux () {

            return {a: foo};
          }
      `,
    },
    {
      code: `
          /**
           * @returns {object}
           */
          const quux = () => ({a: foo});
      `,
    },
    {
      code: `
          /**
           * @returns {object}
           */
          const quux = () => {
            return {a: foo}
          };
      `,
    },
    {
      code: `
          /**
           * @returns {void}
           */
          function quux () {
          }
      `,
    },
    {
      code: `
          /**
           * @returns {void}
           */
          const quux = () => {

          }
      `,
    },
    {
      code: `
          /**
           * @returns {undefined}
           */
          function quux () {
          }
      `,
    },
    {
      code: `
          /**
           * @returns {undefined}
           */
          const quux = () => {

          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
          }
      `,
    },
    {
      code: `
          /**
           *
           */
          const quux = () => {

          }
      `,
    },
    {
      code: `
      class Foo {
        /**
         *
         */
        constructor () {
        }
      }
      `,
      options: [{
        forceRequireReturn: true,
      }],
    },
    {
      code: `
      const language = {
        /**
         * @param {string} name
         */
        set name(name) {
          this._name = name;
        }
      }
      `,
    },
    {
      code: `
          /**
           * @returns {void}
           */
          function quux () {
          }
      `,
      options: [{
        forceRequireReturn: true,
      }],
    },
    {
      code: `
          /**
           * @returns {void}
           */
          function quux () {
            return undefined;
          }
      `,
    },
    {
      code: `
          /**
           * @returns {void}
           */
          function quux () {
            return undefined;
          }
      `,
      options: [{
        forceRequireReturn: true,
      }],
    },
    {
      code: `
          /**
           * @returns {void}
           */
          function quux () {
            return;
          }
      `,
    },
    {
      code: `
          /**
           * @returns {void}
           */
          function quux () {
          }
      `,
      options: [{
        forceRequireReturn: true,
      }],
    },
    {
      code: `
          /**
           * @returns {void}
           */
          function quux () {
            return;
          }
      `,
      options: [{
        forceRequireReturn: true,
      }],
    },
    {
      code: `
          /** @type {RequestHandler} */
          function quux (req, res , next) {
            return;
          }
      `,
    },
    {
      code: `
          /**
           * @returns {Promise}
           */
          async function quux () {
          }
      `,
      options: [{
        forceRequireReturn: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           * @returns {Promise}
           */
          async function quux () {
          }
      `,
      options: [{
        forceReturnsWithAsync: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           *
           */
          async function quux () {}
      `,
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           *
           */
          const quux = async function () {}
      `,
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           *
           */
          const quux = async () => {}
      `,
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
      /** foo class */
      class foo {
        /** foo constructor */
        constructor () {
          // =>
          this.bar = true;
        }
      }

      export default foo;
      `,
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
      `,
      options: [{
        forceReturnsWithAsync: true,
      }],
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
       * @param {array} a
       */
      async function foo(a) {
        return;
      }
      `,
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           *
           */
      `,
      options: [
        {
          contexts: ['any'],
        },
      ],
    },
    {
      code: `
          /**
           * @async
           */
      `,
      options: [
        {
          contexts: ['any'],
        },
      ],
    },
    {
      code: `
          /**
           * @function
           */
      `,
      options: [{
        forceRequireReturn: true,
      }],
    },
    {
      code: `
          /**
           * @callback
           */
      `,
      options: [{
        forceRequireReturn: true,
      }],
    },
    {
      code: `
          /**
           * @function
           * @async
           */
      `,
      options: [{
        forceReturnsWithAsync: true,
      }],
    },
    {
      code: `
          /**
           * @callback
           * @async
           */
      `,
      options: [{
        forceReturnsWithAsync: true,
      }],
    },
    {
      code: `
          /**
           * @function
           */
      `,
      options: [{
        contexts: ['any'],
        forceReturnsWithAsync: true,
      }],
    },
    {
      code: `
          /**
           * @callback
           */
      `,
      options: [{
        contexts: ['any'],
        forceReturnsWithAsync: true,
      }],
    },
    {
      code: `
          class foo {
            get bar() {
              return 0;
            }
          }
      `,
      options: [{
        checkGetters: false,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          class foo {
            /** @returns zero */
            get bar() {
              return 0;
            }
          }
      `,
      options: [{
        checkGetters: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          class foo {
            /** @returns zero */
            get bar() {
              return 0;
            }
          }
      `,
      options: [{
        checkGetters: false,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
        class TestClass {
          /**
           *
           */
          constructor() { }
        }
        `,
    },
    {
      code: `
        class TestClass {
          /**
           * @returns A map.
           */
          constructor() {
            return new Map();
          }
        }
        `,
    },
    {
      code: `
        class TestClass {
          /**
           *
           */
          constructor() { }
        }
        `,
      options: [
        {
          checkConstructors: false,
        },
      ],
    },
    {
      code: `
      class TestClass {
        /**
         *
         */
        get Test() { }
      }
      `,
    },
    {
      code: `
      class TestClass {
        /**
         * @returns A number.
         */
        get Test() {
          return 0;
        }
      }
      `,
    },
    {
      code: `
      class TestClass {
        /**
         *
         */
        get Test() {
          return 0;
        }
      }
      `,
      options: [
        {
          checkGetters: false,
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {

            return new Promise(function (resolve, reject) {
              resolve();
            });
          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {

            return new Promise(function (resolve, reject) {
              setTimeout(() => {
                resolve();
              });
            });
          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {

            return new Promise(function (resolve, reject) {
              foo();
            });
          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {

            return new Promise(function (resolve, reject) {
              abc((resolve) => {
                resolve(true);
              });
            });
          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {

            return new Promise(function (resolve, reject) {
              abc(function (resolve) {
                resolve(true);
              });
            });
          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              if (true) {
                resolve();
              }
            });
            return;
          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise();
          }
      `,
    },
    {
      code: `
        /**
         * Description.
         */
        async function foo() {
          return new Promise(resolve => resolve());
        }
      `,
      parserOptions: {
        ecmaVersion: 8,
      },
    },
  ],
};
