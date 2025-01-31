export default /** @type {import('../index.js').TestCases} */ ({
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
          message: 'Missing JSDoc @property "foo" type.',
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
          message: 'Missing JSDoc @prop "foo" type.',
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
           * @property {number} foo
           */
      `,
    },
    {
      code: `
          /**
           * @namespace {SomeType} SomeName
           * @property {number} foo
           */
      `,
    },
    {
      code: `
          /**
           * @class
           * @property {number} foo
           */
      `,
    },
  ],
});
