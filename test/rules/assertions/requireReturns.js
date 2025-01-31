import {parser as typescriptEslintParser} from 'typescript-eslint';

export default /** @type {import('../index.js').TestCases} */ ({
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

          return foo;
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
          enableFixer: true,
        },
      ],
      output: `
        /**
         *
         * @returns
         */
        function quux (foo) {

          return foo;
        }
      `,
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
      options: [
        {
          forceRequireReturn: true,
        },
      ],
      languageOptions: {
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
      options: [
        {
          forceRequireReturn: true,
        },
      ],
      languageOptions: {
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
      options: [
        {
          forceRequireReturn: true,
        },
      ],
      languageOptions: {
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
      options: [
        {
          forceRequireReturn: true,
        },
      ],
      languageOptions: {
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
      options: [
        {
          forceRequireReturn: true,
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
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
          forceRequireReturn: true,
        },
      ],
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
      options: [
        {
          contexts: [
            'any',
          ],
          forceRequireReturn: true,
        },
      ],
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
      options: [
        {
          contexts: [
            'any',
          ],
          forceRequireReturn: true,
        },
      ],
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
      options: [
        {
          forceReturnsWithAsync: true,
        },
      ],
      languageOptions: {
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
      options: [
        {
          contexts: [
            'any',
          ],
          forceReturnsWithAsync: true,
        },
      ],
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
      options: [
        {
          contexts: [
            'any',
          ],
          forceReturnsWithAsync: true,
        },
      ],
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
          line: 3,
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
          exemptedBy: [
            'notPresent',
          ],
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
      options: [
        {
          forceReturnsWithAsync: true,
        },
      ],
      languageOptions: {
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
      options: [
        {
          forceReturnsWithAsync: true,
        },
      ],
      languageOptions: {
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
      options: [
        {
          checkGetters: true,
        },
      ],
      languageOptions: {
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
      options: [
        {
          contexts: [
            'any',
          ],
          forceRequireReturn: true,
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
      languageOptions: {
        sourceType: 'script'
      }
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
              [...+resolve(true)];
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
      languageOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              someLabel: {
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
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              var obj = {
                [someKey]: 'val',
                anotherKey: resolve(true)
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
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              var obj = {
                [resolve(true)]: 'val',
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
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              \`abc$\{resolve(true)}\`;
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
              tagTemp\`abc$\{resolve(true)}\`;
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
              a.b[resolve(true)].c;
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
              abc?.[resolve(true)].d?.e(resolve(true));
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
      languageOptions: {
        ecmaVersion: 2_020,
      },
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              const [a = resolve(true)] = arr;
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
              const {a = resolve(true)} = obj;
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
              import(resolve(true));
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
      languageOptions: {
        ecmaVersion: 2_020,
      },
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              class A {
                method1 () {
                  resolve();
                }
                @dec(function () {
                  resolve()
                })
                method2 () {
                  resolve(true);
                }
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
      ignoreReadme: true,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              class A {
                method1 () {
                  resolve();
                }
                @dec(function () {
                  resolve(true)
                })
                method2 () {}
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
      ignoreReadme: true,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              const a = class {
                [b] () {
                  resolve();
                }
                method1 () {
                  resolve(true);
                }
                method2 () {}
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
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return new Promise((resolve, reject) => {
              const a = class {
                [b] () {
                  resolve(true);
                }
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
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          export function quux () {
            return new Promise((resolve, reject) => {
              resolve(true);
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
      languageOptions: {
        sourceType: 'module',
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
      languageOptions: {
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
      languageOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
        export class A {
          /**
           * Description.
           */
          public f(): string {
            return "";
          }
        }

        export interface B {
          /**
           * Description.
           */
          f(): string;

          /**
           * Description.
           */
          g: () => string;

          /**
           * Description.
           */
          h(): void;

          /**
           * Description.
           */
          i: () => void;
        }

        /**
         * Description.
         */
        export function f(): string {
          return "";
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @returns declaration.',
        },
        {
          line: 12,
          message: 'Missing JSDoc @returns declaration.',
        },
        {
          line: 17,
          message: 'Missing JSDoc @returns declaration.',
        },
        {
          line: 33,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [
        {
          contexts: [
            ':not(BlockStatement) > FunctionDeclaration',
            'MethodDefinition',
            'TSMethodSignature',
            'TSPropertySignature > TSTypeAnnotation > TSFunctionType',
          ],
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
        /**
         * @param ms time in millis
         */
        export const sleep = (ms: number) =>
          new Promise<string>((res) => setTimeout(res, ms));
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
        /**
         * @param ms time in millis
         */
        export const sleep = (ms: number) => {
          return new Promise<string>((res) => setTimeout(res, ms));
        };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
      /**
       * Reads a test fixture.
       */
      export function readFixture(path: string): Promise<Buffer>;
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
      /**
       * Reads a test fixture.
       */
      export function readFixture(path: string): void;
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [
        {
          forceRequireReturn: true,
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
      /**
       * Reads a test fixture.
       */
      export function readFixture(path: string);
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [
        {
          forceRequireReturn: true,
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
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
      languageOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
      /**
       * Description.
       */
      export default async function demo() {
        return true;
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      languageOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
      },
    },
    {
      code: `
        /**
         *
         */
        function quux () {}

        class Test {
          /**
           *
           */
          abstract Test(): string;
        }
      `,
      errors: [
        {
          line: 8,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'FunctionDeclaration',
            {
              context: 'TSEmptyBodyFunctionExpression',
              forceRequireReturn: true,
            },
          ],
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
        /**
         *
         */
        module.exports = function quux (foo) {

          return foo;
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
          publicOnly: true,
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        const a = function quux (foo) {

          return foo;
        };

        export default a;
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [
        {
          publicOnly: true,
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
        /**
         *
         */
        export default function quux (foo) {

          return foo;
        };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [
        {
          publicOnly: {
            ancestorsOnly: true,
            esm: true,
          },
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
        /**
         *
         */
        exports.quux = function quux (foo) {

          return foo;
        };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [
        {
          publicOnly: {
            cjs: true,
          },
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
        /**
         *
         */
        window.quux = function quux (foo) {

          return foo;
        };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [
        {
          publicOnly: {
            window: true,
          },
        },
      ],
      languageOptions: {
        sourceType: 'module',
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
          contexts: [
            'any',
          ],
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
      options: [
        {
          forceRequireReturn: true,
        },
      ],
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
      options: [
        {
          forceRequireReturn: true,
        },
      ],
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
      options: [
        {
          forceRequireReturn: true,
        },
      ],
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
            return;
          }
      `,
      options: [
        {
          forceRequireReturn: true,
        },
      ],
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
      options: [
        {
          forceRequireReturn: true,
        },
      ],
      languageOptions: {
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
      options: [
        {
          forceReturnsWithAsync: true,
        },
      ],
      languageOptions: {
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
      languageOptions: {
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
      languageOptions: {
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
      languageOptions: {
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
      languageOptions: {
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
      options: [
        {
          forceReturnsWithAsync: true,
        },
      ],
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
       * @param {array} a
       */
      async function foo(a) {
        return;
      }
      `,
      languageOptions: {
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
          contexts: [
            'any',
          ],
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
          contexts: [
            'any',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * @function
           */
      `,
      options: [
        {
          forceRequireReturn: true,
        },
      ],
    },
    {
      code: `
          /**
           * @callback
           */
      `,
      options: [
        {
          forceRequireReturn: true,
        },
      ],
    },
    {
      code: `
          /**
           * @function
           * @async
           */
      `,
      options: [
        {
          forceReturnsWithAsync: true,
        },
      ],
    },
    {
      code: `
          /**
           * @callback
           * @async
           */
      `,
      options: [
        {
          forceReturnsWithAsync: true,
        },
      ],
    },
    {
      code: `
          /**
           * @function
           */
      `,
      options: [
        {
          contexts: [
            'any',
          ],
          forceReturnsWithAsync: true,
        },
      ],
    },
    {
      code: `
          /**
           * @callback
           */
      `,
      options: [
        {
          contexts: [
            'any',
          ],
          forceReturnsWithAsync: true,
        },
      ],
    },
    {
      code: `
          class foo {
            get bar() {
              return 0;
            }
          }
      `,
      options: [
        {
          checkGetters: false,
        },
      ],
      languageOptions: {
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
      options: [
        {
          checkGetters: true,
        },
      ],
      languageOptions: {
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
      options: [
        {
          checkGetters: false,
        },
      ],
      languageOptions: {
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
      languageOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
      /** Enumerates possible genders for a product's target demographic. */
      enum Gender {
        Unisex,
        Mens,
        Women
      }

      export default Gender;
      `,
      ignoreReadme: true,
      options: [
        {
          contexts: [
            ':not(:matches(VariableDeclarator))',
          ],
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
        /**
         * @param ms time in millis
         */
        export const sleep = (ms: number) =>
          new Promise<void>((res) => setTimeout(res, ms));
      `,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
        /**
         * @param ms time in millis
         */
        export const sleep = (ms: number) => {
          return new Promise<void>((res) => setTimeout(res, ms));
        };
      `,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
      /**
       * Reads a test fixture.
       *
       * @returns The file contents as buffer.
       */
      export function readFixture(path: string): Promise<Buffer>;
      `,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
      /**
       * Reads a test fixture.
       *
       * @returns {void}.
       */
      export function readFixture(path: string): void;
      `,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
      /**
       * Reads a test fixture.
       */
      export function readFixture(path: string): void;
      `,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
      /**
       * Reads a test fixture.
       */
      export function readFixture(path: string);
      `,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
        /**
         *
         */
        function quux () {}

        class Test {
          /**
           * @returns {string} The test value
           */
          abstract Test(): string;
        }
      `,
      options: [
        {
          contexts: [
            'FunctionDeclaration',
            {
              context: 'TSEmptyBodyFunctionExpression',
              forceRequireReturn: true,
            },
          ],
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
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
      options: [
        {
          publicOnly: true,
        },
      ],
    },
  ],
});
