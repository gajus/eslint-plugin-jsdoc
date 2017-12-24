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
          message: 'Sentence should start with an uppercase character.'
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
          message: 'Sentence should start with an uppercase character.'
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
          message: 'Sentence should start with an uppercase character.'
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
          message: 'Sentence should start with an uppercase character.'
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
           * @param foo bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Sentence should start with an uppercase character.'
        },
        {
          message: 'Sentence must end with a period.'
        }
      ],
      output: `
          /**
           * Foo.
           *
           * @param foo Bar.
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
           * @returns {number} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Sentence should start with an uppercase character.'
        },
        {
          message:  'Sentence must end with a period.'
        }
      ],
      output: `
          /**
           * Foo.
           *
           * @returns {number} Foo.
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
          message: 'Sentence should start with an uppercase character.'
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
    },
    {
      code: `
          /**
           * lorem ipsum dolor sit amet, consectetur adipiscing elit. pellentesque elit diam, 
           * iaculis eu dignissim sed, ultrices sed nisi. nulla at ligula auctor, consectetur neque sed,
           * tincidunt nibh. vivamus sit amet vulputate ligula. vivamus interdum elementum nisl,
           * vitae rutrum tortor semper ut. morbi porta ante vitae dictum fermentum.
           * proin ut nulla at quam convallis gravida in id elit. sed dolor mauris, blandit quis ante at, 
           * consequat auctor magna. duis pharetra purus in porttitor mollis.
           */
          function longDescription (foo) {

          }
      `,
      errors: [
        {
          message: 'Sentence should start with an uppercase character.'
        }
      ],
      output: `
          /**
           * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elit diam, 
           * iaculis eu dignissim sed, ultrices sed nisi. Nulla at ligula auctor, consectetur neque sed,
           * tincidunt nibh. Vivamus sit amet vulputate ligula. Vivamus interdum elementum nisl,
           * vitae rutrum tortor semper ut. Morbi porta ante vitae dictum fermentum.
           * Proin ut nulla at quam convallis gravida in id elit. Sed dolor mauris, blandit quis ante at, 
           * consequat auctor magna. Duis pharetra purus in porttitor mollis.
           */
          function longDescription (foo) {

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
