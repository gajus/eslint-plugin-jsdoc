import {parser as typescriptEslintParser} from 'typescript-eslint';
import * as babelEslintParser from '@babel/eslint-parser';

export default {
  invalid: [
    {
      code: `
          /**
           * @param Foo
           */
          function quux (foo = 'FOO') {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @param names to be "foo". Got "Foo".',
        },
      ],
    },
    {
      code: `
          /**
           * @arg Foo
           */
          function quux (foo = 'FOO') {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @arg names to be "foo". Got "Foo".',
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
           * @param Foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @param names to be "foo". Got "Foo".',
        },
      ],
    },
    {
      code: `
          /**
           * @param Foo.Bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message:
            '@param path declaration ("Foo.Bar") appears before any real parameter.',
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           * @param Foo.Bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 4,
          message:
            '@param path declaration ("Foo.Bar") root node name ("Foo") does not match previous real parameter name ("foo").',
        },
      ],
    },
    {
      code: `
          /**
           * Assign the project to a list of employees.
           * @param {string} employees[].name - The name of an employee.
           * @param {string} employees[].department - The employee's department.
           */
          function assign (employees) {

          };
      `,
      errors: [
        {
          line: 4,
          message:
            '@param path declaration ("employees[].name") appears before any real parameter.',
        },
      ],
    },
    {
      code: `
          /**
           * Assign the project to a list of employees.
           * @param {string} employees[].name - The name of an employee.
           * @param {string} employees[].name - The employee's department.
           */
          function assign (employees) {

          };
      `,
      errors: [
        {
          line: 5,
          message: 'Duplicate @param "employees[].name"',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
          /**
           * Assign the project to a list of employees.
           * @param {string} employees[].name - The name of an employee.
           */
          function assign (employees) {

          };
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param foo.bar
           * @param bar
           */
          function quux (bar, foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @param names to be "bar, foo". Got "foo, bar".',
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 4,
          message:
            '@param "bar" does not match an existing function parameter.',
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           * @param foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Duplicate @param "foo"',
        },
      ],
      options: [
        {
          enableFixer: true,
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
      class bar {
          /**
           * @param foo
           * @param foo
           */
          quux (foo) {

          }
      }
      `,
      errors: [
        {
          line: 5,
          message: 'Duplicate @param "foo"',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
      class bar {
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
           * @param foo
           * @param foo
           */
          function quux (foo, bar) {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Duplicate @param "foo"',
        },
      ],
      options: [
        {
          enableFixer: true,
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
           * @param foo
           */
          function quux (foo, foo) {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Duplicate @param "foo"',
        },
      ],
      languageOptions: {
        sourceType: 'script',
      },
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
          /**
           * @param foo
           */
          function quux (foo, foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param cfg.foo
           */
          function quux ({foo}) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'Duplicate @param "cfg.foo"',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
          /**
           * @param cfg
           * @param cfg.foo
           */
          function quux ({foo}) {

          }
      `,
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param cfg.foo
           */
          function quux ({foo}) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'Duplicate @param "cfg.foo"',
        },
      ],
      output: null,
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           */
          function quux ({foo, bar}) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing @param "cfg.bar"',
        },
      ],
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param [cfg.foo]
           * @param baz
           */
          function quux ({foo}, baz) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'Duplicate @param "cfg.foo"',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param baz
           */
          function quux ({foo}, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param [cfg.foo="with a default"]
           * @param baz
           */
          function quux ({foo, bar}, baz) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing @param "cfg.bar"',
        },
      ],
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param [cfg.foo="with a default"]
           * @param baz
           */
          function quux ({foo}, baz) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'Duplicate @param "cfg.foo"',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param baz
           */
          function quux ({foo}, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param cfg
           * @param [cfg.foo="with a default"]
           * @param baz
           */
          function quux ({foo, bar}, baz) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing @param "cfg.bar"',
        },
      ],
    },
    {
      code: `
          /**
           * @param args
           */
          function quux ({a, b}) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing @param "args.a"',
        },
        {
          line: 3,
          message: 'Missing @param "args.b"',
        },
      ],
    },
    {
      code: `
          /**
           * @param args
           */
          function quux ({a, b} = {}) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing @param "args.a"',
        },
        {
          line: 3,
          message: 'Missing @param "args.b"',
        },
      ],
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param prop
           */
          constructor(private property: string) {}
        }
      `,
      errors: [
        {
          line: 4,
          message: 'Expected @param names to be "property". Got "prop".',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param prop
           * @param prop.foo
           */
          constructor(prop: { foo: string, bar: string }) {}
        }
      `,
      errors: [
        {
          line: 4,
          message: 'Missing @param "prop.bar"',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param prop
           * @param prop.foo
           * @param prop.bar
           */
          constructor(options: { foo: string, bar: string }) {}
        }
      `,
      errors: [
        {
          line: 4,
          message: '@param "prop" does not match parameter name "options"',
        },
        {
          line: 4,
          message: 'Missing @param "options.foo"',
        },
        {
          line: 4,
          message: 'Missing @param "options.bar"',
        },
        {
          line: 5,
          message: '@param "prop.foo" does not exist on prop',
        },
        {
          line: 6,
          message: '@param "prop.bar" does not exist on prop',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param options
           * @param options.foo
           * @param options.bar
           */
          constructor(options: { foo: string }) {}
        }
      `,
      errors: [
        {
          line: 6,
          message: '@param "options.bar" does not exist on options',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
    },
    {
      code: `
          /**
           * @param foo
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
           * @param {Error} error Exit code
           * @param {number} [code = 1] Exit code
           */
          function quux (error, cde = 1) {
          };
      `,
      errors: [
        {
          line: 4,
          message:
            'Expected @param names to be "error, cde". Got "error, code".',
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux ([a, b] = []) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing @param "foo."0""',
        },
        {
          line: 3,
          message: 'Missing @param "foo."1""',
        },
      ],
    },
    {
      code: `
      /**
       * @param options
       * @param options.foo
       */
      function quux ({foo, ...extra}) {
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing @param "options.extra"',
        },
      ],
      options: [
        {
          checkRestProperty: true,
        },
      ],
      languageOptions: {
        ecmaVersion: 2_018,
      },
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param cfg.bar
           * @param cfg.extra
           */
          function quux ({foo, ...extra}) {

          }
      `,
      errors: [
        {
          line: 5,
          message: '@param "cfg.bar" does not exist on cfg',
        },
      ],
      options: [
        {
          checkRestProperty: true,
        },
      ],
      languageOptions: {
        ecmaVersion: 2_018,
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
          line: 4,
          message: 'Missing @param "bbox.x"',
        },
        {
          line: 4,
          message: 'Missing @param "bbox.y"',
        },
        {
          line: 4,
          message: 'Missing @param "bbox.width"',
        },
        {
          line: 4,
          message: 'Missing @param "bbox.height"',
        },
      ],
      options: [
        {
          checkTypesPattern: 'SVGRect',
        },
      ],
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
          line: 4,
          message: 'Missing @param "bbox.x"',
        },
        {
          line: 4,
          message: 'Missing @param "bbox.y"',
        },
        {
          line: 4,
          message: 'Missing @param "bbox.width"',
        },
        {
          line: 4,
          message: 'Missing @param "bbox.height"',
        },
      ],
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
          line: 4,
          message: 'Missing @param "fetchOptions.url"',
        },
        {
          line: 4,
          message: 'Missing @param "fetchOptions.options"',
        },
      ],
      options: [
        {
          checkRestProperty: true,
        },
      ],
      languageOptions: {
        parser: babelEslintParser
      },
    },
    {
      code: `
      /**
       * Testing
       *
       * @param options
       * @param options.one One
       * @param options.two Two
       * @param options.four Four
       */
      function testingEslint(options: {
        one: string;
        two: string;
        three: string;
      }): string {
        return one + two + three;
      }
      `,
      errors: [
        {
          line: 5,
          message: 'Missing @param "options.three"',
        },
        {
          line: 8,
          message: '@param "options.four" does not exist on options',
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
          /**
           * @param root
           * @param foo
           */
          function quux ({foo, bar}, baz) {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Expected @param names to be "root, baz". Got "root, foo".',
        },
      ],
      options: [
        {
          checkDestructured: false,
        },
      ],
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
          line: 4,
          message: 'Missing @param "options.foo"',
        },
        {
          line: 4,
          message: 'Missing @param "options.foo.bar"',
        },
      ],
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
          line: 5,
          message: 'Missing @param "options.foo.bar"',
        },
      ],
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
          line: 6,
          message: 'Missing @param "options.foo.bar.baz"',
        },
      ],
    },
    {
      code: `
      /**
      * Returns a number.
      * @param {Object} props Props.
      * @param {Object} props.prop Prop.
      * @param {string} props.prop.a String.
      * @param {string} props.prop.b String.
      * @return {number} A number.
      */
      export function testFn1 ({ prop = { a: 1, b: 2 } }) {
      }
      `,
      errors: [
        {
          line: 6,
          message: '@param "props.prop.a" does not exist on props',
        },
        {
          line: 7,
          message: '@param "props.prop.b" does not exist on props',
        },
      ],
      options: [
        {
          useDefaultObjectProperties: false,
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          /**
           * @param {object} cfg
           * @param {string} cfg.foo
           * @param {string} cfg.bar
           * @param {object} cfg.extra
           */
          function quux ({foo}) {

          }
      `,
      errors: [
        {
          line: 5,
          message: '@param "cfg.bar" does not exist on cfg',
        },
        {
          line: 6,
          message: '@param "cfg.extra" does not exist on cfg',
        },
      ],
    },
    {
      code: `
          /**
           * @param {object} cfg
           * @param {string} cfg.foo
           * @param {string} cfg.bar
           * @param {object} cfg.extra
           */
          function quux ({foo}) {

          }
      `,
      errors: [
        {
          line: 5,
          message: '@param "cfg.bar" does not exist on cfg',
        },
        {
          line: 6,
          message: '@param "cfg.extra" does not exist on cfg',
        },
      ],
      options: [
        {
          disableExtraPropertyReporting: true,
        },
      ],
    },
    {
      code: `
          /**
           * @param {object} root
           * @param {object} root.cfg
           * @param {object} root.cfg.a
           * @param {string} root.cfg.a.foo
           * @param {string} root.cfg.a.bar
           * @param {object} root.cfg.a.extra
           */
          function quux ({cfg: {a: {foo}}}) {

          }
      `,
      errors: [
        {
          line: 7,
          message: '@param "root.cfg.a.bar" does not exist on root',
        },
        {
          line: 8,
          message: '@param "root.cfg.a.extra" does not exist on root',
        },
      ],
    },
    {
      code: `
          /**
           * @param {object} root
           * @param {object} root.cfg
           * @param {object} root.cfg.a
           * @param {string} root.cfg.a.foo
           * @param {string} root.cfg.a.bar
           * @param {object} root.cfg.a.extra
           */
          function quux ({cfg: {a: {foo}}}) {

          }
      `,
      errors: [
        {
          line: 7,
          message: '@param "root.cfg.a.bar" does not exist on root',
        },
        {
          line: 8,
          message: '@param "root.cfg.a.extra" does not exist on root',
        },
      ],
      options: [
        {
          disableExtraPropertyReporting: true,
        },
      ],
    },
    {
      code: `
          /**
           * @param {object} root
           * @param {object} root.cfg
           * @param {string} root.cfg.foo
           * @param {string} root.cfg.bar
           * @param {object} root.cfg.extra
           */
          function quux ({cfg}) {

          }
      `,
      errors: [
        {
          line: 5,
          message: '@param "root.cfg.foo" does not exist on root',
        },
        {
          line: 6,
          message: '@param "root.cfg.bar" does not exist on root',
        },
        {
          line: 7,
          message: '@param "root.cfg.extra" does not exist on root',
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           * @param foo
           *   on another line
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Duplicate @param "foo"',
        },
      ],
      options: [
        {
          enableFixer: true,
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
       * @param barr This is the description of bar. Oops, we misspelled "bar" as "barr".
       */
      declare function foo(bar: number)
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @param names to be "bar". Got "barr".',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
        /**
         * @param foo
         * @param foo.bar
         */
        function quux (bar, foo) {
        }
      `,
      options: [
        {
          disableMissingParamChecks: false,
        },
      ],
      errors: [
        {
          line: 3,
          message: 'Expected @param names to be "bar, foo". Got "foo".',
        },
      ],
    },
    {
      code: `
        /**
         * @param foo
         */
        function quux (bar, baz) {
        }
      `,
      options: [
        {
          disableMissingParamChecks: true,
        },
      ],
      errors: [
        {
          line: 3,
          message: 'Expected @param names to be "bar, baz". Got "foo".',
        },
      ],
    },
    {
      code: `
        /**
         * @param bar
         * @param foo
         */
        function quux (foo, bar) {
        }
      `,
      options: [
        {
          disableMissingParamChecks: true,
        },
      ],
      errors: [
        {
          line: 3,
          message: 'Expected @param names to be "foo, bar". Got "bar, foo".',
        },
      ],
    },
    {
      code: `
        /**
         * @param foo
         * @param bar
         */
        function quux (foo) {
        }
      `,
      options: [
        {
          disableMissingParamChecks: true,
        },
      ],
      errors: [
        {
          line: 4,
          message: '@param "bar" does not match an existing function parameter.',
        },
      ],
    },
    {
      code: `
        export interface B {
            /**
             * @param paramA Something something
             */
            methodB(paramB: string): void
        };
      `,
      errors: [
        {
          line: 4,
          message: 'Expected @param names to be "paramB". Got "paramA".',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
    },
    {
      code: `
        interface A {
          /**
           * @param params Values for the placeholders
           */
          getText(key: string, ...params: string[]): string
        }
      `,
      errors: [
        {
          line: 4,
          message: 'Expected @param names to be "key, ...params". Got "params".',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @param arg Arg
         */
        export function fn(...[type, arg]: FnArgs): void {
          // ...
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @param name to be "type". Got "arg".',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
    },
  ],
  valid: [
    {
      code: `
          /**
           *
           */
          function quux (foo) {

          }
      `,
    },
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
           * @param foo.foo
           * @param bar
           */
          function quux (foo, bar) {

          }
      `,
    },
    {
      code: `
          /**
           * @param args
           */
          function quux (...args) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param foo.a
           * @param foo.b
           */
          function quux ({a, b}) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param foo.a
           * @param foo.b
           */
          function quux ({"a": A, b}) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param foo."a"
           * @param foo.b
           */
          function quux ({a: A, b}) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param foo."a-b"
           * @param foo.b
           */
          function quux ({"a-b": A, b}) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param foo.bar
           * @param foo.baz
           * @param bar
           */
          function quux (foo, bar) {

          }
      `,
    },
    {
      code: `
          /**
           * Assign the project to a list of employees.
           * @param {object[]} employees - The employees who are responsible for the project.
           * @param {string} employees[].name - The name of an employee.
           * @param {string} employees[].department - The employee's department.
           */
          function assign (employees) {

          };
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
        export class SomeClass {
          /**
           * @param options
           * @param options.foo
           * @param options.bar
           */
          constructor(options: { foo: string, bar: string }) {}
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param options
           * @param options.foo
           * @param options.bar
           */
          constructor({ foo, bar }: { foo: string, bar: string }) {}
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param options
           * @param options.foo
           * @param options.bar
           */
          constructor({ foo, bar }: { foo: string, bar: string }) {}
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
           * @param {Error} error Exit code
           * @param {number} [code = 1] Exit code
           */
          function quux (error, code = 1) {
          };
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo) {

          }
      `,
      options: [
        {
          allowExtraTrailingParamDocs: true,
        },
      ],
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param baz
           */
          function quux ({foo}, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param cfg2
           */
          function quux ({foo}, cfg2) {

          }
      `,
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param baz
           * @param baz.cfg
           */
          function quux ({foo}, {cfg}) {

          }
      `,
    },
    {
      code: `
      /**
       * @param options
       * @param options.foo
       */
      function quux ({foo, ...extra}) {
      }
      `,
      languageOptions: {
        ecmaVersion: 2_018,
      },
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo, bar, ...extra) {

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
        parser: typescriptEslintParser
      },
    },
    {
      code: `
      /**
       * Logs a string.
       *
       * @param input - String to output.
       */
      export default function (input: {
        [foo: string]: { a: string; b: string };
      }): void {
        input;
      }
      `,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
      export class Thing {
        foo: any;

        /**
         * @param {} C
         */
        constructor(C: { new (): any }) {
          this.foo = new C();
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
           * @param foo
           * @param root
           */
          function quux (foo, {bar}) {

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
      class A {
        /**
         * Show a prompt.
         * @param hideButton true if button should be hidden, false otherwise
         * @param onHidden delegate to call when the prompt is hidden
         */
        public async showPrompt(hideButton: boolean, onHidden: {(): void}): Promise<void>
        {
        }
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
       * Description.
       * @param {Object} options Options.
       * @param {FooBar} options.foo foo description.
       */
      function quux ({ foo: { bar }}) {}
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
       * Description.
       * @param {Object} options
       * @param {FooBar} options.foo
       * @param {FooBar} options.baz
       */
      function quux ({ foo: { bar }, baz: { cfg } }) {}
      `,
    },
    {
      code: `
      /**
       * Item
       *
       * @param {object} props
       * @param {object} props.data - case data
       * @param {string} props.data.className - additional css class
       * @param props.val
       */
      export default function Item({
        data: {
          className,
        } = {},
        val = 4
      }) {
      }
      `,
      languageOptions: {
        sourceType: 'module',
      },
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
      * @param {string} props.prop.a String.
      * @param {string} props.prop.b String.
      * @return {number} A number.
      */
      export function testFn1 ({ prop = { a: 1, b: 2 } }) {
      }
      `,
      options: [
        {
          useDefaultObjectProperties: true,
        },
      ],
      languageOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          /**
           * @param {object} root
           * @param {object} root.cfg
           * @param {string} root.cfg.foo
           * @param {string} root.cfg.bar
           * @param {object} root.cfg.extra
           */
          function quux ({cfg}) {

          }
      `,
      options: [
        {
          disableExtraPropertyReporting: true,
        },
      ],
    },
    {
      code: `
      class A {
          /**
           * @param cfg
           * @param cfg.abc
           */
          constructor({
              [new.target.prop]: cX,
              abc
          }) {
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
       * @param root
       * @param root."0" Ignored
       * @param root."1" Our "b"
       */
      const foo = ([, b]) => b;
      `,
    },
    {
      code: `
      /**
       * @param arg1 This is the description for arg1.
       */
      function foo(this: void, arg1: number): void;
      `,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
      declare global {
        /**
         * @param arg1 This is the number for foo.
         */
        function foo(this: void, arg1: number): void;
      }
      `,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
      class A {
        /**
         * Helper function
         * @param collisionFunc
         */
        public registerCustomPickup(
          collisionFunc: (this: void, player: EntityPlayer) => boolean = () => true,
        ): void {}
       }
      `,
      ignoreReadme: true,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
      class A {
        /**
         * Helper function
         * @param collisionFunc
         */
        @Exported
        public registerCustomPickup(
          collisionFunc: (this: void, player: EntityPlayer) => boolean = () => true,
        ): void {}
       }
      `,
      ignoreReadme: true,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
      declare global {
        /**
         * @param r Range is 0-1.
         * @param g Range is 0-1.
         * @param b Range is 0-1.
         */
        function Color(
          this: void,
          r: float,
          g: float,
          b: float,
        ): Color;
      }
      `,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
        /**
         * @param this desc
         * @param bar number to return
         * @returns number returned back to caller
         */
        function foo(this: T, bar: number): number {
          console.log(this.name);
          return bar;
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
        /**
         * Documentation
         */
        function quux (foo, bar) {
        }
      `,
      options: [
        {
          disableMissingParamChecks: true,
        },
      ],
    },
    {
      code: `
        /**
         * @param bar
         * @param bar.baz
         */
        function quux (foo, bar) {
        }
      `,
      options: [
        {
          disableMissingParamChecks: true,
        },
      ],
    },
    {
      code: `
        /**
         * @param foo
         */
        function quux (foo, bar) {
        }
      `,
      options: [
        {
          disableMissingParamChecks: true,
        },
      ],
    },
    {
      code: `
        /**
         * @param type Type
         * @param arg Arg
         */
        export function fn(...[type, arg]: FnArgs): void {
          // ...
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
    },
  ],
};
