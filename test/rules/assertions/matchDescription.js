import {parser as typescriptEslintParser} from 'typescript-eslint';

export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
          /**
           * foo.
           */
          const q = class {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          contexts: [
            'ClassExpression',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * foo.
           */
          const q = class {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Needs to begin with a capital letter and end with an end mark.',
        },
      ],
      options: [
        {
          contexts: [
            'ClassExpression',
          ],
          message: 'Needs to begin with a capital letter and end with an end mark.',
        },
      ],
    },
    {
      code: `
          /**
           * foo.
           */
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
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
           * foo.
           */
          const q = {

          };
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          contexts: [
            'ObjectExpression',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * foo.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
    },
    {
      code: `
          /**
           * Foo)
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
    },
    {
      code: `
          /**
           * тест.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          matchDescription: '[\u0410-\u042F][\u0410-\u044F]+\\.',
        },
      ],
    },
    {
      code: `
          /**
           * тест.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Needs to begin with a capital letter and end with an end mark.',
        },
      ],
      options: [
        {
          matchDescription: '[\u0410-\u042F][\u0410-\u044F]+\\.',
          message: 'Needs to begin with a capital letter and end with an end mark.',
        },
      ],
    },
    {
      code: `
          /**
           * Abc.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          mainDescription: '[\u0410-\u042F][\u0410-\u044F]+\\.',
          tags: {
            param: true,
          },
        },
      ],
    },
    {
      code: `
          /**
           * Abc.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Needs to begin with a Cyrillic capital letter and end with a period.',
        },
      ],
      options: [
        {
          mainDescription: {
            match: '[\u0410-\u042F][\u0410-\u044F]+\\.',
            message: 'Needs to begin with a Cyrillic capital letter and end with a period.',
          },
          tags: {
            param: true,
          },
        },
      ],
    },
    {
      code: `
          /**
           * Foo
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
    },
    {
      code: `
          /**
           * Foo.
           *
           * @param foo foo.
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          tags: {
            param: true,
          },
        },
      ],
    },
    {
      code: `
          /**
           * Foo.
           *
           * @template Abc, Def foo.
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          tags: {
            template: true,
          },
        },
      ],
    },
    {
      code: `
          /**
           * Foo.
           *
           * @prop foo foo.
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          tags: {
            prop: true,
          },
        },
      ],
    },
    {
      code: `
          /**
           * Foo.
           *
           * @summary foo.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
    },
    {
      code: `
          /**
           * Foo.
           *
           * @author
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          tags: {
            author: '.+',
          },
        },
      ],
    },
    {
      code: `
          /**
           * Foo.
           *
           * @x-tag
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          tags: {
            'x-tag': '.+',
          },
        },
      ],
    },
    {
      code: `
          /**
           * Foo.
           *
           * @description foo foo.
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
    },
    {
      code: `
          /**
           * Foo
           *
           * @param foo foo.
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          mainDescription: '^[a-zA-Z]*\\s*$',
          tags: {
            param: true,
          },
        },
      ],
    },
    {
      code: `
          /**
           * Foo
           *
           * @param foo foo.
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'Needs to begin with a capital letter and end with a period.',
        },
      ],
      options: [
        {
          mainDescription: {
            match: '^[a-zA-Z]*\\s*$',
            message: 'Letters only',
          },
          tags: {
            param: {
              match: true,
              message: 'Needs to begin with a capital letter and end with a period.',
            },
          },
        },
      ],
    },
    {
      code: `
          /**
           * Foo
           *
           * @param foo foo.
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          mainDescription: false,
          tags: {
            param: true,
          },
        },
      ],
    },
    {
      code: `
          /**
           * Foo.
           *
           * @param foo bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          tags: {
            param: true,
          },
        },
      ],
    },
    {
      code: `
          /**
           * {@see Foo.bar} buz
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
    },
    {
      code: `
          /**
           * Foo.
           *
           * @returns {number} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          tags: {
            returns: true,
          },
        },
      ],
    },
    {
      code: `
          /**
           * Foo.
           *
           * @returns foo.
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          tags: {
            returns: true,
          },
        },
      ],
    },
    {
      code: `
          /**
           * lorem ipsum dolor sit amet, consectetur adipiscing elit. pellentesque elit diam,
           * iaculis eu dignissim sed, ultrices sed nisi. nulla at ligula auctor, consectetur neque sed,
           * tincidunt nibh. vivamus sit amet vulputate ligula. vivamus interdum elementum nisl,
           * vitae rutrum tortor semper ut. morbi porta ante vitae dictum fermentum.
           * proin ut nulla at quam convallis gravida in id elit. sed dolor mauris, blandit quis ante at,
           * consequat auctor magna. duis pharetra purus in porttitor mollis.
           */
          function longDescription (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
    },
    {
      code: `
          /**
           * @arg {number} foo - Foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          tags: {
            arg: true,
          },
        },
      ],
    },
    {
      code: `
          /**
           * @argument {number} foo - Foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          tags: {
            argument: true,
          },
        },
      ],
    },
    {
      code: `
          /**
           * @return {number} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          tags: {
            return: true,
          },
        },
      ],
    },
    {
      code: `
          /**
           * Returns bar.
           *
           * @return {number} bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          tags: {
            return: true,
          },
        },
      ],
    },
    {
      code: `
          /**
           * @param notRet
           * @returns Тест.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          tags: {
            param: '[\u0410-\u042F][\u0410-\u044F]+\\.',
          },
        },
      ],
    },
    {
      code: `
          /**
           * @description notRet
           * @returns Тест.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          tags: {
            description: '[\u0410-\u042F][\u0410-\u044F]+\\.',
          },
        },
      ],
    },
    {
      code: `
          /**
           * foo.
           */
          class quux {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          contexts: [
            'ClassDeclaration',
          ],
        },
      ],
    },
    {
      code: `
      class MyClass {
        /**
         * Abc
         */
        myClassField = 1
      }
      `,
      errors: [
        {
          line: 4,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          contexts: [
            'PropertyDefinition',
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
           * foo.
           */
          interface quux {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          contexts: [
            'TSInterfaceDeclaration',
          ],
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
          const myObject = {
            /**
             * Bad description
             */
            myProp: true
          };
      `,
      errors: [
        {
          line: 4,
          message: 'JSDoc description does not satisfy the regex pattern.',
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
    {
      code: `
        /**
         * @param foo Foo bar
         */
        function quux (foo) {

        }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          tags: {
            param: true,
          },
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            description: false,
          },
        },
      },
    },
    {
      code: `
        /**
         * Foo bar
         */
        function quux (foo) {

        }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            description: false,
          },
        },
      },
    },
    {
      code: `
          /**
           * Description with extra new line
           *
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          matchDescription: '[\\s\\S]*\\S$',
        },
      ],
    },
    {
      code: `
         /**
          *
          * This function does lots of things.
          */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          matchDescription: '^\\S[\\s\\S]*\\S$',
        },
      ],
    },
    {
      code: `
        /**
         *
         * @param
         */
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
          matchDescription: '^\\S[\\s\\S]*\\S$',
        },
      ],
    },
    {
      code: `
        /** Does something very important. */
        function foo(): string;
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[endLine=0]',
            },
          ],
          matchDescription: '^\\S[\\s\\S]*\\S$',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
          /**
           * @copyright
           */
          function quux () {
          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description must not be empty.',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
          /**
           *
           */
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
           * @param foo - Foo.
           */
          function quux () {

          }
      `,
      options: [
        {
          tags: {
            param: true,
          },
        },
      ],
    },
    {
      code: `
          /**
           * Foo.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo.
           * Bar.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo.
           *
           * Bar.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo.
           *
           * Bar.
           */
          function quux () {

          }
      `,
      options: [
        {
          message: 'This won\'t be shown',
        },
      ],
    },
    {
      code: `
          /**
           * Тест.
           */
          function quux () {

          }
      `,
      options: [
        {
          matchDescription: '[\u0410-\u042F][\u0410-\u044F]+\\.',
        },
      ],
    },
    {
      code: `
          /**
           * @param notRet
           * @returns Тест.
           */
          function quux () {

          }
      `,
      options: [
        {
          tags: {
            returns: '[\u0410-\u042F][\u0410-\u044F]+\\.',
          },
        },
      ],
    },
    {
      code: `
          /**
           * @param notRet
           * @description Тест.
           */
          function quux () {

          }
      `,
      options: [
        {
          tags: {
            description: '[\u0410-\u042F][\u0410-\u044F]+\\.',
          },
        },
      ],
    },
    {
      code: `
          /**
           * Foo
           * bar.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @returns Foo bar.
           */
          function quux () {

          }
      `,
      options: [
        {
          tags: {
            returns: true,
          },
        },
      ],
    },
    {
      code: `
          /**
           * @returns {type1} Foo bar.
           */
          function quux () {

          }
      `,
      options: [
        {
          tags: {
            returns: true,
          },
        },
      ],
    },
    {
      code: `
          /**
           * @description Foo bar.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @description Foo
           * bar.
           * @param
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /** @description Foo bar. */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @description Foo
           * bar.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo. {@see Math.sin}.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo {@see Math.sin} bar.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo?
           *
           * Bar!
           *
           * Baz:
           *   1. Foo.
           *   2. Bar.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Hello:
           * World.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Hello: world.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo
           * Bar.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo.
           *
           * foo.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * foo.
           */
          function quux () {

          }
      `,
      options: [
        {
          mainDescription: false,
        },
      ],
    },
    {
      code: `
          /**
           * foo.
           */
          class quux {

          }
      `,
    },
    {
      code: `
          /**
           * foo.
           */
          class quux {

          }
      `,
      options: [
        {
          mainDescription: true,
        },
      ],
    },
    {
      code: `
      class MyClass {
        /**
         * Abc.
         */
        myClassField = 1
      }
      `,
      options: [
        {
          contexts: [
            'PropertyDefinition',
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
           * Foo.
           */
          interface quux {

          }
      `,
      options: [
        {
          contexts: [
            'TSInterfaceDeclaration',
          ],
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
          const myObject = {
            /**
             * Bad description
             */
            myProp: true
          };
      `,
      options: [
        {
          contexts: [],
        },
      ],
    },
    {
      code: `
          /**
           * foo.
           */
          const q = class {

          }
      `,
      options: [
        {
          contexts: [],
        },
      ],
    },
    {
      code: `
          /**
           * foo.
           */
          const q = {

          };
      `,
      options: [
        {
          contexts: [],
        },
      ],
    },
    {
      code: `
          /**
           * @deprecated foo.
           */
          function quux () {

          }
      `,
      options: [
        {
          tags: {
            param: true,
          },
        },
      ],
    },
    {
      code: `
          /**
           * Foo.
           *
           * @summary Foo.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo.
           *
           * @author Somebody
           */
          function quux () {

          }
      `,
      options: [
        {
          tags: {
            author: '.+',
          },
        },
      ],
    },
    {
      code: `
          /**
           * Foo.
           *
           * @x-tag something
           */
          function quux () {

          }
      `,
      options: [
        {
          tags: {
            'x-tag': '.+',
          },
        },
      ],
    },
    {
      code: `
          /**
           * Foo.
           *
           * @prop foo Foo.
           */
          function quux (foo) {

          }
      `,
      options: [
        {
          tags: {
            prop: true,
          },
        },
      ],
    },
    {
      code: `
        /**
         * @param foo Foo bar.
         */
        function quux (foo) {

        }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            description: false,
          },
        },
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
      settings: {
        jsdoc: {
          tagNamePreference: {
            description: false,
          },
        },
      },
    },
    {
      code: `
          /**
           * Foo.
           *
           * @template Abc, Def Foo.
           */
          function quux (foo) {

          }
      `,
      options: [
        {
          tags: {
            template: true,
          },
        },
      ],
    },
    {
      code: `
      /**
       * Enable or disable plugin.
       *
       * When enabling with this function, the script will be attached to the \`document\` if:.
       * - the script runs in browser context.
       * - the \`document\` doesn't have the script already attached.
       * - the \`loadScript\` option is set to \`true\`.
       * @param enabled \`true\` to enable, \`false\` to disable. Default: \`true\`.
       */
      `,
      options: [
        {
          contexts: [
            'any',
          ],
          mainDescription: '/^[A-Z`-].*\\.$/us',
          matchDescription: '^([A-Z`-].*(\\.|:)|-\\s.*)$',
          tags: {
            param: true,
            returns: true,
          },
        },
      ],
    },

    // https://github.com/gajus/eslint-plugin-jsdoc/issues/692#issuecomment-780081285
    {
      code: `
      /** Wrap attributes threshold. */
      const quux = {};
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
         * @constructor
         * @todo Ok.
         */
        function quux () {
        }
      `,
      options: [
        {
          mainDescription: false,
          tags: {
            todo: true,
          },
        },
      ],
    },
    {
      code: `
        /** Does something very important. */
        function foo(): string;
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[endLine!=0]',
            },
          ],
          matchDescription: '^\\S[\\s\\S]*\\S$',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
        /**
         * This is my favorite function, foo.
         *
         * @returns Nothing.
         */
        function foo(): void;
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[endLine!=0]:not(:has(JsdocTag))',
            },
          ],
          matchDescription: '^\\S[\\s\\S]*\\S$',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
          /**
           * @copyright
           */
          function quux () {
          }
      `,
      options: [
        {
          nonemptyTags: false,
        },
      ],
    },
  ],
});
