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
        'always', {checkProperties: true},
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
        'never', {checkProperties: true},
      ],
      output: `
          /**
           * @typedef {SomeType} ATypeDefName
           * @property foo Foo.
           */
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
           * @typedef {SomeType} ATypeDefName
           * @property foo - Foo.
           */
      `,
      options: [
        'always', {checkProperties: true},
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
        'never', {checkProperties: true},
      ],
    },
  ],
};
