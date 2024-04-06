import * as typescriptEslintParser from '@typescript-eslint/parser';

export default {
  invalid: [
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
          message: 'Missing JSDoc @description declaration.',
        },
      ],
      options: [
        {
          descriptionStyle: 'tag',
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
          message: 'Missing JSDoc block description or @description declaration.',
        },
      ],
      options: [
        {
          descriptionStyle: 'any',
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
          message: 'Missing JSDoc block description.',
        },
      ],
      options: [
        {
          descriptionStyle: 'body',
        },
      ],
    },
    {
      code: `
          /**
           * @desc Not a blank description
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Remove the @desc tag to leave a plain block description or add additional description text above the @desc line.',
        },
      ],
      options: [
        {
          descriptionStyle: 'body',
        },
      ],
    },
    {
      code: `
          /**
           * @description Not a blank description
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Remove the @description tag to leave a plain block description or add additional description text above the @description line.',
        },
      ],
      options: [
        {
          descriptionStyle: 'body',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          class quux {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @description declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'ClassDeclaration',
          ],
          descriptionStyle: 'tag',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          class quux {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @description declaration.',
        },
      ],
      options: [
        {
          descriptionStyle: 'tag',
        },
      ],
      settings: {
        jsdoc: {
          contexts: [
            'ClassDeclaration',
          ],
        },
      },
    },
    {
      code: `
          /**
           *
           */
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @description declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
          descriptionStyle: 'tag',
        },
      ],
    },
    {
      code: `
          /**
           * @description
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @description description.',
        },
      ],
      options: [
        {
          descriptionStyle: 'tag',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          interface quux {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @description declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'TSInterfaceDeclaration',
          ],
          descriptionStyle: 'tag',
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
          var quux = class {

          };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @description declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'ClassExpression',
          ],
          descriptionStyle: 'tag',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          var quux = {

          };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @description declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'ObjectExpression',
          ],
          descriptionStyle: 'tag',
        },
      ],
    },
    {
      code: `
          /**
           * @someDesc
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @someDesc description.',
        },
      ],
      options: [
        {
          descriptionStyle: 'tag',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            description: {
              message: 'Please avoid `{{tagName}}`; use `{{replacement}}` instead',
              replacement: 'someDesc',
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * @description
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected tag `@description`',
        },
      ],
      options: [
        {
          descriptionStyle: 'tag',
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
           * @description
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc block description or @description declaration.',
        },
      ],
      options: [
        {
          descriptionStyle: 'any',
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
           *
           */
          function quux () {
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc block description.',
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
        class TestClass {
          /**
           *
           */
          constructor() { }
        }
        `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc block description.',
        },
      ],
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
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc block description.',
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
        get Test() { }
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc block description.',
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
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc block description.',
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
      class TestClass {
        /**
         *
         */
        set Test(value) { }
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc block description.',
        },
      ],
    },
    {
      code: `
      class TestClass {
        /**
         *
         */
        set Test(value) { }
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc block description.',
        },
      ],
      options: [
        {
          checkSetters: true,
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      class Foo {
          /**
           *
           */
          constructor() {}

          /**
           *
           */
          bar() {}
      }
      `,
      errors: [
        {
          line: 11,
          message: 'Missing JSDoc block description.',
        },
      ],
      options: [
        {
          checkConstructors: false,
          contexts: [
            'MethodDefinition',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * @implements {Bar}
           */
          class quux {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @description declaration.',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTag[rawType="Bar"])',
              context: 'ClassDeclaration',
            },
          ],
          descriptionStyle: 'tag',
        },
      ],
      settings: {
        jsdoc: {
          implementsReplacesDocs: false,
        },
      },
    },
    {
      code: `
          /**
           * Has some
           *   description already.
           * @implements {Bar}
           */
          class quux {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @description declaration.',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTag[rawType="Bar"])',
              context: 'ClassDeclaration',
            },
          ],
          descriptionStyle: 'tag',
        },
      ],
      settings: {
        jsdoc: {
          implementsReplacesDocs: false,
        },
      },
    },
    {
      code: `
          /**
           * @implements {Bar
           *   | Foo}
           */
          class quux {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @description declaration.',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTypeUnion > JsdocTypeName[value="Bar"]:nth-child(1))',
              context: 'ClassDeclaration',
            },
          ],
          descriptionStyle: 'tag',
        },
      ],
      settings: {
        jsdoc: {
          implementsReplacesDocs: false,
        },
      },
    },
    {
      code: `
          /**
           * @implements {Bar}
           */
          class quux {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @description declaration.',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTag[tag="implements"])',
              context: 'ClassDeclaration',
            },
          ],
          descriptionStyle: 'tag',
        },
      ],
      settings: {
        jsdoc: {
          implementsReplacesDocs: false,
        },
      },
    },
    {
      code: `
          /**
           * @implements {Bar}
           */
          class quux {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @description declaration.',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTag[tag="implements"])',
              context: 'any',
            },
          ],
          descriptionStyle: 'tag',
        },
      ],
      settings: {
        jsdoc: {
          implementsReplacesDocs: false,
        },
      },
    },
    {
      code: `
        app.use(
          /** @type {express.ErrorRequestHandler} */
          (err, req, res, next) => {
            // foo
          }
        );
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc block description.',
        },
      ],
    },
    {
      code: `
        app.use(
          /** @type {express.ErrorRequestHandler} */
          (
            (err, req, res, next) => {
              // foo
            }
          )
        );
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc block description.',
        },
      ],
    },
    {
      code: `
        /** @type {TreeViewItemData[]} */
        this.treeViewSelection = [];
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc block description.',
        },
      ],
      options: [
        {
          contexts: [
            'AssignmentExpression',
          ],
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
           * @description
           * // arbitrary description content
           */
          function quux () {

          }
      `,
      options: [
        {
          descriptionStyle: 'tag',
        },
      ],
    },
    {
      code: `
          /**
           * @description
           * quux(); // does something useful
           */
          function quux () {

          }
      `,
      options: [
        {
          descriptionStyle: 'tag',
        },
      ],
    },
    {
      code: `
          /**
           * @description <caption>Valid usage</caption>
           * quux(); // does something useful
           *
           * @description <caption>Invalid usage</caption>
           * quux('random unwanted arg'); // results in an error
           */
          function quux () {

          }
      `,
      options: [
        {
          descriptionStyle: 'tag',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          class quux {

          }
      `,
      options: [
        {
          descriptionStyle: 'tag',
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
           *
           */
          interface quux {

          }
      `,
      options: [
        {
          descriptionStyle: 'tag',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser
      },
    },
    {
      code: `
          interface quux {
            /**
             * If the thing should be checked.
             */
            checked?: boolean
          }
      `,
      options: [
        {
          contexts: [
            'TSPropertySignature',
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
          var quux = class {

          };
      `,
      options: [
        {
          descriptionStyle: 'tag',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          var quux = {

          };
      `,
      options: [
        {
          descriptionStyle: 'tag',
        },
      ],
    },
    {
      code: `
          /**
           * Has an implicit description
           */
          function quux () {

          }
      `,
      options: [
        {
          descriptionStyle: 'body',
        },
      ],
    },
    {
      code: `
          /**
           * Has an implicit description
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Has an implicit description
           */
          function quux () {

          }
      `,
      options: [
        {
          descriptionStyle: 'any',
        },
      ],
    },
    {
      code: `
          /**
           * @description Has an explicit description
           */
          function quux () {

          }
      `,
      options: [
        {
          descriptionStyle: 'any',
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
        class TestClass {
          /**
           * Test.
           */
          constructor() { }
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
         * Test.
         */
        get Test() { }
      }
      `,
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
      options: [
        {
          checkGetters: false,
        },
      ],
    },
    {
      code: `
      class TestClass {
        /**
         * Test.
         */
        set Test(value) { }
      }
      `,
    },
    {
      code: `
      class TestClass {
        /**
         *
         */
        set Test(value) { }
      }
      `,
      options: [
        {
          checkSetters: false,
        },
      ],
    },
    {
      code: `
          /**
           * Multi
           * line
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /** Single line */
          function quux () {

          }
      `,
    },
    {
      code: `
          /** @description something */
          function quux () {

          }
      `,
      options: [
        {
          descriptionStyle: 'tag',
        },
      ],
    },
    {
      code: `
          /**
           * @implements {Bar}
           */
          class quux {

          }
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[postDelimiter=/\\s{4}/]:has(JsdocTag[rawType="class"])',
              context: 'ClassDeclaration',
            },
          ],
          descriptionStyle: 'tag',
        },
      ],
      settings: {
        jsdoc: {
          implementsReplacesDocs: false,
        },
      },
    },
    {
      code: `
          /**
           * Has some
           *   description already.
           */
          class quux {

          }
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTag[rawType="{Bar}"])',
              context: 'ClassDeclaration',
            },
          ],
          descriptionStyle: 'tag',
        },
      ],
    },
    {
      code: `
          /**
           * Has some
           *   description already.
           */
          class quux {

          }
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTag[rawType="{Bar}"])',
              context: 'any',
            },
          ],
          descriptionStyle: 'tag',
        },
      ],
    },
    {
      code: `
          /**
           * Has some
           *   description already.
           */
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock[postDelimiter=""]:has(JsdocTag[rawType="{Bar}"])',
              context: 'any',
            },
          ],
          descriptionStyle: 'tag',
        },
      ],
    },
  ],
};
