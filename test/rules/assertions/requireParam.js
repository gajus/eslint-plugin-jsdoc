export default {
  invalid: [
    {
      code: `
          /**
           *
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.'
        }
      ]
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @arg "foo" declaration.'
        }
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: 'arg'
          }
        }
      }
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo, bar) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "bar" declaration.'
        }
      ]
    },
    {
      code: `
          /**
           * @override
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.'
        }
      ],
      settings: {
        jsdoc: {
          allowOverrideWithoutParam: false
        }
      }
    },
    {
      code: `
          /**
           * @implements
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.'
        }
      ],
      settings: {
        jsdoc: {
          allowImplementsWithoutParam: false
        }
      }
    },
    {
      code: `
          /**
           * @augments
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.'
        }
      ]
    },
    {
      code: `
          /**
           * @extends
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.'
        }
      ]
    },
    {
      code: `
          /**
           * @override
           */
          class A {
            /**
              *
              */
            quux (foo) {

            }
          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.'
        }
      ],
      settings: {
        jsdoc: {
          allowOverrideWithoutParam: false
        }
      }
    },
    {
      code: `
          /**
           * @implements
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.'
        }
      ],
      settings: {
        jsdoc: {
          allowImplementsWithoutParam: false
        }
      }
    },
    {
      code: `
          /**
           * @augments
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.'
        }
      ]
    },
    {
      code: `
          /**
           * @extends
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.'
        }
      ]
    }
  ],
  valid: [
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * @inheritdoc
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * @arg foo
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: 'arg'
          }
        }
      }
    },
    {
      code: `
          /**
           * @override
           * @param foo
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * @override
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * @override
           */
          class A {
            /**
              *
              */
            quux (foo) {

            }
          }
      `
    },
    {
      code: `
          /**
           * @override
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          allowOverrideWithoutParam: true
        }
      }
    },
    {
      code: `
          /**
           * @implements
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `
    },
    {
      code: `
          /**
           * @implements
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * @implements
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          allowImplementsWithoutParam: true
        }
      }
    },
    {
      code: `
          /**
           * @implements
           * @param foo
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * @augments
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          allowAugmentsExtendsWithoutParam: true
        }
      }
    },
    {
      code: `
          /**
           * @augments
           * @param foo
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * @extends
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          allowAugmentsExtendsWithoutParam: true
        }
      }
    },
    {
      code: `
          /**
           * @extends
           * @param foo
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * @augments
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          augmentsExtendsReplacesDocs: true
        }
      }
    },
    {
      code: `
          /**
           * @extends
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          augmentsExtendsReplacesDocs: true
        }
      }
    },
    {
      code: `
          /**
           * @override
           */
          class A {
            /**
            * @param foo
            */
            quux (foo) {

            }
          }
      `
    },
    {
      code: `
          /**
           * @override
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
      settings: {
        jsdoc: {
          allowOverrideWithoutParam: true
        }
      }
    },
    {
      code: `
          /**
           * @implements
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
      settings: {
        jsdoc: {
          allowImplementsWithoutParam: true
        }
      }
    },
    {
      code: `
        /**
         * @implements
         */
        class A {
          /**
           * @param foo
           */
          quux (foo) {

          }
        }
      `
    },
    {
      code: `
          /**
           * @augments
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
      settings: {
        jsdoc: {
          allowAugmentsExtendsWithoutParam: true
        }
      }
    },
    {
      code: `
        /**
         * @augments
         */
        class A {
          /**
           * @param foo
           */
          quux (foo) {

          }
        }
      `
    },
    {
      code: `
          /**
           * @extends
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
      settings: {
        jsdoc: {
          allowAugmentsExtendsWithoutParam: true
        }
      }
    },
    {
      code: `
          /**
           * @extends
           */
          class A {
            /**
             * @param foo
             */
            quux (foo) {

            }
          }
      `
    },
    {
      code: `
          /**
           * @augments
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
      settings: {
        jsdoc: {
          augmentsExtendsReplacesDocs: true
        }
      }
    },
    {
      code: `
          /**
           * @extends
           */
          class A {
            /**
             *
             */
            quux (foo) {

            }
          }
      `,
      settings: {
        jsdoc: {
          augmentsExtendsReplacesDocs: true
        }
      }
    },
    {
      code: `
          /**
           * @private
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          ignorePrivate: true
        }
      }
    },
    {
      code: `
          // issue 182: optional chaining
          /** @const {boolean} test */
          const test = something?.find(_ => _)
      `,
      parser: 'babel-eslint'
    },
    {
      code: `
          /** @type {RequestHandler} */
          function foo(req, res, next) {}
      `
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
          exemptedBy: ['type']
        }
      ]
    },
    {
      code: `
          /**
           * @override
           */
          var A = class {
            /**
              *
              */
            quux (foo) {

            }
          }
      `
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
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module'
      }
    }
  ]
};
