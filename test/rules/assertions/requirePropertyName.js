export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
          /**
           * @typedef {SomeType} SomeTypedef
           * @property
           */
      `,
      errors: [
        {
          line: 4,
          message: 'There must be an identifier after @property type.',
        },
      ],
    },
    {
      code: `
          /**
           * @typedef {SomeType} SomeTypedef
           * @property {string}
           */
      `,
      errors: [
        {
          line: 4,
          message: 'There must be an identifier after @property tag.',
        },
      ],
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
           * @property foo
           */
      `,
    },
    {
      code: `
          /**
           * @typedef {SomeType} SomeTypedef
           * @property {string} foo
           */
      `,
    },
    {
      code: `
          /**
           * @namespace {SomeType} SomeName
           * @property {string} foo
           */
      `,
    },
    {
      code: `
          /**
           * @class
           * @property {string} foo
           */
      `,
    },
  ],
});
