/* eslint-disable no-restricted-syntax */

import JSDOC_3_TAGS from './jsdocThreeTags';

// eslint-disable-next-line id-match
const ALL_JSDOC_TAGS_COMMENT = '/** \n * @' + JSDOC_3_TAGS.join('\n * @') + '\n */';

export default {
  invalid: [
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
           * @bar foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
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
    }
  ]
};
