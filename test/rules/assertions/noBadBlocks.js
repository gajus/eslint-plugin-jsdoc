export default {
  invalid: [
    {
      code: `
          /*
           * @param foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'Expected JSDoc-like comment to begin with two asterisks.',
        },
      ],
      output: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /*
           * @property foo
           */
      `,
      errors: [
        {
          line: 2,
          message: 'Expected JSDoc-like comment to begin with two asterisks.',
        },
      ],
      output: `
          /**
           * @property foo
           */
      `,
    },
  ],
  valid: [
    {
      code: `
          /**
           * @property foo
           */
      `,
    },
    {
      code: `
          /**
           * @param foo
           */
           function quux () {

           }
      `,
    },
    {
      code: `
      function quux () {

      }
      `,
    },
    {
      code: `
           /* This could just be intended as a regular multiline comment,
              so don't report this */
           function quux () {

           }
      `,
    },
    {
      code: `
           /* Just a regular multiline comment with an \`@\` but not appearing
               like a tag in a jsdoc-block, so don't report */
           function quux () {

           }
      `,
    },
  ],
};
