import {parser as typescriptEslintParser} from 'typescript-eslint';
import * as babelEslintParser from '@babel/eslint-parser';
import globals from 'globals';

export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
       /**
        * @param {HerType} baz - Foo.
        */
       function quux(foo, bar, baz) {

       }
      `,
      errors: [
        {
          line: 1,
          message: 'Invalid `settings.jsdoc.preferredTypes`. Values must be falsy, a string, or an object.',
        },
        {
          line: 3,
          message: 'The type \'HerType\' is undefined.',
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            HerType: 1_000,
          },
        },
      },
    },
    {
      code: `
       /**
        * @param {HerType} baz - Foo.
        */
       function quux(foo, bar, baz) {

       }
      `,
      errors: [
        {
          line: 3,
          message: 'The type \'HerType\' is undefined.',
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            HerType: false,
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {strnig} foo - Bar.
           */
          function quux(foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'The type \'strnig\' is undefined.',
        },
      ],
    },
    {
      code: `
        /**
         * @param {MyType} foo - Bar.
         * @param {HisType} bar - Foo.
         */
        function quux(foo, bar) {

        }
      `,
      errors: [
        {
          line: 4,
          message: 'The type \'HisType\' is undefined.',
        },
      ],
      options: [
        {
          definedTypes: [
            'MyType',
          ],
        },
      ],
    },
    {
      code: `
       /**
        * @param {MyType} foo - Bar.
        * @param {HisType} bar - Foo.
        * @param {HerType} baz - Foo.
        */
       function quux(foo, bar, baz) {

       }
      `,
      errors: [
        {
          line: 4,
          message: 'The type \'HisType\' is undefined.',
        },
      ],
      options: [
        {
          definedTypes: [
            'MyType',
          ],
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            hertype: {
              replacement: 'HerType',
            },
          },
        },
      },
    },
    {
      code: `
        /**
         * @param {MyType} foo - Bar.
         * @param {HisType} bar - Foo.
         * @param {HerType} baz - Foo.
         */
       function quux(foo, bar, baz) {

       }
      `,
      errors: [
        {
          line: 5,
          message: 'The type \'HerType\' is undefined.',
        },
      ],
      options: [
        {
          definedTypes: [
            'MyType',
          ],
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            hertype: {
              replacement: false,
            },
            histype: 'HisType',
          },
        },
      },
    },
    {
      code: `
      /**
       * @template TEMPLATE_TYPE
       * @param {WRONG_TEMPLATE_TYPE} bar
       */
      function foo (bar) {
      };
      `,
      errors: [
        {
          line: 4,
          message: 'The type \'WRONG_TEMPLATE_TYPE\' is undefined.',
        },
      ],
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
    },
    {
      code: `
      class Foo {
        /**
         * @return {TEMPLATE_TYPE}
         */
        bar () {
        }
      }
      `,
      errors: [
        {
          line: 4,
          message: 'The type \'TEMPLATE_TYPE\' is undefined.',
        },
      ],
    },
    {
      code: `
      class Foo {
        /**
         * @return {TEMPLATE_TYPE}
         */
        invalidTemplateReference () {
        }
      }

      /**
       * @template TEMPLATE_TYPE
       */
      class Bar {
        /**
         * @return {TEMPLATE_TYPE}
         */
        validTemplateReference () {
        }
      }
      `,
      errors: [
        {
          line: 4,
          message: 'The type \'TEMPLATE_TYPE\' is undefined.',
        },
      ],
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
    {
      code: `
          /**
           * @type {strnig}
           */
          var quux = {

          };
      `,
      errors: [
        {
          line: 3,
          message: 'The type \'strnig\' is undefined.',
        },
      ],
    },
    {
      code: `
      /**
       * @template TEMPLATE_TYPE_A, TEMPLATE_TYPE_B
       */
      class Foo {
        /**
         * @param {TEMPLATE_TYPE_A} baz
         * @return {TEMPLATE_TYPE_B}
         */
        bar (baz) {
        }
      }
      `,
      errors: [
        {
          line: 7,
          message: 'The type \'TEMPLATE_TYPE_A\' is undefined.',
        },
        {
          line: 8,
          message: 'The type \'TEMPLATE_TYPE_B\' is undefined.',
        },
      ],
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
    },
    {
      code: `
      /**
       * @param {...VAR_TYPE} varargs
       */
      function quux (varargs) {
      }
      `,
      errors: [
        {
          line: 3,
          message: 'The type \'VAR_TYPE\' is undefined.',
        },
      ],
    },
    {
      code: `
      /**
       * @this {Navigator}
       */
      function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'The type \'Navigator\' is undefined.',
        },
      ],
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
    },
    {
      code: `
      /**
       * @export {SomeType}
       */
      function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'The type \'SomeType\' is undefined.',
        },
      ],
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
    },
    {
      code: `
      /**
       * @aCustomTag {SomeType}
       */
      function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'The type \'SomeType\' is undefined.',
        },
      ],
      settings: {
        jsdoc: {
          structuredTags: {
            aCustomTag: {
              type: true,
            },
          },
        },
      },
    },
    {
      code: `
      /**
       * @aCustomTag {SomeType}
       */
      function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'The type \'SomeType\' is undefined.',
        },
      ],
      settings: {
        jsdoc: {
          structuredTags: {
            aCustomTag: {
              type: [
                'aType', 'anotherType',
              ],
            },
          },
        },
      },
    },
    {
      code: `
      /**
       * @namepathReferencing SomeType
       */
      /**
       * @type {SomeType}
       */
      `,
      errors: [
        {
          line: 3,
          message: 'The type \'SomeType\' is undefined.',
        },
        {
          line: 6,
          message: 'The type \'SomeType\' is undefined.',
        },
      ],
      settings: {
        jsdoc: {
          structuredTags: {
            namepathReferencing: {
              name: 'namepath-referencing',
            },
          },
        },
      },
    },
    {
      // An unknown tag without any namepath contents declared via settings,
      // defaults to not having an impact on the type.
      code: `
      /**
       * @namepathMentioning SomeType
       */
      /**
       * @type {SomeType}
       */
      `,
      errors: [
        {
          line: 6,
          message: 'The type \'SomeType\' is undefined.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
      /**
       * @template abc TEMPLATE_TYPE
       * @param {TEMPLATE_TYPE} bar
       */
      function foo (bar) {
      };
      `,
      errors: [
        {
          line: 4,
          message: 'The type \'TEMPLATE_TYPE\' is undefined.',
        },
      ],
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
    },
    {
      code: `
      /**
       * @suppress {visibility}
       */
      function foo () {
      }
      `,
      errors: [
        {
          line: 3,
          message: 'The type \'visibility\' is undefined.',
        },
      ],
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
    },
    {
      code: `
        /**
        * @typedef Todo
        * @property description
        * @property otherStuff
        */
        /**
         * @type {Omit<Todo, "description">}
         */
        const a = new Todo();
      `,
      errors: [
        {
          line: 8,
          message: 'The type \'Omit\' is undefined.',
        },
      ],
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
    },
    {
      code: `
      /**
       * Message with {@link NotKnown}
       */
      `,
      errors: [
        {
          line: 3,
          message: 'The type \'NotKnown\' is undefined.',
        },
      ],
    },
    {
      code: `
      /**
       * Message with
       * a link that is {@link NotKnown}
       */
      `,
      errors: [
        {
          line: 4,
          message: 'The type \'NotKnown\' is undefined.',
        },
      ],
    },
    {
      code: `
      /**
       * @abc
       * @someTag Message with
       *   a link that is {@link NotKnown}
       */
      `,
      errors: [
        {
          line: 5,
          message: 'The type \'NotKnown\' is undefined.',
        },
      ],
    },
    {
      code: `
      /**
       * This is a {@namepathOrURLReferencer SomeType}.
       */
      `,
      errors: [
        {
          line: 3,
          message: 'The type \'SomeType\' is undefined.',
        },
      ],
      settings: {
        jsdoc: {
          structuredTags: {
            namepathOrURLReferencer: {
              name: 'namepath-or-url-referencing',
            },
          },
        },
      },
    },
    {
      code: `
        /**
         * @import BadImportIgnoredByThisRule
         */
        /**
         * @import LinterDef, { Sth as Something, Another as Another2 } from "eslint"
         */
        /**
         * @import { Linter } from "eslint"
         */
        /**
         * @import LinterDefault from "eslint"
         */
        /**
         * @import {Linter as Lintee} from "eslint"
         */
        /**
         * @import * as Linters from "eslint"
         */

        /**
         * @type {BadImportIgnoredByThisRule}
         */
        /**
         * @type {Sth}
         */
        /**
         * @type {Another}
         */
      `,
      errors: [
        {
          line: 22,
          message: 'The type \'BadImportIgnoredByThisRule\' is undefined.',
        },
        {
          line: 25,
          message: 'The type \'Sth\' is undefined.',
        },
        {
          line: 28,
          message: 'The type \'Another\' is undefined.',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
          /**
           * @param {string} foo - Bar.
           */
          function quux(foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param {Promise} foo - Bar.
           */
          function quux(foo) {

          }
      `,
      languageOptions: {
        globals: {
          Promise: 'readonly',
        },
      },
    },
    {
      code: `
          class MyClass {}

          /**
           * @param {MyClass} foo - Bar.
           */
          function quux(foo) {
            console.log(foo);
          }

          quux(0);
      `,
      rules: {
        'no-unused-vars': 'error',
      },
    },
    {
      code: `
        const MyType = require('my-library').MyType;

        /**
         * @param {MyType} foo - Bar.
         */
          function quux(foo) {

        }
      `,
      languageOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
        const MyType = require('my-library').MyType;

        /**
         * @param {MyType} foo - Bar.
         */
          function quux(foo) {

        }
      `,
      languageOptions: {
        globals: globals.node,
      },
    },
    {
      code: `
        import {MyType} from 'my-library';

        /**
         * @param {MyType} foo - Bar.
         * @param {object<string, number>} foo
         * @param {Array<string>} baz
         */
        function quux(foo, bar, baz) {

        }
      `,
      languageOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
        /*globals MyType*/

        /**
         * @param {MyType} foo - Bar.
         * @param {HisType} bar - Foo.
         */
          function quux(foo, bar) {

        }
      `,
      languageOptions: {
        globals: {
          HisType: true,
        },
      },
    },
    {
      code: `
        /**
         * @typedef {object} hello
         * @property {string} a - a.
         */

        /**
         * @param {hello} foo
         */
        function quux(foo) {

        }
      `,
    },
    {
      code: `
        /**
         * @param {Array<syntaxError} foo
         */
        function quux(foo) {

        }
      `,
    },
    {
      code: `
      /**
       * Callback test.
       *
       * @callback addStuffCallback
       * @param {String} sum - An test integer.
       */
      /**
       * Test Eslint.
       *
       * @param {addStuffCallback} callback - A callback to run.
       */
      function testFunction(callback) {
        callback();
      }
      `,
    },
    {
      code: `
      /**
       *
       *
       */
      function foo () {

      }
      `,
    },
    {
      code: `
        /**
         * @param {MyType} foo - Bar.
         * @param {HisType} bar - Foo.
         */
        function quux(foo, bar) {

        }
      `,
      options: [
        {
          definedTypes: [
            'MyType', 'HisType',
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @param {MyType} foo - Bar.
         * @param {HisType} bar - Foo.
         * @param {HerType} baz - Foo.
         */
        function quux(foo, bar, baz) {

        }
      `,
      options: [
        {
          definedTypes: [
            'MyType',
          ],
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            hertype: {
              replacement: 'HerType',
            },
            histype: 'HisType',
          },
        },
      },
    },
    {
      code: `
        /**
         * @param {MyType} foo - Bar.
         * @param {HisType} bar - Foo.
         * @param {HerType} baz - Foo.
         */
        function quux(foo, bar, baz) {

        }
      `,
      options: [
        {
          definedTypes: [
            'MyType',
          ],
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            hertype: {
              replacement: 'HerType<>',
            },
            histype: 'HisType.<>',
          },
        },
      },
    },
    {
      code: `
      /**
       * @template TEMPLATE_TYPE
       * @param {TEMPLATE_TYPE} bar
       * @return {TEMPLATE_TYPE}
       */
      function foo (bar) {
      };
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
       * @template TEMPLATE_TYPE
       */
      class Foo {
        /**
         * @return {TEMPLATE_TYPE}
         */
        bar () {
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
      /**
       * @template TEMPLATE_TYPE
       */
      class Foo {
        /**
         * @return {TEMPLATE_TYPE}
         */
        bar () {}

        /**
         * @return {TEMPLATE_TYPE}
         */
        baz () {}
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
       * @template TEMPLATE_TYPE_A, TEMPLATE_TYPE_B
       */
      class Foo {
        /**
         * @param {TEMPLATE_TYPE_A} baz
         * @return {TEMPLATE_TYPE_B}
         */
        bar (baz) {
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
      /**
       * @template TEMPLATE_TYPE_A, TEMPLATE_TYPE_B - Some description
       */
      class Foo {
        /**
         * @param {TEMPLATE_TYPE_A} baz
         * @return {TEMPLATE_TYPE_B}
         */
        bar (baz) {
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
      /****/

      /* */

      /*** */

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
       * @typedef {object} BaseObject
       */
      /**
       * Run callback when hooked method is called.
       *
       * @template {BaseObject} T
       * @param {T} obj - object whose method should be hooked.
       * @param {string} method - method which should be hooked.
       * @param {(sender: T) => void} callback - callback which should
       * be called when the hooked method was invoked.
       */
      function registerEvent(obj, method, callback) {

      }
      `,
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
    {
      code: `
      /**
      * @param {...} varargs
      */
     function quux (varargs) {
     }
     `,
    },
    {
      code: `
     /**
      * @param {...number} varargs
      */
     function quux (varargs) {
     }
     `,
    },
    {
      code: `
      class Navigator {}
      /**
       * @this {Navigator}
       */
      function quux () {}
      `,
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
    },
    {
      code: `
      class SomeType {}
      /**
       * @export {SomeType}
       */
      function quux () {}
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
       * @template T
       * @param {T} arg
       */
      function example(arg) {

        /** @param {T} */
        function inner(x) {
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
    const init = () => {
      /**
       * Makes request
       * @returns {Promise}
       */
      function request() {
        return Promise.resolve('success');
      }
    };
`,
      languageOptions: {
        globals: {
          Promise: 'readonly',
        },
      },
    },
    {
      code: `
      /** Gets a Promise resolved with a given value.
       *
       * @template ValueType
       * @param {ValueType} value Value to resolve.
       * @returns {Promise<ValueType>} Promise resolved with value.
       */
      exports.resolve1 = function resolve1(value) {
        return Promise.resolve(value);
      };
      `,
      languageOptions: {
        globals: {
          Promise: 'readonly',
        },
      },
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
    {
      code: `
      /**
       * A function returning the same type as its argument.
       *
       * @template ValueType
       * @typedef {ValueType} ValueFunc
       */
      `,
      languageOptions: {
        globals: {
          Promise: 'readonly',
        },
      },
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
    {
      code: `
      /**
       * @aCustomTag {SomeType}
       */
      function quux () {}
      `,
      settings: {
        jsdoc: {
          structuredTags: {
            aCustomTag: {
              type: false,
            },
          },
        },
      },
    },
    {
      code: `
      /**
       * @aCustomTag {SomeType}
       */
      function quux () {}
      `,
      settings: {
        jsdoc: {
          structuredTags: {
            aCustomTag: {
              type: [
                'aType', 'SomeType',
              ],
            },
          },
        },
      },
    },
    {
      code: `
      /**
       * @namepathDefiner SomeType
       */
      /**
       * @type {SomeType}
       */
      `,
      settings: {
        jsdoc: {
          structuredTags: {
            namepathDefiner: {
              name: 'namepath-defining',
            },
          },
        },
      },
    },
    {
      code: `
      class Test {
        /**
         * Method.
         *
         * @returns {this} Return description.
         */
        method (): this {
          return this;
        }
      }
      `,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
          /**
           * Bad types ignored here and handled instead by \`valid-types\`.
           * @param {string(} foo - Bar.
           */
          function quux(foo) {

          }
      `,
    },
    {
      code: `
          /**
           * Bad types ignored here and handled instead by \`valid-types\`.
           * @param {string(} foo - Bar.
           */
          function quux(foo) {

          }
      `,
      ignoreReadme: true,
      settings: {
        jsdoc: {
          mode: 'permissive',
        },
      },
    },
    {
      // https://github.com/gajus/eslint-plugin-jsdoc/issues/747
      code: `
        /**
         * Read all content from a Readable stream.
         *
         * @param {!module:stream.Readable} readable Readable stream.
         * @returns {!Promise<!Array<*>>} Content from readable.
         */
        module.exports =
        function readStream(readable) {
          return new Promise((resolve, reject) => {
            const data = [];
            readable
              .on('data', (d) => data.push(d))
              .once('error', reject)
              .once('end', () => resolve(data));
          });
        };
      `,
      languageOptions: {
        globals: {
          Promise: 'readonly',
        },
      },
      ignoreReadme: true,
    },
    {
      // https://github.com/gajus/eslint-plugin-jsdoc/issues/749
      code: `
      /**
       * @param {{message: string|undefined}} options Options.
       */
      function MyError(options) {
      }
      `,
      ignoreReadme: true,
    },
    {
      code: `
      /**
       * @template T
       * @param {T} arg
       * @returns {[T]}
       */
      function genericFunctionExample(arg) {
        const result = /** @type {[T]} */ (new Array());
        result[0] = arg;
        return result;
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
      /** @typedef QDigestNode */
      class A {
        /**
         * @template {object} T
         * @param {(node: QDigestNode) => T} callback
         * @returns {T[]}
         */
        map(callback) {
          /** @type {T[]} */
          let vals;
          return vals;
        }
      }
      `,
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
    {
      code: `
      /**
       * @template T
       * @param {T} arg
       */
      function example(arg) {

        /** @param {T} */
        function inner(x) {
        }
      }
      `,
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
    {
      // https://github.com/gajus/eslint-plugin-jsdoc/issues/748
      code: `
      /**
       * @param {{message: string?}} options Options.
       */
      function MyError(options) {
      }
      `,
      ignoreReadme: true,
    },
    {
      code: `
      /**
       * @suppress {visibility}
       */
      function foo () {
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
       * @template T
       */
      export class Foo {
        // cast to T
        getType() {
          const x = "hello";
          const y = /** @type {T} */ (x);
          return y;
        }
      }
      `,
      languageOptions: {
        parser: babelEslintParser
      },
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
    {
      code: `
        /**
         * @type {const}
         */
        const a = 'string';
      `,
    },
    {
      code: `
        /**
        * @typedef Todo
        * @property description
        * @property otherStuff
        */
        /**
         * @type {Omit<Todo, "description">}
         */
        const a = new Todo();
      `,
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
    {
      code: `
      /**
       * @template A, [B=SomeDefault]
       */
      class Foo {
        /**
         * @param {A} baz
         * @return {B}
         */
        bar (baz) {
        }
      }
      `,
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
    {
      code: `
          // THIS SHOULD CAUSE ERRORS, BUT DUE TO ESLINT TESTER
          //  LIMITATIONS, WE CAN'T TEST THE \`no-unused-vars\` RULE;
          //  WE PUT IT HERE FOR COVERAGE

          import {MyInterface} from 'xyz';
          /**
           * @type {MyInterface}
           */
          function quux(foo) {
            console.log(foo);
          }

          quux(0);
      `,
      ignoreReadme: true,
      options: [
        {
          markVariablesAsUsed: false,
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
      import {MyType} from 'my-library';

      /**
       * @param {MyType} foo - Bar.
       * @param {AnUndefinedType} bar
       */
      function quux(foo, bar) {

      }
      `,
      options: [
        {
          disableReporting: true,
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          class MyClass {}
          class AnotherClass {}

          /**
           * A description mentioning {@link MyClass} and {@link AnotherClass | another class} and a URL via [this link]{@link https://www.example.com}.
           */
          function quux(foo) {
            console.log(foo);
          }

          quux(0);
      `,
      rules: {
        'no-unused-vars': 'error',
      },
    },
    {
      code: `
          class MyClass {}
          class AnotherClass {}

          /**
           * @see A tag mentioning {@link MyClass} and {@link AnotherClass | another class} and a URL via [this link]{@link https://www.example.com}.
           */
          function quux(foo) {
            console.log(foo);
          }

          quux(0);
      `,
      rules: {
        'no-unused-vars': 'error',
      },
    },
    {
      code: `
        /**
         * @import BadImportIgnoredByThisRule
         */
        /**
         * @import LinterDef, { Sth as Something, Another as Another2 } from "eslint"
         */
        /**
         * @import { Linter } from "eslint"
         */
        /**
         * @import LinterDefault from "eslint"
         */
        /**
         * @import {Linter as Lintee} from "eslint"
         */
        /**
         * @import * as Linters from "eslint"
         */

        /**
         * @type {LinterDef}
         */
        /**
         * @type {Something}
         */
        /**
         * @type {Another2}
         */
        /**
         * @type {Linter}
         */
        /**
         * @type {LinterDefault}
         */
        /**
         * @type {Lintee}
         */
        /**
         * @type {Linters}
         */
      `,
    },
  ],
});
