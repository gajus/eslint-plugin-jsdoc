/* eslint-disable no-restricted-syntax */

export default {
  invalid: [
    {
      code: `
          /**
           * foo.
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Description must start with an uppercase character.'
        }
      ],
      output: `
          /**
           * Foo.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * Foo.
           *
           * foo.
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Paragraph must start with an uppercase character.'
        }
      ], 
      output: `
          /**
           * Foo.
           *
           * Foo.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * тест.
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Description must start with an uppercase character.'
        }
      ],
      output: `
          /**
           * Тест.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * Foo
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Sentence must end with a period.'
        }
      ],
      output: `
          /**
           * Foo.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * Foo
           * Bar.
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'A line of text is started with an uppercase character, but preceding line does not end the sentence.'
        }
      ]
    },
    {
      code: `
          /**
           * Foo.
           *
           * @param foo foo.
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Description must start with an uppercase character.'
        }
      ],
      output: `
          /**
           * Foo.
           *
           * @param foo Foo.
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * Foo.
           *
           * @returns foo.
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Description must start with an uppercase character.'
        }
      ],
      output: `
          /**
           * Foo.
           *
           * @returns Foo.
           */
          function quux (foo) {

          }
      `
    }
  ],
  valid: [
    {
      code: `
          /**
           * @param foo - Foo.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * Foo.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * Foo.
           * Bar.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * Foo.
           *
           * Bar.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * Тест.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * Foo
           * bar.
           */
          function quux () {

          }
      `
    },
    {
      // @see https://github.com/gajus/eslint-plugin-jsdoc/issues/10
      code: `
          /**
           * @returns Foo bar.
           */
          function quux () {

          }
      `
    }
  ]
};
