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
      options: [{
        baseConfig: {
          rules: {
            'no-alert': 2,
            semi: ['error', 'always'],
          },
        },
        eslintrcForExamples: false,
      }],
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
      options: [{
        baseConfig: {
          rules: {
            'no-alert': 2,
            semi: ['error', 'always'],
          },
        },
        eslintrcForExamples: false,
      }],
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
      options: [{
        baseConfig: {
          rules: {
            semi: ['error', 'never'],
          },
        },
        eslintrcForExamples: false,
        exampleCodeRegex: '```js([\\s\\S]*)```',
      }],
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
      options: [{
        baseConfig: {
          rules: {
            semi: ['error', 'never'],
          },
        },
        eslintrcForExamples: false,
        exampleCodeRegex: '```js ([\\s\\S]*)```',
      }],
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
      options: [{
        baseConfig: {
          rules: {
            semi: ['error', 'never'],
          },
        },
        eslintrcForExamples: false,
        exampleCodeRegex: '```js ([\\s\\S]*)```',
      }],
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
      options: [{
        baseConfig: {
          rules: {
            semi: ['error', 'never'],
          },
        },
        eslintrcForExamples: false,
        exampleCodeRegex: '```\njs ([\\s\\S]*)```',
      }],
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
      options: [{
        baseConfig: {
          rules: {
            semi: ['error', 'never'],
          },
        },
        eslintrcForExamples: false,
        rejectExampleCodeRegex: '^\\s*<.*>\\s*$',
      }],
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
      options: [{
        baseConfig: {
          rules: {
            'no-undef': ['error'],
          },
        },
        eslintrcForExamples: false,
        noDefaultExampleRules: true,
      }],
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
      options: [{
        captionRequired: true,
        eslintrcForExamples: false,
      }],
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
      options: [{
        baseConfig: {
          rules: {
            indent: ['error'],
          },
        },
        eslintrcForExamples: false,
        noDefaultExampleRules: false,
      }],
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
      options: [{
        eslintrcForExamples: false,
        noDefaultExampleRules: true,
        reportUnusedDisableDirectives: true,
      }],
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
      options: [{
        allowInlineConfig: false,
        baseConfig: {
          rules: {
            semi: ['error', 'always'],
          },
        },
        eslintrcForExamples: false,
        noDefaultExampleRules: true,
      }],
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
      options: [{
        matchingFileName: 'test/jsdocUtils.js',
      }],
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
          line: 3,
          message: '@example error (no-multiple-empty-lines): Too many blank lines at the beginning of file. Max of 0 allowed.',
        },
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
           * @example const i = 5;
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
      options: [{
        matchingFileName: 'test/rules/data/dummy.js',
      }],
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
      options: [{
        baseConfig: {
          rules: {
            semi: ['warn', 'always'],
          },
        },
        eslintrcForExamples: false,
        exampleCodeRegex: '// begin[\\s\\S]*// end',
        noDefaultExampleRules: true,
      }],
    },
    {
      code: `
      /**
       *
       */
      function f () {

      }
      `,
      errors: [
        {
          line: 1,
          message: '`settings.jsdoc.captionRequired` has been removed, use options in the rule `check-examples` instead.',
        },
        {
          line: 1,
          message: '`settings.jsdoc.exampleCodeRegex` has been removed, use options in the rule `check-examples` instead.',
        },
        {
          line: 1,
          message: '`settings.jsdoc.rejectExampleCodeRegex` has been removed, use options in the rule `check-examples` instead.',
        },
        {
          line: 1,
          message: '`settings.jsdoc.allowInlineConfig` has been removed, use options in the rule `check-examples` instead.',
        },
        {
          line: 1,
          message: '`settings.jsdoc.noDefaultExampleRules` has been removed, use options in the rule `check-examples` instead.',
        },
        {
          line: 1,
          message: '`settings.jsdoc.matchingFileName` has been removed, use options in the rule `check-examples` instead.',
        },
        {
          line: 1,
          message: '`settings.jsdoc.configFile` has been removed, use options in the rule `check-examples` instead.',
        },
        {
          line: 1,
          message: '`settings.jsdoc.eslintrcForExamples` has been removed, use options in the rule `check-examples` instead.',
        },
        {
          line: 1,
          message: '`settings.jsdoc.baseConfig` has been removed, use options in the rule `check-examples` instead.',
        },
        {
          line: 1,
          message: '`settings.jsdoc.reportUnusedDisableDirectives` has been removed, use options in the rule `check-examples` instead.',
        },
      ],
      settings: {
        jsdoc: {
          allowInlineConfig: true,
          baseConfig: {},
          captionRequired: false,
          configFile: 'configFile.js',
          eslintrcForExamples: true,
          exampleCodeRegex: '.*?',
          matchingFileName: 'test.md',
          noDefaultExampleRules: false,
          rejectExampleCodeRegex: '\\W*',
          reportUnusedDisableDirectives: true,
        },
      },
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
      options: [{
        captionRequired: true,
        eslintrcForExamples: false,
      }],
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
      options: [{
        baseConfig: {
          parser: '@typescript-eslint/parser',
          parserOptions: {
            ecmaVersion: 6,
          },
          rules: {
            semi: ['error', 'always'],
          },
        },
        eslintrcForExamples: false,
      }],
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
              ecmaVersion: 2015,
              sourceType: 'module',
            },
            rules: {
              semi: ['error', 'always'],
            },
          },
          eslintrcForExamples: false,
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
      options: [{
        baseConfig: {
          rules: {
            semi: ['warn', 'always'],
          },
        },
        eslintrcForExamples: false,
        exampleCodeRegex: '/\\/\\/ begin[\\s\\S]*?// end/g',
        noDefaultExampleRules: true,
      }],
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
      options: [{
        baseConfig: {
          rules: {
            semi: ['error', 'always'],
          },
        },
        eslintrcForExamples: false,
        exampleCodeRegex: '```js([\\s\\S]*)```',
      }],
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
      options: [{
        baseConfig: {
          rules: {
            semi: ['error', 'always'],
          },
        },
        eslintrcForExamples: false,
        exampleCodeRegex: '/```js([\\s\\S]*)```/',
      }],
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
      options: [{
        eslintrcForExamples: false,
      }],
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
      options: [{
        baseConfig: {
          rules: {
            'no-undef': ['error'],
          },
        },
        eslintrcForExamples: false,
        noDefaultExampleRules: false,
      }],
    },
    {
      code: `
          /**
           * @example quux();
           */
          function quux () {

          }
      `,
      options: [{
        baseConfig: {
          rules: {
            indent: ['error'],
          },
        },
        eslintrcForExamples: false,
        noDefaultExampleRules: false,
      }],
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
      options: [{
        captionRequired: true,
        eslintrcForExamples: false,
      }],
    },
    {
      code: `
      /**
       * @example test() // eslint-disable-line semi
       */
      function quux () {}
`,
      options: [{
        eslintrcForExamples: false,
        noDefaultExampleRules: true,
        reportUnusedDisableDirectives: false,
      }],
    },
    {
      code: `
      /**
       * @example
       test() // eslint-disable-line semi
       */
      function quux () {}
`,
      options: [{
        allowInlineConfig: true,
        baseConfig: {
          rules: {
            semi: ['error', 'always'],
          },
        },
        eslintrcForExamples: false,
        noDefaultExampleRules: true,
      }],
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
      options: [{
        baseConfig: {
          rules: {
            semi: ['error', 'never'],
          },
        },
        eslintrcForExamples: false,
        exampleCodeRegex: '```js([\\s\\S]*)```',
      }],
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
      options: [{
        baseConfig: {
          rules: {
            indent: ['error'],
          },
        },
        eslintrcForExamples: false,
        noDefaultExampleRules: false,
      }],
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
      options: [{
        baseConfig: {
          parser: '@typescript-eslint/parser',
          parserOptions: {
            ecmaVersion: 6,
          },
          rules: {
            semi: ['error', 'always'],
          },
        },
        eslintrcForExamples: false,
      }],
    },
  ],
};
