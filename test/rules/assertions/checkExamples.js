/* eslint-disable no-restricted-syntax */

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
          message: '@example error (no-alert): Unexpected alert.'
        },
        {
          message: '@example error (semi): Missing semicolon.'
        }
      ],
      settings: {
        jsdoc: {
          baseConfig: {
            rules: {
              'no-alert': 2,
              semi: ['error', 'always']
            }
          },
          eslintrcForExamples: false
        }
      }
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
          message: '@example error (semi): Extra semicolon.'
        }
      ],
      settings: {
        jsdoc: {
          baseConfig: {
            rules: {
              semi: ['error', 'never']
            }
          },
          eslintrcForExamples: false,
          exampleCodeRegex: '```js([\\s\\S]*)```'
        }
      }
    },
    {
      code: `
          /**
           * @example
           * \`\`\`js alert('hello'); \`\`\`
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: '@example error (semi): Extra semicolon.'
        }
      ],
      settings: {
        jsdoc: {
          baseConfig: {
            rules: {
              semi: ['error', 'never']
            }
          },
          eslintrcForExamples: false,
          exampleCodeRegex: '```js ([\\s\\S]*)```'
        }
      }
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
          message: '@example error (semi): Extra semicolon.'
        }
      ],
      settings: {
        jsdoc: {
          baseConfig: {
            rules: {
              semi: ['error', 'never']
            }
          },
          eslintrcForExamples: false,
          exampleCodeRegex: '```\njs ([\\s\\S]*)```'
        }
      }
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
          message: '@example error (semi): Extra semicolon.'
        }
      ],
      settings: {
        jsdoc: {
          baseConfig: {
            rules: {
              semi: ['error', 'never']
            }
          },
          eslintrcForExamples: false,
          rejectExampleCodeRegex: '^\\s*<.*>$'
        }
      }
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
          message: '@example error (no-undef): \'quux\' is not defined.'
        }
      ],
      settings: {
        jsdoc: {
          baseConfig: {
            rules: {
              'no-undef': ['error']
            }
          },
          eslintrcForExamples: false,
          noDefaultExampleRules: true
        }
      }
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
          message: 'Caption is expected for examples.'
        }
      ],
      settings: {
        jsdoc: {
          captionRequired: true,
          eslintrcForExamples: false
        }
      }
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
          message: '@example error (indent): Expected indentation of 0 spaces but found 1.'
        }
      ],
      settings: {
        jsdoc: {
          baseConfig: {
            rules: {
              indent: ['error']
            }
          },
          eslintrcForExamples: false,
          noDefaultExampleRules: false
        }
      }
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
          message: '@example error: Unused eslint-disable directive (no problems were reported from \'semi\').'
        }
      ],
      settings: {
        jsdoc: {
          eslintrcForExamples: false,
          noDefaultExampleRules: true,
          reportUnusedDisableDirectives: true
        }
      }
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
          message: '@example error (semi): Missing semicolon.'
        }
      ],
      settings: {
        jsdoc: {
          allowInlineConfig: false,
          baseConfig: {
            rules: {
              semi: ['error', 'always']
            }
          },
          eslintrcForExamples: false,
          noDefaultExampleRules: true
        }
      }
    }
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
      settings: {
        jsdoc: {
          baseConfig: {
            rules: {
              semi: ['error', 'always']
            }
          },
          eslintrcForExamples: false,
          exampleCodeRegex: '```js([\\s\\S]*)```'
        }
      }
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
      settings: {
        jsdoc: {
          eslintrcForExamples: false
        }
      }
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
      settings: {
        jsdoc: {
          baseConfig: {
            rules: {
              'no-undef': ['error']
            }
          },
          eslintrcForExamples: false,
          noDefaultExampleRules: false
        }
      }
    },
    {
      code: `
          /**
           * @example quux();
           */
          function quux () {

          }
      `,
      settings: {
        jsdoc: {
          baseConfig: {
            rules: {
              indent: ['error']
            }
          },
          eslintrcForExamples: false,
          noDefaultExampleRules: false
        }
      }
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
      settings: {
        jsdoc: {
          captionRequired: true,
          eslintrcForExamples: false
        }
      }
    },
    {
      code: `
      /**
       * @example test() // eslint-disable-line semi
       */
      function quux () {}
`,
      settings: {
        jsdoc: {
          eslintrcForExamples: false,
          noDefaultExampleRules: true,
          reportUnusedDisableDirectives: false
        }
      }
    },
    {
      code: `
      /**
       * @example
       test() // eslint-disable-line semi
       */
      function quux () {}
`,
      settings: {
        jsdoc: {
          allowInlineConfig: true,
          baseConfig: {
            rules: {
              semi: ['error', 'always']
            }
          },
          eslintrcForExamples: false,
          noDefaultExampleRules: true
        }
      }
    }
  ]
};
