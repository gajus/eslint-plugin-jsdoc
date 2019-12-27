export default {
  invalid: [
    {
      code: `
          /**
           * @typedef {SomeType} SomeTypedef
           * @property foo
           */
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc @property "foo" description.',
        },
      ],
    },
    {
      code: `
          /**
           * @typedef {SomeType} SomeTypedef
           * @prop foo
           */
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc @prop "foo" description.',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            property: 'prop',
          },
        },
      },
    },
    {
      code: `
          /**
           * @typedef {SomeType} SomeTypedef
           * @property foo
           */
      `,
      errors: [
        {
          line: 4,
          message: 'Unexpected tag `@property`',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            property: false,
          },
        },
      },
    },
  ],
  valid: [
    {
      code: `
          /**
           * @typedef {SomeType} SomeTypedef
           */
      `,
    },
    {
      code: `
          /**
           * @typedef {SomeType} SomeTypedef
           * @property foo Foo.
           */
      `,
    },
    {
      code: `
          /**
           * @namespace {SomeType} SomeName
           * @property foo Foo.
           */
      `,
    },
    {
      code: `
          /**
           * @class
           * @property foo Foo.
           */
      `,
    },
  ],
};
