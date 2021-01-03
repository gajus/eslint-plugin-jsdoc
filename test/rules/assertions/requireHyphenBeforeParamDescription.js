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
          message: 'There must be a hyphen before @param description.',
        },
      ],
      options: [
        'always',
      ],
      output: `
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
           * @param foo Foo.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'There must be a hyphen before @param description.',
        },
      ],
      options: [
        'always',
        {
          tags: {
            '*': 'never',
          },
        },
      ],
      output: `
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
           * @param foo Foo.
           * @returns {SomeType} - Hyphen here.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'There must be a hyphen before @param description.',
        },
      ],
      options: [
        'always',
        {
          tags: {
            '*': 'never',
            returns: 'always',
          },
        },
      ],
      output: `
          /**
           * @param foo - Foo.
           * @returns {SomeType} - Hyphen here.
           */
          function quux () {

          }
      `,
    },
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
          message: 'There must be a hyphen before @param description.',
        },
      ],
      output: `
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
           * @param foo - Foo.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'There must be no hyphen before @param description.',
        },
      ],
      options: [
        'never',
      ],
      output: `
          /**
           * @param foo Foo.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo    - Foo.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'There must be no hyphen before @param description.',
        },
      ],
      options: [
        'never',
      ],
      output: `
          /**
           * @param foo Foo.
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo - foo
           * @param foo foo
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'There must be a hyphen before @param description.',
        },
      ],
      options: [
        'always',
      ],
      output: `
          /**
           * @param foo - foo
           * @param foo - foo
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo foo
           * bar
           * @param bar - bar
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'There must be a hyphen before @param description.',
        },
      ],
      options: [
        'always',
      ],
      output: `
          /**
           * @param foo - foo
           * bar
           * @param bar - bar
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Unexpected tag `@param`',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: false,
          },
        },
      },
    },
    {
      code: `
          /**
           * @typedef {SomeType} ATypeDefName
           * @property foo Foo.
           */
      `,
      errors: [
        {
          line: 4,
          message: 'There must be a hyphen before @property description.',
        },
      ],
      options: [
        'always', {tags: {
          property: 'always',
        }},
      ],
      output: `
          /**
           * @typedef {SomeType} ATypeDefName
           * @property foo - Foo.
           */
      `,
    },
    {
      code: `
          /**
           * @template TempA, TempB A desc.
           */
      `,
      errors: [
        {
          line: 3,
          message: 'There must be a hyphen before @template description.',
        },
      ],
      options: [
        'always', {tags: {
          template: 'always',
        }},
      ],
      output: `
          /**
           * @template TempA, TempB - A desc.
           */
      `,
    },
    {
      code: `
          /**
           * @typedef {SomeType} ATypeDefName
           * @property foo - Foo.
           */
      `,
      errors: [
        {
          line: 4,
          message: 'There must be no hyphen before @property description.',
        },
      ],
      options: [
        'never', {tags: {
          property: 'never',
        }},
      ],
      output: `
          /**
           * @typedef {SomeType} ATypeDefName
           * @property foo Foo.
           */
      `,
    },
    {
      code: `
          /**
           * @param foo Foo.
           * @returns {SomeType} - A description.
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'There must be a hyphen before @param description.',
        },
        {
          line: 4,
          message: 'There must be no hyphen before @returns description.',
        },
      ],
      options: [
        'always', {
          tags: {
            returns: 'never',
          },
        },
      ],
      output: `
          /**
           * @param foo - Foo.
           * @returns {SomeType} - A description.
           */
          function quux () {

          }
      `,
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
      options: [
        'always',
      ],
    },
    {
      code: `
          /**
           * @param foo     - Foo.
           */
          function quux () {

          }
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
          /**
           * @param foo - Foo.
           * @returns {SomeType} A description.
           */
          function quux () {

          }
      `,
      options: [
        'always', {
          tags: {
            returns: 'never',
          },
        },
      ],
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
        'never',
      ],
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
          /**
           *
           */
          function quux () {

          }
      `,
      options: [
        'always', {tags: {
          '*': 'always',
        }},
      ],
    },
    {
      code: `
          /**
           * @typedef {SomeType} ATypeDefName
           * @property foo - Foo.
           */
      `,
      options: [
        'always', {tags: {
          property: 'always',
        }},
      ],
    },
    {
      code: `
          /**
           * @typedef {SomeType} ATypeDefName
           * @property foo Foo.
           */
      `,
      options: [
        'never', {tags: {
          property: 'never',
        }},
      ],
    },
    {
      code: `
          /**
           * @typedef {SomeType} ATypeDefName
           * @property foo - Foo.
           */
      `,
      options: [
        'never', {tags: {
          '*': 'always',
        }},
      ],
    },
  ],
};
