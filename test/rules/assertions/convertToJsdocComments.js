import {parser as typescriptEslintParser} from 'typescript-eslint';

export default {
  invalid: [
    {
      code: `
        // A single line comment
        function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Line comments should be JSDoc-style.',
        },
      ],
      options: [
        {
          enforceJsdocLineStyle: 'single'
        }
      ],
      output: `
        /** A single line comment */
        function quux () {}
      `
    },
    {
      code: `
        // A single line comment
        function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Line comments should be JSDoc-style.',
        },
      ],
      options: [
        {
          contexts: [
            {
              context: 'FunctionDeclaration',
              inlineCommentBlock: true
            }
          ]
        }
      ],
      output: `
        /** A single line comment */
        function quux () {}
      `
    },
    {
      code: `
        // A single line comment
        function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Line comments should be JSDoc-style.',
        },
      ],
      options: [
        {
          enableFixer: false,
          enforceJsdocLineStyle: 'single'
        }
      ],
    },
    {
      code: `
        // A single line comment
        function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Line comments should be JSDoc-style.',
        },
      ],
      options: [
        {
          lineOrBlockStyle: 'line',
          enforceJsdocLineStyle: 'single'
        }
      ],
      output: `
        /** A single line comment */
        function quux () {}
      `
    },
    {
      code: `
        /* A single line comment */
        function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Block comments should be JSDoc-style.',
        },
      ],
      options: [
        {
          enforceJsdocLineStyle: 'single'
        }
      ],
      output: `
        /** A single line comment */
        function quux () {}
      `,
    },
    {
      code: `
        /* A single line comment */
        function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Block comments should be JSDoc-style.',
        },
      ],
      options: [
        {
          lineOrBlockStyle: 'block',
          enforceJsdocLineStyle: 'single'
        }
      ],
      output: `
        /** A single line comment */
        function quux () {}
      `,
    },
    {
      code: `
        // A single line comment
        function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Line comments should be JSDoc-style.',
        },
      ],
      options: [
        {
          enforceJsdocLineStyle: 'multi'
        }
      ],
      output: `
        /**
         * A single line comment
         */
        function quux () {}
      `,
    },
    {
      code: `
        // A single line comment
        function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Line comments should be JSDoc-style.',
        },
      ],
      output: `
        /**
         * A single line comment
         */
        function quux () {}
      `,
    },
    {
      code: `
        /* A single line comment */
        function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Block comments should be JSDoc-style.',
        },
      ],
      options: [
        {
          enforceJsdocLineStyle: 'multi'
        }
      ],
      output: `
        /**
         * A single line comment
         */
        function quux () {}
      `,
    },
    {
      code: `
          // Single line comment
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
        /* Entity to represent a user in the system. */
        @Entity('users', getVal())
        export class User {
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Block comments should be JSDoc-style.',
        },
      ],
      options: [
        {
          contexts: ['ClassDeclaration']
        }
      ],
      output: `
        /**
         * Entity to represent a user in the system.
         */
        @Entity('users', getVal())
        export class User {
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
    },
    {
      code: `
        /* A single line comment */ function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Block comments should be JSDoc-style.',
        },
      ],
      options: [
        {
          enforceJsdocLineStyle: 'single'
        }
      ],
      settings: {
        jsdoc: {
          minLines: 0,
          maxLines: 0,
        },
      },
      output: `
        /** A single line comment */ function quux () {}
      `
    },
  ],
  valid: [
    {
      code: `
        /** A single line comment */
        function quux () {}
      `,
      options: [
        {
          enforceJsdocLineStyle: 'single'
        }
      ],
    },
    {
      code: `
        /** A single line comment */
        function quux () {}
      `,
      options: [
        {
          enforceJsdocLineStyle: 'multi'
        }
      ],
    },
    {
      code: `
        /** A single line comment */
        function quux () {}
      `,
      options: [
        {
          lineOrBlockStyle: 'line',
        }
      ],
    },
    {
      code: `
        /** A single line comment */
        function quux () {}
      `,
      options: [
        {
          lineOrBlockStyle: 'block',
        }
      ],
    },
    {
      code: `
        /* A single line comment */
        function quux () {}
      `,
      options: [
        {
          lineOrBlockStyle: 'line',
          enforceJsdocLineStyle: 'single'
        }
      ],
    },
    {
      code: `
        // A single line comment
        function quux () {}
      `,
      options: [
        {
          lineOrBlockStyle: 'block',
          enforceJsdocLineStyle: 'single'
        }
      ],
    },
    {
      code: `
        // @ts-expect-error
        function quux () {}
      `,
    },
    {
      code: `
        // @custom-something
        function quux () {}
      `,
      options: [
        {
          allowedPrefixes: ['@custom-']
        }
      ],
    },
  ],
};
