export default {
  invalid: [
    {
      code: `
        /**
         * @param {{
         *   (arg: string): void;
         * }} someName
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Call signature found; function type preferred.',
        },
      ],
      output: `
        /**
         * @param {(arg: string) => void} someName
         */
      `,
    },
    {
      code: `
        /**
         * @param {{
         *   (arg: string): void;
         * }} someName
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Call signature found; function type preferred.',
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
         * @param {(string | {
         *   (arg: string): void;
         * })} someName
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Call signature found; function type preferred.',
        },
      ],
      output: `
        /**
         * @param {(string | (arg: string) => void)} someName
         */
      `,
    },
  ],
  valid: [
    {
      code: `
        /**
         * @param {() => number} someName
         */
      `,
    },
    {
      code: `
        /**
         * @param {{
         *   (arg: string): void;
         *   abc: number;
         * }} someName
         */
      `,
    },
    {
      code: `
        /**
         * @param {{
         *   (data: string): number;
         *   (id: number): string;
         * }} someName
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
  ],
};
