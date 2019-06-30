import JSDOC_THREE_TAGS from './jsdoc3Tags';

const ALL_JSDOC_TAGS_COMMENT = '/** \n * @' + JSDOC_THREE_TAGS.join('\n * @') + '\n */';

export default {
  invalid: [
    {
      code: `
        /** @typoo {string} */
        let a;
      `,
      errors: [
        {
          line: 2,
          message: 'Invalid JSDoc tag name "typoo".'
        }
      ]
    },
    {
      code: `
          /**
           * @Param
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag name "Param".'
        }
      ]
    },
    {
      code: `
          /**
           * @foo
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag name "foo".'
        }
      ]
    },
    {
      code: `
          /**
           * @arg foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag (preference). Replace "arg" JSDoc tag with "param".'
        }
      ]
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
          message: 'Invalid JSDoc tag (preference). Replace "param" JSDoc tag with "arg".'
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
           * @arg foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag (preference). Replace "arg" JSDoc tag with "somethingDifferent".'
        }
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            arg: 'somethingDifferent'
          }
        }
      }
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
          message: 'Invalid JSDoc tag (preference). Replace "param" JSDoc tag with "parameter".'
        }
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: 'parameter'
          }
        }
      }
    },
    {
      code: `
          /**
           * @bar foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag name "bar".'
        }
      ]
    },
    {
      code: `
          /**
           * @baz @bar foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag name "baz".'
        }
      ],
      settings: {
        jsdoc: {
          additionalTagNames: {
            customTags: ['bar']
          }
        }
      }
    },
    {
      code: `
            /**
             * @bar
             * @baz
             */
            function quux (foo) {

            }
        `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc tag name "baz".'
        }
      ],
      settings: {
        jsdoc: {
          additionalTagNames: {
            customTags: ['bar']
          }
        }
      }
    },
    {
      code: `
          /**
           * @todo
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Blacklisted tag found (`@todo`)'
        }
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            todo: false
          }
        }
      }
    },
    {
      code: `
          /**
           * @todo
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Please resolve to-dos or add to the tracker'
        }
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            todo: {
              message: 'Please resolve to-dos or add to the tracker'
            }
          }
        }
      }
    },
    {
      code: `
          /**
           * @todo
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Please use x-todo instead of todo'
        }
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            todo: {
              message: 'Please use {{replacement}} instead of {{tagName}}',
              replacement: 'x-todo'
            }
          }
        }
      }
    },
    {
      code: `
          /**
           * @todo
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Please use x-todo instead of todo'
        }
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            todo: {
              message: 'Please use {{preferredTagName}} instead of {{tagName}}',
              replacement: 'x-todo'
            }
          }
        }
      }
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
           * @memberof! foo
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
           * @bar foo
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          additionalTagNames: {
            customTags: ['bar']
          }
        }
      }
    },
    {
      code: `
          /**
           * @baz @bar foo
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          additionalTagNames: {
            customTags: ['baz', 'bar']
          }
        }
      }
    },
    {
      code: ALL_JSDOC_TAGS_COMMENT + '\nfunction quux (foo) {}'
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * @todo
           */
          function quux () {

          }
      `
    }
  ]
};
