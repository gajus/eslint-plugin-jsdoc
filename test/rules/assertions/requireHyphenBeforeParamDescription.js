export default {
  invalid: [
    {
      code: `
          /**
           * @param foo Foo.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'There must be a hyphen before @param description.'
        }
      ],
      options: [
        'always'
      ],
      output: `
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
           * @param foo - Foo.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'There must be no hyphen before @param description.'
        }
      ],
      options: [
        'never'
      ],
      output: `
          /**
           * @param foo Foo.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * @param foo - Foo.
           * @param bar Foo.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'There must be a hyphen before @param description.'
        }
      ],
      options: [
        'always'
      ],
      output: `
          /**
           * @param foo - Foo.
           * @param bar - Foo.
           */
          function quux () {

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
      `,
      options: [
        'always'
      ]
    },
    {
      code: `
          /**
           * @param foo Foo.
           */
          function quux () {

          }
      `,
      options: [
        'never'
      ]
    }
  ]
};
