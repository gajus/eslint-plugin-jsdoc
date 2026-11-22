export default {
  invalid: [
    {
      code: `
        /**
         * @param {{
         *   func(arg: string): number
         * }} someName
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found method signature; prefer function property.',
        },
      ],
      options: [
        'property',
      ],
      output: `
        /**
         * @param {{func: (arg: string) => number}} someName
         */
      `,
    },
    {
      code: `
        /**
         * @param {{
         *   func(arg: string): number
         * }} someName
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found method signature; prefer function property.',
        },
      ],
      options: [
        'property',
        {
          enableFixer: false,
        },
      ],
    },
    {
      code: `
        /**
         * @param {{
         *   func(arg: number): void
         *   func(arg: string): void
         *   func(arg: boolean): void
         * }} someName
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found method signature; prefer function property.',
        },
      ],
      output: `
        /**
         * @param {{func: ((arg: number) => void) & ((arg: string) => void) & ((arg: boolean) => void)}} someName
         */
      `,
    },
    {
      code: `
        /**
         * @param {{
         *   func: (arg: string) => number
         * }} someName
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found function property; prefer method signature.',
        },
      ],
      options: [
        'method',
      ],
      output: `
        /**
         * @param {{func(arg: string): number}} someName
         */
      `,
    },
    {
      code: `
        /**
         * @param {{
         *   func: (arg: string) => number
         * }} someName
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found function property; prefer method signature.',
        },
      ],
      options: [
        'method',
        {
          enableFixer: false,
        },
      ],
    },
    {
      code: `
        /**
         * @type {{
         *   func: ((arg: number) => void) &
         *     ((arg: string) => void) &
         *     ((arg: boolean) => void)
         * }}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found function property; prefer method signature.',
        },
        {
          line: 3,
          message: 'Found function property; prefer method signature.',
        },
        {
          line: 3,
          message: 'Found function property; prefer method signature.',
        },
      ],
      options: [
        'method',
      ],
      output: `
        /**
         * @type {{
         *   func(arg: number): void
         *   func(arg: string): void
         *   func(arg: boolean): void
         * }}
         */
      `,
    },
    {
      code: `
        /**
         * @param {{
         *   func: ((arg: number) => void) &
         *     ((arg: string) => void) &
         *     ((arg: boolean) => void)
         * }} someName
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found function property; prefer method signature.',
        },
        {
          line: 3,
          message: 'Found function property; prefer method signature.',
        },
        {
          line: 3,
          message: 'Found function property; prefer method signature.',
        },
      ],
      options: [
        'method',
        {
          enableFixer: false,
        },
      ],
    },
    {
      code: `
        /**
         * @param {{
         *   "func"(arg: string): number
         * }} someName
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found method signature; prefer function property.',
        },
      ],
      options: [
        'property',
      ],
      output: `
        /**
         * @param {{"func": (arg: string) => number}} someName
         */
      `,
    },
    {
      code: `
        /**
         * @param {{
         *   'func': (arg: string) => number
         * }} someName
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found function property; prefer method signature.',
        },
      ],
      options: [
        'method',
      ],
      output: `
        /**
         * @param {{'func'(arg: string): number}} someName
         */
      `,
    },
    {
      code: `
        /** @type {{
         *   func: ((arg: number) => void) &
         *     ((arg: string) => void) &
         *     ((arg: boolean) => void)
         * }}
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Found function property; prefer method signature.',
        },
        {
          line: 2,
          message: 'Found function property; prefer method signature.',
        },
        {
          line: 2,
          message: 'Found function property; prefer method signature.',
        },
      ],
      options: [
        'method',
      ],
      output: `
        /** @type {{
         *   func(arg: number): void
         *   func(arg: string): void
         *   func(arg: boolean): void
         * }}
         */
      `,
    },
    {
      code: `
        /**
         * @param {{
         *   optionalFunc?: (arg: string) => number
         * }} someName
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found function property; prefer method signature.',
        },
      ],
      options: [
        'method',
      ],
      output: `
        /**
         * @param {{optionalFunc?(arg: string): number}} someName
         */
      `,
    },
    {
      code: `
        /**
         * @type {{
         *   func?: ((arg: number) => void) &
         *     ((arg: string) => void)
         * }}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found function property; prefer method signature.',
        },
        {
          line: 3,
          message: 'Found function property; prefer method signature.',
        },
      ],
      options: [
        'method',
      ],
      output: `
        /**
         * @type {{
         *   func?(arg: number): void
         *   func?(arg: string): void
         * }}
         */
      `,
    },
    {
      code: `
        /**
         * @param {{
         *   optionalMethod?(arg: string): number
         * }} someName
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found method signature; prefer function property.',
        },
      ],
      options: [
        'property',
      ],
      output: `
        /**
         * @param {{optionalMethod?: (arg: string) => number}} someName
         */
      `,
    },
    {
      code: `
        /**
         * @param {{
         *   func?(arg: number): void
         *   func?(arg: string): void
         * }} someName
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found method signature; prefer function property.',
        },
      ],
      options: [
        'property',
      ],
      output: `
        /**
         * @param {{func?: ((arg: number) => void) & ((arg: string) => void)}} someName
         */
      `,
    },
    {
      code: `
        /**
         * @param {{name: string, on: ((e: "a") => void) & ((e: "b") => void)}} opts The options
         */
        function quux (opts) {}
      `,
      errors: [
        {
          line: 3,
          message: 'Found function property; prefer method signature.',
        },
        {
          line: 3,
          message: 'Found function property; prefer method signature.',
        },
      ],
      options: [
        'method',
      ],
      output: `
        /**
         * @param {{name: string, on(e: "a"): void, on(e: "b"): void}} opts The options
         */
        function quux (opts) {}
      `,
    },
    {
      code: `
        /**
         * @param {{on: ((e: "a") => void) & ((e: "b") => void), name: string}} opts The options
         */
        function quux (opts) {}
      `,
      errors: [
        {
          line: 3,
          message: 'Found function property; prefer method signature.',
        },
        {
          line: 3,
          message: 'Found function property; prefer method signature.',
        },
      ],
      options: [
        'method',
      ],
      output: `
        /**
         * @param {{on(e: "a"): void, on(e: "b"): void, name: string}} opts The options
         */
        function quux (opts) {}
      `,
    },
    {
      code: `
        /**
         * @typedef {{
         *   id: number,
         *   name: string,
         *   on: ((e: "a") => void) & ((e: "b") => void)
         * }} Emitter
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Found function property; prefer method signature.',
        },
        {
          line: 3,
          message: 'Found function property; prefer method signature.',
        },
      ],
      options: [
        'method',
      ],
      output: `
        /**
         * @typedef {{
         *   id: number,
         *   name: string,
         *   on(e: "a"): void,
         *   on(e: "b"): void
         * }} Emitter
         */
      `,
    },
  ],
  valid: [
    {
      code: `
        /**
         * @param {{
         *   func: (arg: string) => number
         * }}
         */
      `,
      options: [
        'property',
      ],
    },
    {
      code: `
        /**
         * @param {{
         *   readonly readonlyFunc: (arg: string) => number,
         *   readonly readonlyOverloads: ((arg: string) => number) & ((arg: number) => string)
         * }} someName
         */
      `,
      options: [
        'method',
      ],
    },
    {
      code: `
        /**
         * @param {{
         *   func: ((arg: number) => void) &
         *     ((arg: string) => void) &
         *     ((arg: boolean) => void)
         * }}
         */
      `,
    },
    {
      code: `
        /**
         * @param {abc<}
         */
      `,
    },
    {
      code: `
        /**
         * @param {{
         *   func: ((arg: number) => void) & (SomeType)
         * }}
         */
      `,
      options: [
        'method',
      ],
    },
  ],
};
