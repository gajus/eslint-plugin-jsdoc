export default {
  invalid: [
    {
      code: `
          /***  foo */
          function quux () {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'There must be no indentation.',
        },
      ],
    },
    {
      code: `
          /**
           * foo
           *
           * @param bar
           *  baz
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 6,
          message: 'There must be no indentation.',
        },
      ],
    },
    {
      code: `
        /**
         * Foo
         *   bar
         */
        class Moo {}
      `,
      errors: [
        {
          line: 4,
          message: 'There must be no indentation.',
        },
      ],
    },
    {
      code: `
          /**
           * foo
           *
           * @example
           * anArray.filter((a) => {
           *   return a.b;
           * });
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 7,
          message: 'There must be no indentation.',
        },
      ],
      options: [{
        excludeTags: [],
      }],
    },
    {
      code: `
          /**
           * foo
           *
           * @example
           *   aaaa
           * @returns
           *   eeee
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 8,
          message: 'There must be no indentation.',
        },
      ],
    },
    {
      code: `
          /**
           * foo
           * \`\`\`html
           * <section>
           *   <title>test</title>
           * </section>
           * \`\`\`
           * @returns
           *   eeee
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 10,
          message: 'There must be no indentation.',
        },
      ],
    },
    {
      code: `
          /**
           * foo
           * \`\`\`   aaaa\`\`\`
           * @returns
           *   eeee
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 6,
          message: 'There must be no indentation.',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
          /**
           * foo
           *
           * @param bar
           * baz
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /*** foo */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * foo
           *
           * @example
           * anArray.filter((a) => {
           *   return a.b;
           * });
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * foo
           *
           * @example
           * anArray.filter((a) => {
           *   return a.b;
           * });
           * @returns
           *   eeee
           */
          function quux () {

          }
      `,
      options: [{
        excludeTags: ['example', 'returns'],
      }],
    },
    {
      code: `
          /**
           * foo
           * \`\`\`html
           * <section>
           *   <title>test</title>
           * </section>
           * \`\`\`
           * @returns eeee
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * foo
           * \`\`\`   aaaa\`\`\`
           * @returns eeee
           */
          function quux () {

          }
      `,
    },
  ],
};
