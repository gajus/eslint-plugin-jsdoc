export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
      // @ts-ignore
      foo();
      `,
      errors: [
        {
          line: 2,
          message: 'Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free.',
          suggestions: [
            {
              desc: 'Replace "@ts-ignore" with "@ts-expect-error".',
              output: `
      // @ts-expect-error
      foo();
      `,
            },
          ],
        },
      ],
    },
    {
      code: `
      /* @ts-ignore */
      foo();
      `,
      errors: [
        {
          line: 2,
          message: 'Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free.',
          suggestions: [
            {
              desc: 'Replace "@ts-ignore" with "@ts-expect-error".',
              output: `
      /* @ts-expect-error */
      foo();
      `,
            },
          ],
        },
      ],
    },
    {
      code: `
      // @ts-nocheck
      foo();
      `,
      errors: [
        {
          line: 2,
          message: 'Do not use "@ts-nocheck" because it alters compilation errors.',
        },
      ],
    },
    {
      code: `
      // @ts-nocheck
      `,
      errors: [
        {
          line: 2,
          message: 'Do not use "@ts-nocheck" because it alters compilation errors.',
        },
      ],
    },
    {
      code: `
      // @ts-check
      foo();
      `,
      errors: [
        {
          line: 2,
          message: 'Do not use "@ts-check" because it alters compilation errors.',
        },
      ],
      options: [
        {
          'ts-check': true,
        },
      ],
    },
    {
      code: `
      // @ts-expect-error
      foo();
      `,
      errors: [
        {
          line: 2,
          message: 'Do not use "@ts-expect-error" because it alters compilation errors.',
        },
      ],
      options: [
        {
          'ts-expect-error': true,
        },
      ],
    },
    {
      code: `
      // @ts-expect-error
      foo();
      `,
      errors: [
        {
          line: 2,
          message: 'Include a description after the "@ts-expect-error" directive to explain why the @ts-expect-error is necessary. The description must be 3 characters or longer.',
        },
      ],
    },
    {
      code: `
      // @ts-expect-error: TS
      foo();
      `,
      errors: [
        {
          line: 2,
          message: 'Include a description after the "@ts-expect-error" directive to explain why the @ts-expect-error is necessary. The description must be 10 characters or longer.',
        },
      ],
      options: [
        {
          minimumDescriptionLength: 10,
        },
      ],
    },
    {
      code: `
      /*
         @ts-expect-error: not matching format text */
      foo();
      `,
      errors: [
        {
          line: 2,
          message: 'The description for the "@ts-expect-error" directive must match the ^: TS\\d+ because .+$ format.',
        },
      ],
      options: [
        {
          'ts-expect-error': {
            descriptionFormat: '^: TS\\d+ because .+$',
          },
        },
      ],
    },
  ],
  valid: [
    {
      code: `
      // A regular comment.
      /* Another regular comment. */
      function foo () {}
      `,
    },
    {
      code: `
      /** JSDoc comment. */
      function foo () {}
      `,
    },
    {
      code: `
      // @ts-check
      foo();
      `,
    },
    {
      code: `
      foo();
      // @ts-nocheck
      `,
    },
    {
      code: `
      // @ts-check
      foo();
      `,
      options: [
        {
          'ts-check': {},
        },
      ],
    },
    {
      code: `
      // @ts-ignore
      foo();
      `,
      options: [
        {
          'ts-ignore': false,
        },
      ],
    },
    {
      code: `
      // @ts-expect-error: Suppress next line
      foo();
      `,
    },
    {
      code: `
      // @ts-expect-error: TS2345 because reasons
      foo();
      `,
      options: [
        {
          'ts-expect-error': {
            descriptionFormat: '^: TS\\d+ because .+$',
          },
        },
      ],
    },
  ],
});
