export default {
  invalid: [
    {
      code: `
        /**
         * @type {\`A\${'B'}\`}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found an unnecessary string literal within a template.',
        },
      ],
      output: `
        /**
         * @type {\`AB\`}
         */
      `,
    },
    {
      code: `
        /**
         * @type {\`A\${'B'}\`}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found an unnecessary string literal within a template.',
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
         * @type {(\`A\${'B'}\`)}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found an unnecessary string literal within a template.',
        },
      ],
      output: `
        /**
         * @type {(\`AB\`)}
         */
      `,
    },
    {
      code: `
        /**
         * @type {\`A\${'B'}\`|SomeType}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found an unnecessary string literal within a template.',
        },
      ],
      output: `
        /**
         * @type {\`AB\` | SomeType}
         */
      `,
    },
    {
      code: `
        /**
         * @type {\`\${B}\`}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found a lone template expression within a template.',
        },
      ],
      output: `
        /**
         * @type {B}
         */
      `,
    },
    {
      code: `
        /**
         * @type {\`\${B}\`}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found a lone template expression within a template.',
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
         * @type {\`A\${'B'}\${'C'}\`}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found an unnecessary string literal within a template.',
        },
      ],
      output: `
        /**
         * @type {\`AB\${'C'}\`}
         */
      `,
    },
    {
      code: `
        /**
         * @type {\`A\${'B'}C\`}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found an unnecessary string literal within a template.',
        },
      ],
      output: `
        /**
         * @type {\`ABC\`}
         */
      `,
    },
    {
      code: `
        /**
         * @type {\`\${'B'}\`}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found an unnecessary string literal within a template.',
        },
      ],
      output: `
        /**
         * @type {\`B\`}
         */
      `,
    },
    {
      code: `
        /**
         * @type {(\`\${B}\`)}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found a lone template expression within a template.',
        },
      ],
      output: `
        /**
         * @type {(B)}
         */
      `,
    },
    {
      code: `
        /**
         * @type {\`\${B}\` | number}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found a lone template expression within a template.',
        },
      ],
      output: `
        /**
         * @type {B | number}
         */
      `,
    },
  ],
  valid: [
    {
      code: `
        /**
         * @type {\`AB\`}
         */
      `,
    },
    {
      code: `
        /**
         * @type {\`A\${C}B\`}
         */
      `,
    },
    {
      code: `
        /**
         * @param {BadType<} someName
         */
      `,
    },
    {
      code: `
        /**
         * @param {\`A\${'B'}\`} someName
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
