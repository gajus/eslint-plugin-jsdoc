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
          genericAndTupleElementSpacing: '',
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
          genericAndTupleElementSpacing: '',
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
          parameterDefaultValueSpacing: '',
        },
      ],
      output: `
        /**
         * @param {<T, U extends V=string, W=string>(x: T) => U} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{a: 3}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Post colon spacing should be ""',
        },
      ],
      options: [
        {
          keyValuePostColonSpacing: '',
        },
      ],
      output: `
        /**
         * @param {{a:3}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{a: 3}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Post key spacing should be " "',
        },
      ],
      options: [
        {
          keyValuePostKeySpacing: ' ',
        },
      ],
      output: `
        /**
         * @param {{a : 3}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{a?: 3}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Post optional (`?`) spacing should be " "',
        },
      ],
      options: [
        {
          keyValuePostOptionalSpacing: ' ',
        },
      ],
      output: `
        /**
         * @param {{a? : 3}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {[a: 3]} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Post colon spacing should be ""',
        },
      ],
      options: [
        {
          keyValuePostColonSpacing: '',
        },
      ],
      output: `
        /**
         * @param {[a:3]} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {[a: 3]} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Post key spacing should be " "',
        },
      ],
      options: [
        {
          keyValuePostKeySpacing: ' ',
        },
      ],
      output: `
        /**
         * @param {[a : 3]} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {[a?: 3]} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Post optional (`?`) spacing should be " "',
        },
      ],
      options: [
        {
          keyValuePostOptionalSpacing: ' ',
        },
      ],
      output: `
        /**
         * @param {[a? : 3]} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {() => void} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Post-return-marker spacing should be ""',
        },
      ],
      options: [
        {
          arrowFunctionPostReturnMarkerSpacing: '',
        },
      ],
      output: `
        /**
         * @param {() =>void} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {() => void} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Pre-return-marker spacing should be ""',
        },
      ],
      options: [
        {
          arrowFunctionPreReturnMarkerSpacing: '',
        },
      ],
      output: `
        /**
         * @param {()=> void} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{hello(): void}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Post-method-name spacing should be " "',
        },
      ],
      options: [
        {
          postMethodNameSpacing: ' ',
        },
      ],
      output: `
        /**
         * @param {{hello (): void}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{new (): void}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Post-`new` spacing should be ""',
        },
      ],
      options: [
        {
          postNewSpacing: '',
        },
      ],
      output: `
        /**
         * @param {{new(): void}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {function(): void} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Pre-return-marker spacing should be " "',
        },
      ],
      options: [
        {
          functionOrClassPreReturnMarkerSpacing: ' ',
        },
      ],
      output: `
        /**
         * @param {function() : void} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{new (): void}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Post-return-marker spacing should be ""',
        },
      ],
      options: [
        {
          functionOrClassPostReturnMarkerSpacing: '',
        },
      ],
      output: `
        /**
         * @param {{new ():void}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{method(a: string, b: number): void}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Parameter spacing should be ""',
        },
      ],
      options: [
        {
          functionOrClassParameterSpacing: '',
        },
      ],
      output: `
        /**
         * @param {{method(a: string,b: number): void}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{method<T>(a: T, b: number): void}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Post-generic spacing should be " "',
        },
      ],
      options: [
        {
          functionOrClassPostGenericSpacing: ' ',
        },
      ],
      output: `
        /**
         * @param {{method<T> (a: T, b: number): void}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{method<T, U>(a: T, b: U): void}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Type parameter spacing should be ""',
        },
      ],
      options: [
        {
          functionOrClassTypeParameterSpacing: '',
        },
      ],
      output: `
        /**
         * @param {{method<T,U>(a: T, b: U): void}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{'some-method'(a: string, b: number): void}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Method quoting style should be "double"',
        },
      ],
      options: [
        {
          methodQuotes: 'double',
        },
      ],
      output: `
        /**
         * @param {{"some-method"(a: string, b: number): void}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {[a: string, ...b: number]} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Post variadic (`...`) spacing should be " "',
        },
      ],
      options: [
        {
          keyValuePostVariadicSpacing: ' ',
        },
      ],
      output: `
        /**
         * @param {[a: string, ... b: number]} cfg
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
          message: 'There was an error with type formatting',
        },
      ],
      options: [
        {
          objectTypeBracketSpacing: ' ',
        },
      ],
      output: `
        /**
         * @param {{ a: string }} cfg
         */
      `,
    },

    {
      code: `
        /**
         * @typedef {{ a: boolean, b: string, c: number, }} Example
         */
      `,
      errors: [
        {
          line: 3,
          message: 'There was an error with type formatting',
        },
      ],
      options: [
        {
          objectFieldSeparator: 'comma-and-linebreak',
          objectFieldSeparatorTrailingPunctuation: true,
          objectTypeBracketSpacing: ' ',
          trailingPunctuationMultilineOnly: true,
        },
      ],
      output: `
        /**
         * @typedef {{ a: boolean, b: string, c: number }} Example
         */
      `,
    },
    {
      code: `
        /**
         * @typedef {{
         * a: boolean,
         * b: string,
         * c: number
         * }} Example
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent comma-and-linebreak separator usage',
        },
      ],
      options: [
        {
          objectFieldSeparator: 'comma-and-linebreak',
          objectFieldSeparatorTrailingPunctuation: true,
          objectTypeBracketSpacing: ' ',
          trailingPunctuationMultilineOnly: true,
        },
      ],
      output: `
        /**
         * @typedef {{
         * a: boolean,
         * b: string,
         * c: number,
         * }} Example
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
          genericAndTupleElementSpacing: '',
        },
      ],
    },
    {
      code: `
        /**
         * @param {SomeType<T, U>} cfg
         */
      `,
      options: [
        {
          genericAndTupleElementSpacing: ' ',
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
          genericAndTupleElementSpacing: '',
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
          parameterDefaultValueSpacing: '',
        },
      ],
    },
    {
      code: `
        /**
         * @param {{a:3}} cfg
         */
      `,
      options: [
        {
          keyValuePostColonSpacing: '',
        },
      ],
    },
    {
      code: `
        /**
         * @param {{a : 3}} cfg
         */
      `,
      options: [
        {
          keyValuePostKeySpacing: ' ',
        },
      ],
    },
    {
      code: `
        /**
         * @param {{a? : 3}} cfg
         */
      `,
      options: [
        {
          keyValuePostOptionalSpacing: ' ',
        },
      ],
    },
    {
      code: `
        /**
         * @param {[a:3]} cfg
         */
      `,
      options: [
        {
          keyValuePostColonSpacing: '',
        },
      ],
    },
    {
      code: `
        /**
         * @param {[a : 3]} cfg
         */
      `,
      options: [
        {
          keyValuePostKeySpacing: ' ',
        },
      ],
    },
    {
      code: `
        /**
         * @param {[a? : 3]} cfg
         */
      `,
      options: [
        {
          keyValuePostOptionalSpacing: ' ',
        },
      ],
    },
    {
      code: `
        /**
         * @param {() =>void} cfg
         */
      `,
      options: [
        {
          arrowFunctionPostReturnMarkerSpacing: '',
        },
      ],
    },
    {
      code: `
        /**
         * @param {()=> void} cfg
         */
      `,
      options: [
        {
          arrowFunctionPreReturnMarkerSpacing: '',
        },
      ],
    },
    {
      code: `
        /**
         * @param {{hello (): void}} cfg
         */
      `,
      options: [
        {
          postMethodNameSpacing: ' ',
        },
      ],
    },
    {
      code: `
        /**
         * @param {{new(): void}} cfg
         */
      `,
      options: [
        {
          postNewSpacing: '',
        },
      ],
    },
    {
      code: `
        /**
         * @param {{new (): void}} cfg
         */
      `,
      options: [
        {
          postNewSpacing: ' ',
        },
      ],
    },
    {
      code: `
        /**
         * @param {function() : void} cfg
         */
      `,
      options: [
        {
          functionOrClassPreReturnMarkerSpacing: ' ',
        },
      ],
    },
    {
      code: `
        /**
         * @param {{new ():void}} cfg
         */
      `,
      options: [
        {
          functionOrClassPostReturnMarkerSpacing: '',
        },
      ],
    },
    {
      code: `
        /**
         * @param {{method(a: string,b: number): void}} cfg
         */
      `,
      options: [
        {
          functionOrClassParameterSpacing: '',
        },
      ],
    },
    {
      code: `
        /**
         * @param {{method<T> (a: T, b: number): void}} cfg
         */
      `,
      options: [
        {
          functionOrClassPostGenericSpacing: ' ',
        },
      ],
    },
    {
      code: `
        /**
         * @param {{method<T,U>(a: T, b: U): void}} cfg
         */
      `,
      options: [
        {
          functionOrClassTypeParameterSpacing: '',
        },
      ],
    },
    {
      code: `
        /**
         * @param {{"some-method"(a: string, b: number): void}} cfg
         */
      `,
      options: [
        {
          methodQuotes: 'double',
        },
      ],
    },
    {
      code: `
        /**
         * @param {{a: string}} cfg
         */
      `,
      options: [
        {
          objectTypeBracketSpacing: '',
        },
      ],
    },
    {
      code: `
        /**
         * @typedef {{ a: boolean, b: string, c: number }} Example
         */
      `,
      options: [
        {
          objectFieldSeparator: 'comma-and-linebreak',
          objectFieldSeparatorTrailingPunctuation: true,
          objectTypeBracketSpacing: ' ',
          trailingPunctuationMultilineOnly: true,
        },
      ],
    },
    {
      code: `
        /**
         * @typedef {{
         * a: boolean,
         * b: string,
         * c: number,
         * }} Example
         */
      `,
      options: [
        {
          objectFieldSeparator: 'comma-and-linebreak',
          objectFieldSeparatorTrailingPunctuation: true,
          objectTypeBracketSpacing: ' ',
          trailingPunctuationMultilineOnly: true,
        },
      ],
    },
  ],
};
