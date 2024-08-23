/* eslint-disable no-useless-concat */
import {
  parser as typescriptEslintParser,
} from 'typescript-eslint';

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
          enforceJsdocLineStyle: 'single',
        },
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
          contexts: [
            {
              context: 'FunctionDeclaration',
              inlineCommentBlock: true,
            },
          ],
        },
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
          enableFixer: false,
          enforceJsdocLineStyle: 'single',
        },
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
          enforceJsdocLineStyle: 'single',
          lineOrBlockStyle: 'line',
        },
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
          enforceJsdocLineStyle: 'single',
        },
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
          enforceJsdocLineStyle: 'single',
          lineOrBlockStyle: 'block',
        },
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
          enforceJsdocLineStyle: 'multi',
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
          enforceJsdocLineStyle: 'multi',
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
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'ClassDeclaration',
          ],
        },
      ],
      output: `
        /**
         * Entity to represent a user in the system.
         */
        @Entity('users', getVal())
        export class User {
        }
      `,
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
          enforceJsdocLineStyle: 'single',
        },
      ],
      output: `
        /** A single line comment */ function quux () {}
      `,
      settings: {
        jsdoc: {
          maxLines: 0,
          minLines: 0,
        },
      },
    },
    {
      code: `
        var a = []; // Test comment
      `,
      errors: [
        {
          line: 2,
          message: 'Line comments should be JSDoc-style.',
        },
      ],
      options: [
        {
          contextsAfter: [
            'VariableDeclarator',
          ],
          contextsBeforeAndAfter: [],
        },
      ],
      output: `
        /**
         * Test comment
         */
        var a = []; ` + `
      `,
    },
    {
      code: `
        var a = []; // Test comment
      `,
      errors: [
        {
          line: 2,
          message: 'Line comments should be JSDoc-style.',
        },
      ],
      options: [
        {
          contextsAfter: [
            {
              context: 'VariableDeclarator',
              inlineCommentBlock: true,
            },
          ],
          contextsBeforeAndAfter: [],
        },
      ],
      output: `
        /** Test comment */
        var a = []; ` + `
      `,
    },
    {
      code: `
        var a = []; // Test comment
      `,
      errors: [
        {
          line: 2,
          message: 'Line comments should be JSDoc-style.',
        },
      ],
      options: [
        {
          contextsAfter: [
            {
              context: 'VariableDeclarator',
              inlineCommentBlock: true,
            },
          ],
          contextsBeforeAndAfter: [],
        },
      ],
      output: `
        /** Test comment */ var a = []; ` + `
      `,
      settings: {
        jsdoc: {
          maxLines: 0,
          minLines: 0,
        },
      },
    },
    {
      code: `
        // Test comment
        var a = [];
      `,
      errors: [
        {
          line: 2,
          message: 'Line comments should be JSDoc-style.',
        },
      ],
      options: [
        {
          contextsBeforeAndAfter: [
            'VariableDeclaration',
          ],
        },
      ],
      output: `
        /**
         * Test comment
         */
        var a = [];
      `,
    },
    {
      code: `
        var a = []; // Test comment
      `,
      errors: [
        {
          line: 2,
          message: 'Line comments should be JSDoc-style.',
        },
      ],
      options: [
        {
          contextsBeforeAndAfter: [
            'VariableDeclaration',
          ],
        },
      ],
      output: `
        /**
         * Test comment
         */
        var a = []; ` + `
      `,
    },
    {
      code: `
        interface B {
          g: () => string; // Test comment
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Line comments should be JSDoc-style.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contextsBeforeAndAfter: [
            'TSPropertySignature',
          ],
        },
      ],
      output: `
        interface B {
          /**
           * Test comment
           */
          g: () => string; ` + `
        }
      `,
    },
    {
      code: `
        class TestClass {
          public Test: (id: number) => string; // Test comment
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Line comments should be JSDoc-style.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      options: [
        {
          contextsBeforeAndAfter: [
            'PropertyDefinition',
          ],
        },
      ],
      output: `
        class TestClass {
          /**
           * Test comment
           */
          public Test: (id: number) => string; ` + `
        }
      `,
    },
    {
      code: `
        var a = []; // Test comment
      `,
      errors: [
        {
          line: 2,
          message: 'Line comments should be JSDoc-style.',
        },
      ],
      options: [
        {
          contextsBeforeAndAfter: [
            'VariableDeclarator',
          ],
        },
      ],
      output: `
        /**
         * Test comment
         */
        var a = []; ` + `
      `,
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
          enforceJsdocLineStyle: 'single',
        },
      ],
    },
    {
      code: `
        /** A single line comment */
        function quux () {}
      `,
      options: [
        {
          enforceJsdocLineStyle: 'multi',
        },
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
        },
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
        },
      ],
    },
    {
      code: `
        /* A single line comment */
        function quux () {}
      `,
      options: [
        {
          enforceJsdocLineStyle: 'single',
          lineOrBlockStyle: 'line',
        },
      ],
    },
    {
      code: `
        // A single line comment
        function quux () {}
      `,
      options: [
        {
          enforceJsdocLineStyle: 'single',
          lineOrBlockStyle: 'block',
        },
      ],
    },
    {
      code: `
        // ` + `@ts-expect-error
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
          allowedPrefixes: [
            '@custom-',
          ],
        },
      ],
    },
    {
      code: `
        // Test comment
        var a = [];
      `,
      options: [
        {
          contextsAfter: [
            'VariableDeclarator',
          ],
          contextsBeforeAndAfter: [],
        },
      ],
    },
  ],
};
