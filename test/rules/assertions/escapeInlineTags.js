export default {
  invalid: [
    {
      code: `
        /**
         * @file Use @outside before \`npm init @eslint/config\`.
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@outside}, \\@outside, or `@outside`?',
        },
      ],
    },
    {
      code: `
        /**
         * @file Run \`npm init @eslint/config\` with @outside.
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@outside}, \\@outside, or `@outside`?',
        },
      ],
    },
    {
      code: `
        /**
         * @file Run \`npm init @eslint/config without a closing backtick.
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@eslint}, \\@eslint, or `@eslint`?',
        },
      ],
    },
    {
      code: `
        /**
         * @file Literal \\\`npm init @eslint/config\` text.
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@eslint}, \\@eslint, or `@eslint`?',
        },
      ],
    },
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
         * Some description @scope and {@link @scope/pkg#Member}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@scope}, \\@scope, or `@scope`?',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
        /**
         * Some description \\@scope and {@link @scope/pkg#Member}
         */
      `,
    },
    {
      code: `
        /**
         * Some description {@example @scope/pkg}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@scope}, \\@scope, or `@scope`?',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
        /**
         * Some description {@example \\@scope/pkg}
         */
      `,
    },
    {
      code: `
        /**
         * Some description {@link @scope/pkg#Member
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@scope}, \\@scope, or `@scope`?',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
        /**
         * Some description {@link \\@scope/pkg#Member
         */
      `,
    },
    {
      code: `
        /**
         * Some description {@ @scope/pkg}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected inline JSDoc tag. Did you mean to use {@scope}, \\@scope, or `@scope`?',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
        /**
         * Some description {@ \\@scope/pkg}
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
         * @file Main CLI that is run via the \`npm init @eslint/config\` command.
         */
      `,
    },
    {
      code: `
        /**
         * @param value Run \`\`npm \`init\` @eslint/config\`\`.
         */
      `,
    },
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
         * Use this CodeMirror {@link @codemirror/state#StateField} reference.
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
         * @param {SomeType} aName {@inheritDoc @scope-name/pkg-name#Member}
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
         * A description with a multi-line inline tag {@link
         * @scope/pkg#Member} reference.
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
