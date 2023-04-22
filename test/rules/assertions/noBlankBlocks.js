export default {
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
};
