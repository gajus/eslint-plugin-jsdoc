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
          line: 3,
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
           * foo?
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
           * Foo?
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * @description foo.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentence should start with an uppercase character.'
        }
      ],
      output: `
          /**
           * @description Foo.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * Foo)
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentence must end with a period.'
        }
      ],
      output: `
          /**
           * Foo).
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * \`foo\` is a variable
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
           * \`foo\` is a variable.
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
          line: 5,
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
          line: 3,
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
          line: 3,
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
          line: 3,
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
          line: 5,
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
          line: 5,
          message: 'Sentence should start with an uppercase character.'
        },
        {
          line: 5,
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
           * {@see Foo.bar} buz
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentence should start with an uppercase character.'
        },
        {
          line: 3,
          message: 'Sentence must end with a period.'
        }
      ],
      output: `
          /**
           * {@see Foo.bar} Buz.
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
          line: 5,
          message: 'Sentence should start with an uppercase character.'
        },
        {
          line: 5,
          message: 'Sentence must end with a period.'
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
          line: 5,
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
          line: 3,
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
    },
    {
      code: `
          /**
           * @arg {number} foo - Foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentence must end with a period.'
        }
      ],
      output: `
          /**
           * @arg {number} foo - Foo.
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * @argument {number} foo - Foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentence must end with a period.'
        }
      ],
      output: `
          /**
           * @argument {number} foo - Foo.
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * @return {number} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentence should start with an uppercase character.'
        },
        {
          line: 3,
          message: 'Sentence must end with a period.'
        }
      ],
      output: `
          /**
           * @return {number} Foo.
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * Returns bar.
           *
           * @return {number} bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'Sentence should start with an uppercase character.'
        },
        {
          line: 5,
          message: 'Sentence must end with a period.'
        }
      ],
      output: `
          /**
           * Returns bar.
           *
           * @return {number} Bar.
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
    },
    {
      code: `
          /**
           * Foo. {@see Math.sin}.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * Foo {@see Math.sin} bar.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * Foo?
           *
           * Bar!
           *
           * Baz:
           *   1. Foo.
           *   2. Bar.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * Hello:
           * World.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * Hello: world.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           *
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * @description Foo.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * \`foo\` is a variable.
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
           * \`foo\`.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * @param foo - \`bar\`.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * @returns {number} \`foo\`.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * Foo
           * \`bar\`.
           */
          function quux () {

          }
      `
    }
  ]
};
