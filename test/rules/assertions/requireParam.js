/* eslint-disable no-restricted-syntax */

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
      `,
      settings: {
        jsdoc: {
          allowOverrideWithoutParam: true
        }
      }
    }
  ]
};
