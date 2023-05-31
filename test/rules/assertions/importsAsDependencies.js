export default {
  invalid: [
    {
      code: `
        /**
         * @type {null|import('sth').SomeApi}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'import points to package which is not found in dependencies',
        },
      ],
    },
    {
      code: `
        /**
         * @type {null|import('sth').SomeApi}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'import points to package which is not found in dependencies',
        },
      ],
      settings: {
        jsdoc: {
          mode: 'permissive',
        },
      },
    },
    {
      code: `
        /**
         * @type {null|import('missingpackage/subpackage').SomeApi}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'import points to package which is not found in dependencies',
        },
      ],
    },
    {
      code: `
        /**
         * @type {null|import('@sth/pkg').SomeApi}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'import points to package which is not found in dependencies',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * @type {null|import('eslint').ESLint}
         */
      `,
    },
    {
      code: `
        /**
         * @type {null|import('eslint/use-at-your-own-risk').ESLint}
         */
      `,
    },
    {
      code: `
        /**
         * @type {null|import('@es-joy/jsdoccomment').InlineTag}
         */
      `,
    },
    {
      code: `
        /**
         * @type {null|import(}
         */
      `,
    },
  ],
};
