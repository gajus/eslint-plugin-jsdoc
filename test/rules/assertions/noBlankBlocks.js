export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
        /** */
      `,
      errors: [
        {
          line: 2,
          message: 'No empty blocks',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
      `,
    },
    {
      code: `
        /**
         */
      `,
      errors: [
        {
          line: 2,
          message: 'No empty blocks',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
      `,
    },
    {
      code: `
        /**
         *
         */
      `,
      errors: [
        {
          line: 3,
          message: 'No empty blocks',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
      `,
    },
    {
      code: `
        /**
         *
         *
         */
      `,
      errors: [
        {
          line: 4,
          message: 'No empty blocks',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
      `,
    },
    {
      code: `
        /**
         *
         *
         */
      `,
      errors: [
        {
          line: 4,
          message: 'No empty blocks',
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
         *
         *
         */
      `,
      errors: [
        {
          line: 4,
          message: 'No empty blocks',
        },
      ],
    },
    {
      code: `
        const a = 1
        /** */ let b = 2
        use(a, b)
      `,
      errors: [
        {
          line: 3,
          message: 'No empty blocks',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
        const a = 1
        let b = 2
        use(a, b)
      `,
    },
    {
      code: 'const a = 1;\r\n/**\r\n *\r\n */\r\nfunction quux () {}\r\n',
      errors: [
        {
          line: 3,
          message: 'No empty blocks',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: 'const a = 1;\r\nfunction quux () {}\r\n',
    },
  ],
  valid: [
    {
      code: `
        /** @tag */
      `,
    },
    {
      code: `
        /**
         * Text
         */
      `,
    },
    {
      code: `
        /**
         * @tag
         */
      `,
    },
  ],
});
