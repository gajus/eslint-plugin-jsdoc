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
    {
      code: `
        /**
         * @type {\`\${A | B}\` & C}
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
         * @type {(A | B) & C}
         */
      `,
    },
    {
      code: `
        /**
         * @type {\`\${T extends U ? A : B}\`[]}
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
         * @type {(T extends U ? A : B)[]}
         */
      `,
    },
    {
      code: `
        /**
         * @type {\`\${T extends U ? A : B}\` | C}
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
         * @type {(T extends U ? A : B) | C}
         */
      `,
    },
    {
      code: `
        /**
         * @type {Record<\`\${A | B}\`, string>}
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
         * @type {Record<A | B, string>}
         */
      `,
    },
    {
      code: `
        /**
         * @type {\`\${A | B}\` | C}
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
         * @type {A | B | C}
         */
      `,
    },
    {
      code: `
        /**
         * @type {(\`\${A | B}\`)}
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
         * @type {(A | B)}
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
    {
      code: `
        /**
         * @typedef {object} NumericStrings
         * @property {\`\${number}\`} a
         * @property {Record<\`\${bigint}\`, string>} b
         * @property {\`\${1}\`} c
         * @property {\`\${null}\`} d
         * @property {\`\${undefined}\`} e
         * @property {\`\${boolean}\`} f
         * @property {\`\${true}\`} g
         * @property {\`\${any}\`} h
         * @property {\`\${keyof T}\`} i
         * @property {\`\${number | B}\`} j
         */
      `,
    },
  ],
};
