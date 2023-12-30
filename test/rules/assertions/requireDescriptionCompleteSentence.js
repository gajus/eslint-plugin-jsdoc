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
          message: 'Sentences should start with an uppercase character.',
        },
      ],
      output: `
          /**
           * Foo.
           */
          function quux () {

          }
      `,
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
          line: 3,
          message: 'Sentences should start with an uppercase character.',
        },
      ],
      output: `
          /**
           * Foo?
           */
          function quux () {

          }
      `,
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
          message: 'Sentences should start with an uppercase character.',
        },
      ],
      output: `
          /**
           * @description Foo.
           */
          function quux () {

          }
      `,
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
          message: 'Sentences must end with a period.',
        },
      ],
      output: `
          /**
           * Foo).
           */
          function quux () {

          }
      `,
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
          line: 3,
          message: 'Sentences must end with a period.',
        },
      ],
      output: `
          /**
           * \`foo\` is a variable.
           */
          function quux () {

          }
      `,
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
          message: 'Sentences should start with an uppercase character.',
        },
      ],
      output: `
          /**
           * Foo.
           *
           * Foo.
           */
          function quux () {

          }
      `,
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
          message: 'Sentences should start with an uppercase character.',
        },
      ],
      output: `
          /**
           * Тест.
           */
          function quux () {

          }
      `,
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
          message: 'Sentences must end with a period.',
        },
      ],
      output: `
          /**
           * Foo.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo
           *
           * @param x
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentences must end with a period.',
        },
      ],
      output: `
          /**
           * Foo.
           *
           * @param x
           */
          function quux () {

          }
      `,
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
          message: 'A line of text is started with an uppercase character, but the preceding line does not end the sentence.',
        },
      ],
      options: [
        {
          newlineBeforeCapsAssumesBadSentenceEnd: true,
        },
      ],
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
          message: 'Sentences should start with an uppercase character.',
        },
      ],
      output: `
          /**
           * Foo.
           *
           * @param foo Foo.
           */
          function quux (foo) {

          }
      `,
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
          message: 'Sentences should start with an uppercase character.',
        },
        {
          line: 5,
          message: 'Sentences must end with a period.',
        },
      ],
      output: `
          /**
           * Foo.
           *
           * @param foo Bar.
           */
          function quux (foo) {

          }
      `,
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
          message: 'Sentences must end with a period.',
        },
      ],
      output: `
          /**
           * {@see Foo.bar} buz.
           */
          function quux (foo) {

          }
      `,
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
          message: 'Sentences should start with an uppercase character.',
        },
        {
          line: 5,
          message: 'Sentences must end with a period.',
        },
      ],
      output: `
          /**
           * Foo.
           *
           * @returns {number} Foo.
           */
          function quux (foo) {

          }
      `,
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
          message: 'Sentences should start with an uppercase character.',
        },
      ],
      output: `
          /**
           * Foo.
           *
           * @returns Foo.
           */
          function quux (foo) {

          }
      `,
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
          message: 'Sentences should start with an uppercase character.',
        },
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
      `,
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
          message: 'Sentences must end with a period.',
        },
      ],
      output: `
          /**
           * @arg {number} foo - Foo.
           */
          function quux (foo) {

          }
      `,
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
          message: 'Sentences must end with a period.',
        },
      ],
      output: `
          /**
           * @argument {number} foo - Foo.
           */
          function quux (foo) {

          }
      `,
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
          message: 'Sentences should start with an uppercase character.',
        },
        {
          line: 3,
          message: 'Sentences must end with a period.',
        },
      ],
      output: `
          /**
           * @return {number} Foo.
           */
          function quux (foo) {

          }
      `,
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
          message: 'Sentences should start with an uppercase character.',
        },
        {
          line: 5,
          message: 'Sentences must end with a period.',
        },
      ],
      output: `
          /**
           * Returns bar.
           *
           * @return {number} Bar.
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
        /**
         * @throws {object} Hello World
         * hello world
        */
      `,
      errors: [
        {
          line: 3,
          message: 'Sentences must end with a period.',
        },
      ],
      output: `
        /**
         * @throws {object} Hello World
         * hello world.
        */
      `,
    },
    {
      code: `
          /**
           * @summary Foo
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentences must end with a period.',
        },
      ],
      output: `
          /**
           * @summary Foo.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @throws {SomeType} Foo
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentences must end with a period.',
        },
      ],
      output: `
          /**
           * @throws {SomeType} Foo.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @see Foo
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentences must end with a period.',
        },
      ],
      options: [
        {
          tags: [
            'see',
          ],
        },
      ],
      output: `
          /**
           * @see Foo.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
        /**
         * @param foo Foo bar
         */
        function quux (foo) {

        }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentences must end with a period.',
        },
      ],
      options: [
        {
          tags: [
            'param',
          ],
        },
      ],
      output: `
        /**
         * @param foo Foo bar.
         */
        function quux (foo) {

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
          /**
           * Sorry, but this isn't a complete sentence, Mr.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentences must end with a period.',
        },
      ],
      options: [
        {
          abbreviations: [
            'Mr',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * Sorry, but this isn't a complete sentence Mr.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentences must end with a period.',
        },
      ],
      options: [
        {
          abbreviations: [
            'Mr.',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * Sorry, but this isn't a complete sentence Mr.\u0020
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentences must end with a period.',
        },
      ],
      options: [
        {
          abbreviations: [
            'Mr',
          ],
        },
      ],
      output: `
          /**
           * Sorry, but this isn't a complete sentence Mr. .
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Sorry, but this isn't a complete sentence Mr. and Mrs.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentences must end with a period.',
        },
      ],
      options: [
        {
          abbreviations: [
            'Mr', 'Mrs',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * This is a complete sentence. But this isn't, Mr.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentences must end with a period.',
        },
      ],
      options: [
        {
          abbreviations: [
            'Mr',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * This is a complete Mr. sentence. But this isn't, Mr.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentences must end with a period.',
        },
      ],
      options: [
        {
          abbreviations: [
            'Mr',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * This is a complete Mr. sentence.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentences should start with an uppercase character.',
        },
      ],
      output: `
          /**
           * This is a complete Mr. Sentence.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * This is fun, i.e. enjoyable, but not superlatively so, e.g. not
           * super, wonderful, etc..
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Sentences should start with an uppercase character.',
        },
      ],
      output: `
          /**
           * This is fun, i.e. Enjoyable, but not superlatively so, e.g. Not
           * super, wonderful, etc..
           */
          function quux () {

          }
      `,
    },
    {
      code: `
      /**
       * Do not have dynamic content; e.g. homepage. Here a simple unique id
       * suffices.
       */
       function quux () {

       }
       `,
      errors: [
        {
          line: 3,
          message: 'Sentences should start with an uppercase character.',
        },
      ],
      output: `
      /**
       * Do not have dynamic content; e.g. Homepage. Here a simple unique id
       * suffices.
       */
       function quux () {

       }
       `,
    },
    {
      code: `
      /**
       * Implements support for the
       * Swahili voice synthesizer.
       */
      function speak() {
      }
      `,
      errors: [
        {
          line: 3,
          message: 'A line of text is started with an uppercase character, but the preceding line does not end the sentence.',
        },
      ],
      options: [
        {
          newlineBeforeCapsAssumesBadSentenceEnd: true,
        },
      ],
    },
    {
      code: `
          /**
           * Foo.
           *
           * @template TempA, TempB foo.
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'Sentences should start with an uppercase character.',
        },
      ],
      options: [
        {
          tags: [
            'template',
          ],
        },
      ],
      output: `
          /**
           * Foo.
           *
           * @template TempA, TempB Foo.
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
      /**
       * Just a component.
       * @param {Object} props Свойства.
       * @return {ReactElement}.
       */
      function quux () {}
      `,
      errors: [
        {
          line: 5,
          message: 'Sentences must be more than punctuation.',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
          /**
           * @param foo - Foo.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo.
           * Bar.
           */
          function quux () {

          }
      `,
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
      `,
    },
    {
      code: `
          /**
           * Тест.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo
           * bar.
           */
          function quux () {

          }
      `,
    },
    {
      // @see https://github.com/gajus/eslint-plugin-jsdoc/issues/10
      code: `
          /**
           * @returns Foo bar.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo {@see Math.sin}.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo {@see Math.sin} bar.
           */
          function quux () {

          }
      `,
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
      `,
    },
    {
      code: `
          /**
           * Hello:
           * World.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Hello: world.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @description Foo.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * \`foo\` is a variable.
           */
          function quux () {

          }
      `,
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
      `,
    },
    {
      code: `
          /**
           * @param foo - \`bar\`.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @returns {number} \`foo\`.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo
           * \`bar\`.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @example Foo
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @see Foo
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Foo.
           *
           * @param foo Foo.
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * Foo.
           *
           * @param foo Foo.
           */
          function quux (foo) {

          }
      `,
      options: [
        {
          tags: [
            'param',
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @param foo Foo bar.
         */
        function quux (foo) {

        }
      `,
      options: [
        {
          tags: [
            'param',
          ],
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
        function quux (foo) {

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
      /**
      * We stop loading Items when we have loaded:
      *
      * 1) The main Item;
      * 2) All its variants.
      */
`,
    },
    {
      code: `
      /**
       * This method is working on 2 steps.
       *
       * | Step | Comment     |
       * |------|-------------|
       * |   1  | do it       |
       * |   2  | do it again |
       */
      `,
    },
    {
      code: `
          /**
           * This is something that
           * I want to test.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * When making HTTP requests, the
           * URL is super important.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Sorry, but this isn't a complete sentence, Mr.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Sorry, but this isn't a complete sentence Mr..
           */
          function quux () {

          }
      `,
      options: [
        {
          abbreviations: [
            'Mr.',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * Sorry, but this isn't a complete sentence Mr.\u0020
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * Sorry, but this isn't a complete sentence Mr. and Mrs..
           */
          function quux () {

          }
      `,
      options: [
        {
          abbreviations: [
            'Mr', 'Mrs',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * This is a complete sentence aMr.
           */
          function quux () {

          }
      `,
      options: [
        {
          abbreviations: [
            'Mr',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * This is a complete sentence. But this isn't, Mr.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * This is a complete Mr. Sentence. But this isn't, Mr.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * This is a complete Mr. sentence.
           */
          function quux () {

          }
      `,
      options: [
        {
          abbreviations: [
            'Mr',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * This is fun, i.e. enjoyable, but not superlatively so, e.g. not
           * super, wonderful, etc..
           */
          function quux () {

          }
      `,
      options: [
        {
          abbreviations: [
            'etc', 'e.g.', 'i.e.',
          ],
        },
      ],
    },
    {
      code: `

      /**
       * Do not have dynamic content; e.g. homepage. Here a simple unique id
       * suffices.
       */
       function quux () {

       }
       `,
      options: [
        {
          abbreviations: [
            'etc', 'e.g.', 'i.e.',
          ],
        },
      ],
    },
    {
      code: `
      /**
       * Implements support for the
       * Swahili voice synthesizer.
       */
      function speak() {
      }
      `,
    },
    {
      code: `
      /**
       * @param foo
       *
       * @returns {void}
       */
      export default (foo) => {
        foo()
      }
      `,
      languageOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
      /** @file To learn more,
       * see: https://github.com/d3/d3-ease. */
      `,
    },
    {
      code: `
      /** To learn more,
       * see: https://github.com/d3/d3-ease. */
      `,
    },
    {
      code: `
      /**
       * Maps the state to props.
       *
       * @param {object} state - The current state.
       * @param {object} ownProps - The props currently passed to the component.
       * @returns {{
       *    currentSupplierIntId: number,
       *    currentAccountIntId: number,
       *    isLoading: boolean
       *    }} - The props.
       */
      const mapStateToProps = (state, ownProps) => {
      }
      `,
      ignoreReadme: true,
    },
    {
      code: `
          /**
           * This is a complete sentence...
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * He wanted a few items: a jacket and shirt...
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * The code in question was...
           * \`\`\`
           * alert('hello');
           * \`\`\`
           */
          function quux () {

          }
      `,
    },
    {
      code: `
      /**
       * @param {number|string|Date|Object|OverType|WhateverElse} multiType -
       * Nice long explanation...
       */
      function test (multiType) {
      }
      `,
    },
    {
      code: `
      /**
       * Any kind of fowl (e.g., a duck).
       */
      function quux () {}
      `,
    },
    {
      code: `
          /**
           * The code in question was...
           * \`\`\`
           * do something
           *
           * interesting
           * \`\`\`
           */
          function quux () {

          }
      `,
    },
    {
      code: `
      /** @param options {@link RequestOptions} specifying path parameters and query parameters. */
      `,
    },
  ],
};
