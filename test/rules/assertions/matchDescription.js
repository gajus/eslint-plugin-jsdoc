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
          message: 'JSDoc description does not satisfy the regex pattern.'
        }
      ]
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
          message: 'JSDoc description does not satisfy the regex pattern.'
        }
      ]
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
          message: 'JSDoc description does not satisfy the regex pattern.'
        }
      ],
      options: [{
        matchDescription: '[\u0410-\u042F][\u0410-\u044F]+\\.'
      }]
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
          message: 'JSDoc description does not satisfy the regex pattern.'
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
          message: 'JSDoc description does not satisfy the regex pattern.'
        }
      ],
      options: [
        {
          tags: {
            param: true
          }
        }
      ]
    },
    {
      code: `
          /**
           * Foo
           *
           * @param foo foo.
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'JSDoc description does not satisfy the regex pattern.'
        }
      ],
      options: [
        {
          tags: {
            'main description': '^[a-zA-Z]*$',
            param: true
          }
        }
      ]
    },
    {
      code: `
          /**
           * Foo
           *
           * @param foo foo.
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'JSDoc description does not satisfy the regex pattern.'
        }
      ],
      options: [
        {
          tags: {
            'main description': false,
            param: true
          }
        }
      ]
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
          message: 'JSDoc description does not satisfy the regex pattern.'
        }
      ],
      options: [
        {
          tags: {
            param: true
          }
        }
      ]
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
          message: 'JSDoc description does not satisfy the regex pattern.'
        }
      ]
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
          message: 'JSDoc description does not satisfy the regex pattern.'
        }
      ],
      options: [
        {
          tags: {
            returns: true
          }
        }
      ]
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
          message: 'JSDoc description does not satisfy the regex pattern.'
        }
      ],
      options: [
        {
          tags: {
            returns: true
          }
        }
      ]
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
          message: 'JSDoc description does not satisfy the regex pattern.'
        }
      ]
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
          message: 'JSDoc description does not satisfy the regex pattern.'
        }
      ],
      options: [
        {
          tags: {
            arg: true
          }
        }
      ]
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
          message: 'JSDoc description does not satisfy the regex pattern.'
        }
      ],
      options: [
        {
          tags: {
            argument: true
          }
        }
      ]
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
          message: 'JSDoc description does not satisfy the regex pattern.'
        }
      ],
      options: [
        {
          tags: {
            return: true
          }
        }
      ]
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
          message: 'JSDoc description does not satisfy the regex pattern.'
        }
      ],
      options: [
        {
          tags: {
            return: true
          }
        }
      ]
    },
    {
      code: `
          /**
           * @param notRet
           * @returns Тест.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.'
        }
      ],
      options: [{
        tags: {
          param: '[\u0410-\u042F][\u0410-\u044F]+\\.'
        }
      }]
    },
    {
      code: `
          /**
           * foo.
           */
          class quux {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc description does not satisfy the regex pattern.'
        }
      ],
      options: [
        {
          contexts: [
            'ClassDeclaration'
          ],
          noDefaults: true
        }
      ]
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
        {
          tags: {
            param: true
          }
        }
      ]
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
      `,
      options: [{
        matchDescription: '[\u0410-\u042F][\u0410-\u044F]+\\.'
      }]
    },
    {
      code: `
          /**
           * @param notRet
           * @returns Тест.
           */
          function quux () {

          }
      `,
      options: [{
        tags: {
          returns: '[\u0410-\u042F][\u0410-\u044F]+\\.'
        }
      }]
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
      code: `
          /**
           * @returns Foo bar.
           */
          function quux () {

          }
      `,
      options: [
        {
          tags: {
            returns: true
          }
        }
      ]
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
           * Foo
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
           * foo.
           */
          function quux () {

          }
      `
    },
    {
      code: `
          /**
           * foo.
           */
          function quux () {

          }
      `,
      options: [
        {tags: {
          'main description': false
        }}
      ]
    },
    {
      code: `
          /**
           * foo.
           */
          class quux {

          }
      `
    },
    {
      code: `
          /**
           * foo.
           */
          class quux {

          }
      `,
      options: [
        {tags: {
          'main description': true
        }}
      ]
    }
  ]
};
