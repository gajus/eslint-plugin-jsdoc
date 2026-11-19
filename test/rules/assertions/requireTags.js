export default {
  invalid: [
    {
      code: `
        /**
         *
         */
        function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing required tag "see"',
        },
      ],
      options: [
        {
          tags: [
            'see',
          ],
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing required tag "see"',
        },
      ],
      options: [
        {
          tags: [
            {
              context: 'FunctionDeclaration',
              tag: 'see',
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @type {SomeType}
         */
        function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing required tag "see"',
        },
      ],
      options: [
        {
          tags: [
            {
              context: 'FunctionDeclaration',
              tag: 'see',
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @type {SomeType}
         */
        function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Rule `require-tags` is missing a `tags` option.',
        },
      ],
    },
    {
      code: `
          /**
           * Desc.
           */
          function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing required tag "memberof!"',
        },
      ],
      options: [
        {
          tags: [
            'memberof!',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * Desc.
           */
          function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing required tag "vue.prop"',
        },
      ],
      options: [
        {
          tags: [
            'vue.prop',
          ],
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * @see
         */
        function quux () {}
      `,
      options: [
        {
          tags: [
            'see',
          ],
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        class Quux {}
      `,
      options: [
        {
          tags: [
            {
              context: 'FunctionDeclaration',
              tag: 'see',
            },
          ],
        },
      ],
    },
    {
      code: `
          /**
           * @memberof! Foo
           */
          function quux () {}
      `,
      options: [
        {
          tags: [
            'memberof!',
          ],
        },
      ],
    },
  ],
};
