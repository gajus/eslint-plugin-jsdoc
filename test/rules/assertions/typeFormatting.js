export default {
  invalid: [
    {
      code: `
        /**
         * @param {{a: string; b: number; c: boolean,}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent semicolon separator usage',
        },
      ],
      options: [
        {
          objectFieldSeparator: 'semicolon',
        },
      ],
      output: `
        /**
         * @param {{a: string; b: number; c: boolean}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{a: string; b: number; c: boolean,}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent semicolon separator usage',
        },
      ],
      options: [
        {
          objectFieldSeparator: 'semicolon',
          objectFieldSeparatorTrailingPunctuation: true,
        },
      ],
      output: `
        /**
         * @param {{a: string; b: number; c: boolean;}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{a: string; b: number; c: boolean,}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent semicolon separator usage',
        },
      ],
      options: [
        {
          objectFieldSeparator: 'semicolon',
        },
      ],
      output: `
        /**
         * @param {{a: string; b: number; c: boolean}} cfg
         */
      `,
      settings: {
        jsdoc: {
          mode: 'permissive',
        },
      },
    },
    {
      code: `
        /**
         * @param {{a: string; b: number; c: boolean,}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent semicolon separator usage',
        },
      ],
      options: [
        {
          enableFixer: false,
          objectFieldSeparator: 'semicolon',
        },
      ],
    },
    {
      code: `
        /**
         * @param {{a: string, b: number; c: boolean;}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent comma separator usage',
        },
      ],
      options: [
        {
          objectFieldSeparator: 'comma',
        },
      ],
      output: `
        /**
         * @param {{a: string, b: number, c: boolean}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{a: string, b: number; c: boolean,}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent linebreak separator usage',
        },
      ],
      options: [
        {
          objectFieldIndent: '  ',
          objectFieldSeparator: 'linebreak',
        },
      ],
      output: `
        /**
         * @param {{
         *   a: string
         *   b: number
         *   c: boolean
         * }} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{
         *   a: string,
         *   b: number;
         *   c: boolean,
         * }} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent linebreak separator usage',
        },
      ],
      options: [
        {
          objectFieldIndent: '  ',
          objectFieldSeparator: 'linebreak',
        },
      ],
      output: `
        /**
         * @param {{
         *   a: string
         *   b: number
         *   c: boolean
         * }} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {'abc'} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent double string quotes usage',
        },
      ],
      options: [
        {
          stringQuotes: 'double',
        },
      ],
      output: `
        /**
         * @param {"abc"} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {Array<string>} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Array bracket style should be square',
        },
      ],
      options: [
        {
          arrayBrackets: 'square',
        },
      ],
      output: `
        /**
         * @param {string[]} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {SomeType<string>} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Dot usage should be true',
        },
      ],
      options: [
        {
          genericDot: true,
        },
      ],
      output: `
        /**
         * @param {SomeType.<string>} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{a: string}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent object field quotes double',
        },
      ],
      options: [
        {
          objectFieldQuote: 'double',
        },
      ],
      output: `
        /**
         * @param {{"a": string}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{"a": string}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent object field quotes null',
        },
      ],
      output: `
        /**
         * @param {{a: string}} cfg
         */
      `,
    },
    // {
    //   code: `
    //     /**
    //      * @param {ab.cd.ef} cfg
    //      */
    //   `,
    //   errors: [
    //     {
    //       line: 3,
    //       message: 'Inconsistent double property quotes usage',
    //     },
    //     {
    //       line: 3,
    //       message: 'Inconsistent double property quotes usage',
    //     },
    //   ],
    //   options: [
    //     {
    //       propertyQuotes: 'double',
    //     },
    //   ],
    //   output: `
    //     /**
    //      * @param {ab."cd"."ef"} cfg
    //      */
    //   `,
    // },
    {
      code: `
        /**
         * @param {{a: string}} cfg A long
         *   description
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent semicolon separator usage',
        },
      ],
      options: [
        {
          objectFieldIndent: '  ',
          objectFieldSeparator: 'semicolon',
          separatorForSingleObjectField: true,
        },
      ],
      output: `
        /**
         * @param {{a: string;}} cfg A long
         *   description
         */
      `,
    },
    {
      code: `
        /** @param {{a: string, b: number; c: boolean,}} cfg */
      `,
      errors: [
        {
          line: 2,
          message: 'Inconsistent linebreak separator usage',
        },
      ],
      options: [
        {
          objectFieldIndent: '  ',
          objectFieldSeparator: 'linebreak',
        },
      ],
      output: `
        /** @param {{
         *   a: string
         *   b: number
         *   c: boolean
         * }} cfg */
      `,
    },
    {
      code: `
        /**
         * @param {{a: string, b: number; c: boolean,}} cfg */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent linebreak separator usage',
        },
      ],
      options: [
        {
          objectFieldIndent: '  ',
          objectFieldSeparator: 'linebreak',
        },
      ],
      output: `
        /**
         * @param {{
         *   a: string
         *   b: number
         *   c: boolean
         * }} cfg */
      `,
    },
    {
      code: `
        /** @param {{a: string, b: number; c: boolean,}} cfg
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Inconsistent linebreak separator usage',
        },
      ],
      options: [
        {
          objectFieldIndent: '  ',
          objectFieldSeparator: 'linebreak',
        },
      ],
      output: `
        /** @param {{
         *   a: string
         *   b: number
         *   c: boolean
         * }} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{
         *   a: string,
         *   b: number
         * }} cfg A long
         *   description
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent semicolon-and-linebreak separator usage',
        },
      ],
      options: [
        {
          objectFieldIndent: '  ',
          objectFieldSeparator: 'semicolon-and-linebreak',
        },
      ],
      output: `
        /**
         * @param {{
         *   a: string;
         *   b: number
         * }} cfg A long
         *   description
         */
      `,
    },
    {
      code: `
        /**
         * @param {{
         *   a: string,
         *   b: number
         * }} cfg A long
         *   description
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent semicolon-and-linebreak separator usage',
        },
      ],
      options: [
        {
          objectFieldIndent: '  ',
          objectFieldSeparator: 'semicolon-and-linebreak',
          objectFieldSeparatorTrailingPunctuation: true,
        },
      ],
      output: `
        /**
         * @param {{
         *   a: string;
         *   b: number;
         * }} cfg A long
         *   description
         */
      `,
    },
    {
      code: `
        /**
         * @param {ab | cd} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent "" union spacing usage',
        },
      ],
      options: [
        {
          unionSpacing: '',
        },
      ],
      output: `
        /**
         * @param {ab|cd} cfg
         */
      `,
    },
    {
      code: `
        /**
         * Due to jsdoc-type-pratt-parser not consuming whitespace, the exact
         *   error will not be reported.
         * @param {ab|cd} cfg
         */
      `,
      errors: [
        {
          line: 5,
          message: 'There was an error with type formatting',
        },
      ],
      options: [
        {
          unionSpacing: ' ',
        },
      ],
      output: `
        /**
         * Due to jsdoc-type-pratt-parser not consuming whitespace, the exact
         *   error will not be reported.
         * @param {ab | cd} cfg
         */
      `,
    },
    {
      code: `
        /**
         * Due to jsdoc-type-pratt-parser not consuming whitespace, the exact
         *   error will not be reported.
         * @param {ab|cd} cfg
         */
      `,
      errors: [
        {
          line: 5,
          message: 'There was an error with type formatting',
        },
      ],
      ignoreReadme: true,
      options: [
        {
          enableFixer: false,
          unionSpacing: ' ',
        },
      ],
    },
    {
      code: `
        /**
         * Due to jsdoc-type-pratt-parser representing the separator at the
         *   object level, the exact error will not be reported.
         * @param {{a: string, b: number; c: boolean,}} cfg
         */
      `,
      errors: [
        {
          line: 5,
          message: 'There was an error with type formatting',
        },
      ],
      options: [
        {
          objectFieldSeparator: 'comma',
        },
      ],
      output: `
        /**
         * Due to jsdoc-type-pratt-parser representing the separator at the
         *   object level, the exact error will not be reported.
         * @param {{a: string, b: number, c: boolean}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @type {string}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Must have initial and final " " spacing',
        },
      ],
      options: [
        {
          typeBracketSpacing: ' ',
        },
      ],
      output: `
        /**
         * @type { string }
         */
      `,
    },
    {
      code: `
        /**
         * @type { string }
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Must have no initial spacing',
        },
      ],
      options: [
        {
          typeBracketSpacing: '',
        },
      ],
      output: `
        /**
         * @type {string}
         */
      `,
    },
    // {
    //   code: `
    //     /**
    //      * @param {ab."cd".ef} cfg
    //      */
    //   `,
    //   errors: [
    //     {
    //       line: 3,
    //       message: 'Inconsistent null property quotes usage',
    //     },
    //   ],
    //   options: [
    //     {
    //       propertyQuotes: null,
    //     },
    //   ],
    //   output: `
    //     /**
    //      * @param {ab.cd.ef} cfg
    //      */
    //   `,
    // },
    {
      code: `
        /**
         * @param {{a: string, b: number}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent semicolon-and-linebreak separator usage',
        },
      ],
      options: [
        {
          objectFieldIndent: '  ',
          objectFieldSeparator: 'semicolon-and-linebreak',
          objectFieldSeparatorOptionalLinebreak: true,
        },
      ],
      output: `
        /**
         * @param {{a: string; b: number}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{
         *   a: string,
         *   b: number
         * }} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent semicolon-and-linebreak separator usage',
        },
      ],
      options: [
        {
          objectFieldIndent: '  ',
          objectFieldSeparator: 'semicolon-and-linebreak',
          objectFieldSeparatorOptionalLinebreak: true,
        },
      ],
      output: `
        /**
         * @param {{
         *   a: string;
         *   b: number
         * }} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {SomeType<T, U>} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Element spacing should be ""',
        },
      ],
      options: [
        {
          elementSpacing: '',
        },
      ],
      output: `
        /**
         * @param {SomeType<T,U>} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {[string, number]} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Element spacing should be ""',
        },
      ],
      options: [
        {
          elementSpacing: '',
        },
      ],
      output: `
        /**
         * @param {[string,number]} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {<T, U extends V = string, W = string>(x: T) => U} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Default value spacing should be ""',
        },
        {
          line: 3,
          message: 'Default value spacing should be ""',
        },
      ],
      options: [
        {
          defaultValueSpacing: '',
        },
      ],
      output: `
        /**
         * @param {<T, U extends V=string, W=string>(x: T) => U} cfg
         */
      `,
    },
  ],
  valid: [
    {
      code: `
        /**
         * @param {{a: string; b: number; c: boolean}} cfg
         */
      `,
      options: [
        {
          objectFieldSeparator: 'semicolon',
        },
      ],
    },
    {
      code: `
        /**
         * @param {"abc"} cfg
         */
      `,
      options: [
        {
          stringQuotes: 'double',
        },
      ],
    },
    {
      code: `
        /**
         * @param {string[]} cfg
         */
      `,
      options: [
        {
          arrayBrackets: 'square',
        },
      ],
    },
    {
      code: `
        /**
         * @param {SomeType.<string>} cfg
         */
      `,
      options: [
        {
          genericDot: true,
        },
      ],
    },
    {
      code: `
        /**
         * @param {A<} badParam
         */
      `,
    },
    {
      code: `
        /**
         * @param {{"a bc": string}} quotedKeyParam
         */
      `,
    },
    {
      code: `
        /**
         * @param {{55: string}} quotedKeyParam
         */
      `,
    },
    {
      code: `
        /**
         * @param {{"a-b-c": string}} quotedKeyParam
         */
      `,
      options: [
        {
          objectFieldQuote: null,
        },
      ],
    },
    {
      code: `
        /**
         * @param {{55: string}} quotedKeyParam
         */
      `,
      options: [
        {
          objectFieldQuote: 'double',
        },
      ],
    },
    // {
    //   code: `
    //     /**
    //      * @param {ab.cd.ef} cfg
    //      */
    //   `,
    //   options: [
    //     {
    //       propertyQuotes: null,
    //     },
    //   ],
    // },
    // {
    //   code: `
    //     /**
    //      * @param {ab."cd ef".gh} cfg
    //      */
    //   `,
    //   options: [
    //     {
    //       propertyQuotes: null,
    //     },
    //   ],
    // },
    {
      code: `
        /**
         * @param {ab | cd} cfg
         */
      `,
      options: [
        {
          unionSpacing: ' ',
        },
      ],
    },
    {
      code: `
        /**
         * @param {ab|cd} cfg
         */
      `,
      options: [
        {
          unionSpacing: '',
        },
      ],
    },
    {
      code: `
        /**
         * @param cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{a: string; b: number}} cfg
         */
      `,
      options: [
        {
          objectFieldIndent: '  ',
          objectFieldSeparator: 'semicolon-and-linebreak',
          objectFieldSeparatorOptionalLinebreak: true,
        },
      ],
    },
    {
      code: `
        /**
         * @param {{
         *   a: string;
         *   b: number
         * }} cfg
         */
      `,
      options: [
        {
          objectFieldIndent: '  ',
          objectFieldSeparator: 'semicolon-and-linebreak',
          objectFieldSeparatorOptionalLinebreak: true,
        },
      ],
    },
    {
      code: `
        /**
         * @param {SomeType<T,U>} cfg
         */
      `,
      options: [
        {
          elementSpacing: '',
        },
      ],
    },
    {
      code: `
        /**
         * @param {[string,number]} cfg
         */
      `,
      options: [
        {
          elementSpacing: '',
        },
      ],
    },
    {
      code: `
        /**
         * @param {<T, U extends V=string, W=string>(x: T) => U} cfg
         */
      `,
      options: [
        {
          defaultValueSpacing: '',
        },
      ],
    },
  ],
};
