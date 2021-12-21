// Change `process.cwd()` when testing `checkEslintrc: true`
process.chdir('test/rules/data');

export default {
  invalid: [
    {
      code: `
          /**
           * @example alert('hello')
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: '@example error (no-alert): Unexpected alert.',
        },
        {
          line: 3,
          message: '@example error (semi): Missing semicolon.',
        },
      ],
      options: [
        {
          baseConfig: {
            rules: {
              'no-alert': 2,
              semi: [
                'error', 'always',
              ],
            },
          },
          checkEslintrc: false,
        },
      ],
    },
    {
      code: `
          /**
           * @example alert('hello')
           */
          class quux {

          }
      `,
      errors: [
        {
          line: 3,
          message: '@example error (no-alert): Unexpected alert.',
        },
        {
          line: 3,
          message: '@example error (semi): Missing semicolon.',
        },
      ],
      options: [
        {
          baseConfig: {
            rules: {
              'no-alert': 2,
              semi: [
                'error', 'always',
              ],
            },
          },
          checkEslintrc: false,
        },
      ],
    },
    {
      code: `
          /**
           * @example \`\`\`js
           alert('hello');
           \`\`\`
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 4,
          message: '@example error (semi): Extra semicolon.',
        },
      ],
      options: [
        {
          baseConfig: {
            rules: {
              semi: [
                'error', 'never',
              ],
            },
          },
          checkEslintrc: false,
          exampleCodeRegex: '```js([\\s\\S]*)```',
        },
      ],
    },
    {
      code: `
          /**
           * @example
           *
           * \`\`\`js alert('hello'); \`\`\`
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 5,
          message: '@example error (semi): Extra semicolon.',
        },
      ],
      options: [
        {
          baseConfig: {
            rules: {
              semi: [
                'error', 'never',
              ],
            },
          },
          checkEslintrc: false,
          exampleCodeRegex: '```js ([\\s\\S]*)```',
        },
      ],
    },
    {
      code: `
          /**
           * @example
           * \`\`\`js alert('hello'); \`\`\`
           */
          var quux = {

          };
      `,
      errors: [
        {
          line: 4,
          message: '@example error (semi): Extra semicolon.',
        },
      ],
      options: [
        {
          baseConfig: {
            rules: {
              semi: [
                'error', 'never',
              ],
            },
          },
          checkEslintrc: false,
          exampleCodeRegex: '```js ([\\s\\S]*)```',
        },
      ],
    },
    {
      code: `
          /**
           * @example \`\`\`
           * js alert('hello'); \`\`\`
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 4,
          message: '@example error (semi): Extra semicolon.',
        },
      ],
      options: [
        {
          baseConfig: {
            rules: {
              semi: [
                'error', 'never',
              ],
            },
          },
          checkEslintrc: false,
          exampleCodeRegex: '```\njs ([\\s\\S]*)```',
        },
      ],
    },
    {
      code: `
          /**
           * @example <b>Not JavaScript</b>
           */
          function quux () {

          }
          /**
           * @example quux2();
           */
          function quux2 () {

          }
      `,
      errors: [
        {
          line: 9,
          message: '@example error (semi): Extra semicolon.',
        },
      ],
      options: [
        {
          baseConfig: {
            rules: {
              semi: [
                'error', 'never',
              ],
            },
          },
          checkEslintrc: false,
          rejectExampleCodeRegex: '^\\s*<.*>\\s*$',
        },
      ],
    },
    {
      code: `
          /**
           * @example
           * quux(); // does something useful
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 4,
          message: '@example error (no-undef): \'quux\' is not defined.',
        },
      ],
      options: [
        {
          baseConfig: {
            rules: {
              'no-undef': [
                'error',
              ],
            },
          },
          checkEslintrc: false,
          noDefaultExampleRules: true,
        },
      ],
    },
    {
      code: `
          /**
           * @example <caption>Valid usage</caption>
           * quux(); // does something useful
           *
           * @example
           * quux('random unwanted arg'); // results in an error
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 6,
          message: 'Caption is expected for examples.',
        },
      ],
      options: [
        {
          captionRequired: true,
          checkEslintrc: false,
        },
      ],
    },
    {
      code: `
          /**
           * @example  quux();
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: '@example error (indent): Expected indentation of 0 spaces but found 1.',
        },
      ],
      options: [
        {
          baseConfig: {
            rules: {
              indent: [
                'error',
              ],
            },
          },
          checkEslintrc: false,
          noDefaultExampleRules: false,
        },
      ],
    },
    {
      code: `
      /**
       * @example test() // eslint-disable-line semi
       */
      function quux () {}
`,
      errors: [
        {
          line: 3,
          message: '@example error: Unused eslint-disable directive (no problems were reported from \'semi\').',
        },
      ],
      options: [
        {
          checkEslintrc: false,
          noDefaultExampleRules: true,
          reportUnusedDisableDirectives: true,
        },
      ],
    },
    {
      code: `
      /**
       * @example
       test() // eslint-disable-line semi
       */
      function quux () {}
`,
      errors: [
        {
          line: 4,
          message: '@example error (semi): Missing semicolon.',
        },
      ],
      options: [
        {
          allowInlineConfig: false,
          baseConfig: {
            rules: {
              semi: [
                'error', 'always',
              ],
            },
          },
          checkEslintrc: false,
          noDefaultExampleRules: true,
        },
      ],
    },
    {
      code: `
          /**
           * @example const i = 5;
           * quux2()
           */
          function quux2 () {

          }
      `,
      errors: [
        {
          line: 3,
          message: '@example warning (id-length): Identifier name \'i\' is too short (< 2).',
        },
        {
          line: 4,
          message: '@example error (semi): Missing semicolon.',
        },
      ],
      options: [
        {
          matchingFileName: '../../jsdocUtils.js',
        },
      ],
    },
    {
      code: `
          /**
           * @example const i = 5;
           * quux2()
           */
          function quux2 () {

          }
      `,
      errors: [
        {
          line: 3,
          message: '@example warning (id-length): Identifier name \'i\' is too short (< 2).',
        },
        {
          line: 4,
          message: '@example error (semi): Missing semicolon.',
        },
      ],
      options: [
        {
          configFile: '.eslintrc.json',
          matchingFileName: '../../jsdocUtils.js',
        },
      ],
    },
    {
      code: `
          /**
           * @example const i = 5;
           * quux2()
           */
          function quux2 () {

          }
      `,
      errors: [
        {
          line: 3,
          message: '@example warning (id-length): Identifier name \'i\' is too short (< 2).',
        },
        {
          line: 4,
          message: '@example error (semi): Missing semicolon.',
        },
      ],
      filename: 'test/rules/data/jsdocUtils.js',
    },
    {
      code: `
          /**
           * @example const i = 5;
           *   quux2()
           */
          function quux2 () {

          }
      `,
      errors: [
        {
          line: 3,
          message: '@example warning (id-length): Identifier name \'i\' is too short (< 2).',
        },
        {
          line: 4,
          message: '@example error (semi): Missing semicolon.',
        },
      ],
      options: [
        {
          paddedIndent: 2,
        },
      ],
    },
    {
      code: `
          /**
           * @example
           * const i = 5;
           * quux2()
           */
          function quux2 () {

          }
      `,
      errors: [
        {
          line: 4,
          message: '@example warning (id-length): Identifier name \'i\' is too short (< 2).',
        },
        {
          line: 5,
          message: '@example error (semi): Missing semicolon.',
        },
      ],
    },
    {
      code: `
          /**
           * @example const idx = 5;
           * quux2()
           */
          function quux2 () {

          }
      `,
      errors: [
        {
          line: 4,
          message: '@example error (semi): Missing semicolon.',
        },
      ],
      options: [
        {
          matchingFileName: 'dummy.js',
        },
      ],
    },
    {
      code: `
          /**
           * @example const idx = 5;
           *
           * quux2()
           */
          function quux2 () {

          }
      `,
      errors: [
        {
          line: 5,
          message: '@example error (semi): Missing semicolon.',
        },
      ],
      options: [
        {
          matchingFileName: 'dummy.js',
        },
      ],
    },
    {
      code: `
          /**
           * @example const idx = 5;
           *
           * quux2()
           */
          function quux2 () {

          }
      `,
      errors: [
        {
          line: 3,
          message: '@example error: Parsing error: The keyword \'const\' is reserved',
        },
      ],
      options: [
        {
          checkEslintrc: false,
          matchingFileName: 'dummy.js',
        },
      ],
    },
    {
      code: `
          /**
           * @example // begin
           alert('hello')
           // end
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 4,
          message: '@example warning (semi): Missing semicolon.',
        },
      ],
      options: [
        {
          baseConfig: {
            rules: {
              semi: [
                'warn', 'always',
              ],
            },
          },
          checkEslintrc: false,
          exampleCodeRegex: '// begin[\\s\\S]*// end',
          noDefaultExampleRules: true,
        },
      ],
    },
    {
      code: `
      /**
       * @typedef {string} Foo
       * @example <caption></caption>
       * 'foo'
       */
     `,
      errors: [
        {
          line: 4,
          message: 'Caption is expected for examples.',
        },
      ],
      options: [
        {
          captionRequired: true,
          checkEslintrc: false,
        },
      ],
    },
    {
      code: `
        /**
         * @example
         * const list: number[] = [1, 2, 3]
         * quux(list);
         */
        function quux () {

        }
      `,
      errors: [
        {
          line: 4,
          message: '@example error (semi): Missing semicolon.',
        },
      ],
      options: [
        {
          baseConfig: {
            parser: '@typescript-eslint/parser',
            parserOptions: {
              ecmaVersion: 6,
            },
            rules: {
              semi: [
                'error', 'always',
              ],
            },
          },
          checkEslintrc: false,
        },
      ],
    },
    {
      code: `
        /**
         * @example
         * const test = something.find((_) => {
         *   return _
         * });
         */
        function quux () {

        }
      `,
      errors: [
        {
          line: 5,
          message: '@example error (semi): Missing semicolon.',
        },
      ],
      options: [
        {
          baseConfig: {
            parserOptions: {
              ecmaVersion: 6,
            },
            rules: {
              semi: [
                'error', 'always',
              ],
            },
          },
        },
      ],
    },
    {
      code: `
      /**
       * @example <caption>Say \`Hello!\` to the user.</caption>
       * First, import the function:
       *
       * \`\`\`js
       * import popup from './popup'
       * const aConstInSameScope = 5;
       * \`\`\`
       *
       * Then use it like this:
       *
       * \`\`\`js
       * const aConstInSameScope = 7;
       * popup('Hello!')
       * \`\`\`
       *
       * Here is the result on macOS:
       *
       * ![Screenshot](path/to/screenshot.jpg)
       */
      `,
      errors: [
        {
          line: 7,
          message: '@example error (semi): Missing semicolon.',
        },
        {
          line: 15,
          message: '@example error (semi): Missing semicolon.',
        },
      ],
      options: [
        {
          baseConfig: {
            parserOptions: {
              ecmaVersion: 2_015,
              sourceType: 'module',
            },
            rules: {
              semi: [
                'error', 'always',
              ],
            },
          },
          checkEslintrc: false,
          exampleCodeRegex: '/^```(?:js|javascript)\\n([\\s\\S]*?)```$/gm',
        },
      ],
    },
    {
      code: `
          /**
           * @example // begin
           alert('hello')
           // end
           * And here is another example:
           // begin
           alert('there')
           // end
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 4,
          message: '@example warning (semi): Missing semicolon.',
        },
        {
          line: 8,
          message: '@example warning (semi): Missing semicolon.',
        },
      ],
      options: [
        {
          baseConfig: {
            rules: {
              semi: [
                'warn', 'always',
              ],
            },
          },
          checkEslintrc: false,
          exampleCodeRegex: '/\\/\\/ begin[\\s\\S]*?// end/g',
          noDefaultExampleRules: true,
        },
      ],
    },
    {
      code: `
          /**
           * @example
           *   quux();
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 4,
          message: '@example error (indent): Expected indentation of 0 spaces but found 2.',
        },
      ],
      options: [
        {
          baseConfig: {
            rules: {
              indent: [
                'error',
              ],
            },
          },
          checkEslintrc: false,
          noDefaultExampleRules: false,
        },
      ],
    },
    {
      code: `
          /**
           * @default 'abc'
           */
          const str = 'abc';
      `,
      errors: [
        {
          line: 2,
          message: '@default error (quotes): Strings must use doublequote.',
        },
      ],
      options: [
        {
          checkDefaults: true,
        },
      ],
    },
    {
      code: `
          /**
           * @param {myType} [name='abc']
           */
          function quux () {
          }
      `,
      errors: [
        {
          line: 2,
          message: '@param error (quotes): Strings must use doublequote.',
        },
      ],
      options: [
        {
          checkParams: true,
        },
      ],
    },
    {
      code: `
          /**
           * @property {myType} [name='abc']
           */
          const obj = {};
      `,
      errors: [
        {
          line: 2,
          message: '@property error (quotes): Strings must use doublequote.',
        },
      ],
      options: [
        {
          checkProperties: true,
        },
      ],
    },
    {
      code: `
      /**
       * Test function.
       *
       * @example <caption>functionName (paramOne: string, paramTwo?: any,
       * paramThree?: any): boolean</caption> test()
       *
       * @param {string} paramOne Parameter description.
       * @param {any} [paramTwo] Parameter description.
       * @param {any} [paramThree] Parameter description.
       * @returns {boolean} Return description.
       */
      const functionName = function (paramOne, paramTwo,
        paramThree) {
        return false;
      };
      `,
      errors: [
        {
          line: 6,
          message: '@example error (semi): Missing semicolon.',
        },
      ],
      options: [
        {
          baseConfig: {
            parserOptions: {
              ecmaVersion: 2_015,
              sourceType: 'module',
            },
            rules: {
              semi: [
                'error', 'always',
              ],
            },
          },
          captionRequired: true,
          checkEslintrc: false,
        },
      ],
    },
  ],
  valid: [
    {
      code: `
          /**
           * @example \`\`\`js
           alert('hello');
           \`\`\`
           */
          function quux () {

          }
      `,
      options: [
        {
          baseConfig: {
            rules: {
              semi: [
                'error', 'always',
              ],
            },
          },
          checkEslintrc: false,
          exampleCodeRegex: '```js([\\s\\S]*)```',
        },
      ],
    },
    {
      code: `
          /**
           * @example \`\`\`js
           alert('hello');
           \`\`\`
           */
          function quux () {

          }
      `,
      options: [
        {
          baseConfig: {
            rules: {
              semi: [
                'error', 'always',
              ],
            },
          },
          checkEslintrc: false,
          exampleCodeRegex: '/```js([\\s\\S]*)```/',
        },
      ],
    },
    {
      code: `
          /**
           * @example
           * // arbitrary example content
           */
          function quux () {

          }
      `,
      options: [
        {
          checkEslintrc: false,
        },
      ],
    },
    {
      code: `
          /**
           * @example
           * quux(); // does something useful
           */
          function quux () {

          }
      `,
      options: [
        {
          baseConfig: {
            rules: {
              'no-undef': [
                'error',
              ],
            },
          },
          checkEslintrc: false,
          noDefaultExampleRules: false,
        },
      ],
    },
    {
      code: `
          /**
           * @example quux();
           */
          function quux () {

          }
      `,
      options: [
        {
          baseConfig: {
            rules: {
              indent: [
                'error',
              ],
            },
          },
          checkEslintrc: false,
          noDefaultExampleRules: false,
        },
      ],
    },
    {
      code: `
          /**
           * @example <caption>Valid usage</caption>
           * quux(); // does something useful
           *
           * @example <caption>Invalid usage</caption>
           * quux('random unwanted arg'); // results in an error
           */
          function quux () {

          }
      `,
      options: [
        {
          captionRequired: true,
          checkEslintrc: false,
        },
      ],
    },
    {
      code: `
      /**
       * @example test() // eslint-disable-line semi
       */
      function quux () {}
`,
      options: [
        {
          checkEslintrc: false,
          noDefaultExampleRules: true,
          reportUnusedDisableDirectives: false,
        },
      ],
    },
    {
      code: `
      /**
       * @example
       test() // eslint-disable-line semi
       */
      function quux () {}
`,
      options: [
        {
          allowInlineConfig: true,
          baseConfig: {
            rules: {
              semi: [
                'error', 'always',
              ],
            },
          },
          checkEslintrc: false,
          noDefaultExampleRules: true,
        },
      ],
    },
    {
      code: `
          /**
           * @example \`\`\`js
           alert('hello')
           \`\`\`
           */
          var quux = {

          };
      `,
      options: [
        {
          baseConfig: {
            rules: {
              semi: [
                'error', 'never',
              ],
            },
          },
          checkEslintrc: false,
          exampleCodeRegex: '```js([\\s\\S]*)```',
        },
      ],
    },
    {
      code: `
     /**
      * @example
      * foo(function (err) {
      *     throw err;
      * });
      */
     function quux () {}
`,
      options: [
        {
          baseConfig: {
            rules: {
              indent: [
                'error',
              ],
            },
          },
          checkEslintrc: false,
          noDefaultExampleRules: false,
        },
      ],
    },
    {
      code: `
        /**
         * @example
         * const list: number[] = [1, 2, 3];
         * quux(list);
         */
        function quux () {

        }
      `,
      options: [
        {
          baseConfig: {
            parser: '@typescript-eslint/parser',
            parserOptions: {
              ecmaVersion: 6,
            },
            rules: {
              semi: [
                'error', 'always',
              ],
            },
          },
          checkEslintrc: false,
        },
      ],
    },
    {
      code: `
          /**
           * @example const ident = 5;
           *   quux2();
           *   bar();
           */
          function quux2 () {

          }
      `,
      options: [
        {
          paddedIndent: 2,
        },
      ],
    },
    {
      code: `
          /**
           * @example
           * function quux() {
           *     bar();
           * }
           */
          function quux () {

          }
      `,
      options: [
        {
          baseConfig: {
            rules: {
              indent: [
                'error',
              ],
            },
          },
          checkEslintrc: false,
          noDefaultExampleRules: false,
        },
      ],
    },
    {
      code: `
      // Comment
      a();

      export default {};
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
      function f () {

      }
      `,
    },
    {
      code: `
      /**
       * Does quux
       * @example
       * // Do it!
       * quux();
       */
      function quux () {
      }
      `,
      options: [
        {
          baseConfig: {
            plugins: [
              'jsdoc',
            ],
            rules: {
              'jsdoc/require-file-overview': [
                'error',
              ],
            },
          },
          checkEslintrc: false,
          noDefaultExampleRules: false,
        },
      ],
    },
    {
      code: `
          /**
           * @default "abc"
           */
          const str = 'abc';
      `,
      options: [
        {
          checkDefaults: true,
        },
      ],
    },
    {
      code: `
          /**
           * @default
           */
          const str = 'abc';
      `,
      options: [
        {
          checkDefaults: true,
        },
      ],
    },
    {
      code: `
          /**
           * @param {myType} [name="abc"]
           */
          function quux () {
          }
      `,
      options: [
        {
          checkParams: true,
        },
      ],
    },
    {
      code: `
          /**
           * @param {myType} name
           */
          function quux () {
          }
      `,
      options: [
        {
          checkParams: true,
        },
      ],
    },
    {
      code: `
          /**
           * @property {myType} [name="abc"]
           */
          const obj = {};
      `,
      options: [
        {
          checkProperties: true,
        },
      ],
    },
    {
      code: `
          /**
           * @property {myType} [name]
           */
          const obj = {};
      `,
      options: [
        {
          checkProperties: true,
        },
      ],
    },
    {
      code: `
          /**
           * @default 'abc'
           */
          const str = 'abc';
      `,
      options: [
        {
          checkDefaults: false,
          matchingFileNameDefaults: 'dummy.js',
        },
      ],
    },
    {
      code: `
          /**
           * @param {myType} [name='abc']
           */
          function quux () {
          }
      `,
      options: [
        {
          checkParams: false,
          matchingFileNameParams: 'dummy.js',
        },
      ],
    },
    {
      code: `
          /**
           * @property {myType} [name='abc']
           */
          const obj = {};
      `,
      options: [
        {
          checkProperties: false,
          matchingFileNameProperties: 'dummy.js',
        },
      ],
    },
    {
      code: `
      /**
       * Test function.
       *
       * @example <caption>functionName (paramOne: string, paramTwo?: any,
       * paramThree?: any): boolean</caption> test();
       *
       * @param {string} paramOne Parameter description.
       * @param {any} [paramTwo] Parameter description.
       * @param {any} [paramThree] Parameter description.
       * @returns {boolean} Return description.
       */
      const functionName = function (paramOne, paramTwo,
        paramThree) {
        return false;
      };
      `,
      options: [
        {
          baseConfig: {
            parserOptions: {
              ecmaVersion: 2_015,
              sourceType: 'module',
            },
            rules: {
              semi: [
                'error', 'always',
              ],
            },
          },
          captionRequired: true,
          checkEslintrc: false,
        },
      ],
    },
  ],
};
