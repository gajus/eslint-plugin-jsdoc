export default {
  invalid: [
    {
      code: `
        /**
         *
         * Whether to include a @yearly, @monthly etc text labels in the generated expression.
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@yearly}, \\@yearly, or `@yearly`?',
        },
        {
          line: 4,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@monthly}, \\@monthly, or `@monthly`?',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
        /**
         *
         * Whether to include a \\@yearly, @monthly etc text labels in the generated expression.
         */
      `,
    },
    {
      code: `
        /**
         * Some text
         * Whether to include a @yearly, @monthly etc text labels in the generated expression.
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@yearly}, \\@yearly, or `@yearly`?',
        },
        {
          line: 4,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@monthly}, \\@monthly, or `@monthly`?',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
        /**
         * Some text
         * Whether to include a \\@yearly, @monthly etc text labels in the generated expression.
         */
      `,
    },
    {
      code: `
        /**
         * Whether to include a @yearly, @yearly etc text labels in the generated expression.
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@yearly}, \\@yearly, or `@yearly`?',
        },
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@yearly}, \\@yearly, or `@yearly`?',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
        /**
         * Whether to include a \\@yearly, \\@yearly etc text labels in the generated expression.
         */
      `,
    },
    {
      code: `
        /**
         * Whether to include a @yearly,
         * or @yearly etc text labels in the generated expression.
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@yearly}, \\@yearly, or `@yearly`?',
        },
        {
          line: 4,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@yearly}, \\@yearly, or `@yearly`?',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
        /**
         * Whether to include a \\@yearly,
         * or \\@yearly etc text labels in the generated expression.
         */
      `,
    },
    {
      code: `
        /**
         * Whether to include a @yearly, @monthly etc text labels in the generated expression.
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@yearly}, \\@yearly, or `@yearly`?',
        },
      ],
      options: [
        {
          allowedInlineTags: [
            'monthly',
          ],
          enableFixer: true,
          fixType: 'backticks',
        },
      ],
      output: `
        /**
         * Whether to include a \`@yearly\`, @monthly etc text labels in the generated expression.
         */
      `,
    },
    {
      code: `
        /**
         * Some description @sth
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@sth}, \\@sth, or `@sth`?',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
        /**
         * Some description \\@sth
         */
      `,
    },
    {
      code: `
        /**
         * Some description @sth
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@sth}, \\@sth, or `@sth`?',
        },
      ],
      options: [
        {
          enableFixer: false,
        },
      ],
    },
    {
      code: `
        /**
         * @param includeNonStandard Whether to include a @yearly, @monthly etc text labels in the generated expression.
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@yearly}, \\@yearly, or `@yearly`?',
        },
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@monthly}, \\@monthly, or `@monthly`?',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
        /**
         * @param includeNonStandard Whether to include a \\@yearly, @monthly etc text labels in the generated expression.
         */
      `,
    },
    {
      code: `
        /**
         * @param includeNonStandard Whether to include a @yearly, @monthly etc text labels in the generated expression.
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@yearly}, \\@yearly, or `@yearly`?',
        },
      ],
      options: [
        {
          allowedInlineTags: [
            'monthly',
          ],
          enableFixer: true,
          fixType: 'backticks',
        },
      ],
      output: `
        /**
         * @param includeNonStandard Whether to include a \`@yearly\`, @monthly etc text labels in the generated expression.
         */
      `,
    },
    {
      code: `
        /**
         * @param aName @sth
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@sth}, \\@sth, or `@sth`?',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
        /**
         * @param aName \\@sth
         */
      `,
    },
    {
      code: `
        /**
         * @param aName @sth
         *   and @another
         * @param anotherName @yetAnother
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@sth}, \\@sth, or `@sth`?',
        },
        {
          line: 4,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@another}, \\@another, or `@another`?',
        },
        {
          line: 5,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@yetAnother}, \\@yetAnother, or `@yetAnother`?',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
        /**
         * @param aName \\@sth
         *   and @another
         * @param anotherName @yetAnother
         */
      `,
    },
    {
      code: `
        /**
         * @param aName @sth
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@sth}, \\@sth, or `@sth`?',
        },
      ],
      options: [
        {
          enableFixer: false,
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * A description with an escaped \\@tag.
         */
      `,
    },
    {
      code: `
        /**
         * A description with a markdown \`@tag\`.
         */
      `,
    },
    {
      code: `
        /**
         * A description with a non@tag.
         */
      `,
    },
    {
      code: `
        /**
         * @param {SomeType} aName A description with an escaped \\@tag.
         */
      `,
    },
    {
      code: `
        /**
         * @param {SomeType} aName A description with a markdown \`@tag\`.
         */
      `,
    },
    {
      code: `
        /**
         * @param {SomeType} aName A description with a non@tag.
         */
      `,
    },
    {
      code: `
        /**
         * {@link https://example.com}
         */
      `,
    },
    {
      code: `
        /**
         * A description with a {@link https://example.com}
         */
      `,
    },
    {
      code: `
        /**
         * @someTag {@link https://example.com}
         */
      `,
    },
    {
      code: `
        /**
         * @param {SomeType} aName {@link https://example.com}
         */
      `,
    },
    {
      code: `
        /**
         * @param {SomeType} aName A description with a {@link https://example.com}.
         */
      `,
    },
    {
      code: `
        /**
         * @example
         * Here are some unescaped tags: @yearly, @monthly
         */
      `,
    },
    {
      code: `
        /**
         * Whether to include a @yearly, @monthly etc text labels in the generated expression.
         */
      `,
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
    },
  ],
};
