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
         * @param {(string | ((arg: string) => void))} someName
         */
      `,
    },
    {
      code: `
        /**
         * @param {{(): void}[]} someName
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
         * @param {(() => void)[]} someName
         */
      `,
    },
    {
      code: `
        /**
         * @param {{(x: number): string} | null} someName
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
         * @param {((x: number) => string) | null} someName
         */
      `,
    },
    {
      code: `
        /**
         * @param {{a: {(): void}}} someName
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
         * @param {{a: () => void}} someName
         */
      `,
    },
    {
      code: `
        /**
         * @param {(cb: {(err: Error): void}) => void} someName
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
         * @param {(cb: (err: Error) => void) => void} someName
         */
      `,
    },
    {
      code: `
        /**
         * @returns {() => {(): void}}
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
         * @returns {() => () => void}
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
